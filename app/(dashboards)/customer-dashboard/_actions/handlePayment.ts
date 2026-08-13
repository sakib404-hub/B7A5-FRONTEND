"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handlePayment = async (orderId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not Logged In.",
      data: null,
    };
  }

  let paymentUrl: string;

  try {
    const response = await fetch(
      `${process.env.BACKEND_APP_URL}/api/payments/create/${orderId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Payment initialization failed.",
        data: null,
      };
    }

    paymentUrl = result.data.paymentUrl;
  } catch (error) {
    console.error("Payment Error:", error);

    return {
      success: false,
      message: "Error occurred while paying.",
      data: null,
    };
  }

  redirect(paymentUrl);
};