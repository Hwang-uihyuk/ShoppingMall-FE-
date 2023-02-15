import React,{useEffect,useState} from 'react'
import axios from 'axios'

const BaseUrl = "http://3.38.35.43:8080/";
export default function OrderList(){
    useEffect(()=>{
        axios({
            method :"get",
            url : BaseUrl+"user/order",
            headers:{
                "Content-Type" :"application/json",
                "Authorization" :window.localStorage.getItem('Login')
            }
        }).then((response)=>{
            console.log("주문목록을 가져옵니다")
            console.log(response.data)
        })
    })
    
}