import axios from 'axios'
import React, { useState } from 'react'

export default function Favoriteproducts() {


  //좋아요 상품목록 불러오기
  const [favorite,setFavorite] = useState('')
  axios.get("http://3.38.35.43:8080/user/favorite",{
      headers: {
          'Content-Type' : application/json,
          'Authorization' : window.localStorage.getItem('Login')
      }
  }).then(console.log('불러오기 success')) 
  return (
    <div>d</div>
  )
}
