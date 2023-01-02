import { useQuery } from '@tanstack/react-query'
import React from 'react'


export default function Products() {
    const {isLoading,error,data: products} = useQuery([], ()=>{})
  return (
      
    <div>Products</div>
  )
}
