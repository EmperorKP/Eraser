"use client"
import React, { useEffect, useState } from 'react'
import Worspaceheader from './_component/Worspaceheader'
import Editor from './_component/Editor'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FILE } from '../../dashboard/_components/FileList';
import Canvas from './_component/Canvas';

function Workspace({params}:any) {
    const [triggerSave,settriggerSave]=useState(false);
    const convex=useConvex();
    const [fileData,setfileData]=useState<FILE|any>();
    useEffect(()=>{
        console.log("fileId",params.fileid)
        params.fileid&&getFileData();
    },[])
    const getFileData=async()=>{
        const result=await convex.query(api.file.getFileById,{_id:params.fileid})
        setfileData(result);
    }

  return (
    <div>
        <Worspaceheader onSave={()=>settriggerSave(!triggerSave)}/>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className=' h-screen'>
                <Editor onsavetrigger={triggerSave} fileId={params.fileid} fileData={fileData}/>
            </div>

            <div className=' h-screen border-l'>
            <Canvas
            onsavetrigger={triggerSave} fileId={params.fileid} fileData={fileData}
            />
            </div>


        </div>

    </div>
  )
}

export default Workspace