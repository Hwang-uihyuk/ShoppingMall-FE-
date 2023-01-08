import React from 'react'

export default function EditUser() {
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
            value={}
            onChange={onNickNameHandler}
            >
            </input>

            <label>telephone</label>
            <input
            type="text"
            placeeholder='PASSWORD'
            className='rounded-3xl'
            value={}
            onChange={onPasswordHandler}
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
