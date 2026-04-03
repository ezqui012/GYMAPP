import { loadComponent } from "../../app/app.js";


export async function initRegistUser() {
    
    const btnInitLog= document.querySelector('.init_log');
    const btnSubmit= document.querySelector('.submit_button');

    const registUser=async()=>{
        try {
            const email=document.getElementById('email').value;
            const pass=document.getElementById('pass').value;
            const response = await fetch('http://localhost:8500/registUser',{
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({
                    password: pass,
                    email: email
                    
                })
            })
            if(!response.ok)throw new Error("error processing data");

            const data=await response.json();
            console.log(data);
            console.log('Usuario creado correctamente');
        }
        catch (error) {
            console.error("error en la peticion", error)
        } 
    }
        
        

    btnSubmit.addEventListener('click', (e)=>{
        e.preventDefault();
        registUser();
    })


    btnInitLog.addEventListener("click",(e)=>{
        e.preventDefault();
        let route = btnInitLog.dataset.route;
        console.log(route)
        if(route){
            window.history.pushState({}, "", route);
            loadComponent();  
        }
    });

}