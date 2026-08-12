import { loadComponent } from "../../app/app.js";
import { getDashboardStats, getExpiredMemberships, getExpiringMemberships } from "../../services/dashboard.services.js";
export function initAdminDashboard(){
    const btnRegistClient = document.querySelector('.btn_regist_client');
    const btnRegistEmployee = document.querySelector('.btn_regist_employee');
    const btnRegistMembership = document.querySelector('.btn_regist_membership');

    const criticalAlertClicked=()=>{
        const userSelected= document.querySelectorAll('.alert_bottom_data');
        userSelected.forEach((user) => {
            user.addEventListener("click", (e) => {
                e.preventDefault();
                let id = e.currentTarget.dataset.index;
                window.history.pushState({}, "", `/membership?id=${id}`);
                loadComponent();
            });
        });
    }

    const expiringAlertClicked=()=>{
        const userSelected= document.querySelectorAll('.alert_expiring_data');
        userSelected.forEach((user) => {
            user.addEventListener("click", (e) => {
                e.preventDefault();
                let id = e.currentTarget.dataset.index;
                window.history.pushState({}, "", `/membership?id=${id}`);
                loadComponent();
            });
        });
    }



    async function displayDashboardData(){
        const dashboardStats = await getDashboardStats();
        const pActiveClients= document.querySelector('.active_clients');
        const pInactiveClients= document.querySelector('.inactive_clients');
        const pTotalEmployees= document.querySelector('.total_employees');
        const pExpiringMemberships= document.querySelector('.expiring_membership');
        
        pActiveClients.innerHTML=dashboardStats[0].active_clients;
        pInactiveClients.innerHTML=dashboardStats[0].inactive_clients;
        pTotalEmployees.innerHTML=dashboardStats[0].total_employee;
        pExpiringMemberships.innerHTML=dashboardStats[0].today_expires;
    }

    async function alertComponent() {
        let expiredMemberships= await getExpiredMemberships();
        const alertContainer= document.querySelector('.critical_alert_container');
        const alertContainerFirstChild=alertContainer.firstElementChild;

        while(alertContainer.children.length > 1) {
            alertContainer.removeChild(alertContainer.lastChild)
        }

        for (let i = 0; i < expiredMemberships.length; i++) {
            const userRow=` <div class="alert_bottom_data" data-index=${expiredMemberships[i].id_client} >
                                <div class="left_side_data">
                                    <article class="alert_client_name">${expiredMemberships[i].name}</article>
                                    <span class="alert_client_membership">${expiredMemberships[i].plan_name}</span>
                                </div>
                                <div class="right_side_data">
                                    <article class="alert_time_elapsed">Tiempo Tanscurrido: ${expiredMemberships[i].elapsed_time} días</article>
                                    <span class="alert_action">Renovar</span>
                                </div>
                            </div>`

            

            alertContainerFirstChild.insertAdjacentHTML('afterend', userRow);
        }
        criticalAlertClicked();
    }

    async function expiringAlerts() {
        const expiringMemberships = await getExpiringMemberships();
        const expiringAlertContainer = document.querySelector('.expiring_alerts');
        const expirigingAlertContainerFirstChild=expiringAlertContainer.firstElementChild; 
        while(expiringAlertContainer.children.length > 1) {
            expiringAlertContainer.removeChild(expiringAlertContainer.lastChild)
        }
        for (let i = 0; i < expiringMemberships.length; i++) {
            const userRow =`<div class="alert_expiring_data" data-index=${expiringMemberships[i].id_client}>
                                <div class="left_side_data">
                                    <article class="alert_client_name">${expiringMemberships[i].name}</article>
                                    <span class="alert_client_membership">${expiringMemberships[i].plan_name}</span>
                                </div>
                                <div class="expires_in_container">
                                    <div class="expiration_date">
                                        <span class="time_window">Expira</span>
                                        <article class="expiration_date_data">${expiringMemberships[i].end_date}</article>
                                    </div>
                                    <span class="expiration_days_remaining">${expiringMemberships[i].days_remaining} días restantes</span>
                                </div>
                            </div>`;
            
            expirigingAlertContainerFirstChild.insertAdjacentHTML("afterend", userRow);            
        }
        expiringAlertClicked();
    }


    btnRegistClient.addEventListener('click', (e)=>{
        e.preventDefault();
        window.history.pushState({}, "", "/registClient");
        loadComponent();
    });
    btnRegistEmployee.addEventListener('click', (e)=>{
        e.preventDefault();
        window.history.pushState({}, "", "/registEmployee");
        loadComponent();
    });
    btnRegistMembership.addEventListener('click', (e)=>{
        e.preventDefault();
        window.history.pushState({}, "", "/membershipList");
        loadComponent();
    });

    alertComponent()
    expiringAlerts()
    displayDashboardData();
}
initAdminDashboard()