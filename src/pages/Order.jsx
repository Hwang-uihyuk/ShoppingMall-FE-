import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from "styled-components";

const baseURL = process.env.REACT_APP_URL;

const InputForm = styled.input`
    border-style: 1px dotted;
    height : 50px;
    width: 600px;
    font-family: "RalewayLight";
    font-size: 17px;
    margin: 12px 0 0 9px;
    padding-left : 20px;
    border-radius: 30px;
    &:focus{
        outline : "none"
    }
`
const OrderForm = styled.form`
    grid-template-columns: 300px 300px;
    grid-template-rows: 60px 60px 60px 60px;
    align-self: left;
    align-items: center;
    margin : 10px;
    padding : 10px;
    display: flex;
    height : 1000px;
    width : flex;
    flex-direction: column;
    background-color: white;
    position: relative;
    z-index: 2;
    font-family: "RalewayBold";
`
const OrderLabel = styled.label`
    display: flex;
    padding: 16px 0 0 16px;
    font-size : 20px;
    color : #252525;
    left : rem;
`
const OrderWrapper = styled.div` 
    margin-top : 20px;
    width : 1000px;
    height :flex;
`
const OrderBtn = styled.button`
    height: 50px;
    width : 170px;
    align-self: center;
    font-family: "RalewayLight";
    font-size: 17px;
    margin-top: 30px;
    background-color: #252525;
    color : white;
    border-style: none;
    border-radius: 30px;
    &:hover{
        background-color: #666666e0;
        cursor : pointer;
    }
`
const OrderTable = styled.table`
    margin : 10px 10px 10px 10px;
    border-collapse: collapse;
    width : 1000px;
`

const TD = styled.td`
    width : 300px;
    padding : 15px;
    border : 1px solid #aaaaaadf;
`
const QuantityTD = styled.td`
    width : 100px;
    padding : 15px;
    border : 1px solid #aaaaaadf;
`
const SizeTD = styled.td`
    width : 70px;
    padding : 15px;
    border : 1px solid #aaaaaadf;
`
const PriceTD = styled.td`
    width : 120px;
    padding : 15px;
    border : 1px solid #aaaaaadf;
`
const ImageContainer = styled.div`
    width: 40%;
    height : 40%;
    display : flex;
    align-items: center;
    justify-content: center;
`

const Image = styled.img`
    width : 100%;
    height : auto;
`
const SizedBox = styled.div`
    width : 15px;
`
const AddressInfo = ({label,value,...rest})=>(
    <OrderWrapper>
        <OrderLabel>{label}</OrderLabel>
        <InputForm type ="text" value = {value}></InputForm>
    </OrderWrapper>
)
const OrderInfo = ({label,imgKey,productname,price,count,size,...rest})=>(
    <OrderWrapper>
        <OrderLabel>{label}</OrderLabel>
        <OrderTable>
            <tbody>
                <tr>
                    <TD></TD>
                    <TD>PRODUCT</TD>
                    <TD>PRICE</TD>
                    <TD>QUANTITY</TD>
                    <TD>SIZE</TD>
                </tr>
                <tr>
                    <TD>
                        <ImageContainer>
                            <Image src = {imgKey}/>
                        </ImageContainer></TD>
                    <TD>{productname}</TD>
                    <TD>{price}</TD>
                    <TD>{count}</TD>
                    <TD>{size}</TD>
                </tr>
            </tbody>
    </OrderTable>
    </OrderWrapper>
)
export default function Order(){

    const location = useLocation();
    const [orderState, setOrderState] = useState("Preparing");
    const [productId,setProductId] = useState(location.state.product.id);
    const imgKey = location.state.product.imgKey;
    const productName = location.state.product.name;
    const price = location.state.product.price;
    const [count,setCount] = useState(1);
    const size = location.state.size;
    const [address,setAddress] = useState("");

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
        setAddress(response.data.address)
     })
     .catch((error) => console.log(error))
    }, [])

    console.log(location.state.product);
    console.log("productId : ",productId);
    console.log("count : ",count);
    console.log("size : ",size);
    console.log("Address:", address)
    const onAddressChangeHandler = (e)=>{
        e.preventDefault();
        const currentAddress = e.currentTarget.value
        setAddress(currentAddress);
    }
    // submit order
    const onSubmitHandler = (event) =>{
        event.preventDefault();

        let time = ""
        let today = new Date();
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let date = ('0' + (today.getDate())).slice(-2);
        let hours = ('0' + (today.getHours())).slice(-2);
        let minutes = ('0' + (today.getMinutes())).slice(-2);
        let seconds = ('0' + (today.getSeconds())).slice(-2);

        time = year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds

        let body = JSON.stringify({
            "queryOrderProductList":[
                {
                    "product_id": productId,
                    "count" : count,
                    "size" : size
                }
            ],
            "order_status" : orderState,
            "order_date" : time
        })
        console.log(body);
        axios
            .post(`${baseURL}/user/order`,body,{
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization' : window.localStorage.getItem('Login')
                }
            })
            .then((response)=>{
                console.log(response);
                alert("주문완료")
                document.location.href = '/'
            })
            .catch((error) => {
                console.log(error)
            });
    }
    return (
        <OrderForm>
            <AddressInfo label ="ADDRESS" value ={address}/>
            <OrderInfo
                label="ORDER"
                imgKey={imgKey}
                productname={productName}
                price={price}
                count={count}
                size={size}/>
            <OrderBtn onClick ={onSubmitHandler}>ORDER NOW</OrderBtn>
        </OrderForm>
    )
}