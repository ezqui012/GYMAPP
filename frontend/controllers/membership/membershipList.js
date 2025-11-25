import { loadComponent } from "../../app/app.js";
export function initMembershipList(){
  const btnAddMem = document.querySelector(".add_membership");
  const searchBar = document.getElementById("searchbar");
  const containerBtn = document.querySelector(".btn_numbers");
  const btnForward = document.querySelector(".forward_btn");
  const btnBack = document.querySelector(".back_btn");
  
  let since = 0;
  let limit = 11;
  let activePage = 1;
  let membershipList = getMembershipList();
  
  let pageNumber = Math.ceil(membershipList.length / limit);
  
  let editButton = () => {
    const editButton = document.querySelectorAll(".edit_data");
    editButton.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        let id = e.currentTarget.dataset.index;
        window.history.pushState({}, "", `/editMembership?id=${id}`);
        loadComponent();
      });
    });
  };

  let deleteAction = () => {
    const deleteMembership = document.querySelectorAll(".delete_data");
    deleteMembership.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let id = e.currentTarget.dataset.index;
        deleteData(id);
        loadList();
      });
    });
  };

  let deleteData = (id) => {
    if (id !== null) {
      let membership = membershipList.filter((memberships) => memberships._idMembership !== parseInt(id));
      membershipList=membership
      localStorage.setItem("membershipList", JSON.stringify(membershipList));
      loadList();
    } else {
      console.log("error con la posicion del elemento" + pos);
    }
  };
    
    function getUserData(id){
      const userslist= JSON.parse(localStorage.getItem('usersList'))||[];
      const userData=userslist.find((user)=>user.id===parseInt(id));
      return userData;
    }
    function getMembershipList(){
        const membershipList = JSON.parse(localStorage.getItem('membershipList'));
        return membershipList;
    }

    function getMembershipTypeList(){
      const membershipTypeList = JSON.parse(localStorage.getItem('membershipTypeList'))||[];
      return membershipTypeList;
    }

    const getAMembershipType=(id)=>{
      const membershipTypeList=getMembershipTypeList();
      let membershipTypeData=membershipTypeList.find(membershipType=>membershipType.id===id);
      return membershipTypeData;
    } 


    const displayButtonOption = (id) => {
    let buttons = `<button class='btn_action view_data' data-index='${id}'><i class="fas fa-eye ver-btn" title="Ver"></i></button>
                 <button class='btn_action edit_data' data-index='${id}'><i class="fas fa-pen editar-btn" title="Editar"></i></button>
                 <button class='btn_action delete_data' data-index='${id}' ><i class="fas fa-trash borrar-btn" title="Borrar"></i></button>`;
    return buttons;
  };

    const loadList = () => {
    
    const tbodyContainer = document.querySelector(".tbody_container");
    tbodyContainer.innerHTML = "";

    for (let i = since; i < since + limit && i < membershipList.length; i++) {
      const trContainer = document.createElement("tr");
      trContainer.classList.add("data-row");

      const tdClient = document.createElement("td");
      tdClient.classList.add("data-table");
      const clientData=getUserData(membershipList[i]._idClient);
      tdClient.innerHTML = `${clientData.name} ${clientData.lastName}` ;
      trContainer.appendChild(tdClient);

      const tdMembership = document.createElement("td");
      tdMembership.classList.add("data-table");
      const idMembershipType = membershipList[i]._idMembershipType;
      tdMembership.innerHTML = getAMembershipType(idMembershipType)._membershipName;
      trContainer.appendChild(tdMembership);

      const tdInitDate = document.createElement("td");
      tdInitDate.classList.add("data-table");
      tdInitDate.innerHTML = membershipList[i]._initDate;
      trContainer.appendChild(tdInitDate);

      const tdEndDate = document.createElement("td");
      tdEndDate.classList.add("data-table");
      tdEndDate.innerHTML = membershipList[i]._endDate;
      trContainer.appendChild(tdEndDate);

      let tdButtons = document.createElement("td");
      tdButtons.classList.add("actions");
      tdButtons.innerHTML = displayButtonOption(membershipList[i]._idMembership);
      trContainer.appendChild(tdButtons);
      tbodyContainer.appendChild(trContainer);
    }
    editButton();
    deleteAction();
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