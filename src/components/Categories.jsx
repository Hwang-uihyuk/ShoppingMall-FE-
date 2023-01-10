import React, { useState } from "react";
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
export default function Categories(props){
    function sendCategory(cat){
        props.setCategory(cat);
    }
    return (
        <CategoriesContainer>
            <Category onClick={sendCategory("shirts")}>Shirts</Category>
            <Partition>|</Partition>
            <Category onClick={sendCategory("outer")}>Outer</Category>
            <Partition>|</Partition>
            <Category onClick={sendCategory("pants")}>Pants</Category>
            <Partition>|</Partition>
            <Category onClick={sendCategory("shoes")}>Shoes</Category>
        </CategoriesContainer>
    )
}