// import { getRootDir } from '@/lib/index';
// import { ItemType } from '../types';
import React from 'react';
import List from '@/ui/List';

export default function Page() {
  // const items: ItemType[] = await getRootDir();
  // const newItems: ItemType[] = items.map(item => {
  //   const o: any = {};
  //   if (item['@microsoft.graph.downloadUrl']) {
  //     o['@microsoft.graph.downloadUrl'] = item['@microsoft.graph.downloadUrl'];
  //   }
  //   if(item.folder) {
  //     o.folder = item.folder;
  //   }
  //   if(item.file) {
  //     o.file = item.file;
  //   }
  //   return {
  //     createdDateTime: item.createdDateTime,
  //     name: item.name,
  //     id: item.id,
  //     lastModifiedDateTime: item.lastModifiedDateTime,
  //     ...o
  //   };
  // });
  return <List />;
}