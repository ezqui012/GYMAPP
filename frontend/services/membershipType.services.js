const API_URL="http://localhost:8500";

export const getActiveMembershipTypes =async ()=>{
    try {
        const response = await fetch(`${API_URL}/api/auth/activeMembershipTypes`, {
            credentials: "include"
        })
        if(!response.ok)throw new Error("Error fetching data");

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error("Error fetching data", error);
    }
}

export const getAMembershipType=async(id)=>{
    try {
        const response = await fetch(`${API_URL}/api/auth/getMembershipType/${id}`,{
            credentials: "include"
        })

        if(!response.ok)throw new Error("Error fetching data");
        
        const data = response.json()
        return data;
    } catch (error) {
        console.log("Error http:", error);
    }
}

export const createMembershipType=async(membershipType)=>{
    try {
        const response = await fetch(`${API_URL}/api/auth/createMembershipType`, {
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

export const updateMembershipType = async (id, membershipType)=>{
    try {
        const response = await fetch(`${API_URL}/api/auth/updateMembershipType/${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(membershipType),
            credentials: "include"
        });

        if(!response.ok)throw new Error("Error in operation");
        console.log('Data was updated');
        return true;
    } catch (error) {
        console.log('Error http:', error);
    }
}

export const disableMembershipType=async(id)=>{
    try {
        const response = await fetch(`${API_URL}/api/auth/disableMembershipType/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
        if(!response.ok)throw new Error("Error in operation");

        console.log("disabled")
        
    } catch (error) {
        console.error("error en la petición", error);
    }
}