import styled from "styled-components";
import Loader from "../Loading/Loading";

const LoadingPage = () =>{
    return(
        <LoadingPageContainer>
            <LoaderContainer>
                <Loader/>
            </LoaderContainer>
            <LoadingTag>Welcome to TeamyTasks!</LoadingTag>
        </LoadingPageContainer>
    );
}
const LoadingTag = styled.p`
    color: #0288D1;
    margin: 2rem;
`
const LoaderContainer = styled.div`
    width: 1rem;
    height: 1rem;
    margin: 0 auto;
`
const LoadingPageContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export default LoadingPage;