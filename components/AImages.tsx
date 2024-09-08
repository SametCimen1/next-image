'use client';
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";


function SampleNextArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "", color:'gray', fill:"gray"}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      />
    );
  }

  

function CenterMode() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 400,
      dots:true,
      autoplay: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <div className="slider-container w-3/4 mx-auto  ">
        <Slider {...settings}>
        <div className="p-4">
            <Image
                src = "/image1.jpeg"
                width={1024}
                height={1024}
                alt="image from public folder "
            />
          </div>
          <div className="p-4">
            <Image
                src = "/image2.jpeg"
                width={1024}
                height={1024}
                alt="image from public folder "
            />
          </div>
          <div className="p-4">
            <Image
                src = "/image2.jpeg"
                width={1024}
                height={1024}
                alt="image from public folder "
            />
          </div>
          <div className="p-4">
          <Image
                src = "/image2.jpeg"
                width={1024}
                height={1024}
                alt="image from public folder "
            />
          </div>
          <div className="p-4">
          <Image
                src = "/image2.jpeg"
                width={1024}
                height={1024}
                alt="image from public folder "
            />
          </div>
          <div className="p-4">
          <Image
                src = "/image2.jpeg"
                width={1024}
                height={1024}
                alt="image from public folder "
            />
          </div>
        </Slider>
      </div>
    );
  }
  
  export default CenterMode;
  