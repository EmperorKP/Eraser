import { FileListContext } from '@/app/_context/FileListContext';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Archive, MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';


export interface FILE{
  archive:boolean,
  createdBy:string,
  document:string,
  fileName:string,
  teamid:string,
  whiteboard:string,
  _id:string,
  _creationTime:number
}

function FileList() {

  const {filelist_,setfilelist_}=useContext(FileListContext);
  const [fileList,setfileList]=useState<any>();
  const {user}:any=useKindeBrowserClient();
  const router = useRouter();

  useEffect(()=>{
    filelist_&&setfileList(filelist_)

    console.log(filelist_)
  },[filelist_])
  return (
    <div className='mt-10'>
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created at</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Edited</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Author</td>

                
                    
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                {fileList&&fileList.map((file:FILE,index:number)=>(
                  <tr className="odd:bg-gray-50 cursor-pointer" key={index} onClick={()=>router.push('/workspace/'+file._id)}>
                   <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{file.fileName}</td>
                   <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file._creationTime).format('DD MM YYYY')}</td>
                   <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(file._creationTime).format('DD MM YYYY')}</td>
                   <td className="whitespace-nowrap px-4 py-2 text-gray-700"> <Image src={user?.picture} alt='user' height={30} width={30} className='rounded-full'/></td>
                   <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger><MoreHorizontal/></DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem className='gap-3'><Archive className='h-4 w-4'/> Archive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>


                   </td>
                  </tr>

                ))}
               


                </tbody>
            </table>
            </div>

    </div>
  )
}

export default FileList