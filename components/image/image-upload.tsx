'use client'
import {useCallback} from 'react'
import useSWRMutation from "swr/mutation";
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import {useDropzone} from 'react-dropzone'
import { Button } from '../ui/button';
import { Download } from 'lucide-react';

async function uploadDocuments(
    url: string,
    files: any,
    email:string,
  ): Promise<Object[]> {


    const body = new FormData();
    body.append('file', files[0], files[0].name);
    body.append('email', email)

    const response = await (await fetch(url, { method: "POST", body })).json();
    console.log("TYpe of email")
    console.log(response)
    if(email === undefined || email ===''){
        console.log("SET LOCAL STORAGE")
        localStorage.setItem("image_url", response.url);
    }

    return response;
}



  
export default function ImageUpload(){
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({maxFiles:1});
    const { data: session, update } = useSession()
    const router = useRouter();

    function uploadFiles(files: any, email: string | null | undefined){
        if(!files){
            alert("no file attached")
        }else{
            uploadDocuments('/api/s3-upload', files, email || "");
            if(email === undefined || email ===''){
                console.log("SET LOCAL STORAGE")
                router.push('/dashboard/edit-image', { scroll: false })
            }
        }
    }
    const files = acceptedFiles.map(file => (
        <li key={file.size}>
          {file.path} 
        </li>
      ));

      
    return (
        <section className="w-full mt-5">
          <div {...getRootProps({className: 'dropzone cursor-pointer border border-dashed w-4/5 min-w-96 text-center p-5 hover:bg-blue-200'})}>
            <input {...getInputProps()}/>
            <Download className='mx-auto mb-2'/>
            <span className=''>Upload Files</span>
          </div>
          <div className='text-start'>
            {files}
          </div>
          <Button 
            className='mt-5 flex '
            onClick={() => uploadFiles(acceptedFiles, session?.user?.email)}>Upload</Button>
        </section>
    );
}