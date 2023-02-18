import { useEffect, useState } from 'react';

export default function useUserAgent(): boolean {
  const [isSafari, setIsSafari] = useState<boolean>(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);
  return isSafari;
}