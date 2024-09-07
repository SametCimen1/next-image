import { socialLogin } from "@/server/actions/auth";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Page({type}:{type:string}){
    return(
        <form className="mt-5" action={socialLogin}>
            <Button 
                variant={"outline"}
                className="rounded p-2 w-full"
                type="submit" name="action" value="github">
                {type === "register" ? 'Sign up with Github' : 'Sign in with Github'}
                <Image
                    src="/icons/github.png"
                    width={32}
                    height={32}
                    alt="github icon"
                    className="ml-2"
                />
            </Button>
        </form>
    )
}