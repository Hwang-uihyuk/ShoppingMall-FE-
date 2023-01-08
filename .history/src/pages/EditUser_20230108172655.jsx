import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

export default function EditUser() {
    const [nickname, SetNickname] = useState("")
    const [telephone, SetTelephone] = useState("")
    const [email, SetEamil] = useState("")
    const [address, SetAddress] = useState("")

//회원정보수정
    // useEffect(() => {
    //     axios
    //     .put(url, {
    //         nickname :{nickname},
    //         telephone : {telephone},
    //         email :{email},
    //         address : {address} ,
    //     })
    //     .then((res) => {
    //         console.log(res);
    //     })
    //     .catch(error) => {
    //         console.log(error)
    //     }
    // },[])
    //회원정보 핸들러 눌렀을 때

//회원 탈퇴 
//     useEffect(()=>{
//     axios
//     .delete(url)
//     .then((res) =>{
//         console.log(res);
//    .catch((error)=>{
//        console.log(error)
    //    }) 
//     })
// },[])
//delete 버튼 누를때 ㅇㅇ


    const onNickNameHandler= (e) => {
        SetNickname(e.currentTarget.value)
    }

    const onTelephoneHandler = (e) => {
        SetTelephone(e.currentTarget.value)
    }

    const onEmailHandler = (e) => {
        SetEamil(e.currentTarget.value)
    }

    const onAddressHandler = (e) => {
        SetAddress(e.currentTarget.value)
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();
    }
  return (

        <div className='flex justify-center items-center w-full h-screen p-40' >
        <form className='flex flex-col' onChange={onSubmitHandler}>
            <label>USERNAME</label>
            <div>   <hr></hr>username 이거 데이터 값으로 변경

            </div>
            <label>NICKNAME</label>
            <hr></hr>
            <input 
            type="text"
            placeholder='nickname'
            className='rounded-3xl'
            value={nickname}
            onChange={onNickNameHandler}
            >
            </input>

            <label>telephone</label>
            <hr></hr>
            <input
            type="text"
            placeeholder='PASSWORD'
            className='rounded-3xl'
            value={telephone}
            onChange={onTelephoneHandler}
            >
            </input>

            <label>email</label>
            <hr></hr>
            <input
            type="text"
            placeeholder='email'
            className='rounded-3xl'
            value={email}
            onChange={onEmailHandler}
            >
            </input>

            <label>address</label>
            <hr></hr>
            <input
            type="text"
            placeeholder='address'
            className='rounded-3xl'
            value={address}
            onChange={onAddressHandler}
            >
            </input>





            <br />
            <button className='border rounded-3xl'>
                    정보 수정 완료
            </button>
            <div>
          
            </div>
        </form>    

        <form>
            <button className='absolute bg-brand'>  회원 탈퇴 하기</button>
        </form>
    
    </div>
  )
}
