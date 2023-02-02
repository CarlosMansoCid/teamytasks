import { useEffect, useState } from "react";
import styled from "styled-components";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../api/firebase";
import Task from "./Task";

const HomePage = ({handleShowTaskComponent, showTaskComponent, teams, selectedTeam}) =>{

    const [tasks, setTasks] = useState([])
    const [teamsData, setTeamsData] = useState(teams)



    useEffect(()=>{
        setTasks([])
        getTeamData()
    },[teams, selectedTeam])

    const getTeamData =()=>{
        if(selectedTeam !== ''){

            console.log(selectedTeam)
            const docRef = doc(db, `teams`, selectedTeam)
            const unsub = onSnapshot(docRef, (doc) => {
                if(doc.data() !== undefined){
                    setTasks(doc.data().tasks)
                    console.log(doc.data())
                }

        });
        }
    }


    

    return(
        <TaskListContainer>
            <TaskListContainerHeader >  
                {
                    showTaskComponent === false ?
                    teams.length !== 0 ?
                        <TaskListEmptyButton onClick={handleShowTaskComponent}>
                            <TaskInputIcon>+</TaskInputIcon>
                            <>Add a new task to the team: {selectedTeam} </>
                        </TaskListEmptyButton>
                    :
                    <>You dont have any team yet</>
                    :
                    <>Type to add a new task to the team: {selectedTeam}</>
                } 

            </TaskListContainerHeader>
            <TaskList id="list">
                {   
                    tasks !== undefined ?
                    tasks.map((task)=>{
                        return(
                            <Task selectedTeam={selectedTeam} task={task}/>
                        );
                    })
                    :
                    <>This team dont have tasks</>

                }

            </TaskList>
        </TaskListContainer>

    );
}

export default HomePage;

const TaskList = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
const TaskListContainerHeader = styled.div`
    width: 100%;
    height: 2rem;
    cursor: pointer;
`
const TaskInputIcon = styled.div`
    width: 10px;
    height: 10px;
    color: #0277BD;
    padding: .1rem;
    border: solid 2px #0277BD;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 1rem;
`
const TaskListEmptyButton = styled.div`
    display: flex;
    flex-direction: row;
`

const TaskListContainer = styled.section`
    width: 96%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`