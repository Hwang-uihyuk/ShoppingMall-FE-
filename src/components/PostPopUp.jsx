import React from "react";
import DaumPostCode from "react-daum-postcode";
const PostPopUp = (props)=>{
    const setAddress = props.setAddress;
    const setPopup = props.setPopup;
    const onCompletePost = (data)=>{
        setAddress(data.address);
        setPopup(false);
    };
    const postCodeStyle = {
        display : 'block',
        width : '500px',
        height : '500px',
        position : 'absolute',
        top : '20%',
        zIndex : 100,
        border : '1px solid #252525',
    };
    return (
        <>
            <DaumPostCode
                style = {postCodeStyle}
                autoClose
                onComplete={onCompletePost}
            >
            </DaumPostCode>
        </>
    )
};

export default PostPopUp;