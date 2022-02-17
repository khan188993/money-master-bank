//Input Selector
const totalIncome = document.getElementById("total-income");
const foodExpense = document.getElementById("food-expense");
const rentExpense = document.getElementById("rent-expense");
const clothesExpense = document.getElementById("clothes-expense");
const savingPercentage = document.getElementById("saving-percentage");

//Money Showing Selector
const netBalance = document.getElementById("net-balance");
const totalExpense = document.getElementById("total-expense");
const savingMoney = document.getElementById("saving-money");
const remainingBalance = document.getElementById("remaining-balance");

// button Selector
const CalculateButton = document.getElementById("calculate");
const savingCalculateButton = document.getElementById("savings");

// Initial Total Balance
let TotalBalance = 0;

//Total Expenses Calculating
function totalExpenseCalculate(food, rent, clothes) {
    return Number(food) + Number(rent) + Number(clothes);
}

//warning Message Generating
function warningMessage(text, parent) {
    document.getElementById("warning") && document.getElementById("warning").remove();
    let span = document.createElement("span");
    span.id = "warning";
    span.innerText = text;
    parent.appendChild(span);

    //If got any errors make all balance into 0;
    netBalance.innerText = 0;
    totalExpense.innerText = 0;
    savingMoney.innerText = 0;
    remainingBalance.innerText = 0;

}

//Input Number Type Checking
function inputNumberTypeCheck(totalIncome, foodExpense, rentExpense, clothesExpense) {
    if (totalIncome.value === "" || foodExpense.value === "" || rentExpense.value === "" || clothesExpense.value === "") {
        warningMessage("please fill all the input fields properly", document.querySelector(".clothes"));
    } else if (isNaN(totalIncome.value)) {
        warningMessage("total income input must be a number", document.querySelector(".total-income"));
    } else if (isNaN(foodExpense.value)) {
        warningMessage("food expense input must be a number", document.querySelector(".food"));
    } else if (isNaN(rentExpense.value)) {
        warningMessage("rent expense input must be a number", document.querySelector(".rent"));
    } else if (isNaN(clothesExpense.value)) {
        warningMessage("clothes expense input must be a number", document.querySelector(".clothes"));
    } else if (totalIncome.value < 0 || foodExpense.value < 0 || rentExpense.value < 0 || clothesExpense.value < 0) {
        warningMessage("all input value must be greater than 0 ", document.querySelector(".clothes"));
    } else {
        return true;
    }

    return false;
}



//Calculating Expense and net Balance

CalculateButton.addEventListener("click", function() {
    let inputNumberTypeResult = inputNumberTypeCheck(totalIncome, foodExpense, rentExpense, clothesExpense);
    TotalBalance = Number(totalIncome.value);

    //if inputNumberTypeResult pass then Execute
    if (inputNumberTypeResult) {
        let totalExpenseCalc = totalExpenseCalculate(foodExpense.value, rentExpense.value, clothesExpense.value);
        if (totalExpenseCalc > TotalBalance) {
            warningMessage("your expenses can't be greater than your total income", document.querySelector(".clothes"));

        } else {
            document.getElementById("warning") && document.getElementById("warning").remove();
            netBalance.innerText = TotalBalance - totalExpenseCalc;
            totalExpense.innerText = totalExpenseCalc;
        }
    }

});


//Saving Calculating 
savingCalculateButton.addEventListener("click", function() {
    if (savingPercentage.value >= 0 && savingPercentage.value <= 100) {
        document.getElementById("warning") && document.getElementById("warning").remove();

        let savingAmount = (Number(TotalBalance) / 100) * Number(savingPercentage.value);
        if (savingAmount <= Number(netBalance.innerText)) {
            remainingBalanceAmount = Number(netBalance.innerText) - savingAmount;
            savingMoney.innerText = Math.round(savingAmount);
            remainingBalance.innerText = Math.round(remainingBalanceAmount);
        } else {
            warningMessage("savings can't be greater than your net balance", document.querySelector(".saving-calculate"));
        }
    } else {
        warningMessage("savings percentage can't be less than 0 and greater than 100", document.querySelector(".saving-calculate"));

    }
});