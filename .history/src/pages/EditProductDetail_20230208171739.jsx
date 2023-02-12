import React from 'react'

export default function EditProductDetail() {
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

     })
     .catch((error) => console.log(error))
    

  return (
    <div>
        <div>
            
        </div>

    </div>
  )
}
