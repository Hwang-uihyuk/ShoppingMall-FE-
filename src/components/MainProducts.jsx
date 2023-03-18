import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import ProductCard from './ProductCard';
import SimpleSlider from './SimpleSlider';

const baseURL = process.env.REACT_APP_URL

export default function MainProducts() {
    const [maindata,setMainData] = useState('')
    const [banner,setBanner] = useState('')
    useEffect(()=> {
        axios.get(baseURL,{
        headers : {
          "Content-Type" : "application/json"
        }
      }).then((response) => 
      { console.log(response.data)
        setMainData(response.data[0])
        setBanner(response.data[1])
        
      }
      )},[])    


      
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
