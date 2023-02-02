import React, {useRef, useState} from 'react';
import S3 from 'react-aws-s3';

//cloudinary 이미지 업로드
export async function uploadImage(file) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: 'POST',
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}


//aws 이미지 넣기
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