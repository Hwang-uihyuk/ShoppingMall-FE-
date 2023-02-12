import axios from 'axios';
import React, { useState } from 'react'
import Banner from '../components/Banner';
import Iframe from '../components/Iframe';
import MainProducts from '../components/MainProducts';

import Products from '../components/Products';
import SimpleSlider from '../components/SimpleSlider';

export default function Home() {

  

  return (
    <>
      <Iframe/>
      <SimpleSlider/>
      {/* <Banner/> */}
      <MainProducts/>
      
    </>
  );
}
