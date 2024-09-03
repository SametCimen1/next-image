import { NextResponse } from "next/server";
import {S3Client, PutObjectCommand, GetObjectCommand} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import pool from '@/db';
import { auth } from "@/auth";

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});


async function uploadFileToS3(file:Buffer, fileName:string){
  const fileBuffer = file;
  

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


export async function POST(request:any){
    try {

      const formData = await request.formData();
      const file = formData.get('file');

      if(!file){
        return NextResponse.json({error:"File is required"}, {status:400})
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = await uploadFileToS3(buffer, file.name)

      const session = await auth();
      const email = session?.user?.email;

      await pool.query("INSERT INTO image_urls(image_url, user_email) VALUES($1, $2)", [fileName, email])
      console.log('FILEEEE NAMEEE')
      console.log(fileName);

      return NextResponse.json({success: true, fileName})
    } catch (error) {
      console.log("ERROR OCCURED")
      console.log(error);
        return NextResponse.json({error:"Error uploading file"})
    }
}


export async function GET(request:any){
  try {
    // const formData = await request.formData();
    // const file = formData.get('file');

    // if(!file){
    //   return NextResponse.json({error:"File is required"}, {status:400})
    // }
    // const buffer = Buffer.from(await file.arrayBuffer());
    // const fileName = await uploadFileToS3(buffer, file.name)

    // return NextResponse.json({success: true, fileName})



    const session = await auth();
    const email = session?.user?.email;

    console.log('req auth')
    console.log(request.auth);
    const response = await pool.query("SELECT * FROM image_urls WHERE user_email = $1", [email]);

    console.log("RESPONSE FOROM RESPONSE")
    console.log(response);


    const command = new GetObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
      Key: 'images/414472382_1060220901883264_96769501960867858_n.jpg-1725334362161',
    });

    const url = await getSignedUrl(s3Client, command);
    console.log("RETURNED URLLLL")
    console.log(url);
    return NextResponse.json(url)

  } catch (error) {
      console.log("ERROR IS")
      console.log(error)
      return NextResponse.json({error:"Error uploading file"})
  }
}