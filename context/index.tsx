import React, { createContext } from 'react';
import { PreviewConfig } from '../types';

type Fn = (pConfig: PreviewConfig) => void;

const PreviewContext = createContext<Fn | null>(null);

export default PreviewContext;