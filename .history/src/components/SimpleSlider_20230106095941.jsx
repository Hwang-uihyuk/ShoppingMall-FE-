import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
    
      <>
        <h2> Single Item</h2>
        <Slider {...settings}>

        <div className="w-full max-h-full">
        <section className='h-96 bg-yellow-900 relative'>
            <div className='w-full h-full bg-cover bg-banner opacity-70' />
            <div className='absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl'>
                <h2 className='text-6xl'>Shop With US</h2>
                <p className='text-2xl'>Best Products, High Quality</p>
            </div>
        </section>
        </div>

        <div>
          <section className='h-96 bg-yellow-900 relative'>
            <div className='w-full h-full bg-cover bg-banner1 opacity-70' />
            <div className='absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl'>
                <h2 className='text-6xl'>Shop With US2</h2>
                <p className='text-2xl'>Best Products, High Quality</p>
            </div>
            </section>
        </div>


          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      
        </>      
    );
  }


