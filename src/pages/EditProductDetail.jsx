import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { PostEditProduct } from '../api/api';

const baseURL = process.env.REACT_APP_URL;

export default function EditProductDetail() {
    const location = useLocation();
    const [editform, setEditForm] = useState({})
    
    // console.log(editform);
    const [data, setData] = useState(({
        name : editform.name,
		price : editform.price,
		category : editform.category,
		description : editform.description,
		size : editform.size,
		imgKey : editform.imgKey
    }))

    const [hide, setHide] = useState({
        name : false,
        price : false,
        category : false,
        description : false,
        size : false,
        imgkey : false
    })

    const id = location.state.product.id;
    // const onchangeinput = (e) => {
    //     setdata(e.currentTarget.value)
    // }

    useEffect(()=>{
        axios({
            method: "get",
            url : `${baseURL}/register/product/${id}`, //url이 안먹히는듯
            headers: {  
             "Content-Type": "application/json",
              "Authorization" : window.localStorage.getItem('Login')
            }
        }).then((response) => {
            console.log("수정할 데이터 값을 가져왔습니다.");
            
            setEditForm(response.data)
    
         })
         .catch((error) => console.log(error))
    },[] )
    
    //상품 재고 갯수 변경하기
    const ChangeStock = () =>{

        const stock = prompt("재고 현황을 변경하시겠습니까?")
        setEditForm((prevState)=>{
            return { ...prevState, stock : stock}
        })
        // console.log(editform)
    
        //처음에 데이터 값을 가져오고 
        // put을 해줘서 stock 값을 변경시켜주는건데

        console.log(editform.id)
        console.log(stock)
        const data = JSON.stringify({
            "product_id" : editform.id,
            "stock" : stock
        })

        axios.put(`${baseURL}/register/product/add_stock`,data
        ,{
            headers: {
                'Content-Type' : 'application/json',
                "Authorization" : window.localStorage.getItem('Login')
            }
        }).then(res => {})
    }
    // 상품 이름 변경
  const EditName = (e) => {
      setEditForm(data => {return{...data, name : e.target.value}})
  }
  const EditNameBtn = (e) =>{
      
      PostEditProduct(editform)
      console.log(data.name)
      alert('상품이 수정되었습니다.')
      setHide(prev =>!prev)
  }

  //상품 가격 변경
  const EditPrice = (e) => {
      setEditForm(data => {return {...data, price : e.target.value}})
  }
  const EditPriceBtn = (e) => {
      PostEditProduct(editform)
      console.log(editform)
      alert('상품이 수정되었습니다.')
      setHide(prev =>!prev)
  }
  //상품 카테고리 변경
  const EditCategory = (e) => {
    setEditForm(data => {return {...data,  category : e.target.value}})
}
const EditCategoryBtn = (e) => {
    PostEditProduct(editform)
    alert('상품이 수정되었습니다.')    
    setHide(prev =>!prev)
}

  //상품 설명 변경
  const EditDescription = (e) => {
    setEditForm(data => {return {...data,  description : e.target.value}})
}
const EditDescriptionBtn = (e) => {
    PostEditProduct(editform)
    console.log(data.description)
    alert('상품이 수정되었습니다.')      
    setHide(prev =>!prev)
}
  
  //상품 사이즈 변경
  const EditSize = (e) => {
    setEditForm(data => {return {...data,  size : e.target.value}})
}
const EditSizeBtn = (e) => {
    PostEditProduct(editform)
    alert('상품이 수정되었습니다.')      
    setHide(prev =>!prev)
}
  //상품 이미지 변경
  


  
  return (              
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          {/* <img className="w-8 h-8 mr-2" src="" alt="logo"/> */}
            Shoppy      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Fix Your Produts
              </h1>
        {/* <form className="space-y-4 md:space-y-6"> */}
        {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Id</label> */}
        <li>상품 아이디는 : "{editform.id}"</li>
        <li>제고 현황 : {editform.stock}</li>
        <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={ChangeStock}> 상품 재고 변경하기</button>

          <div className='font-bold text-xl'>상품 정보 </div>  
          <div>상품 이미지 <img width="150"src = {editform.imgKey}/></div>

        {/* 상품 이름 form */}
        <div>  상품 이름은 : "{editform.name}"
        <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={() => {
            hide.name === false ? setHide(data => { return {...data, name : true }})
            : setHide(data => {return {...data,name :false}})
        }}>변경</button>
        {hide.name && 
        <div>
            <div className='font-bold'>상품 이름 변경</div>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text"  onChange={EditName}></input>    
            <button className=" mb-3 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={EditNameBtn}>변경</button > 
            <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={() => {
            hide.name === false ? setHide(data => { return {...data, name : true }})
            : setHide(data => {return {...data,name :false}})
        }}>취소</button>
        </div>}
        
        </div>
      

      {/* 상품 가격 form */}
      <div>  상품 가격은 : "{editform.price}"
        <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={() => {
            hide.price === false ? setHide(data => { return {...data, price : true }})
            : setHide(data => {return {...data,price :false}})
        }}>변경</button>
        {hide.price && 
        <div>
            <div className='font-bold'>상품 가격 변경</div>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text"  onChange={EditPrice}></input>    
            <button className="mb-3 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"  onClick={EditPriceBtn}>변경</button > 
            <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={() => {
            hide.price === false ? setHide(data => { return {...data, price : true }})
            : setHide(data => {return {...data,price :false}})
        }}>취소</button>
        </div>}
        </div>

        {/* 상품 카테고리 form */}
      <div>  상품 카테고리는 : "{editform.category}"
        <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={() => {
            hide.category === false ? setHide(data => { return {...data, category : true }})
            : setHide(data => {return {...data,category :false}})
        }}>변경</button>
        {hide.category && 
        <div>
            <div className='font-bold'>상품 카테고리 변경</div>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text"  onChange={EditCategory}></input>    
            <button className="mb-3 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"  onClick={EditCategoryBtn}>변경</button > 
            <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={() => {
            hide.category === false ? setHide(data => { return {...data, category : true }})
            : setHide(data => {return {...data,category :false}})
        }}>취소</button>
        </div>}
        </div>


{/* 상품 설명 form */}
<div>  상품 설명은 : "{editform.description}"
        <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={() => {
            hide.description === false ? setHide(data => { return {...data, description : true }})
            : setHide(data => {return {...data,description :false}})
        }}>변경</button>
        {hide.description && 
        <div>
            <div className='font-bold'>상품 설명 변경</div>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text"  onChange={EditDescription}></input>    
            <button className="mb-3 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"  onClick={EditDescriptionBtn}>변경</button > 
            <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={() => {
            hide.description === false ? setHide(data => { return {...data, description : true }})
            : setHide(data => {return {...data,description :false}})
        }}>취소</button>
        </div>}
        </div>

{/* 상품 사이즈 form */}
<div>  상품 사이즈은 : "{editform.size}"
        <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={() => {
            hide.size === false ? setHide(data => { return {...data, size : true }})
            : setHide(data => {return {...data,size :false}})
        }}>변경</button>
        {hide.size && 
        <div>
            <div className='font-bold'>사이즈 변경</div>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text"  onChange={EditSize}></input>    
            <button className="mb-3 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"  onClick={EditSizeBtn}>변경</button > 
            <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={() => {
            hide.size === false ? setHide(data => { return {...data, size : true }})
            : setHide(data => {return {...data,size :false}})
        }}>취소</button>
        </div>}
</div>
        
        
        
        {/* </form> */}
        </div>
        </div>
        </div>
        </section>
  )
}
