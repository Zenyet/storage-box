"use client";
import React from 'react';
import Folder from '@/ui/Folder';
import File from '@/ui/File';
import { ItemType } from '../types';

export default function List({ items, href_ }: { items: ItemType[], href_?: string }) {
  function computedType(name: string): string {
    // return name.split('.').at(-1) as string; // get final item also can use pop()!
    let splits: string[] = name.split('.');
    return splits.length > 1 ? splits.pop() as string : '?';
  }

  return (
    <div className='w-[90%] grid grid-cols-8 gap-6 mx-auto my-10 text-gray-700'>
      {
        items?.map((item, idx) => {
          if (item.folder) {
            return <Folder key={idx} href_={href_} folderName={item.name} />;
          } else if (item.file && item['@microsoft.graph.downloadUrl']) {
            return <File key={idx} fileName={item.name} extension={computedType(item.name)}
                         downloadURL={item['@microsoft.graph.downloadUrl']} />;
          }
        })
      }
    </div>
  );
}