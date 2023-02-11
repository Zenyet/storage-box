import React from "react";

export default function File({extension}: { extension: string }) {
    return (
        <>
            {/*
                184*239/2
                w: 184/2
                h: 239/2
            */}
            <div
                className="flex-row relative bg-gradient-to-tr from-file-from to-file-to bg-white w-[92px] h-[120px] rounded-md text-black clip-top-right">
                <div
                    className='h-[31px] w-[31px] bg-gradient-to-tr from-linear-from to-linear-to blur absolute right-[4px] top-[4px] z-0'>
                </div>
                <div className="h-[33px] w-[33px] bg-gradient-to-tr from-fold-from to-fold-to rounded-bl-lg absolute right-0 top-0 z-10">
                </div>
                <footer className='flex absolute bottom-0 w-[100%] justify-center bottom-2'>
                    <span className='text-file-type font-normal text-xl select-none'>{extension.toUpperCase()}</span>
                </footer>
            </div>
        </>
    )
}