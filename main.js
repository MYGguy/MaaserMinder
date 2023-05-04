const total = document.getElementById("total");

let runningTotal = 0;

document.addEventListener("DOMContentLoaded", () => {
    const amount = document.getElementById("amount");
    const keys = document.querySelectorAll(".key")
    
    amount.value = "$";
    
    keys.forEach(key => {
    key.addEventListener("click", () => {
        const value = key.getAttribute("data-value");
        amount.value += value;
    })
})
})

let pht = document.getElementById("plusHistoryTable");

function submitButton() {
    pht.innerHTML = amount.value;
    
    let inputValue = parseInt(amount.value.substring(1));
    
   runningTotal += inputValue;
   total.innerHTML = "$" + runningTotal;
};

//TODO update h1 total
//TODO clear input after submit
//TODO backspace
//TODO add multiple history rows