import React from 'react'
import { useState } from 'react';
import axios from 'axios'


export default function Login() {
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");

    const onIdHandler = (e) => {
      setId(e.currentTarget.value);
  }

  const onPasswordHandler = (e) => {
      setPassword(e.currentTarget.value);
  }

  const onSubmitHandler =(e) => {
      e.preventDefault();//page가 refresh 방지
  }

  axios.defaults.withCredentials = true;

  const onLogin = (e) => {
    e.preventDefault();

    //json.strin
    const data = JSON.stringify({
      "username" : Id,
      "password" : Password,
    });

    axios.post('http://3.38.35.43:8080/login',data,{
      headers :{
        'Content-Type' : 'application/json'
      }
    })
    .then(response => {
      console.log(response.headers.get("Authorization")) 
      // const { accessToken } = response.data;
      //localStorage에 
      window.localStorage.setItem("Login", response.headers.get("Authorization"))
      
      //getItem => 변수 가져오기 
      console.log("=======로그인 성공=========")
  
      const val = response.headers.get("Authorization")
      
      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      // axios.defaults.headers.common['Authorization'] = val;
      // accessToken을 localStorage, cookie 등에 저장하지 않는다!      
      //main
      document.location.href = '/'
    }).catch(error => {
      // ... 에러 처리
      console.log("에러")
      console.log(error)
    });

    
  }
  

    
  
  //로그인이 
  return (
    <div className='flex justify-center items-center w-full h-screen' >
        <form className='flex flex-col' onChange={onSubmitHandler}>
            
            {/* <ul>
            {posts.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
            </ul> */}

            <label>ID</label>
            <input 
            type="text"
            placeholder='ID'
            className='rounded-3xl'
            value={Id}
            onChange={onIdHandler}
            >
            </input>

            <label>PASSWARD</label>
            <input
            type="text"
            placeeholder="PASSWORD"
            className='rounded-3xl'
            value={Password}
            onChange={onPasswordHandler}
            >
            </input>
            <br />
            <div>
            <button onClick={onLogin}> 로그인 버튼!!</button>
            <div></div>
            </div>
        </form>    
    </div>
  )
}


