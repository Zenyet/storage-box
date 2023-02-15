import React from 'react';

export default function NotFound() {
  return (
    <div className='w-[100%] h-[100%] flex flex-col justify-center items-center'>
      <main className='flex justify-center items-center bg-slate-400 rounded-md w-36 h-20'>
        <h2 className='p-1 text-gray-700'>没有该目录！</h2>
      </main>
    </div>
  );
}