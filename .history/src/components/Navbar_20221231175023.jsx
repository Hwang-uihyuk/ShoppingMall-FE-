import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { GiShop } from 'react-icons/gi'

import {CgEditMarkup} from 'react-icons/cg'

import { login, logout, onUserStateChange } from '../api/firebase';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from './context/AuthContext';


export default function Navbar() {
  const {user, login, lgout} = useAuthContext();
    //context 이용

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <GiShop />
        <h1>Hyuk's mall</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        
          <Link to='/carts'>Carts</Link>
        
          
        {user && user.isAdmin && (
          <Link to='/products/new' className='text-2xl'>
            
            <CgEditMarkup />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text ={"login"} onClick={login}> Login
        </Button>}
        {console.log(user)}
        {user && <Button text = {"logout"} onClick={logout}> Logout</Button>}
        
        
      </nav>
    </header>
  );
}
