import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, collection, getDocs, query, setDoc, where} from "firebase/firestore"


// GENERIC COLLECTION GET
export const getCollection = async (collectionToGet) =>{

    const colRef = collection(db, collectionToGet);
    try{
        const result = await getDocs(query(colRef));
        return result
    }catch(error){
        console.log(error.code)
    }
}

// GET FILTER DATA

export const getDataFilter = async (ref, data, collect ) =>{
    const collections = collection(db, `${collect}`)
    try{
        const q = query(collections, where(ref, "==", data));
        const res = await getDocs(q)
        return res.docs 
    }catch(error){
        return error.code
    }

}


// GENERIC DOCUMENT GET

export const getData = async (collect, document) =>{
    const docRef = doc(db, `${collect}/${document}`)

    try{
        const data = await getDoc(docRef)
        return data.data()
    }catch(error){
        console.log(error.code)
    }



}





// CREATE NEW USER
export const createNewUser = async (email, password, username) => {

    const docRef = doc(db, `users/${email}`);
    
    
    try{
        const user = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(docRef, {'username' : username, 'email' : email, 'teams' : [], 'notifications' : []});
        return user;
    }catch(error){
        const errorInfo = error.code
        console.log(errorInfo)
        return errorInfo
      };

}

// SIGN IN 
export const signIn = async (email, password) =>{
    try{
        await signInWithEmailAndPassword(auth, email, password)
        return 'user signin ok'
    }catch(error){
        const errorInfo = error.code
        return errorInfo
      };
}

// UPLOAD NEW TASK

export const upLoadNewTask = async (task, team) =>{
    try{
        const dataInDb = await getData('teams', team)
        dataInDb.tasks.push(task)
        const docRef = doc(db, 'teams', team);
        setDoc(docRef, {tasks : dataInDb.tasks}, {merge : true} );
    }catch(error){
        if(error.message === 'dataInDb.tasks is undefined'){
            const docRef = doc(db, 'teams', team);
            setDoc(docRef, {tasks: [task]}, {merge : true});
        }
    }

}

// ADD TEAM
export const addNewTeam = async (team, user) =>{
    console.log(team)
    try{
        const dataInDb = await getData('users', user)
        console.log(dataInDb.teams)
        dataInDb.teams.push({'teamName' : team})
        const docRef = doc(db, 'users', user);
        setDoc(docRef, {teams : dataInDb.teams}, {merge : true} );
    }catch(error){
        // if(error.message === 'dataInDb.tasks is undefined'){
        //     const docRef = doc(db, 'teams', team);
        //     setDoc(docRef, {tasks: [task]}, {merge : true});
        // }
    }

}


// DELETE TASK
export const deleteTask = async (task, team) =>{
    try{
        const tasks = await getData('teams', team)
        if(tasks.tasks.length !== 0){
            const index = tasks.tasks.indexOf(task)
            tasks.tasks.splice(index, 1)
            console.log(tasks.tasks)
            const docRef = doc(db, 'teams', team);
            setDoc(docRef, {tasks : tasks.tasks}, {merge : true} );
        }
    }catch(error){
        console.log(error.message)
    }
}

