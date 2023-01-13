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
    margin-top : 1.3rem;
  }
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
  font-size: 30px;
  color : #252525;
  margin: 35px;

`
const LabelledInput = ({label, ...rest}) =>(
  <Wrapper>
    <Label>{label}</Label>
    <InputForm {...rest} />
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
    background-color: #252525;
    color : white;
    border-style: none;
    border-radius: 30px;
    &:hover{
        background-color: #666666e0;
        cursor : pointer;
    }
`
const Container = styled.div`
  display: inline-block;
`
const ShowError = styled.label`
  color : red;
  
`

function SignUp() {
  const [idChecked,setIdChecked] = useState(false);
  const [username, setUserName] = useState("");
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setUserAddress] = useState("");

  const onUserNameHandler = (event) => {
    setUserName(event.currentTarget.value);
  }
  const onNickNameHandler = (event) => {
    setNickName(event.currentTarget.value);
  }
  const onPwHandler = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onTelephoneHandler = (event) => {
    setTelephone(event.currentTarget.value);
  }
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }
  const onAddressHandler = (event) => {
    setUserAddress(event.currentTarget.value);
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

    let body = JSON.stringify(
      {
        'username': username,
        'nickname': nickname,
        'password': password,
        'e_mail':email,
        'telephone': telephone,
        'address': address
      }
    )
    if(idChecked)
    PostSignUp(body);
  }

  return (
      <RegisterForm>
        <SingUpLabel>회원가입</SingUpLabel>
        <LabelledInput
          label="아이디"
          type="text"
          minlength="4"
          value={username}
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
          value={password}
          onChange={onPwHandler}
          placeholder="비밀번호 (8~12자)"
          type="password"
        />

          <LabelledInput label="전화번호" value={telephone} onChange={onTelephoneHandler} placeholder="전화번호 (ex.01023456789)"></LabelledInput >
          <LabelledInput label="이메일" value={email} onChange={onEmailHandler} placeholder="이메일 (welcome@example.com)"></LabelledInput >
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
