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