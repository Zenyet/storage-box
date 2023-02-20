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
    <html>
    <head>
      <title>/dev/disk0</title>
    </head>
    <body className='overflow-y-scroll bg-white h-screen'>
    <div className='flex relative overflow-hidden'>
      <div className='w-1/6 border-r-[1px]'>
        <Navbar />
      </div>
      <div className='relative w-5/6 h-screen overflow-y-auto'>
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
