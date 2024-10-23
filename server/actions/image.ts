"use server";
import { nanoid } from "nanoid";
import fs from 'fs/promises';
import {revalidatePath} from 'next/cache';
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import {S3Client, PutObjectCommand, GetObjectCommand} from '@aws-sdk/client-s3';
import { NextResponse } from "next/server";

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});


export async function uploadFile(formData: FormData){
    try{

   
      const file = formData.get('file');
      const email = formData.get('email');
      


    
      if(!file){
        return NextResponse.json({error:"File is required"}, {status:400})
      }


      const {url, fields} = await createPresignedPost(s3Client, {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME || '',
        Key: nanoid(),
      })


      const formDataS3 = new FormData();

        Object.entries(fields).forEach(([key, value]) => {
            formDataS3.append(key, value);
        })
        formDataS3.append('file', formData.get('file') as string);


        
      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formDataS3
      })
    
      const response = await uploadResponse.text();

    

      //await pool.query("INSERT INTO image_urls(image_url, user_email) VALUES($1, $2)", [fields.key, email])
    
    
      if (uploadResponse.ok) {
        console.log('File uploaded successfully');
    } else {
        console.error('Failed to upload file');
    }

     
    return NextResponse.json({success: true, msg:"ok"})
} catch (error) {
  console.log("ERROR OCCURED")
  console.log(error);
    return NextResponse.json({error:"Error uploading file"})
}}


