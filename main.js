const total = document.getElementById("total");

let runningTotal = 0;

let pht = document.getElementById("plusHistoryTable");
let mht = document.getElementById("minusHistoryTable");

let plusHistoryNumbers = [];
let minusHistoryNumbers = [];

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
function submitButton(plusOrMinus) {
// put into total
   let inputValue = parseFloat(amount.value.substring(1));
   
// plus to total
    if (plusOrMinus === "plus") {
   runningTotal += inputValue;
   total.innerHTML = "$" + runningTotal.toFixed(2);
   //console.log("you pressed plus");
    } 
    
// minus from total
    else if(plusOrMinus === "minus") {
        runningTotal -= inputValue;
   total.innerHTML = "$" + runningTotal.toFixed(2);
   //console.log("you pressed minus");
    }
   //console.log("running total: " + runningTotal);
   amount.value = "$";
};

// add to history DRY function
function addToHistory(plusOrMinusNumbers, plusOrMinusTable, plusOrMinus) {
    if (amount.value != "$") {
   const table = document.createElement("table");
   const tbody = document.createElement("tbody");
   
   plusOrMinusNumbers.unshift(amount.value);
   
   plusOrMinusNumbers.forEach((number) => {
       
       const formattedNumber = parseFloat(number.substring(1)).toFixed(2);
       const tr = document.createElement("tr");
       const td = document.createElement("td");
       
       if (plusOrMinus === "plus") {
       td.textContent = "$" + formattedNumber;
       } else {
           td.textContent = "-" + "$" + formattedNumber;
       }
       tr.appendChild(td);
       
       tbody.appendChild(tr);
       
       
   })
   table.appendChild(tbody);
   plusOrMinusTable.innerHTML = table.outerHTML;
   //console.log(plusHistoryTable);
   //console.log(plusHistoryNumbers);
   
   submitButton(plusOrMinus);
    } else {
        return;
    }
}