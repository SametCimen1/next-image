'use client';

import Image from "next/image"
import { getImageUrl } from "@/lib/utils"
import Link from "next/link";
export default function Page(){
    const urls = ['pDgD4qOhNfn4NpG6RjeqF', 'ErJ4vNWk0ZfobHnvTnf6M', 'ejD1n-UcWatU29GFu0M-S']

    return (
        <div className="">
            <div className="flex flex-col xl:flex-row xl:justify-between">
                {urls.map((image_url) => (
                    <Link
                        href={`dashboard/edit-image/${image_url}`}
                        
                    >
                        <Image 
                            key={image_url}
                            src={getImageUrl(image_url)}
                            width={200}
                            height={200}
                            alt="image from s3 bucket"
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}