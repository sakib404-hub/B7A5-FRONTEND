"use server"

import { cookies } from "next/headers"

export const providerSummary = async()=>{
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('accessToken')?.value;

    if(!accessToken){
        return {
            success : false,
            message : "User not logged In.",
            data : null
        }
    }

    try{

          const res = await fetch(
          `${process.env.BACKEND_APP_URL}/api/provider/summary`,
          {
            method: "GET",
            headers: {
              Authorization : `Bearer ${accessToken}`,
            }
          }
        );
    
        const result = await res.json();
    
        if (!res.ok || !result.success) {
          return {
            success: false,
            message: result.message || "Failed to fetch Provider Summary",
            data: null,
          };
        }

        return result;

    }catch(error){
        console.log("Error getting Provider Summary : ", error);

        return {
            success : false,
            message : "Error getting Provider Summary",
            data : null
        }
    }
}