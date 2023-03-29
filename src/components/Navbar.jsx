import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import Button from './ui/Button';
import { useAxiosAuthContext } from './context/UserStateContext';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import { GetUserInfo } from '../api/api';

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
  border-radius: 30px;
  border : none;
  display: flex;
  align-items: center;
  height : 40px;
  width : 40px;
  padding : 10px;
  &:hover{
    background-color: #b0b0b0;
  }
`
const AccountContainer = styled.div`
  border-radius : 30px;
  display : flex;
  width : 100%;
  align-items: center;
  font-size: 15px;
  padding-right :10px;
  &:hover{
    background-color: #b0b0b0;
    cursor : pointer;
  }
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
  const [nickname, setNickname] = useState("");

  if(window.localStorage.getItem('Login')) GetUserInfo().then((res)=>{setNickname(res.data.nickname)})

  return (
    <header className='text-sm flex justify-between border-b border-none p-4 pt-3 sticky top-0 bg-white z-10 shadow-none opacity-80 absolute'>
      {/* SHOPPY */}
      <NavLink to='/' className='flex items-center text-4xl pl-3'
        onClick={(e) => {
          if (window.location.pathname === '/') {
            e.preventDefault();
            window.location.reload();}}}>
        <h1 className='justify-center'>SHOPPY</h1>
      </NavLink>
      
      {/* Navbar Menu */}
      <div className="hidden md:block align-center">
        <nav className='flex justift-center items-center gap-4 font-semibold pr-6'>
          <NavLink to='/products'
            onClick={(e) => {
              if (window.location.pathname === '/products') {
                e.preventDefault();
                window.location.reload();}}}>
            <ImageContainer>
              <img src="/images/products_nav.png" />
            </ImageContainer>
          </NavLink>

          {/* Logged in */}
          {window.localStorage.getItem('Login')&&(
            <>
             <NavLink to={window.localStorage.getItem('Login') ? "/mypage" : "/login"}
                onClick={(e) => {
                  if (window.location.pathname === '/mypage') {
                    e.preventDefault();
                    window.location.reload();
                  }
                }}>
                <AccountContainer>
                  <ImageContainer>
                    <img src="/images/account_nav.png" />
                  </ImageContainer>
                  Welcome {nickname}!
                </AccountContainer>
              </NavLink>
              <NavLink to={window.localStorage.getItem('Login') ? "/carts" : "/login"}
                onClick={(e) => {
                  window.localStorage.getItem('Login')
                  if (window.location.pathname === '/carts') {
                    e.preventDefault();
                    window.location.reload();
                  }
                }}>
                <ImageContainer>
                  <img src="/images/cart_nav.png" />
                </ImageContainer>
              </NavLink>
              <NavLink to ="/"
                onClick={()=>{
                  window.localStorage.removeItem('Login')
                  document.location.href = '/'}}>
                <ImageContainer>
                  <img src="/images/logout_nav.png" />
                </ImageContainer>
              </NavLink>
             
            </>
          )}

          {/* admin */}
          {user && user.isAdmin && (
            <NavLink to='/products/new' className='text-2xl'
              onClick={(e) => {
                if (window.location.pathname === '/products/new') {
                  e.preventDefault();
                  window.location.reload();
                }}}>
              <BsFillPencilFill />
            </NavLink>)}

          {/* Not logged in*/}
          {!window.localStorage.getItem('Login') && (
            <>
              <NavLink to='/login'
                onClick={(e) => {
                  if (window.location.pathname === '/login') {
                    e.preventDefault();
                    window.location.reload();}
                }}>
                  <AccountContainer>
                  <ImageContainer>
                  <img src = "/images/account_nav.png"></img>
                  </ImageContainer>Login or Signup
                  </AccountContainer>
              </NavLink>
              <NavLink to={window.localStorage.getItem('Login') ? "/carts" : "/login"}
                onClick={(e) => {
                  window.localStorage.getItem('Login')
                  if (window.location.pathname === '/carts') {
                    e.preventDefault();
                    window.location.reload();
                  }
                }}>
                <ImageContainer>
                  <img src="/images/cart_nav.png" />
                </ImageContainer>
              </NavLink>

              {/* <NavLink to='/signup'
                onClick={(e) => {
                  if (window.location.pathname === '/signup') {
                    e.preventDefault();
                    window.location.reload();
                  }
                }}>SIGNUP </NavLink> */}
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
