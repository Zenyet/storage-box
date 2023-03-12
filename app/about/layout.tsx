import React from 'react';

export default function Layout({ children }: {
  children: React.ReactNode;
}) {
  return <>
    {children}
  </>;
}

export const dynamic = 'auto'; // idk why it doesn't work when exported in page.tsx