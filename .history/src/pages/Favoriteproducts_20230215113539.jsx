import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Favoriteproducts() {


  //좋아요 상품목록 불러오기
  const [favorite,setFavorite] = useState('')
  useEffect(()=>{
    axios.get("http://3.38.35.43:8080/user/favorite",{
      headers: {
          'Content-Type' : 'application/json',
          'Authorization' : window.localStorage.getItem('Login')
      }
  }).then((response) => {
      console.log('success');
      setFavorite(response.data)
  }) 
  },[])
  
  return (
    <div>{favorite.price}</div>
  )
}
