import { loadComponent } from "../../app/app.js";
import {getEmployeEmails} from "../../services/employee.services.js";

export async function initRegistUser() {
    const allInput = document.querySelectorAll(".field_user");
    const btnInitLog= document.querySelector('.btn_init_log');
    const btnSubmit= document.querySelector('.submit_button');
    const btnModalSubmit = document.getElementById('modal_submit');
    const btnCloseModal=document.getElementById('close_modal');
    const toastContainer=document.querySelector('.toast_container');

    const showToast=(checkform)=>{
    let message='';
    let option='';
    if(checkform){
      message='Se registro al usuario con éxito!!';
      option='sucess';
    }else{
      message='Hubo un error al registrar, intenta de nuevo';
      option='error';
    }
    let toastNotification=`<div class="toast ${option}">
                           <p class="toast_message">${message}</p>
                           </div>`
    return toastNotification;
    }
    const removeToast=()=>{
        toastContainer.removeChild(toastContainer.firstChild);
    }
    const registUser=async()=>{
        try {

            const alertDialog = document.getElementById("alert-dialog");
            let checkForm = alertDialog.dataset.checkForm;
            if(checkForm){
                const select = document.querySelector('select[name="selected_email"]');
                const selectedOption = select.selectedOptions[0];
                const email=selectedOption.dataset.email;
                const selectedRole = document.querySelector('#role').value;
                const password=document.getElementById('password').value;
                const response = await fetch('http://localhost:8500/registUser',{
                    method: 'POST',
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id_role: parseInt(selectedRole),
                        password: password,
                        email: email
                        
                    })
                })
                if(!response.ok)throw new Error("error processing data");
                alertDialog.close();
                const toastNotification = showToast(checkForm);
                toastContainer.innerHTML = toastNotification;
                setTimeout(() => {
                    removeToast()
                }, 3000);
                showToast()
                loadEmails();
                console.log('Usuario creado correctamente');
            } else {
                const toastNotification = showToast(checkForm);
                toastContainer.innerHTML = toastNotification;
                console.log(showToast(checkForm));
            }
            toastContainer.addEventListener("click", () => removeToast());

            
            
        }
        catch (error) {
            console.error("error en la peticion", error)
        } 
    }
    
    const validateField=(field, id)=>{
        let isValid=false;
        
        const inputError=document.getElementById(`${id}_error`);
        let clearField = field.value.trim();
        if(id==='role'){
            if(clearField!=='role0'){
                field.classList.add("valid");
                field.classList.remove("error");
                inputError.classList.remove("show");
                isValid = true;
            }else{
                field.classList.add("error");
                field.classList.remove("valid");
                inputError.classList.add("show");
                inputError.textContent = "Elija una opción";
                isValid = false;
            }
        }

        if(id==='email'){
            if(clearField!=='email0'){
                field.classList.add("valid");
                field.classList.remove("error");
                inputError.classList.remove("show");
                isValid = true;
            }else{
                field.classList.add("error");
                field.classList.remove("valid");
                inputError.classList.add("show");
                inputError.textContent = "Elija una opción";
                isValid = false;
            }
        }

        if (id === "password") {
            if (clearField && clearField.length >= 8 && clearField.length <= 18) {
                field.classList.add("valid");
                field.classList.remove("error");
                inputError.classList.remove("show");
                isValid = true;
            } else if (clearField === "") {
                field.classList.add("error");
                field.classList.remove("valid");
                inputError.classList.add("show");
                inputError.textContent = "El campo se encuentra vacío";
                isValid = false;
            } else {
                field.classList.add("error");
                field.classList.remove("valid");
                inputError.classList.add("show");
                inputError.textContent =
                "El campo debe tener mas de 8 y menos de 18 palabras";
                isValid = false;
            }
        }
        return isValid;
 
    }
    const submitChecked=()=>{
        
        const alertDialog = document.getElementById("alert-dialog");
        let checkForm = false;
        let checks = [];
        allInput.forEach((field) => {
        const isValid = validateField(field, field.id);
        if (!isValid) {
            checks.push(false);
        } else {
            checks.push(true);
        }
        });

        checkForm = checks.every((check) => check === true);
        if (checkForm) {
            alertDialog.dataset.checkForm = checkForm;
            alertDialog.show();
        }
    }
    
    const loadEmails=async()=>{
        const employeeEmails= await getEmployeEmails();
        let selectEmail=document.querySelector('select[name=selected_email]');

        while (selectEmail.options.length > 1) {
            selectEmail.remove(1)
        }
        employeeEmails.forEach(empployee=>{
            const newOption=document.createElement('OPTION');
            newOption.classList.add('email_option');
            newOption.textContent=empployee.email;
            newOption.dataset.email=empployee.email;
            newOption.value=empployee.id_employee;
            selectEmail.appendChild(newOption);
        })
    }
        
    loadEmails();

    btnSubmit.addEventListener('click', (e)=>{
        e.preventDefault();
        submitChecked();
    })

    btnModalSubmit.addEventListener('click', (e)=>{
        e.preventDefault()
        registUser();
    })
    btnCloseModal.addEventListener('click',(e)=>{
        e.preventDefault()
        const alertDialog= document.getElementById('alert-dialog');
        alertDialog.close();
    })

    btnInitLog.addEventListener("click",(e)=>{
        e.preventDefault();
        let route = btnInitLog.dataset.route;
        if(route){
            window.history.pushState({}, "", route);
            loadComponent();  
        }
    });

}