import React, { useState } from 'react';
import { addNewProduct } from '../api/firebase';
import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';
//aws
import AWS from 'aws-sdk';
import axios from 'axios';
import { v1,v3,v4,v5} from 'uuid'
import { mockComponent } from 'react-dom/test-utils';

export default function NewProduct() {
  // const [product, setProduct] = useState({});
  // const [file, setFile] = useState();
  // const [isUploading, setIsUploading] = useState(false);
  // const [success, setSuccess] = useState();

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   if (name === 'file') {
  //     setFile(files && files[0]);
  //     console.log(files[0]);
  //     return;
  //   }
  //   setProduct((product) => ({ ...product, [name]: value }));
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsUploading(true);
  //   uploadImage(file) //
  //     .then((url) => {
  //       addNewProduct(product, url) //
  //         .then(() => {
  //           setSuccess('성공적으로 제품이 추가되었습니다.');
  //           setTimeout(() => {
  //             setSuccess(null);
  //           }, 4000);
  //         });
  //     })
  //     .finally(() => setIsUploading(false));
  // };

  //aws
  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [key, setKey] = useState("")
const ACCESS_KEY = 'AKIAXARKUXBXVU2GBY5S';
const SECRET_ACCESS_KEY = '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';
const REGION = 'ap-northeast-2';
const S3_BUCKET = 'mallimageupload';


AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REGION,
});

//파일선택시
const handleFileInput = (e) => {
  const file = e.target.files[0];
  const fileExt = file.name.split('.').pop();
  if(file.type !== 'image/jpeg' || fileExt !=='jpg'){
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
    Key: `image/${v1().toString().replace("-","")}.${file.type.split("/")[1]}`,
    ContentType : file.type,
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
     alert("success") 
     
    })
    .send((err) => {
      if (err) console.log(err)
    })
}

const [productname, setProductName] = useState('')
const [price,setPrice] = useState('')
const [category,setCategory] = useState('')
const [description,setDescription] = useState('')
const [size,setSize] = useState('')

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

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth()+ 1;
let date = today.getDate();
let hours = today.getHours();
let minutes = today.getMinutes()<10 ? '0':'' + today.getMinutes();
let seconds = today.getSeconds();
let millseconds = today.getMilliseconds();

let time = ""
time = year + "-" + month + "-" + date + "T" +hours + ":" + minutes + ":" + seconds
console.log(time)

// const test = new moment('2020-01-01 00:00:00').format('LLL');
// console.log('sdf',typeof(test))

var test = moment();
console.log(typeof(test.format()))
console.log(test)

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(key)
  const data = JSON.stringify({
    "name" : productname,
    "price" : price,
    "category" : category,
    "description" : description,
    "size" : size,
    "imgKey" : "http/"+key,
    "date" : time
  })
  axios.post(`http://3.38.35.43:8080/register/product`,data,{
    headers: {
      "Content-Type": "application/json",
      "Authorization" : window.localStorage.getItem('Login')
    }
  }).then((response) => {
    console.log("sucees")
    console.log(response)
  })
  .catch((error) => console.log(error))
}
  return (
    <section className='w-full text-center'>
     {/* aws */}
     
      {/* <div className="App-header">  */}
      
      <div className="App-body">
            {/* { showAlert?
              alert(`업로드 진행률 : ${progress}%`)
               :
              alert(`파일을 선택해주세요.`)
            } */}
      <input color="primary" type="file" onChange={handleFileInput}/>
      {selectedFile?(
      <button color="primary" onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
            ) : null }     
      </div>

      <form className='flex flex-col px-12' onSubmit={handleSubmit}>
      <input 
      type="text"
      name="name"
      placeholder='상품명'
      required
      onChange={handleChangeProductName}
      />
<input 
      type="text"
      name="price"
      placeholder='가격'
      required
      onChange={handleChangePrice}
      />
<input 
      type="text"
      name="category"
      placeholder='카테고리'
      required
      onChange={handleChangeCategory}
      />
<input 
      type="text"
      name="description"
      placeholder='설명'
      required
      onChange={handleChangeDescription}
      />
<input
      type='text'
          name='size'
          placeholder='옵션들(콤마(,)로 구분)'
          required
          onChange={handleChangeSize}
        />
      <button onClick={handleSubmit}>등록하기</button>
</form>

      {/* cloudiary */}
      {/* <h2 className='text-2xl font-bold my-4'>새로운 제품 등록</h2>
      {success && <p className='my-2'>✅ {success}</p>}
      {file && (
        <img
          className='w-96 mx-auto mb-2'
          src={URL.createObjectURL(file)}
          alt='local file'
        />
      )}
      <form className='flex flex-col px-12' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          name='file'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='제품명'
          required
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          value={product.price ?? ''}
          placeholder='가격'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          placeholder='카테고리'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='description'
          value={product.description ?? ''}
          placeholder='제품 설명'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='options'
          value={product.options ?? ''}
          placeholder='옵션들(콤마(,)로 구분)'
          required
          onChange={handleChange}
        />
        <Button
          text={isUploading ? '업로드중...' : '제품 등록하기'}
          disabled={isUploading}
        />
      </form> */}
    </section> 


        
  );
}
