//Input Selector
const totalIncome = document.getElementById("total-income");
const foodExpanse = document.getElementById("food-expanse");
const rentExpanse = document.getElementById("rent-expanse");
const clothesExpanse = document.getElementById("clothes-expanse");
const savingPercentage = document.getElementById("saving-percentage");

//Money Showing Selector
const netBalance = document.getElementById("net-balance");
const totalExpanse = document.getElementById("total-expanse");
const savingMoney = document.getElementById("saving-money");
const remainingBalance = document.getElementById("remaining-balance");

// button Selector
const CalculateButton = document.getElementById("calculate");
const savingCalculateButton = document.getElementById("savings");

// Initial Total Balance
let TotalBalance = 0;

//Total Expanses Calculating
function totalExpanseCalculate(food, rent, clothes) {
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
    totalExpanse.innerText = 0;
    savingMoney.innerText = 0;
    remainingBalance.innerText = 0;

}

//Input Number Type Checking
function inputNumberTypeCheck(totalIncome, foodExpanse, rentExpanse, clothesExpanse) {
    if (totalIncome.value === "" || foodExpanse.value === "" || rentExpanse.value === "" || clothesExpanse.value === "") {
        warningMessage("please fill all the input fields properly", document.querySelector(".clothes"));
    } else if (isNaN(totalIncome.value)) {
        warningMessage("total income input must be a number", document.querySelector(".total-income"));
    } else if (isNaN(foodExpanse.value)) {
        warningMessage("food expanse input must be a number", document.querySelector(".food"));
    } else if (isNaN(rentExpanse.value)) {
        warningMessage("rent expanse input must be a number", document.querySelector(".rent"));
    } else if (isNaN(clothesExpanse.value)) {
        warningMessage("clothes expanse input must be a number", document.querySelector(".clothes"));
    } else if (totalIncome.value < 0 || foodExpanse.value < 0 || rentExpanse.value < 0 || clothesExpanse.value < 0) {
        warningMessage("all input value must be greater than 0 ", document.querySelector(".clothes"));
    } else {
        return true;
    }

    return false;
}



//Calculating Expanse and net Balance

CalculateButton.addEventListener("click", function() {
    let inputNumberTypeResult = inputNumberTypeCheck(totalIncome, foodExpanse, rentExpanse, clothesExpanse);
    TotalBalance = Number(totalIncome.value);

    //if inputNumberTypeResult pass then Execute
    if (inputNumberTypeResult) {
        let totalExpanseCalc = totalExpanseCalculate(foodExpanse.value, rentExpanse.value, clothesExpanse.value);
        if (totalExpanseCalc > TotalBalance) {
            warningMessage("your expanses can't be greater than your total income", document.querySelector(".clothes"));

        } else {
            document.getElementById("warning") && document.getElementById("warning").remove();
            netBalance.innerText = TotalBalance - totalExpanseCalc;
            totalExpanse.innerText = totalExpanseCalc;
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
            warningMessage("savings can't be greater than your net income", document.querySelector(".saving-calculate"));
        }
    } else {
        warningMessage("savings percentage can't be less than 0 and greater than 100", document.querySelector(".saving-calculate"));

    }
});