// import * as fs from 'fs';
// import * as path from 'path';
import config from '../config';
import { request } from '../utils';
import { AuthType } from '../types';
import { Store } from '../types';
// import Redis from 'ioredis';
// import { get } from '@vercel/edge-config';


const AT_EXPIRE: number = 60 * 45;
const RT_EXPIRE: number = 60 * 60 * 24 * 85; // 过期 5 天前刷新 refresh_token

// const PATH: string = path.join(process.cwd(), '/base/store.json');

// const client = new Redis(config.redisURL);

// https://api.cloudflare.com/client/v4/accounts/account_identifier/storage/kv/namespaces/namespace_identifier/values/key_name
function cookedURL(key_name: string): string {
  let { account_identifier, namespaces_identifier } = config;
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

export async function readStore<T>(key_name: string): Promise<T> {
  let store: T = await request(cookedURL(key_name), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Email': config.x_auth_email,
      'Authorization': config.x_bearer,
    },
  });
  return store;
}

export async function getATFromKV(): Promise<string> {
  let promise1: Promise<number> = readStore<number>('ac_before');
  let promise2: Promise<number> = readStore<number>('rf_before');
  let [ac_before, rf_before] = await Promise.all([promise1, promise2]);
  if (isExpired(ac_before, 'access')) {
    return await readStore<string>('access_token');
  }
  return '';
}

export async function getAT(): Promise<string> {
  const body = new URLSearchParams();
  const formData: FormData = new FormData();
  const store: Store = await readStore<Store>('box');
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
    formData.append('metadata', '{}');
    formData.append('value', stringify);
    request(cookedURL('box'), {
      method: 'PUT',
      headers: {
        'X-Auth-Email': config.x_auth_email,
        'Authorization': config.x_bearer,
      },
      body: formData,
    }).catch();
    return newAT.access_token;
  } else if (isExpired(ac_before as number, 'access')) {
    const newAT: AuthType = await request(config.OAuthURL + '/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
    // const before: number = (new Date().getTime()) / 1000;
    // fs.writeFileSync(PATH, JSON.stringify(store));

    store.access_token = newAT.access_token;
    store.ac_before = (new Date().getTime()) / 1000;
    const stringify: string = JSON.stringify(store);
    formData.append('metadata', '{}');
    formData.append('value', stringify);
    const res = await request(cookedURL('box'), {
      method: 'PUT',
      headers: {
        'X-Auth-Email': config.x_auth_email,
        'Authorization': config.x_bearer,
      },
      body: formData,
    });
    // client.set('access_token', newAT.access_token);
    // client.set('ac_before', before);
    return newAT.access_token;
  }
  return access_token;
}
