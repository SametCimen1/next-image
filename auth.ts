import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import github from "next-auth/providers/github";
import credentials from "next-auth/providers/credentials";
import {getUserByEmail} from '@/data/users'
import pool from '@/db'
import { NextResponse } from "next/server";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({
    session:{
        strategy:"jwt"
    },
    providers:[
        // google({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        //     authorization:{
        //         params:{
        //             prompt: "consent",
        //             access_type:"offline",
        //             response_type:"code"
        //         }
        //     }
        // })
        github({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials){
            if(credentials === null) return null;
                try {
                    const user = getUserByEmail(credentials?.email);
                    console.log('FOUND USER')
                    console.log(user);
                    if(user){
                        console.log("INSIDE USER ")
                        console.log(user?.password)
                        console.log(credentials)
                        const isMatch = user?.password === credentials?.password;
                        if(isMatch){
                            console.log("THERE IS A MATCH")
                            return user;
                        }else{
                            throw new Error("password not correct!");
                        }
                    }else{  
                        throw new Error('user not found')
                    }
                } catch (error) {
                    return new Error('error occured, please try again later')
                }
            }
        }),
    ],
    callbacks:{
        async signIn({user, account, profile}){
            try {
                console.log("INSIDE AUTH.TS")
                console.log(account);
                console.log(profile);
                if(profile === undefined){
                    return false;
                }else{
                    const response = await pool.query("SELECT * FROM users WHERE email = $1", [profile.email])
                    console.log("RETURN FROM SELECT USERs")
                    console.log(response)
                    if(response.rowCount === 0){
                        const userObj = {
                            name:profile.name,
                            email: profile.email,
                            image_url: profile.avatar_url    
                        }
                        await pool.query("INSERT INTO users(email, name, profile_image_url) VALUES($1, $2, $3)", [userObj.email, userObj.name, userObj.image_url]);
                        return true;
                    }else{
                        return true;
                    }

                }

            } catch (error) {
                console.log("ERROR THORWED")
                console.log(error)
                return false;
            }
            return false;
        }
    }
})