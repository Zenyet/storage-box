import { NextApiRequest, NextApiResponse } from 'next';
import { Thumb } from '../../types';
import { getAT } from '../../base';
import { request } from '../../utils';
import config from '../../config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const access_token: string = await getAT();
  let thumb: Thumb = await request<Thumb>(`${config.thumbURL}/${id}/thumbnails/0/medium`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
    cache: 'no-store',
  });
  res.status(200).json(thumb);
}