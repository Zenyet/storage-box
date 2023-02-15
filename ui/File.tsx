'use client';
import React from 'react';
import Link from 'next/link';
// import useMenu from '../hooks/useMenu';
import useDownload from '../hooks/useDownload';
// import Menu from '@/ui/Menu';

interface FileProps {
  fileName: string,
  extension: string,
  downloadURL: string,
}

export default function File({ fileName, extension, downloadURL }: FileProps) {
  // const [, MENU_ID] = useMenu();

  function handleDBClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    e.preventDefault();
    useDownload(downloadURL);
  }

  return (
    <>
      {/*
                184*239/2
                w: 184/2
                h: 239/2
            */}
      {/*<Menu />*/}
      <Link href={''} onClick={e => e.preventDefault()}
            onDoubleClick={e => handleDBClick(e)}
            className='flex group flex-col items-center w-[140px] my-2 select-none justify-self-center cursor-default'>
        <header
          className='flex justify-center items-center file-drop group-focus:bg-folder-hv w-[128px] h-[128px] rounded-md'>
          <div
               className='flex-row relative bg-gradient-to-tr from-file-from to-file-to bg-white w-[72px] h-[96px] rounded-md text-black clip-top-right'>
            <div
              className='h-[24px] w-[24px] bg-gradient-to-tr from-linear-from to-linear-to blur absolute right-[2px] top-[2px] z-0'>
            </div>
            <div
              className='h-[26px] w-[26px] bg-gradient-to-tr from-fold-from to-fold-to rounded-bl-lg absolute right-0 top-0 z-10'>
            </div>
            <footer className='flex absolute bottom-0 w-[100%] justify-center bottom-2'>
              <span className='text-file-type font-normal text-xl select-none'>{extension}</span>
            </footer>
          </div>
        </header>
        <span
          className='max-w-[100%] overflow-hidden text-ellipsis text-gray-700 text-[13px] mt-0.5 px-1 rounded-[4px] group-focus:bg-folder-n-hv group-focus:text-white'>{fileName}</span>
      </Link>
    </>
  );
}