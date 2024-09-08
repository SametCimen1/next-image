'use client';
import Image from "next/image"
import { getImageUrl } from "@/lib/utils"
import { useRef, useState } from "react";
import * as htmlToImage from 'html-to-image';
import { Button } from "../ui/button";


export default function Page({url}:{url:string}){
    const domEl = useRef(null);

    const [brightness, setBrightness] = useState(100);
    const [saturation, setSaturation] = useState(100);
    const [blurAmount, setBlurAmount] = useState(0);
    const [sepia, setSepia] = useState(0);
    

    const downloadImage = async () => {
        if(domEl.current === null) return;
        const dataUrl = await htmlToImage.toPng(domEl.current);
        console.log(dataUrl)
        const link = document.createElement('a');
        link.download = 'next-image.png';
        link.href = dataUrl;
        link.click();
    }

    return(
        <main>
            <div className="h-full flex">
                <Image
                    ref={domEl}
                    src={getImageUrl(url)}
                    width={500}
                    height={500}
                    alt = "image from s3 bucket"
                    className="w-2/3"
                    style={{filter:`brightness(${brightness}%)  saturate(${saturation}%) blur(${blurAmount}px) sepia(${sepia}%)`}}
                    priority
                />
                <div className="ml-2 ">
                    <div className="flex flex-col">
                        <label>Brightness</label>

                        <input type="range" min="0" max="200" onChange={(e) => setBrightness(parseInt(e.target.value)) } placeholder="Brightness"/>
                        <span className="ml-2">{parseInt((brightness).toString())}</span>
                    </div>
                    <div className="flex">
                        <label>Saturation</label>
                        <input type="range" min="0" max="200" value={saturation} onChange={(e) => setSaturation(parseInt(e.target.value)) } placeholder="Saturation"/>
                        <span className="ml-2">{parseInt((saturation).toString())}</span>
                    </div>
                    <div className="flex">
                        <label>Blur Amount</label>
                        <input type="range" min="0" max="10" value={blurAmount}  onChange={(e) => setBlurAmount(parseInt(e.target.value)) } placeholder="Blue Amount"/>
                        <span className="ml-2">{blurAmount}</span>
                    </div>
                    <div className="flex">
                        <label>Sepia</label>
                        <input type="range" min="0" max="100" value={sepia} onChange={(e) => setSepia(parseInt(e.target.value)) } placeholder="Sepia"/>
                        <span className="ml-2">{sepia}</span>
                    </div>
                    <Button onClick={downloadImage}>Download!</Button>
                </div>
            </div>
        </main>
    )

}