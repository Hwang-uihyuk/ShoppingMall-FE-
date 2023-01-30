import React from 'react';
import { useNavigate } from 'react-router-dom';
import AWS from "aws-sdk";

export default function ProductCard({
  product,
  product: { id, name, price},
}) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
      className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105'
    >
      {/* <img className='w-96' src={image} alt={name} /> */}
      <img className='w-96' 
        src={`https://hyuksmallbucket.s3.ap-northeast-2.amazonaws.com/padding1.jpg`}
        alt={name} />
      <div className='mt-2 px-2 text-lg flex justify-between items-center'>
        <h3 className='truncate'>{name}</h3>
        <p>{`KRW ${price}`}</p>
      </div>
      <p className='mb-2 px-2 text-gray-600'>{id}</p>
    </li>
  );
}
