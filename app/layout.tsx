import '@/styles/globals.css';
import React from 'react';
import Navbar from "@/ui/Navbar";

export default function RootLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <html>
        <head>
            <title>disk0.dev</title>
        </head>
        <body className="overflow-y-scroll bg-white h-screen">
        <div className='flex'>
            <div className="w-1/6 border-r-[1px]">
                <Navbar/>
            </div>
            <div className="w-5/6">
                {children}
            </div>
        </div>
        </body>
        </html>
    );
}
