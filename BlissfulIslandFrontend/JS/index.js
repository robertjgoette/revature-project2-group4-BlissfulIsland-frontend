// Start of NavBar JS code
if(accountType == 1){
    fillNavBar()
}
if(accountType == 2){
    fillAdminNavBar()
}
function fillNavBar(){
    let accountMakerButton = "<a id='accountMakerButton' onclick=accountMakerPage()>Account Maker</a>";
    let unitListButton = "<a id='unitListButton' onclick='unitListPage()'>Unit List</a>";
    let messageButtomFill = "<a id='messageButton' onclick=messagePage()>Messages</a>";

    if(accountMaker){
        accountMaker.innerHTML = accountMakerButton;
    }
    if(unitList){
        unitList.innerHTML = unitListButton;
    }
    if(message){
        message.innerHTML = messageButtomFill;
    }
}
function fillAdminNavBar(){
    let adminPortalButton = "<a id='adminPortalButton' onclick=adminPortalPage()>Admin Portal</a>";

    if(adminPortal){
        adminPortal.innerHTML = adminPortalButton;
    }
    
}
function accountMakerPage(){
    window.location.href = "account_maker.html";
}
function unitListPage(){
    window.location.href = "unit_list.html";
}
function messagePage(){
    window.location.href = "messaging.html";
}
function adminPortalPage(){
    window.location.href = "admin_portal.html";
}
window.onscroll = function() {
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
        navBar.className = "navBar--scroll";
        navBarGroup.className = "navBar__group--scroll";
    } else {
        navBar.className = "navBar"; 
        navBarGroup.className  = "navBar__group";
    }	
}

function logOut(){
    localStorage.setItem("employeeId", 0);
    window.location.href = "index.html";
}
// End of NavBar JS code
