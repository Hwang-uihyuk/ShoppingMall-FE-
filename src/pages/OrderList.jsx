import React,{useEffect,useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Table = styled.table`
    margin : 10px 10px 10px 10px;
    border-collapse : collapse;
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
    width : 90%;
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
    align-items: center;
    display: flex;
    height : 70%;
    flex-direction: column;
    background-color: white;
    position: relative;
    z-index: 2;
    font-family: "RalewayBold";
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
const OrderWrapper = styled.div` 
    margin-top : 20px;
    width : 70vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    height :flex;
    position: relative;
`
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
const OrderTable = styled.table`
    margin : auto;
    display: flex;
    flex-direction: column;
`
const OrderListLabel = styled.label`
  font-size: 25px;
  color : #252525;
  margin: 15px 10px 30px 10px;
`
const TD = styled.td`
    padding : 15px;
    width : 20vw;
    border-top : 2px solid #252525;
    border-bottom : 2px solid #252525;
`
const ImageTD = styled(TD)`
    padding : 0;
`
const DateTD = styled(TD)`
    width: 14vw;
`;
const BodyTD = styled.td`
    width : 20vw;
    padding : 15px;
    border-top : none;
    border-bottom : 2px solid #252525;
`
const BodyImageTD = styled.td`
    width : 20vw;
    padding : 1%;
    border-top : none;
    border-bottom : 2px solid #252525;
`
const BodyDateTD = styled(BodyTD)`
    width: 14vw;
`
const OrderListTB = ({orders})=>(
    <OrderWrapper>
        <OrderTable>
            <thead>
                <tr>
                    <DateTD>DATE</DateTD>
                    <ImageTD></ImageTD>
                    <TD>PRODUCT</TD>
                    <TD>COUNT</TD>
                    <TD>STATUES</TD>
                </tr>
            </thead>
            <tbody>
                {orders&&
                    orders.map((order)=>(
                        <tr>
                            <BodyDateTD>
                                {parseDate(order.order_date)}
                            </BodyDateTD>
                            <BodyImageTD>
                                    <Image src={ order.imgKey } />

                            </BodyImageTD>
                            <BodyTD>
                                <LLabel>{order.name}</LLabel>
                                <SLabel>SIZE : {order.price}</SLabel>
                                <MLabel >{order.price.toLocaleString('to-KR')}원</MLabel>
                            </BodyTD>
                            <BodyTD>
                                {order.size}
                            </BodyTD>
                            <BodyTD>{order.order_status}</BodyTD>
                        </tr>
                    ))}
            </tbody>
        </OrderTable>
    </OrderWrapper>
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
                    <OrderListLabel>ORDERS</OrderListLabel>
                    <OrderListTB orders={orders}/>
                    {/* <Table>
                        <OrdersHead />
                        <br />
                        {orders &&
                            orders.map((order, index) => (
                                <OrdersBody key={index} order={order} />
                            ))}
                    </Table> */}
            </Page>
        </>
    )
}