import axios from 'axios';
import React, { useState } from 'react'
import Banner from '../components/Banner';
import Iframe from '../components/Iframe';

import Products from '../components/Products';
import SimpleSlider from '../components/SimpleSlider';

export default function Home() {

  const [maindata,setMainData] = useState('')
  axios.get("http://3.38.35.43:8080",{
    headers : {
      "Content-Type" : "application/json"
    }
  }).then((response) => setMainData(response.data))
  
  return (
    <>
      <Iframe/>
      <SimpleSlider/>
      {/* <Banner/> */}
      {/* <Products /> */}
      
    </>
  );
}
