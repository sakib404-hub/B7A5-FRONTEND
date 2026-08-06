"use server"

export const getAllGears = async()=>{
    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/gear`, {
        method : "GET",
        headers : {
            'Content-Type' : 'application/json'
        },
        cache : "force-cache",
        next : {
            revalidate : 60 * 60 * 24,
            tags : ["gears"]
        }
    });

    const result = await res.json();

    return result.data;
}