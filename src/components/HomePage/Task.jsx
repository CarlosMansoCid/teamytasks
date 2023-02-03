import styled from "styled-components";
import {MdDelete} from 'react-icons/md'
import {BsFillPencilFill} from "react-icons/bs"
import { deleteTask } from "../../api/apiFunctions";
import { useState } from "react";

const Task = ({task, selectedTeam, handleModifyTask}) =>{


    const [showDeleteButton, setShowDeleteButton] = useState(false)

    const handleShowDeleteButton = () =>{
        setShowDeleteButton(!showDeleteButton)
    }
const handleTaskDelete = async () =>{
    if(window.confirm('Delete this task ?')){
        await deleteTask(task, selectedTeam)
    }
}




    return(
        <TaskItemContainer>
            <TaskCheck type="checkbox" onChange={()=>handleShowDeleteButton()}></TaskCheck>
            <TaskDescription dangerouslySetInnerHTML={{__html: task}}></TaskDescription>
            <Buttons>
                {
                    showDeleteButton &&
                    <MdDelete onClick={()=>handleTaskDelete()} style={{color: '#B71C1C', cursor: 'pointer'}}/>

                }
            </Buttons>
        </TaskItemContainer>
    )
}

export default Task;
const TaskDescription = styled.div`
    width: 90%;
`
const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 5%;
    justify-content: space-between;
`
const TaskItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: .3rem 0;
    
`
const TaskCheck = styled.input`
    width: 5%;
`