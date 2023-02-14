import * as fs from 'fs';
import * as path from 'path';
import config from '../config';
import { request } from '../utils';
import { AuthType } from '../types';

interface Store {
  client_id?: string,
  client_secret?: string,
  redirect_uri?: string,
  refresh_token?: string,
  access_token?: string,
  expire?: string,
  ac_before?: number,
  rf_before?: number,
  grant_type?: 'refresh_token' | 'authorization_code'
}


const AT_EXPIRE: number = 60 * 45;
const RT_EXPIRE: number = 60 * 60 * 24 * 90;

const PATH: string = path.join(process.cwd(), '/base/store.json');


function isExpired(before: number, type: 'access' | 'refresh'): boolean {
  let now: number = +(new Date());
  let now_in_s: number = now / 1000;
  let before_in_s: number = before / 1000;

  if (type === 'access') {
    return (now_in_s - before_in_s) >= AT_EXPIRE;
  }
  if (type === 'refresh') {
    return (now_in_s - before_in_s) >= RT_EXPIRE;
  }

  return true;
}

function readStore(): Store {
  let store: Store = {};
  try {
    store = { ...JSON.parse(fs.readFileSync(PATH, 'utf-8')) };
  } catch (e) {
    console.log('@Oops: ', e);
  }
  return store;
}

export async function getAT(): Promise<string> {
  const body = new URLSearchParams();
  const store: Store = readStore();
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
    store.refresh_token = newAT.refresh_token;
    store.access_token = newAT.access_token;
    store.ac_before = store.rf_before = +(new Date()) / 1000;
    fs.writeFileSync(PATH, JSON.stringify(store));
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
      store.access_token = newAT.access_token;
      store.ac_before = +(new Date()) / 1000;
      fs.writeFileSync(PATH, JSON.stringify(store));
      return newAT.access_token;
    }
  }
  return access_token;
}
