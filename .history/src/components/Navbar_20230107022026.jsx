import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { AiFillShop } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from './context/AuthContext';
import CartStatus from './CartStatus';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        {/* <AiFillShop /> */}
        <h1>Hyuk's mall</h1>
      </Link>

      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products ㅣ</Link>
        {user && (
          <Link to='/carts'>
            <CartStatus />     
          </Link>
        )}
        <div>  ㅣ </div>
        {user && user.isAdmin && (
          <Link to='/products/new' className='text-2xl'>
            <BsFillPencilFill /> 
          </Link>
        )}

         {/* login form */}
         {!user && (
          <Link to ='/login'> 
            login(axios) ㅣ
            </Link>
          )}

          <Link to = '/signup'>
            Sign up ㅣ
          </Link>


        {user && <User user={user} />}
        {!user && <Button text={'GoogleLogin'} onClick={login} />}
        {user && <Button text={'Logout'} onClick={logout} />}
        
       

      </nav>
    </header>
  );
}
