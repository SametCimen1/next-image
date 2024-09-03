'use client';


import { socialLogin } from "@/server/actions/auth"
import SocialLoginForm from '@/components/SocialLoginForm'
import { credentialLogin } from "@/server/actions/auth";
import { useRouter } from "next/navigation";


export default function LoginForm(){

    const router = useRouter();

    async function handleFormSubmit(e:React.FormEvent<HTMLFormElement>){
        console.log("THIS FORM CALLED")
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);
            console.log("FORM DATA BEFORE SUBMITTING")
            console.log(formData)
            const response = await credentialLogin(formData)
            if(response.error){

            }else{
                router.push('/home')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <form 
                className="mt-5" 
                onSubmit={handleFormSubmit}
            >
                <div>
                    <label htmlFor="email">Email</label>
                    <input className="bg-gray-200 ml-2 rounded " type="email" id="email" name="email" />
                </div>
                <div className="mt-5">
                    <label htmlFor="password">password</label>
                    <input className="bg-gray-200 ml-2 rounded " type="password" id="password" name="password" />
                </div>

                <button
                  type="submit"
                >
                    Login
                </button>
            </form>
            <SocialLoginForm/>
        </div>
    )
}