import '@/styles/globals.css';
import React from 'react';
import Navbar from '@/ui/Navbar';
import Breadcrumb from '@/ui/Breadcrumb';
// import useMenu from '../hooks/useMenu';

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  // const [init] = useMenu();
  // init();

  return (
    <html lang='zh'>
    <head>
      <title>/dev/disk0</title>
    </head>
    <body className='overflow-y-scroll bg-white dark:bg-body-dark'>
    <div className='z-0 flex relative overflow-hidden'>
      <div
        className='w-full h-16 fixed z-20 bottom-0 sm:relative sm:w-1/6 sm:h-screen border-r-[1px] dark:border-black'>
        <Navbar />
      </div>
      <div className='relative w-full pb-14 sm:pb-0 sm:w-5/6 h-screen z-10 sm:z-50 overflow-y-auto'>
        {children}
        {/*<Suspense fallback={<Loading />}>*/}
        {/*  {children}*/}
        {/*</Suspense>*/}
        <Breadcrumb />
      </div>
    </div>
    </body>
    </html>
  );
}
