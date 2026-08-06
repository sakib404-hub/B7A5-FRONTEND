"use server"

import { cookies } from "next/headers"

export const getMyProfile = async()=>{
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('accessToken')?.value;

    if(!accessToken){
        return {
            success : false,
            message : "User not logged In."
        }
    }

    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/me`, {
        method : 'GET',
        headers : {
            Authorization : `${accessToken}`,
            Cookie : `accessToken=${accessToken}`
        },
        cache : 'force-cache',
        next : {
            revalidate : 60 * 60 * 24,
            tags : ["my-profile"]
        }
    });

    const result = await res.json();
    return result;
}