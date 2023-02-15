'use client'; // Error components must be Client components

import React, { useEffect } from 'react';
import Background from '@/ui/Background';

export default function Error({ error, reset }: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Background>
      <main className='flex flex-col'>
        <h2 className='text-4xl m-1.5 font-bold'>网络错误❌</h2>
        <h2 className='text-4xl m-1.5 font-bold'>或没有该目录</h2>
        <div className='m-1.5'>
          <strong className='font-bold'>Error:</strong> {error?.message}
        </div>
        <footer className='text-center m-1.5'>
          <button
            className='bg-red-500 px-4 py-1 font-medium rounded-full active:bg-red-300 text-fold-from'
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            重试
          </button>
        </footer>
      </main>
    </Background>
  );
}
