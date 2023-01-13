import React, {useEffect,useState} from 'react'
import axios from 'axios'

//이 링크로 들어오자마자 
//get으로 이 사용자의 정보를 가져온다.
// 그리고 뿌려주면 된다.
export default function MyPage() {
    const [userstate, setUserState ] = useState("");

    //이걸 해주는 input text에 값을 넣어줘야 하기 때문이다. 그 값을 가져와서 보내줘야함
    const [nickname,setNickName] = useState(userstate.username)
    const [telephone,setTelePhone] = useState(userstate.telephone)
    const [email,setEmail] = useState(userstate.email)
    const [address,setAddress] = useState(userstate.address)
    const [hide1, setHide1] = useState(false)
    const [hide2, setHide2] = useState(false)
    const [hide3, setHide3] = useState(false)
    const [hide4, setHide4] = useState(false)
    
    

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
const onNickNameHandler = (e) => {
    setNickName(e.currentTarget.value) 
}
const onNickNameChangeHandler = (e) =>{
    const data = JSON.stringify({
        "username" : userstate.username,
        "nickname" : nickname,
        "telephone" : userstate.telephone,
        "e_mail" : userstate.e_mail,
        "address" :  userstate.address
    })

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

// telephone handler
const onTelePhoneHandler = (e) => {
    setTelePhone(e.currentTarget.value);
}
const onTelePhoneChangeHandler = (e) =>{

}
// email handler
const onEmailHandler = (e) =>{
    setEmail(e.currentTarget.value);}
const onEmailChangeHandler = (e) =>{

}
// address handler
const onAddressHandler = (e) =>{
    setAddress(e.currentTarget.value);
}
const onAddressChangeHandler = (e) =>{

}

  return (
    <div className='flex justify-center items-center w-full h-screen' >

        <form className='flex flex-col border-8 rounded-lg p-10'>
            <div>
                아이디 : {userstate.username}
             </div>

             {/* 닉네임 변경 form */}
            <div>
                nickname : {userstate.nickname}
                <button className='border-4' onClick={(e)=>{
                    e.preventDefault();
                    setHide1(mode => !mode)
                }}>닉네임 변경</button> 
            </div>

            {/* 버튼 클릭하면 이 form이 나타나야함. */}
            {hide1 &&<div className='border p-5 m-3'>
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
            </div>}




            {/* telephone 변경 form */}
            <div>
                telephone : {userstate.telephone}
                <button className ="border-4"
                onClick={(e)=>{
                    e.preventDefault();
                    setHide2(mode =>!mode)
                }}> 전화번호 변경 </button>
            </div>

            {hide2 &&<div className='border p-5 m-3'>
                <label>닉네임 변경하기 </label>
                <div>
                    <label>닉네임 변경하기 : </label>
                    <input 
                    type ="text" 
                    placeholder ="닉네임을 변경하세요."
                    onChange={onTelePhoneHandler}></input>
                </div>

                <div>
                <button className="border p-2"> 취소 </button>
                <button 
                className="border p-2"
                onClick={onTelePhoneChangeHandler}
                > 확인 </button>
                </div>
            </div>}




            {/* email 변경 form */}
            <div>
                email : {userstate.e_mail}
                <button className ="border-4"
                onClick={(e)=>{
                    e.preventDefault();
                    setHide3(mode => !mode)
                }}> 이메일 변경 </button>
            </div>
            {/* 버튼 클릭시 email 변경 form */}
            {hide3 &&<div className='border p-5 m-3'>
                <label>닉네임 변경하기 </label>
                <div>
                    <label>닉네임 변경하기 : </label>
                    <input 
                    type ="text" 
                    placeholder ="닉네임을 변경하세요."
                    onChange={onEmailHandler}></input>
                </div>

                <div>
                <button className="border p-2"> 취소 </button>
                <button 
                className="border p-2"
                onClick={onEmailChangeHandler}
                > 확인 </button>
                </div>
            </div>}

            {/* address 변경 form */}
            <div>
                address : {userstate.address}
                <button className ="border-4"
                onClick={(e)=>{
                    e.preventDefault();
                    setHide4(mode => !mode)
                }}> 주소 변경 </button>
            </div>
                
            {/* 버튼 클릭시 address 변경 form */}
            {hide4 &&<div className='border p-5 m-3'>
                <label>닉네임 변경하기 </label>
                <div>
                    <label>닉네임 변경하기 : </label>
                    <input 
                    type ="text" 
                    placeholder ="닉네임을 변경하세요."
                    onChange={onAddressHandler}></input>
                </div>

                <div>
                <button className="border p-2"> 취소 </button>
                <button 
                className="border p-2"
                onClick={onAddressChangeHandler}
                > 확인 </button>
                </div>
            </div>}
            
            


        </form>    
    </div>
    
  )
}
