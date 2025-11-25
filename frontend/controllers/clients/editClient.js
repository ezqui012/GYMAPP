import { loadComponent } from "../../app/app.js";
export function initEditClient() {
  const btnSubmit = document.getElementById("submit");
  const btnCancelSubmit = document.querySelector('.btn_cancel');
  const allInput = document.querySelectorAll(".field_data");
  const btnSubmitModal = document.getElementById("modal_submit");
  const btnCloseModal = document.getElementById("close_modal");
  const toastContainer=document.querySelector('.toast_container');
  const urlParams = new URLSearchParams(window.location.search);
  const userId = parseInt(urlParams.get("id"));


  function getUserData() {
    let userFound=false;
    let userList = JSON.parse(localStorage.getItem("usersList"));
    for (let i = 0; i < userList.length; i++) {
      if (userId === userList[i].id) {
        const fieldName = document.getElementById("name");
        fieldName.value = userList[i].name;
        const fieldLastName = document.getElementById("lastName");
        fieldLastName.value = userList[i].lastName;
        const fieldPhone = document.getElementById("phone");
        fieldPhone.value = userList[i].phone;
        const fieldCi = document.getElementById("ci");
        fieldCi.value = userList[i].ci;
        const fieldNit = document.getElementById("nit");
        fieldNit.value = userList[i].nit;
        const fieldEmail = document.getElementById("email");
        fieldEmail.value = userList[i].email;
        const fieldPhoto = document.getElementById("photo");
        fieldPhoto.value = "photo";
        userFound=true;
        break;
      } 
    }
    if(!userFound){
      console.log(`usuario no encontrado`);
    }
  }
  getUserData(); 

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
    toastContainer.removeChild(toastContainer.firstChild);
  };

  const updateUserProfile = (id) => {
    let usersList = JSON.parse(localStorage.getItem("usersList")) || [];

    for (let i = 0; i < usersList.length; i++) {
      if (userId === usersList[i].id) {
        const alertDialog = document.getElementById("alert-dialog");
        let checkForm = alertDialog.dataset.checkForm;
        if (checkForm) {
          const toastNotification = showToast(checkForm);
          toastContainer.innerHTML = toastNotification;
          usersList[i].name = document.getElementById("name").value;
          usersList[i].lastName = document.getElementById("lastName").value;
          usersList[i].phone = document.getElementById("phone").value;
          usersList[i].ci = document.getElementById("ci").value;
          usersList[i].nit = document.getElementById("nit").value;
          usersList[i].photo = document.getElementById("photo").value;
          usersList[i].email = document.getElementById("email").value;
          localStorage.setItem("usersList", JSON.stringify(usersList));
          alertDialog.close();
          setTimeout(() => {
            removeToast();
          }, 3000);
          break;
        } else {
          const toastNotification = showToast(checkForm);
          toastContainer.innerHTML = toastNotification;
          
          break;
        }
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
    if (id === "nit") {
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

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const alertDialog = document.getElementById("alert-dialog");
    console.log("llega");
    let checkForm = true;
    let checks = [];
    allInput.forEach((oneInput) => {
      const isValid = validateField(oneInput, oneInput.id);
      if (!isValid) {
        checks.push(false);
      } else checks.push(true);
    });
    checkForm = checks.every((check) => check === true);
    if (checkForm) {
      alertDialog.dataset.checkForm = checkForm;
      alertDialog.show();
    }
    
  });

  btnCancelSubmit.addEventListener('click',()=>{
    window.history.pushState({}, "", "/clientList");
    loadComponent();
  })
  btnSubmitModal.addEventListener("click", (e) => {
      e.preventDefault();
      updateUserProfile(userId);
    });

  btnCloseModal.addEventListener("click", () => {
    const alertDialog = document.getElementById("alert-dialog");
    alertDialog.close();
  });
  
}
