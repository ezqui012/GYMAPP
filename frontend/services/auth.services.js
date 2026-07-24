const API_URL="http://localhost:8500";

export const loginService=async(email, password)=>{
    try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password}),
                credentials: "include"
            })

    if(!response.ok) throw new Error('Invalid email or password');
    const userData=response.json();
    return userData;

  } catch (error) {
    window.location.href = '/login'
    return null
  }
}

export const logoutService=async()=>{
    try {
      const response= await fetch(`${API_URL}/api/auth/logout`,{
        method: 'POST',
        credentials: "include"
      })

      if(!response.ok)throw new Error("Something went wrong");

      return response.ok;
      
    } catch (error) {
      console.log(error)
    }
}

export const verifyAuth =async()=>{
    try {
      const response = await fetch(`${API_URL}/api/auth/verify`, {
        credentials: "include"
      })
      if(!response.ok){
        window.location.href = '/index.html'
        return null;
      }

      return response.json();
      
    } catch (error) {
      window.location.href = '/index.html'
        return null;
    }
}