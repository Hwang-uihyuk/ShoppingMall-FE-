import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AWS from "aws-sdk";
import axios from 'axios';

const baseURL = process.env.REACT_APP_URL

export default function ProductCard({
  product,
  product: { id, name, price, imgKey, favorite, stock_zero},
}) {
  const navigate = useNavigate();

  //좋아요 버튼 
  const [like,setLike] = useState(false)
  const LikeButton = (e) => {
      axios.post(`${baseURL}/user/favorite/${product.id}`,{},{
      headers :{
        "Content-Type" : "application/json",
				"Authorization" : window.localStorage.getItem('Login')
      }
    }).then(response => {
      console.log(response)
      console.log('좋아요 등록 success')
      setLike(!like)
      })
  }

  const deleteLikeButton = (e) =>{
    !like && 
      axios.delete(`${baseURL}/user/favorite/${product.id}`,{},{
        headers :{
          "Content-Type" : "application/json",
          "Authorization" : window.localStorage.getItem('Login')
        }
      }).then(response => {
        console.log('좋아요 해제')
        
      })
      setLike(!like)
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
        src={imgKey !=='undefined/key' ? imgKey : '/images/noimg.jpg'}
        alt={name}/>
      <div className='mt-2 px-2 text-base column justify-between items-left'>
        <h3 className='font-normal truncate text-lg'>{name}</h3>
        <p className='font-semibold'>{`${price.toLocaleString('to-KR')} 원`}</p>
      </div>
      <p className='flex items-center mb-2 px-2 mt-1   font-semibold text-pink-700 flex'>
        <img src = {'/images/heart.png'} className='w-5 h-5 mr-1'/>{favorite}</p>
      {stock_zero === false ? <div className ="font-bold text-red-600"> 품절입니다.</div> : ""}
      <div className='flex'>
      {/* 좋아요 버튼 */}
      
      </div>
      
    </li>
    {/* <button onClick={LikeButton}>좋아요</button> */}


    </form>
  );
}
