"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers"

export const deleteGear = async(gearId : string)=>{
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('accessToken')?.value;

    if(!accessToken){
        return {
            success : false,
            message : "Unauthorized access",
            data : null
        }
    }

    try{

        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/provider/gear/${gearId}`,{
            method :'DELETE',
            headers : {
                Authorization : `Bearer ${accessToken}`,
                'Content-Type' : 'application/json'
            }
        })

        const result = await res.json();

        if(!res.ok || !result.success){
            return {
                success : false,
                message : result.message || "Something went wrong while deleting Gear",
                data : null
            }
        }

        revalidateTag(`gear-${gearId}`, "max");
        revalidateTag('gears', "max");

        return result;

    }catch(error){
        console.log("Delete gear Error : ", error);

        return {
            success : false,
            message : "Something went wrong while deleting gear",
            data : null
        }
    }
}