interface UserExistsError extends Error{
    name: "UserExistsError",
    user: string
}

function UserExistsError(msg:string){
    const error = new Error(msg) as UserExistsError;
    error.name = "UserExistsError";
    //error.user = getUser();
    return error 
}