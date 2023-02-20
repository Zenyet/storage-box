import React from 'react';
import About from '@/ui/About';
// import NotFound from '@/ui/not-found';
// import { getSpecifiedDir } from '@/lib/index';
// import { ItemType } from '../../types';
import List from '@/ui/List';
// import Background from '@/ui/Background';
// import config from '../../config';
// import { matches } from '../../utils';
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

  params.slug.forEach((v, idx) => {
    if (idx !== len || len === 0) {
      if (idx !== len - 1) {
        cookedURL = cookedURL + v + '/';
      } else {
        cookedURL = cookedURL + v;
      }
    }
  });

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
