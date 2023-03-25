import React, { useEffect, useState } from 'react';
import { Link } from  'react-router-dom';
import CartItem from '../components/CartItem';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';
import NoResult from '../pages/NoResult';
import { createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { LoadCartProducts } from '../api/api';

const SHIPPING = 3000;
export const ContextCartProduct = createContext();

export default function MyCart() {

  const [cartproduct, setCartProduct] = useState('')
  const uuid = uuidv4();

  useEffect(() => {
    LoadCartProducts().then((response) => {
      console.log(response.data)
      setCartProduct(response.data)})},[])

  const hasProducts = cartproduct.length > 0;

  let totalprice = 0
  cartproduct&&
    cartproduct.map((product)=>(
      totalprice = totalprice + Number(product.price) * Number(product.count)
    ));

  let stock_zero_price = 0
    cartproduct && 
    cartproduct.map((product)=> 
      product.stock_zero === false ? stock_zero_price += product.price: "")
        
  return (
    <section className='p-8 flex flex-col'>
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>
        내 장바구니</p>
      {!hasProducts ?<NoResult keyword ="cart"/>:(
        <>
          <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
            {cartproduct &&
              cartproduct.map((product) => (
                <CartItem  key= {product.id + product.size} product={product} setCartProduct={setCartProduct} cartproduct={cartproduct} />
              ))}
          </ul>
          <div className='flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16'>
            <PriceCard text='상품 총액' price={totalprice - stock_zero_price} />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='배송액' price={SHIPPING} />
            <FaEquals className='shrink-0' />
            <PriceCard text='총가격' price={totalprice + SHIPPING - stock_zero_price} />
          </div>

          <div className='flex justify-center m-2'>
            <Link to='/order' state ={{product : cartproduct, from : 'cart'}}>
              <Button text = "주문하기"/>
            </Link>
          </div>
        </>)}
    </section>
    
  );
  
}
