import { Membership } from "../../models/Membership.js";
export function initMembership() {
  const allInput = document.querySelectorAll('.field_data')
  const selectMem = document.getElementById("membershipType");
  const selectClientEntry = document.getElementById("dateClientEntry");
  const btnSubmit = document.querySelector(".btn_submit");
  const btnCancel = document.querySelector(".btn_cancel");
  const toastContainer= document.querySelector('.toast_container');
  const btnModalSubmit = document.getElementById("modal_submit");
  const btnModalCancel = document.getElementById("close_modal");
  btnModalSubmit.replaceWith(btnModalSubmit.cloneNode(true));
  const newBtnSubmitModal = document.getElementById('modal_submit');
  
  let endDate = "";


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


  function getClientList() {
    const clientList = JSON.parse(localStorage.getItem("usersList"));
    return clientList;
  }

  function getMembershipTypeList() {
    const membershiptTypeList = JSON.parse(
      localStorage.getItem("membershipTypeList")
    );
    return membershiptTypeList;
  }

  function loadClientList() {
    const selectClient = document.getElementById("client");
    selectClient.innerHTML = "";
    const firstOpt = document.createElement("OPTION");
    firstOpt.classList.add("opt-client");
    firstOpt.setAttribute("value", "client0");
    firstOpt.textContent = "Asignar cliente";
    selectClient.append(firstOpt);
    const clients = getClientList();
    for (let i = 0; i < clients.length; i++) {
      const newOption = document.createElement("option");
      newOption.classList.add("opt-client");
      newOption.value = clients[i].id;
      newOption.text = `${clients[i].name} ${clients[i].lastName}`;
      selectClient.append(newOption);
    }
  }

  function loadMembershipTypeList() {
    const selectMembershipType = document.getElementById("membershipType");
    selectMembershipType.innerHTML = "";
    const firstOpt = document.createElement("OPTION");
    firstOpt.classList.add("opt-memberType");
    firstOpt.setAttribute("value", "memType0");
    firstOpt.textContent = "Asignar Tipo de Membresia";
    selectMembershipType.append(firstOpt);
    const membershipTypeList = getMembershipTypeList();
    for (let i = 0; i < membershipTypeList.length; i++) {
      const newOption = document.createElement("option");
      newOption.classList.add("opt-memberType");
      newOption.value= membershipTypeList[i].id;
      newOption.text = `${membershipTypeList[i]._membershipName}`;
      selectMembershipType.appendChild(newOption);
    }
  }

  const selectedMembershipData = (id) => {
    const membershipList = getMembershipTypeList();
    let membershipSelected = null;
    if (membershipList) {
      membershipSelected = membershipList.find(
        (memebership) => memebership.id === id
      );
    }

    return membershipSelected;
  };

  const validateDate = () => {
    let newDate = "";
    let actualDay = new Date().getDate();
    let actualMonth = new Date().getMonth() + 1;
    const actualYear = new Date().getFullYear();
    if (actualMonth < 10) {
      actualMonth = "0" + actualMonth;
    }
    if (actualDay < 10) {
      actualDay = "0" + actualDay;
    }
    newDate = `${actualYear}-${actualMonth}-${actualDay}`;
    selectClientEntry.setAttribute("min", newDate);
  };

  const parseInputDate = (inputValue) => {
    if (!inputValue) return null;

    const [year, month, day] = inputValue.split("-");
    return new Date(year, month - 1, day);
  };

  const formatDate = (date) => {
    let formatedDate = "";
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    
    return (formatedDate = `${day}/${month}/${year}`);
  };

  const addDays = (initDate, days) => {
    const finalDate = parseInputDate(initDate);
    finalDate.setDate(finalDate.getDate() + days);
    let dayEndDate = finalDate.getDate();
    let monthEndDate = finalDate.getMonth() + 1;
    const yearEndDate = finalDate.getFullYear();
    if(dayEndDate<10){
      dayEndDate='0'+dayEndDate;
    }
    if(monthEndDate<10){
      monthEndDate='0'+monthEndDate;
    }
    endDate = `${yearEndDate}-${monthEndDate}-${dayEndDate}`;
    return formatDate(finalDate);
  };

  const displayMembershipData = () => {
    const optionSelected = parseInt(selectMem.value);
    const membershipData = selectedMembershipData(optionSelected);
    console.log(membershipData)
    const pPrice = document.querySelector(".price_data");
    const pDuration = document.querySelector(".duration_data");
    const pInitDate = document.querySelector(".initDate_data");
    const pEndDate = document.querySelector(".endDate_data");

    const entryDate = selectClientEntry.value;

    const initialDate = parseInputDate(entryDate);
    const initialDateFormated = formatDate(initialDate);
    const duration = parseInt(membershipData._duration);
    const getFinalDate = addDays(entryDate, duration);
     pPrice.innerHTML = `<strong class="desc_membership_data">Precio:</strong>${membershipData._price} bs`;
     pDuration.innerHTML = `<strong class="desc_membership_data">Duracion:</strong>${membershipData._duration} dias`;
     pInitDate.innerHTML = `<strong class="desc_membership_data">Fecha Inicio:</strong>${initialDateFormated}`;
     pEndDate.innerHTML = `<strong class="desc_membership_data">Fecha Fin:</strong>${getFinalDate}`;
  };

  const submitMembership = () => {
    const alertDialog = document.getElementById("alert-dialog");
    let checkForm = alertDialog.dataset.checkForm;

    if (checkForm) {
      let newMembership = new Membership();
      newMembership._idClient = document.getElementById("client").value;
      newMembership._idMembershipType =parseInt(document.getElementById("membershipType").value);
      newMembership._initDate =document.getElementById("dateClientEntry").value;
      newMembership._endDate = endDate;
      let membershipList = JSON.parse(localStorage.getItem("membershipList")) || [];
      membershipList.push(newMembership);
      localStorage.setItem("membershipList", JSON.stringify(membershipList));
      alertDialog.close();
      const toastNotification = showToast(checkForm);
      toastContainer.innerHTML = toastNotification;
      setTimeout(() => {
        removeToast();
      }, 3000);
    } else {
      const toastNotification = showToast(checkForm);
      toastContainer.innerHTML = toastNotification;
      
    }
    toastContainer.addEventListener("click", () => removeToast());

  };
  const validateField = (field, id) => {
    let isValid = false;
    const inputError = document.getElementById(`${id}_error`);
    let clearField = field.value.trim();

    if (id && id === "client") {
      if (clearField !== "client0") {
        field.classList.add("valid");
        field.classList.remove("error");
        inputError.classList.remove("show");
        isValid = true;
      } else {
        field.classList.add("error");
        field.classList.remove("valid");
        inputError.classList.add("show");
        inputError.textContent = "Asigne un cliente";
        isValid = false;
      }
    }
    if (id && id === "membershipType") {
      if (clearField !== "memType0") {
        field.classList.add("valid");
        field.classList.remove("error");
        inputError.classList.remove("show");
        isValid = true;
      } else {
        field.classList.add("error");
        field.classList.remove("valid");
        inputError.classList.add("show");
        inputError.textContent = "Asigne una membresia";
        isValid = false;
      }
    }
    if (id && id === "dateClientEntry") {
      if (clearField) {
        field.classList.add("valid");
        field.classList.remove("error");
        inputError.classList.remove("show");
        isValid = true;
      } else {
        field.classList.add("error");
        field.classList.remove("valid");
        inputError.classList.add("show");
        inputError.textContent = "Asignar Fecha de inicio ";
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
      console.log(alertDialog.dataset.checkForm)
      alertDialog.show();
    }
  }
  selectClientEntry.addEventListener("change", (e) => {
    e.preventDefault();

    displayMembershipData();
  });

  selectMem.addEventListener("change", (e) => {
    e.preventDefault();
  });

  btnSubmit.addEventListener("click", () => {
    submitChecked();
    
  });
  newBtnSubmitModal.addEventListener("click", (e) => {
    e.preventDefault();
    submitMembership();
  });
  btnCancel.addEventListener("click", () => {
    window.history.pushState({}, "", "/app");
  
  });
  btnModalCancel.addEventListener("click", () => {
    let alertDialog= document.getElementById('alert-dialog');
    alertDialog.close();
  
  });

  validateDate();
  loadMembershipTypeList();
  loadClientList();
}
initMembership();
