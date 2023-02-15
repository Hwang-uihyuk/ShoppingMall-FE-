import React, { useState } from 'react';
import { useLocation,Link } from 'react-router-dom';
import Button from '../components/ui/Button';

import useCart from '../components/hooks/useCart';
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';


export default function ProductDetail() {

  const { addOrUpdateItem } = useCart();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();

  // console.log(addOrUpdateItem)

  
  //황의혁 작성 상세페이지 위에 것 누가?
  //처음에 데이터 조회하기 
  const [detaildata, setDetailData] = useState("")
  
  useEffect(()=>{
    axios.get(`http://3.38.35.43:8080/shop/detail/${id}`,{
    "headers" : {
      "Content-type" : "application/json",
      'Authorization' : window.localStorage.getItem('Login')

  }
  }).then( (response) => {
  setDetailData(response.data)
  // console.log(response.data)
  }
  )},[])
console.log(detaildata)

  //황의혁 상세페이지 작성 


  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(options && detaildata.size[0]);
  const handleSelect = (e) => setSelected(e.target.value);

  const handleClick = (e) => {
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess('장바구니에 추가되었습니다.');
        setTimeout(() => setSuccess(null), 3000);
      },
    });
  };
  
  //이거 사이즈 쓰려면 이렇게 바꿔줘서 써야함 ㅇㅇ
  
  const optiondata = String(detaildata.size).split('').filter(v => v!==',')



  //장바구니 추가 
  const handleAddCart = () => {
    const data = JSON.stringify({
      "size" : selected
    })
    axios.post(`http://3.38.35.43:8080/user/cart/${detaildata.id}`,data, {
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
  .catch(error => console.log(error))  }


  //좋아요 버튼클릭됬을때, 아닐때

  //좋아요등록하기
  const handleAddLike = (e) => { 
    e.preventDefault();
    axios.post(`http://3.38.35.43:8080/user/favorite/${detaildata.id}`,{},{
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : window.localStorage.getItem('Login')
  }
  }).then((response) => {
    console.log(detaildata.check_favorite)
    
    axios.get(`http://3.38.35.43:8080/shop/detail/${id}`,{
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

    alert('좋아요 등록됬습니다')})
}
 
//좋아요 해제하기


  const handleDeleteLike = () =>{
    axios.delete(`http://3.38.35.43:8080/user/favorite/${detaildata.id}`,{
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : window.localStorage.getItem('Login')
      }
    }).then((response) => {
      axios.get(`http://3.38.35.43:8080/shop/detail/${id}`,{
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
      <p className='mx-12 mt-4 text-gray-700'>{detaildata.category}</p>
      <section className='flex flex-col md:flex-row p-4'>
        {/* <img className='w-full px-4 basis-7/12' src={detaildata.imgkey} alt={title} /> */}
        <img className=" w-150 px-4 basis-3/12" src={detaildata.imgKey}></img>
        <div className='w-full basis-5/12 flex flex-col p-4'>
          <h2 className='text-3xl font-bold py-2'>{title}</h2>
          <p className='text-2xl font-bold py-2  border-b border-gray-400'>
            ₩{price}
          </p>
          <p className='py-4 text-lg'>{detaildata.description}description</p>
          <div className='flex items-center'>
            <label className='text-brand font-bold' htmlFor='select'>
              옵션:
            </label>
            
            
            <select
              id='select'
              className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none'
              onChange={handleSelect}
              value={selected}
            >
              
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
          <span className='flex'>
          <Button text='장바구니에 추가' onClick={handleAddCart} />
          <Link to ='/order' state = {{product : detaildata}}>
            <Button text='상품구매하기'/>
          </Link>

          {!detaildata.check_favorite && <button onClick={handleAddLike} className='bg-slate-100 border'> 좋아요{detaildata.favorite} </button>}
          {detaildata.check_favorite && <button onCLick={handleDeleteLike} className='bg-slate-100 border'> 좋아요 해제{detaildata.favorite} </button>}
          </span>
        </div>
      </section>
    </>
  );
}
