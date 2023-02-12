import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function EditProductCard({
  product,
  product : {id, name, price, category, description, size, imgKey,favorite}
}, ) {
const navigate = useNavigate();


  //상품 삭제
  const DeleteProduct = (e) => {
    e.preventDefault();
    console.log(product.id)
    const message = window.confirm('정말로 상품을 삭제하시겠습니까?')
    if(message === true){
      axios.delete(`http://3.38.35.43:8080/register/product${product.id}`,{
        headers :{
          'Content-Type' : 'ap[lication/json',
          'Authorization' : window.localStorage.getItem('Login')
      }
      }).then(response => {
        console.log('성공')
         navigate(`/`)}
      ).catch('에러입니다.')
    }
  }
  
  
  return (
    <li
        onClick={() => {
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

         <div className='flex justify-end'>
           <button className='border font-bold text-lg'>
             상품 수정하기
           </button>

           <button 
           className='border font-bold text-lg'
           onClick={DeleteProduct}
           >
             상품 삭제하기
           </button>
         </div>
            
    </li>
  )
}

// product card 부분
// product,
//   product: { id, name, price, imgKey, favorite},
// }) {
//   const navigate = useNavigate();

//   return (
//     <li
//       onClick={() => {
//         navigate(`/products/${name}`, { state: { product } });
//       }}
//       className='w-70 rounded-lg shadow-md overflow-hidden cursor-pointer transition-all'
//     >
//       {/* <img className='w-96' src={image} alt={name} /> */}
//       <img className='w-100 justify-center' 
//         src={imgKey}
//         alt={name} />
//       <div className='mt-2 px-2 text-lg flex justify-between items-center'>
//         <h3 className='truncate'>{name}</h3>
//         <p>{`KRW ${price}`}</p>
//       </div>
//       <p className='mb-2 px-2 text-gray-600'>{favorite}</p>
//     </li>
//   );
// }