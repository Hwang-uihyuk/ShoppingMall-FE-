import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { AiFillShop } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import Button from './ui/Button';
import { useAxiosAuthContext } from './context/UserStateContext';
import styled from "styled-components";

const DropBtn = styled.button`
  display: flex;
  align-items: center;
  gap : 10px;
  background-color: transparent;
  border : 0;
  cursor: pointer;
  font-size : 18px;
  &:hover{
    opacity: 0.5;
  }
  @media screen and (min-width: 720px) {
    display: none;
  }
`
const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  height : 60px;
  width : 60px;
  padding : 10px;
`
const DropImgBtn =()=>(
  <DropBtn>
    <ImageContainer>
      <img src="/images/hamburger.png"></img>
    </ImageContainer>
  </DropBtn>
)
export default function Navbar() {
  const { user, logout } = useAxiosAuthContext();
  return (
    <header className='text-sm flex justify-between border-b border-none p-4 pt-3 sticky top-0 bg-white z-10 shadow-none opacity-80 absolute'>
      <Link to='/' className='flex items-center text-4xl pl-3'>
        {/* <AiFillShop /> */}
        <h1 className = 'justify-center'>SHOPPY</h1>
      </Link>
      <div className="hidden md:block">
        <nav className='flex items-center gap-4 font-semibold pr-6'>
          <Link to='/products'>PRODUCTS </Link>

          {/* Logged in */}
          {window.localStorage.getItem('Login') && (
            <>
              <Link to='/carts'>CART</Link>
              <button onClick={() => {
                window.localStorage.removeItem('Login')
                document.location.href = '/'
              }}>LOGOUT </button>
              <Link to='mypage'> MYPAGE</Link>
            </>
          )}

          {/* admin */}
          {user && user.isAdmin && (
            <Link to='/products/new' className='text-2xl'>
              <BsFillPencilFill />
              hi
            </Link>
          )}

          {/* Not logged in    */}
          {!window.localStorage.getItem('Login') && (
            <>
              <Link to='/login'>LOGIN</Link>
              <Link to='/signup'>SIGNUP </Link>
            </>
          )}
          {user && (
            <>
              <User user={user} />
              <Button text={'Logout'} onClick={logout} />
              <Link to="/edituser"> 회원정보수정 </Link>
            </>)
          }
        </nav>
      </div>
      <DropImgBtn></DropImgBtn>
    </header>
  );
}
