// import * as fs from 'fs';
// import * as path from 'path';
import config from '../config';
import { request } from '../utils';
import { AuthType } from '../types';
import { Store } from '../types';
import Redis from 'ioredis';
// import { get } from '@vercel/edge-config';


const AT_EXPIRE: number = 60 * 45;
const RT_EXPIRE: number = 60 * 60 * 24 * 85; // 过期 5 天前刷新 refresh_token

// const PATH: string = path.join(process.cwd(), '/base/store.json');

const client = new Redis(config.redisURL);

// https://api.cloudflare.com/client/v4/accounts/account_identifier/storage/kv/namespaces/namespace_identifier/values/key_name
function cookedURL(): string {
  let { account_identifier, namespaces_identifier, key_name } = config;
  return `https://api.cloudflare.com/client/v4/accounts/${account_identifier}/storage/kv/namespaces/${namespaces_identifier}/values/${key_name}`;
}


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
  let store: Store  = await request(cookedURL(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Email': config.x_auth_email,
      'Authorization': config.x_bearer,
    },
  });

  // try {
  //   store.client_id = await client.get('client_id') as string;
  //   store.client_secret = await client.get('client_secret') as string;
  //   store.ac_before = await client.get('ac_before') as string;
  //   store.rf_before = await client.get('rf_before') as string;
  //   store.access_token = await client.get('access_token') as string;
  //   store.refresh_token = await client.get('refresh_token') as string;
  //   store.redirect_uri = await client.get('redirect_uri') as string;
  // } catch (e) {
  //   console.log('@Oops: ', e);
  // }
  // try {
  //   store = { ...JSON.parse(fs.readFileSync(PATH, 'utf-8')) };
  // } catch (e) {
  //   console.log('@Oops: ', e);
  // }
  console.log(store);
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
  if (!access_token || !refresh_token || isExpired(rf_before as number, 'refresh')) {
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
    store.refresh_token = newAT.refresh_token;
    store.access_token = newAT.access_token;
    store.ac_before = store.rf_before = (new Date().getTime() / 1000);
    // client.set('refresh_token', newAT.refresh_token);
    // client.set('access_token', newAT.access_token);
    // client.set('ac_before', before);
    // client.set('rf_before', before);
    const stringify: string = JSON.stringify(store);
    const formData: FormData = new FormData();
    formData.append('metadata', '{}');
    formData.append('value', stringify);
    await request(cookedURL(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Auth-Email': config.x_auth_email,
        'Authorization': config.x_bearer,
      },
      body: formData,
    });
    return newAT.access_token;
  } else {
    if (isExpired(ac_before as number, 'access')) {
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
