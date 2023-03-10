/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ // which files use tailwind!
    './app/**/*.{js,ts,jsx,tsx}',
    './page/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: { // extends className value
      // https://vercel.com/design/color
      colors: {
        'linear-from': 'rgba(0,0,0,.5)',
        'linear-to': 'rgba(0,0,0,.35)',
        'file-to': '#e7e7e7',
        'file-from': '#fff',
        'fold-to': '#ccc',
        'fold-from': '#fefefe',
        'file-type': '#7f7f7f',
        'nav': '#f6f6f6',
        'mobile-nav': 'rgba(246, 246, 246,.7)',
        'nav-dark': '#383838',
        'mobile-nav-dark': 'rgba(56, 56, 56,.7)',
        'body-dark': '#1e1e1e',
        'bread-dark': '#373737',
        'bread-bg': 'rgba(255,255,255,.7)',
        'bread-dark-bg': 'rgba(55,55,55,.7)',
        'nav-active': '#dcdcdc',
        'folder-hv': '#e6e6e6',
        'folder-n-hv': '#0063e1',
        'text-bg': '#1e1e1e',
      },
      width: {
        'pc-w': '27.668px',
      },
      height: {
        'pc-h': '20.0273px',
      },
    },
  },
};
