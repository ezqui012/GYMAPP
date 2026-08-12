const API_URL="http://localhost:8500";

export const getDashboardStats=async()=>{
    try {
        const response = await fetch(`${API_URL}/api/auth/dashboardStats`, {
            credentials: "include"
        });
        if(!response.ok)throw new Error(`Error Http ${response.status}`);
        const data = response.json();
        return data;
    } catch (error) {
        console.error('Error http:', error);
    }
}

export const getExpiredMemberships=async()=>{
    try {
        const response = await fetch(`${API_URL}/api/auth/expiredMemberships`, {
            credentials: "include"
        });

        if(!response.ok)throw new Error(`Error Http ${response.status}`);

        const data = response.json();
        return data;
    } catch (error) {
        console.error('Error http:', error);
    }
}

export const getExpiringMemberships=async()=>{
    try {
        const response = await fetch(`${API_URL}/api/auth/expiringMemberships`, {
            credentials: "include"
        });
        if(!response.ok)throw new Error(`Error Http ${response.status}`);
        const data = response.json();
        return data;
    } catch (error) {
        console.error('Error http:', error);
    }
}