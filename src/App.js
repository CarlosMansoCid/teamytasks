import styled from "styled-components";
import LoginView from "./views/Login/LoginView";
import { auth } from "./api/firebase";
import {  onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import Dashboard from "./views/Dashboard/Dashboard";
import LoadingPage from "./components/LoadingPage/LoadingPage";


function App() {
  const  [userState, setUserState] = useState('')
  const  [currentUser, setCurrentUser] = useState()

  onAuthStateChanged(auth, (user)=>{
    if(user){
      if (user) {
        setUserState('login')
        setCurrentUser(user)
      }
    }else{
      setUserState('logout')
      setCurrentUser('')
    }
  })
  
  return (
    <MainContainer>
      {
        userState === '' ? 
        <LoadingPage/>
        : userState === 'logout' ?
        <LoginView/>
        :
        <Dashboard user={currentUser}/>
      }


    </MainContainer>
  );
}


const MainContainer = styled.section`
  background-color: #fff;
  width: 100vw;
  height: 100vh;
`
export default App;
