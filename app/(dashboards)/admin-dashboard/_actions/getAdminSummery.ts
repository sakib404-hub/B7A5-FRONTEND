"use server";

import { cookies } from "next/headers";

export const getAdminSummary = async () => {
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
      `${process.env.BACKEND_APP_URL}/api/admin/summary`,
      {
        method: "GET",
        headers: {
          Authorization : `Bearer ${accessToken}`,
        },
        next: {
          revalidate: 60,
          tags: ["admin-summary"],
        },
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch admin summary",
        data: null,
      };
    }

    return result.data;
  } catch (error) {
    console.error("Admin summary error:", error);

    return {
      success: false,
      message: "Something went wrong while fetching admin summary",
      data: null,
    };
  }
};