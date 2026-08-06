"use server"

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LoginState } from "@/types/types";

export const loginAction = async(previousState : LoginState, formData : FormData)=>{
    const payLoad = {
        email : formData.get("email"),
        password : formData.get("password")
    }

    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/login`, {
        method : "POST",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(payLoad)
    });

    const result = await res.json();

    if(result.success){
        const cookieStore = await cookies();

        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly : true,
            sameSite : 'lax',
            maxAge : 60 * 60 * 24
        });

        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly : true,
            sameSite :'lax',
            maxAge : 60 * 60 * 24 * 7
        });

        redirect('/');
    }

    return result;
}