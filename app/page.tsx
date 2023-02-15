import { getRootDir } from '@/lib/index';
import { ItemType } from '../types';
import React from 'react';
import List from '@/ui/List';

export default async function Page() {
  const items: ItemType[] = await getRootDir();
  return <List items={items} />;
}