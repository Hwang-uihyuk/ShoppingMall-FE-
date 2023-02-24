import React,{useEffect,useState} from "react";
import DaumPostCode from "react-daum-postcode";

const PostPopUp = (props)=>{
    const address = props.address;
    const setAddress = props.setAddress;
    const onCompletePost = (data)=>{
        setAddress(data.address);
    };

    const postCodeStyle = {
        display : 'block',
        width : '400px',
        height : '400px',
        position : 'absolute',
        top : '20%',
        padding : '10px',
        zIndex : 100,
    };
    
    return (
        <>
            <DaumPostCode
                style = {postCodeStyle}
                autoClose
                onComplete={onCompletePost}
            />
        </>
    )
};

export default PostPopUp;