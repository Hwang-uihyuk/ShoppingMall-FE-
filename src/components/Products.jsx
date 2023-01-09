import { useQuery } from '@tanstack/react-query';
import React,{useState} from 'react';
import { getProducts } from '../api/firebase';

import ProductCard from './ProductCard';
import useProducts from './hooks/useProducts';


export default function Products() {
    const [category,setCategory] = useState("all");
    const {
      isLoading,
      error,
      data: products,
    } = useQuery(['products'], getProducts);
    return (
      <>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ul className='grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4'>
          {products &&
            products.filter((product)=>{
              if(category==="all"){
                return product
              }
              else if(product.category.toLowerCase()==="outer"){
                return product
              }
            }).map((product)=>(
              <ProductCard key={product.id} product={product} />
            ))
            // products.map((product) => (
            //  
            // ))
          }
        </ul>
      </>
    );
  }
  