import { sidebar } from "../components/sidebar.js";

const routes = {
  404: "pages/404",
  "/app": "index.html",
  "/login":"/../views/auth/login.html",
  "/newUser": "../views/auth/registUser.html",
  "/registEmployee": "../views/employee/registEmployee.html",
  "/registClient": "../views/clients/registClient.html",
  "/employeeList": "../views/employee/employeeList.html",
  "/clientList": "../views/clients/clientList.html",
  "/report": "/reports/report1.html",
  "/editClient": "../views/clients/editClient.html",
  "/editEmployee": "../views/employee/editEmployee.html",
  "/membership": "../views/membership/membership.html",
  "/membershipList": "../views/membership/membershipList.html",
  "/editMembership": "../views/membership/editMembership.html",
  "/membershipType": "../views/membership/membershipType.html",
  "/editMembershipType": "../views/membership/editMembershipType.html",
  "/membershipTypeList": "../views/membership/membershipTypeList.html",

};

const loadComponent = async () => {
  const path = window.location.pathname;
  const newRoute = routes[path] || routes["/app"] || routes["/404"];
  const html = await fetch(newRoute).then((data) => data.text());
  
  document.getElementById("main_content").innerHTML = html;

  const isAuthRoute = ["/login", "/newUser"].includes(path);
  let sidebarEl = document.querySelector(".sidebar_container");

   if (isAuthRoute) {
        if (sidebarEl) sidebarEl.remove(); 
    } else {
        if (!sidebarEl) {
            document.body.prepend(sidebar(loadComponent)); 
        }
    }
  
  initView(path);
};



window.addEventListener("DOMContentLoaded", () => {
  loadComponent();
});
window.addEventListener("popstate", () => {
  loadComponent();
});
loadComponent();





function initView(path) {
  switch (path) {
    case "/login":
      import("/controllers/auth/login.js").then((mod) => mod.initLogin()).catch((err)=>console.log(err));
      break;
    case "/newUser":
      import("/controllers/auth/registUser.js").then((mod) => mod.initRegistUser()).catch((err)=>console.log(err));
      break;
    case "/clientList":
      import("/controllers/clients/clientList.js").then((mod) => mod.initClientList()).catch((err)=>console.log(err));
      break;
    case "/registClient":
      import("/controllers/clients/register.js").then((mod) => mod.initRegisterClient()).catch((err)=>console.log(err));
      break;
    case "/employeeList":
      import("/controllers/employee/employeeList.js").then((mod) => mod.initEmployeeList()).catch((err)=>console.log(err));
      break;
    case "/registEmployee":
      import("/controllers/employee/registEmployee.js").then((mod) => mod.initRegisterEmployee()).catch((err)=>console.log(err));
      break;
    case "/report":
      import("../reports/report1.js").then((mod) => mod.initReport()).catch((err)=>console.log(err));
      break;
    case "/editClient":
      import("/controllers/clients/editClient.js").then((mod) => mod.initEditClient()).catch((err)=>console.log(err));
      break;
    case "/editEmployee":
      import("/controllers/employee/editEmployee.js").then((mod) => mod.initEditEmployee()).catch((err)=>console.log(err));
      break; 
    case "/membership":
      import("/controllers/membership/membership.js").then((mod) => mod.initMembership()).catch((err)=>console.log(err));
      break;
    case "/editMembership":
      import("/controllers/membership/editMembership.js").then((mod) => mod.initEditMembership()).catch((err)=>console.log(err));
      break;  
    case "/membershipList":
      import("/controllers/membership/membershipList.js").then((mod) => mod.initMembershipList()).catch((err)=>console.log(err));
      break;  
    case "/membershipType":
      import("/controllers/membership/membershipType.js").then((mod) => mod.initMembershipType()).catch((err)=>console.log(err));
      break;
    case "/editMembershipType":
      import("/controllers/membership/editMembershipType.js").then((mod) => mod.initEditMembershipType()).catch((err)=>console.log(err));
      break;
    case "/membershipTypeList":
      import("/controllers/membership/membershipTypeList.js").then((mod) => mod.initMembershipTypeList()).catch((err)=>console.log(err));
      break;  
  }

}
export { loadComponent };