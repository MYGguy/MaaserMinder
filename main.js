const total = document.getElementById("total");

let runningTotal = 0;

let pht = document.getElementById("plusHistoryTable");

// Keypad buttons
document.addEventListener("DOMContentLoaded", () => {
    const amount = document.getElementById("amount");
    const keys = document.querySelectorAll(".key")
    const deleteKey = document.getElementById("buttonDelete");
    
    amount.value = "$";
    
    // Update input field value
    keys.forEach(key => {
    key.addEventListener("click", () => {
        const value = key.getAttribute("data-value");
        amount.value += value;
    })
    
})

// Delete button
deleteKey.addEventListener("click", () => {
        if (amount.value.length > 1) {
            amount.value = amount.value.slice(0, -1);
        }
    })
})

// Submit button
function submitButton() {
   // Add to history
   pht.innerHTML = amount.value;
    
   let inputValue = parseInt(amount.value.substring(1));
    
   runningTotal += inputValue;
   total.innerHTML = "$" + runningTotal;
   
   amount.value = "$";
};

//TODO add multiple history rows