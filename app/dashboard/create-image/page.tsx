'use client';
import { Button } from "@/components/ui/button";
import { createImageWithAI } from "@/server/actions/create-image"
import { useAction } from "next-safe-action/hooks";
import { useState, useEffect, KeyboardEvent } from "react";
import Image from "next/image";

export default function Page(){
    const [textValue, setTextValue] = useState("");
    const [isWaiting, setIsWaiting] = useState(false);
    const [imageUrl, setImageUrl] = useState("")

    const {execute, status} = useAction(createImageWithAI, {
        onSuccess(data:any){
          if(data){
            console.log("RETURNED FROM AI CALLL")
            console.log(data);
            setImageUrl(data.data)
          }
        }
      })
    
      const onKeyDown  = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
          onsubmit();
        }
      };


      
    async function onsubmit(){
       setInterval(() => {

      }, 3000)

        if(textValue.length<1){
        alert("Please enter a valid input")
        setTimeout(() => {
            alert("")
        },3000)
        }else{
        setTextValue("");
        setIsWaiting(true);
        execute({textValue});
        }
    }

        

    return(
        <main className="w-4/5 m-auto">
              <input type="text" id="first_name" className="z-99 w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Describe your image"
                  required
                  value= {textValue}
                  onChange={(e) => setTextValue(e.target.value)}
              />
              <Button 
                className="mt-2"
                onClick={() =>onsubmit()}
              >
                Send
              </Button>  

              {(imageUrl !== '') ? 
                <div>
                  <p>Waiting</p>
                </div>
              :
                <div className="mt-10 w-3/4 flex flex-col  items-center">
                  <Image
                    src = {"https://oaidalleapiprodscus.blob.core.windows.net/private/org-pvbs6bkJb51HInplhjF9yIsB/user-WgcvGU4MuhrPMBu8bDy1hXWy/img-czNHT3oaUecrlyyBZ9ssYr1U.png?st=2024-09-07T23%3A02%3A57Z&se=2024-09-08T01%3A02%3A57Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-08T00%3A02%3A57Z&ske=2024-09-09T00%3A02%3A57Z&sks=b&skv=2024-08-04&sig=DhGlSd8JXN2kXUUUUgeN%2BaXW1S/FY/XMf7PYf4vPEgs%3D"} 
                    width={1024}
                    height={1024}
                    alt="image from Open-ai"
                    className="w-1/2"
                  />
                  <div className="flex w-min mt-10">
                    <Button className="">Download</Button>
                    <Button className="ml-10">Save to My profile</Button>
                    <Button className="ml-10">Edit image</Button>
                  </div>
                </div>
              }

        </main>
    )
}