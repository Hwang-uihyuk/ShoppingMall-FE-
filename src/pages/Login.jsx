import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { PostLogin } from '../api/api';
import { onLog } from 'firebase/app';

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
    
  const onLogin = (e)=>{
    const data = JSON.stringify({
      "username": Id,
      "password": Password,
    });
    PostLogin(data);
  }    
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


