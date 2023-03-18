import { useQuery } from '@tanstack/react-query';
import React,{useState,useEffect} from 'react';
import ProductCard from './ProductCard';
import NoResult from '../pages/NoResult';
import styled from "styled-components";
import { LoadProductsAll } from '../api/api';
import axios from 'axios'


const baseURL = process.env.REACT_APP_URL
const categories = ["all", "top", "outer", "pants"];
const sorts = ["hits", "date", "favorite", "purchase"];

const Container = styled.div`
  display: flex;
  padding : 10px 20px 5px 30px;
`

const CategoriesContainer = styled.div`
    height : 80px;
    width : 100%;
    padding : 15px 20px 10px 20px;
    position : relative;
    display: flex;
    align-items: center;
`
const Category = styled.h2`
    color : black;
    float: left;
    font-size: 20px;
    margin-right: 30px;
    transition : font-size 3s ease out 100ms;
    &:hover{
        color : #666666e0;
        cursor : pointer;
        font-size: 20.1px;
    }
`
const SearchContainer = styled.div`
  width : 30%;
  height : 80px;
  margin-left: auto;
  margin-right : 20px;
  display: flex;
  align-items: center;
`
const SearchInput = styled.input`
  width : 70%;
  height : 40%;
  margin-right: 5px;
  border-radius: 0.375rem;
  padding: 0.625rem;
  border : 1px solid;
  border-color: rgb(209 213 219);
  align-self: right;
  background-color: rgb(248 250 252);
  `
const SearchBtn = styled.button`
  margin-left : 2%;
  width : 30%;
  height : 40%;
  font-size: 90%;
  font-weight: 500;
  border-radius: 0.375rem;
  background-color : #252525;
  color : white;
  align-self: center;
  font-family: "RalewayBold";
  transition: background-color 0.2s ease-in-out;
    &:hover {
        background-color: #374151;
    }
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
    }
`
const SortLabel = styled.label`
  font-size : 12px;
  font-family: "RalewayBold";
  margin-right: 20px;
  align-content: flex-end;
  &:hover{
        color : #666666e0;
        cursor : pointer;
  }
`
const SortContainer = styled.div`
  padding : 0px 20px 10px 50px;
  display: flex;
  justify-content: right;
`
const Sort = ({ sortHandler, sorts }) => (
  <SortContainer>
    {sorts && sorts.map((sort, index) => (
      <SortLabel key={index} onClick={() => sortHandler(sort)}>
        {sort ==="hits"
          ? "조회순"
          : sort === "purchase"
          ? "구매순"
          : sort === "date"
          ? "최신순"
          : sort ==="favorite"
          ? "좋아요순"
          :sort}
      </SortLabel>
    ))}
  </SortContainer>
)
const Categories = ({ categoryHandler, categories }) => (
  <CategoriesContainer>
    {categories && categories.map((category, index) => (
      <Category key={index} onClick={() => categoryHandler(category)}>
        {category.toUpperCase()}
      </Category>
    ))}
  </CategoriesContainer>
)
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
    const [isResult,setIsResult] = useState(true);
    const [category,setCategory] = useState("all");
    const [keyword,setKeyword] = useState("");
    const [products, setProducts] = useState();
    const [sort,setSort] = useState("hits");
    const [isSearch, setIsSearch] = useState(false)
    useEffect(() => {
      if(isSearch){
        console.log(`Search Keyword:${keyword}| sort:${sort}`)
        axios({
          method: "get",
          url: `${baseURL}/shop/search/${keyword}?sort=${sort}`,
          headers: {
            "Content-Type": "application/json"
          }
        }).then((response) => {
          setIsResult(true);
          setProducts(response.data)

        }).catch((error) => {

          setIsResult(false);
          console.log(isResult)
          console.log(error);
        })
      }
      else{
        if (category === "all") {
          axios({
            method: "get",
            url: `${baseURL}/shop?sort=${sort}`,
            headers: {
              "Content-Type": "application/json",
            }
          }).then((response) => {
            setIsResult(true);
            setProducts(response.data);
          })
            .catch((error) => {
              console.log(error);
            })
        } else {
          axios({
            method: "get",
            url: `${baseURL}/shop/category/${category}?sort=${sort}`,
            headers: {
              "Content-Type": "application/json"
            }
          }).then((response) => {
            console.log(response)
            setIsResult(true);
            setProducts(response.data)
            console.log(`Sorted : ${sort}\nCategory : ${category}`)
          }).catch((error) => {
            setIsResult(false);
            // console.log(error);
          })
        }
      }
    }, [category,sort,isSearch])
  const onCategoryClick = (props) => {
    setCategory(props);
    setIsSearch(false);
  }
  const onSortClick =(props)=>{
    setSort(props);
  }
  const onKeywordChangeHandeler = (event) => {
    const currentKeyword = event.currentTarget.value;
    setKeyword(currentKeyword);
  }
  const onSearchHandeler = (event) => {
    event.preventDefault();
    setIsSearch(true);
    console.log(keyword);

    axios({
      method: "get",
      url: `${baseURL}/shop/search/${keyword}?sort=${sort}`,
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      setIsResult(true);
      setProducts(response.data)
      
    }).catch((error) => {
      
      setIsResult(false);
      console.log(isResult)
      console.log(error);
    })
  }
  
    return (
      <>
        <Container>
          <Categories categoryHandler={onCategoryClick} categories={categories} />
          <Search
            keywordHandler={onKeywordChangeHandeler}
            searchHandler={onSearchHandeler} />
        </Container>
        <Sort sortHandler={onSortClick} sorts={sorts} />
        {/* {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>} */}
        <div className='p-10 pt-4'>
          {isResult?(
            <ul className='grid grid-cols-1 md:grid-cols-4 lg-grid-cols-4 gap-10'>
            {products &&
              products.map((product)=>(
                <ProductCard key={product.id} product={product} />
              ))
            }
          </ul>):(
            <NoResult/>
          )
          }
        </div>
      </>
    );
  }
  