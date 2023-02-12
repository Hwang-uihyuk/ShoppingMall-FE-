import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Categories from '../components/Categories';

export default function EditProductDetail() {
    const location = useLocation();


    const [editform, setEditForm] = useState({})


    const id = location.state.product.id;

    useEffect(()=>{
        axios({
            method: "get",
            url : `http://3.38.35.43:8080/register/product/${id}`, //url이 안먹히는듯
            headers: {  
             "Content-Type": "application/json",
              "Authorization" : window.localStorage.getItem('Login')
            }
        }).then((response) => {
            console.log("수정할 데이터 값을 가져왔습니다.");
            console.log(id)
            console.log(response.data)
            setEditForm(response.data)
    
         })
         .catch((error) => console.log(error))
    },[] )
    
    

  return (
    <div>
        {editform.map((v)=> {[...v],<li>{v}</li>)}}
    </div>
  )
}
