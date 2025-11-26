export function sidebar() {
    const sidebar=document.createElement('DIV');
    sidebar.classList.add('sidebar_container'); 
    sidebar.setAttribute('id', 'sideB');
    sidebar.innerHTML=`<h2 class="sidebar_title" >DETONADOR GYM</h2>
            <button data-route="/app" class="btn"><b>Inicio</b></button>
            <button class="btn btn_main"><b>Membresias</b></button>
            <div class="btn_section">
                <button data-route="/membership" class="btn sub_btn"><b>Membresía</b></button>
                <button data-route="/membershipList" class="btn sub_btn"><b>Lista de Membresias</b></button>
                <button data-route="/membershipType" class="btn sub_btn"><b>Tipo de Membresía</b></button>
                <button data-route="/membershipTypeList" class="btn sub_btn"><b>Lista de Tipos de Membresia</b></button>
            </div>
            <button class="btn btn_main"><b>Clientes</b></button>
            <div class="btn_section">
                <button data-route="/registClient" class="btn sub_btn"><b>Registrar Cliente</b></button>
                <button data-route="/clientList" class="btn sub_btn"><b>Ver Lista Clientes</b></button>
            </div>
            <button class="btn btn_main"><b>Empleados</b></button>
            <div class="btn_section">
                <button data-route="/registEmployee" class="btn sub_btn"><b>Registrar Empleado</b></button>
                <button data-route="/employeeList" class="btn sub_btn"><b>Ver Lista Empleados</b></button>
            </div>
            <button data-route="/report"class="btn"><b>Informes</b></button>
            <button data-route="/login"class="btn" onclick=""><b>Cerrar Sesión</b></button>`;

    const allBtnSections= sidebar.querySelectorAll('.btn_main');

    allBtnSections.forEach(btnSection=>{
        btnSection.addEventListener('click', ()=>{
            const section=btnSection.nextElementSibling;
            
            sidebar.querySelectorAll('.btn_section').forEach(sectionSelected => {                    
                if(section!==sectionSelected){
                    sectionSelected.classList.remove('show');
                }
            });
            section.classList.toggle('show');
        })
    });

    return sidebar;
    
}

