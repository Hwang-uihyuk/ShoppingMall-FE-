import axios from 'axios'
// import { useAxiosAuthContext } from '../components/context/UserStateContext';
const baseURL = "http://3.38.35.43:8080"

// Post : 로그인

export function PostLogin(id,password){
    const data = JSON.stringify({
        "username": id,
        "password": password,
    });

    axios.post(baseURL+"/login", data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response.headers.get("Authorization"))
            // const { accessToken } = response.data;
            //localStorage에 
            window.localStorage.setItem("Login", response.headers.get("Authorization"))
            window.localStorage.setItem("ID",id)
            //getItem => 변수 가져오기 
            console.log("=======로그인 성공=========")
            const val = response.headers.get("Authorization")
            // setUser((mode)=>!mode)
            // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
            // axios.defaults.headers.common['Authorization'] = val;
            // accessToken을 localStorage, cookie 등에 저장하지 않는다!      
            //main
            document.location.href = '/'
        }).catch(error => {
            // ... 에러 처리
            console.log("에러")
            console.log(error)
        });
}
// Post : 회원가입
export function PostSignUp(body){
    const joinConfig = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    console.log(body);
    axios
        .post(baseURL + "/join", body, joinConfig)
        .then((response) => {
            console.log(response.data);
            alert("회원가입이 완료되었습니다")
            document.location.href = '/'
        })
        .catch((error) => {
            console.log(error)
        });
}

export function LogOut(){
    // const { setUser } = useAxiosAuthContext();
    // setUser((mode) => !mode)
    // localStorage에서 token, username 삭제
    // user => false
}
