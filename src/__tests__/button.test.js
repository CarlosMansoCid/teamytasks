import {render, screen} from '@testing-library/react'
import Button1 from '../components/Buttons/Button1';
 

test('Render the button with text props', ()=>{
    render(<Button1 Text={'button test'}/>)
    expect(screen.getByText('button test')).toBeInTheDocument()
})

test('Render the button without text props', ()=>{
    render(<Button1 />)
    expect(screen.getByText('button')).toBeInTheDocument()
})