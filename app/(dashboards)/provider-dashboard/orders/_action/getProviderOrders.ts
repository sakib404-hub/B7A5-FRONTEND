"use server";

import { cookies } from "next/headers";

export const getProviderOrders = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Unauthorized access",
      data: null,
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/provider/orders`, {
        method :'GET',
        headers : {
            Authorization : `Bearer ${accessToken}`,
            'Content-Type' : 'application/json'
        },
        cache :'no-store',
    })

    const result = await res.json();

    if(!res.ok || !result.success){
        return {
            success : false,
            message : result.message || "Something went Wrong."
        }
    }

    return result;


  } catch (error) {
    console.error("Provider order fetching error:", error);

    return {
      success: false,
      message: "Something went wrong while fetching provider orders",
      data: null,
    };
  }
};
