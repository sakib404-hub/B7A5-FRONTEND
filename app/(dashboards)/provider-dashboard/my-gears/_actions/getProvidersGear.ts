"use server";

import { cookies } from "next/headers";

export const getProviderGear = async () => {
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
      `${process.env.BACKEND_APP_URL}/api/provider/gear`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "force-cache",
        next: {
          revalidate: 60 * 60,
          tags: ["provider-gears"],
        },
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch Provider Gears",
        data: null,
      };
    }

    return result;
  } catch (error) {}
};
