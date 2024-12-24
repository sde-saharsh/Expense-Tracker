const input_name = document.getElementById('input-name');
const input_amount = document.getElementById('input-amount');
const dropdown = document.getElementById('type-input'); 
const add_transaction = document.getElementById('add-transaction');

const total_amount = document.getElementById('total-amount');
const total_expense = document.getElementById('total-expense');
const total_income = document.getElementById('total-income');

const transaction_list = document.getElementById('transaction-list');

let amount_total = 0;
let expense_total = 0;
let income_total = 0;

add_transaction.addEventListener('click',function(){

    addTasktoDOM();

    // saveToLocalStorage();

    input_name.value="";
    input_amount.value="";
    dropdown.value="";
})
function addTasktoDOM(){

    let inputName = input_name.value;
    let inputAmount = input_amount.value;
    let dropdownOption = dropdown.value;

    if(inputName=="" ||inputAmount=="" || dropdownOption=="" || inputAmount=="0"){
        alert("pleae enter the valid input");
        return;
    }

    let sub_li = document.createElement('li');
    let name_span = document.createElement('span');
    let amount_span = document.createElement('span');
    let dropdown_span = document.createElement('span');
    let delete_btn = document.createElement('button');
    delete_btn.className="fa-solid fa-trash";

    name_span.innerHTML = inputName;
    amount_span.innerHTML = inputAmount;
    dropdown_span.innerHTML = dropdownOption;

    sub_li.appendChild(name_span);
    sub_li.appendChild(amount_span);
    sub_li.appendChild(dropdown_span);
    sub_li.appendChild(delete_btn);

    transaction_list.appendChild(sub_li);

    update_total_balance(dropdownOption,inputAmount);

    delete_btn.addEventListener('click',function(){
        transaction_list.removeChild(sub_li);
        // removeFromLocalStorage()
    })
}


function update_total_balance(value,input_amount){

    let amount = parseInt(input_amount);

    if(value=='Credit'){
        
        amount_total +=amount;
        income_total+=amount;

        total_amount.innerHTML = `$ ${amount_total}`;
        total_income.innerHTML = `$ ${income_total}`;
    } else{
        amount_total -=amount;
        expense_total+=amount;

        total_amount.innerHTML = `$ ${amount_total}`;
        total_expense.innerHTML = `$ ${expense_total}`;
    }
}



// function saveToLocalStorage(){
    
// }

