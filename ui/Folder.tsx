import React from "react";
import Image from "next/image";
import folder from '../public/folder.webp';

export default function Folder() {
    return (
        <div
            className='group flex flex-col items-center w-[92px] my-2 select-none justify-self-center'>
            <header className='px-2 py-3.5 rounded-md group-hover:bg-folder-hv'>
                <Image className="pointer-events-none" width={100} height={100} src={folder} alt='folder'/>
            </header>
            <span className='text-gray-700 text-[13px] mt-0.5 px-1 rounded-[4px] group-hover:bg-folder-n-hv group-hover:text-white'>folder</span>
        </div>
    )
}