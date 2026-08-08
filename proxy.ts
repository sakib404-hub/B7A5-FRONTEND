import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const proxy = async(request : NextRequest) =>{
    const pathname = request.nextUrl.pathname;
    const cookieStore = await cookies();
    
    const accessToken = cookieStore.get('accessToken')?.value;
    const decodedAccessToken = jwt.decode(accessToken);
    console.log(accessToken);
    console.log(decodedAccessToken);
}