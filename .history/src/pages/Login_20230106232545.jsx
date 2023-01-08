import React from 'react'

export default function Login() {
  return (
    <div className='flex justify-center items-center w-full h-screen' >
        <form className='flex flex-col'>
            <input type="text" placeholder='ID'></input>
            <input type="text" placeholder='PASSWORD'></input>
            <button>login 하기</button>
        </form>    
        
    </div>
  )
}
