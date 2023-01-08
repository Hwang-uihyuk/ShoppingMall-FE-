import React from 'react'
import Button from '../components/ui/Button';
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';

export default function Login() {
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
   //axios
  const[posts,setPosts] = useState([]);

  useEffect(() => {
      axios({
          method:'GET',
          url:'https://jsonplaceholder.typicode.com/posts'
      }).then(response => setPosts(response.data))
      
        //jsonplaceholder fake api
    })
  

  const onIdHandler = (e) =>{
      setId(e.currentTarget.value);
  }

  const onPasswordHandler = (e) => {
      setPassword(e.currentTarget.value);
  }

  const onSubmitHandler =(e) => {
      e.preventDefault();//page가 refresh 방지
  }

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
            placeholder='PASSWORD'
            className='rounded-3xl'
            value={Password}
            onChange={onPasswordHandler}
            >
            </input>
            <br />
            <Button 
            text={'Login'} >

            </Button>
        </form>    
        <br></br>
        <form>
            {posts.length}axios 테스트 입니다.
            {/* posts의 길이가 data 만큼 나오면 되는거임 */}
        </form>
    </div>
  )
}
