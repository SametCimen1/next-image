import { socialLogin } from "@/server/actions/auth";

export default function Page(){
    return(
        <form className="mt-5" action={socialLogin}>
            <button 
                className="rounded bg-blue-200 mr-5 p-2"
                type="submit" name="action" value="google">
                Sign in with Google
            </button>
            <button 
                className="rounded bg-gray-200 p-2"
                type="submit" name="action" value="github">
                Sign in with Github
            </button>
        </form>
    )
}