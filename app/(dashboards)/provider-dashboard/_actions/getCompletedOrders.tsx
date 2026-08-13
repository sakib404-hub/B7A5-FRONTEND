"use server";

import { cookies } from "next/headers";

export const getCompletedOrders = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in.",
      data: null,
    };
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_APP_URL}/api/provider/completed`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch completed orders.",
        data: null,
      };
    }

    return {
      success: true,
      message: result.message || "Completed orders fetched successfully.",
      data: result.data,
    };
  } catch (error) {
    console.error("Error getting completed orders:", error);

    return {
      success: false,
      message: "Error getting completed orders.",
      data: null,
    };
  }
};