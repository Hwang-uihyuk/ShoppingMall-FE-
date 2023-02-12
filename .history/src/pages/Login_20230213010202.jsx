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
    <>
    <div className='flex flex-col bg-gray-100 relative top-0 bottom-0 right-1/2 translate-x-1/2 w-full  overflow-hidden  translate-y-0' >
      <div className='titleWrap'>
        로그인
      </div>
  <form className='flex flex-col mt-26 flex-1' onChange={onSubmitHandler}>
            
            <label>ID</label>
            <input 
            type="text"
            placeholder='ID'
            className='rounded-3xl flex w-full bg-white mt-8 p-16'
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
{/* new login */}
<section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          Flowbite    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>



    </>    
  )
}

