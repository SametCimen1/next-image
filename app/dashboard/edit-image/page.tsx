// 'use client';

// import EditImage from '@/components/image/edit-image'
// import { useState } from 'react'
// import { auth } from "@/auth";

// export default function Page(){
//     let value
//     value = localStorage.getItem("image_url") || ""
    
//     const [image_url, setImageUrl] = useState(value);
//     return(
//         <div>
//             <EditImage url={image_url}/>
//         </div>
//     )
// }

import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth";
import EditImage from '@/components/image/edit-image'

export default async function Page() {
    const session = await auth();

    // let value
    // value = localStorage.getItem("image_url") || ""
    

    return(
        <SessionProvider session={session}>
            <EditImage url = {"local"}/>
        </SessionProvider>
    )
}