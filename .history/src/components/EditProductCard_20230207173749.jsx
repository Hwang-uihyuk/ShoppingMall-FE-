import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function EditProductCard({
  product,
  product : {name, price, category, description, size, imgKey}
})
const navigate = useNavigate();
{
  return (
    <li
        onClick={() => {
            navigate(`products/${name}` , {state : { product }});
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