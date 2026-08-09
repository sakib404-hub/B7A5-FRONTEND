"use server";

import { cookies } from "next/headers";
import { EditGearFormData } from "../_components/EditGear";
import { revalidateTag } from "next/cache";

export const updateGearInformation = async (
  gearId: string,
  payLoad: EditGearFormData
) => {
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
      `${process.env.BACKEND_APP_URL}/api/provider/gear/${gearId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payLoad),
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch Update Gears",
        data: null,
      };
    }

    revalidateTag(`gear-${gearId}`, "max");

    return result;
  } catch (error) {
    console.error("Provider gear update error:", error);

    return {
      success: false,
      message: "Something went wrong updating gears",
      data: null,
    };
  }
};
