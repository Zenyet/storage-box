'use client'; // define client component
import React from 'react';
import Background from '@/ui/Background';

export default function Page() {
  return (
    <Background>
      <h2 className='text-4xl font-bold py-4'>Hello! 👋</h2>
      <p>这是我的 Onedrive 目录!</p>
      <footer className='pt-2'>Made with ❤️ by <a
        className='hover:bg-blue-400 px-0.5 text-white border-b-2 border-blue-400 transition-colors' target='_blank'
        href='https://yequalsx.com'>Zenyet</a></footer>
    </Background>
  );
}