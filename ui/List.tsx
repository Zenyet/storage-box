import React from "react";
import Folder from "@/ui/Folder";

interface Folder {
    name: string,
    hasChildren?: boolean
}

const folders: Folder[] = [
    {
        name: 'folder1',
        hasChildren: true
    },
    {
        name: 'folder2',
    },
    {
        name: 'folder3',
    },
    {
        name: 'folder4',
    },
    {
        name: 'folder5',
    },
    {
        name: 'folder5',
    },
    {
        name: 'folder5',
    },
    {
        name: 'folder5',
    },
    {
        name: 'folder5',
    }
]

export default function List() {
    return (
        <>
            {folders.map((folder, idx) => {
                return <Folder key={idx}/>
            })}
        </>
    )
}