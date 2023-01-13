import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { PostSignUp } from "../api/api";
const tmpUrl = "http://3.38.35.43:8080";
const RegisterContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: left;
    background-color: #dadada;
    width : 100%;
    height : 100vh;
    margin : 30px 20px 20px 30px;
    position: relative;
    z-index: 1;
`
const RegisterForm = styled.form`
    grid-template-columns: 300px 300px;
    grid-template-rows: 60px 60px 60px 60px;

    align-self: center;
    align-items: center;
    margin : 10px;
    padding : 10px;
    display: flex;
    height : 900px;
    width : flex;
    flex-direction: column;
    background-color: white;
    position: relative;
    z-index: 2;
    font-family: "RalewayBold";
`
const Wrapper =  styled.div`
  &+&{
    margin-top : 1rem;
  }
`
const ShowError = styled.div`
  color : red;
  font-size : 7px;
  margin : 3px 0 0 10px;
`
const InputForm = styled.input`
    border-style: 1px dotted;
    height : 50px;
    width: 400px;
    font-family: "RalewayLight";
    font-size: 17px;
    margin-top: 10px;
    padding-left : 20px;
    border-radius: 30px;
`
const Label = styled.div`
  margin-left: 8px;
  font-size : 1rem;
  color : #252525;
  left : rem;
`
const SingUpLabel = styled.label`
  font-size: 25px;
  color : #252525;
  margin: 15px 10px 10px 10px;
`
const LabelledInput = ({label,msg, ...rest}) =>(
  <Wrapper>
    <Label>{label}</Label>
    <InputForm {...rest} />
    <ShowError>{msg}</ShowError>
  </Wrapper>
)


//비밀번호폼변경
const PassWordForm = styled.input`
    border-style: none;
    height : 40px;
    font-family: "RalewayLight";
    font-size: 17px;
    margin-top: 10px;
    padding-left : 10px;
`
const CheckIdButton = styled.button`
    height: 40px;
    font-family: "RalewayLight";
    font-size: 17px;
    margin-top: 10px;
    background-color: #252525;
    color : white;
    border-style: none;
    &:hover{
        background-color: #666666e0;
        cursor : pointer;
    };
`
const JoinButton = styled.button`
    height: 50px;
    width : 170px;
    align-self: center;
    font-family: "RalewayLight";
    font-size: 17px;
    margin-top: 30px;
    background-color: black;
    color : white;
    border-style: none;
    border-radius: 30px;
    &:hover{
        background-color: #666666e0;
        cursor : pointer;
    }
    
