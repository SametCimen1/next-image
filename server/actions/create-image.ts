'use server'
import OpenAI from "openai";
import dotenv from 'dotenv'
import { createSafeActionClient } from "next-safe-action"
import { z } from "zod";

dotenv.config();


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


const schema = z.object({
    textValue: z.string().min(3).max(100)
});


const action = createSafeActionClient();


export const createImageWithAI = action
    .schema(schema)
    .action(async ({ parsedInput: { textValue } }) => {



    // const completion = await openai.chat.completions.create({
    //     messages: [
    //         { role: 'system', content: 'Your response should be less than or equal to 200 words.' },
    //         { role: 'user', content: textValue },
    //       ],
    //     model: "gpt-3.5-turbo",
    // });

    const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: textValue,
        n: 1,
        size: "1024x1024",
      });
    
    const image_url = response.data[0].url;


    // const completion = await openai.chat.completions.create({
    //     messages: [{ role: "system", content: textValue }],
    //     model: "gpt-3.5-turbo",
    // });

    // const message = completion.choices[0].message.content;

    // console.log(completion.choices[0]);
    
    console.log('image url is')
    console.log(image_url)

    return image_url

})