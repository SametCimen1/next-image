import { NextResponse } from "next/server";
import {S3Client, PutObjectCommand, GetObjectCommand} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import pool from '@/db';
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";



const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});


async function uploadFileToS3(file:Buffer, fileName:string){

  const {url, fields} = await createPresignedPost(s3Client, {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME || '',
    Key: nanoid(),
  })

  const fileBuffer = file;

  const uploadResponse = await fetch(url, {
    method: "POST",
    body: fileBuffer
  })

  const response = await uploadResponse.text();

  if (uploadResponse.ok) {

} else {
    console.error('Failed to upload file');
}
  
  

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: `images/${fileName}-${Date.now()}`,
    Body: fileBuffer,
    ContentType: "image/jpg"
  }

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return fileName;
}


export async function POST(request:Request){
    try {


      const formData = await request.formData();
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
      console.log('email')
      console.log(email);

      if(email === ''){
        console.log('insert without email')
        await pool.query("INSERT INTO image_urls(image_url, user_email) VALUES($1, $2)", [fields.key, 'local']);
      }else{
        await pool.query("INSERT INTO image_urls(image_url, user_email) VALUES($1, $2)", [fields.key, email]);
      }
    

    
    
      if (uploadResponse.ok) {
        console.log('File uploaded successfully');

    } else {
        console.error('Failed to upload file');
    }

     
      revalidatePath('/dashboard')
      return NextResponse.json({success: true, url:fields.key})
    } catch (error) {
      console.log("ERROR OCCURED")
      console.log(error);
        return NextResponse.json({error:"Error uploading file"})
    }
}


export async function PUT(request:Request){
  try {

    const data = await request.json();

    const email = data.userEmail;
    const response = await pool.query("SELECT * FROM image_urls WHERE user_email = $1", [email]);



    const arrOfImageUrls=[]

    arrOfImageUrls.push(response.rows.map(obj => `https://albertcamusbucket.s3.us-east-2.amazonaws.com/${obj.image_url}`))

    revalidatePath('/dashboard');
    return NextResponse.json(arrOfImageUrls);
   

  } catch (error) {
      console.log("ERROR IS")
      console.log(error)
      return NextResponse.json({error:"Error uploading file"})
  }
}