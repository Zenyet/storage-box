import React from 'react';
import About from '@/ui/About';
import NotFound from '@/ui/not-found';
import { getSpecifiedDir, getThumbnail } from '@/lib/index';
import { ItemType, ThumbType } from '../../types';
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
  const href_: string = params.slug.join('/');
  const len: number = params.slug.length;
  let cookedURL: string = '/';

  function computedType(name: string): boolean {
    // return name.split('.').at(-1) as string; // get final item also can use pop()!
    return name?.includes('image') || name?.includes('video');
  }

  params.slug.forEach((v, idx) => {
    if (idx !== len || len === 0) {
      if (idx !== len - 1) {
        cookedURL = cookedURL + v + '/';
      } else {
        cookedURL = cookedURL + v;
      }
    }
  });
  if (params.slug[0] === 'about') {
    return <About />;
  }
  // if (params.slug[0] === 'folder1') {
  //   return <NotFound />;
  //   //notFound() // don's understand why didn't work... I think it also needs 13.2? ?
  //   // ok it got it, too. because of development mode, it do not deal the errors :!!
  // }


  let items: ItemType[] = await getSpecifiedDir(cookedURL);
  const promises: Promise<ThumbType>[] = []; // 使用 Promise 并发好点感觉
  const map: Map<number, number> = new Map<number, number>();
  let flag: number = 0;

  items.forEach((item, index) => {
    if (item.file && computedType(item.file?.mimeType!)) {
      promises.push(getThumbnail(item.id));
      map.set(index, flag);
      ++flag;
    }
  });

  const thumbnails: ThumbType[] = await Promise.all<ThumbType>(promises);
  // console.log(thumbnails);
  //@ts-ignore
  items = items.map((item, index) => {
    if (map.has(index)) {
      return {
        ...item,
        thumbnail: thumbnails[map.get(index)!],
      };
    }
    return item;
  });

  try {
    void (!items);
  } catch (e) {
    console.log(e);
    return <NotFound />;
  }

  if (!items.length) {
    return (
      <Background>
        <h2 className='font-bold text-4xl'>空空如也...</h2>
      </Background>
    );
  }

  return <List items={items} href_={href_} />;
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
