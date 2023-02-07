import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';

export default function EditProduct() {
    //처음 상품의 정보 가져오기
    const id = window.localStorage.getItem('ID')
    console.log(id)
    console.log(`hi ${id}`)

    // useEffect(() => {
    //     axios({
    //         method : "get",
    //         url : `http://3.38.35.43:8080/register/product/Hwang}`, //이게 오류일수도있음 안되면 ㅇㅇ
    //         headers : {
    //             "Content-Type" : "application/json",
    //             "Authorization" : window.localStorage.getItem('Login')
    //         }
    //     }).then((response) => {
    //         console.log("처음 데이터를 가져왔습니다.")
    //     })
    //     .catch((error) => console.log(error))
    // },[])

    
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
        // setUserState(response.data)
     })
     .catch((error) => console.log(error))
    }, [])


  return (
    <div>
      <li>
        <ul>
          {}
        </ul>
      </li>
    </div>

  )
}
