
const API_URL="http://localhost:8500";


export const getAllClients=async()=>{
    
    try {
        const response=await fetch(`${API_URL}/clients`,{
        credentials: 'include'
        });

        if(!response.ok)throw new Error(`Error Http ${response.status}`);
        

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data", error) 
    }
    
}


export const getActiveClients=async()=>{
    try {
        const response= await fetch(`${API_URL}/activeClients`, {
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
        const response = await fetch(`${API_URL}/createClient`, {
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