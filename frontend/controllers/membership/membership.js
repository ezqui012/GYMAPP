import { Membership } from "../../models/Membership.js";
import { getActiveMembershipTypes } from "../../services/membershipType.services.js";
import { getClientByMembershipState } from "../../services/client.services.js";
import { createMembership, getMembershipHistory } from "../../services/membership.services.js";
export async function initMembership() {
    const toastContainer=document.querySelector('.toast_container');
    const allInput = document.querySelectorAll(".field_data");
    const selectClientEntry = document.querySelector(".membership_init_date");
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = parseInt(urlParams.get("id"));
    const selectTypeMembership = document.querySelector('.select_type_membership');
    

    const btnRenovate= document.querySelector('.renovate');
    const btnChangeMembershipType=document.querySelector('.change_plan');
    const btnConfirmSubscription = document.querySelector('.confirm_subscription');
    const btnDisableMembership = document.querySelector('.disable_button');
    const btnFirstTime = document.querySelector('.first_time');
    const btnCloseModal = document.getElementById("close_modal");
    const btnModalSubmit = document.getElementById("modal_submit");
    btnModalSubmit.replaceWith(btnModalSubmit.cloneNode(true));
    const newBtnSubmitModal = document.getElementById('modal_submit')

    const showToast=(checkform)=>{
        let message='';
        let option='';
        if(checkform){
        message='Se registro la membresía con éxito!!';
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

    const loadPlans=async()=>{
        const membershipTypes= await getActiveMembershipTypes();
        const selectField= document.querySelector('.select_type_membership');
        selectField.innerHTML="";
        for (let i = 0; i < membershipTypes.length; i++) {
            const newOpt= document.createElement('OPTION');
            newOpt.classList.add('options');
            newOpt.innerHTML=membershipTypes[i].name;
            newOpt.value=membershipTypes[i].id_membership_type;
            selectField.append(newOpt)   
        }
    }

    const disableOptions=async()=>{
        const clientData= await getClientByMembershipState(clientId)
        console.log(clientData)
        const currentMembership= document.querySelector('.current_membership_data');
        if(clientData.state==='sin membresía'){
            selectClientEntry.disabled=true;
            selectTypeMembership.disabled=true;
            btnChangeMembershipType.disabled=true;
            btnRenovate.disabled=true;
            btnDisableMembership.disabled=true;
            btnConfirmSubscription.disabled=true;
        }else if(clientData.state==='activo' || clientData.state==='por_expirar'){
            btnFirstTime.disabled=true;
            selectClientEntry.disabled=true;
            selectTypeMembership.disabled=true
        }
    }

    const renovateMembership=async()=>{
        const memberships= await getMembershipHistory(clientId);
        
        const membership=memberships[0];
        
        if(membership.state==='activo'|| membership.state==='por_expirar'){
            const outputEndDate= document.querySelector('.membership_end_date')
            const initDate= document.querySelector('.membership_init_date');
            initDate.value=addDays(membership.end_date,1)
            selectTypeMembership.value=membership.id_membership_type;
            const formatedEndDate= formatDate(membership.end_date);
            const duration = parseInt(await getMembershipDuration());
            const daysRemaining=getDaysRemainingMembership(formatedEndDate);
            const endDate=addDays(initDate.value, duration);
            outputEndDate.innerHTML=endDate;
        }else{
            if(membership.state==='expirado'){
                const initDate= document.querySelector('.membership_init_date');
                selectTypeMembership.value=membership.id_membership_type;
                initDate.value=setCurrentDate();
            }
        }
    }
    
    const enableOptions=async()=>{
        const clientData= await getClientByMembershipState(clientId)
        const currentMembership= document.querySelector('.current_membership_data');
        if(clientData.state==='sin membresía'){
            selectClientEntry.disabled=false;
            selectTypeMembership.disabled=false;
            btnChangeMembershipType.disabled=false;
            btnRenovate.disabled=false;
            btnDisableMembership.disabled=false;
            btnConfirmSubscription.disabled=false;
        }else if(clientData.state==='activo'){
            selectClientEntry.disabled=false;
            selectTypeMembership.disabled=false;
            btnChangeMembershipType.disabled=false;
            btnRenovate.disabled=false;
            btnDisableMembership.disabled=false;
            btnConfirmSubscription.disabled=false;
        }
    }

    const loadClientData=async()=>{
        const clientData= await getClientByMembershipState(clientId);
        const membership= await getMembershipHistory(clientId);
        const pClientContainer= document.querySelector('.client_data_container');
        const setClientData =`<p class="client_data name"><strong class="text_data_client">Cliente:</strong> ${clientData.name}</p>
                              <p class="client_data email"><strong class="text_data_client">Correo:</strong> ${clientData.email}</p>
                              <p class="client_data ci"><strong class="text_data_client">CI:</strong> ${clientData.ci}</p>`;
        pClientContainer.innerHTML=setClientData;
        if(clientData.state==='sin membresía'){
            const pMembershipDataContainer = document.querySelector('.current_membership_data_container');
            const setMembershipData=`<p class="current_membership_data"><Strong>Membresía Actual</Strong></p>
                                     <p class="current_membership_data "><strong>-------------</strong></p>
                                     <p class="current_membership_data">------------</p>`
            pMembershipDataContainer.innerHTML=setMembershipData;
        }
        if(membership[0].state==='activo' || membership[0].state==='por_expirar' ){
            const formatedEndDate=formatDate(membership[0].end_date)
            const pMembershipDataContainer = document.querySelector('.current_membership_data_container');
            const setMembershipData=`<p class="current_membership_data"><Strong>Membresía Actual</Strong></p>
                                     <p class="current_membership_data "><strong>${membership[0].name}</strong></p>
                                     <p class="current_membership_data$">Renueva en ${getDaysRemainingMembership(formatedEndDate)} días</p>`
            pMembershipDataContainer.innerHTML=setMembershipData;
        }else if(membership[0].state==='expirado'){
            const formatedEndDate=formatDate(membership[0].end_date)
            const pMembershipDataContainer = document.querySelector('.current_membership_data_container');
            const setMembershipData=`<p class="current_membership_data"><Strong>Membresía Actual</Strong></p>
                                     <p class="current_membership_data "><strong>${membership[0].name}</strong></p>
                                     <p class="current_membership_data$">Membresía Expirada</p>`
            pMembershipDataContainer.innerHTML=setMembershipData
        }
        
        
    }


    /**<td class="prueba"><li class="circle"><ul class="circle_props">Básico</ul></li></td>
            <td class="prueba">Abril 15, 2026</td>
            <td class="prueba"> Mayo 15, 2026</td>
            <td class="prueba"><div class="state_membership">Activo</div></td> */
    const loadMembershipHistory=async()=>{
        const tBodyContainer = document.querySelector('.tbody_container');
        const memberships= await getMembershipHistory(clientId);
        tBodyContainer.innerHTML = "";
        for (let i = 0; i < memberships.length; i++) {
            const trContainer = document.createElement("tr");
            trContainer.classList.add("data-row");

            const tMembershipName=` <td class='cell_data'>
                                        <div class="cell_with_dot">
                                            <span class="state_dot ${memberships[i].state}"></span>
                                            ${memberships[i].name}
                                        </div>
                                    </td>`
            trContainer.innerHTML=tMembershipName;

            const tdInitDate=document.createElement('TD');
            tdInitDate.classList.add('cell_data');
            tdInitDate.innerHTML=formatDate(memberships[i].init_date);
            trContainer.append(tdInitDate);

            const tdEndDate=document.createElement('TD');
            tdEndDate.classList.add('cell_data');
            tdEndDate.innerHTML=formatDate(memberships[i].end_date);
            trContainer.append(tdEndDate);


            const tdMembershipStatus=document.createElement('TD');
            tdMembershipStatus.classList.add('cell_data');
            const stateMembership= document.createElement('div');
            stateMembership.classList.add('state_membership');
            stateMembership.innerHTML=memberships[i].state;
            const newElement=changeRowStyle(stateMembership,memberships[i].state);
            tdMembershipStatus.append(newElement);
            trContainer.append(tdMembershipStatus)
            
            tBodyContainer.append(trContainer);
        }
        
    }


    const changeRowStyle=(element,state)=>{
        if(state==='expirado'){
            element.style.backgroundColor='Grey';
            element.style.opacity=0.5;
        }else if(state==='pendiente'){
            element.style.backgroundColor='orange';
        }
        return element;
    }

    const getMembershipDuration=async()=>{
        const selectField= document.querySelector('.select_type_membership');
        const idSelect=parseInt(selectField.value);
        const membershipTypes= await getActiveMembershipTypes();
        for (let i = 0; i < membershipTypes.length; i++) {
           if(membershipTypes[i].id_membership_type===idSelect){
                return membershipTypes[i].duration;
           }
           
        }
    }

    const getDaysOfMonth =(year, month)=>{
        let daysOfMonth= new Date(year,month,0).getUTCDate();
        return daysOfMonth;
    }

    const getDaysRemainingMembership=(date)=>{
        const [year, month, day] = date.split('-').map(Number)
        const endUTC = Date.UTC(year, month - 1, day)
        const currentDate= new Date();
        const currentDateUTC= Date.UTC(
            currentDate.getUTCFullYear(),
            currentDate.getUTCMonth(),
            currentDate.getUTCDate()
        )
        const daysRemaining=endUTC-currentDateUTC;
        const dias = Math.ceil(daysRemaining / (1000 * 60 * 60 * 24));
        return dias;
    }

    
    const formatDate =(date)=>{
        let currentDate=new Date(date);
        let [day, month, year]=[currentDate.getUTCDate(), currentDate.getUTCMonth()+1, currentDate.getUTCFullYear()];
        if(day<10)day='0'+day;
        if(month<10)month='0'+month;
        const currentFormatedDate =`${year}-${month}-${day}`;
        return currentFormatedDate;
    }
    
    const validateDate = () => {
        let newDate = "";
        let actualDay = new Date().getDate();
        let actualMonth = new Date().getMonth() + 1;
        const actualYear = new Date().getFullYear();
        if (actualMonth < 10)actualMonth = "0" + actualMonth;
        if (actualDay < 10)actualDay = "0" + actualDay;
        newDate = `${actualYear}-${actualMonth}-${actualDay}`;
        selectClientEntry.setAttribute("min", newDate);
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

    const setCurrentDate=()=>{
        let newDate= new Date();
        const initDate= document.querySelector('.membership_init_date');
        let endDate= document.querySelector('.membership_end_date');
        let [day,month,year]=[newDate.getDate(), newDate.getMonth() +1, newDate.getFullYear()];

        if(day<10)day='0'+day;
        if(month<10)month='0'+month;
        const newDateFormated= `${year}-${month}-${day}`;
        endDate.textContent="-------------";
        initDate.value=newDateFormated;
    }

    const addDays=(initDate, duration)=>{
        let finalDate="";
        let initDateData=new Date(initDate);
        let currentYear=initDateData.getUTCFullYear();
        let currentMonth=initDateData.getUTCMonth()+1;
        let currentDaysOfMonth= getDaysOfMonth(currentYear, currentMonth);
        let currentDayOfMonth = initDateData.getUTCDate()
        let daysAvailableCurrentMonth=0;
        let endDay="";
        let endYear="";
        let endMonth="";
        
        while(duration>0){
            daysAvailableCurrentMonth=currentDaysOfMonth-currentDayOfMonth;
            if(daysAvailableCurrentMonth>=duration){
                endDay= currentDayOfMonth+duration;
                duration=0;
                endYear=currentYear;
                endMonth=currentMonth;
                finalDate=`${endYear}-${endMonth}-${endDay}`;
            }
            else{
                if(currentMonth===12){
                    duration=duration-daysAvailableCurrentMonth;
                    currentYear=currentYear+1;
                    currentMonth=1;
                    currentDayOfMonth=0;
                    currentDaysOfMonth=getDaysOfMonth(currentYear, currentMonth); 
                }else{
                    if(daysAvailableCurrentMonth===0){
                        currentMonth=currentMonth+1;
                        currentDaysOfMonth=getDaysOfMonth(currentYear, currentMonth);
                        currentDayOfMonth=0;
                        
                    }else{
                        duration=duration-daysAvailableCurrentMonth;
                        currentMonth=currentMonth+1;
                        currentDayOfMonth=0;
                        currentDaysOfMonth=getDaysOfMonth(currentYear, currentMonth);
                        finalDate=`${endYear}-${endMonth}-${endDay}`; 
                    }
                    
                }
            }
        }
        const finalFormatedDate=formatDate(finalDate);
        return finalFormatedDate;
    }

    const processMembershipDate=async(state)=>{
        const initDateValue = document.querySelector('.membership_init_date').value;
        const outputEndDate= document.querySelector('.membership_end_date');
        const duration = await getMembershipDuration();
        const endDate=addDays(initDateValue, duration);
        outputEndDate.innerHTML=endDate;
    }

    const registMembership=async()=>{
        const alertDialog = document.getElementById("alert-dialog");
        let checkForm = alertDialog.dataset.checkForm;
        if(checkForm){
            const idMembershipType= document.querySelector('.select_type_membership').value;
            const initDate= document.querySelector('.membership_init_date').value;
            const endDate = document.querySelector('.membership_end_date').textContent;
            const idClient = clientId;
            const isActive =true;
            let newMembership= new Membership(
                initDate,
                endDate,
                isActive,
                idMembershipType,
                idClient
            );
            const createdMembership= await createMembership(newMembership);
            if(createdMembership){
                console.log("se registro membresía con exito");
                alertDialog.close();
                
                const toastNotification = showToast(checkForm);
                toastContainer.innerHTML = toastNotification;
                setTimeout(() => {
                removeToast();
                }, 3000);
            }else{
                const toastNotification = showToast(false);
                toastContainer.innerHTML = toastNotification;
            }
        } else {
            const toastNotification = showToast(false);
            toastContainer.innerHTML = toastNotification;
        }
        toastContainer.addEventListener("click", () => removeToast())
    }


    const validateField = (field, id) => {
        let isValid = false;
        const inputError = document.getElementById(`${id}_error`);
        let clearField = field.value.trim();

        if (id && id === "membership_type") {
            if (clearField !== "memType0") {
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

        if (id && id === "init_date") {
            if (clearField !== "") {
                field.classList.add("valid");
                field.classList.remove("error");
                inputError.classList.remove("show");
                isValid = true;
            } else {
                field.classList.add("error");
                field.classList.remove("valid");
                inputError.classList.add("show");
                inputError.textContent = "Elija una fecha";
                isValid = false;
            }
        }

        return isValid;
    };


    selectTypeMembership.addEventListener('change', (e)=>{
        e.preventDefault();
        processMembershipDate();
    })

    selectClientEntry.addEventListener('change', (e)=>{
        e.preventDefault()
        processMembershipDate();
    })

    btnFirstTime.addEventListener('click', (e)=>{
        e.preventDefault();
        enableOptions();
    })

    btnRenovate.addEventListener('click',(e)=>{
        e.preventDefault();
        renovateMembership();
    })

    btnChangeMembershipType.addEventListener('click', (e)=>{
        e.preventDefault();
        enableOptions()
    })

    btnConfirmSubscription.addEventListener('click', (e)=>{
        e.preventDefault();
        submitChecked();
    })

    newBtnSubmitModal.addEventListener('click', (e)=>{
        e.preventDefault();
        registMembership();
    })

    btnCloseModal.addEventListener("click", (e)=>{
        e.preventDefault();
        const alertDialog= document.getElementById('alert-dialog');
        alertDialog.close();
    })

    loadMembershipHistory()
    disableOptions();
    setCurrentDate();
    loadClientData();
    validateDate();
    loadPlans();
}
initMembership();
