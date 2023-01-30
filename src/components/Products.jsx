import { useQuery } from '@tanstack/react-query';
import React,{useState,useEffect} from 'react';
import { getProducts } from '../api/firebase';
import ProductCard from './ProductCard';
import useProducts from './hooks/useProducts';
import styled from "styled-components";
import { LoadProductsAll } from '../api/api';
import axios from 'axios'

const baseURL = "http://3.38.35.43:8080"

const CategoriesContainer = styled.div`
    height : 80px;
    width : 100%;
    padding : 20px 20px 10px 10px;
    position : relative;
    top : 30px;
`
const Category = styled.h2`
    color : black;
    float: left;
    font-size: 20px;
    margin: 0 20px 0 20px;
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
    const [products,setProducts] = useState();
    useEffect(() => {
      axios({
        method: "get",
        url: baseURL +"/shop",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((response) => {
        console.log(response.data)
        setProducts(response.data)
      })
        .catch((error) => console.log(error))
    }, [])
  
    return (
      <>
        <CategoriesContainer>
          <Category onClick={() => handleCategoryClick("all")}>ALL</Category>
          <Category onClick={()=>handleCategoryClick("shirts")}>SHIRTS</Category>
          <Category onClick={() => handleCategoryClick("outer")}>OUTER</Category>
          <Category onClick={() => handleCategoryClick("pants")}>PANTS</Category>
          <Category onClick={() => handleCategoryClick("shoes")}>SHOES</Category>
        </CategoriesContainer>
        {/* {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>} */}

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
  