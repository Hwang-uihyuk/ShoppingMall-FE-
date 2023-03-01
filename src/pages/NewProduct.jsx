import React, { useEffect, useState } from 'react';
import Button from '../components/ui/Button';
//aws
import AWS from 'aws-sdk';
import axios from 'axios';
import { v1, v3, v4, v5 } from 'uuid'
import { mockComponent } from 'react-dom/test-utils';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { checkSpecKeys } from 'react-slick/lib/utils/innerSliderUtils';


const baseURL = process.env.REACT_APP_URL;
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
const REGION = process.env.REACT_APP_REGION
const S3_BUCKET = process.env.REACT_APP_S3_BUCKET
const IMG_KEY = process.env.REACT_APP_IMG_KEY

export default function NewProduct() {
  const navigate = useNavigate();

  const AWS = require('aws-sdk');
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [key, setKey] = useState("")
  AWS.config.update({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY
  });

  const myBucket = new AWS.S3({
    params: { Bucket: 'mallimageupload'},
    region: REGION,
  });

  //업로드 버튼 누를 시(true)에만 버튼이 활성화 되게 해야한다.
  const [checkupload, setCheckUpload] = useState(false);
  
  useEffect(() => {
    return() => {
      setCheckUpload(false)
      }
  }, [navigate])
  /// 다른 페이지 이동하면 이렇게 된다 .

  
  //파일선택시
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    if (file.type !== 'image/jpeg' || fileExt !== 'jpg') {
      alert('jpg 파일만 Upload 가능합니다.');
      return;
    }
    setProgress(0);
    setSelectedFile(e.target.files[0]);
  }

  //

  const uploadFile = (file) => {
    var params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: `image/${v1().toString().replace("-", "")}.${file.type.split("/")[1]}`,
      ContentType: file.type,
    };
    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100))
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setSelectedFile(null);
        }, 3000)
        setKey(params.Key)
        //업로드 true값으로
        setCheckUpload(prev => !prev)
        alert("success")
      })
      .send((err) => {
        if (err) console.log(err)
      })
  }
  const [productname, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [size, setSize] = useState('')

  const handleChangeProductName = (e) => {
    setProductName(e.currentTarget.value)
  }
  const handleChangePrice = (e) => {
    setPrice(e.currentTarget.value)
  }
  const handleChangeCategory = (e) => {
    setCategory(e.currentTarget.value)
  }
  const handleChangeDescription = (e) => {
    setDescription(e.currentTarget.value)
  }
  const handleChangeSize = (e) => {
    setSize(e.currentTarget.value)
  }


  // let month = (today.getMonth()+1)<10? '0':'' + today.getMonth()+ 1;


  // const test = new moment('2020-01-01 00:00:00').format('LLL');
  // console.log('sdf',typeof(test))

  
  const handleSubmit = (e) => {
    
    e.preventDefault();

    let time = ""
    
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);

    let date = ('0' + (today.getDate())).slice(-2);
    let hours = ('0' + (today.getHours())).slice(-2);
    let minutes = ('0' + (today.getMinutes())).slice(-2);
    let seconds = ('0' + (today.getSeconds())).slice(-2);

    time = year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds

    const data = JSON.stringify({
      "name": productname,
      "price": price,
      "category": category,
      "description": description,
      "size": size,
      "imgKey": `${IMG_KEY}/${key}`,
      "date": time
    })
    
    axios.post(`${baseURL}/register/product`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": window.localStorage.getItem('Login')
      }
    }).then((response) => {
     
      console.log("suceess")
      console.log(data)
      
      alert('상품이 등록되었습니다.')
      document.location.href = '/products'
    }).catch((error) => alert('형식에 맞는 입력 값을 넣어주세요.'))

    
  }
  
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          {/* <img className="w-8 h-8 mr-2" src="" alt="logo"/> */}
      Upload New Product
      </div>


      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      {/* aws */}
      
      <form className='flex flex-col px-12 space-y-2.5' onSubmit={handleSubmit}>

      <div className="App-body">
       
       <label for="Id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File upload</label>
     <input color="primary" 
     type="file"
    onChange={handleFileInput}
    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   
    />
     
     
     {selectedFile ? (
       <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" color="primary" onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
     ) : null}
   </div>

      <label for="Id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product name</label>
        <input
          type="text"
          name="name"
          placeholder='상품명'
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
          onChange={handleChangeProductName}
        />
        <label for="Id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
        <input
          type="text"
          name="price"
          placeholder='가격'
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
          onChange={handleChangePrice}
        />
        <label for="Id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
        <input
          type="text"
          name="category"
          placeholder='카테고리'
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
          onChange={handleChangeCategory}
        />
        <label for="Id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
        <input
          type="text"
          name="description"
          placeholder='설명'
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
          onChange={handleChangeDescription}
        />
        <label for="Id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Options</label>
        <input
          type='text'
          name='size'
          placeholder='옵션들(콤마(,)로 구분)'
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
          onChange={handleChangeSize}
        />
        {checkupload ? (productname&&price&&category&&description&&size ?<button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSubmit}>등록하기</button> : <div className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">모든 정보를 입력해주세요.</div>)
        : <div className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> upload를 먼저 해주세요.</div>}
        
      </form>
      </div>
      </div>
    </section>



  );
}