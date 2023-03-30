import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({
  product,
  product: { id, name, price, imgKey, favorite, stock_zero,category},}){
  const navigate = useNavigate();
  return (
    <form>
    <li onClick={() => {navigate(`/products/${name}`, { state: { product } });}}
      className='w-70 overflow-hidden cursor-pointer transition-all'>
        <div className='p-5 hover:bg-slate-100'>
          <img className='w-100 justify-center'
            src={imgKey !== 'undefined/key' ? imgKey : '/images/noimg.jpg'}
            alt={name} />
          <div className='mt-2 px-2 text-base column justify-between items-left'>
            <h3 className='font-normal truncate text-lg'>{category}</h3>
            <h3 className='font-normal truncate text-lg'>{name}</h3>
            <p className='font-semibold'>{`${price.toLocaleString('to-KR')} 원`}</p>
          </div>
          <p className='flex items-center mb-2 px-2 mt-1   font-semibold text-pink-700 flex'>
            <img src={'/images/heart.png'} className='w-5 h-5 mr-1' />{favorite}</p>
          {stock_zero === false ? <div className="font-bold text-red-600"> 품절입니다.</div> : ""}
        </div>
    </li>
    {/* <button onClick={LikeButton}>좋아요</button> */}
    </form>
  );
}
