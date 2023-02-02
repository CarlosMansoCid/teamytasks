import { useState } from "react";
import styled from "styled-components";
import Button1 from "../Buttons/Button1";
import { auth } from "../../api/firebase";
import { signIn } from "../../api/apiFunctions";
import Loader from "../Loading/Loading";
import { authErrorHandler } from "../authErrorsHandler";
import { createNewUser } from "../../api/apiFunctions";




const SignIn = ({selection}) =>{


    const [inputType, setInputType] = useState('password')
    const [loading, setLoading] = useState(false)
    const [loadingResponse, setLoadingResponse] = useState('')


    const handleShowPassword = () =>{
        if(inputType === "password"){
            setInputType("text")
        }else{
            setInputType("password")
        }
    }

    const handleSignInSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        if(selection === 'signin'){
            await signIn(e.target.email.value, e.target.password.value,'')
            .then((res) => {
                const error = authErrorHandler(res)
                setLoadingResponse(error)
            })
        }else{
            e.preventDefault()
            setLoading(true)
            await createNewUser(e.target.email.value, e.target.password.value, e.target.username.value)
            .then((res) => {
                const error = authErrorHandler(res)
                setLoadingResponse(error)
            })
            setLoading(false)
        }

        setLoading(false)

    }
    
    const cleanInputs = () =>{
        setLoadingResponse('')
    }

    return(
        <SingInForm onSubmit={(e)=>handleSignInSubmit(e)}>
            {
                selection === 'signup' &&      
                <>
                    <FormLabel>username</FormLabel>
                    <FormInput name="username" type="text" placeholder="My Name"  autoComplete="on" required></FormInput>
                </>
                

            }
            <FormLabel>email</FormLabel>
            <FormInput name="email" type="email" placeholder="example@example.com"  autoComplete="on" required onClick={()=>{cleanInputs()}}></FormInput>
            <FormLabel>password</FormLabel>
            <FormInput name="password" type={inputType} placeholder="password" required onClick={()=>{cleanInputs()}}></FormInput>
            <CheckBox>
                <FormInput type="checkbox" id="checkbox" name="showpassword" onChange={()=>handleShowPassword()}></FormInput>
                <FormLabel>show password</FormLabel>
            </CheckBox>
            {
                loading === false ?
                <Button1 Text={selection === 'signin' ? 'sign in' : 'create account'} Type={'submit'}></Button1>
                :                    
                <LoaderContainer>
                    <Loader/>
                </LoaderContainer>

            }
            {
                loadingResponse !== "" && <ErrorMessage>{loadingResponse}</ErrorMessage>
            }
        </SingInForm>
    );
}
const ErrorMessage = styled.div`
    border: solid 2px #D50000;
    border-radius: 3px;
    color: #D50000;
    width: 80%;
    margin: .5rem auto;
    padding: .3rem;
    text-align: center;
`
const LoaderContainer = styled.div`
    width: .5rem;
    height: .5rem;
`

const SingInForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
 
`

const FormLabel = styled.label`
width: 80%;

`
const FormInput = styled.input`
    margin: .5rem 0 ;
    border-radius: 2px;
    background-color: #fff;
    border: none;
    border-bottom:solid 1px #ddd;
    width: 80%;

    &#checkbox{
        width: auto;
        margin-right: 1rem;
        
    }

    &:focus{
        border-color: #0277BD;
        outline: none;
    }

`
const CheckBox = styled.div`
    width: 80%;
`


export default SignIn;