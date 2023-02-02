import styled from "styled-components";

const Button1 = ({Text, Onclick, Type}) =>{
    return(
        <ButtonOne type={Type && Type} onClick={Onclick && Onclick}>{Text ? Text : "button"}</ButtonOne>


    );
}

const ButtonOne = styled.button`
    padding: .3rem;
    width: 80%;
    border: none;
    background-color: #0288D1;
    color: #fff;
    cursor: pointer;

    &:hover{
        background-color: #01579B;
    }
    &:active{
        background-color: #0288D1; 
    }
`

export default Button1;