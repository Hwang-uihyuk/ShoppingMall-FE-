import React from 'react'

export default function EditUser() {
  return (
        <div className='flex justify-center items-center w-full h-screen' >
        <form className='flex flex-col' onChange={onSubmitHandler}>
            <label>ID</label>
            <input 
            type="text"
            placeholder='ID'
            className='rounded-3xl'
            value={Id}
            onChange={onIdHandler}
            >
            </input>

            <label>PASSWARD</label>
            <input
            type="text"
            placeeholder='PASSWORD'
            className='rounded-3xl'
            value={Password}
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
