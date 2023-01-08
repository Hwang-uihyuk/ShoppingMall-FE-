import React, { useState } from 'react'

export default function EditUser() {
    const [nickname, SetNickname] = useState("")
    const [telephone, SetTelephone] = useState("")
    const [email, SetEamil] = useState("")
    const [address, SetAddress] = useState("")
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
  return (

        <div className='flex justify-center items-center w-full h-screen' >
        <form className='flex flex-col' onChange={onSubmitHandler}>
            <div>username 이거 데이터 값으로 변경

            </div>
            <label>NICKNAME</label>
            <input 
            type="text"
            placeholder='nickname'
            className='rounded-3xl'
            value={nickname}
            onChange={onNickNameHandler}
            >
            </input>

            <label>telephone</label>
            <input
            type="text"
            placeeholder='PASSWORD'
            className='rounded-3xl'
            value={telephone}
            onChange={onTelephoneHandler}
            >
            </input>

            <label>email</label>
            <input
            type="text"
            placeeholder='email'
            className='rounded-3xl'
            value={email}
            onChange={onEmailHandler}
            >
            </input>

            <label>address</label>
            <input
            type="text"
            placeeholder='address'
            className='rounded-3xl'
            value={address}
            onChange={onAddressHandler}
            >
            </input>





            <br />
            <button
             >
                    login
            </button>
            <div>
            <br></br>
            <hr></hr>
            <p>
            posts의 길이가 100이 나오면 성공 : {posts.length}
            {/* posts의 길이가 data 만큼 나오면 되는거임 */}
            </p>
            </div>
        </form>    
      
       
    
    </div>
  )
}
