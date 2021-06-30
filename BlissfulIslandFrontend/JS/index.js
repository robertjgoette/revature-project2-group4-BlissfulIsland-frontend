// Start of NavBar JS code
if(accountType !== 0){
    fillNavBar()
}
function fillNavBar(){
    let accountMakerButton = "<a id='accountMakerButton' onclick=accountMakerPage()>Account Maker</a>";
    let unitListButton = "<a id='unitListButton' onclick=unitListPage()>Unit List</a>";

    accountMaker.innerHTML = accountMakerButton;
    unitList.innerHTML = unitListButton;
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
// End of NavBar JS code