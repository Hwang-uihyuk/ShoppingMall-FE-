import React, { useState } from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import {AiFillHeart,AiOutlineHeart } from 'react-icons/ai';
import Button from '../components/ui/Button';
import { GetProductDetail } from '../api/api';

const baseURL = process.env.REACT_APP_URL;

export default function ProductDetail() {
  const navigate = useNavigate();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();

  // console.log(addOrUpdateItem)

    //처음에 데이터 조회하기 
    const [detaildata, setDetailData] = useState("")
    
    useEffect(()=>{
      GetProductDetail(id).then((response) => {
        setDetailData(response.data);
    });
    },[])

  //황의혁 상세페이지 작성 


  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState("사이즈를 선택하세요.");
  // options && detaildata.size[0]
  const handleSelect = (e) => setSelected(e.target.value);

  //이거 사이즈 쓰려면 이렇게 바꿔줘서 써야함 ㅇㅇ
  
  const optiondata = String(detaildata.size).split(',')

  //장바구니 추가 
   
  const handleAddCart = () => {
    
    const data = JSON.stringify({
      "size" : selected
    })
    !window.localStorage.getItem('Login') ? 
    navigate('/login')
    
    
    :
    axios.post(`${baseURL}/user/cart/${detaildata.id}`,data, {
      headers : {
          'Content-Type' : 'application/json',
          'Authorization' : window.localStorage.getItem('Login')
      }
  })
  .then(response => {
      console.log("장바구니 상품 추가 완료")
      console.log(response.data)
      alert("상품이 장바구니에 추가되었습니다.")

  })
  .catch(error => alert("올바른 사이즈를 입력하세요.") ) }


  //좋아요 버튼클릭됬을때, 아닐때

  //좋아요등록하기
  const handleAddLike = (e) => { 
    e.preventDefault();
    !window.localStorage.getItem('Login') ? 
    navigate('/login')
    
    
    :
    axios.post(`${baseURL}/user/favorite/${detaildata.id}`,{},{
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : window.localStorage.getItem('Login')
  }
  }).then((response) => {
    console.log(detaildata.check_favorite)
    
    axios.get(`${baseURL}/shop/detail/${id}`,{
    "headers" : {
      "Content-type" : "application/json",
      'Authorization' : window.localStorage.getItem('Login')

  }
  }).then( (response) => {
  setDetailData(response.data)
  console.log(detaildata.check_favorite)
  // console.log(response.data)
  }
  )

    })
}
 
//좋아요 해제하기


  const handleDeleteLike = () => {
    axios.delete(`${baseURL}/user/favorite/${detaildata.id}`,{
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : window.localStorage.getItem('Login')
      }
    }).then((response) => {

      axios.get(`${baseURL}/shop/detail/${id}`,{
    "headers" : {
      "Content-type" : "application/json",
      'Authorization' : window.localStorage.getItem('Login')

  }
  }).then( (response) => {
  setDetailData(response.data)
  console.log(detaildata.check_favorite)
  // console.log(response.data)
  }
  )
    })
  }
  return (
    <>
      
      <section className='flex flex-col md:flex-row p-4'>
        
        {/* <img className='w-full px-4 basis-7/12' src={detaildata.imgkey} alt={title} /> */}
        <img className=" w-150 px-4 basis-3/12" src={detaildata.imgKey}></img>
        <div className='w-full basis-5/12 flex flex-col p-4'>
          <p className='text-l mt-4 text-gray-700 uppercase'>{detaildata.category}</p>
          <p className='text-2xl font-bold mt-3 text-gray-700'>{detaildata.name}</p>
          <h2 className='text-3xl font-bold py-2'>{title}</h2>
          <div className='flex justify-between border-b'>
            <p className='text-2xl font-bold py-2 border-gray-400'>
              {price.toLocaleString('to-kr')}원
            </p>
            <div className='flex'>
              <div className='flex'>
                {!detaildata.check_favorite &&
                  <AiOutlineHeart size="38" onClick={handleAddLike} className=' p-1 text-lg hover:focus'> </AiOutlineHeart>}
              </div>
              <div>
                {detaildata.check_favorite &&
                  <AiFillHeart size="38" onClick={handleDeleteLike} className=' p-1 text-lg'> 좋아요 해제{detaildata.favorite} </AiFillHeart>
                }
              </div>

              <div className='pt-1.5'>{detaildata.favorite}</div>
            </div>
          </div>
          <p className='py-4 text-lg opacity-50'>{detaildata.description}</p>

          {/* 상품 재고  */}
          {detaildata &&
            detaildata.stock <= 10 ? <div className='font-bold'> 품절임박 남은 재고 수 : {detaildata.stock} </div> : ''}
          <div className='flex items-center'>
            <label className='text-black font-bold' htmlFor='select'>
              옵션:
            </label>
            <select
              id='select'
              className='p-1 m-4 flex-3 border-2 border-black outline-none'
              onChange={handleSelect}
              value={selected}
            >
             <option>사이즈를 선택하세요.</option>
              
              
              {optiondata &&
                optiondata.map((option, index) => (
                  
                  <option key={index}>{option}</option>
                ))}
            </select>

            {/* 내가만든 select */}
              {/* <select>
              {detaildata.size.split("").map((val,idx) => (
                    <option key={idx}> {val}</option>))}
              </select> */}
          </div>
          {success && <p className='my-2'>✅{success}</p>}

          <span className='flex justify-end'>
            {/* <Button text='장바구니에 추가' onClick={handleAddCart}/> */}
          
            {selected === "사이즈를 선택하세요." ? 
              // <Button text ="Select the size" />
              <Button text = "Select the size" disabled={true}></Button>
              // <button className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled>Select the size</button>
            :
            !window.localStorage.getItem('Login') ? 
            navigate('/login')
            :
            <>
              <Button text="ADD TO CART"onClick={handleAddCart}/>
              {/* <button type="submit"  onClick={handleAddCart} className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mr-3">ADD TO CART</button> */}
              <Link to ='/order' state = {{product : detaildata, from : 'details', size :selected,}}>
                <Button text="BUY"/>
                {/* <button className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">BUY</button> */}
              </Link>
            </>
}
          </span>
        </div>
      </section>
    </>
  );
}
