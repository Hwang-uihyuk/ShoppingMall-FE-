import axios from 'axios';
import React from 'react'
import { useLocation } from 'react-router-dom';

export default function EditProductDetail() {
    const location = useLocation();

    const id = location.state.product.id;
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

     })
     .catch((error) => console.log(error))
    

  return (
    <div>
        <div>
            
        </div>

    </div>
  )
}
