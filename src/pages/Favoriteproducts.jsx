import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { LoadLikeProducts } from '../api/api'
import ProductCard from '../components/ProductCard'


export default function Favoriteproducts() {


  const [favorite,setFavorite] = useState('')

  useEffect(() => {
    LoadLikeProducts().then((response) => {
      console.log('success');
      console.log(response.data)
      setFavorite(response.data)}) 
  },[])

  
  return (
     <div className='p-10 pt-4'>
         <div className='text-xl m-10'>내가 누른 좋아요 상품 목록</div>
        <ul className='grid grid-cols-1 md:grid-cols-4 lg-grid-cols-4 gap-10'>
      
      
        {favorite &&
            favorite.map((product) => (
            <ProductCard key={product.id} product={product}/>
            ))}
        </ul>
    </div>
  )
}
//sample
{/* <div className='p-10 pt-4'>
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
        </div> */}