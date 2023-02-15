import path from 'path';
import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers['auth-head'] === '1676395502unique-head') {
    const PATH: string = path.join(process.cwd(), '/base/store.json');
    const fileContents = await fs.readFile(PATH, 'utf8');
    res.status(200).json(fileContents);
  } else {
    res.status(400).json({
      status: 'bad request 400'
    })
  }
}