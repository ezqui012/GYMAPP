import { loadComponent } from "../../app/app.js";
import { getClientsByMebershipState } from "../../services/client.services.js";

export async function initMembershipList(){
  const btnAddMem = document.querySelector(".add_membership");
  const searchBar = document.getElementById("searchbar");
  const containerBtn = document.querySelector(".btn_numbers");
  const btnForward = document.querySelector(".forward_btn");
  const btnBack = document.querySelector(".back_btn");
  
  let since = 0;
  let limit = 11;
  let activePage = 1;
  let membershipList = await getMembershipList();
  let pageNumber = Math.ceil(membershipList.length / limit);
  

  async function getMembershipList(){
      const membershipList = await getClientsByMebershipState();
      return membershipList;
  }

  const displayButtonOption = (id) => {
    let buttons = `<button class='btn_action_management ' data-index='${id}'>Gestionar</button>`;
    return buttons;
  };


  let managementButton = () => {
    const btnActionManagement = document.querySelectorAll('.btn_action_management');
    btnActionManagement.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        let id = e.currentTarget.dataset.index;
        window.history.pushState({}, "", `/membership?id=${id}`);
        loadComponent();
      });
    });
  };
  const loadList = async() => {
  const clientData = await getMembershipList()
  const tbodyContainer = document.querySelector(".tbody_container");
  tbodyContainer.innerHTML = "";

  for (let i = since; i < since + limit && i < membershipList.length; i++) {
    const trContainer = document.createElement("tr");
    trContainer.classList.add("data-row");

    const tdClient = document.createElement("td");
    tdClient.classList.add("data-table");
    tdClient.innerHTML = `${clientData[i].name} ${clientData[i].lastname}` ;
    trContainer.appendChild(tdClient);
      
    const tdCi = document.createElement("td");
    tdCi.classList.add("data-table");
    tdCi.innerHTML = `${clientData[i].ci}` ;
    trContainer.appendChild(tdCi);

    const tdEmail = document.createElement("td");
    tdEmail.classList.add("data-table");
    tdEmail.innerHTML = `${clientData[i].email}` ;
    trContainer.appendChild(tdEmail);

    const tdMembership = document.createElement("td");
    tdMembership.classList.add("data-table");
    tdMembership.innerHTML = clientData[i].membership_type_name;
    trContainer.appendChild(tdMembership);

    const tdMembershipState = document.createElement("td");
    tdMembershipState.classList.add("data-table");
    tdMembershipState.innerHTML = clientData[i].state;
    trContainer.appendChild(tdMembershipState);

    const joinDate = document.createElement("td");
    joinDate.classList.add("data-table");
    joinDate.innerHTML = clientData[i].join_date;
    trContainer.appendChild(joinDate);

    let tdButtons = document.createElement("td");
    tdButtons.classList.add('data-table', 'action_management');
    tdButtons.innerHTML = displayButtonOption(clientData[i].id_client);
    trContainer.appendChild(tdButtons);
    tbodyContainer.appendChild(trContainer);
  }
  managementButton();
  loadButtonPage();
  changePageListeners();
  };
  loadList();
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
      since = since - 11;
      activePage--;
      membership.slice(since, limit);
      loadList();
    }
  }
  function changePageForward() {
    if (activePage < pageNumber) {
      since = limit;
      limit = limit + 11;
      activePage++;
      membership.slice(since, limit);
      loadList();
    }
  }

  function changePageNumber(page) {
    if (activePage < page) {
      activePage = page;
      limit = 11 * page;
      since = limit - 11;
      membership.slice(since, limit);
      loadList();
    } else if (activePage > page) {
      let pageDifference = activePage - page;
      since = since - pageDifference * 11;
      limit = limit - pageDifference * 11;
      activePage = page;
      membership.slice(since, limit);
      loadList();
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

  btnAddMem.addEventListener("click", () => {
    window.history.pushState({}, "", "/membership");
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
initMembershipList();