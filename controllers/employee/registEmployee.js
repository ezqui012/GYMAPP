import { Employee } from "../../models/Employee.js";
import { loadComponent } from "../../app/app.js";
export function initRegisterEmployee() {
  const allInput = document.querySelectorAll(".field_data");
  const btnSbumit = document.querySelector(".btn_submit");
  const btnCancel = document.querySelector('.btn_cancel');
  const btnModalSubmit = document.getElementById("modal_submit");
  const btnCloseModal = document.getElementById("close_modal");
  const toastContainer=document.querySelector('.toast_container');
  btnModalSubmit.replaceWith(btnModalSubmit.cloneNode(true));
  const newBtnSubmitModal = document.getElementById('modal_submit');
  
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
  const submitEmployee = () => {
    const alertDialog = document.getElementById("alert-dialog");
    let checkForm = alertDialog.dataset.checkForm;
    if (checkForm) {
      let idEmployee = Date.now();
      let name = document.getElementById("name").value;
      let lastName = document.getElementById("lastName").value;
      let phone = document.getElementById("phone").value;
      let ci = document.getElementById("ci").value;
      let photo = "foto";
      let schedule = document.getElementById("schedule").value;
      let role = document.getElementById("role").value;
      let email = document.getElementById("email").value;
      let newEmployee = new Employee(
        idEmployee,
        name,
        lastName,
        email,
        phone,
        ci,
        photo,
        schedule,
        role
      );
      let employeesList =
        JSON.parse(localStorage.getItem("employeeList")) || [];
      employeesList.push(newEmployee);
      localStorage.setItem("employeeList", JSON.stringify(employeesList));
      console.log("se registro usuario con exito");
      alertDialog.close();
      const toastNotification = showToast(checkForm);
      toastContainer.innerHTML = toastNotification;
      setTimeout(() => {
        removeToast();
      }, 3000);
    } else {
      const toastNotification = showToast(checkForm);
      toastContainer.innerHTML = toastNotification;
      console.log(showToast(checkForm));
    }
    toastContainer.addEventListener("click", () => removeToast());
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
      if (clearField && clearField.length >= 1 && clearField.length <= 10) {
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
          "El campo debe tener mas de 1 dígitos y menos de 10 dígitos";
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
        inputError.textContent = "Elija una opción";
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
        inputError.textContent = "Elija una opción";
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
        inputError.textContent = "El campo se encuentra vacío";
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
  btnSbumit.addEventListener("click", (e) => {
    e.preventDefault();
    submitChecked();
  });
  newBtnSubmitModal.addEventListener("click", (e) => {
    e.preventDefault();
    submitEmployee();
  });
  btnCancel.addEventListener("click", (e)=>{
    e.preventDefault()
    window.history.pushState({}, "", "/app");
    loadComponent();
  });
  
  btnCloseModal.addEventListener("click", (e)=>{
    e.preventDefault();
    const alertDialog= document.getElementById('alert-dialog');
    alertDialog.close();
  })
}

initRegisterEmployee();
