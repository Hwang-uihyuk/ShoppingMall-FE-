import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const test = "secondtest";

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
    margin : 50px 0 0 50px;
    padding : 10px;
    display: flex;
    height : 600px;
    width : 300px;
    flex-direction: column;
    background-color: #c4c4c4;
    position: relative;
    z-index: 2;
    font-family: "RalewayBold";
`
const InputForm = styled.input`
    border-style: none;
    height : 40px;
    font-family: "RalewayLight";
    font-size: 17px;
    margin-top: 10px;
    padding-left : 10px;
`
const JoinButton = styled.button`
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
    }
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
function SignUp() {
  const [username, setUserName] = useState("");
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setUserAddress] = useState("");

  const [isChecked, setIsChecked] = useState(false);
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
  const onCheckIdHandler = async (event) => {
    event.preventDefault();
    await axios
      .get(tmpUrl+"/check_id/"+username)
      .then((response) => {
        setIsChecked(true);
        console.log(response.data)
      })
      .catch((error) => {
        console.log("error!")
        console.log(error)
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
    const joinConfig = {
      headers:{
        "Content-Type" : "application/json"
      }
    };
    console.log(body);
    axios
      .post(tmpUrl+"/join",body,joinConfig)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error)
      });
  }
  return (
    <RegisterContainer>
      <RegisterForm>
        <label >JOIN</label>
        <InputForm value={username} onChange={onUserNameHandler} placeholder="아이디"></InputForm>
        <CheckIdButton onClick={onCheckIdHandler}>중복체크</CheckIdButton>
        <InputForm value={nickname} onChange={onNickNameHandler} placeholder="닉네임"></InputForm>
        <InputForm value={password} onChange={onPwHandler} placeholder="비밀번호"></InputForm>
        <InputForm value={telephone} onChange={onTelephoneHandler} placeholder="전화번호"></InputForm>
        <InputForm value={email} onChange={onEmailHandler} placeholder="이메일"></InputForm>
        <InputForm value={address} onChange={onAddressHandler} placeholder="주소"></InputForm>
        <JoinButton onClick={onSubmitHandler}>회원가입</JoinButton>
      </RegisterForm>
    </RegisterContainer>
  )
}

export default SignUp;