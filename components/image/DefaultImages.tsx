'use client';

import Image from "next/image"
import { getImageUrl } from "@/lib/utils"
import Link from "next/link";
export default function Page(){
    const urls = ['pDgD4qOhNfn4NpG6RjeqF', 'ErJ4vNWk0ZfobHnvTnf6M', 'ejD1n-UcWatU29GFu0M-S','ejD1n-UcWatU29GFu0M-S']

    return (
        <div className="">
            <div className="flex flex-col flex-wrap md:flex-row xl:flex-row xl:justify-end  gap-2 ">
                {urls.map((image_url) => (
                    <Link
                        href={`dashboard/edit-image/${image_url}`}
                        key={image_url}
                        className="w-full fillWidth"
                    >
                        <Image 
                            src={getImageUrl(image_url)}
                            width={200}
                            height={200}
                            alt="image from s3 bucket"
                            className="rounded w-full"

                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}