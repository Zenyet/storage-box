import React, { useState } from 'react';
import { PreviewConfig } from '../types';


export default function usePreview(): [PreviewConfig, (pConfig: PreviewConfig) => void] {
  const [show, setShow] = useState<boolean>(false);
  const [left, setLeft] = useState<string>('0');
  const [top, setTop] = useState<string>('0');
  const [url, setUrl] = useState<string>('');
  const [filename, setFilename] = useState<string>('');
  const [extension, setExtension] = useState<string>('');
  const [width, setWidth] = useState<string>('128px');
  const [height, setHeight] = useState<string>('128px');

  // const [pConfig, setPConfig] = useState<PreviewConfig>({
  //   show: false,
  //   left: '0',
  //   top: '0',
  // });

  function preview({ show, left, top, url, filename, extension, width, height }: PreviewConfig) {
    if (left && top && width && height) {
      setLeft(left);
      setTop(top);
      setWidth(width);
      setHeight(height);
    }
    if (url) {
      setUrl(url);
    }
    if (filename) {
      setFilename(filename);
    }
    if (extension) {
      setExtension(extension);
    }
    setShow(show);
  }

  return [{ show, left, top, filename, url, extension, width, height }, preview];
}