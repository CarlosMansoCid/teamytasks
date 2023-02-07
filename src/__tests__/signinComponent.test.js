import {cleanup, prettyDOM, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignIn from "../components/SignIn/SignIn"


describe('Tests for the SignIn/SignUp component', ()=>{

 
    afterEach(cleanup)
    test('SignIn component was rendered', ()=>{
        render(<SignIn selection={"signin"}/>)
        expect(screen.getByPlaceholderText('example@example.com')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('password')).toBeInTheDocument()
        expect(screen.getByText('show password')).toBeInTheDocument()
        expect(screen.getByText('sign in')).toBeInTheDocument()
    })
    
    test('SignUp component was rendered when the selection props = "signup"',()=>{
        render(<SignIn selection={"signup"}/>)
        expect(screen.getByPlaceholderText('My Name')).toBeInTheDocument()
        expect(screen.getByText('create account')).toBeInTheDocument()
    })


    test('User type in the inputs ( Login view )', async ()=>{

        const mockUser = {
            email    : 'test@email.com',
            password : 'testpassword'
        }

        render(<SignIn selection={'signin'} />)

        const emailField = screen.getByRole('textbox', {name: 'email'})
        const passwordField = screen.getByPlaceholderText('password')
        const submitButton = screen.getByRole('button', {name:'sign in'})

        userEvent.clear(emailField)
        await userEvent.type(emailField, mockUser.email)
        userEvent.clear(passwordField)
        await userEvent.type(passwordField, mockUser.password)
        
        await waitFor(()=>{
            expect(emailField).toHaveValue(mockUser.email)
            expect(passwordField).toHaveValue(mockUser.password)      
        })

        
    }) 

})    


