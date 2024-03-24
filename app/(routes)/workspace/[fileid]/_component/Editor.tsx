"use client"
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
//@ts-ignore
import Header from '@editorjs/header';
//@ts-ignore
import List from "@editorjs/list";
//@ts-ignore
import Checklist from '@editorjs/checklist'
//@ts-ignore
import Paragraph from '@editorjs/paragraph';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '@/app/(routes)/dashboard/_components/FileList';

const rawDocument={
        "time" : 1550476186479,
        "blocks" : [{
            data:{
                text:'Document Name',
                level:2
            },
            id:"123",
            type:'header'
        },
        {
            data:{
                
                level:4
            },
            id:"1234",
            type:'header'
        }
    ],
        "version" : "2.8.1"
}


function Editor({onsavetrigger,fileId,fileData}:{onsavetrigger:any,fileId:any,fileData:FILE}) {
    const ref=useRef<EditorJS>();
    const updateDocument=useMutation(api.file.updateDocument)
    const [document,setdocument]=useState(rawDocument);
    useEffect(()=>{
        fileData&&initEditor()
    },[fileData])
    useEffect(()=>{
        onsavetrigger&&onsaveDocument();
        console.log("triggervalue:",onsavetrigger)
    },[onsavetrigger])

    const onsaveDocument=()=>{
        if(ref.current){
            ref.current.save().then((outputData) => {
                console.log('Article data: ', outputData)
                updateDocument({
                    _id:fileId,
                    document:JSON.stringify(outputData)
                }).then(resp=>{
                        toast('Document Updated!')
                
                },(e)=>{
                    toast("server error!")
                })
              }).catch((error) => {
                console.log('Saving failed: ', error)
              }); 
        }
    }

    const initEditor=()=>{
        const editor = new EditorJS({
            /**
             * Id of Element that should contain Editor instance
             */
            tools: {
                
                header: {
                  class: Header,
                  shortcut: 'CMD+SHIFT+H',
                  config: {
                    placeholder: 'Enter a header',
                    levels: [2, 3, 4],
                    defaultLevel: 3
                  },
                  
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                      defaultStyle: 'unordered'
                    }
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                  },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                  },
              },
            
            holder: 'editorjs',
            data:fileData.document?JSON.parse(fileData.document):rawDocument
          });
          ref.current=editor
    }

  return (
    <div>
        <div id='editorjs' className='ml-16'>

        </div>
    </div>
  )
}

export default Editor