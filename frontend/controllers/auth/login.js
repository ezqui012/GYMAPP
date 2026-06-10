import { loadComponent } from "../../app/app.js";
const API_URL="http://localhost:8500";

export async function initLogin(){
    let users=[
    {
        "user":"car123",
        "name":"Carmen" ,
        "password":"12345678" 
    },
    {
        "user":"pedro123",
        "name":"Pedro" ,
        "password":"12345678" 
    },
    {
        "user":"maria123",
        "name":"maria" ,
        "password":"12345678" 
    },
    ]

    const loginService=async(email, password)=>{
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password}),
                credentials: "include"
            })

            if(!response.ok) throw new Error('Error processing data');

            const userData=response.json();

            return userData;

        } catch (error) {
            console.log('Logging error')
        }
    }
    
    const login=async()=>{
        let userData=document.getElementById('user').value;
        let userPass=document.getElementById('pass').value;
        const isLogged= await loginService(userData, userPass);
        if(isLogged){
            console.log('redirigiendo....')
            setTimeout(() => {

                window.location.href='http://localhost:3000/';
            }, 1000);
            
        }else{
            alert("usuario invalido")
        }
    }

    let btnLog=document.querySelector('.submit_button');
    const btnAdd=document.querySelector('.btn_add_user');
    let verifyAccount=(user,password)=>{
    for (let i = 0; i < users.length; i++) {
        if(user===users[i].user && password===users[i].password){
            return true; 
        }
    }
    return false;
    
    }

    btnAdd.addEventListener('click', (e)=>{
        e.preventDefault();
        let route = btnAdd.dataset.route;
        
        if(route){
            window.history.pushState({}, "", route);
            loadComponent();  
        }
    })

    btnLog.addEventListener("click", (e)=>{
        e.preventDefault()
        login();
        
    
    });
}






