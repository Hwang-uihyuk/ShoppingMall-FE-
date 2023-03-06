import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import PostPopUp from "../components/PostPopUp";

const baseURL = process.env.REACT_APP_URL;

const InputForm = styled.input`
    border-style: 1px dotted;
    height : 50px;
    width: 60vw;
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
    /* grid-template-columns: 300px 300px;
    grid-template-rows: 60px 60px 60px 60px; */
    align-items: center;
    display: flex;
    height : 70%;
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
    width : 70vw;
    display: flex;
    flex-direction: column;
    height :flex;
`
const OrderBtn = styled.button`
    height: 50px;
    width : 170px;
    align-self: center;
    font-family: "RalewayLight";
    font-size: 17px;
    margin: 50px;
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
    display: flex;
`

const TD = styled.td`
    width : 20vw;
    padding : 15px;
    border-top : 2px solid #252525;
    border-bottom : 2px solid;
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
    width: 70%;
    height : 70%;
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
const SLabel = styled.p`
    color : #252525;
    font-weight: 300;
    font-size: 14px;
    margin-bottom: 10px;
`
const MLabel = styled.p`
    color : #252525;
    font-weight: 500;
    font-size: 17px;
`
const LLabel = styled.p`
    color : #252525;
    font-weight: 500;
    font-size: 22px;
    margin-bottom: 10px;
`
const TLabel = styled.label`
    color : #252525;
    font-weight: 500;
    font-size: 25px;
    display : flex;
    justify-content: flex-end;
    margin : 5px 5px 0 0 ;
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
                    <TD>QUANTITY</TD>
                </tr>
                <tr>
                    <TD>
                        <ImageContainer>
                            <Image src = {imgKey}/>
                        </ImageContainer>
                        
                    </TD>
                    <TD>
                        <LLabel>{productname}</LLabel>
                        <SLabel> SIZE : {size}</SLabel>
                        <MLabel >{price.toLocaleString('to-KR')}원</MLabel>
                    </TD>
                    <TD>{count}</TD>
                </tr>
            </tbody>
    </OrderTable>
    </OrderWrapper>
)

const OrderCart =({products,total})=>(
    <OrderWrapper>
        <OrderLabel>ORDER</OrderLabel>
        <OrderTable>
            <tbody>
                <tr>
                    <TD></TD>
                    <TD>PRODUCT</TD>
                    <TD>QUANTITY</TD>
                    <TD>SUBTOTAL</TD>
                </tr>
                    {products&&
                        products.map((product)=>(
                            <>
                                <tr>

                                    <TD>
                                        <ImageContainer>
                                            <Image src={product.imgKey} />
                                        </ImageContainer>

                                    </TD>
                                    <TD>
                                        <LLabel>{product.name}</LLabel>
                                        <SLabel> SIZE : {product.size}</SLabel>
                                        <MLabel >{product.price.toLocaleString('to-KR')}원</MLabel>
                                    </TD>
                                    <TD>{product.count}</TD>
                                    <TD>{(product.price * product.count).toLocaleString('to-KR')}</TD>
                                </tr>
                            </>
                        ))}
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
    const from= location.state.from;
    const cartproduct = location.state.product;
    const total = from =="cart"
        ? cartproduct.reduce((acc, cur) => acc + (cur.price * cur.count), 0)
        : price;

    console.log(from,'에서 왔습니다.');
    console.log(cartproduct);
    useEffect(() => {
        axios({
        method: "get",
        url : `${baseURL}/user`,
        headers: {  
            "Content-Type": "application/json",
            "Authorization" : window.localStorage.getItem('Login')
        }
    }).then((response) => {
        console.log(response.data)
        setAddress(response.data.address)
     })
     .catch((error) => console.log(error))
    }, [])

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

    const onCartSubmitHandler = (event) =>{
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

        cartproduct.forEach((product)=>{
            let body = JSON.stringify({
                "queryOrderProductList":[
                    {
                        "product_id": product.id,
                        "count" : product.count,
                        "size" : product.size
                    }
                ],
                "order_status" : orderState,
                "order_date" : time
            })
            axios
                .post(`${baseURL}/user/order`,body,{
                    headers : {
                        'Content-Type': 'application/json',
                        'Authorization' : window.localStorage.getItem('Login')
                    }
                })
                .then((response)=>{
                    console.log(response);
                    console.log(`${product.name} 주문 완료!`)

                })
                .catch((error) => {
                    console.log(error)
                });
        })

        document.location.href = '/'
    }
    return (
        <OrderForm>
            <AddressInfo label ="ADDRESS" value ={address}/>
            {(from==='details')&&
                <>
                    <OrderInfo
                        label="ORDER"
                        imgKey={imgKey}
                        productname={productName}
                        price={price}
                        count={count}
                        size={size}
                        />
                    <OrderBtn onClick ={onSubmitHandler}>{price.toLocaleString('to-KR')}원 결제</OrderBtn>

                    
                </>
            }
            {(from==='cart')&&
                <>
                    <OrderCart
                    products = {cartproduct}
                    total = {total}></OrderCart>
                    <OrderBtn onClick ={onCartSubmitHandler}>{total.toLocaleString('to-KR')}원 결제</OrderBtn>
                </>
            }
            
        </OrderForm>
    )
}