
const API_URL="http://localhost:8500";
import { loginService } from "../../services/auth.services.js";
import { verifyAuth } from "../../services/auth.services.js";
export async function initLogin(){
    const sessionExist=async()=>{
            const user = await verifyAuth();
            if(user){
                window.location.href = '/app'
                return
            }
        }
    
    const login=async()=>{
        let userData=document.getElementById('user').value;
        let userPass=document.getElementById('pass').value;

        const isLogged= await loginService(userData, userPass);
        if(isLogged){
            console.log('redirigiendo....')
            setTimeout(() => {

                window.location.href='/app';
            }, 1000);
            
        }else{
            alert("usuario invalido")
        }
    }

    let btnLog=document.querySelector('.submit_button');
    const btnAdd=document.querySelector('.btn_add_user');

    btnAdd.addEventListener('click', (e)=>{
        e.preventDefault();   
        window.location.href='../views/auth/registUser.html';
    })

    btnLog.addEventListener("click", (e)=>{
        e.preventDefault()
        login();
        
    
    });
    sessionExist();
}
initLogin()






