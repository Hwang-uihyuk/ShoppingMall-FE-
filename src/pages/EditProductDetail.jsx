import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Categories from '../components/Categories';
import { PostEditProduct } from '../api/api';

export default function EditProductDetail() {
    const location = useLocation();
    const [editform, setEditForm] = useState({})

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
            url : `http://3.38.35.43:8080/register/product/${id}`, //url이 안먹히는듯
            headers: {  
             "Content-Type": "application/json",
              "Authorization" : window.localStorage.getItem('Login')
            }
        }).then((response) => {
            console.log("수정할 데이터 값을 가져왔습니다.");
            console.log(id)
            console.log(response.data)
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


        axios.put(`http://3.38.35.43:8080/register/product/add_stock`,{
            "product_id":editform.id   ,
            "stock" :stock


            
        },{
            headers: {
                'Content-Type' : 'application/json',
                "Authorization" : window.localStorage.getItem('Login')
            }
        })
    }
    // 상품 이름 변경
  const EditName = (e) => {
      setEditForm(data => {return{...data, name : e.target.value}})
  }
  const EditNameBtn = (e) =>{
      PostEditProduct(editform)
  }

  //상품 가격 변경
  const EditPrice = (e) => {
      setEditForm(data => {return {...data, price : e.target.value}})
  }
  const EditPriceBtn = (e) => {
      PostEditProduct(editform)
  }
  //상품 카테고리 변경
  const EditCategory = (e) => {
    setEditForm(data => {return {...data,  category : e.target.value}})
}
const EditCategoryBtn = (e) => {
    PostEditProduct(editform)
}

  //상품 설명 변경
  const EditDescription = (e) => {
    setEditForm(data => {return {...data,  description : e.target.value}})
}
const EditDescriptionBtn = (e) => {
    PostEditProduct(editform)
}
  
  //상품 사이즈 변경
  const EditSize = (e) => {
    setEditForm(data => {return {...data,  size : e.target.value}})
}
const EditSizeBtn = (e) => {
    PostEditProduct(editform)
}
  //상품 이미지 변경
  


  
  return (
    <div>
        <li>상품 아이디는 : "{editform.id}"</li>
        <li>제고 현황 : {editform.stock}</li>
        <button className ="border"onClick={ChangeStock}> 상품 재고 변경하기</button>

          <div className='font-bold text-xl'>여기바꿀것 </div>  
        {/* 바꿀곳 */}        

        {/* 상품 이름 form */}
        <div>  상품 이름은 : "{editform.name}"
        <button className='border' onClick={() => {
            hide.name === false ? setHide(data => { return {...data, name : true }})
            : setHide(data => {return {...data,name :false}})
        }}>변경</button>
        {hide.name && 
        <div>
            <div className='font-bold'>^상품 이름 변경^</div>
            <input type="text"  onChange={EditName}></input>    
            <button className ="border" onClick={EditNameBtn}>변경</button > 
            <button className='border' onClick={() => {
            hide.name === false ? setHide(data => { return {...data, name : true }})
            : setHide(data => {return {...data,name :false}})
        }}>취소</button>
        </div>}
        
        </div>
      

      {/* 상품 가격 form */}
      <div>  상품 가격은 : "{editform.price}"
        <button className='border' onClick={() => {
            hide.price === false ? setHide(data => { return {...data, price : true }})
            : setHide(data => {return {...data,price :false}})
        }}>변경</button>
        {hide.price && 
        <div>
            <div className='font-bold'>^상품 이름 변경^</div>
            <input type="text"  onChange={EditPrice}></input>    
            <button className ="border" onClick={EditPriceBtn}>변경</button > 
            <button className='border' onClick={() => {
            hide.price === false ? setHide(data => { return {...data, price : true }})
            : setHide(data => {return {...data,price :false}})
        }}>취소</button>
        </div>}
        </div>

        {/* 상품 카테고리 form */}
      <div>  상품 카테고리는 : "{editform.category}"
        <button className='border' onClick={() => {
            hide.category === false ? setHide(data => { return {...data, category : true }})
            : setHide(data => {return {...data,category :false}})
        }}>변경</button>
        {hide.category && 
        <div>
            <div className='font-bold'>^상품 이름 변경^</div>
            <input type="text"  onChange={EditCategory}></input>    
            <button className ="border" onClick={EditCategoryBtn}>변경</button > 
            <button className='border' onClick={() => {
            hide.category === false ? setHide(data => { return {...data, category : true }})
            : setHide(data => {return {...data,category :false}})
        }}>취소</button>
        </div>}
        </div>


{/* 상품 설명 form */}
<div>  상품 설명은 : "{editform.description}"
        <button className='border' onClick={() => {
            hide.description === false ? setHide(data => { return {...data, description : true }})
            : setHide(data => {return {...data,description :false}})
        }}>변경</button>
        {hide.description && 
        <div>
            <div className='font-bold'>^상품 이름 변경^</div>
            <input type="text"  onChange={EditDescription}></input>    
            <button className ="border" onClick={EditDescriptionBtn}>변경</button > 
            <button className='border' onClick={() => {
            hide.description === false ? setHide(data => { return {...data, description : true }})
            : setHide(data => {return {...data,description :false}})
        }}>취소</button>
        </div>}
        </div>

{/* 상품 사이즈 form */}
<div>  상품 사이즈은 : "{editform.size}"
        <button className='border' onClick={() => {
            hide.size === false ? setHide(data => { return {...data, size : true }})
            : setHide(data => {return {...data,size :false}})
        }}>변경</button>
        {hide.size && 
        <div>
            <div className='font-bold'>^상품 이름 변경^</div>
            <input type="text"  onChange={EditSize}></input>    
            <button className ="border" onClick={EditSizeBtn}>변경</button > 
            <button className='border' onClick={() => {
            hide.size === false ? setHide(data => { return {...data, size : true }})
            : setHide(data => {return {...data,size :false}})
        }}>취소</button>
        </div>}
        </div>
        
        
        <li>상품 이미지 : "<img width="150"src = {editform.imgKey}/>"</li>
        
    </div>
  )
}
