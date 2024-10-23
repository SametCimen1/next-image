"use client";
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

const urls = [
  "WTfQL2B4IMoM_aRxeS2Ga",
  "e2G8aUUn7_qPFHHp2775_",
  "LwmQCakB6NPNEnX--zXZb",
  "e4zjlxKhP3o8EsUHL5JPl",
];

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "",
        color: "gray",
        fill: "gray",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function CenterMode() {
  const settings = {
    className: "center w-full",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 400,
    dots: true,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="slider-container w-3/4 mx-auto  ">
      <h2 className=" text-4xl text-center font-medium">
        Sample images created using AI
      </h2>
      <Slider {...settings}>
        <div className="p-4">
          <Image
            src="/image1.jpeg"
            width={1024}
            height={1024}
            alt="image from public folder "
          />
        </div>
        <div className="p-4">
          <Image
            src="/image2.jpeg"
            width={1024}
            height={1024}
            alt="image from public folder "
            className="rounded w-full"
          />
        </div>
        {urls.map((image_url) => (
          <div className="p-4" key = {image_url}>
            <Image
              src={getImageUrl(image_url)}
              width={200}
              height={200}
              alt="image from s3 bucket"
              className="rounded w-full"
            />
          </div>
        ))}
        
      </Slider>
    </div>
  );
}

export default CenterMode;
