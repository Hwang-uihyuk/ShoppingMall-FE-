import axios from 'axios'
import React, { useEffect ,useState} from 'react'
import ProductCard from './ProductCard';

const baseURL = process.env.REACT_APP_URL

export default function MainProducts() {
    const [maindata,setMainData] = useState('')

    useEffect(()=> {
        axios.get(baseURL,{
        headers : {
          "Content-Type" : "application/json"
        }
      }).then((response) => setMainData(response.data[0])
      )},[])    
   console.log(maindata)
    


    

  return (
    <div className='p-10 pt-4'>
    <ul className='grid grid-cols-1 md:grid-cols-4 lg-grid-cols-4 gap-10'>
      {maindata &&
       maindata.map((product)=>(
          <ProductCard key={product.id} product={product} />
        ))
      }
    </ul>
  </div>
  )
}
