'use client'
import {useCallback, useState} from 'react'
import useSWRMutation from "swr/mutation";
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { useSession } from "next-auth/react"
import {useDropzone, FileWithPath } from 'react-dropzone'
import { Button } from '../ui/button';
import { Download, Files } from 'lucide-react';
import { useRouter } from "next/navigation";


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

    return response.url;
}



  
export  default function ImageUpload({type}:{type:string}){
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({maxFiles:1});
    const [isUploading, setIsUploading] = useState(false);
    const { data: session, update } = useSession()
    const router = useRouter();

     function uploadFiles(files: any, email: string | null | undefined){
        if(!files){
            alert("no file attached")
        }else{
            setIsUploading(true);
            uploadDocuments('/api/s3-upload', files, email || "");
            if(email === undefined || email ===''){
                console.log("SET LOCAL STORAGE")
                router.push('/dashboard/edit-image')
            }else if(type === "home" && email !== undefined){
                router.push(`/dashboard/`)
            }
            else if(type === "dashboard" && email !== undefined){
              console.log(' in dashboard ');
              router.refresh();
          }
            setIsUploading(false);
        }
        router.refresh();
    }
    const files = acceptedFiles.map((file:FileWithPath) => {
      return(
        (
          <li key={file.size}>
            {file.path}
          </li>
        )
      )
    });


    const callFunctions  = async() => {
        uploadFiles(acceptedFiles, session?.user?.email);
        router.refresh();
    }

      
    return (
        <section className="w-full mt-5">
          {isUploading &&
            <div className='absolute w-screen h-screen z-50 bg-gray-100'>
              <p>Hello</p>
            </div>
          }
          <div {...getRootProps({className: 'dropzone cursor-pointer border border-dashed min-w-96 text-center p-5 hover:bg-blue-200'})}>
            <input {...getInputProps()}/>
            <Download className='mx-auto mb-2'/>
            <span className=''>Upload Files</span>
          </div>
          <div className='text-start'>
            {files}
          </div>
          <Button 
            className='mt-5 flex '
            onClick={() => callFunctions()}>Upload</Button>
        </section>
    );
}