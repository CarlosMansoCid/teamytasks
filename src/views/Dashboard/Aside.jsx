import styled from "styled-components";

const Aside = ({children}) =>{
    return(
        <AsideContainer id="aside">{children}</AsideContainer>
    );
}

const AsideContainer = styled.aside`
    width: 100%;
    height: auto;
    background-color: #fff;
    padding: .2rem;
    margin-top: 3rem;
    -webkit-box-shadow: 0px 0px 5px 0px #ddd;
    -moz-box-shadow: 0px 0px 5px 0px #ddd;
    box-shadow: 0px 0px 5px 0px #ddd;
    height: 90%;
`
export default Aside;