import {signIn, createNewUser} from "../api/apiFunctions"



jest.setTimeout(20000)
 
test('Response when dont exist the user', async ()=>{
    const response = await signIn('user@gmail.com', 'password')
    expect(response === 'auth/user-not-found')
})

test('Response when the password is wrong', async ()=>{
    const response = await signIn('mansocid@gmail.com', 'password')
    expect(response === 'auth/wrong-password')
})

test('Response when try to create new user with existing email', async ()=>{
    const response = await createNewUser('mansocid@gmail.com', 'password')
    expect(response === 'auth/email-already-in-use')
})

test('Response when try to create new user with weak password', async ()=>{
    const response = await createNewUser('mansocid@gmail.com', 'password')
    expect(response === 'auth/weak-password')
})


// GET COLLECTION

// test('Get a existing collection in the db', async ()=>{
//     const response = await getCollection('users')
//     expect(response !== null || response !== undefined)
// })



