import { loadComponent } from "../../app/app.js";
export function initEditEmployee() {
  const btnSubmit = document.querySelector(".btn_submit");
  const btnCancelSubmit = document.querySelector('.btn_cancel');
  const allInput = document.querySelectorAll('.field_data');
  const btnCancelModal=document.getElementById('close_modal');
  const btnConfirmModal= document.getElementById('modal_submit');
  const toastContainer=document.querySelector('.toast_container');
  const urlParams = new URLSearchParams(window.location.search);
  const empId = parseInt(urlParams.get("id"));
  const getDataEmployee = () => {
    let employee = {};
    const dataEmployee = JSON.parse(localStorage.getItem("employeeList"));
    for (let i = 0; i < dataEmployee.length; i++) {
      if (dataEmployee[i].id === empId) {
        employee = dataEmployee[i];
        break;
      }
    }
    return employee;
  };
  
  const showToast = (checkform) => {
    let message = "";
    let option = "";
    if (checkform) {
      message = "Se modificaron los datos con éxito!!";
      option = "sucess";
    } else {
      message = "Hubo un error al guardar, intenta de nuevo";
      option = "error";
    }
    let toastNotification = `<div class="toast ${option}">
                            <p class="toast_message">${message}</p>
                            </div>`;
    return toastNotification;
  };
  const removeToast = () => {
    toastContainer.innerHTML="";
    
  };
  const loadEmployeeData = () => {
    const empData = getDataEmployee();
    if (empData) {
      const name = document.getElementById("name");
      name.value = empData.name;
      const lastname = document.getElementById("lastName");
      lastname.value = empData.lastname;
      const email = document.getElementById("email");
      email.value = empData.email;
      const phone = document.getElementById("phone");
      phone.value = empData.phone;
      const ci = document.getElementById("ci");
      ci.value = empData.ci;
      //   const photo = document.getElementById("photo");
      //   photo.value = empData.photo;
      const schedule = document.getElementById("schedule");
      schedule.value = empData.schedule;
      const role = document.getElementById("role");
      role.value = empData.role;
    } else {
      console.log("Usuario no encontrado");
    }
  };
  loadEmployeeData();

  const saveDataEmployee = (id) => {
    let employeeList = JSON.parse(localStorage.getItem("employeeList")) || [];

    for (let i = 0; i < employeeList.length; i++) {
      const alertDialog = document.getElementById("alert-dialog");
      let checkForm = alertDialog.dataset.checkForm;
      if (checkForm) {
        const toastNotification = showToast(checkForm);
        toastContainer.innerHTML = toastNotification;
        employeeList[i].name = document.getElementById("name").value;
        employeeList[i].lastname = document.getElementById("lastName").value;
        employeeList[i].email = document.getElementById("email").value;
        employeeList[i].phone = document.getElementById("phone").value;
        employeeList[i].ci = document.getElementById("ci").value;
        employeeList[i].photo = document.getElementById("photo").value;
        employeeList[i].schedule = document.getElementById("schedule").value;
        employeeList[i].role = document.getElementById("role").value;
        localStorage.setItem("employeeList", JSON.stringify(employeeList));
        alertDialog.close();
          setTimeout(() => {
            removeToast();
          }, 3000);
          break;
      } else {
          const toastNotification = showToast(checkForm);
          toastContainer.insertAdjacentHTML = toastNotification;
          console.log(showToast(checkForm));
          break;
        }
    }
    
  };

  const validateField = (field, id) => {
    let isValid = false;
    const inputError = document.getElementById(`${id}_error`);
    let clearField = field.value.trim();
    if (id === "name") {
      if (clearField && clearField.length >= 4 && clearField.length <= 18) {
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
          "El campo debe tener mas de 4 y menos de 18 palabras";
        isValid = false;
      }
    }
    if (id === "lastName") {
      if (clearField && clearField.length >= 4 && clearField.length <= 18) {
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
          "El campo debe tener mas de 4 y menos de 18 palabras";
        isValid = false;
      }
    }
    if (id === "phone") {
      if (clearField && clearField.length >= 7 && clearField.length <= 18) {
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
          "El campo debe tener mas de 7 dígitos y menos de 10 dígitos";
        isValid = false;
      }
    }
    if (id === "ci") {
      if (clearField && clearField.length >= 7 && clearField.length <= 12) {
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
          "El campo debe tener mas de 7 dígitos y menos de 12 dígitos";
        isValid = false;
      }
    }
    if (id === "photo") {
      if (clearField) {
        field.classList.add("valid");
        field.classList.remove("error");
        inputError.classList.remove("show");
        isValid = true;
      } else if (clearField === "") {
        field.classList.add("error");
        field.classList.remove("valid");
        inputError.classList.add("show");
        inputError.textContent = "Debe ingresar una foto de perfil";
        isValid = false;
      } else {
        field.classList.add("error");
        field.classList.remove("valid");
        inputError.classList.add("show");
        isValid = false;
      }
    }
    if (id && id === "schedule") {
      if (clearField !== "schedule0") {
        field.classList.add("valid");
        field.classList.remove("error");
        inputError.classList.remove("show");
        isValid = true;
      } else {
        field.classList.add("error");
        field.classList.remove("valid");
        inputError.classList.add("show");
        inputError.textContent = "Elija un horario";
        isValid = false;
      }
    }
    if (id && id === "role") {
      if (clearField !== "role0") {
        field.classList.add("valid");
        field.classList.remove("error");
        inputError.classList.remove("show");
        isValid = true;
      } else {
        field.classList.add("error");
        field.classList.remove("valid");
        inputError.classList.add("show");
        inputError.textContent = "Elija tipo de empleado";
        isValid = false;
      }
    }
    if (id === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (clearField && emailRegex.test(clearField)) {
        field.classList.add("valid");
        field.classList.remove("error");
        inputError.classList.remove("show");
        isValid = true;
      } else if (clearField === "") {
        field.classList.add("error");
        field.classList.remove("valid");
        inputError.classList.add("show");
        inputError.textContent = "Debe ingresar un correo vàlido";
        isValid = false;
      } else {
        field.classList.add("error");
        field.classList.remove("valid");
        inputError.classList.add("show");
        inputError.textContent = "Debe ingresar un correo vàlido";
        isValid = false;
      }
    }
    return isValid;
  };

  
  btnSubmit.addEventListener("click", () => {
    
    const alertDialog=document.getElementById('alert-dialog');
    let checkForm=true;
    let checks=[];
    allInput.forEach(input=>{
      const isValid=validateField(input, input.id);
      if(!isValid){
        checks.push(false);
      }else {
        checks.push(true);
      }
    })
    checkForm = checks.every(check=> check===true);
    if(checkForm){
      alertDialog.dataset.checkForm=checkForm;
      alertDialog.show();
    }
    
  });

  btnCancelSubmit.addEventListener("click", ()=>{
    window.history.pushState({}, "", "/employeeList");
    loadComponent();
  })

  btnCancelModal.addEventListener("click", ()=>{
    const alertDialog=document.getElementById('alert-dialog');
    alertDialog.close();
  })

  btnConfirmModal.addEventListener("click", (e)=>{
    e.preventDefault()
    saveDataEmployee();
  })  


}

initEditEmployee();
