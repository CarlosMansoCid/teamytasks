import styled from "styled-components";

const NavBar = ({children}) =>{
    return(
        <NavBarContainer>{children}</NavBarContainer>
    );
}

const NavBarContainer = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 2rem;
    background-color: #fff;
    position: fixed;
    padding: .3rem;
    top: 0;
    border: solid 1px #ddd;
    -webkit-box-shadow: 0px 0px 5px 0px #ddd;
    -moz-box-shadow: 0px 0px 5px 0px #ddd;
    box-shadow: 0px 0px 5px 0px #ddd;
`
export default NavBar;