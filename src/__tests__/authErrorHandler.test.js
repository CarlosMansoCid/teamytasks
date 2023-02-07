import { authErrorHandler } from '../components/authErrorsHandler'


test('Response  when dont exist the user', async ()=>{
    const response = await authErrorHandler('auth/user-not-found')
    expect(response === 'this user dont exist')
})
 
test('Response  when try to login with a wrong password', async ()=>{
    const response = await authErrorHandler('auth/wrong-password')
    expect(response === 'wrong password')
})

test('Response  when client send to many requests', async ()=>{
    const response = await authErrorHandler('auth/too-many-requests')
    expect(response === 'max number of trys')
})

test('Response when the client have a conection error', async ()=>{
    const response = await authErrorHandler('auth/network-request-failed')
    expect(response === 'error to connection')
})

test('Response when the user try to create a new account with a weak password', async ()=>{
    const response = await authErrorHandler('auth/weak-password')
    expect(response === 'weak password')
})

test('Response when the user try to create a new account with a existing email', async ()=>{
    const response = await authErrorHandler('auth/email-already-in-use')
    expect(response === 'email already in use')
})