const total = document.getElementById("total");

let runningTotal = 0;

document.addEventListener("DOMContentLoaded", () => {
    const amount = document.getElementById("amount");
    const keys = document.querySelectorAll(".key")
    const deleteKey = document.getElementById("buttonDelete");
    
    amount.value = "$";
    
    keys.forEach(key => {
    key.addEventListener("click", () => {
        const value = key.getAttribute("data-value");
        amount.value += value;
    })
    
})

deleteKey.addEventListener("click", () => {
        if (amount.value.length > 1) {
            amount.value = amount.value.slice(0, -1);
        }
    })
})

let pht = document.getElementById("plusHistoryTable");

function submitButton() {
   pht.innerHTML = amount.value;
    
   let inputValue = parseInt(amount.value.substring(1));
    
   runningTotal += inputValue;
   total.innerHTML = "$" + runningTotal;
   
   amount.value = "$";
};

//TODO backspace
//TODO add multiple history rows