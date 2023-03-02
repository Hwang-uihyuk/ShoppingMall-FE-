import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { AiFillShop } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import Button from './ui/Button';
import { useAxiosAuthContext } from './context/UserStateContext';

export default function Navbar() {
  const { user, logout } = useAxiosAuthContext();
  return (
    <header className='flex justify-between border-b border-none p-4 pt-3 sticky top-0 bg-white z-10 shadow-none'>
      <Link to='/' className='flex items-center text-4xl pl-3'>
        {/* <AiFillShop /> */}
        <h1 className = 'justify-center'>SHOPPY</h1>
      </Link>

      <nav className='flex items-center gap-4 font-semibold pr-6'>
        <Link to='/products'>PRODUCTS </Link>
        {window.localStorage.getItem('Login') && (
          <Link to='/carts'>
            CART     
          </Link>
        )}
        
        {user && user.isAdmin && (
          <Link to='/products/new' className='text-2xl'>
            <BsFillPencilFill /> 
          </Link>
        )}
        
         {/* login form */}
        {/* login form */} 
          
        {!window.localStorage.getItem('Login') && (
          <Link to ='/login'> 
            LOGIN
            </Link>
          )}

          {window.localStorage.getItem('Login') && 
          <button onClick ={()=>{window.localStorage.removeItem('Login')
          document.location.href = '/'}
  
          }> LOGOUT </button>}

          {window.localStorage.getItem('Login') && (
            <Link to = 'mypage'> MYPAGE</Link>
          )}
          

        {!window.localStorage.getItem('Login') &&<Link to='/signup'>SIGNUP </Link>}  

        {user && <User user={user} />}
        {/* {!user && <Button text={'Login(axios)'} onClick={login} />} */}
        {user && <Button text={'Logout'} onClick={logout} />}
        {user && <Link to="/edituser"> 회원정보수정 </Link>}

      </nav>
    </header>
  );
}
