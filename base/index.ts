// import * as fs from 'fs';
// import * as path from 'path';
import config from '../config';
import { request } from '../utils';
import { AuthType } from '../types';
import { Store } from '../types';
import Redis from 'ioredis';
// import { get } from '@vercel/edge-config';


const AT_EXPIRE: number = 60 * 45;
const RT_EXPIRE: number = 60 * 60 * 24 * 90;

// const PATH: string = path.join(process.cwd(), '/base/store.json');

const client = new Redis(config.redisURL);


function isExpired(before: number, type: 'access' | 'refresh'): boolean {
  let now: number = +(new Date());
  let now_in_s: number = now / 1000;

  if (type === 'access') {
    return (now_in_s - before) >= AT_EXPIRE;
  }
  if (type === 'refresh') {
    return (now_in_s - before) >= RT_EXPIRE;
  }

  return false;
}

async function readStore(): Promise<Store> {
  let store: Store = {};
  try {
    store.client_id = await client.get('client_id') as string;
    store.client_secret = await client.get('client_secret') as string;
    store.ac_before = await client.get('ac_before') as string;
    store.rf_before = await client.get('rf_before') as string;
    store.access_token = await client.get('access_token') as string;
    store.refresh_token = await client.get('refresh_token') as string;
    store.redirect_uri = await client.get('redirect_uri') as string;
  } catch (e) {
    console.log('@Oops: ', e);
  }
  // try {
  //   store = { ...JSON.parse(fs.readFileSync(PATH, 'utf-8')) };
  // } catch (e) {
  //   console.log('@Oops: ', e);
  // }
  return store;
}

export async function getAT(): Promise<string> {
  const body = new URLSearchParams();
  const store: Store = await readStore();
  const { client_id, client_secret, redirect_uri, access_token, refresh_token, ac_before, rf_before } = store;
  body.append('client_id', client_id as string);
  body.append('redirect_uri', redirect_uri as string);
  body.append('client_secret', client_secret as string);
  body.append('refresh_token', refresh_token as string);
  body.append('grant_type', 'refresh_token');
  if (!access_token || !refresh_token || isExpired(parseInt(rf_before as string), 'refresh')) {
    const newAT: AuthType = await request(config.OAuthURL + '/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    // store.refresh_token = newAT.refresh_token;
    // store.access_token = newAT.access_token;
    // store.ac_before = store.rf_before = (new Date().getTime() / 1000) + '';
    // fs.writeFileSync(PATH, JSON.stringify(store));
    // use redis
    const before: string = (new Date().getTime() / 1000) + '';
    client.set('refresh_token', newAT.refresh_token);
    client.set('access_token', newAT.access_token);
    client.set('ac_before', before);
    client.set('rf_before', before);
    return newAT.access_token;
  } else {
    if (isExpired(parseInt(ac_before as string), 'access')) {
      const newAT: AuthType = await request(config.OAuthURL + '/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });
      const before: string = (new Date().getTime()) / 1000 + '';
      // store.access_token = newAT.access_token;
      // store.ac_before = (new Date().getTime()) / 1000 + '';
      // fs.writeFileSync(PATH, JSON.stringify(store));
      client.set('access_token', newAT.access_token);
      client.set('ac_before', before);
      return newAT.access_token;
    }
  }
  return access_token;
}
