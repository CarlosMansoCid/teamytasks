import { useState } from "react";
import styled from "styled-components";
import { mediaDevices } from "../../components/mediaSizes/mediaDevices";
import SignIn from "../../components/SignIn/SignIn";


const LoginView = () =>{
    const [selection, setSelection] = useState('signin')

const handleCreateAccountSelection = () =>{
    if(selection === 'signin'){
        setSelection('signup')
    }else{
        setSelection('signin')
    }
}
    return(
        <LoginContainer>
            <LoginFormContainer>
                <LoginText>Welcome!{selection === 'signin' ? ' please, sign in' : ' please, create a account'}</LoginText>
                <SignIn selection={selection}/>
                <LoginText>{selection === 'signin' ? 'you haven\'t a account?' : 'you have a account?'} <LoginSingUpText onClick={()=>{handleCreateAccountSelection()}}>{selection === 'signin' ? 'create account' : 'sign in'}</LoginSingUpText></LoginText>
            </LoginFormContainer>
        </LoginContainer>

    );
}


const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #fff;


`
const LoginFormContainer = styled.div`
    width: 25%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px #ddd solid;
    border-radius: 10px ;
    -webkit-box-shadow: 0px 6px 5px 0px #0091EA;
    -moz-box-shadow: 0px 6px 5px 0px #0091EA;
    box-shadow: 0px 6px 5px 0px #0091EA;

    @media ${mediaDevices.tabletMedia} {
        width: 50%;
    }
    @media ${mediaDevices.mobileMedia} {
        width: 75%;
    }
`
const LoginText = styled.p`
margin: 3rem auto;
`
const LoginSingUpText = styled.span`
    color: #0277BD;
    cursor: pointer;

    &:active{
        color: #01579B;
    }
`




export default LoginView;