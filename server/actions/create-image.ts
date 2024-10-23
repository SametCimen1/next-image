'use server'
import OpenAI from "openai";
import dotenv from 'dotenv'
import { createSafeActionClient } from "next-safe-action"
import { z } from "zod";
import pool from '@/db';

dotenv.config();


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


const schema = z.object({
    textValue: z.string().min(3).max(100)
});


const fileSchema = z.object({
    image_url: z.string().min(3).max(100),
    email: z.string().min(3).max(100),
});


const action = createSafeActionClient();


export const createImageWithAI = action
    .schema(schema)
    .action(async ({ parsedInput: { textValue } }) => {


    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: textValue,
        n: 1,
        size: "1024x1024",
      });
    
    const image_url = response.data[0].url;
    // const image_url="none"
    

    return image_url

})

export const deleteFile = action
    .schema(fileSchema)
    .action(async ({ parsedInput: { image_url, email } }) => {


    const data =  await pool.query("DELETE FROM image_urls WHERE image_url = $1", [image_url]);



    
    console.log(image_url);


    
})
  
  