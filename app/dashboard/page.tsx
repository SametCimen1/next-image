import {auth} from '@/auth'
import { redirect } from 'next/navigation';
import { SessionProvider } from "next-auth/react"
import ClientPage from '@/components/clientPage'
import ImageUpload from '@/components/image/image-upload';
import UserImages from '@/components/image/UserImages'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
        redirect('/auth/login')
    }


    return(
        <div className='flex flex-col items-center m-4 '>    

            <SessionProvider basePath={"/api/auth"} session={session}>
                <ClientPage/>
                <div className='w-4/5 m-auto'>
                    <ImageUpload type={"dashboard"}/>
                </div>
                <Link href="/dashboard/create-image">
                    <Button>
                        Create-Image with AI
                    </Button>
                </Link>
                <UserImages />
            </SessionProvider>

        </div>
    )
}