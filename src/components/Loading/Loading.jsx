import styled from "styled-components";
import { keyframes } from 'styled-components'

const Loader = () =>{
    return(
        <Load></Load>

    );
}
const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to { 
        transform: rotate(360deg);
    }
`
const Load = styled.div`
    
    width: 100%;
	height: 100%;
	margin: .3rem auto ;
	border:solid 10px #0288D1;
	border-radius: 50%;
	border-right-color: transparent;
	border-bottom-color: transparent;
    	
    transition: all 0.5s ease-in;
    animation-name:             ${rotate}; 
    animation-duration:         1.0s; 
    animation-iteration-count:  infinite;
    animation-timing-function: linear; 
`

export default Loader;