`

function SignUp() {
  const [idChecked,setIdChecked] = useState(false);
  const [username, setUserName] = useState("");
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

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

  const onUserNameHandler = (event) => {
    const currentId = event.currentTarget.value;
    setUserName(currentId);
    const idRegExp = /^[a-z0-9]{4,12}$/;
    if(!idRegExp.test(currentId)){
      setIdMsg("아이디를 4자 이상 12자 이하로 입력해주세요")
    }else{
      setIdMsg("");
      setIsId(true);
    }
  }
  const onNickNameHandler = (event) => {
    const currentNickName = event.currentTarget.value;
    setNickName(currentNickName);
    if (nickname.length===0){
      setNickName("닉네임은 공백일 수 없습니다")
    }else{
      setNicknameMsg("");
      setIsNickname(true);
    }
  }
  const onPwHandler = (event) => {
    const currentPw = event.currentTarget.value
    setPassword(currentPw);
    const pwRegExp = /^[a-z0-9]{8,12}$/;
    if(!pwRegExp.test(currentPw)){
      setPwMsg("비밀번호를 8자 이상 12자 이하로 입력해주세요")
    }else{
      setPwMsg("");
      setIsPw(true);
    }
  }
  const onTelephoneHandler = (event) => {
    const currentPhone = event.currentTarget.value
    setTelephone(currentPhone);
    const phoneRegExp = /^[0-9]{8,13}$/;
    if (!phoneRegExp.test(currentPhone)) {
      setPhoneMsg("올바르지 않은 전화번호입니다")
    } else {
      setPhoneMsg("");
      setIsPhone(true);
    }
  }
  const onEmailHandler = (event) => {
    const currentEmail = event.currentTarget.value
    setEmail(currentEmail);
    const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$/;
    if (!emailRegExp.test(currentEmail)) {
      setEmailMsg("이메일 형식(welcome@example.com)에 맞게 입력해주세요")
    } else {
      setEmailMsg("");
      setIsEmail(true);
    }
  }
  const onAddressHandler = (event) => {
    const currentAddress = event.currentTarget.value;
    setAddress(currentAddress);
    if (nickname.length===0){
      setNicknameMsg("주소는 공백일 수 없습니다")
    }else{
      setNicknameMsg("");
      setIsNickname(true);
    }
  }
  //중복체크
  const onCheckIdHandler = async (event) => {
    event.preventDefault();
    axios
      .get(tmpUrl + "/check_id/" + username)
      .then((response) => {
        setIdChecked(true);
        console.log(response.data)
      })
      .catch((error) => {
        console.log("error!")
        console.log(error)
        setIdChecked(false)
        alert("이미 사용중인 아이디입니다")
      });
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if(isId&&isPw&&isPhone&&isNickname&&isPhone&&isEmail){
      let body = JSON.stringify(
        {
          'username': username,
          'nickname': nickname,
          'password': password,
          'telephone': telephone,
          'e_mail': email,
          'address': address
        }
      )
      PostSignUp(body);
    }
    else{
      alert("정보가 올바르게 입력되지 않았습니다.")
    }
    
    
  }

  return (
      <RegisterForm>
        <SingUpLabel>회원가입</SingUpLabel>
        <LabelledInput
          label="아이디"
          msg={msgId}
          type="text"
          minlength="4"
          onChange={onUserNameHandler}
          placeholder="아이디를 입력해주세요 (4~12자) "
        />
        {/* <CheckIdButton
          onClick={onCheckIdHandler}>
          중복체크
        </CheckIdButton> */}
        <LabelledInput
          label="닉네임"
          onChange={onNickNameHandler}
          placeholder="닉네임"
        />
        <LabelledInput
          label="비밀번호"
          msg ={msgPw}
          onChange={onPwHandler}
          placeholder="비밀번호 (8~12자)"
          type="password"
        />
          <LabelledInput
            label="전화번호"
            msg ={msgPhone}
            onChange={onTelephoneHandler}
            placeholder="전화번호 (ex.01023456789)"></LabelledInput >
          <LabelledInput label="이메일" msg = {msgEmail} value={email} onChange={onEmailHandler} placeholder="이메일 (welcome@example.com)"></LabelledInput >
          <LabelledInput label="주소" value={address} onChange={onAddressHandler} placeholder="주소"></LabelledInput >
        {/* <InputForm
          type = "text"
          minlength= "4"
          value={username}
          onChange={onUserNameHandler}
          placeholder="아이디">
        </InputForm> */}

        {/* <InputForm 
         value={nickname}
         onChange={onNickNameHandler
        }
         placeholder="닉네임">

        </InputForm> */}

        {/* <PassWordForm
          value={password}
          onChange={onPwHandler}
          placeholder="비밀번호"
          type="password">
        </PassWordForm> */}
        

        {/* <InputForm value={telephone} onChange={onTelephoneHandler} placeholder="전화번호"></InputForm>
        <InputForm value={email} onChange={onEmailHandler} placeholder="이메일"></InputForm>
        <InputForm value={address} onChange={onAddressHandler} placeholder="주소"></InputForm> */}
        <JoinButton onClick={onSubmitHandler}>회원가입</JoinButton>
      </RegisterForm>
  )
}

export default SignUp;
