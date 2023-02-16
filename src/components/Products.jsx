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
    padding : 15px 20px 10px 30px;
    position : relative;
    top : 30px;
    display: flex;
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
const SearchContainer = styled.div`
  width : 20%;
  height : 70%;
  margin-left: auto;
  margin-right : 20px;
  display: flex;
`
const SearchInput = styled.input`
  width : 70%;
  height : 30%;
  align-self: center;
  margin-right: 5px;
  border-radius: 15px;
  border : 1px solid grey;
`
const SearchBtn = styled.button`
  width : 100px;
  height : 30px;
  margin-left: auto;
  background-color : black;
  color : white;
  align-self: center;
  border-radius: 15px;
  font-family: "RalewayBold";
`

const Search = ({keywordHandler,searchHandler}) =>(
  <SearchContainer>
    <SearchInput onChange={keywordHandler}></SearchInput>
    <SearchBtn onClick = {searchHandler}>SEARCH</SearchBtn>
  </SearchContainer>
)
// const categoryClickHandler = (event) => {
//   setUserAddress(event.currentTarget.value);
// }

export default function Products() {
    const [category,setCategory] = useState("all");
    const [keyword,setKeyword] = useState("");
    const handleCategoryClick = (props) =>{
      setCategory(props)
    }
    const onKeywordChangeHandeler =(event) =>{
      const currentKeyword = event.currentTarget.value;
      setKeyword(currentKeyword);

    }
    const onSearchHandeler = (event)=>{
      event.preventDefault();
      console.log(keyword);

      axios({
        method : "get",
        url : `${baseURL}/shop/search/${keyword}?sort=hits`,
        headers : {
          "Content-Type" :"application/json"
        }
      }).then((response)=>{
        setProducts(response.data)
      }).catch((error)=>console.log(error))
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
          <Search
            keywordHandler={onKeywordChangeHandeler}
            searchHandler= {onSearchHandeler}/>
        </CategoriesContainer>

        {/* {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>} */}
        <div className='p-10 pt-4'>
          <ul className='grid grid-cols-1 md:grid-cols-4 lg-grid-cols-4 gap-10'>
            {products &&
              products.filter((product)=>{               
                if(category === "all"){
                
                  return product
                }
                else if(product.category===category){
                  return product
                }
              }).map((product)=>(
                <ProductCard key={product.id} product={product} />
              ))
            }
          </ul>
        </div>
      </>
    );
  }
  