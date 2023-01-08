import React from 'react'
import Button from '../components/ui/Button';

export default function Login() {
  return (
    <div className='flex justify-center items-center w-full h-screen' >
        <form className='flex flex-col'>
            <label>ID</label>
            <input 
            type="text"
            placeholder='ID'
            className='rounded-3xl'></input>

            <label>PASSWARD</label>
            <input
            type="text"
            placeholder='PASSWORD'
            className='rounded-3xl'></input>
            <Button text={'login'}></Button>
        </form>    
        
    </div>
  )
}
