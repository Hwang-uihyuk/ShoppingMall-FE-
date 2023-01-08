import React from 'react'

export default function Login() {
  return (
    <div className='flex justify-center items-center w-full h-screen' >
        <form className='flex flex-col'>
            <label>ID</label>
            <input 
            type="text"
            placeholder='ID'
            className='rounded-md'></input>
            <label>PASSWARD</label>
            <input type="text" placeholder='PASSWORD'></input>
            <button>login 하기</button>
        </form>    
        
    </div>
  )
}
