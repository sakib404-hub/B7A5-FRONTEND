"use server";

import { cookies } from "next/headers";

export const getCompletedOrders = async () => {
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
    const res = await fetch(
      `${process.env.BACKEND_APP_URL}/api/rentals/completed`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to fetch completed rental orders",
        data: null,
      };
    }

    return result;
  } catch (error) {
    console.error(
      "Completed rental orders error:",
      error
    );

    return {
      success: false,
      message:
        "Something went wrong while fetching completed rental orders",
      data: null,
    };
  }
};