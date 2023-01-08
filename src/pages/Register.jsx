import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const tmpUrl = "https://93fc44b8-c8a6-4b5a-b75d-6d2206f5f941.mock.pstmn.io";
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
function Register() {
    const [id, setID] = useState("");
    const [username, setUserName] = useState("");
    const [nickName, setNickName] = useState("");
    const [pw, setPw] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setUserAddress] = useState("");

    const [isIdChecked, setIsIdChecked] = useState("false")

    const onIDHandler = (event) => {
        setID(event.currentTarget.value);
    }
    const onUserNameHandler = (event) => {
        setUserName(event.currentTarget.value);
    }
    const onNickNameHandler = (event) => {
        setNickName(event.currentTarget.value);
    }
    const onPwHandler = (event) => {
        setPw(event.currentTarget.value);
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
        let param = {
            id: id,
        }
        await axios
            .get(tmpUrl + "/check_id", param)
            .then((response) => {
                setIsIdChecked(response.data)
            })
            .catch((error) => {
                console.log("error!")
                console.log(error)
            });
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        let body = {
            id: id,
            username: username,
            nickName: nickName,
            pw: pw,
            telephone: telephone,
            address: address,
            idCheck: isIdChecked
        }
        console.log(body);
        await axios
            .post(tmpUrl + "/join", body)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log("error!")
                console.log(error)
            });
    }
    return (
        <RegisterContainer>
            <RegisterForm>
                <label >JOIN</label>
                <InputForm value={id} onChange={onIDHandler} placeholder="아이디"></InputForm>
                <CheckIdButton onClick={onCheckIdHandler}>중복체크</CheckIdButton>
                <InputForm value={username} onChange={onUserNameHandler} placeholder="이름"></InputForm>
                <InputForm value={nickName} onChange={onNickNameHandler} placeholder="닉네임"></InputForm>
                <InputForm value={pw} onChange={onPwHandler} placeholder="비밀번호"></InputForm>
                <InputForm value={telephone} onChange={onTelephoneHandler} placeholder="전화번호"></InputForm>
                {/* <InputForm value ={pw} onChange={}placeholder="비밀번호 확인"></InputForm> */}
                <InputForm value={email} onChange={onEmailHandler} placeholder="이메일"></InputForm>
                <InputForm value={address} onChange={onAddressHandler} placeholder="주소"></InputForm>
                {/* <InputForm value ={address} onChange={}placeholder="상세주소"></InputForm> */}
                <JoinButton onClick={onSubmitHandler}>회원가입</JoinButton>
            </RegisterForm>
        </RegisterContainer>
    )
}

export default Register;