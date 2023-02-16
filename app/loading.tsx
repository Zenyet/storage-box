import React from 'react';

export default function Loading() {
  return <div className='flex items-center justify-center w-[100%] h-[100%]'>
    <svg className='animate-spin' width="21px" height="21px" viewBox="0 0 21 21" version="1.1">
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
          <stop stopColor="#FFD305" offset="0%"></stop>
          <stop stopColor="#FDCF01" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-2">
          <stop stopColor="#52CF30" offset="0%"></stop>
          <stop stopColor="#3BBD1C" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-3">
          <stop stopColor="#14ADF6" offset="0%"></stop>
          <stop stopColor="#1191F4" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-4">
          <stop stopColor="#CA70E1" offset="0%"></stop>
          <stop stopColor="#B452CB" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-5">
          <stop stopColor="#FF645D" offset="0%"></stop>
          <stop stopColor="#FF4332" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-6">
          <stop stopColor="#FBB114" offset="0%"></stop>
          <stop stopColor="#FF9508" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Cursors/Beachball" transform="translate(-6.000000, -6.000000)" fillRule="nonzero">
          <g id="Cursors-/-Beachball" transform="translate(6.000000, 6.000000)">
            <path d="M6.0455335,1.54445382 C6.8189948,1.64043086 7.5864142,1.8896372 8.3038476,2.30384758 C11.1736033,3.9607018 12.1568542,7.6302443 10.5,10.5 C8.8431458,7.6302443 5.1736033,6.6469933 2.30384758,8.3038476 C1.58745287,8.7174583 0.98862174,9.256496 0.51907785,9.8772076 C0.7437679,6.2205558 2.93355017,3.0953409 6.0455335,1.54445382 L6.0455335,1.54445382 Z" id="Segment-(Yellow)" fill="url(#linearGradient-1)"></path>
            <path d="M0.51907785,9.8772076 C0.98862174,9.256496 1.58745287,8.7174583 2.30384758,8.3038476 C5.1736033,6.6469933 8.8431458,7.6302443 10.5,10.5 C7.1862915,10.5 4.5,13.1862915 4.5,16.5 C4.5,17.3276991 4.6675983,18.1162535 4.9707096,18.8335781 C2.27601064,17.0420765 0.5,13.978443 0.5,10.5 C0.5,10.2908406 0.50642141,10.083181 0.51907785,9.8772076 L0.51907785,9.8772076 Z" id="Segment-(Green)" fill="url(#linearGradient-2)"></path>
            <path d="M4.9707096,18.8335781 C4.6675983,18.1162535 4.5,17.3276991 4.5,16.5 C4.5,13.1862915 7.1862915,10.5 10.5,10.5 C8.8431458,13.3697557 9.8263967,17.0392982 12.6961524,18.6961524 C13.4135858,19.1103628 14.1810052,19.3595691 14.9544665,19.4555462 C13.613134,20.1240122 12.1004753,20.5 10.5,20.5 C8.4555955,20.5 6.5544799,19.8865072 4.9707096,18.8335781 L4.9707096,18.8335781 Z" id="Segment-(Blue)" fill="url(#linearGradient-3)"></path>
            <path d="M14.9544665,19.4555462 C14.1810052,19.3595691 13.4135858,19.1103628 12.6961524,18.6961524 C9.8263967,17.0392982 8.8431458,13.3697557 10.5,10.5 C12.1568542,13.3697557 15.8263967,14.3530067 18.6961524,12.6961524 C19.4125471,12.2825417 20.0113783,11.743504 20.4809222,11.1227924 C20.2562321,14.7794442 18.0664498,17.9046591 14.9544665,19.4555462 L14.9544665,19.4555462 Z" id="Segment-(Purple)" fill="url(#linearGradient-4)"></path>
            <path d="M20.4809222,11.1227924 C20.0113783,11.743504 19.4125471,12.2825417 18.6961524,12.6961524 C15.8263967,14.3530067 12.1568542,13.3697557 10.5,10.5 C13.8137085,10.5 16.5,7.8137085 16.5,4.5 C16.5,3.6723009 16.3324017,2.88374649 16.0292904,2.16642192 C18.7239894,3.9579235 20.5,7.021557 20.5,10.5 C20.5,10.7091594 20.4935786,10.916819 20.4809222,11.1227924 L20.4809222,11.1227924 Z" id="Segment-(Red)" fill="url(#linearGradient-5)"></path>
            <path d="M16.0292904,2.16642192 C16.3324017,2.88374649 16.5,3.6723009 16.5,4.5 C16.5,7.8137085 13.8137085,10.5 10.5,10.5 C12.1568542,7.6302443 11.1736033,3.9607018 8.3038476,2.30384758 C7.5864142,1.8896372 6.8189948,1.64043086 6.0455335,1.54445382 C7.386866,0.87598781 8.8995247,0.5 10.5,0.5 C12.5444045,0.5 14.4455201,1.11349277 16.0292904,2.16642192 L16.0292904,2.16642192 Z" id="Segment-(Orange)" fill="url(#linearGradient-6)"></path>
          </g>
        </g>
      </g>
    </svg>
  </div>;
}