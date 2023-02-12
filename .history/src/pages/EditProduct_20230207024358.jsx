import React from 'react'
import { useEffect } from 'react';

export default function EditProduct() {
    //처음 상품의 정보 가져오기
    const id = window.localStorage.getItem('ID')
    useEffect(() => {
        axios({
            method : "get",
            url : `http://3.38.35.43:8080/register/product/${id}`, //이게 오류일수도있음 안되면 ㅇㅇ
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : window.localStorage.getItem('Login')
            }
        }).then((response) => {
            console.log("처음 데이터를 가져왔습니다.")
        })
    })
  return (
    <div>EditProduct</div>
  )
}
