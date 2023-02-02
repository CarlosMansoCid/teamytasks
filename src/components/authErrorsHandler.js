export const authErrorHandler = (error) =>{
    switch(error){
        case "auth/user-not-found"          : return('this user dont exist'); break;
        case "auth/wrong-password"          : return('wrong password'); break;
        case "auth/too-many-requests"       : return('max number of trys'); break;
        case "auth/network-request-failed"  : return('error to connection'); break;
        case "auth/weak-password"           : return('weak password'); break;
        case "auth/email-already-in-use"    : return('email already in use'); break;
        default                             : return('error'); break;
   }
}