const total = document.getElementById("total");

let runningTotal = 0;

let pht = document.getElementById("plusHistoryTable");

let plusHistoryNumbers = [];

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

function addToPlusHistory() {
   const table = document.createElement("table");
   const tbody = document.createElement("tbody");
   
   
   plusHistoryNumbers.forEach((number) => {
       const tr = document.createElement("tr");
       const td = document.createElement("td");
       
       td.textContent = number;
       tr.appendChild(td);
       
       tbody.appendChild(tr);
       
       
   })
   table.appendChild(tbody);
   pht.innerHTML = table.outerHTML;
   //console.log(plusHistoryTable);
   
}

// Submit button
function submitButton() {
// Add to plus history
   plusHistoryNumbers.push(amount.value);
   console.log(plusHistoryNumbers);
   addToPlusHistory();
    
   let inputValue = parseInt(amount.value.substring(1));
    
   runningTotal += inputValue;
   total.innerHTML = "$" + runningTotal;
   
   amount.value = "$";
};

//TODO history backwards 