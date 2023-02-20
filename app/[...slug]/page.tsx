import React from 'react';
import About from '@/ui/About';
// import NotFound from '@/ui/not-found';
// import { getSpecifiedDir } from '@/lib/index';
// import { ItemType } from '../../types';
import List from '@/ui/List';
import Background from '@/ui/Background';
// import { notFound } from 'next/navigation';


type Props = {
  params: {
    slug: string & string[]
  }
}


// generate title base params not work.....


export default async function Page({ params }: Props) { // use catch all routes that params will be string[] fk!
  if (params.slug[0] === 'about') {
    return <About />;
  }

  const href_: string = params.slug.join('/');
  const len: number = params.slug.length;
  let cookedURL: string = '/';

  // function computedType(name: string): boolean {
  //   // return name.split('.').at(-1) as string; // get final item also can use pop()!
  //   return name?.includes('image') || name?.includes('video');
  // }

  params.slug.forEach((v, idx) => {
    if (idx !== len || len === 0) {
      if (idx !== len - 1) {
        cookedURL = cookedURL + v + '/';
      } else {
        cookedURL = cookedURL + v;
      }
    }
  });

  // if (params.slug[0] === 'folder1') {
  //   return <NotFound />;
  //   //notFound() // don's understand why didn't work... I think it also needs 13.2? ?
  //   // ok it got it, too. because of development mode, it do not deal the errors :!!
  // }


  }

  // const items: ItemType[] = await getSpecifiedDir(cookedURL);
  // const promises: Promise<ThumbType>[] = []; // 使用 Promise 并发好点感觉
  // const map: Map<number, number> = new Map<number, number>();
  // let flag: number = 0;
  //
  // items.forEach((item, index) => {
  //   if (item.file && (item.image || item.video || computedType(item.file?.mimeType!))) {
  //     promises.push(getThumbnail(item.id));
  //     map.set(index, flag);
  //     ++flag;
  //   }
  // });
  // console.log(promises);

  // const thumbnails: ThumbType[] = await Promise.all<ThumbType>(promises);
  // // console.log(thumbnails);
  // items = items.map((item, index) => {
  //   if (map.has(index)) {
  //     return {
  //       ...item,
  //       thumbnail: thumbnails[map.get(index)!],
  //     };
  //   }
  //   return item;
  // });

  // try {
  //   void (!items);
  // } catch (e) {
  //   console.log(e);
  //   return <NotFound />;
  // }
  //
  // if (!items.length) {
  //   return (
  //     <Background>
  //       <h2 className='font-bold text-4xl'>空空如也...</h2>
  //     </Background>
  //   );
  // }
  //
  // const newItems: ItemType[] = items.map(item => {
  //   const o: any = {};
  //   if (item.file) {
  //     o.file = item.file;
  //   }
  //   if (item.folder) {
  //     o.folder = item.folder;
  //   }
  //   if (item.image) {
  //     o.image = item.image;
  //   }
  //   if (item.video) {
  //     o.video = item.video;
  //   }
  //   if (item.thumbnails) {
  //     o.thumbnails = item.thumbnails;
  //   }
  //   if (item['@microsoft.graph.downloadUrl']) {
  //     o['@microsoft.graph.downloadUrl'] = item['@microsoft.graph.downloadUrl'];
  //   }
  //   return {
  //     id: item.id,
  //     name: item.name,
  //     lastModifiedDateTime: item.lastModifiedDateTime,
  //     ...o,
  //   };
  // });

  return <List href_={href_} cookedURL={cookedURL} />;
}


// OK i got it, what i installed is 13.1.6 but metadata needs 13.2 (i guess) according to github's issue
// so i needs to use head tag :(
// export async function generateMetadata({ params, searchParams }: any) {
//   // For /products/123, params.id is "123"
//   // For /products/123?foo=bar, searchParams.get("foo") is "bar"
//   // The return value is the metadata object
//   console.log(searchParams);
//   return { title: params.slug.join('') };
// }
