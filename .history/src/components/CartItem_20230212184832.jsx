import React, { useState } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { addOrUpdateToCart, removeFromCart } from '../api/firebase';
import axios from 'axios';

const ICON_CLASS =
  'transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1';

export default function CartItem(
//   {
//   product,
//   product: { id, image, title, option, quantity, price },
//   uid,
// }
{
  cartproduct,
  cartproduct : {id, name,price,size,imgKey, stock_zero,count}
}

) {
  // const handleMinus = () => {
  //   if (quantity < 2) return;
  //   addOrUpdateToCart(uid, { ...product, quantity: quantity - 1 });
  // };
  // const handlePlus = () =>
  //   addOrUpdateToCart(uid, { ...product, quantity: quantity + 1 });

  // const handleDelete = () => removeFromCart(uid, id);


//장바구니 상품 가져오기 
// const [cartproduct, setCartProduct] = useState('')
// axios.get("http://3.38.35.43:8080/user/cart",{
//   headers:{
//     "Content-Type": "application/json",
//     "Authorization": window.localStorage.getItem('Login')
//   }

// }).then((response) => {
// setCartProduct(response.data)})


  return (
    <li className='flex justify-between my-2 items-center'>
      <img className='w-24 md:w-48 rounded-lg' src={cmgKey}  />
      <div className='flex-1 flex justify-between ml-4'>
        <div className='basis-3/5'>
          <p className='text-lg'>{}</p>
          <p className='text-xl font-bold text-brand'>{cartproduct.size}</p>
          <p>₩{cartproduct.price}</p>
        </div>
        <div className='text-2xl flex items-center'>
          <AiOutlineMinusSquare className={ICON_CLASS} onClick={""
          } />
          <span>{}</span>
          <AiOutlinePlusSquare className={ICON_CLASS} onClick={""} />
          <RiDeleteBin5Fill className={ICON_CLASS} onClick={""} />
        </div>
      </div>
    </li>
  );
}