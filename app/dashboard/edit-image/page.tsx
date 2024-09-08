'use client';

import EditImage from '@/components/image/edit-image'
import { useState } from 'react'

export default function Page(){
    let value
    value = localStorage.getItem("image_url") || ""
    
    const [image_url, setImageUrl] = useState(value)
    console.log("MY IMAGe URL")
    console.log(image_url)  
    return(
        <div>
        <EditImage url={image_url}/>
        </div>
    )
}