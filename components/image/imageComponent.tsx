'use client';
import { getImageKey } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Page({obj, index}:{obj:string, index:number}){


    return(
        <div
            className={`item ${index != 8 ?"my-2":"my-0"}`}
        >
            <Link 
                key={obj} 
                href = {`/dashboard/edit-image/${getImageKey(obj)}`}
                className=" relative ">
                <Image 
                    src={obj}
                    width={500}
                    height={500}
                    className="rounded w-full h-full"
                    alt = "image from aws s3" />                    
            </Link>
        </div>
    )
}