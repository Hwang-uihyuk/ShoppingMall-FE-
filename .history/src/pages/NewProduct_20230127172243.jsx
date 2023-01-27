import React, { useState } from 'react';
import { addNewProduct } from '../api/firebase';
import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';
//aws
import AWS from 'aws-sdk';



export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      console.log(files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file) //
      .then((url) => {
        addNewProduct(product, url) //
          .then(() => {
            setSuccess('성공적으로 제품이 추가되었습니다.');
            setTimeout(() => {
              setSuccess(null);
            }, 4000);
          });
      })
      .finally(() => setIsUploading(false));
  };

  //aws
  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const myBucket = new AWS.S3({
  params: { Bucket: process.env.S3_BUCKET},
  region: process.env.REGION,
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
  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: process.env.S3_BUCKET,
    Key: "upload/" + file.name
  };
  
  myBucket.putObject(params)
    .on('httpUploadProgress', (evt) => {
      setProgress(Math.round((evt.loaded / evt.total) * 100))
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setSelectedFile(null);
      }, 3000)
    })
    .send((err) => {
      if (err) console.log(err)
    })
}



  return (
    <section className='w-full text-center'>
     {/* aws */}
     <div className="App">
      <div className="App-header"> 
      </div>
      <div className="App-body">
        
         
            { showAlert?
              <alert color="primary">업로드 진행률 : {progress}%</alert>
              : 
              <alert color="primary">파일을 선택해 주세요.</alert> 
            }
          
        
        
          
            <input color="primary" type="file" onChange={handleFileInput}/>
            {selectedFile?(
              <button color="primary" onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
            ) : null }
           
      </div>
    </div>

      {/* cloudiary */}
      <h2 className='text-2xl font-bold my-4'>새로운 제품 등록</h2>
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
      </form>
    </section>


        
  );
}
