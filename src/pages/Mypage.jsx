import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
const baseURL = process.env.REACT_APP_URL;

export default function MyPage() {
    const [userstate, setUserState ] = useState("");

    const [nickname,setNickName] = useState(userstate.username)
    const [telephone,setTelePhone] = useState(userstate.telephone)
    const [email,setEmail] = useState(userstate.email)
    const [address,setAddress] = useState(userstate.address)
    const [hide1, setHide1] = useState(false)
    const [hide2, setHide2] = useState(false)
    const [hide3, setHide3] = useState(false)
    const [hide4, setHide4] = useState(false)

        // 비밀번호 변경하기
    const [pw, setPw] = useState('')
    const [pwchange, setPwChange] = useState('')
    const [pwcheck, setPwCheck] = useState('')
    const [hidePw, setHidePw] = useState(false)

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


const showOnlyOne = (hide) =>{
    if (hide === "setHide1") {
        setHide1(mode=>!mode);
            if (hide2) setHide2(false);
            if (hide3) setHide3(false);
            if (hide4) setHide4(false);
            if (hidePw) setHidePw(false);
    } else if (hide === "setHide2") {
            setHide2(mode=>!mode);
                if (hide1) setHide1(false);
                if (hide3) setHide3(false);
                if (hide4) setHide2(false);
                if (hidePw) setHidePw(false);
    } else if (hide === "setHide3") {
            setHide3(mode=>!mode);
                if (hide1) setHide1(false);
                if (hide2) setHide2(false);
                if (hide4) setHide4(false);
                if (hidePw) setHidePw(false);
    } else if (hide === "setHide4") {
            setHide4(mode=>!mode);
                if (hide1) setHide1(false);
                if (hide2) setHide2(false);
                if (hide3) setHide3(false);
                if (hidePw) setHidePw(false);
    } else if (hide === "setHidePw") {
        setHidePw(mode=>!mode);
            if (hide1) setHide1(false);
            if (hide2) setHide2(false);
            if (hide3) setHide3(false);
            if (hide4) setHide4(false);
    }
}


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
    setAddress(e.currentTarget.value);
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

const handleUpgradeAuth = (e) => {
    e.preventDefault();
    const upgradeId = prompt('업그레이드 할 아이디는 무엇입니까?')
    console.log(upgradeId)
    axios.patch(`${baseURL}/admin/upgradeAuth/${upgradeId}`,"",{
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : window.localStorage.getItem('Login')
        }
    }).then(() => alert('권한이 업그레이드 됬습니다.'))
    .catch((error) => {
        console.log(error)
        alert("이미 충분한 권한을 가지고 있습니다.")
        
    }
    )
}


  return (
    <div>
        <section className="bg-white dark:bg-gray-900 grid justify-items-center items-center h-full ">
            <div className="flex flex-col w-full h-full mt-10 mb-10 items-center justify-center px-6 py-8 md:h-screen lg:py-0 max-h-full">
                    <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        Mypage</div>
                    <div className="w-full max-w-2xl h-full bg-white rounded-lg shadow dark:border md:mt-0 2xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <form className='space-y-4 md:space-y-6'>
                                <div className='flex w-full font-bold text-xl border-b-2'>
                                    {userstate.username}
                                    {/* 회원탈퇴 폼 */}
                                    <div className='text-sm border rounded-md hover:bg-slate-100 p-1  ml-2 bg-primary-600 text-white pl-5 pr-5'>
                                        <button onClick={(e)=>{
                                            e.preventDefault();
                                            const quickmessage = window.confirm('확인 버튼을 누르면 회원이 탈퇴됩니다.')
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
                                        }}>회원 탈퇴
                                        </button>
                                    </div>
                                </div>
                                {/* 비밀번호변경 */}
                                <div className='flex place-content-between'>
                                    <div>비밀번호 : ********</div>
                                    <button className="w-md min-w-sm text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        onClick={(e) => {
                                        e.preventDefault();
                                        showOnlyOne("setHidePw")
                                    }}> 비밀번호 변경
                                    </button>
                                </div>
                                {hidePw &&
                                    <div className='bg-white border w-full p-5 m-3'>
                                        <div className='mb-4'>
                                            <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">현재 비밀번호 </label>
                                            <input
                                            type= "text"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder = "현재비밀번호"
                                            onChange ={onPwHandler}/>
                                        </div>
                                        <div className='mb-4'>
                                            <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">변경 비밀번호 </label>
                                            <input
                                            type='text'
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder = "변경비밀번호"
                                            onChange={onPwChangeHandler}/>
                                        </div>

                                        <div className='mb-4'>
                                            <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">변경 비밀번호 확인 </label>
                                            <input
                                            type='text'
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder = "변경비밀번호확인"
                                            onChange={onPwChangeCheckHandler}/>
                                        </div>

                                        <div className='flex justify-center'>
                                            {pwcheck === pwchange ?
                                            <button onClick={onPwChange} 
                                            className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >비밀번호 변경하기</button>:
                                            <div>비밀번호가 다릅니다.</div>}
                                        </div>
                                    </div>}
                                
                                {/* 닉네임 변경 form */}
                                <div className='flex place-content-between'>
                                    <div>닉네임 : {userstate.nickname}</div>
                                    <button className="w-md min-w-sm text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={(e)=>{
                                        e.preventDefault();
                                        showOnlyOne("setHide1")
                                    }}>닉네임 변경</button> 
                                </div>

                                {/* 버튼 클릭하면 이 form이 나타나야함. */}
                                {hide1 &&<div className='border p-5 m-3 rounded-xl'>
                                <div className='mt-3'>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">닉네임 변경하기</label>
                                    <input 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    type ="text" 
                                    placeholder ="닉네임을 입력하세요."
                                    onChange={onNickNameHandler}></input>
                                </div>

                                <div className='flex justify-end gap-3 mt-3'>
                                    <button 
                                    className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    onClick={onNickNameChangeHandler}
                                    > 확인 </button>
                                    <button className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> 취소 </button>
                                </div>
                            </div>}

                            {/* telephone 변경 form */}
                            <div className='flex place-content-between'>
                                <div>전화번호 : {userstate.telephone}</div>
                                <button className="w-md min-w-sm text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={(e)=>{
                                    e.preventDefault();
                                    showOnlyOne("setHide2")
                                }}> 전화번호 변경 </button>
                            </div>
                            {hide2 &&<div className='border p-5 m-3 rounded-xl'>
                        
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">전화번호 변경하기</label>
                                <input 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                type ="text" 
                                placeholder ="전화번호를 입력하세요."
                                onChange={onTelePhoneHandler}></input>
                            </div>

                            <div className='flex justify-end gap-3 mt-3'>
                            
                            <button 
                            className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"

                            onClick={onTelePhoneChangeHandler}
                            > 확인 </button>
                            <button 
                            className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            > 취소 </button>
                            </div>
                        </div>}

                        {/* email 변경 form */}
                        <div className='flex place-content-between'>
                            <label>Email : {userstate.email}</label>
                            <button className="w-md min-w-sm text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            onClick={(e)=>{
                                e.preventDefault();
                                showOnlyOne("setHide3")
                            }}> 이메일 변경 </button>
                        </div>
                        {/* 버튼 클릭시 email 변경 form */}
                        {hide3 &&<div className='border p-5 m-3 rounded-xl'>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일 변경하기</label>
                                <input 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                type ="text" 
                                placeholder ="이메일을 입력하세요."
                                onChange={onEmailHandler}></input>
                            </div>

                            <div className='flex justify-end gap-3 mt-3'>
                                <button 
                                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={onEmailChangeHandler}
                                > 확인 </button>
                                <button
                                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" > 취소 </button>
                            </div>
                        </div>}

                        {/* address 변경 form */}
                        <div className='flex place-content-between'>
                            주소 : {userstate.address}
                            <button className="w-md min-w-sm text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            onClick={(e)=>{
                                e.preventDefault();
                                showOnlyOne("setHide4")
                            }}> 주소 변경 </button>
                        </div>
                            
                        {/* 버튼 클릭시 address 변경 form */}
                        {hide4 &&<div className='border p-5 m-3 rounded-xl'>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">주소 변경하기 : </label>
                                <input 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                type ="text" 
                                placeholder ="주소를 입력 하세요."
                                onChange={onAddressHandler}></input>
                            </div>

                            <div className='flex justify-end gap-3 mt-3'>
                        
                            <button 
                            className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            onClick={onAddressChangeHandler}
                            > 확인 </button>
                            <button
                            className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> 취소 </button>
                            </div>
                        </div>}
                        <div className='h-1'></div>
                        {/* 상품 등록 폼 */}
                        <div className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" > 
                            <Link to ="/products/new">상품등록</Link>
                        </div>

                        <div className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <Link to ="/products/edit">상품수정하기</Link>
                        </div>

                        <div className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <Link to ="/mypage/favorite">좋아요한상품</Link>
                        </div>

                        <div className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <Link to ="/mypage/orderlist">주문목록</Link>
                        </div>
                        {window.localStorage.getItem('ID') === 'hwang' ?
                        <button 
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={handleUpgradeAuth}>권한 업그레이드</button> : ""}

                    </form>
                </div>
                </div>
            </div>
        </section>
    </div>
  )
{/* real side var
        <div class="h-screen flex items-end justify-end px-4 pb-6 mt-4">
  <button class="relative z-30 lg:hidden peer h-14 w-14 rounded-full bg-cyan-500 hover:bg-cyan-600 focus:bg-cyan-600 active:bg-cyan-700 transition">
    <span class="text-white">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 m-auto" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"/>
      </svg>
    </span>
  </button>

  <div class="z-20 fixed top-19.5 -left-96 lg:left-0 h-screen w-9/12 lg:w-72 bg-white shadow-2xl peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
    <nav role="navigation" class="p-6">
        <div class="flex items-center gap-4 pb-4">
          <img class="w-32" src="https://raw.githubusercontent.com/Meschacirung/Tailus-website/f59a4b3ecc1ad9f6a2b0ad9e3fca6f957140cc4d/public/images/logo.svg" alt="tailus-logo"/>
        </div>

        <div class="relative">
          <form action="" class="text-gray-500 focus-within:text-cyan-400 focus-within:bg-white focus-within:shadow rounded search transition duration-300">
            <div class="relative w-full">
              <div class="absolute top-0 bottom-0 h-full flex items-center mb-auto left-4">
                <svg xmlns="http://ww50w3.org/2000/svg" class="w-4 fill-current" viewBox="0 0 35.997 36.004">
                  <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                </svg>
              </div>
              <input type="search" placeholder="Rechercher" name="search" id="search" class="text-sm text-gray-500 placeholder-gray-500 w-full rounded py-3 pr-4 pl-12 bg-gray-200 bg-opacity-75 outline-none focus:bg-transparent focus:rounded-3xl transition-all" />
            </div>
          </form>
        </div>

        <div class="mt-4 -mx-4 relative overflow-y-auto overflow-x-hidden h-[85vh]">
          <span class="uppercase px-4 text-gray-500">Docs</span>
          <ul class="space-y-4 mb-12 px-4 mt-8">
            <li>
              <a href="" class="flex gap-4 text-gray-600 hover:text-gray-800 transition">
                <img src="https://raw.githubusercontent.com/Meschacirung/Tailus-website/f59a4b3ecc1ad9f6a2b0ad9e3fca6f957140cc4d/public/images/icons/favorites.svg" class="w-6" alt="" />
                Documentation
              </a>
            </li>
            
          </ul>
          <ul class="space-y-4">
            <li class="pr-2">
              <div class="py-2 px-4 text-gray-700 uppercase">
                <a href="" class="block">Atoms</a>
              </div>
              <ul class="text-sm pb-24">
                <li>
                  <a href="" class="block py-2 px-5 rounded bg-cyan-500 bg-opacity-10 hover:bg-opacity-20 text-cyan-500">Alert</a>
                </li>
                <li>
                  <a class="block py-2 px-5 hover:text-gray-800 transition" href="">Avatars</a>
                </li>
                <li>
                  <a class="block py-2 px-5 hover:text-gray-800 transition" href="">Badges</a>
                </li>
                
              </ul>
            </li>
          </ul>
        </div>
      </nav>
  </div>

  <div class="z-10 lg:hidden fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-30 opacity-0 peer-focus:opacity-100 peer:transition duration-200"></div>
</div> */}
    

}
