"use server";

import { cookies } from "next/headers";
import { CreateGearFormData } from "../_components/GearForm";
import { revalidateTag } from "next/cache";

export const createGear = async (payLoad : CreateGearFormData) => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Unauthorized access",
      data: null,
    };
  }

  try{

    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/provider/gear`, {
        method : 'POST',
        headers : {
            Authorization : `Bearer ${accessToken}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(payLoad)
    })


    const result = await res.json();

    if(!res.ok || !result.success){
        return {
            success : false,
            message : result.message || "Something went wrong.",
            data : null
        }
    }

    revalidateTag('gears', 'max');
    return result;

  }catch(error){
    console.log("Error Creating Gear : ", error);

    return {
        success : false,
        message : "Error Creating the gear",
        data : null 
    }
  }
};
