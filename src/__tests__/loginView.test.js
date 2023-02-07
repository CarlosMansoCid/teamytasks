import {fireEvent,prettyDOM,render, screen} from '@testing-library/react'
import LoginView from "../views/Login/LoginView"


let renderInstance;
let checkbox;


beforeEach(()=>{
    renderInstance = render(<LoginView/>)
})

afterEach(jest.clearAllMocks)


test('render login view', ()=>{
    expect(renderInstance).toBeTruthy
})
 
describe('Tests for the login view', ()=>{

    test('login view components ( initial )', ()=>{
        checkbox = screen.getByLabelText('show password')

        expect(screen.getByText('Welcome! please, sign in')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('example@example.com')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('password')).toBeInTheDocument()
        expect(screen.getByText('create account')).toBeInTheDocument()
        expect(checkbox).not.toBeChecked();
        expect(screen.getByText('sign in')).toBeInTheDocument()
    })
    
    
    test('render sign up component on click', ()=>{
        fireEvent.click(screen.getByText('create account'))
        expect(screen.getByText('Welcome! please, create a account')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('My Name')).toBeInTheDocument()
        expect(screen.getByText('sign in')).toBeInTheDocument()
        expect(screen.getByText('create account')).toBeInTheDocument()
    })

    test('Show password when checkbox is checked', ()=>{
        checkbox = screen.getByLabelText('show password')
        const passwordField = screen.getByPlaceholderText('password')
        expect(passwordField).toHaveAttribute('type', 'password') 
        fireEvent.click(checkbox)
        expect(checkbox).toBeChecked()
        expect(passwordField).toHaveAttribute('type', 'text')
    })
    

})

