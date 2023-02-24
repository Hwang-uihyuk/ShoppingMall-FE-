import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import EditProductDetail from '../pages/EditProductDetail';

const baseURL = process.env.REACT_APP_URL

export default function EditProductCard(
  {
  sellrig,
  setSellrig,
  product,
  product : {id, name, price, category, description, size, imgKey,favorite}
}, )

{
const navigate = useNavigate();


  //상품 삭제
  const DeleteProduct = () => {
    console.log(sellrig)
    console.log(product.id)
    const message = window.confirm('정말로 상품을 삭제하시겠습니까?')
    if(message === true){
      axios.delete(`${baseURL}/register/product/${product.id}`,{
        headers :{
          'Content-Type' : 'aplication/json',
          'Authorization' : window.localStorage.getItem('Login')
      }
      }).then(response => {
        setSellrig(prev => prev.filter(val=> val.id !== product.id))
        console.log('성공')
         }
      ).catch('에러입니다.')
    }
  }


  
  return (
    <div>
    <li
        onClick={() => {
            console.log(id)
            navigate(`products/edit/products/products/edit/products/${name}` , {state : { product }});
        }}
        className='w-70 rounded-lg shadow-md overflow-hidden cursor-pointer transition-all'
        >
            <img className='w-100 justify-center'
             src ={imgKey} 
             alt={name}/>
        <div className='mt-2 px-2 text-lg flex justify-between items-center'>
         <h3 className='truncate'>{name}</h3>
         <p>{`KRW ${price}`}</p>
        </div>
         <p className='mb-2 px-2 text-gray-600'>{favorite}</p>

         
    </li>

    <div className='flex justify-end'>
           <button className='border font-bold text-lg'
           onClick={() => {
            console.log(id)
            navigate(`products/edit/products/products/edit/products/${name}` , {state : { product }});
        }}>
             상품 수정하기
           </button>

           <button 
           className='border font-bold text-lg'
           onClick={DeleteProduct}
           >
             상품 삭제하기
           </button>
         </div>     

    </div>
    
  )
}