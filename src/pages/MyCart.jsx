import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CartItem from '../components/CartItem';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';
import axios from 'axios';
import { createContext } from 'react';

const SHIPPING = 3000;


export const ContextCartProduct = createContext();
export default function MyCart() {
  const [cartproduct, setCartProduct] = useState('')
  useEffect(()=>{
    console.log(cartproduct)},[])

       
    //장바구니 상품 가져오기 
    
    useEffect(()=> {axios.get("http://3.38.35.43:8080/user/cart",{
      headers:{
        "Content-Type": "application/json",
        "Authorization": window.localStorage.getItem('Login')
      }
    }).then((response) => 
    setCartProduct(response.data))},[])


  // if (isLoading) return <p>Loading...</p>;

  const hasProducts = cartproduct.length > 0;
  
  

  //총금액
  const totalPrice =
    cartproduct.price &&
    cartproduct.price.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );
 
    
    
  
    

  return (
       
    <section className='p-8 flex flex-col'>
    
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>
        내 장바구니
      </p>
      {!hasProducts && <p>장바구니에 상품이 없습니다. 열심히 쇼핑해 주세요!</p>}
      {hasProducts && (
        <>
          <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
            {cartproduct &&
              cartproduct.map((product) => (
                <CartItem  product={product}  />
              ))}
          </ul>

          <div className='flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16'>
            <PriceCard text='상품 총액' price={totalPrice} />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='배송액' price={SHIPPING} />
            <FaEquals className='shrink-0' />
            <PriceCard text='총가격' price={totalPrice + SHIPPING} />
          </div>
          <Button text='주문하기' />
        </>
      )}
      {/* <ContextCartProduct.Provider value={cartproduct}>
    <CartItem/>
  </ContextCartProduct.Provider>  */}
    </section>
    
  );
  
}
