"use server"

export const getGearDetails = async(id : string)=>{
    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/gear/${id}`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        cache : 'force-cache',
        next : {
            revalidate : 60 * 10,
            tags : [`gear-${id}`]
        }
    });

    const result = await res.json();
    if(!result.success){
        if(result.statusCode === 404){
            return null;
        }
        throw new Error("Failed to fetch the data.");
    }
    return result.data;
}