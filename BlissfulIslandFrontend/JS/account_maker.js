const createAccountBtn = document.getElementById('createNewAccountBtn');
const createTenantForm = document.getElementById('createTenantForm');
const selectUnit = document.getElementById('selectUnit');
const alert = document.getElementById('alertMessage');

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

        state.newAccount = await res.json();
    }catch(error){
        throw error;
    }
}

async function getAllUnits(){
    try{
        const res = await fetch('http://localhost:7000/units');
        state.units = await res.json();
        renderSelectUnitFormField();
    }catch(error){
        throw error;
    }
}

function fetchLocalStorage(){
    console.log(window.localStorage);  
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

function toggleAlert(status, message){
    alert.innerHTML = message;
    if(status) alert.classList.add('bg-success');
    else alert.classList.add('bg-fail');
    alert.innerHTML = message;
    alert.classList.remove('hidden');
    setTimeout(() => {
        alert.classList.add('hidden');
        alert.innerHTML = '';
    }, 2000);
}

/*Event Handlers*/
createTenantForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    //if fetch is not yet completed... do nothing
    if(!state || !state.units){
        return;
    }
    try{
        await createAccount();
        toggleAlert(true, 'Successfully created a new account.');
        createTenantForm.reset();
    }catch(err){
        toggleAlert(false, 'Could not create new account.');
    }
});

/*init function*/
const onPageLoad = async function(){
    //get localstorage

    //restrict account to admin or manager

    //get all units
    await getAllUnits();

}

/*run page visit startup function*/
onPageLoad();

fetchLocalStorage();