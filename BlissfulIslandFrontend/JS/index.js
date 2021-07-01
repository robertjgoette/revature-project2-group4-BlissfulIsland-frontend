// Start of NavBar JS code
if(accountType == 1){
    fillNavBar()
}
if(accountType == 2 || accountType == 3){
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
    let accountMakerButton = "<a id='accountMakerButton' onclick=accountMakerPage()>Account Maker</a>";

    if(accountMaker){
        accountMaker.innerHTML = accountMakerButton;
    }
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
    if (document.documentElement.scrollTop > 1) {
        navBar.className = "navBar--scroll";
        navBarGroup.className = "navBar__group--scroll";
        logoM.className = "navBar__img--scroll";
    } else {
        navBar.className = "navBar"; 
        navBarGroup.className  = "navBar__group";
        logoM.className = "navBar__img";
        window.scrollTo(0, 0);
    }	
}

function logOut(){
    localStorage.setItem("employeeId", 0);
    window.location.href = "index.html";
}
// End of NavBar JS code
