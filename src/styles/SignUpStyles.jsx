import styled from "styled-components";

export const Label = styled.div`
  margin : 0 0 4px 4px;
  font-size : 1rem;
  color : #252525;
  left : rem;
`;
export const RegisterForm = styled.form`
    grid-template-columns: 300px 300px;
    grid-template-rows: 60px 60px 60px 60px;
    align-self: center;
    align-items: center;
    margin-top : 30px;
    padding : 40px;
    display: flex;
    height : 1000px;
    width : flex;
    flex-direction: column;
    background-color: white;
    position: relative;
    z-index: 2;
    font-family: "RalewayBold";
    border-radius : 15px;
    box-shadow: 1px 1px 1.5px lightgray;
    opacity : ${props => (props.popup ? 0.5:1)};
`
export const Wrapper =  styled.div`
    justify-content: left;
    background-color: white;
    width : 600px;
    align-items: center;
    margin-bottom : 10px;
`
export const InputWrapper = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
`
export const ShowMsg = styled.div`
  color : ${props => (props.isValidated ? 'green' : 'red')};
  font-size : 8px;
  margin : 3px 0 0 10px;
`
export const InputForm = styled.input`
    background-color: #F9FAFB;
    border: 1px solid #D1D5DB;
    color: #374151;
    font-size: 1rem;
    border-radius: 0.375rem;
    padding: 0.625rem;
    width: 100%;
    margin : auto;
    &:focus {
    outline: none;
    border-color: #2563EB;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
  }
`

export const SignUpLabel = styled.label`
  font-size: 25px;
  color : #252525;
  margin: 15px 10px 10px 10px;
`

export const CheckButton = styled.button`
    width: 20%;
    margin-left : 10px;
    background-color: #3f3f3f;
    color: #FFFFFF;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.375rem;
    padding: 0.625rem 1.25rem;
    /* margin-top: 1.25rem; */
    transition: background-color 0.2s ease-in-out;
    &:hover {
        background-color: #686868;
    }
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
    }
`
export const JoinButton = styled.button`
    width: 20%;
    margin-left : 10px;
    background-color: #3f3f3f;
    color: #FFFFFF;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.375rem;
    padding: 0.625rem 1.25rem;
    /* margin-top: 1.25rem; */
    transition: background-color 0.2s ease-in-out;
    &:hover {
        background-color: #686868;
    }
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
    }
`
export const CloseBtn = styled.button`
  display: block;
  width : 70px;
  height : 40px;
  position : relative;
  z-index: 101;
  justify-content: center;
  border-radius: 0.375rem;
  background-color: #3f3f3f;
  color : white;
  top : -360px;
`
