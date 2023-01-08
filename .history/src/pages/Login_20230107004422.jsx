import React from 'react'
import Button from '../components/ui/Button';
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';

export default function Login() {
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");

   //axios
   //const App = () => {}
   // function App() {
    //    return
//    }
  const App = () => {
    const[posts,setPosts] = useState([]);

    useEffect(() => {
        
    })
  }

  const onIdHandler = (e) =>{
      setId(e.currentTarget.value);
  }

  const onPasswordHandler = (e) => {
      setPassword(e.currentTarget.value);
  }

  const onSubmitHandler =(e) => {
      e.preventDefault();//page가 refresh 방지
  }

  return (
    <div className='flex justify-center items-center w-full h-screen' >
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
            placeholder='PASSWORD'
            className='rounded-3xl'
            value={Password}
            onChange={onPasswordHandler}
            >
            </input>
            <br />
            <Button 
            text={'Login'} >

            </Button>
        </form>    
        
    </div>
  )
}
