const API_URL="http://localhost:8500";

export const getMembershipHistory=async(id)=>{
    try {
        const response= await fetch(`${API_URL}/membershipHistory/${id}`, {
            credentials: "include"
        })
        if(!response.ok)throw new Error(`Error Http ${response.status}`);
        const data=response.json();
        return data;
    } catch (error) {
        console.error('Error http:', error)
    }
}
export const createMembership=async(membership)=>{
    try {
        const response = await fetch(`${API_URL}/createMembership`, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(membership),
            credentials:"include"
        });
        
        if(!response.ok)throw new Error("Error processing data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding data", error);
    }
}