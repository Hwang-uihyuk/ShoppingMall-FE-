import React, { useEffect } from 'react'

export default function MainProducts() {
    const [maindata,setMainData] = useState('')

    useEffect(()=> { axios.get("http://3.38.35.43:8080",{
        headers : {
          "Content-Type" : "application/json"
        }
      }).then((response) => {setMainData(response.data)
      console.log(maindata)})},[])    
   console.log(maindata)
    


    

  return (
    <div className='p-10 pt-4'>
    <ul className='grid grid-cols-1 md:grid-cols-4 lg-grid-cols-4 gap-10'>
      {products &&
        products.filter((product)=>{
          
          if(category === "all"){
          
            return product
          }
          else if(product.category===category){
            return product
          }
        }).map((product)=>(
          <ProductCard key={product.id} product={product} />
        ))
      }
    </ul>
  </div>
  )
}
