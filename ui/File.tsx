'use client';
import React, { KeyboardEvent, FocusEvent, useContext } from 'react';
import Link from 'next/link';
// import useMenu from '../hooks/useMenu';
import useDownload from '../hooks/useDownload';
import PreviewContext from '../context';
import { Thumb } from '../types';
import useUserAgent from '../hooks/useUserAgent';
import useSWR, { Fetcher } from 'swr';

// import Menu from '@/ui/Menu';


interface FileProps {
  id: string,
  downloadURL: string,
  fileName: string,
  extension: string,
  href_?: string,
  itemId?: string,
}

export default function File({ id, downloadURL, fileName, extension, href_ }: FileProps) {
  // const [, MENU_ID] = useMenu();
  const [isSafari] = useUserAgent();
  const preview = useContext(PreviewContext)!;
  const href: string = `${href_ ? href_ : ''}/${fileName}`;
  const fetcher: Fetcher<Thumb, string> = (url) => fetch(url).then((res) => res.json());

  const { data } = useSWR(`/api/thumbnail?id=${id}`, fetcher);


  function movingPreview<T extends React.UIEvent | React.SyntheticEvent>(e: T) {
    if (isSafari) {
      const { left, top, width, height } = e.currentTarget.children[1].children[0].getBoundingClientRect();
      preview({ show: false, left: left + 'px', top: top + 'px', height: height + 'px', width: width + 'px' });
    } else {
      const { left, top, width, height } = e.currentTarget.children[0].children[0].getBoundingClientRect();
      preview({ show: false, left: left + 'px', top: top + 'px', height: height + 'px', width: width + 'px' });
    }
  }

  function handleClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();
    movingPreview<React.MouseEvent<HTMLElement>>(e);
  }

  function handleDBClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    e.preventDefault();
    useDownload(downloadURL);
  }

  function handleSpace(e: KeyboardEvent) {
    if (e.code === 'Space') {
      e.preventDefault();
      preview({ show: true, filename: fileName, url: downloadURL, extension });
    }
  }

  function handleFocus(e: FocusEvent) {
    e.stopPropagation();
    e.preventDefault();
    movingPreview<React.FocusEvent>(e);
  }

  function computeStyle(): { height?: string, width?: string } | undefined {
    // console.log(thumbnail?.height);
    if (data && data.width > 140 && data.height < data.width) {
      const radio = data.height / data.width;
      return {
        height: 115 * radio + 'px',
      };
    }
    if (data && data.height > 140 && data.width < data.height) {
      const radio = data.width / data.height;
      return {
        width: 115 * radio + 'px',
      };
    }
    return undefined;
  }

  return (
    <>
      {/*
                184*239/2
                w: 184/2
                h: 239/2
            */}
      {/*<Menu />*/}
      <Link href={href}
            onClickCapture={e => handleClick(e)}
            onDoubleClick={e => handleDBClick(e)}
            onKeyDown={e => handleSpace(e)}
            onFocus={e => handleFocus(e)}
            className='relative focus:outline-none flex group flex-col items-center w-[140px] my-2 select-none justify-self-center cursor-default'>
        {isSafari ? <>
          <input
            onClickCapture={e => handleClick(e)}
            type='text' className='cursor-default group z-10 absolute w-[100%] h-[100%] opacity-0 safari-focus'
          />
        </> : ''}
        <header
          className='w-[100%] flex justify-center items-center file-drop group-focus:folder-active w-[128px] h-[128px] rounded-md'
        >
          {
            data?.url ?
              <>
                <div className='overflow-hidden bg-white shadow-sm w-[85%] h-[85%] p-1'
                     style={{ ...computeStyle() ?? {} }}
                >
                  <div
                    className='w-[100%] h-[100%]' style={{
                    backgroundImage: `url(${data.url})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}></div>
                  {/*<img src={thumbnail} alt='thumbnail' />*/}
                </div>
              </> : <>
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
              </>
          }
        </header>
        <p
          className='max-w-[100%] line-limit overflow-hidden text-ellipsis text-gray-700 dark:text-fold-from text-[13px] mt-0.5 px-1 rounded-[4px] group-focus:bg-folder-n-hv group-focus:text-white'>{fileName}</p>
      </Link>
    </>
  );
}