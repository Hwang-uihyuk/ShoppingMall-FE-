import React from 'react'

export default function MdButton({text,onClick}) {
  return (
    <button onClick={onClick}
    className="bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-3 py-1 text-center">
         {text}
    </button>
  )
}
