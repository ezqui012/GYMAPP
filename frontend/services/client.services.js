
const API_URL="http://localhost:8500";



export const getClientsByMebershipState=async()=>{
    try {
        const response = await fetch(`${API_URL}/api/auth/clientsByMembershipState`, {
            credentials: "include"
        })
        if(!response.ok)throw new Error(`Error Http ${response.status}`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data", error) 
    }
}

export const getClientByMembershipState=async(id)=>{
    try {
        const response = await fetch(`${API_URL}/api/auth/clientByMembershipState/${id}`,{
            credentials:"include"
        })
        if(!response.ok)throw new Error(`Error Http ${response.status}`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data", error) 
    }
}
export const getAllClients=async()=>{
    
    try {
        const response=await fetch(`${API_URL}/api/auth/clients`,{
        credentials: 'include'
        });

        if(!response.ok)throw new Error(`Error Http ${response.status}`);
        

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data", error) 
    }
    
}

export const getInactiveClients =async()=>{
        try {
            const response = await fetch(`${API_URL}/api/auth/inactiveClients`, {
                credentials: "include"
            })
            const data = await response.json();
            return data
        } catch (error) {
            console.log("Error fetching data", error);
        }
}

export const getDeletedClients=async()=>{
    try {
        const response = await fetch(`${API_URL}/api/auth/getSoftDeletedClients`, {
            credentials: "include"
        });
        const data = await response.json()
        return data;
    } catch (error) {
        console.log("Error fetching data", error);
    }
}

export const getActiveClientsByActiveMembership=async()=>{
    try {
        const response= await fetch(`${API_URL}/api/auth/activeClients`, {
            credentials: 'include'
        })
        if(!response.ok) throw new Error(`Error Http> ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data", error) 
    }
}

export const createClient=async(client)=>{
    try {
        const response = await fetch(`${API_URL}/api/auth/createClient`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client),
            credentials: 'include'
        })
        if(!response.ok)throw new Error("error in operation");

        const data= await response.json();
        console.log(data);
        
    } catch (error) {
        console.error("error en la peticion", error);
    }
}

export const softDeleteClient=async(id)=>{
    try {
        const response = await fetch(`${API_URL}/api/auth/softDeleteClient/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
        console.log(response)
        if(!response.ok)throw new Error("Action error");
    } catch (error) {
        console.error("error en la petición", error);
    }
}