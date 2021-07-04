//account_maker.js
const createAccountBtn = document.getElementById('createNewAccountBtn');
const createTenantForm = document.getElementById('createTenantForm');
const selectUnit = document.getElementById('selectUnit');
const alert = document.getElementById('alertMessage');
const logOutBtn = document.getElementById('logOut');
const accountTypeField = document.getElementById('accountType-group')


state = {}

/*fetches*/
async function createAccount(){
    const data = new FormData(createTenantForm);
    const newTenant = Object.fromEntries(data.entries());
    newTenant["accountID"] = "0";
    try{
        const res = await fetch('http://localhost:7000/accounts', {
            method: 'POST',
            headers: {
               'Content-Type': 'text-plain'
            },
            body: JSON.stringify(newTenant)
        });
        if(res.ok) {
            state.newAccount = await res.json();
        }
        else throw new Error("Unable to complete request.");
    }catch(error){
        throw error;
    }
}

async function getAllUnits(){
    try{
        const res = await fetch('http://localhost:7000/units');
        if(res.ok){
        state.units = await res.json();
        renderSelectUnitFormField();
        } else throw new Error("Unable to complete request.");
    }catch(error){
        throw error;
    }
}

/*Application state and redirects*/
function fetchLocalStorage(){
    let user = {};
    user.email = window.localStorage["email"];
    user.firstName = window.localStorage["firstName"];
    user.accountType = window.localStorage["accountType"];
    state.user = user;
}

function securePage(){
    if(!state.user){
        redirectIndex();
        return;
    }
    if(state.user.accountType >= 1){
        return;
    }
    redirectMessaging();
}

function logOut(){
    localStorage.clear();
    redirectIndex();
}

function redirectIndex(){
    location.href = "./index.html";
}

function redirectMessaging(){
    location.href = "./messaging.html";
}

/*UI Updates*/
function renderSelectUnitFormField(){
    let options = state.units.map(cur => {
        return `<option value="${cur.unitID}">Apt:  ${cur.apartmentNumber}&nbsp&nbsp; ID:  ${cur.unitID}&nbsp;&nbsp; Type:  ${cur.typeID}</option>;`
    });
    const markup = 
    `<label for="unitID">Unit ID</label>
     <select id="unitID" name="unitID">
     ${options.join('')}
    `
    selectUnit.innerHTML = markup;
}
function fillAccountType(){
    if(state.user.accountType == 2){
        let fillAccountType = "<label for='accountType'>Account Type</label><input type='number' min='0' name='accountType' id='accountType' required>";
        accountTypeField.innerHTML = fillAccountType;
    }else{
        let fillAccountType = "<label class='hidden' for='accountType'>Account Type</label><input type='number' value='0' min='0' name='accountType' class='hidden' id='accountType' required>";
        accountTypeField.innerHTML = fillAccountType;
    }
}

function toggleAlert(status, message){
    //update alert message
    alert.innerHTML = message;

    //check if success or failed
    if(status) alert.classList.add('bg-success');
    else alert.classList.add('bg-fail');
    
    //show
    alert.classList.remove('hidden');
    
    //delay hide
    setTimeout(() => {
        alert.classList.remove('bg-fail');
        alert.classList.remove('bg-success');
        alert.classList.add('hidden');
        alert.innerHTML = '';
    }, 2000);
}

/*Event Listener binding*/

/*For form*/
createTenantForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    //disable submit button
    createAccountBtn.disabled = true;
    
    //if fetch is not yet completed... do nothing
    if(!state || !state.units){
        return;
    }
    try{
        await createAccount();
    
        //toggle alert
        toggleAlert(true, 'Successfully created a new account.');
        
        //reset form data
        createTenantForm.reset();
    }catch(err){

        //toggle alert
        toggleAlert(false, 'Could not create new account.');
    }finally{

        //reenable the button
        createAccountBtn.disabled = false;
    }
});

/*init function*/
const onPageLoad = async function(){
    //get localstorage
    fetchLocalStorage();
    
    //restrict account to admin or manager
    securePage();

    //get all units
    await getAllUnits();

    fillAccountType();
}

/*run page visit startup function*/
onPageLoad();