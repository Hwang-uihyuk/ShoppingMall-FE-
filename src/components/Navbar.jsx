import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { AiFillShop } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import Button from './ui/Button';
import { useAxiosAuthContext } from './context/UserStateContext';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';

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
  @media screen and (min-width: 768px) {
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
      <NavLink to='/' className='flex items-center text-4xl pl-3'
        onClick={(e) => {
          if (window.location.pathname === '/') {
            e.preventDefault();
            window.location.reload();
          }
        }}>
        {/* <AiFillShop /> */}
        <h1 className='justify-center'>SHOPPY</h1>
      </NavLink>
      <div className="hidden md:block align-center">
        <nav className='flex justift-center items-center gap-4 font-semibold pr-6'>
          <NavLink to='/products'
            onClick={(e) => {
              if (window.location.pathname === '/products') {
                e.preventDefault();
                window.location.reload();
              }
            }}>PRODUCTS </NavLink>

          {/* Logged in */}
          {window.localStorage.getItem('Login') && (
            <>
              <NavLink to='/carts' onClick={(e) => {
                if (window.location.pathname === '/carts') {
                  e.preventDefault();
                  window.location.reload();
                }
              }}>CART</NavLink>
              <button onClick={() => {
                window.localStorage.removeItem('Login')
                document.location.href = '/'
              }}>LOGOUT </button>
              <NavLink to='mypage' 
                onClick={(e) => {
                  if (window.location.pathname === '/mypage') {
                    e.preventDefault();
                    window.location.reload();
                  }
                }}> MYPAGE</NavLink>
            </>
          )}

          {/* admin */}
          {user && user.isAdmin && (
            <NavLink to='/products/new' className='text-2xl'
              onClick={(e) => {
                if (window.location.pathname === '/products/new') {
                  e.preventDefault();
                  window.location.reload();
                }
              }}>
              <BsFillPencilFill />
              hi
            </NavLink>
          )}

          {/* Not logged in    */}
          {!window.localStorage.getItem('Login') && (
            <>
              <NavLink to='/login'
                onClick={(e) => {
                  if (window.location.pathname === '/login') {
                    e.preventDefault();
                    window.location.reload();
                  }
                }}>LOGIN</NavLink>
              <NavLink to='/signup'
                onClick={(e) => {
                  if (window.location.pathname === '/signup') {
                    e.preventDefault();
                    window.location.reload();
                  }
                }}>SIGNUP </NavLink>
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
