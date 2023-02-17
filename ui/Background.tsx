import React from 'react';

export default function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative w-[100%] h-[100%] flex items-center'>
      <div className='ml-32 mb-32'>
        {children}
      </div>
      <svg className='blur-[100px] scale-75 absolute right-0 top-1/2 translate-y-[-50%]' width='600' height='586'
           viewBox='0 0 600 586' fill='none'
           xmlns='http://www.w3.org/2000/svg'>
        <path fillRule='evenodd' clipRule='evenodd'
              d='M298.115 29.1601C347.418 34.1227 402.334 10.4798 444.012 37.2809C485.661 64.0626 491.246 121.559 511.835 166.591C530.488 207.392 548.396 246.528 559.545 289.983C573.739 345.303 621.533 411.446 586.159 456.285C548.494 504.028 464.66 457.789 408.59 481.331C362.85 500.535 345.527 562.627 298.115 577.223C246.654 593.064 189.93 583.909 139.883 564.048C85.7959 542.584 18.6167 516.343 3.26602 460.214C-12.9307 400.991 62.9401 351.348 64.9299 289.983C66.8166 231.798 0.300036 182.564 14.1028 126.008C27.7487 70.095 79.7396 24.6731 134.214 6.09745C187.338 -12.018 242.269 23.5388 298.115 29.1601Z'
              fill='url(#paint0_linear_3_21)' stroke='black' />
        <defs>
          <linearGradient id='paint0_linear_3_21' x1='-272.127' y1='301.558' x2='295.17' y2='882.113'
                          gradientUnits='userSpaceOnUse'>
            <stop stopColor='#172368' />
            <stop offset='1' stopColor='#CD6549' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}