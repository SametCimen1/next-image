'use client';
import { getImageKey } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Page({obj}:{obj:string}){

    const [imageHover, setImageHover] = useState(false);

    return(
        <div
        className="item"
        >
            <Link 
                key={obj} 
                href = {`/dashboard/edit-image/${getImageKey(obj)}`}
                className=" relative ">
                <Image 
                    src={obj}
                    width={500}
                    height={500}
                    className="rounded w-full mb-5 h-full"
                    alt = "image from aws s3" />                    
            </Link>
        </div>
    )
}