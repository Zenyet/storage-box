import File from '@/ui/File';
import { getRootDir } from '@/lib/index';
import { ItemType } from '../types';
import Folder from '@/ui/Folder';

export default async function Page() {
  const items: ItemType[] = await getRootDir();

  function computedType(name: string): string {
    // return name.split('.').at(-1) as string; // get final item u can also use pop()!
    let splits: string[] = name.split('.');
    return splits.length > 1 ? splits.pop() as string : '?';
  }

  return (
    items?.map((item, idx) => {
      if (item.folder) {
        return <Folder key={idx} folderName={item.name}/>;
      } else if (item.file && item['@microsoft.graph.downloadUrl']) {
        return <File key={idx} fileName={item.name} extension={computedType(item.name)}
                     downloadURL={item['@microsoft.graph.downloadUrl']} />;
      }
    })
  );
}