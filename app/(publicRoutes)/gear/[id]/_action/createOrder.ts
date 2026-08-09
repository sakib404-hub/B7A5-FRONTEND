"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

interface RentalPayload {
    gearId : string;
    rentalDays : number
}


export const createOrders = async (payLoad : RentalPayload) => {

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/rentals`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body : JSON.stringify(payLoad)
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to Post Users rental Orders",
        data: null,
      };
    }
    revalidateTag("user-rental-orders", "max");
    revalidateTag(`gear-${payLoad.gearId}`, "max");

      revalidatePath(
      "/customer-dashboard/orders"
    );

    return result;

  } catch (error) {
    console.error("Users rental error:", error);

    return {
      success: false,
      message: "Something went wrong while fetching Users rental Orders",
      data: null,
    };
  }
};
