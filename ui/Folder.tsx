'use client';
import React from 'react';
import Image from 'next/image';
import folder from '../public/folder.webp';
// import lockedfolder from '../public/lockedfolder.webp';
import Link from 'next/link';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import useUserAgent from '../hooks/useUserAgent';


export default function Folder({ locked, folderName, href_ }: {
  locked?: boolean,
  folderName: string,
  href_?: string
}) {
  const href: string = `${href_ ? href_ : ''}/${folderName}`;
  const router = useRouter();
  const [isSafari, isMobile]: [boolean, boolean] = useUserAgent();

  function handleDBClick(e: MouseEvent) {
    if (!isMobile) {
      e.preventDefault();
      router.push(href);
    } else {
      e.preventDefault();
    }
  }

  function handleClick(e: MouseEvent) {
    if (!isMobile) {
      e.preventDefault();
    }
  }

  return (
    <Link href={href} onClick={e => handleClick(e)}
          onDoubleClick={e => handleDBClick(e)}
          className='relative group focus:outline-none flex flex-col items-center w-[140px] my-2 select-none justify-self-center cursor-default'>
      {isSafari ? <>
        <input
          type='text' className='cursor-default group z-10 absolute w-[100%] h-[100%] opacity-0 safari-focus'
        />
      </> : ''}
      <header className='flex justify-center items-center w-[128px] h-[128px] rounded-md group-focus:folder-active'>
        <Image priority className='pointer-events-none' width={100} height={100}
               src={folder} alt='folder' />
      </header>
      <p
        className='max-w-[100%] overflow-hidden text-ellipsis text-gray-700 dark:text-fold-from text-[13px] mt-0.5 px-1 rounded-[4px] group-focus:bg-folder-n-hv group-focus:text-white'>{folderName}</p>
    </Link>
  );
}