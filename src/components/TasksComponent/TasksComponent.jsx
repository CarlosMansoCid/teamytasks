import styled from "styled-components";
import {FiMaximize2} from "react-icons/fi";
import {AiOutlineCalendar} from "react-icons/ai";
import {SlLockOpen} from "react-icons/sl";
import {RxSun} from "react-icons/rx";
import {AiOutlineClockCircle} from "react-icons/ai"
import { useState } from "react";
import { upLoadNewTask } from "../../api/apiFunctions";
import { mediaDevices } from "../mediaSizes/mediaDevices";

const TaskComponent = ({hideTaskComponent, selectedTeam}) =>{

    const [active, setActive] = useState(false)  
    const screenWidth = window.screen.width

    
    const handleTextInput =(e)=>{
        const editor = document.getElementById('_texto')
            if(editor.innerText.length === 1){
                setActive(false)
                console.log(editor.innerText.length === 0)
            }else{
                setActive(true)
            }
  
        //****************************GET CURRENT CURSOR POSITION****************************//
        const sel = window.getSelection();
        const node = sel.focusNode;
        const offset = sel.focusOffset;
        const pos = getCursorPosition(editor, node, offset, { pos: 0, done: false });
        if (offset === 0) pos.pos += 0.5;
  
        editor.innerHTML = parse(editor.innerText);
      
  
      //************************************************************************************//
      //********************************RESTORE THE POSITION********************************//
      sel.removeAllRanges();
      const range = setCursorPosition(editor, document.createRange(), {
        pos: pos.pos,
        done: false,
      });
      range.collapse(true);
      sel.addRange(range);
    }
      //************************************************************************************//
      //***************************************PARSER***************************************//
      function parse(text) {
        return (
          text
            .replace(/\n/gm, "<br>")
            .replace(/\t/gm, "&#9;")
            .replace(/#(.*?) /gm, "<span id='violet'><AiOutlineMail/>#$1</span> ") // task
            .replace(/@(.*?) /gm, "<span id='green'>@$1</span> ") // mention
            // .replace(/(.*?)@(.*?)\.(.*?)/gm, "<span id='orange'> $1@$2.$3</span> ") // correo
            .replace(/www\.(.*?)\.(.*?) /gm, `<a id='blue' href="https://$1.$2" target="_blank">www.$1.$2</a> `) // link
        );
      }
      //************************************************************************************//
      //*******************************GET THE CURSOR POSITION******************************//
    function getCursorPosition(parent, node, offset, stat) {
      if (stat.done) return stat;
  
      let currentNode = null;
      if (parent.childNodes.length === 0) {
        stat.pos += parent.textContent.length;
      } else {
        for (let i = 0; i < parent.childNodes.length && !stat.done; i++) {
          currentNode = parent.childNodes[i];
          if (currentNode === node) {
            stat.pos += offset;
            stat.done = true;
            return stat;
          } else getCursorPosition(currentNode, node, offset, stat);
        }
      }
      return stat;
    }
      //************************************************************************************//
      //********************FIND THE CHILD NODE AND SET THE RELATIVE PATH*******************//
    function setCursorPosition(parent, range, stat) {
      if (stat.done) return range;
  
      if (parent.childNodes.length === 0) {
        if (parent.textContent.length >= stat.pos) {
          range.setStart(parent, stat.pos);
          stat.done = true;
        } else {
          stat.pos = stat.pos - parent.textContent.length;
        }
      } else {
        for (let i = 0; i < parent.childNodes.length && !stat.done; i++) {
          let currentNode = parent.childNodes[i];
          setCursorPosition(currentNode, range, stat);
        }
      }
      return range;
    }
    
    const addNewTask = async () =>{
        const task = document.getElementById('_texto').innerHTML
        await upLoadNewTask(task, selectedTeam)

    }

    return(
        <TaskComponentContainer>
            <TaskInput>
                <TaskInputIcon>+</TaskInputIcon>
                <TaskTextArea id="_texto" onInput={(e)=>handleTextInput(e)} contentEditable="true"></TaskTextArea>
                <TaskUserAvatarContainer></TaskUserAvatarContainer>
            </TaskInput>
            <TaskInput id="buttons">
                <TaskButtonsContainer>
                    <TaskButtons id={active === true && "open"} onClick={()=>console.log('hola')}>
                        <ButtonIcon>
                            <FiMaximize2/>
                        </ButtonIcon>
                        <ButtonText>Open</ButtonText>
                    </TaskButtons>
                    <TaskButtons id={active === true && "button"} >
                        <ButtonIcon>
                            <AiOutlineCalendar/>
                        </ButtonIcon>
                        <ButtonText>Today</ButtonText>
                    </TaskButtons>
                    <TaskButtons id={active === true && "button"}>
                        <ButtonIcon>
                            <SlLockOpen/>
                        </ButtonIcon>
                        <ButtonText>Public</ButtonText>
                    </TaskButtons>
                    <TaskButtons id={active === true && "button"} >
                        <ButtonIcon>
                            <RxSun/>
                        </ButtonIcon>
                        <ButtonText>Normal</ButtonText>
                    </TaskButtons>
                    <TaskButtons id={active === true && "button"}>
                        <ButtonIcon>
                            <AiOutlineClockCircle/>
                        </ButtonIcon>
                        <ButtonText>Estimation</ButtonText>
                    </TaskButtons>

                </TaskButtonsContainer>
                <TaskButtonsContainer>
                    <TaskButtons id="cancel">
                        <ButtonTextActions onClick={hideTaskComponent}>Cancel</ButtonTextActions>
                    </TaskButtons>
                    <TaskButtons id="add">
                        <ButtonTextActions onClick={active === true ? addNewTask :  hideTaskComponent}>{screenWidth > 500 ? active === true ? "Add" : "Ok" : active === true ? '+' : 'x' }</ButtonTextActions>
                    </TaskButtons>
                </TaskButtonsContainer>

            </TaskInput>
        </TaskComponentContainer>
    );
}

const TaskButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: auto;

`
const ButtonIcon = styled.div`
    font-size: x-large;


`
const ButtonTextActions = styled.p`
    margin: 0;
`
const ButtonText = styled.p`
    margin: 0;


        @media ${mediaDevices.tabletMedia} {
            display: none;
        }
        @media ${mediaDevices.mobileMedia} {
            display: none;
        }
    
`
const TaskButtons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: .3rem .7rem;
    border-radius: 5px;
    margin: 0 .1rem;
    text-align: center;
    background-color: #fff;
    border-color: #ddd;
    color: #ddd;
    pointer-events:none;

    width: fit-content;

    /* @media ${mediaDevices.tabletMedia} {
        font-size: large.5rem;
    } */
    @media ${mediaDevices.mobileMedia} {
        font-size: .7rem;
        padding: 0.2rem;
    }

    &#button{
        color: #666;
        border: solid 1px #666;
        cursor: pointer;
        pointer-events:all;
    }

    &#open{
        color: #000;
        background-color: #E0F2F1;
        border-color: #E0F2F1;
        cursor: pointer;
        pointer-events:all;
    }
    &#cancel{
        padding: .7rem 1.2rem;
        background-color: #E0F2F1;
        border-color: #E0F2F1;
        color: #000;
        cursor: pointer;
        pointer-events:all;
        @media ${mediaDevices.mobileMedia} {
            display: none;
        }
    }
    &#add{
        padding: .7rem 1.2rem;
        background-color: #0277BD;
        border-color: #0277BD;
        color: #fff;
        cursor: pointer;
        pointer-events:all;
    }
`

const TaskUserAvatarContainer = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    background-color: red;
    margin-top: 2px;
    border-radius: 50%;
    cursor: pointer;
`
const TaskTextArea = styled.div`
    width: 96%;
    text-justify: center;
    border: none;
    padding-left: .3rem;
    caret-color: #0277BD;
    display: inline;
    white-space: pre;


    &:focus{
        outline: none;
    }   

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
    margin-top: 2px;
`
const TaskInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    background-color: #fff;
    width: auto;
    height: 50%;
    border: solid 1px #ccc;
    padding: .5rem;

    &#buttons{
        justify-content: space-between;
    }
`
const TaskComponentContainer = styled.section`
    width: 74%;
    height: auto;
    margin:  0 auto;
    padding: .5rem;
    background-color: #fff;

    -webkit-box-shadow: 0px 6px 5px 0px #ddd;
    -moz-box-shadow: 0px 6px 5px 0px #ddd;
    box-shadow: 0px 6px 5px 0px #ddd;

    position: fixed;
    bottom: 0px;

`
export default TaskComponent;