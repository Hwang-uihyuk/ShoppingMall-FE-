import React,{useEffect,useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Table = styled.table`
    margin : 10px 10px 10px 10px;
    border-collapse : collapse;
    width : 1000px;
`
const TD = styled.td`
    width : 300px;
    padding : 15px;
    border : 1px solid #aaaaaadf;
`
const SizeTD = styled.td`
    width : 70px;
    padding : 15px;
    border : 1px solid #aaaaaadf;
`
const PriceTD = styled.td`
    width : 140px;
    padding : 15px;
    border : 1px solid #aaaaaadf;
`
const StatusTD = styled.td`
    width : 100px;
    padding : 15px;
    border : 1px solid #aaaaaadf;
`
const ImageContainer = styled.div`
    width: 100%;
    height : 100%;
    display : flex;
    align-items: center;
    justify-content: center;
`
const Image = styled.img`
    width : 40%;
    height : auto;
`
const SizedBox = styled.div`
    width : 15px;
`
const OrdersHead = ()=>(
    <Table>
        <thead>
            <tr>
                <TD>ORDER DATE</TD>
                <TD>IMAGE</TD>
                <TD>PRODUCT</TD>
                <SizeTD>SIZE</SizeTD>
                <PriceTD>PRICE</PriceTD>
                <StatusTD>STATUS</StatusTD>
            </tr>
        </thead>
    </Table>
)
const OrdersBody = (order,key) => (
    <Table key = {key}>
        <tbody>
            <tr>
                <TD>{order.order_date}</TD>
                <TD>
                    <ImageContainer>
                        <Image src={ order.imgKey } />
                    </ImageContainer>
                </TD>
                <TD>{order.name}</TD>
                <SizeTD>{order.size}</SizeTD>
                <PriceTD>{order.price}</PriceTD>
                <StatusTD>{order.order_status}</StatusTD>
            </tr>
        </tbody>
    </Table>
)
const BaseUrl = "http://3.38.35.43:8080/";
export default function OrderList(){
    const [orders,setOrders] = useState();
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
            setOrders(response.data)
        }).catch((error) => console.log(error))
    },[])
    return(
        <>
            <OrdersHead/>
            <br/>
            {orders.map((order,index)=>(
                <OrdersBody key = {index} order={order}/>
            ))}
        </>
    )
}