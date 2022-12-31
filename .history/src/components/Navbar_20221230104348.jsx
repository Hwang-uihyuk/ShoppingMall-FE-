import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { GiShop } from 'react-icons/gi'

import {CgEditMarkup} from 'react-icons/cg'

import { login, logout, onUserStateChange } from '../api/firebase';
import User from '../../.history/src/components/User_20221230104321';

export default function Navbar() {
  const [user, setUser] = useState();


  useEffect(()=>{
    onUserStateChange((user) => {
        setUser(user);
    })
  },[])
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
        
        {user && <User user={user} />}
        {!user && <button onClick={login}> Login</button>}
        {user && <button onClick={logout}> Logout</button>}
        
        
      </nav>
    </header>
  );
}
