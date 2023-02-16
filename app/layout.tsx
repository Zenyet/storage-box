import '@/styles/globals.css';
import React, { Suspense} from 'react';
import Navbar from '@/ui/Navbar';
import Loading from './loading';
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
      <div className='w-5/6'>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </div>
    </div>
    </body>
    </html>
  );
}
