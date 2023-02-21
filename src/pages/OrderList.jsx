import React,{useEffect,useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Table = styled.table`
    margin : 10px 10px 10px 10px;
    border-collapse : collapse;
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
const Container = styled.div`
    margin : 30px 0 0 100px;
    width : 100vh;
    display: flex;
    justify-content: center;
    align-content : center;
    flex-direction: column;
`
const Page = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
`
const OrdersHead = ()=>(
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
)
const parseDate = ((dateString)=>{
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const res = `${year}-${month+1}-${day}`;
    return res;
})

const OrderListLabel = styled.label`
  font-size: 25px;
  color : #252525;
  margin: 15px 10px 30px 10px;
`
const OrdersBody = ({order}) => (
            <tr>
                <TD>{parseDate(order.order_date)}</TD>
                <TD>
                    <ImageContainer>
                        <Image src={ order.imgKey } />
                        <Image src={ order.imgKey } />
                    </ImageContainer>
                </TD>
                <TD>{order.name}</TD>
                <SizeTD>{order.size}</SizeTD>
                <PriceTD>{order.price}</PriceTD>
                <StatusTD>{order.order_status}</StatusTD>
            </tr>
)

const baseURL = process.env.REACT_APP_URL;
export default function OrderList(){
    const [orders,setOrders] = useState();
    useEffect(()=>{
        axios({
            method :"get",
            url : `${baseURL}/user/order`,
            headers:{
                "Content-Type" :"application/json",
                "Authorization" :window.localStorage.getItem('Login')
            }
        }).then((response)=>{
            console.log("주문목록을 가져옵니다")
            console.log(response.data)
            setOrders(response.data)
            
        }).catch((error) => console.log(error))
    },[])

    return(
        <>
            <Page>
                <Container>
                    <OrderListLabel>ORDERS</OrderListLabel>
                    <Table>
                        <OrdersHead />
                        <br />
                        {orders &&
                            orders.map((order, index) => (
                                <OrdersBody key={index} order={order} />
                            ))}
                    </Table>
                </Container>
            </Page>
        </>
    )
}