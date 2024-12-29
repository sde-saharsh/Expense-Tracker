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

window.onload = function () {
    loadFromLocalStorage();
    updateDisplayedTotals();
};

add_transaction.addEventListener('click', function () {
    let inputName = input_name.value.trim();
    let inputAmount = input_amount.value.trim();
    let dropdownOption = dropdown.value;

    if (inputName === "" || inputAmount === "" || dropdownOption === "" || inputAmount <= 0) {
        alert("Please enter valid input");
        return;
    }

    const transaction = {
        id: Date.now(),
        name: inputName,
        amount: parseInt(inputAmount),
        type: dropdownOption
    };

    addTasktoDOM(transaction);
    saveToLocalStorage(transaction);

    input_name.value = "";
    input_amount.value = "";
    dropdown.value = "Credit";
});

function addTasktoDOM(transaction) {
    let sub_li = document.createElement('li');
    sub_li.setAttribute('data-id', transaction.id);

    let name_span = document.createElement('span');
    let amount_span = document.createElement('span');
    let dropdown_span = document.createElement('span');
    let delete_btn = document.createElement('button');
    delete_btn.className = "fa-solid fa-trash";

    name_span.innerHTML = transaction.name;
    amount_span.innerHTML = `$ ${transaction.amount}`;
    dropdown_span.innerHTML = transaction.type;

    sub_li.appendChild(name_span);
    sub_li.appendChild(amount_span);
    sub_li.appendChild(dropdown_span);
    sub_li.appendChild(delete_btn);

    transaction_list.appendChild(sub_li);

    update_total_balance(transaction.type, transaction.amount);

    delete_btn.addEventListener('click', function () {
        transaction_list.removeChild(sub_li);
        removeFromLocalStorage(transaction.id);
        update_total_balance(transaction.type, -transaction.amount); // Reverse the update
    });
}

function update_total_balance(value, input_amount) {
    if (value === 'Credit') {
        amount_total += input_amount;
        income_total += input_amount;
    } else {
        amount_total -= input_amount;
        expense_total += input_amount;
    }
    updateDisplayedTotals();
}

function updateDisplayedTotals() {
    total_amount.innerHTML = `$ ${amount_total}`;
    total_income.innerHTML = `$ ${income_total}`;
    total_expense.innerHTML = `$ ${expense_total}`;
}


function saveToLocalStorage(transaction) {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


function loadFromLocalStorage() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(transaction => {
        addTasktoDOM(transaction);

        if (transaction.type === 'Credit') {
            amount_total += transaction.amount;
            income_total += transaction.amount;
        } else {
            amount_total -= transaction.amount;
            expense_total += transaction.amount;
        }
    });
}

function removeFromLocalStorage(id) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions = transactions.filter(transaction => transaction.id !== id);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}
