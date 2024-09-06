'use client'
import {useCallback} from 'react'

import useSWRMutation from "swr/mutation";

import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';

import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import {useDropzone} from 'react-dropzone'
import { Button } from '../ui/button';

async function uploadDocuments(
    url: string,
    files: any,
    email:string,
  ): Promise<Object[]> {


    const body = new FormData();
    body.append('file', files[0], files[0].name);
    body.append('email', email)

    const response = await fetch(url, { method: "POST", body });
    return await response.json();
}



  
export default function ImageUpload(){
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    const { data: session, update } = useSession()
    const router = useRouter();

    function uploadFiles(files: any, email: string | null | undefined){
        if(!files){
            alert("no file attached")
        }else{
            uploadDocuments('/api/s3-upload', files, email || "");
            router.refresh();
        }
    }
    
    return (
        <section className="container w-full">
          <div {...getRootProps({className: 'dropzone disabled cursor-pointer border border-dashed '})}>
            <input {...getInputProps()} />
            <p>Drag and drop some files here, or click to select files</p>
            
          </div>
          <Button 
            className='mt-5'
            onClick={() => uploadFiles(acceptedFiles, session?.user?.email)}>Upload</Button>
        </section>
    );
}