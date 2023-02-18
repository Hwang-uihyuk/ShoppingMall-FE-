import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { PostSignUp } from "../api/api";
const baseURL = process.env.REACT_APP_URL;
const RegisterForm = styled.form`
    grid-template-columns: 300px 300px;
    grid-template-rows: 60px 60px 60px 60px;
    align-self: center;
    align-items: center;
    margin : 10px;
    padding : 10px;
    display: flex;
    height : 1000px;
    width : flex;
    flex-direction: column;
    background-color: white;
    position: relative;
    z-index: 2;
    font-family: "RalewayBold";
`
const Wrapper =  styled.div`
  margin-top : 20px;
  background-color: white;
  width : 600px
`
const InputWrapper = styled.div`
  display : flex;
`
const IdWrapper = styled.div`
  justify-content: left;
`
const ShowMsg = styled.div`
  color : ${props => (props.isValidated ? 'green' : 'red')};
  font-size : 8px;
  margin : 3px 0 0 10px;
`
const InputForm = styled.input`
    border-style: 1px dotted;
    height : 50px;
    width: 600px;
    font-family: "RalewayLight";
    font-size: 17px;
    margin-top: 10px;
    padding-left : 20px;
    border-radius: 30px;
    /* border-color : ${props => (props.isValidated ? 'white' : '#252525')};
    box-shadow : ${props => (props.isValidated ? '0 0 5px blue':null) }; */
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
const LabelledInput = ({label,msg,handler,isValidated,...rest}) =>(
  <Wrapper>
    <Label>{label}</Label>
      <InputWrapper>
        <InputForm {...rest} />
        {label === "아이디" && <CheckIdButton onClick={handler}>중복확인</CheckIdButton>}
      </InputWrapper>
    <ShowMsg isValidated={isValidated}>{msg}</ShowMsg>
  </Wrapper>
)

const CheckIdButton = styled.button`
    height: 50px;
    width : 180px;
    margin-left: 10px;
    font-family: "RalewayLight";
    font-size: 17px;
    margin-top: 10px;
    background-color: #252525;
    color : white;
    border-style: none;
    border-radius: 30px;
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
      setPhoneMsg("사용 가능한 전화번호입니다");
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
      setEmailMsg("사용 가능한 이메일입니다");
      setIsEmail(true);
    }
  }
  const onAddressHandler = (event) => {
    const currentAddress = event.currentTarget.value;
    setAddress(currentAddress);
    if (currentAddress.length===0){
      setAddressMsg("주소는 공백일 수 없습니다");
      setIsAddress(false)
    }else{
      setAddressMsg("사용 가능한 주소입니다");
      setIsAddress(true);
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
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if(isId&&isPw&&isPhone&&isNickname&&isAddress&&isEmail&&idChecked){
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
      if(!idChecked){
        alert("아이디 중복확인을 해주세요")
      }else{
        alert("정보가 올바르게 입력되지 않았습니다.")
      }

    }
  }

  return (
      <RegisterForm>
        <SingUpLabel>회원가입</SingUpLabel>
        <IdWrapper>
          <LabelledInput
          label="아이디"
          msg={msgId}
          minlength="4"
          disabled={idChecked}
          handler={onCheckIdHandler}
          onChange={onUserNameHandler}
          placeholder="아이디를 입력해주세요 (4~12자) "
            isValidated={isId}/>
        </IdWrapper>

        <LabelledInput
          label="닉네임"
          msg ={msgNickname}
          onChange={onNickNameHandler}
          placeholder="닉네임"
          isValidated={isNickname}/>

        <LabelledInput
          label="비밀번호"
          msg ={msgPw}
          onChange={onPwHandler}
          placeholder="비밀번호 (8~12자)"
          type="password"
          isValidated={isPw}/>

        <LabelledInput
          label="전화번호"
          msg ={msgPhone}
          onChange={onTelephoneHandler}
          placeholder="전화번호 (ex.01023456789)"
          isValidated={isPhone}/>

        <LabelledInput
          label="이메일"
          msg = {msgEmail}
          value={email}
          onChange={onEmailHandler}
          placeholder="이메일 (welcome@example.com)"
          isValidated={isEmail}/>

        <LabelledInput
          label="주소"
          msg ={msgAddress}
          value={address}
          onChange={onAddressHandler}
          placeholder="주소"
          isValidated={isAddress}/>

        <JoinButton onClick={onSubmitHandler}>회원가입</JoinButton>

      </RegisterForm>
  )
}

export default SignUp;
