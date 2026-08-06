export const getAllCategory = async()=>{
    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/categories`, {
        method : "GET",
        headers : {
            'Content-Type' : 'application/json'
        },
        cache : "force-cache",
        next : {
            revalidate : 60 * 60 * 24 * 7,
            tags : ["category"]
        }
    });

    const result = await res.json();

    return result.data;
}