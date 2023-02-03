import { auth, db } from "../../api/firebase";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import Aside from "./Aside";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResults from "../../components/SearchResults/SearchResults";
import HomePage from "../../components/HomePage/HomePage";
import { doc, onSnapshot } from "firebase/firestore";
import TaskComponent from "../../components/TasksComponent/TasksComponent";
import { mediaDevices } from "../../components/mediaSizes/mediaDevices";



const Dashboard = ({user}) =>{

    const [currentUserData, setCurrentUserData] = useState()
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(false)
    const [finding, setFinding] = useState(false)
    const [findedTeam, setFindedTeam] = useState()
    const [finded, setFinded] = useState('')
    const [option, setOption] = useState('home')
    const [showTaskComponent, setShowTaskComponent] = useState(false)   
    const [selectedTeam, setSelectedTeam] = useState('') 
    const [showTasksList, setShowTasksList] = useState(true)

    useEffect(() => {
        getUserData()
    }, []);

    const hideTaskComponent = () =>{
        setShowTaskComponent(false)
        console.log('hide')
    }
    const handleShowTaskComponent = () =>{
        setShowTaskComponent(!showTaskComponent)
    }

    const getUserData = async () =>{
        setLoading(true)
        const docRef = doc(db, `users`, user.email)
        const unsub = onSnapshot(docRef, (doc) => {
        setTeams(doc.data().teams);
        setCurrentUserData(doc.data().username)
        if(doc.data().teams.length !== 0){
            setSelectedTeam(doc.data().teams[0].teamName)
        }
    });

        setLoading(false)
    }


    const findedTeams = (findedTeams, finded) =>{
        setFindedTeam(findedTeams)
        setFinded(finded)
    }
    const handleFinding = (status)=>{
        setShowTaskComponent(false)
        setFinding(status)
        if(option !== 'search'){
            setOption('search')
        }

    }
    const setHomePage = () =>{
        setOption('home')
    }
    const selectTeam = (team) =>{
        setSelectedTeam(team)
        setOption('home')
    }
    const showTeamsList = () =>{
        const tl = document.getElementById('left')
        if(showTasksList === true){
            tl.style.width = '100%'
        }else{
            tl.style.width = '0%'
        }
        setShowTasksList(!showTasksList)


    }

    return(
        <DashboardContainer>
            <NavBar>
                <SearchContainer>
                    <SearchBar findedTeams={findedTeams} handleFinding={handleFinding} />
                </SearchContainer>
                <InfoContainer>
                    <DashboardText>{currentUserData !== undefined && `Hi! ${currentUserData}`}</DashboardText>
                    <SignOutButton onClick={()=>signOut(auth)}>Sign out</SignOutButton>
                </InfoContainer>
            </NavBar>
            <BodyContainer>
                <AsideLeft id="left">
                    <Aside id="left__aside">
                        <AsideTittle>Teams</AsideTittle>
                        <TeamsList>
                            {
                                loading === true ?
                                <>Loading...</>
                                :teams.length !== 0 ?
                                teams.map((team)=>{
                                    return(
                                        <Team>
                                            <TeamName onClick={()=>selectTeam(team.teamName)} key={team.teamName}>{team.teamName}</TeamName>
                                        </Team>
                                    )
                                })
                                :
                                <>You havent team's yet</>
                            }
                        </TeamsList>
                        {
                            option === 'search' ?
                            <AsideButton onClick={() =>setHomePage()}>Go to tasks</AsideButton>
                            :console.log('')
                            
                        }
                    </Aside>
                </AsideLeft>
                <CenterContainer>

                    <Center>
                                {
                                    option === 'search' ?
                                    <SearchResultsList>
                                        <SearchResultsListTittle>
                                            Results for {finded}
                                        </SearchResultsListTittle>
                                        {
                                            finding === true ?
                                            <> Loading ...</>
                                            :   
                                            <SearchResults results={findedTeam}  email={user.email} />
                                        }

                                    </SearchResultsList>
                                    : option === "home" ?
                                        <HomePage handleShowTaskComponent={handleShowTaskComponent} 
                                                  showTaskComponent={showTaskComponent}
                                                  teams={teams}
                                                  selectedTeam={selectedTeam}/>
                                    :console.log('s')
                                }
                                

                    </Center>
                    {
                        showTaskComponent === true &&
                        <TaskComponent hideTaskComponent={hideTaskComponent} selectedTeam={selectedTeam}/>
                    }
                    <ShowAsideButton onClick={()=>showTeamsList()}>{showTasksList === true ? "T" : 'x'}</ShowAsideButton>
                </CenterContainer>

            </BodyContainer>

        </DashboardContainer>
    );
}
const ShowAsideButton = styled.div`
    display: none;
    padding: 1rem;
    position: fixed;
    bottom: 2px;
    left: 2px;
    cursor: pointer;
    background-color: #0288D1;
    border-radius: 50%;
    width: .7rem;
    height: .7rem;
    text-align: center;
    color: #fff;
    align-items: center;
    justify-content: center;

    @media ${mediaDevices.mobileMedia} {
        display: flex;
    }

    
`
const CenterContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: #fff;
`
const SearchResultsListTittle = styled.p``
const SearchResultsList = styled.div`
    display: flex;
    flex-direction: column;
`
const Center = styled.section`
    width: 96%;
    height: 65%;
    margin-top: 3rem;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: .5rem;
    overflow-y: scroll;

`
const TeamName = styled.p`
    margin: 0;
`
const Team = styled.li`
    padding: .5rem .2rem;
    cursor: pointer;
    transition: .3s;

    &:hover{
        background-color: #eee;
    }
`
const TeamsList = styled.ul`
    list-style: none;
    padding: 0.3rem;
`
const AsideTittle = styled.h4`
    padding: .5rem;
    border-bottom: solid 1px #ddd;
    margin: 0;
`
const AsideLeft = styled.div`
    width: 15%;
    height: auto;
    overflow: hidden;
    transition: .5s;
    /* -webkit-box-shadow: 0px 0px 5px 0px #ddd;
    -moz-box-shadow: 0px 0px 5px 0px #ddd;
    box-shadow: 0px 0px 5px 0px #ddd; */
    @media ${mediaDevices.mobileMedia} {
        width: 0;
        font-size: .7rem;
    }

    &#left{
        height: 100%;
    }
`
const BodyContainer = styled.section`
    display: flex;
    flex-direction: row;
    width: 100%;
`
const SearchContainer = styled.div`
    @media ${mediaDevices.mobileMedia} {
        width: 40%;
    }
`

const InfoContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-right: 1rem;
    width: 40%;
    justify-content: right;

    @media ${mediaDevices.mobileMedia} {
        width: 60%;
        /* justify-content: center; */
    }
    

`
const SignOutButton = styled.div`
    text-align: center;
    padding: .3rem;
    width: 4rem;
    margin-left: .5rem;
    border: none;
    background-color: #0288D1;
    color: #fff;
    cursor: pointer;

    @media ${mediaDevices.mobileMedia} {
        width: 2rem;
        font-size: .5rem;
    }

    &:hover{
        background-color: #01579B;
    }
    &:active{
        background-color: #0288D1; 
    }
`
const DashboardText = styled.h3`
    padding: .3rem;
    margin: 0;
    width: auto;

    

    @media ${mediaDevices.mobileMedia} {
        font-size: 1rem;
    }
`
const AsideButton = styled.div`
    background-color: #fff;
    width: 100%;
    padding: .2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
`
const DashboardContainer = styled.aside`
    width: 100vw;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;

    @media ${mediaDevices.mobileMedia} {
        font-size: .7rem;
    }

`


export default Dashboard;