const API_URL="http://localhost:8500";


export const getEmployeEmails=async()=>{
        try {
            const response= await fetch(`${API_URL}/employeEmailsWhitoutUser`, {
                credentials: "include"
            })
            
            if(!response.ok)throw new Error(`Error Http ${response.status}`);

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data", error) 
        }
}

export const getDataEmployees=async()=>{
    try {
        const response = await fetch(`${API_URL}/employees`, {
            credentials: "include"
        });
        if(!response.ok) throw new Error(`Error Http ${response.status}`);

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log("Error Fetching data", error);
    }
}

export const registEmployee=async(employee)=>{
    try {
        const response = await fetch(`${API_URL}/createEmployee`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee),
            credentials: "include"
        })

        if(!response.ok)throw new Error("Error procession data");
        const data = await response.json();
        return data;

    } catch (error) {
         console.error("Error adding data", error)
    }
}