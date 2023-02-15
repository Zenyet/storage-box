'use client';
import React from 'react';
import Image from 'next/image';
import folder from '../public/folder.webp';
import Link from 'next/link';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Folder({ folderName, href_ }: { folderName: string, href_?: string }) {
  const href: string = `${href_ ? href_ : ''}/${folderName}`;
  const router = useRouter();

  function handleDBClick(e: MouseEvent) {
    e.preventDefault();
    router.push(href);
  }

  return (
    <Link href={href} onClick={e => e.preventDefault()}
          onDoubleClick={e => handleDBClick(e)}
          className='group flex flex-col items-center w-[140px] my-2 select-none justify-self-center cursor-default'>
      <header className='flex justify-center items-center w-[128px] h-[128px] rounded-md group-focus:bg-folder-hv'>
        <Image priority className='pointer-events-none' width={100} height={100} src={folder} alt='folder' />
      </header>
      <span
        className='max-w-[100%] overflow-hidden text-ellipsis text-gray-700 text-[13px] mt-0.5 px-1 rounded-[4px] group-focus:bg-folder-n-hv group-focus:text-white'>{folderName}</span>
    </Link>
  );
}