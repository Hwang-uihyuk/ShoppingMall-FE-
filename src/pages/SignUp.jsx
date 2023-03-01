import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { PostSignUp } from "../api/api";
import PostPopUp from "../components/PostPopUp";
import * as S from '../styles/SignUpStyles';
const baseURL = process.env.REACT_APP_URL;

const LabelledInput = ({label,msg,handler,isValidated,...rest}) =>(
  <S.Wrapper>
    <S.Label>{label}</S.Label>
      <S.InputWrapper>
        <S.InputForm {...rest} />
        {label === "ID" && <S.CheckButton onClick={handler}>중복확인</S.CheckButton>}
        {label ==="Address" && <S.CheckButton onClick={handler}>주소 검색</S.CheckButton>}
        {label ==="Telephone" && <S.CheckButton onClick={handler}>번호 확인</S.CheckButton>}
        {label ==="Email" && <S.CheckButton onClick={handler}>메일 확인</S.CheckButton>}
      </S.InputWrapper>
    <S.ShowMsg isValidated={isValidated}>{msg}</S.ShowMsg>
  </S.Wrapper>
)

const PopUpContainer = styled.div`
  display: flex;
  justify-content: center;

`
function SignUp() {
  const [idChecked,setIdChecked] = useState(false);
  const [phoneChecked,setPhoneChecked] = useState(false);
  const [emailChecked,setEmailChecked] = useState(false);

  const [username, setUserName] = useState("");
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [addressDetail,setAddressDetail] = useState("")
  const [address, setAddress] = useState("");
  const [addressFull,setAddressFull] = useState("");

  const [msgId,setIdMsg] = useState("");
  const [msgNickname,setNicknameMsg] = useState("");
  const [msgPw,setPwMsg] = useState("");
  const [msgPhone,setPhoneMsg] = useState("");
  const [msgEmail,setEmailMsg] = useState("");
  const [msgAddress,setAddressMsg] = useState("");  

  const [isId,setIsId] = useState(false);  
  const [isNickname,setIsNickname] = useState(false);
  const [isPw,setIsPw] = useState(false);
  const [isPhone,setIsPhone] = useState(false);
  const [isEmail,setIsEmail] = useState(false);
  const [isAddress,setIsAddress] = useState(false);
  const [popup, setPopup] = useState(false);

  const onUserNameHandler = (event) => {
    const currentId = event.currentTarget.value;
    setUserName(currentId);
    const idRegExp = /^[a-z0-9]{4,12}$/;
    if(!idRegExp.test(currentId)){
      setIdMsg("아이디를 4자 이상 12자 이하로 입력해주세요")
      setIsId(false);
    }else{
      setIdMsg("아이디 중복 확인을 해주세요");
    }
  }
  const onNickNameHandler = (event) => {
    const currentNickName = event.currentTarget.value;
    setNickName(currentNickName);
    if (currentNickName.length===0){
      setNicknameMsg("닉네임은 공백일 수 없습니다")
      setIsNickname(false);
    }else{
      setNicknameMsg("사용 가능한 닉네임 입니다");
      setIsNickname(true);
    }
  }
  const onPwHandler = (event) => {
    const currentPw = event.currentTarget.value
    setPassword(currentPw);
    const pwRegExp = /^[a-z0-9]{8,12}$/;
    if(!pwRegExp.test(currentPw)){
      setPwMsg("비밀번호를 8자 이상 12자 이하로 입력해주세요")
      setIsPw(false)
    }else{
      setPwMsg("사용 가능한 비밀번호 입니다");
      setIsPw(true);
    }
  }
  const onTelephoneHandler = (event) => {
    const currentPhone = event.currentTarget.value
    setTelephone(currentPhone);
    const phoneRegExp = /^[0-9]{8,13}$/;
    if (!phoneRegExp.test(currentPhone)) {
      setPhoneMsg("올바르지 않은 전화번호입니다");
      setIsPhone(false);
    } else {
      setPhoneMsg("전화번호 중복확인을 해주세요. ");
      setIsPhone(true);
    }
  }
  const onEmailHandler = (event) => {
    const currentEmail = event.currentTarget.value
    setEmail(currentEmail);
    const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$/;
    if (!emailRegExp.test(currentEmail)) {
      setEmailMsg("이메일 형식(welcome@example.com)에 맞게 입력해주세요");
      setIsEmail(false);
    } else {
      setEmailMsg("이메일 확인을 해주세요.");
    }
  }
  const onAddressHandler = (event) => {
    const currentAddress = event.currentTarget.value;
    setAddress(currentAddress);
    setPopup(false);
    setAddressFull(`${address} ${addressDetail}`)
    if (currentAddress.length===0){
      setAddressMsg("주소는 공백일 수 없습니다");
      setIsAddress(false)
    }else{
      setAddressMsg("사용 가능한 주소입니다");
    }
  }

  const onAddressDetailHandler = (event) => {
    const currentAddressDetail = event.currentTarget.value;
    setAddressDetail(currentAddressDetail);
    setAddressFull(`${address} ${addressDetail}`)
    console.log(addressFull);
    if (currentAddressDetail.length===0){
      setAddressMsg("상세 주소를 입력해주세요");
      setIsAddress(false)
    }else{
      setAddressMsg("사용 가능한 주소입니다");
      setIsAddress(true)
    }
  }
  //중복체크
  const onCheckIdHandler = async (event) => {
    event.preventDefault();
    axios
      .get(`${baseURL}/check_id/${username}`)
      .then((response) => {
        setIdChecked(true);
        setIsId(true);
        setIdMsg("사용 가능한 아이디입니다")
        console.log(response.data)
      })
      .catch((error) => {
        console.log("error!")
        console.log(error)
        setIdChecked(false)
        alert("이미 사용중인 아이디입니다")
      });
  }

  const onCheckPhoneHandler = async (event) => {
    event.preventDefault();
    axios
      .get(`${baseURL}/check_telephone/${telephone}`)
      .then((response) => {
        setPhoneChecked(true);
        setIsPhone(true);
        setPhoneMsg("사용 가능한 번호입니다.")
        console.log(response.data)
      })
      .catch((error) => {
        console.log("error!")
        console.log(error)
        setPhoneChecked(false);
        setIsPhone(false);
        alert("사용중인 번호입니다.")
      });
  }

  const onCheckEmailHandler = async (event) => {
    event.preventDefault();
    axios
      .get(`${baseURL}/check_email/${email}`)
      .then((response) => {
        setEmailChecked(true);
        setIsEmail(true);
        setEmailMsg("사용 가능한 메일입니다.")
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
        setEmailChecked(false);
        setIsEmail(false);
        setEmailMsg("사용 중인 메일입니다.")
      });
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(isId, isPw, isPhone,isNickname,isAddress,isEmail,idChecked)
    if(isId&&isPw&&isPhone&&isNickname&&isAddress&&isEmail&&idChecked){
      let body = JSON.stringify(
        {
          'username': username,
          'nickname': nickname,
          'password': password,
          'telephone': telephone,
          'email': email,
          'address': address
        }
      )
      PostSignUp(body);
    }
    else{
      if(!idChecked){
        alert("아이디 중복확인을 해주세요")
      }else{
        alert("정보가 올바르게 입력되지 않았습니다.")
      }

    }
  }

  const PopUpToggle = (e) =>{
    e.preventDefault();
    setPopup(!popup);
  }

  return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
      <S.RegisterForm
        popup = {popup}>
          
        <S.SignUpLabel>Sign Up</S.SignUpLabel>
        
        <LabelledInput
          label="ID"
          msg={msgId}
          minlength="4"
          disabled={idChecked}
          handler={onCheckIdHandler}
          onChange={onUserNameHandler}
          placeholder="아이디를 입력해주세요 (4~12자) "
          isValidated={isId}/>

        <LabelledInput
          label="Nickname"
          msg ={msgNickname}
          onChange={onNickNameHandler}
          placeholder="닉네임"
          isValidated={isNickname}/>

        <LabelledInput
          label="Password"
          msg ={msgPw}
          onChange={onPwHandler}
          placeholder="비밀번호 (8~12자)"
          type="password"
          isValidated={isPw}/>

        <LabelledInput
          msg={msgPhone}
          label="Telephone"
          disabled={phoneChecked}
          onChange={onTelephoneHandler}
          handler={onCheckPhoneHandler}
          placeholder="전화번호 (ex.01023456789) "
          isValidated={phoneChecked} />

        <LabelledInput
          msg={msgEmail}
          value={email}
          label="Email"
          disabled={emailChecked}
          onChange={onEmailHandler}
          handler={onCheckEmailHandler}
          placeholder="이메일 (welcome@example.com) "
          isValidated={emailChecked}/>

        <LabelledInput
          value={address}
          label="Address"
          disabled={!popup}
          onChange={onAddressHandler}
          handler={PopUpToggle}
          placeholder="주소를 검색해주세요 "/>

        <LabelledInput
          value={addressDetail}
          onChange={onAddressDetailHandler}
          placeholder="상세주소"
          isValidated={isAddress}/>

        <S.JoinButton onClick={onSubmitHandler}>회원가입</S.JoinButton>
      </S.RegisterForm>
        {popup&&
          <>
            <PopUpContainer>
              <S.CloseBtn onClick={PopUpToggle}>CLOSE</S.CloseBtn>
              <PostPopUp address={address} setAddress={setAddress} setPopup={setPopup}></PostPopUp>
            </PopUpContainer>
          </>
        }
        </div>
        </section>
      </>
  )
}

export default SignUp;
