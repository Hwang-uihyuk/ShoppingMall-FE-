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
        //await, async promise
        //axios로 GET으로 데이터 받아오기 예시
    })

    //참고 자료 : https://ajdahrdl.tistory.com/136
    var sendData = JSON.stringify({
        "username" : {Id},
        "password" : {Password}

    });

    axios({
        method:"POST",
        url : '/axiosTest', //url 다시
        data: sendData,
        // header에서 JSON 타입의 데이터라는 것을 명시
        headers : {'Content-type' : 'application/json'}
    }).then((res)=>{
        alert("성공 로그인 되었습니다.");
        // API로 부터 받은 데이터 출력하기
        console.log(res.data);
    }).catch(error=>{
        // console.log("실패");
        
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
            placeeholder='PASSWORD'
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
        <div>
            posts의 길이가 100이 나오면 성공 : {posts.length}
            {/* posts의 길이가 data 만큼 나오면 되는거임 */}
        </div>
    </div>
  )
}
