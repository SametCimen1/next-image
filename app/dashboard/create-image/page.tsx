'use client';
import { Button } from "@/components/ui/button";
import { createImageWithAI } from "@/server/actions/create-image"
import { useAction } from "next-safe-action/hooks";
import { useState, useEffect, KeyboardEvent } from "react";


export default function Page(){
    const [textValue, setTextValue] = useState("");

    const {execute, status} = useAction(createImageWithAI, {
        onSuccess(data:any){
          if(data){
            console.log("RETURNED FROM AI CALLL")
            console.log(data);
          }
        }
      })
    
      const onKeyDown  = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
          onsubmit();
        }
      };


      
    function onsubmit(){
        if(textValue.length<1){
        alert("Please enter a valid input")
        setTimeout(() => {
            // alert("")
        },3000)
        }else{
        setTextValue("");
        // setIsWaiting(true);
        execute({textValue});
        }
    }

        

    return(
        <main>

              <input type="text" id="first_name" className="z-99 w-1/2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="How may I help you?"
                  required
                  value= {textValue}
                  onChange={(e) => setTextValue(e.target.value)}
              />
              <Button onClick={() =>onsubmit()}>
                Send
              </Button>  
        </main>
    )
}