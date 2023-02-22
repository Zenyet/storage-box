'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import folderpath from '../public/folderpath.webp';
import Image from 'next/image';

export default function Breadcrumb() {
  const pathName = usePathname();
  const [paths, setPaths] = useState<string[]>(['disk0']);
  const [memoized, setMemoized] = useState<string[]>(['/']);

  function cookedBreads(pathStr: string): string[] {
    const breads = pathStr.split('/');
    const newMemoized: string[] = breads.map((p, index) => {
      if (p === '') {
        return '/';
      }
      return breads.slice(0, index + 1).join('/');
    });
    return newMemoized;
  }

  useEffect(() => {
    const newMemoized: string[] = cookedBreads(pathName!);
    let newPaths: string[] = [];
    if (pathName === '/') {
      newPaths = ['/'];
    } else {
      newPaths = pathName!?.split('/');
    }
    newPaths.splice(0, 1, 'disk0');
    setPaths(newPaths);
    setMemoized(newMemoized);
  }, [pathName]);

  return <div
    className='pl-3 flex items-center w-[100%] h-[1.8rem] fixed z-50 bg-white dark:bg-body-dark bottom-0 border-t-[1px] dark:border-t-bread-dark'>
    {paths!?.map((path, idx) => {
      return <li key={idx} className='flex items-center text-[13px] list-none text-gray-500 dark:text-gray-100'>
        <Image className='m-1' width={15} height={15} src={folderpath} alt='folder_path' />
        <Link className='cursor-default' href={memoized[idx] ?? '/'}>{decodeURIComponent(path)}</Link>
        {memoized[idx] === pathName ? <></> :
          <svg className='inline-block m-1.5' xmlns='http://www.w3.org/2000/svg' width='14' height='14'
               viewBox='0 2.4 24 24'>
            <path fill='#6b7280'
                  d='M8.7 19.7q-.275-.275-.275-.7t.275-.7l3.9-3.9l-3.9-3.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-4.6 4.6q-.275.275-.7.275t-.7-.275Z' />
          </svg>}
      </li>;
    })}
  </div>;
}