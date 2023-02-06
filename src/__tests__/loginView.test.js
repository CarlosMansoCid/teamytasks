import {getAllByText, render, screen} from '@testing-library/react'
import LoginView from "../views/Login/LoginView"
import { signIn } from '../api/apiFunctions';

const mockedUser = {
    email: 'emailquefalla@gmail.com',
    password: 'passwordquefalla'
}

let renderInstance;

beforeEach(()=>{
    renderInstance = render(<LoginView/>)
})

afterEach(jest.clearAllMocks)


test('render login view', ()=>{
    expect(renderInstance).toBeTruthy
})

test('login view components', ()=>{
    screen.debug()
    expect(screen.getByText('Welcome! please, sign in')).toBeInTheDocument()
    expect(screen.getByText('email')).toBeInTheDocument()
    expect(screen.getByText('password')).toBeInTheDocument()
    expect(screen.getByText('show password')).toBeInTheDocument()
    expect(screen.getByText('sign in')).toBeInTheDocument()
})


// test('login with wrown user and password', async ()=>{
//     await signIn(mockedUser.email, mockedUser.password)
//     expect(screen.findByText('this user dont exist')).toBeInTheDocument()
// })



