import React from 'react'

export default function Navbar() {
  return (
    <header>
        <nav>
            <Link to="/">
                Shoppingmall
            </Link>

            <Link to="/products">
                Products
            </Link>

            <Link to="/products/new">
                NewProducts
            </Link>

            <Link to ="/carts">
                Carts
            </Link>
        </nav>
    </header>
        
    
  )
}
