import { auth } from "@/auth";
import Image from "next/image"
import Link from "next/link";
import {getImageKey} from '@/lib/utils'

async function getImages(){
    const session = await auth();
    const email = session?.user?.email;

    const url = "http://localhost:3000/api/s3-upload"
    const response = await fetch(url, { method: "PUT", body: JSON.stringify({userEmail: email}) });
    const returnValue = await response.json();
    return returnValue[0];
}

export default async function UserImages(){

    const image_url = await getImages();


 

    return(
        <div className="mt-5">
            <span>My Images</span>
            <div className="flex flex-wrap">
                {image_url.map((obj:string) => (
                    <Link key={obj} href = {`/dashboard/edit-image/${getImageKey(obj)}`}>
                        <Image 
                            src={obj}
                            width={500}
                            height={500}
                            alt = "image from aws s3"
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}