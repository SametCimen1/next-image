import Image from "next/image"
import { getImageUrl } from "@/lib/utils"

export default function Page({url}:{url:{params:{url:string}}}){

    return(
        <Image
            src={getImageUrl(url?.params?.url)}
            width={500}
            height={500}
            alt = "image from s3 bucket"
        />
    )
}