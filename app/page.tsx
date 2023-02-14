import File from '@/ui/File';
import { getRootDir } from '@/lib/index';
import { ItemType } from '../types';
import Folder from '@/ui/Folder';

const files: File[] = [
    {
        filename: 'file1',
        extension: 'jpg'
    },
    {
        filename: 'file2',
        extension: 'jpeg'
    },
    {
        filename: 'file3',
        extension: 'png'
    },
    {
        filename: 'file4',
        extension: 'webp'
    },{
        filename: 'file5',
        extension: 'mp3'
    },
    {
        filename: 'file6',
        extension: 'mp4'
    },
    {
        filename: 'file7',
        extension: 'pdf'
    },
    {
        filename: 'file8',
        extension: 'md'
    }
]

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