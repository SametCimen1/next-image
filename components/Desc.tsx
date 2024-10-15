import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Desc(){
    return(
        <div className="relative mt-10 py-20">
            <div className="py-32  bg-blue-200 w-full">
                <div className=" text-4xl text-center font-medium text-blue-500">
                    <h2>Go from text to image in seconds with generative AI</h2>
                </div>
                <div className="flex gap-12 w-4/5 mx-auto mt-5 justify-center items-center flex-col lg:flex-row"> 
                    <div className="md:min-w-1/3">
                        <video className="rounded-lg w-full " title="Go from text to image in seconds with generative AI" data-testid="feature-landing-tutorial-video" preload="metadata" playsInline={true} disablePictureInPicture={true} poster="https://dsgrcdnblobprod5u3.azureedge.net/video-poster/image-creator-tutorial-poster.webp"><source src="https://dsgrblobprod5u3.blob.core.windows.net/video/image-creator-tutorial-video.webm" type="video/webm" /></video>
                    </div>
                    <div className=" flex flex-col gap-6">
                        <div>
                            <span className="flex items-center"><span className="min-h-[40px] min-w-[40px] flex justify-center items-center bg-pink-50 rounded-full mr-2">1</span>Sign up or log in to start using the AI platform.</span>
                        </div>
                        <div>
                            <span className="flex items-center"><span className="min-h-[40px] min-w-[40px] flex justify-center items-center bg-pink-50 rounded-full mr-2">2</span>Enter a description of the image you want to generate in the text input field.
                            </span>
                        </div>
                        <div>
                            <span className="flex items-center"><span className="min-h-[40px] min-w-[40px] flex justify-center items-center bg-pink-50 rounded-full mr-2">3</span>After the AI generates the image, you can download it or make adjustments before saving.</span>
                        </div>
                        <Link  href='/auth/login'>
                            <Button className="w-1/3 mx-auto" variant={'default'}>Login</Button>                        
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}