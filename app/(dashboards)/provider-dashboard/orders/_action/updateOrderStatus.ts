"use server";

import { cookies } from "next/headers";
import { OrderStatus } from "../_components/OrderStatus";
import { revalidateTag } from "next/cache";

export const updateStatus = async (
  orderId: string,
  status: OrderStatus
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
      data: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_APP_URL}/api/provider/orders/${orderId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderStatus : status
        }),
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Something went wrong.",
        data: null,
      };
    }

    return result;
  } catch (error) {
    console.error("Error updating status:", error);

    return {
      success: false,
      message: "Order status updation failed.",
      data: null,
    };
  }
};