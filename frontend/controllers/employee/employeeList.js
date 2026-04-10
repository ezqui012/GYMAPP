import { loadComponent } from "../../app/app.js";
import { getDataEmployees, deleteEmployee } from "../../services/employee.services.js";
export async function initEmployeeList() {
  const btnAddEmp = document.querySelector(".add_employee");
  const searchBar = document.getElementById("searchbar");
  const containerBtn=document.querySelector('.btn_numbers');
  const btnForward=document.querySelector('.forward_btn');
  const btnBack=document.querySelector('.back_btn');
  let since = 0;
  let limit = 10;
  let activePage = 1;
  let employees=[];
  let employeesPagination = await getDataEmployees();
  let pageNumber = Math.ceil(employeesPagination.length / limit);

  let editButton = () => {
    const editButton = document.querySelectorAll(".edit_data");
    editButton.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        let id = e.currentTarget.dataset.index;
        window.history.pushState({}, "", `/editEmployee?id=${id}`);
        loadComponent();
      });
    });
  };

  let deleteAction = () => {
    const deleteClient = document.querySelectorAll(".delete_data");
    
    deleteClient.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let id = parseInt(e.currentTarget.dataset.index);
        handleDelete(id);
      });

    });
  }

  const handleDelete=async(id)=>{
    await deleteEmployee(id);
    await loadListEmployee();
  }

  let displayButtonOption = (id) => {
    let buttons = `<button class='btn_action view_data' data-index='${id}'><i class="fas fa-eye ver-btn" title="Ver"></i></button>
                 <button class='btn_action edit_data' data-index='${id}'><i class="fas fa-pen editar-btn" title="Editar"></i></button>
                 <button class='btn_action delete_data' data-index='${id}' ><i class="fas fa-trash borrar-btn" title="Borrar"></i></button>`;
    return buttons;
  };
  async function loadListEmployee() {
    employees= await getDataEmployees();
    const tbodyContainer = document.querySelector(".tbody_container");
    tbodyContainer.innerHTML = "";

    for (let i = 0; i < employees.length; i++) {
      const trContainer = document.createElement("tr");
      trContainer.classList.add("data-row");

      const tdName = document.createElement("td");
      tdName.classList.add("data-table");
      tdName.innerHTML = employees[i].name;
      trContainer.appendChild(tdName);

      const tdLastname = document.createElement("td");
      tdLastname.classList.add("data-table");
      tdLastname.innerHTML = employees[i].lastname;
      trContainer.appendChild(tdLastname);

      const tdEmail = document.createElement("td");
      tdEmail.classList.add("data-table");
      tdEmail.innerHTML = employees[i].email;
      trContainer.appendChild(tdEmail);

      const tdSchedule = document.createElement("td");
      tdSchedule.classList.add("data-table");
      tdSchedule.innerHTML = employees[i].schedule;
      trContainer.appendChild(tdSchedule);

      const tdType = document.createElement("td");
      tdType.classList.add("data-table");
      tdType.innerHTML = employees[i].job_role;
      trContainer.appendChild(tdType);

      const tdCi = document.createElement("td");
      tdCi.classList.add("data-table");
      tdCi.innerHTML = employees[i].ci;
      trContainer.appendChild(tdCi);

      let tdButtons = document.createElement("td");
      tdButtons.classList.add("actions");
      tdButtons.innerHTML = displayButtonOption(employees[i].id_employee);
      trContainer.appendChild(tdButtons);
      tbodyContainer.appendChild(trContainer);
    }
    editButton();
    deleteAction();
    loadButtonPage();
    changePageListeners();
  }

  loadListEmployee();

  searchBar.addEventListener("keyup", () => {
    let mainTrContainer = document.querySelectorAll(".data-row");
    const keyword = searchBar.value.toLowerCase().trim();

    for (let i = 0; i < mainTrContainer.length; i++) {
      const tdList = mainTrContainer[i].getElementsByTagName("td");
      let wordIsFound = false;
      for (let j = 0; j < tdList.length; j++) {
        let wordToCompare = tdList[j].textContent.toLowerCase().trim();
        if (wordToCompare.includes(keyword)) {
          wordIsFound = true;
          break;
        }
      }
      mainTrContainer[i].style.display = wordIsFound ? "" : "none";
    }
  });
  function loadButtonPage() {
    containerBtn.innerHTML = "";
    if (pageNumber === 0) {
      let buttonChange = document.createElement("button");
      buttonChange.classList.add("btn_page");
      buttonChange.setAttribute("id", 1);
      buttonChange.innerHTML = 1;
      containerBtn.append(buttonChange);
    } else {
      for (let i = 0; i < pageNumber; i++) {
        let buttonChange = document.createElement("button");
        buttonChange.classList.add("btn_page");
        buttonChange.setAttribute("id", i + 1);
        buttonChange.innerHTML = i + 1;
        containerBtn.append(buttonChange);
      }
    }
  }
  function changePageBack() {
    if (activePage > 1) {
      limit = since;
      since = since - 10;
      activePage--;
      users.slice(since, limit);
      displayClients();
    }
  }
  function changePageForward() {
    if (activePage < pageNumber) {
      since = limit;
      limit = limit + 10;
      activePage++;
      users.slice(since, limit);
      displayClients();
    }
  }

  function changePageNumber(page) {
    if (activePage < page) {
      activePage = page;
      limit = 10 * page;
      since = limit - 10;
      users.slice(since, limit);
      displayClients();
    } else if (activePage > page) {
      let pageDifference = activePage - page;
      since = since - pageDifference * 10;
      limit = limit - pageDifference * 10;
      activePage = page;
      users.slice(since, limit);
      displayClients();
    }
  }

  function changePageListeners() {
    let pageButtons = document.querySelectorAll(".btn_page");
    for (let i = 0; i < pageButtons.length; i++) {
      pageButtons[i].addEventListener("click", (e) => {
        e.preventDefault();
        changePageNumber(parseInt(pageButtons[i].id));
      });
    }
  }

  btnAddEmp.addEventListener("click", () => {
    window.history.pushState({}, "", "/registEmployee");
    loadComponent();
  });
  btnForward.addEventListener("click", (e) => {
    e.preventDefault();
    changePageForward();
  });

  btnBack.addEventListener("click", (e) => {
    e.preventDefault();
    changePageBack();
  });
}

initEmployeeList();
