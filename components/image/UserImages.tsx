import { auth } from "@/auth";
import Image from "next/image"
import Link from "next/link";
import {getImageKey} from '@/lib/utils'
import { useState } from "react";
import ImageComponent from '@/components/image/imageComponent';
import getBaseURL from '@/lib/base-url';

async function getImages(){
    const session = await auth();
    const email = session?.user?.email;

    const url = "https://next-image-pied.vercel.app/api/s3-upload";
    const response = await fetch(url, { method: "PUT", body: JSON.stringify({userEmail: email}) });
    const returnValue = await response.json();
    return returnValue[0];
}

export default async function UserImages(){

    const image_url = await getImages();



 

    return(
        <div className="mt-5 w-full">
            <span>My Images</span>
            <div className="flex flex-wrap gap-1 justify-between ">
                {image_url.map((obj:string) => (
                    <ImageComponent key={obj} obj = {obj}/>
                ))}
            </div>
        </div>
    )
}