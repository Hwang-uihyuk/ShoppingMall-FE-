import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useAxiosAuthContext } from '../components/context/UserStateContext';
import { PostLogin } from '../api/api';

export default function Login() {
  const { user, login, logout } = useAxiosAuthContext();
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
    e.preventDefault();
    PostLogin(Id,Password);
  }

  return (
    <div className='flex flex-col bg-gray-100 absolute t-0 b-0 w-full left-1/2' >
      <div className='titleWrap'>
        로그인
      </div>
  <form className='flex flex-col' onChange={onSubmitHandler}>
            
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

