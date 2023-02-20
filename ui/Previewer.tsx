'use client';
import React, { useContext, useEffect, useRef } from 'react';
import PreviewContext from '../context';
import { PreviewConfig } from '../types';
import { matches } from '../utils';

export default function Previewer({ show, left, top, filename, url, extension, width, height }: PreviewConfig) {
  // const [destroy, setDestroy] = useState<boolean>(false);
  const preview = useContext(PreviewContext)!;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // setDestroy(false);

    function listener(e: KeyboardEvent) {
      // e.preventDefault(); 除了ESC或者其他绑定时间 code能执行，其他都不行了..
      if (e.code === 'Escape') {
        videoRef!?.current!?.pause();
        preview({ show: false });
      }
    }

    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [show]);

  function handleClick() {
    videoRef!?.current!?.pause();
    preview({ show: false });
  }

  // function handlePress(e: React.KeyboardEvent) {
  //   e.preventDefault();
  //   if (e.code === 'Escape') {
  //     preview({ show: false });
  //   }
  // }

  return (
    <div
      className={'backdrop-blur-md preview-shadow border-[1px] border-gray-300 flex flex-col w-[128px] h-[128px] bg-preview-bg rounded-[10px] overflow-hidden fixed preview-default-pos z-0 opacity-0 preview-trans ' + (show ? 'preview-show' : '')}
      style={{ left, top, width, height }}
    >
      <header className='h-[5%] flex items-center'>
        <i className='ml-3'
           onClick={() => handleClick()}
        >
          <svg className='active:fill-gray-300' xmlns='http://www.w3.org/2000/svg' width='13.944' height='13.945'>
            <path
              d='M6.968 13.937c3.812 0 6.976-3.157 6.976-6.969C13.944 3.157 10.772 0 6.96 0 3.156 0 0 3.157 0 6.968c0 3.812 3.163 6.969 6.968 6.969Z'
              fill='#777' />
            <path
              d='M4.671 9.841a.566.566 0 0 1-.397-.967L6.17 6.977 4.274 5.08a.576.576 0 0 1-.164-.394c0-.32.254-.559.561-.559a.54.54 0 0 1 .396.159l1.901 1.9 1.923-1.908a.56.56 0 0 1 .958.393.515.515 0 0 1-.172.402L7.773 6.977l1.897 1.89a.53.53 0 0 1 .171.401.57.57 0 0 1-.576.573.54.54 0 0 1-.403-.165L6.968 7.775l-1.886 1.9a.542.542 0 0 1-.41.166Z'
              fill='#fff' />
          </svg>
        </i>
        <span className='text-[14px] font-bold text-gray-500 ml-2.5'>
          {filename}
        </span>
      </header>
      <footer className='flex items-center justify-center overflow-hidden h-[95%] rounded-[4px] m-1.5'>
        {matches(extension as string, 'image') &&
          <img loading='lazy' className='rounded-[4px] max-w-full' src={url} alt='preview' />}
        {matches(extension as string, 'video') &&
          <video ref={videoRef} autoPlay={true} controls className='rounded-[4px] w-[100%] max-w-full'
                 src={url}></video>}
      </footer>
    </div>
  );
}