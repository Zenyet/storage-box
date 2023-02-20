import { NextApiRequest, NextApiResponse } from 'next';
import { RespType } from '../../types';
import { getAT } from '../../base';
import { request } from '../../utils';
import config from '../../config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {path} = req.query;
  const access_token: string = await getAT();
  let resp: RespType = await request<RespType>(`${config.graphURL}:${path}:/children/?$expand=thumbnails`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
    cache: 'no-store',
  });
  res.status(200).json(resp.value);
}