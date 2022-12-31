import React from 'react'
import { useState } from 'react';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const handleSubmit = () =>{}
  const handleChange = () =>{}
  return (
    <section>
      <form onSubmit={handleSubmit}>

        <input  
        type="file"
        accept ="image/*"
        name = "file"
        required
         onChange ={handleChange}></input>
      </form>
    </section>
      
  )
}
