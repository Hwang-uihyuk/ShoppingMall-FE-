import React from 'react'
import {Link} from 'react-router-dom'
export default function Navbar() {
  return (
    <header>
        <nav>
            <Link to="/">
                Shoppingmall
                <Outlet/>
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
