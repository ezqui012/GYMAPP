const API_URL="http://localhost:8500";

export const createMembershipType=async(membershipType)=>{
    try {
        const response = await fetch(`${API_URL}/createMembershipType`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(membershipType),
            credentials: "include"  
        })
        if(!response.ok)throw new Error("error in operation");

        const data= await response.json();
        return data;
    } catch (error) {
        console.error("Error adding data", error)
    }
}