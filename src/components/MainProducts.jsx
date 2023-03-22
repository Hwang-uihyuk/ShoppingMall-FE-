import React, { useEffect ,useState} from 'react'
import { LoadMainProducts } from '../api/api';
import ProductCard from './ProductCard';
import SimpleSlider from './SimpleSlider';

export default function MainProducts() {
    const [maindata,setMainData] = useState('')
    const [banner,setBanner] = useState('')
    useEffect(()=> {
       LoadMainProducts().then((response)=>{
        setMainData(response.data[0])
        setBanner(response.data[1])})},[])    
  return (
    <div>
    {banner && 
    <SimpleSlider banner ={banner}/>}

      <div className='p-20'>
        <ul className='grid grid-cols-1 md:grid-cols-4 lg-grid-cols-4 gap-10'>
          {maindata &&
          maindata.map((product)=>(
              <ProductCard key={product.id} product={product} />
            ))
          }
        </ul>
    </div>
    </div>    
  )
}
