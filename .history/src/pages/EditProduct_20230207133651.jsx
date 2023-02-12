import axios from 'axios';
import React from 'react'
import { useEffect,useState } from 'react';

export default function EditProduct() {
    //처음 상품의 정보 가져오기    
    //판매등록하 상품 목록 조회
    const [sellrig, setSellRig] = useState('')

    useEffect(() => {
        axios({
        method: "get",
        url : `http://3.38.35.43:8080/register/product/`, //url이 안먹히는듯
        headers: {  
         "Content-Type": "application/json",
          "Authorization" : window.localStorage.getItem('Login')
        }
    }).then((response) => {
        console.log("처음 데이터 값을 가져왔습니다.");
        console.log(response.data)
        setSellRig(response.data)
     })
     .catch((error) => console.log(error))
    }, [])


  return (
    <div>
      sdf
    </div>

  )
}
