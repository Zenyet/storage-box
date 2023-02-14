import config from '../config';
import { RespType, ItemType } from '../types';
import { request } from '../utils';
import { getAT } from '../base';

export async function getRootDir(): Promise<ItemType[]> {
  const access_token: string = await getAT();
  let res: RespType = await request<RespType>(`${config.graphURL}/children`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
    cache: 'no-store',
  });
  return res.value;
}

export async function getSpecifiedDir(folder_name: string): Promise<ItemType[]> {
  const access_token: string = await getAT();
  let res: RespType = await request<RespType>(`${config.graphURL}:${folder_name}:/children`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
    cache: 'no-store',
  });
  return res.value;
}
