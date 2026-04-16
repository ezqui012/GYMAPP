import { loadComponent } from "../../app/app.js";
import { getActiveMembershipTypes } from "../../services/membershipType.services.js";
import { disableMembershipType } from "../../services/membershipType.services.js";
export async function initMembershipTypeList() {
  const btnAddMemType = document.querySelector(".add_membershipType");
  const searchBar = document.getElementById("searchbar");
  const containerBtn = document.querySelector(".btn_numbers");
  const btnForward = document.querySelector(".forward_btn");
  const btnBack = document.querySelector(".back_btn");

  //variables to set page numbers
  let since = 0;
  let limit = 11;
  let activePage = 1;
  let membershipTypes = await getMembershipTypeList();
  
  let pageNumber = Math.ceil(membershipTypes.length / limit);
  
  let editButton = () => {
    const editButton = document.querySelectorAll(".edit_data");
    editButton.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        let id = e.currentTarget.dataset.index;
        window.history.pushState({}, "", `/editMembershipType?id=${id}`);
        loadComponent();
      });
    });
  };

  let disableAction = () => {
    const disableBtnMembershipTyp = document.querySelectorAll(".disable_data");
    disableBtnMembershipTyp.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let id = parseInt(e.currentTarget.dataset.index);

        disableData(id);
        loadList();
      });
    });
  };

  let disableData = async(id) => {
    if (id !== null) {
      await disableMembershipType(id);
      loadList();
    } else {
      console.log("error con la posicion del elemento" + pos);
    }
  };

  //get membership Type data from local storage
  async function getMembershipTypeList(){
    const membershipTypeListData = await getActiveMembershipTypes();
    return membershipTypeListData;
  };
  //load buttons on the table
  const displayButtonOption = (id) => {
    let buttons = `<button class='btn_action view_data' data-index='${id}'><i class="fas fa-eye ver-btn" title="Ver"></i></button>
                 <button class='btn_action edit_data' data-index='${id}'><i class="fas fa-pen editar-btn" title="Editar"></i></button>
                 <button class='btn_action disable_data' data-index='${id}' ><i class="fas fa-trash borrar-btn" title="Borrar"></i></button>`;
    return buttons;
  };

  //load all data on the table
  const loadList = async () => {
    let membershipTypeList = await getMembershipTypeList();
    const tbodyContainer = document.querySelector(".tbody_container");
    tbodyContainer.innerHTML = "";

    for (let i = since; i < since + limit && i < membershipTypeList.length; i++) {
      const trContainer = document.createElement("tr");
      trContainer.classList.add("data-row");

      const tdName = document.createElement("td");
      tdName.classList.add("data-table");
      tdName.innerHTML = membershipTypeList[i].name;
      trContainer.appendChild(tdName);

      const tdPrice = document.createElement("td");
      tdPrice.classList.add("data-table");
      tdPrice.innerHTML = membershipTypeList[i].price + ` bs`;
      trContainer.appendChild(tdPrice);

      const tdDuration = document.createElement("td");
      tdDuration.classList.add("data-table");
      tdDuration.innerHTML = membershipTypeList[i].duration + ` dias`;
      trContainer.appendChild(tdDuration);

      const tdDescription = document.createElement("td");
      tdDescription.classList.add("data-table");
      tdDescription.innerHTML = membershipTypeList[i].description;
      trContainer.appendChild(tdDescription);

      let tdButtons = document.createElement("td");
      tdButtons.classList.add("actions");
      tdButtons.innerHTML = displayButtonOption(membershipTypeList[i].id_membership_type);
      trContainer.appendChild(tdButtons);
      tbodyContainer.appendChild(trContainer);
    }
    editButton();
    disableAction();
    loadButtonPage();
    changePageListeners();
  };

  loadList();

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
      since = since - 11;
      activePage--;
      membershipTypes.slice(since, limit);
      loadList();
    }
  }
  function changePageForward() {
    if (activePage < pageNumber) {
      since = limit;
      limit = limit + 11;
      activePage++;
      membershipTypes.slice(since, limit);
      loadList();
    }
  }

  function changePageNumber(page) {
    if (activePage < page) {
      activePage = page;
      limit = 11 * page;
      since = limit - 11;
      membershipTypes.slice(since, limit);
      loadList();
    } else if (activePage > page) {
      let pageDifference = activePage - page;
      since = since - pageDifference * 11;
      limit = limit - pageDifference * 11;
      activePage = page;
      membershipTypes.slice(since, limit);
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


  btnAddMemType.addEventListener("click", () => {
    window.history.pushState({}, "", "/membershipType");
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
initMembershipTypeList();
