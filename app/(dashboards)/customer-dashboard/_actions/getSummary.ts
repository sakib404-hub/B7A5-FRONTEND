"use server"

import { cookies } from "next/headers"

export const getSummary = async()=>{
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value;

    if(!accessToken){
        return {
            success : false,
            message : "User not logged In.",
            data : null
        }
    }


     try {
        const res = await fetch(
          `${process.env.BACKEND_APP_URL}/api/user/summary`,
          {
            method: "GET",
            headers: {
              Authorization : `Bearer ${accessToken}`,
            },
          }
        );
    
        const result = await res.json();
    
        if (!res.ok || !result.success) {
          return {
            success: false,
            message: result.message || "Failed to fetch Users Summary",
            data: null,
          };
        }
    
        return result;
      } catch (error) {
        console.error("Users summary error:", error);
    
        return {
          success: false,
          message: "Something went wrong while fetching Users Summary",
          data: null,
        };
      }
}