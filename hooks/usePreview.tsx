import React, { useState } from 'react';
import { PreviewConfig } from '../types';


export default function usePreview(): [PreviewConfig, (pConfig: PreviewConfig) => void] {
  const [show, setShow] = useState<boolean>(false);
  const [left, setLeft] = useState<string>('0');
  const [top, setTop] = useState<string>('0');
  const [url, setUrl] = useState<string>('');
  const [filename, setFilename] = useState<string>('');
  const [extension, setExtension] = useState<string>('');

  // const [pConfig, setPConfig] = useState<PreviewConfig>({
  //   show: false,
  //   left: '0',
  //   top: '0',
  // });

  function preview({ show, left, top, url, filename, extension }: PreviewConfig) {
    if (left && top) {
      setLeft(left);
      setTop(top);
    }
    if (url) {
      setUrl(url);
    }
    if (filename) {
      setFilename(filename);
    }
    if(extension) {
      setExtension(extension);
    }
    setShow(show);
  }

  return [{ show, left, top, filename, url, extension }, preview];
}