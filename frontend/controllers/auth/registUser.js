import { loadComponent } from "../../app/app.js";


export async function initRegistUser() {
    
    const btnInitLog= document.querySelector('.init_log');

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