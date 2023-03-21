import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { LoadRegisteredProductDetail, AddProductStock, EditProductInfo } from '../api/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function EditProductDetail() {
    const location = useLocation();
    const [editform, setEditForm] = useState({})
    const [addStock, setAddStock] = useState(0)
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

    
    const [changeform, setChangeForm] = useState({})

    const id = location.state.product.id;
    // const onchangeinput = (e) => {
    //     setdata(e.currentTarget.value)
    // }

    useEffect(()=>{
      LoadRegisteredProductDetail(id).then((response) => {
            console.log("수정할 데이터 값을 가져왔습니다.");
            setEditForm(response.data)
            setChangeForm(response.data)
         })
         .catch((error) => console.log(error))
    },[] )
    
    //상품 재고 갯수 변경하기
    const ChangeStock = () =>{
        var stock = 0
         stock = prompt("재고를 몇개 추가하시겠습니까?")
        if(!stock){
          alert("추가하실 상품의 갯수를 정확히 입력하세요.")
        }
        else {
        setEditForm((prevState)=>{
            return { ...prevState, stock : editform.stock + parseInt(stock)}
        })
        setAddStock(stock)
        // console.log(editform)
    
        //처음에 데이터 값을 가져오고 
        // put을 해줘서 stock 값을 변경시켜주는건데

        console.log(editform.id)
        console.log(stock)
        const data = JSON.stringify({
            "product_id" : editform.id,
            "stock" : stock
        })
        AddProductStock(data).then(res => { alert('상품 재고가 변경되었습니다.')
        })
      }
    }

    
    // 상품 이름 변경
  const EditName = (e) => {
    //   setEditForm(data => {return{...data, name : e.target.value}})
    setChangeForm(data => {return{...data, name : e.target.value}})
  }
  const EditNameBtn = (e) =>{
      const data = JSON.stringify({
        "name" : changeform.name,
        "price" : editform.price,
        "category" : editform.category,
        "description" : editform.description,
        "size" : editform.size,
        "imgKey" : editform.imgKey
      })
      EditProductInfo(data).then(res => {})
     
      setEditForm(changeform)
      console.log(data.name)
      alert('상품이 수정되었습니다.')
      setHide(prev =>!prev)
  }

  //상품 가격 변경
  const EditPrice = (e) => {
    setChangeForm(data => {return {...data, price : e.target.value}})
  }
  const EditPriceBtn = (e) => {
    const data = JSON.stringify({
        "name" : editform.name,
        "price" : changeform.price,
        "category" : editform.category,
        "description" : editform.description,
        "size" : editform.size,
        "imgKey" : editform.imgKey
      })
      EditProductInfo(data).then(res => {})

      setEditForm(changeform)
      console.log(editform)
      alert('상품이 수정되었습니다.')
      setHide(prev =>!prev)
  }
  //상품 카테고리 변경
  const EditCategory = (e) => {
    setChangeForm(data => {return {...data,  category : e.target.value}})
}
const EditCategoryBtn = (e) => {
    const data = JSON.stringify({
        "name" : editform.name,
        "price" : editform.price,
        "category" : changeform.category,
        "description" : editform.description,
        "size" : editform.size,
        "imgKey" : editform.imgKey
      })
      EditProductInfo(data).then(res => {})
    setEditForm(changeform)
    alert('상품이 수정되었습니다.')    
    setHide(prev =>!prev)
}

  //상품 설명 변경
  const EditDescription = (e) => {
    setChangeForm(data => {return {...data,  description : e.target.value}})
}
const EditDescriptionBtn = (e) => {
    const data = JSON.stringify({
        "name" : editform.name,
        "price" : editform.price,
        "category" : editform.category,
        "description" : changeform.description,
        "size" : editform.size,
        "imgKey" : editform.imgKey
      })
      EditProductInfo(data).then(res => {})
    setEditForm(changeform)
    console.log(data.description)
    alert('상품이 수정되었습니다.')      
    setHide(prev =>!prev)
}
  
  //상품 사이즈 변경
  const EditSize = (e) => {
    setChangeForm(data => {return {...data,  size : e.target.value}})
}
const EditSizeBtn = (e) => {
    const data = JSON.stringify({
        "name" : editform.name,
        "price" : editform.price,
        "category" : editform.category,
        "description" : editform.description,
        "size" : changeform.size,
        "imgKey" : editform.imgKey
      })
      EditProductInfo(data).then(res => {})
    setEditForm(changeform)
    alert('상품이 수정되었습니다.')      
    setHide(prev =>!prev)
}
  //상품 이미지 변경
  
  // const HideHandler = (value, res) => {
  //     // let res = value.replace('hide.','')
  //     value === false ? setHide(data => { return {...data, res : true}})
  //     : setHide(data => {return {...data, res : false}})
  // }

  return (              
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          
            Shoppy      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Fix Your Produts
              </h1>
        
        <li>상품 아이디는 : "{editform.id}"</li>
        <li>제고 현황 : {editform.stock}</li>
          <Button text="상품 재고 추가하기" onClick={ChangeStock}/>
          <div className='font-bold text-xl'>상품 정보 </div>  
          <div>상품 이미지 <img width="150"src = {editform.imgKey}/></div>

        {/* 상품 이름 form */}
        <div>  상품 이름은 : "{editform.name}"
        <Button text="변경" onClick={() => {
            hide.name === false ? setHide(data => { return {...data, name : true }})
            : setHide(data => {return {...data,name :false}})
        }}/>
        

        {hide.name && 
        <div>
            <div className='font-bold'>상품 이름 변경</div>
            <Input onChange={EditName}/>
            {/* <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text"  
            onChange={EditName}></input>     */}
            <div className='mb-3'>
            <Button text='변경' onClick={EditNameBtn}/>
            </div>
            <Button text="취소 " onClick={() => {
            hide.name === false ? setHide(data => { return {...data, name : true }})
            : setHide(data => {return {...data,name :false}})
        }}></Button>
        </div>}
        
        </div>
      

      {/* 상품 가격 form */}
      <div>  상품 가격은 : "{editform.price}"
      <Button text ="변경"  onClick={() => {
            hide.price === false ? setHide(data => { return {...data, price : true }})
            : setHide(data => {return {...data,price :false}})
        }}></Button>

        
        {hide.price && 
        <div>
            <div className='font-bold'>상품 가격 변경</div>
            <Input onChange={EditPrice}/>   
            <div className='mb-3'>
            <Button text="변경"  onClick={EditPriceBtn}/>
            </div>
            <Button text="취소" onClick={() => {
            hide.price === false ? setHide(data => { return {...data, price : true }})
            : setHide(data => {return {...data,price :false}})
        }}/>
            
        </div>}
        </div>

        {/* 상품 카테고리 form */}
      <div>  상품 카테고리는 : "{editform.category}"
        <Button text="변경" onClick={() => {
            hide.category === false ? setHide(data => { return {...data, category : true }})
            : setHide(data => {return {...data,category :false}})
        }}/>
       
        {hide.category && 
        <div>
            <div className='font-bold'>상품 카테고리 변경</div>
            <Input onChange={EditCategory}/>   
            <div className='mb-3'>
            <Button text ="변경" onClick={EditCategoryBtn}/>
            </div>
            <Button text="취소" onClick={() => {
            hide.category === false ? setHide(data => { return {...data, category : true }})
            : setHide(data => {return {...data,category :false}})
        }}/>
            
        </div>}
        </div>


{/* 상품 설명 form */}
<div>  상품 설명은 : "{editform.description}"
        <Button text ="변경" onClick={() => {
            hide.description === false ? setHide(data => { return {...data, description : true }})
            : setHide(data => {return {...data,description :false}})
        }}/>
        
        {hide.description && 
        <div>
            <div className='font-bold'>상품 설명 변경</div>
            <Input onChange={EditDescription}/>   
            <div className='mb-3'> 
            <Button text="변경"  onClick={EditDescriptionBtn}></Button>
            </div>
            <Button text="취소" onClick={() => {
            hide.description === false ? setHide(data => { return {...data, description : true }})
            : setHide(data => {return {...data,description :false}})
        }}/>
            
        </div>}
        </div>

{/* 상품 사이즈 form */}
<div>  상품 사이즈 : "{editform.size}"
        <Button text= "변경" onClick={() => {
            hide.size === false ? setHide(data => { return {...data, size : true }})
            : setHide(data => {return {...data,size :false}})
        }}/>
        
        {hide.size && 
        <div>
            <div className='font-bold'>사이즈 변경</div>
            <Input onChange={EditSize}/>
            <div className='mb-3'>
            <Button text ="변경" onClick={EditSizeBtn}></Button>    
            </div>
            <Button text="취소" onClick={() => {
            hide.size === false ? setHide(data => { return {...data, size : true }})
            : setHide(data => {return {...data,size :false}})
        }}/>      
        </div>}
</div>
        {/* </form> */}
        </div>
        </div>
        </div>
        </section>
  )
}
