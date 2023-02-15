import React from 'react';
import About from '@/ui/About';
import NotFound from '@/ui/not-found';
import { getSpecifiedDir } from '@/lib/index';
import { ItemType } from '../../types';
import Folder from '@/ui/Folder';
import File from '@/ui/File';
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

  const items: ItemType[] = await getSpecifiedDir(cookedURL);

  if (!items[0]) {
    return <NotFound />;
  }

  function computedType(name: string): string {
    // return name.split('.').at(-1) as string; // get final item also can use pop()!
    let splits: string[] = name.split('.');
    return splits.length > 1 ? splits.pop() as string : '?';
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
