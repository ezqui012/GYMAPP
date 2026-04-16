import { loadComponent } from "../../app/app.js";
import { getAMembershipType, updateMembershipType } from "../../services/membershipType.services.js";
import { MembershipType } from "../../models/MembershipType.js";
export function initEditMembershipType() {
  const btnSubmit = document.querySelector('.btn_submit');  
  const btnCancelSubmit =document.querySelector('.btn_cancel');
  const btnModalSubmit = document.getElementById('modal_submit');
  const btnModalCancel = document.getElementById('close_modal');
  const toastContainer = document.querySelector('.toast_container');

  //cloned button to avoid membershipType registration twice.
  btnModalSubmit.replaceWith(btnModalSubmit.cloneNode(true));   
  const newBtnModalSubmit = document.getElementById('modal_submit');
  
  const urlParams = new URLSearchParams(window.location.search);
  const membershipTypeId = parseInt(urlParams.get("id"));
  
  
  let nameField = document.getElementById('name');
  let priceField = document.getElementById('price');
  let durationField = document.getElementById('duration');
  let descriptionField = document.getElementById('description');
  
  //get the membership Type List from local storage
  const getMembershipTypeData = async () => {
    const membershipTypeData = await getAMembershipType(membershipTypeId);
    return membershipTypeData;
  };

  //load membership type data on the fields
  const loadFieldData=async()=>{
    const membershipTypeData= await getMembershipTypeData();
    nameField.value=membershipTypeData.name;
    priceField.value=membershipTypeData.price;
    durationField.value=membershipTypeData.duration;
    descriptionField.value=membershipTypeData.description;
  }


  //update the membership type data in the local storage 
  async function updateMembershipData(){
    const alertDialog = document.getElementById("alert-dialog");
    let checkForm = alertDialog.dataset.checkForm;
    if (checkForm) {
      const name = document.getElementById("name").value;
      const price = document.getElementById("price").value;
      const duration = document.getElementById("duration").value;
      const description = document.getElementById("description").value;
      let updatedMembershipTypeData= new MembershipType(
        name,
        description,
        duration,
        price
      )
      const isUpdated=await updateMembershipType(membershipTypeId, updatedMembershipTypeData);
      if(isUpdated){
      alertDialog.close();
      const toastNotification = showToast(checkForm);
      toastContainer.innerHTML = toastNotification;
      setTimeout(() => {
          removeToast();
        }, 3000);
      }
    } else {
      const toastNotification = showToast(checkForm);
      toastContainer.insertAdjacentHTML = toastNotification;  
    }
    toastContainer.addEventListener("click", () => removeToast());
  }
  

  //validate all fields before an update
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

  loadFieldData();
  
  
  const showToast=(checkform)=>{
    let message='';
    let option='';
    if(checkform){
      message='Se guardaron los cambios con éxito!!';
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
    updateMembershipData();      
  });
    
  
  btnModalCancel.addEventListener("click", () => {
    alertDialog.closeModal();
  });
}

initEditMembershipType();
