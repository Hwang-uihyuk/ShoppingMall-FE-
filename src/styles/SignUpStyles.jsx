import styled from "styled-components";

export const Label = styled.div`
  margin-left: 8px;
  font-size : 1rem;
  color : #252525;
  left : rem;
`;
export const RegisterForm = styled.form`
    grid-template-columns: 300px 300px;
    grid-template-rows: 60px 60px 60px 60px;
    align-self: center;
    align-items: center;
    margin : 10px;
    padding : 10px;
    display: flex;
    height : 1000px;
    width : flex;
    flex-direction: column;
    background-color: white;
    position: relative;
    z-index: 2;
    font-family: "RalewayBold";
    opacity : ${props => (props.popup ? 0.5:1)};
`
export const Wrapper =  styled.div`
  justify-content: left;
  margin-top : 20px;
  background-color: white;
  width : 600px;
`
export const InputWrapper = styled.div`
  display : flex;
`
export const ShowMsg = styled.div`
  color : ${props => (props.isValidated ? 'green' : 'red')};
  font-size : 8px;
  margin : 3px 0 0 10px;
`
export const InputForm = styled.input`
    border-style: 1px dotted;
    height : 50px;
    width: 600px;
    font-family: "RalewayLight";
    font-size: 17px;
    margin-top: 10px;
    padding-left : 20px;
    border-radius: 30px;
    /* border-color : ${props => (props.isValidated ? 'white' : '#252525')};
    box-shadow : ${props => (props.isValidated ? '0 0 5px blue':null) }; */
`

export const SingUpLabel = styled.label`
  font-size: 25px;
  color : #252525;
  margin: 15px 10px 10px 10px;
`

export const CheckButton = styled.button`
    height: 50px;
    width : 180px;
    margin-left: 10px;
    font-family: "RalewayLight";
    font-size: 17px;
    margin-top: 10px;
    background-color: #252525;
    color : white;
    border-style: none;
    border-radius: 30px;
    &:hover{
        background-color: #666666e0;
        cursor : pointer;
    };
`
export const JoinButton = styled.button`
    height: 50px;
    width : 170px;
    align-self: center;
    font-family: "RalewayLight";
    font-size: 17px;
    margin-top: 30px;
    background-color: #252525;
    color : white;
    border-style: none;
    border-radius: 30px;
    &:hover{
        background-color: #666666e0;
        cursor : pointer;
    }
`
export const CloseBtn = styled.button`
  display: block;
  width : 70px;
  height : 40px;
  position : relative;
  z-index: 101;
  justify-content: center;
  background-color: black;
  color : white;
  top : -400px;
`