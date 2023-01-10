import { useQuery } from '@tanstack/react-query';
import React,{useState} from 'react';
import { getProducts } from '../api/firebase';
import ProductCard from './ProductCard';
import useProducts from './hooks/useProducts';
import styled from "styled-components";

const CategoriesContainer = styled.div`
    height : 80px;
    width : 100%;
    padding : 12px 20px 10px 5px;
    position : relative;
    top : 30px;
`
const Category = styled.h2`
    color : black;
    float: left;
    font-size: 20px;
    margin: 0 10px 0 10px;
    &:hover{
        color : #666666e0;
        cursor : pointer;
    }
`
const Partition = styled.h2`
    color : black;
    float: left;
    margin : 0 10px 0 10px;
    font-size : 20px;
`
// const categoryClickHandler = (event) => {
//   setUserAddress(event.currentTarget.value);
// }

export default function Products() {
    const [category,setCategory] = useState("all");
    const handleCategoryClick = (props) =>{
      setCategory(props)
    }
    const {
      isLoading,
      error,
      data: products,
    } = useQuery(['products'], getProducts);
    return (
      <>
        <CategoriesContainer>
          <Category onClick={()=>handleCategoryClick("shirts")}>Shirts</Category>
          <Partition>|</Partition>
          <Category onClick={() => handleCategoryClick("outer")}>Outer</Category>
          <Partition>|</Partition>
          <Category onClick={() => handleCategoryClick("pants")}>Pants</Category>
          <Partition>|</Partition>
          <Category onClick={() => handleCategoryClick("shoes")}>Shoes</Category>
        </CategoriesContainer>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <ul className='grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4'>
          {products &&
            products.filter((product)=>{
              if(category === "all"){
                return product
              }
              else if(product.category.toLowerCase()===category){
                return product
              }
            }).map((product)=>(
              <ProductCard key={product.id} product={product} />
            ))
          }
        </ul>
      </>
    );
  }
  