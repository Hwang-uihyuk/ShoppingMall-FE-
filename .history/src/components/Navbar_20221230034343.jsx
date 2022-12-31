import React from 'react';
import { Link } from 'react-router-dom';

import { GiShop } from 'react-icons/gi'

import {CgEditMarkup} from 'react-icons/cg'

import { login } from '../api/firebase';

export default function Navbar() {
  
  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <GiShop />
        <h1>Hyuk's mall</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
          <Link to='/carts'>
              Carts
          </Link>
        
          <Link to='/products/new' className='text-2xl'>
            <CgEditMarkup />
          </Link>
        
        
        <button onClick={login}> Login</button>
        
      </nav>
    </header>
  );
}
