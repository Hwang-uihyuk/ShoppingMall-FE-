import React, { useState } from 'react';
import { addNewProduct } from '../api/firebase';
import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';

import  {useRef} from 'react';
import S3 from 'react-aws-s3';

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




  //aws !!!!!!!!1
  window.Buffer = window.Buffer || require("buffer").Buffer;
  const [array, setArray] = useState([]);
  
   //file upload to storage & show preview
      const [selectedFile, setSelectedFile] = useState(item.img_url[0]);
  
      const config = {
          bucketName:process.env.REACT_APP_BUCKET_NAME,
          region:process.env.REACT_APP_REGION,
          accessKeyId:process.env.REACT_APP_ACCESS,
          secretAccessKey:process.env.REACT_APP_SECRET,
      }
  
      const arr = [];
      const handleFileInput = (e) => {
          if (e.target.files.length > 0) {
              setSelectedFile(e.target.files);
              
              const length = e.target.files.length;
              console.log(length)
  
              for(let i=0; i<length; i++) {
                  const ReactS3Client = new S3(config);
                  // the name of the file uploaded is used to upload it to S3
                  ReactS3Client
                  .uploadFile(e.target.files[i], e.target.files[i].name)
                  .then((data) => {
                      console.log(data.location);
                      
                      arr.push(data.location);
                      console.log(arr);
                      setFile(arr[0]);
                      setArray([...arr]);
                      
                      setDisplay(false);
                  })
                  .catch(err => console.error(err))
              }
          }
          
      }



  return (
    

    
    <section className='w-full text-center'>
      {/* aws */}
      <input className='file' type="file" multiple ref={inputFile} 
                onChange={(e)=>{
                  handleFileInput(e)
                  }}/>
                  
      <div className='btn lg-btn' onClick={() => newpost()}>Post!</div>  
      {/* aws */}
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
