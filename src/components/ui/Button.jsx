import React from 'react'

export default function Button({text, onClick}) {
  return (
    <div>
        <button className='bg-brand text-black py-2 px-4 rounded-full hover:brightness-110' onClick={onClick}>
            {text}
        </button>

        
    </div>
  )
}
