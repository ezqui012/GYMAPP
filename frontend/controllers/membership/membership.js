import { Membership } from "../../models/Membership.js";
import { getActiveMembershipTypes } from "../../services/membershipType.services.js";
import { getClientByMembershipState } from "../../services/client.services.js";
export async function initMembership() {
    const selectClientEntry = document.querySelector(".membership_init_date");
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = parseInt(urlParams.get("id"));
    const selectTypeMembership = document.querySelector('.select_type_membership');
    const btnRenovate= document.querySelector('.renovate');
    const btnChangeMembershipType=document.querySelector('.change_plan');
    const btnConfirmSubscription = document.querySelector('.confirm_subscription');
    const btnDisableMembership = document.querySelector('.disable_button');
    const btnFirstTime = document.querySelector('.first_time');

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
        const currentMembership= document.querySelector('.current_membership_data');
        if(clientData.state==='sin membresía'){
            selectClientEntry.disabled=true;
            selectTypeMembership.disabled=true;
            btnChangeMembershipType.disabled=true;
            btnRenovate.disabled=true;
            btnDisableMembership.disabled=true;
            btnConfirmSubscription.disabled=true;
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
        }
    }

    const loadClientData=async()=>{
        const clientData= await getClientByMembershipState(clientId);
        const pClientContainer= document.querySelector('.client_data_container');
        const setClientData =`<p class="client_data name"><strong class="text_data_client">Cliente:</strong> ${clientData.name}</p>
                              <p class="client_data email"><strong class="text_data_client">Correo:</strong> ${clientData.email}</p>
                              <p class="client_data ci"><strong class="text_data_client">CI:</strong> ${clientData.ci}</p>`;
        pClientContainer.innerHTML=setClientData;
        if(clientData.state==='sin membresía'){
            const pMembershipDataContainer = document.querySelector('.current_membership_data_container');
            const setMembershipData=`<p class="current_membership_data"><Strong>Membresía Actual</Strong></p>
                                     <p class="current_membership_data "><strong>------</strong></p>
                                     <p class="current_membership_data">------</p>`
            pMembershipDataContainer.innerHTML=setMembershipData;
        }
        

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

    const formatDate =(date)=>{
        let currentDate=new Date(date);
        let [day, month, year]=[currentDate.getUTCDate(), currentDate.getUTCMonth()+1, currentDate.getUTCFullYear()];
        if(day<10)day='0'+day;
        if(month<10)month='0'+month;
        const currentFormatedDate =`${day}-${month}-${year}`;
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

    const processMembershipDate=async()=>{
        const initDateValue = document.querySelector('.membership_init_date').value;
        const outputEndDate= document.querySelector('.membership_end_date');
        const duration = await getMembershipDuration();
        const endDate=addDays(initDateValue, duration);
        console.log(duration)
        outputEndDate.innerHTML=endDate
    }


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







    disableOptions();
    setCurrentDate();
    loadClientData();
    validateDate();
    loadPlans();
}
initMembership();
