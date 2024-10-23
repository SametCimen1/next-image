"use client";
import { Button } from "@/components/ui/button";
import { createImageWithAI } from "@/server/actions/create-image";
import { useAction } from "next-safe-action/hooks";
import { useState, useEffect, KeyboardEvent, useRef } from "react";
import { toPng } from "html-to-image";
import Image from "next/image";
import { auth } from "@/auth";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [textValue, setTextValue] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-pvbs6bkJb51HInplhjF9yIsB/user-WgcvGU4MuhrPMBu8bDy1hXWy/img-HUcTO4Wq2a2m9Sd1kT0PtH0D.png?st=2024-10-23T02%3A52%3A28Z&se=2024-10-23T04%3A52%3A28Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-10-22T19%3A02%3A29Z&ske=2024-10-23T19%3A02%3A29Z&sks=b&skv=2024-08-04&sig=otaEKtscVCXqsV/GknSwARbz1Cu7I4eptWnFLVdMdW8%3D"
  );
  const [mode, editMode] = useState(0);
  const domEl = useRef(null);

  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blurAmount, setBlurAmount] = useState(0);
  const [sepia, setSepia] = useState(0);

  const { execute, status } = useAction(createImageWithAI, {
    onSuccess(data: any) {
      if (data) {
        console.log("RETURNED FROM AI CALLL");
        console.log(data);
        setImageUrl(data.data);
        setIsWaiting(false);
      }
    },
    onError(error: any) {
      alert("error occured");
      setIsWaiting(false);
    },
  });

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      onsubmit();
    }
  };

  async function onsubmit() {
    setInterval(() => {}, 3000);

    if (textValue.length < 1) {
      alert("Please enter a valid input");
      setTimeout(() => {
        alert("");
      }, 3000);
    } else {
      setTextValue("");
      setIsWaiting(true);
      execute({ textValue });
    }
  }

  function editImage() {
    editMode(1);
  }



  const downloadImage = async () => {
    if(domEl.current === null) return;
    // try {
    //     console.log("getting image")
    //     console.log(domEl.current)
    //     const dataUrl = await htmlToImage.toSvg(domEl.current);
    //     console.log("DATA URL")
    //     console.log(dataUrl)
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", "image.png"); //or any other extension
    //     document.body.appendChild(link);
    //     link.click();            
    // } catch (error) {
    //     console.log("ERROR")
    //     console.log(error)
    // }

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

  return (
    <main className="w-4/5 m-auto">
      {mode == 0 ? (
        <div>
          <input
            type="text"
            id="first_name"
            className="z-99 w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Describe your image"
            required
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <Button className="mt-2" onClick={() => onsubmit()}>
            Send
          </Button>
          {imageUrl === "" && !isWaiting ? (
            <div className="mt-2">
              {/* <p>fill the input to get an image</p> */}
            </div>
          ) : (
            <div>
              {imageUrl === "" ? (
                <div className="mt-2">
                  <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="mt-10 w-3/4 flex flex-col  items-start">
                  <Image
                    src={imageUrl}
                    width={1024}
                    height={1024}
                    alt="image from Open-ai"
                    className="w-1/2"
                    ref={domEl}
                  />
                  <div className="flex w-min mt-10">
                    <Button className="" onClick={downloadImage}>
                      Download
                    </Button>
                    <Button className="ml-10">Save to My profile</Button>
                    <Button className="ml-10" onClick={editImage}>
                      Edit image
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="h-full flex w-full m-auto">
            <Image
              ref={domEl}
              src={imageUrl}
              width={500}
              height={500}
              alt="image from s3 bucket"
              className="w-2/3"
              style={{
                filter: `brightness(${brightness}%)  saturate(${saturation}%) blur(${blurAmount}px) sepia(${sepia}%)`,
              }}
              priority
            />
            <div className="ml-2 ">
              <div className="flex flex-row bg-pink-300 p-3 rounded-lg">
                <label>Brightness</label>

                <input
                  className="font-bold ml-2"
                  type="range"
                  min="0"
                  max="200"
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  placeholder="Brightness"
                />
                <div className="w-full  flex justify-between">
                  <span className="ml-2">
                    {parseInt(brightness.toString())}
                  </span>
                </div>
              </div>
              <div className="flex bg-blue-300 p-3 rounded-lg mt-2">
                <label>Saturation</label>
                <input
                  className="ml-2"
                  type="range"
                  min="0"
                  max="200"
                  value={saturation}
                  onChange={(e) => setSaturation(parseInt(e.target.value))}
                  placeholder="Saturation"
                />
                <span className="ml-2">{parseInt(saturation.toString())}</span>
              </div>
              <div className="flex bg-green-300 p-3 rounded-lg mt-2">
                <label>Blur Amount</label>
                <input
                  className="ml-2"
                  type="range"
                  min="0"
                  max="10"
                  value={blurAmount}
                  onChange={(e) => setBlurAmount(parseInt(e.target.value))}
                  placeholder="Blue Amount"
                />
                <span className="ml-2">{blurAmount}</span>
              </div>
              <div className="flex bg-yellow-300 p-3 rounded-lg mt-2">
                <label>Sepia</label>
                <input
                  className="ml-2"
                  type="range"
                  min="0"
                  max="100"
                  value={sepia}
                  onChange={(e) => setSepia(parseInt(e.target.value))}
                  placeholder="Sepia"
                />
                <span className="ml-2">{sepia}</span>
              </div>
              <Button className="mt-2" onClick={downloadImage}>
                Download!
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
