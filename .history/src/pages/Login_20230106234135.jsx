import React from 'react'
import Button from '../components/ui/Button';
import { useState } from 'react';

export default function Login() {
  const [Id, setId] = useState();
  const [Password, setPassword] = useState(0;)
  return (
    <div className='flex justify-center items-center w-full h-screen' >
        <form className='flex flex-col'>
            <label>ID</label>
            <input 
            type="text"
            placeholder='ID'
            className='rounded-3xl'
            value={Id}
            onChange={onEmailHandler}
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
