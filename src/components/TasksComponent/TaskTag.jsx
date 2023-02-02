import styled from "styled-components"

const TaskTag = (value) =>{
    return(
        <Span>{value}</Span>
    )
}
const Span = styled.span`
    color: red;
`
export default TaskTag;