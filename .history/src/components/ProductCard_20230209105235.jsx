import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AWS from "aws-sdk";
import axios from 'axios';

export default function ProductCard({
  product,
  product: { id, name, price, imgKey, favorite},
}) {
  const navigate = useNavigate();

  
  //좋아요 버튼 
  const [like,setLike] = useState(false)

  const LikeButton = (e) => {
    e.preventDefault();
    console.log(product.id)
    if(like === false){
      axios.post(`http://3.38.35.43:8080/user/favorite/${product.id}`,{},{
      headers :{
        "Content-Type" : "application/json",
				"Authorization" : window.localStorage.getItem('Login')
      }
    }).then(response => {
      console.log('좋아요 등록 success')
      setLike(!like)})
    }

    else{
       axios.delete(`http://3.38.35.43:8080/user/favorite/${product.id}`,{},{
        headers :{
          "Content-Type" : "application/json",
          "Authorization" : window.localStorage.getItem('Login')
        }
      }).then(response => {
        console.log('좋아요 해제')
        setLike(!like)
      })
    }
  }


  return (
    <form>
    <li
      onClick={() => {
        navigate(`/products/${name}`, { state: { product } });
      }}
      className='w-70 rounded-lg shadow-md overflow-hidden cursor-pointer transition-all'
    >
      {/* <img className='w-96' src={image} alt={name} /> */}
      
      <img className='w-100 justify-center' 
        src={imgKey}
        alt={name} />
      <div className='mt-2 px-2 text-base flex justify-between items-center'>
        <h3 className='truncate'>{name}</h3>
        <p>{`KRW ${price}`}</p>
      </div>
      <p className='mb-2 px-2 text-gray-600'>{favorite}</p>
      
      <div className='flex'>
      {/* 좋아요 버튼 */}
      
      </div>
      
    </li>
    <button onClick={LikeButton}>좋아요</button>
    </form>
  );
}
