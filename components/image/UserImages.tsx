import { auth } from "@/auth";
import Image from "next/image"

async function getImages(){
    const session = await auth();
    const url = "http://localhost:3000/api/s3-upload"
    const response = await fetch(url, { method: "GET" });
    return await response.json();
}

export default async function UserImages(){

    const image_url = await getImages();
    console.log("IMAGE URL")
    console.log(image_url)

    return(
        <div className="mt-5">
            <span>My Images</span>

            <Image 
                src = {image_url}
                alt = "Image from s3 bucket"
                width={700}
                height={700}
            />
        </div>
    )
}