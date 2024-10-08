import { auth } from "@/auth";
import LoginForm from "@/components/LoginForm"
import { redirect } from "next/navigation";

export default async function Page(){

    const session = await auth();

    if(session?.user){
        session.user = {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image || ""
        }
    }
  
  
    if(session?.user){
        redirect('/dashboard')
    }
    return(
        <div>
            <LoginForm/>
        </div>
    )
}