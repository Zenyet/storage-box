import File from "@/ui/File";
import List from "@/ui/List";
interface File {
    filename: string,
    extension: string
}

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

export default function Page() {
    return (
        <>
            <div className="w-[90%] grid grid-cols-8 gap-6 mx-auto my-10 text-gray-700">
                {
                    // files.map((file, idx) => {
                    //     return <File key={idx} extension={file.extension}/>
                    // })
                }
                <List/>
            </div>
        </>
    );
}
