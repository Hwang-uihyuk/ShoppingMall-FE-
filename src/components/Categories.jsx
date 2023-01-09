import React, { useState } from "react";
import styled from "styled-components";

const CategoriesContainer = styled.div`
    height : 60px;
    width : 100%;
    padding : 12px 20px 10px 5px;
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
export default function Categories(){
    return (
        <CategoriesContainer>
            <Category cat = "Shirts">Shirts</Category>
            <Partition>|</Partition>
            <Category cat ="Outer">Outer</Category>
            <Partition>|</Partition>
            <Category cat ="Pants">Pants</Category>
            <Partition>|</Partition>
            <Category cat = "Shoes">Shoes</Category>
        </CategoriesContainer>
    )
}