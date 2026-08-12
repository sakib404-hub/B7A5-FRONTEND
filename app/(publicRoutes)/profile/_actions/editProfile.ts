"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

interface IEditPayLoad {
  name: string;
  phone: string;
  address: string;
}

export const editProfile = async (payLoad: IEditPayLoad) => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User Not Logged In.",
      data: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_APP_URL}/api/user/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payLoad),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update profile",
        data: null,
      };
    }

    // Invalidate cached profile
    revalidateTag("my-profile", "max");

    return {
      success: true,
      message: "Profile updated successfully",
      data: result.data,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};