import React, {useEffect,useState, useRef} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import { EditPassword, GetUserInfo, EditUserInfo, DuplicateCheck, UpgradeAuth} from '../api/api';
const baseURL = process.env.REACT_APP_URL;

export default function MyPage() {
    const [userstate, setUserState ] = useState({
        address : "",
        authority : "",
        email : "",
        nickname : "",
        telephone : "",
        username : ""
    });
    const [initUserState, setInitUserState ] = useState({
        address : "",
        authority : "",
        email : "",
        nickname : "",
        telephone : "",
        username : ""
    });
    const [hide1, setHide1] = useState(false)
    const [hide2, setHide2] = useState(false)
    const [hide3, setHide3] = useState(false)
    const [hide4, setHide4] = useState(false)

    const [pw, setPw] = useState('')
    const [pwchange, setPwChange] = useState('')
    const [pwcheck, setPwCheck] = useState('')
    const [hidePw, setHidePw] = useState(false)

    const [isPhone, setIsPhone] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isNickName,setIsNickName] = useState(false);

    const [phoneChecked, setPhoneChecked] = useState(false);
    const [mailChecked, setMailChecked] = useState(false);

    useEffect(() => {
        GetUserInfo().then((response)=>{
            setUserState(response.data)
            setInitUserState(response.data)});
        },[])

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

    //onChange Handler
    const onNickNameHandler =(e) => {
        const currentInput = e.currentTarget.value
        setUserState(prevState =>({...prevState,
            nickname : currentInput}))}

    const onTelePhoneHandler = (e) => {
        const currentInput = e.currentTarget.value
        setUserState(prevState =>({...prevState,
            telephone : currentInput}))} 
    
    const onEmailHandler = (e) =>{
        const currentInput = e.currentTarget.value;
        setUserState(prevState =>({...prevState,
            email : currentInput})) 
        const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$/;
        (emailRegExp.test(userstate.email))?setIsEmail(true):setIsEmail(false)}

    const onAddressHandler = (e) =>{
        const currentInput = e.currentTarget.value
        setUserState(prevState =>({...prevState,
            address : currentInput}))} 

    //sumbit Handler
    const onNickNameChangeHandler =(e) =>{
        e.preventDefault();
        (userstate.nickname.length<1) ? alert("닉네임은 공백일 수 없습니다.")
            :EditUserInfo(userstate).then(() => {
                alert("닉네임이 변경되었습니다.")
                window.location.reload();});}

    const onTelePhoneChangeHandler = (e) =>{
        e.preventDefault();
        DuplicateCheck("telephone",userstate.telephone).then(() => {
            EditUserInfo(userstate).then(()=>{
                alert("전화번호가 변경되었습니다.")
                window.location.reload();})
        }).catch((error)=>{
            console.log(error)
            alert("전화번호가 중복됩니다")});}

    const onEmailChangeHandler = (e) =>{
        e.preventDefault();
        DuplicateCheck("email",userstate.email).then(() => {
            EditUserInfo(userstate).then(()=>{
                alert("이메일이 변경되었습니다.")
                window.location.reload();})
        }).catch((error)=>{
            console.log(error)
            alert("이메일이 중복됩니다")});}

    const onAddressChangeHandler = (e) =>{
        e.preventDefault();
        EditUserInfo(userstate).then((response) => {
            alert("주소가 변경되었습니다.")
            window.location.reload();});}

    const onPwChange = (e) => {
        e.preventDefault();
        const PwData = JSON.stringify({
            "origin_password" : pw,
            "new_password" : pwchange
        }) 
        EditPassword(PwData).then(()=>{
            alert("비밀번호가 변경되었습니다.")
            window.location.reload();
        }).catch((error)=>{
            console.log(error)
            alert("변경 실패")})}

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
    UpgradeAuth(upgradeId)
    .then(() => alert('권한이 업그레이드 됬습니다.'))
    .catch((error) => {alert("이미 충분한 권한을 가지고 있거나, 존재하지 않는 아이디입니다.")
        
    }
    )
}

  return (
    <div>
        <section className="bg-white dark:bg-gray-900 justify-items-center items-center md:h-full">
            <div className="flex flex-col w-full h-full mt-10 mb-10 items-center justify-center px-6 py-8 md:h-full lg:py-0 max-h-full">
                    <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        Mypage</div>
                    <div className="w-full max-w-2xl h-full bg-white rounded-lg shadow dark:border md:h-full 2xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                                            <Input placeholder="현재비밀번호" onChange={onPwHandler}/>
                                        </div>
                                        <div className='mb-4'>
                                            <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">변경 비밀번호 </label>
                                            <Input placeholder="변경비밀번호" onChange={onPwChangeHandler}/>
                                        </div>

                                        <div className='mb-4'>
                                            <label
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">변경 비밀번호 확인 </label>
                                            <Input placeholder="변경비밀번호확인" onChange={onPwChangeCheckHandler}/>                                            
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
                                    <div>닉네임 : {initUserState.nickname}</div>
                                    <button className="w-md min-w-sm text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        onClick={(e)=>{
                                            e.preventDefault();
                                            showOnlyOne("setHide1")
                                        }}>닉네임 변경</button> 
                                </div>

                                {/* 버튼 클릭하면 이 form이 나타나야함. */}
                                {hide1 &&<div className='border p-5 m-3 rounded-xl'>
                                <div className='mt-3'>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">닉네임 변경하기</label>
                                    <Input placeholder="닉네임을 입력하세요."
                                        onChange={onNickNameHandler}/>
                                    {/* <input 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    type ="text" 
                                    placeholder ="닉네임을 입력하세요."
                                    onChange={onNickNameHandler}></input> */}
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
                                <div>전화번호 : {initUserState.telephone}</div>
                                <button className="w-md min-w-sm text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={(e)=>{
                                    e.preventDefault();
                                    showOnlyOne("setHide2")
                                }}> 전화번호 변경 </button>
                            </div>
                            {hide2 &&<div className='border p-5 m-3 rounded-xl'>
                        
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">전화번호 변경하기</label>
                                <Input placeholder="전화번호를 입력하세요." onChange={onTelePhoneHandler} />
                                {/* <input 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                type ="text" 
                                placeholder ="전화번호를 입력하세요."
                                onChange={onTelePhoneHandler}></input> */}
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
                            <label>Email : {initUserState.email}</label>
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
                                <Input placeholder="이메일을 입력하세요." onChange={onEmailHandler}/>
                                {/* <input 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                type ="text" 
                                placeholder ="이메일을 입력하세요."
                                onChange={onEmailHandler}></input> */}
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
                            주소 : {initUserState.address}
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
                                <Input placeholder="주소를 입력 하세요."  onChange={onAddressHandler} />
                                {/* <input 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                type ="text" 
                                placeholder ="주소를 입력 하세요."
                                onChange={onAddressHandler}></input> */}
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
}
