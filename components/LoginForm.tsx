'use client';

import { Form, FormField, FormLabel,FormControl, FormItem, FormDescription, FormMessage } from "@/components/ui/form";
import { socialLogin } from "@/server/actions/auth"
import SocialLoginForm from '@/components/SocialLoginForm'
import { credentialLogin } from "@/server/actions/auth";
import { useRouter } from "next/navigation";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import *  as z from 'zod'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { FormSuccess } from "./form-sucess";
import { FormError } from "./form-error";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LoginForm(){

    const router = useRouter();
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const LoginSchema = z.object({
        email: z.string().email({
            message: "Invalid Email address"
        }),
        password: z.string().min(1, {
            message: "Password is required"
        }),
        code: z.optional(z.string())
    })

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:"",
            code: "",
        }
    });

    async function handleFormSubmit(e:React.FormEvent<HTMLFormElement>){

        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);

            const response = await credentialLogin(formData)
            if(response.error){

            }else{
                router.push('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="">
            <div className="">
                <Form {...form}>
                    <form onSubmit={handleFormSubmit}>
                        <div className="">
                            {showTwoFactor && (
                             <FormField
                                control={form.control}
                                name="code"
                                render={({field}) => (
                                <FormItem>
                                    <FormLabel>Sent a two factor code to your email</FormLabel>
                                    <FormLabel />
                                    <FormControl>
                                    
                                    <InputOTP
                                        disabled={status === "executing"}
                                        {...field}
                                        maxLength={6}
                                        >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                        </InputOTP>

                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            )}

                            {/* {!showTwoFactor && (                            
                                <> */}
                                {/* <FormLabel>Email</FormLabel>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                    <FormItem>
                                        <FormLabel />
                                        <FormControl>
                                            <Input {...field} placeholder="user@gmail.com" type='email' autoComplete="email"/>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormLabel>Password</FormLabel>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                    <FormItem>
                                        <FormLabel />
                                        <FormControl>
                                            <Input {...field} placeholder="**********" type='password' autoComplete="current-password"/>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                /> */}
                                {/* </>
                            )} */}
                             {/* <FormSuccess message = {success}/>
                             <FormError message = {error}/>
                             <div className="flex flex-col items-start">
                                <Button className="px-0" size = {'sm'} variant={'link'}>
                                    <Link href = "/auth/reset">
                                        Forgot your password?
                                    </Link>
                                </Button>
                                <Button className="px-0" size = {'sm'} variant={'link'}>
                                    <Link href="/auth/signup">
                                        Don&apos;t have an account?
                                    </Link>
                                </Button>   
                            </div> */}

                        </div>

                        {/* <Button type ='submit' className={cn('w-full my-4')}>
                            {showTwoFactor ? "Verify" : "Sign In"}
                        </Button> */}

                    </form>
                </Form>
            </div>
            <div className="  py-4  w-4/5 mx-auto">
                <SocialLoginForm type="login"/>
            </div>
        </div>
    )
}