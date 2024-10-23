"use client";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toPng } from "html-to-image";
import { deleteFile } from "@/server/actions/create-image";
import { useAction } from "next-safe-action/hooks";

export default function Page({ url }: { url: string }) {
  const router = useRouter();


  const { execute, status } = useAction(deleteFile, {
    onSuccess(data: any) {
      if (data) {
        router.push("/dashboard");
        router.refresh();
      }
    },
    onError(error: any) {
      alert("error occured");
    },
  });

  const domEl = useRef(null);
  const { data: session } = useSession();
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blurAmount, setBlurAmount] = useState(0);
  const [sepia, setSepia] = useState(0);

  const downloadImage = async () => {
    if (domEl.current === null) return;

    toPng(domEl.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };

  const deleteImage = async () => {
    const userEmail = session?.user?.email;

    if (userEmail) execute({ image_url:url, email: userEmail });
  };

  const getRealURL = () => {
    if (url === "local") {
      let value;
      value = localStorage.getItem("image_url") || "";
      return value;
    }

    return getImageUrl(url);
  };

  return (
    <main>
      <div className="h-full flex w-4/5 m-auto">
        <Image
          ref={domEl}
          src={getRealURL()}
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
              <span className="ml-2">{parseInt(brightness.toString())}</span>
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

          {session?.user?.email && (
            <Button
              className="mt-2 block"
              variant={"destructive"}
              onClick={deleteImage}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
