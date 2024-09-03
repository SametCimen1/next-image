import {auth} from '@/auth'
import { redirect } from 'next/navigation';
import { SessionProvider } from "next-auth/react"
import ClientPage from '@/components/clientPage'
import ImageUpload from '@/components/image/image-upload';
import UserImages from '@/components/image/UserImages'
import { createTheme, MantineProvider } from '@mantine/core';
export default async function Page(){
    const session = await auth();

    if(session?.user){
        session.user = {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image || ""
        }
    }


    if(!session?.user){
        redirect('/login')
    }


    return(
        <div className='flex flex-col items-center m-4 '>    

            <SessionProvider basePath={"/api/auth"} session={session}>
                <ClientPage/>
                <MantineProvider>
                    <ImageUpload/>
                </MantineProvider>
                <UserImages />
            </SessionProvider>

        </div>
    )
}