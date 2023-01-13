import React, {useEffect,useState} from 'react'
import axios from 'axios'

//이 링크로 들어오자마자 
//get으로 이 사용자의 정보를 가져온다.
// 그리고 뿌려주면 된다.
export default function MyPage() {
    const [userstate, setUserState ] = useState("");

    //이걸 해주는 input text에 값을 넣어줘야 하기 때문이다. 그 값을 가져와서 보내줘야함
    const [nickname,setNickName] = useState(userstate.username)
    
    const [telephone, setTelePhone] = useState(userstate.telephone)
    

//처음 사용자 정보 가져오기
   useEffect(() => {
    axios({
    method: "get",
    url : "http://3.38.35.43:8080/user/mypage",
    headers: {  
     "Content-Type": "application/json",
      "Authorization" : window.localStorage.getItem('Login')
    }
}).then((response) => {
    console.log("처음 데이터 값을 가져왔습니다.");
    console.log(response.data)
    setUserState(response.data)
 })
 .catch((error) => console.log(error))
}, [])


//모든 유저 정보 담고있는 data


//NickName handle들

const data = JSON.stringify({
    "username" : userstate.username,
    "nickname" : nickname,
    "telephone" : userstate.telephone,
    "e_mail" : userstate.e_mail,
    "address" :  userstate.address
})

const onNickNameHandler = (e) => {
    setNickName(e.currentTarget.value) 
}

const onNickNameChangeHandler = (e) =>{
    e.preventDefault();
    axios.put("http://3.38.35.43:8080/user/update",data,{
        headers: {  
            "Content-Type": "application/json",
            "Authorization" : window.localStorage.getItem('Login')
           }
    } ).then((res) => {
        setNickName(nickname)
        console.log("값 변경이 되었습니다.");
        console.log(res)
        document.location.href = '/mypage'
    }
        )
        

    .catch((error) => console.log(error))
}

  return (
    <div className='flex justify-center items-center w-full h-screen' >

        <form className='flex flex-col border rounded-lg'>
            <div>
                아이디 : {userstate.username}
             </div>

             {/* 닉네임 변경하기 버튼 클릭시 form 형태가 만들어져야함. */}
            <div>
                nickname : {userstate.nickname}
                <button className='border-4' onClick={(e)=>{
                }}>닉네임 변경</button> 
            </div>

            {/* 버튼 클릭하면 이 form이 나타나야함. */}
            <div className='border p-5 m-3'>
                <label>닉네임 변경하기 </label>
                <div>
                    <label>닉네임 변경하기 : </label>
                    <input 
                    type ="text" 
                    placeholder ="닉네임을 변경하세요."
                    onChange={onNickNameHandler}></input>
                </div>

                <div>
                <button className="border p-2"> 취소 </button>
                <button 
                className="border p-2"
                onClick={onNickNameChangeHandler}
                > 확인 </button>
                </div>
            </div>

            <div>
                telephone : {userstate.telephone}
                <button className ="border-4"> 전화번호 변경 </button>
            </div>

            
            
            <div>
                email : {userstate.e_mail}
                <button className ="border-4"> 이메일 변경 </button>
            </div>

            <div>
                address : {userstate.address}
                <button className ="border-4"> 주소 변경 </button>
            </div>
                


            
            


        </form>    
    </div>
    
  )
}