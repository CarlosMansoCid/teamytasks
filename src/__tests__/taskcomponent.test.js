import TaskComponent from '../components/TasksComponent/TasksComponent'
import {fireEvent,prettyDOM,render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Task Component tests', ()=>{
    
    test('Task Component was rendered', ()=>{
        const taskComponent = render(<TaskComponent id="active"/>)
        taskComponent.toBeTruthy
    })

})

