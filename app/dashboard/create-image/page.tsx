'use client';
import { Button } from "@/components/ui/button";
import { createImageWithAI } from "@/server/actions/create-image"
import { useAction } from "next-safe-action/hooks";
import { useState, useEffect, KeyboardEvent, useRef } from "react";
import { toPng } from "html-to-image";
import Image from "next/image";

export default function Page(){
    const [textValue, setTextValue] = useState("");
    const [isWaiting, setIsWaiting] = useState(false);
    const [imageUrl, setImageUrl] = useState("")
    const domEl = useRef(null);


    const downloadImage = () => {
      if(domEl.current === null) return;
      toPng(domEl.current, { cacheBust: false })
      .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "my-image-name.png";
          link.href = dataUrl;
          link.click();
      })
      .catch((err) => {
          console.log('error')
          console.log(err);
      });
    }

    const {execute, status} = useAction(createImageWithAI, {
        onSuccess(data:any){
          if(data){
            console.log("RETURNED FROM AI CALLL")
            console.log(data);
            setImageUrl(data.data)
            setIsWaiting(false);

          }
        },
        onError(error:any){
          alert("error occured")
          setIsWaiting(false);
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
              {(imageUrl==='' && !isWaiting) ? 
                <div>
                  <p>fill the input to get an image</p>
                </div>
                :
                <div>
                {(imageUrl === '') ? 
                  <div>
                        <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                        </svg>
                    </div>
                  </div>
                :
                  <div className="mt-10 w-3/4 flex flex-col  items-start">
                    <Image
                      src = {imageUrl} 
                      width={1024}
                      height={1024}
                      alt="image from Open-ai"
                      className="w-1/2"
                      ref = {domEl}
                    />
                    <div className="flex w-min mt-10">
                      <Button className="" onClick={downloadImage}>Download</Button>
                      <Button className="ml-10">Save to My profile</Button>
                      <Button className="ml-10">Edit image</Button>
                    </div>
                  </div>
                }
                </div>
  
                
              }

        </main>
    )
}