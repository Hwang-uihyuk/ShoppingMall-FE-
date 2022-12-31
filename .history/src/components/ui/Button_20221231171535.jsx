import React from 'react'

export default function Button({text, onClick}) {
  return (
    <div>
        <button className='bg-pink text-black py-2 px-4 rounded-sm hover:brightness-105' onClick={onClick}>
            {text}
        </button>

        
    </div>
  )
}
