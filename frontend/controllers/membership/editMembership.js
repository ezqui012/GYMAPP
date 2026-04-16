export function initEditMembership() {
  const selectMem = document.getElementById("membershipType");
  const selectClientEntry = document.getElementById("dateClientEntry");
  const btnSubmit = document.querySelector(".btn_submit");
  const btnCancel = document.querySelector(".btn_cancel");
  const toastContainer = document.querySelector(".toast_container");
  const btnModalSubmit = document.getElementById("modal_submit");
  const btnModalCancel = document.getElementById("close_modal");
  btnModalSubmit.replaceWith(btnModalSubmit.cloneNode(true));
  const newBtnSubmitModal = document.getElementById("modal_submit");

  let endDate = "";

  const urlParams = new URLSearchParams(window.location.search);
  const membershipId = parseInt(urlParams.get("id"));

    
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

  
  const getClientList = () => {
    const clientList = JSON.parse(localStorage.getItem("usersList")) || [];
    return clientList;
  };

  const getMembershipData = () => {
    const membershipList =
      JSON.parse(localStorage.getItem("membershipList")) || [];
    const membershipData = membershipList.find((membership) => membership._idMembership === membershipId);
    return membershipData;
  };
  function getMembershipTypeList() {
    const membershiptTypeList = JSON.parse(
      localStorage.getItem("membershipTypeList")
    );
    return membershiptTypeList;
  }



  const loadClientList = () => {
    const clients = getClientList();
    const clientIdMembership = parseInt(getMembershipData()._idClient);
    const clientSelect = document.getElementById("client");
    clientSelect.innerHTML = "";
    for (let i = 0; i < clients.length; i++) {
      const clientOpt = document.createElement("OPTION");
      clientOpt.textContent = `${clients[i].name} ${clients[i].lastName}`;
      clientOpt.classList.add("opt-client");
      clientOpt.value=clients[i].id;
      if (clientIdMembership === parseInt(clientOpt.value)) {
        clientOpt.selected = true;
        clientSelect.append(clientOpt);
      } else {
        clientSelect.append(clientOpt);
      }
    }
  };


  const selectedMembershipData = (id) => {
    const membershipList = getMembershipTypeList();
    let membershipSelected = null;
    if (membershipList) {
        membershipSelected = membershipList.find((membership) => membership.id === id
      );
    }

    return membershipSelected;
  }
  const loadMembershipTypeList = () => {
    const selectMembershipType = document.getElementById("membershipType");
    const membershipTypeList =JSON.parse(localStorage.getItem("membershipTypeList")) || [];
    const membershipTypeId = getMembershipData();
    selectMembershipType.innerHTML='';
    for (let i = 0; i < membershipTypeList.length; i++) {
      const membershipTypOpt = document.createElement("OPTION");
      membershipTypOpt.classList.add("opt-memberType");
      membershipTypOpt.value=membershipTypeList[i].id;
      membershipTypOpt.innerHTML = membershipTypeList[i]._membershipName;
      if (membershipTypeId._idMembershipType === membershipTypeList[i].id) {
            membershipTypOpt.selected = true;
            selectMembershipType.append(membershipTypOpt);
      } else {
        selectMembershipType.append(membershipTypOpt);
      }
    }
  };

  const loadMembershipDate = () => {
    const membershipData = getMembershipData();
    const initDate = document.getElementById("dateClientEntry");
    initDate.value = membershipData._initDate;
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
  const formatOutputDate=(date)=>{
    const [year, month, day]=date.split('-');
    const formatedDate=`${day}-${month}-${year}`;

    return formatedDate;
  }

  const addDays = (initDate, days) => {
    const finalDate = parseInputDate(initDate);
    finalDate.setDate(finalDate.getDate() + days);
    let dayEndDate = finalDate.getDate();
    let monthEndDate = finalDate.getMonth() + 1;
    const yearEndDate = finalDate.getFullYear();
    endDate = `${yearEndDate}-${monthEndDate}-${dayEndDate}`;
    return formatDate(finalDate);
  };

  const loadSectionData=()=>{
    const sectionData=document.querySelector('.section_data_container');
    const membshipData=getMembershipData();
    const selectedMembershipTypeData=selectedMembershipData(membshipData._idMembershipType);
    if(sectionData){      
      let price=document.querySelector('.price_data');
      let duration=document.querySelector('.duration_data');
      let initDate=document.querySelector('.initDate_data');
      let endDate=document.querySelector('.endDate_data');

      price.innerHTML=`<strong class="desc_membership_data">Precio:</strong>${selectedMembershipTypeData._price}bs`;
      duration.innerHTML=`<strong class="desc_membership_data">Duracion:</strong>${selectedMembershipTypeData._duration} dias`;
      initDate.innerHTML=`<strong class="desc_membership_data">Fecha Inicio:</strong>${formatOutputDate(membshipData._initDate)}`;
      endDate.innerHTML=`<strong class="desc_membership_data">Fecha Fin:</strong>${formatOutputDate(membshipData._endDate)}`;
    }
  }                                 
  const displayMembershipData = () => {
    const optionSelected = parseInt(selectMem.value);
    const membershipData = selectedMembershipData(optionSelected);
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

  const updateMembership = () => {
    let membershipList=JSON.parse(localStorage.getItem('membershipList'))||[];
    
    for (let i = 0; i < membershipList.length; i++) {
      if(membershipId===membershipList[i]._idMembership){
        const alertDialog = document.getElementById("alert-dialog");
        let checkForm = alertDialog.dataset.checkForm;
        if (checkForm) {
        const toastNotification = showToast(checkForm);
        toastContainer.innerHTML = toastNotification;
        membershipList[i]._idClient = document.getElementById("client").value;
        membershipList[i]._idMembershipType = parseInt(document.getElementById("membershipType").value);
        membershipList[i]._initDate = document.getElementById("dateClientEntry").value;
        membershipList[i]._endDate = endDate;
    
        localStorage.setItem("membershipList", JSON.stringify(membershipList));
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
  const submitChecked = () => {
    const allInput = document.querySelectorAll(".field_data");
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
      console.log(alertDialog.dataset.checkForm);
      alertDialog.show();
    }
  };
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
    updateMembership();
  });
  btnCancel.addEventListener("click", () => {
    window.history.pushState({}, "", "/app");
  });
  btnModalCancel.addEventListener("click", () => {
    let alertDialog = document.getElementById("alert-dialog");
    alertDialog.close();
  });
  //checkFilledFields();
  
  validateDate();
  loadMembershipDate();
  loadClientList();
  loadMembershipTypeList();
  loadSectionData();
}

initEditMembership();
