'use client';
import { getImageKey } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Page({obj}:{obj:string}){

    const [imageHover, setImageHover] = useState(false);

    return(
        <div
        className="w-1/5 customWidth content-start"
        >
            <Link 
                key={obj} 
                href = {`/dashboard/edit-image/${getImageKey(obj)}`}
                className="bg-blue-500 relative">
                <Image 
                    src={obj}
                    width={500}
                    height={500}
                    className="rounded duration-200 hover:scale-105 w-full"
                    alt = "image from aws s3" />                    
            </Link>
        </div>
    )
}