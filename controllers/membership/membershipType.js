import { loadComponent } from "../../app/app.js";
import { MembershipType } from "../../models/MembershipType.js";
//flag avoid double init
export function initMembershipType() {
 
  const btnSubmit = document.querySelector(".btn_submit");
  const btnCancelSubmit = document.querySelector(".btn_cancel");
  const btnModalSubmit = document.getElementById("modal_submit");
  const btnModalCancel = document.getElementById("close_modal");
  const toastContainer = document.querySelector('.toast_container');
  btnModalSubmit.replaceWith(btnModalSubmit.cloneNode(true));   
  const newBtnModalSubmit = document.getElementById('modal_submit');
  
    function submitMembership(){
    const alertDialog = document.getElementById("alert-dialog");
    const checkDialog = alertDialog.dataset.checkForm;
    if (checkDialog) {
      const newMembershipType = new MembershipType();
      newMembershipType.name = document.getElementById("name").value;
      newMembershipType.price = document.getElementById("price").value;
      newMembershipType.duration = document.getElementById("duration").value;
      newMembershipType.description =
        document.getElementById("description").value;
      let membershipTypeList = JSON.parse(localStorage.getItem("membershipTypeList")) || [];
      membershipTypeList.push(newMembershipType);
      localStorage.setItem("membershipTypeList", JSON.stringify(membershipTypeList));
      alertDialog.close();
      const toastNotification = showToast(checkDialog);
      toastContainer.innerHTML = toastNotification;
      clearField();
      setTimeout(() => {
        removeToast();
      }, 3000);
    } else {
      const toastNotification = showToast(checkDialog);
      toastContainer.innerHTML = toastNotification;
    }
    toastContainer.addEventListener("click", () => removeToast());
  }
  function sendMembership() {
    const allField = document.querySelectorAll(".field_data");
    const alertDialog = document.getElementById("alert-dialog");
    let checkForm = false;
    let checks = [];
    allField.forEach((field) => {
      let isValid = validateField(field, field.id);
      if (!isValid) {
        checks.push(false);
      } else {
        checks.push(true);
      }
    });
    checkForm = checks.every((check) => check === true);
    if (checkForm) {
      alertDialog.dataset.checkForm = checkForm;
      alertDialog.showModal();
    }
  }

  const validateField = (field, id) => {
    let isValid = false;
    const inputError = document.getElementById(`${id}_error`);
    let clearField = field.value.trim();

    if (id === "name") {
      if (clearField && clearField.length >= 3 && clearField.length <= 15) {
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
          "El campo debe tener mas de 3 y menos de 15 palabras";
        isValid = false;
      }
    }
    if (id === "price") {
      if (clearField && clearField.length >= 2 && clearField.length <= 4) {
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
          "El campo debe tener mas de 2 y menos de 4 digitos";
        isValid = false;
      }
    }
    if (id === "duration") {
      if (clearField && clearField.length >= 1 && clearField.length <= 5) {
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
          "El campo debe tener mas de 1 dígitos y menos de 5 dígitos";
        isValid = false;
      }
    }
    if (id === "description") {
      if (clearField && clearField.length >= 5 && clearField.length <= 150) {
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
          "El campo debe tener mas de 5 caracteres  y menos de 150 caracteres";
        isValid = false;
      }
    }
    return isValid;
  };
  
  const clearField=()=>{
    const allField = document.querySelectorAll(".field_data");
    allField.forEach(field=> field.value='');
  }
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
    toastContainer.innerHTML='';
  }
  
  
  btnSubmit.addEventListener("click", () => {
    sendMembership();
  });
  btnCancelSubmit.addEventListener("click", () => {
    window.history.pushState({}, "", "/app");
    loadComponent();
  });
  newBtnModalSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    submitMembership();      
  });
    
  
  btnModalCancel.addEventListener("click", () => {
    alertDialog.closeModal();
  });
}



  initMembershipType();