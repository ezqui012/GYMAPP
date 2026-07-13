const API_URL="http://localhost:8500";


export const getEmployeEmails=async()=>{
        try {
            const response= await fetch(`${API_URL}/api/auth/employeEmailsWhitoutUser`, {
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
        const response = await fetch(`${API_URL}/api/auth/employees`, {
            credentials: "include"
        });
        if(!response.ok) throw new Error(`Error Http ${response.status}`);

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log("Error Fetching data", error);
    }
}

export const getAEmployee=async(id)=>{
    try {
        const response= await fetch(`${API_URL}/api/auth/employee/${id}`, {
            credentials: "include"
        });
        
        if(!response.ok)throw new Error(`Error Http ${response.status}`);

        const data= await response.json();
        return data;
    } catch (error) {
        console.error('Error http:', error)
    }
}

export const registEmployee=async(employee)=>{
    try {
        const response = await fetch(`${API_URL}/api/auth/createEmployee`,{
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


export const updateEmployee=async(id, employeeData)=>{
    try {
        const response= await fetch(`${API_URL}/api/auth/updateEmployee/${id}`, {
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData),
            credentials: "include"
        })

        if(!response.ok)throw new Error("error updating data");

        const data= response.json();
        return data;
    } catch (error) {
        console.error('Error in operation update', error)
    }
}

export const deleteEmployee=async(id)=>{
    try {
        const response=await fetch(`${API_URL}/api/auth/deleteEmployee/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });
        if(!response){
            throw new Error(`Error htt: ${response.status}`)
        }

        
    } catch (error) {
        console.error('Failed to delete:', error);
    }
}