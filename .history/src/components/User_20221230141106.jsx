import React from 'react'

export default function User({user:{photoURL, displayName}}) {
  return (
    <div className='flex items-center'>
        <img className='w-10 h-10 rounded-full mr-2'
        src = {photoURL} alt ={displayName}/>
        <span className='hidden md:block'>{displayName}</span>
        {/* midsize에서는 hidden으로 반응형으로 만들었다. */}
    </div>
  )
}
