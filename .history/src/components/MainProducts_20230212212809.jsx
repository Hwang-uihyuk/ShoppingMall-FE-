import axios from 'axios'
import React, { useEffect ,useState} from 'react'

export default function MainProducts() {
    const [maindata,setMainData] = useState('')

    useEffect(()=> {
        axios.get("http://3.38.35.43:8080",{
        headers : {
          "Content-Type" : "application/json"
        }
      }).then((response) => {setMainData(response.data)
      console.log(maindata)})},[])    
   
    


    

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
