import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { AiFillShop } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import Button from './ui/Button';
import { useAxiosAuthContext } from './context/UserStateContext';
import CartStatus from './CartStatus';

export default function Navbar() {
  const { user, logout } = useAxiosAuthContext();
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
        
        {user && user.isAdmin && (
          <Link to='/products/new' className='text-2xl'>
            <BsFillPencilFill /> 
          </Link>
        )}
        
         {/* login form */}
         {!user && (
          <Link to ='/login'> 
            login(axios) 
            </Link>
          )}

          <Link to = '/signup'>
            Sign up ㅣ
          </Link>

        {user && <User user={user} />}
        {/* {!user && <Button text={'Login(axios)'} onClick={login} />} */}
        {user && <Button text={'Logout'} onClick={logout} />}
        {user && <Link to="/edituser"> 회원정보수정 </Link>}

      </nav>
    </header>
  );
}
