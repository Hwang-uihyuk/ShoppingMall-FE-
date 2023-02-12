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
    <div className='flex flex-col bg-gray-100 absolute top-0 bottom-0 right-1/2 translate-x-1/2 w-full  overflow-hidden  translate-y-0' >
      <div className='titleWrap'>
        로그인
      </div>
  <form className='flex flex-col mt-26 flex-1' onChange={onSubmitHandler}>
            
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

