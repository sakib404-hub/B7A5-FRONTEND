"use server"


export interface RegisterState {
    success : boolean;
    statusCode : number;
    message : string;
    data : {
        name : string;
        email : string;
        password : string;
        role : string;
    }
}

export const registerAction = async(previousState : RegisterState, formData : FormData)=>{

    const payLoad = {
        name : formData.get('name'),
        email : formData.get('email'),
        password : formData.get('password'),
        role : formData.get('role')
    }

    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/register`,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(payLoad)
    })

    const result = await res.json();
    console.log(result);

    return result;
}