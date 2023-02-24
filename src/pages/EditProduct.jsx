import { S3 } from 'aws-sdk';
import axios from 'axios';
import React from 'react'
import { useEffect,useState } from 'react';
import EditProductCard from '../components/EditProductCard';
const baseURL = process.env.REACT_APP_URL;

export default function EditProduct() {
    //처음 상품의 정보 가져오기    
    //판매등록하 상품 목록 조회
    const [sellrig, setSellRig] = useState('')
    
    useEffect(() => {
        axios({
        method: "get",
        url : `${baseURL}/register/product/`, 
        headers: {  
         "Content-Type": "application/json",
          "Authorization" : window.localStorage.getItem('Login')
        }
    }).then((response) => {
        setSellRig(response.data)
     })
     .catch((error) => console.log(error))
    }, [])
    console.log(sellrig)
  return (
    <div>
      <ul className='grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4'>
        {sellrig &&
          sellrig.map((product) =>(
            <EditProductCard key={product.id} product={product} setSellRig={setSellRig} sellrig={sellrig}/>
            
          ))}
      </ul>
    </div>

  )
}
