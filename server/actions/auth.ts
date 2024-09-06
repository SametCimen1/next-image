'use server'
import pool from "@/db";

import { signIn,signOut } from "@/auth"


export async function socialLogin(formData:FormData){
    let action = formData.get('action')
    
    if (action) {
        await signIn(action.toString(), { redirectTo: '/dashboard' });
    } else {
        console.error('Action is null');
        return new Error("error occured");
    }
}

export async function credentialLogin(formData:FormData){
    try {
        const response = await signIn('credentials', {
            email:formData.get('email'),
            password: formData.get('password'),
            redirect: false
        })
        return response;
    } catch (err) {
        return new Error("error occured");
    }
}

export async function logout(){
    await signOut({redirectTo:"/"})
}