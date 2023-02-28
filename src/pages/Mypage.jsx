import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
const baseURL = process.env.REACT_APP_URL;
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

    const [isPhone, setIsPhone] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isNickName,setIsNickName] = useState(false);

    const [phoneChecked, setPhoneChecked] = useState(false);
    const [mailChecked, setMailChecked] = useState(false);

//처음 사용자 정보 가져오기
useEffect(() => {
    axios({
    method: "get",
    url : `${baseURL}/user`,
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
 return () => {
     console.log("hello")
 }
}, [])





//모든 유저 정보 담고있는 data



//NickName handle들
const onNickNameHandler = (e) => {
    setNickName(e.currentTarget.value);
}
const onNickNameChangeHandler = (e) =>{
    const data = JSON.stringify({
        "username" : userstate.username,
        "nickname" : nickname,
        "telephone" : userstate.telephone,
        "email" : userstate.email,
        "address" :  userstate.address
    })
    if(nickname.length<1){
        alert("닉네임은 공백일 수 없습니다.")
    }else{
        e.preventDefault();
        axios.put(`${baseURL}/user`,data,{
            headers: {  
                "Content-Type": "application/json",
                "Authorization" : window.localStorage.getItem('Login')
            }
        } ).then((res) => {
        alert("닉네임이 변경되었습니다.")
        console.log(res)
        document.location.href = '/mypage'
        }).catch((error) => console.log(error))
    }
    
}

// telephone handler
const onTelePhoneHandler = (e) => {
    const currentPhone = e.currentTarget.value;
    setTelePhone(currentPhone);
    const phoneRegExp = /^[0-9]{8,13}$/;
    if (phoneRegExp.test(currentPhone)) {
      setIsPhone(true);
    } else {
      setIsPhone(false);
    }
}
const onTelePhoneChangeHandler = (e) =>{
    const data = JSON.stringify({
        "username" : userstate.username,
        "nickname" : userstate.nickname,
        "telephone" : telephone,
        "email" : userstate.email,
        "address" :  userstate.address
    })

    e.preventDefault();
    if(!isPhone){
        alert("전화번호는 8자리 이상 입력해주세요.")
    }else{
        axios
            .get(`${baseURL}/check_telephone/${telephone}`)
            .then((response) => {
                axios.put(`${baseURL}/user`,data,{
                    headers: {  
                        "Content-Type": "application/json",
                        "Authorization" : window.localStorage.getItem('Login')
                       }
                } ).then((res) => {
                    alert("전화번호가 변경되었습니다.")
                    console.log(res)
                    document.location.href = '/mypage'
                }
                )
                .catch((error) => {
                    alert("전화번호가 중복됩니다.");
                })
            })
            .catch(() => {
                alert("사용중인 번호입니다")
      });
    }
}
// email handler

const onEmailHandler = (e) =>{
    const currentEmail = e.currentTarget.value;
    setEmail(e.currentTarget.value);
    const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$/;
    if (emailRegExp.test(currentEmail)) {
        setIsEmail(true);
        }else{
        setIsEmail(false);
    }

}

const onEmailChangeHandler = (e) =>{
    const data = JSON.stringify({
        "username" : userstate.username,
        "nickname" : userstate.nickname,
        "telephone" : userstate.telephone,
        "email" : email,
        "address" :  userstate.address
    })

    e.preventDefault();
    if(!isEmail){
        alert("이메일 형식에 맞게 입력해주세요");
    }else{
        axios.get(`${baseURL}/check_email/${email}`)
            .then(()=>{
                axios.put(`${baseURL}/user`,data,{
                    headers: {  
                        "Content-Type": "application/json",
                        "Authorization" : window.localStorage.getItem('Login')
                       }
                }).then((res) => {
                    alert("이메일이 변경되었습니다.");
                    console.log(res)
                    document.location.href = '/mypage'
                }
                )
                .catch((error) => {
                })
            })
            .catch((error)=>alert("이메일이 중복됩니다"))
    }
}
// address handler


const onAddressHandler = (e) =>{
    setEmail(e.currentTarget.value);
}

const onAddressChangeHandler = (e) =>{
    const data = JSON.stringify({
        "username" : userstate.username,
        "nickname" : userstate.nickname,
        "telephone" : userstate.telephone,
        "email" : userstate.email,
        "address" :  address
    })

    e.preventDefault();
    axios.put(`${baseURL}/user`,data,{
        headers: {  
            "Content-Type": "application/json",
            "Authorization" : window.localStorage.getItem('Login')
           }
    } ).then((res) => {
        setAddress(address)
        console.log("값 변경이 되었습니다.");
        console.log(res)
        document.location.href = '/mypage'
    }
    )
    .catch((error) => console.log(error))
}



// 비밀번호 변경하기
const [pw, setPw] = useState('')
const [pwchange, setPwChange] = useState('')
const [pwcheck, setPwCheck] = useState('')
const [hidePw, setHidePw] = useState(false)

const PwData = JSON.stringify({
    "origin_password" : pw,
    "new_password" : pwchange
}) 

const onPwChange = (e) => {
    e.preventDefault();
    axios.post(`${baseURL}/user/pwd_change`,PwData, {
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : window.localStorage.getItem('Login')
        }
    })
    .then(response => {
        console.log(response.data)
        document.location.href = '/mypage'

    })
    .catch(error => console.log(error))
}

const onPwHandler = (e) => {
    setPw(e.currentTarget.value)
}
const onPwChangeHandler = (e) => {
    setPwChange(e.currentTarget.value)
}
const onPwChangeCheckHandler = (e) => {
    setPwCheck(e.currentTarget.value)
}

  return (
    <div className='flex flex-col justify-center  w-full h-screen bg-gray-50 dark:bg-gray-900' >
    {/* // <div className='' > */}
        {/* 사이드 바 만들기 */}
        <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[0px] overflow-y-auto text-center bg-gray-900">
            <div className='text-gray-100 text-xl'>
                <div className='p-2.5 mt-1 flex items-center'>
                    <BsFillPlusCircleFill className='m-5 px- py-8 bg-blue-600 rounded-md'></BsFillPlusCircleFill>
                    <h1 className='font-bold text-gray-200 text -[15px] ml-3'>Shoppy</h1>

                </div>
                <hr className='my-2 text-purple-700'/>
            </div>
            <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer bg-gray-700'>
            </div>

            <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-slate-400 text-gray-100'>
                비밀번호 변경
            </div>

            <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-slate-400 text-gray-100'>
                헬로우
            </div>

            <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-slate-400 text-gray-100'>
                헬로우
            </div>
        </div>
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
                    placeholder ="닉네임을 입력하세요."
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
                <label>전화번호 변경하기 </label>
                <div>
                    <label>전화번호 변경하기 : </label>
                    <input 
                    type ="text" 
                    placeholder ="전화번호를 입력하세요."
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
                email : {userstate.email}
                <button className ="border-4"
                onClick={(e)=>{
                    e.preventDefault();
                    setHide3(mode => !mode)
                }}> 이메일 변경 </button>
            </div>
            {/* 버튼 클릭시 email 변경 form */}
            {hide3 &&<div className='border p-5 m-3'>
                <label>이메일 변경하기 </label>
                <div>
                    <label>이메일 변경하기 : </label>
                    <input 
                    type ="text" 
                    placeholder ="이메일을 입력하세요."
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
                <label>주소 변경하기 </label>
                <div>
                    <label>주소 변경하기 : </label>
                    <input 
                    type ="text" 
                    placeholder ="주소를 입력 하세요."
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
        <div>
        <button className='border-4' onClick={(e) => {
            e.preventDefault();
            setHidePw(mode => !mode)
        }}> 비밀번호 변경</button>
        </div>

        {hidePw && <div className='border p-5 m-3'>
            <div>
                <label>현재비밀번호 : </label>
                <input
                type= "text"
                placeholder = "현재비밀번호"
                onChange ={onPwHandler}/>
            </div>
            <div>
                <label>변경비밀번호 : </label>
                <input
                type='text'
                placeholder = "변경비밀번호"
                onChange={onPwChangeHandler}/>
            </div>

            <div>
                <label>변경비밀번호확인 : </label>
                <input
                type='text'
                placeholder = "변경비밀번호확인"
                onChange={onPwChangeCheckHandler}/>
            </div>

            <div className="">
                {pwcheck === pwchange ?
                <button onClick={onPwChange} className="border" >비밀번호변경하기</button>:
                <div>비밀번호가 다릅니다.</div>}
                
            </div>
            </div>}


            {/* 회원탈퇴 폼 */}
            <div className='border'>
                <button onClick={(e)=>{
                    e.preventDefault();
                    
                    const quickmessage = window.confirm('진짜로 탈퇴하시겠습니가?')
                    
                    if(quickmessage === true){
                        axios.delete(`${baseURL}/user`,{
                            headers :{
                                'Content-Type' : 'application/json',
                                'Authorization' : window.localStorage.getItem('Login')
                            }
                        }).then(response => {console.log("성공")
                        document.location.href = '/'})
                        .catch(error => console.log("에러입니당."))   
                    }
                }}>
                    회원 탈퇴
                </button>
            </div>
            {/* 상품 등록 폼 */}
            <div> 
                <Link to ="/products/new">상품등록</Link>
            </div>

            <div>
                <Link to ="/products/edit">상품수정하기</Link>
            </div>

            <div>
                <Link to ="/mypage/favorite">좋아요한상품</Link>
            </div>

            <div>
                <Link to ="/mypage/orderlist">주문목록</Link>
            </div>

            
    </div>
    
  )
}
