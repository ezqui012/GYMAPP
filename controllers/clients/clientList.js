import { loadComponent } from "../../app/app.js";
export function initClientList() {
  const btnAddclient = document.querySelector(".add_client");
  const containerBtn = document.querySelector(".btn_numbers");
  const searchBar = document.getElementById("searchbar");
  const btnForward = document.querySelector(".forward_btn");
  const btnBack = document.querySelector(".back_btn");

  let since = 0;
  let limit = 10;
  let activePage = 1;
  let users = JSON.parse(localStorage.getItem("usersList"));
  let pageNumber = Math.ceil(users.length / limit);

  let displayClients = () => {
    let users = JSON.parse(localStorage.getItem("usersList"));
    let tbodyContainer = document.querySelector(".tbody_container");

    tbodyContainer.innerHTML = "";

    for (let i = since; i < since + limit && i < users.length; i++) {
      let trContainer = document.createElement("tr");
      trContainer.classList.add("data-row");
      let tdName = document.createElement("td");
      tdName.classList.add("data-table");
      tdName.textContent = users[i].name;
      trContainer.append(tdName);

      let tdLastName = document.createElement("td");
      tdLastName.classList.add("data-table");
      tdLastName.textContent = users[i].lastName;
      trContainer.appendChild(tdLastName);

      let tdExpireDate = document.createElement("td");
      tdExpireDate.classList.add("data-table");
      tdExpireDate.textContent = "expira";

      trContainer.appendChild(tdExpireDate);
      let tdCi = document.createElement("td");
      tdCi.classList.add("data-table");
      tdCi.textContent = users[i].ci;
      trContainer.appendChild(tdCi);

      let tdEmail = document.createElement("td");
      tdEmail.classList.add("data-table");
      tdEmail.textContent = users[i].email;
      trContainer.appendChild(tdEmail);

      let tdAction = document.createElement("td");
      tdAction.classList.add("actions");
      tdAction.innerHTML = displayButtonOption(users[i].id);
      trContainer.appendChild(tdAction);
      tbodyContainer.appendChild(trContainer);
    }
    editButton();
    deleteAction();
    loadButtonPage();
    changePageListeners();
  };
  let editButton = () => {
    const editButton = document.querySelectorAll(".edit_data");
    editButton.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        let id = e.currentTarget.dataset.index;
        window.history.pushState({}, "", `/editClient?id=${id}`);
        loadComponent();
      });
    });
  };
  let deleteAction = () => {
    const deleteClient = document.querySelectorAll(".delete_data");
    deleteClient.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let id = e.currentTarget.dataset.index;
        deleteData(id);
      });
    });
  };

  let displayButtonOption = (id) => {
    let buttons = `<button class='btn_action view_data' data-index='${id}'><i class="fas fa-eye ver-btn" title="Ver"></i></button>
                 <button class='btn_action edit_data' data-index='${id}'><i class="fas fa-pen editar-btn" title="Editar"></i></button>
                 <button class='btn_action delete_data' data-index='${id}' ><i class="fas fa-trash borrar-btn" title="Borrar"></i></button>`;
    return buttons;
  };

  displayClients();

  let deleteData = (id) => {
    if (id !== null) {
      let usersLocal = JSON.parse(localStorage.getItem("usersList")) || [];
      let users = usersLocal.filter((user) => user.id !== parseInt(id));
      localStorage.setItem("usersList", JSON.stringify(users));
      displayClients();
    } else {
      console.log("error con la posicion del elemento" + pos);
    }
  };

  //Display page buttons
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

  btnAddclient.addEventListener("click", () => {
    window.history.pushState({}, "", "/registClient");
    loadComponent();
  });

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

  btnForward.addEventListener("click", (e) => {
    e.preventDefault();
    changePageForward();
  });

  btnBack.addEventListener("click", (e) => {
    e.preventDefault();
    changePageBack();
  });
}
