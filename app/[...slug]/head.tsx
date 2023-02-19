import React from 'react';

// tip: still not working in development mode .
export default function Head({ params }: { params: { slug: string & string[] } }) {
  return (
    // use head.js in app/?other/[dir]/head.tsx before 13.2 , yep finally i finish it, cry :(
    <>
      <title>{'/dev/disk0/' + decodeURIComponent(params.slug.join('/'))}</title>
    </>
  );
}