import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CarouselContainer= styled.div`
  width : 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position : relative;
  margin : auto;
`
const BannerImg = styled.img`
  width : 100%;
  margin: auto;
  opacity: 0.8;
`
const Label1 = styled.label`
  width: 100%;
  display: flex;
  z-index: 100;
  color : white;
  font-size: 90px;
  font-weight: 700;
  margin: auto;
  position: absolute;
  top : 47%;
  left : 50%;
  transform: translate(-50%,-50%);
  justify-content: center;
  @media screen and (max-width: 800px) {
      font-size:50px;
  }
`
const BannerBtn = styled.button`
  opacity: 0.8;
  background-color: #252525;
  color : white;
  width : 20%;
  height : 8%;
  z-index: 100;
  font-size: 1.5rem;
  font-weight: 700;
  margin: auto;
  position: absolute;
  bottom : 30%;
  left : 50%;
  text-align: center;
  transform: translate(-50%,-50%);
  @media screen and (max-width: 800px) {
      font-size:1rem;
  }
  @media screen and (max-width: 500px) {
      font-size:0.75rem;
  }
`
const LabelWrapper = styled.div`
  width : 100%;
`
const Carousel = ({link,text})=>(
  <CarouselContainer>
    <BannerImg src={link} />
    <LabelWrapper>
      <Label1>{text}</Label1>
        <Link to="/products">
          <BannerBtn>
            GO SHOP
          </BannerBtn>
        </Link>
    </LabelWrapper>
  </CarouselContainer>
);
export default function SimpleSlider() {
  //https://poew.tistory.com/707
    var settings = {
      dots:true,
      infinite: true,
      autoplay:true,
      autoplaySpeed :3000,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <>
        <div className='pt-10 justify-center' >
          <Slider {...settings}>
            <Carousel link = "/images/carousel_sample_1.jpg" text ="NEW ARRIVAL"/>
            <Carousel link = "/images/carousel_sample_2.jpg" text ="NEW ARRIVAL"/>
            <Carousel link = "/images/carousel_sample_3.jpg" text ="NEW ARRIVAL"/>
            <Carousel link = "/images/carousel_sample_4.jpg" text ="NEW ARRIVAL"/>
              {/* <section className='h-96 bg-yellow-900 relative'>
                <div className='w-full h-full bg-cover bg-banner opacity-70' />
                  <div className='absolute w-full h-full top-32 text-center text-gray-50 drop-shadow-2xl'>
                    <h2 className='text-6xl'>Shop With US</h2>
                    <p className='text-2xl'>Best Products, High Quality</p>
                  </div>
              </section>

              <section className='h-96 bg-yellow-900 relative'>
                <div className='w-full h-full bg-cover bg-banner1 opacity-70' />
                  <div className='absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl'>
                    <h2 className='text-6xl'>Shop With US2</h2>
                    <p className='text-2xl'>Best Products, High Quality</p>
                  </div>
              </section> */}
          </Slider>
        </div>
      </>      
    );
  }


