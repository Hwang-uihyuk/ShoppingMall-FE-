import { useQuery } from '@tanstack/react-query';
import React,{useState,useEffect} from 'react';
import ProductCard from './ProductCard';
import NoResult from '../pages/NoResult';
import styled from "styled-components";
import axios from 'axios'
import { LoadSearchProducts,LoadSortProducts,LoadCategoryProducts } from '../api/api';
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
    justify-content: center;
    &:hover{
        cursor : pointer;
    }
`
const Category = styled.h2`
  border-radius: 20px;
  text-align: center;
  width : 20%;
  height : 100%;
  color : black;
  float: left;
  font-size: 20px;
  transition : font-size 3s ease out 100ms;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:hover{
      font-size: 20.1px;
      background-color: #ebebeb;
  }
`
const ImageContainer = styled.div`
  border-radius: 30px;
  border : none;
  display: flex;
  align-items: center;
  height : 40px;
  width : 40px;
  padding : 10px;
`
const SearchContainer = styled.div`
  margin : 5px 10px 0 0 ;
  padding-left: 10px;
  border-radius: 25px;
  background-color: #f1f1f1;
  width : 15%;
  height : 40px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const SearchInput = styled.input`
  width : 100%;
  height : 40%;
  border-radius: 0.375rem;
  padding: 0.625rem;
  border : none;
  align-self: right;
  background-color: #f1f1f1;
  `
const SearchBtn = styled.button`
  border: none;
  padding-right : 5px;
  font-weight: 500;
  border-radius: 3.75rem;
  color : white;
  align-self: center;
  font-family: "RalewayBold";
  transition: background-color 0.2s ease-in-out;
    &:focus {
        outline: none;
    }
`
const Search = ({keywordHandler,searchHandler}) =>(
  <SortContainer>
    <SearchContainer>
    <SearchInput onChange={keywordHandler}></SearchInput>
    <SearchBtn onClick = {searchHandler}>
      <ImageContainer>
      <img src="/images/searchcon.png"></img>
      </ImageContainer>
    </SearchBtn>
  </SearchContainer>
  </SortContainer>
)
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
  width: 100%;
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

export default function Products() {
    const [isResult,setIsResult] = useState(true);
    const [category,setCategory] = useState("all");
    const [keyword,setKeyword] = useState("");
    const [products, setProducts] = useState();
    const [sort,setSort] = useState("hits");
    const [isSearch, setIsSearch] = useState(false)
    
    console.log(products);
    useEffect(() =>{
        isSearch?(
        LoadSearchProducts(keyword,sort)
        .then((response) => {
          setIsResult(true);
          setProducts(response.data)})
        .catch((error) => {
          setIsResult(false);
          console.log(error);}))
        :((category === "all")?
            (LoadSortProducts(sort)
              .then((response) => {
              setIsResult(true);
              setProducts(response.data);})
              .catch((error) => { console.log(error); }))
            :(LoadCategoryProducts(category, sort)
              .then((response) => {
                setIsResult(true);
                setProducts(response.data)})
              .catch(setIsResult(false))))
      },[category,sort,isSearch])
    
  const onCategoryClick = (props) => {
    setCategory(props);
    setIsSearch(false);}

  const onSortClick =(props)=>{
    setSort(props);}

  const onKeywordChangeHandeler = (event) => {
    const currentKeyword = event.currentTarget.value;
    setKeyword(currentKeyword);}

  const onSearchHandeler = (event) => {
    event.preventDefault();
    setIsSearch(true);}

    return (
      <>
        <Container>
          <Categories categoryHandler={onCategoryClick} categories={categories} />
        </Container>
        <Sort sortHandler={onSortClick} sorts={sorts} />
        <Search
            keywordHandler={onKeywordChangeHandeler}
            searchHandler={onSearchHandeler} />
        {/* {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>} */}
        <div className='p-10 pt-4'>
          {isResult?(
            <ul className='grid grid-cols-1 md:grid-cols-4 lg-grid-cols-4 gap-10'>
            {products &&
              products.map((product)=>(
                <ProductCard key={product.id} product={product} />))}
          </ul>):(<NoResult keyword ="search"/>)}
        </div>
      </>
    );
  }
  