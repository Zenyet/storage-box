import { useEffect, useState } from 'react';

export default function useUserAgent(): [boolean, boolean] {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSafari, setIsSafari] = useState<boolean>(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    setIsMobile(navigator.userAgent.indexOf('Mobile') !== -1);
  }, []);
  return [isSafari, isMobile];
}