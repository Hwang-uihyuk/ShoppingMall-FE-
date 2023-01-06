import React from 'react'
import Banner from '../components/Banner';

import Products from '../components/Products';
import SimpleSlider from '../components/SimpleSlider';

export default function Home() {
  return (
    <>
      <SimpleSlider/>
      {/* <Banner/> */}
      <Products />
    </>
  );
}
