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
// add to total
   let inputValue = parseInt(amount.value.substring(1));
  //let totalValue = parseInt(total.value.substring(1));
    
    if (plusOrMinus === "plus") {
   runningTotal += inputValue;
   total.innerHTML = "$" + runningTotal;
   console.log("you pressed plus");
    } 
// minus from total
    else if(plusOrMinus === "minus") {
        runningTotal -= inputValue;
   total.innerHTML = "$" + runningTotal;
   console.log("you pressed minus");
    }
   console.log("running total: " + runningTotal);
   //console.log(totalValue);
   amount.value = "$";
};

// add to history DRY function
function addToHistory(plusOrMinusNumbers, plusOrMinusTable, plusOrMinus) {
   const table = document.createElement("table");
   const tbody = document.createElement("tbody");
   
   plusOrMinusNumbers.unshift(amount.value);
   
   plusOrMinusNumbers.forEach((number) => {
       const tr = document.createElement("tr");
       const td = document.createElement("td");
       
       if (plusOrMinus === "plus") {
       td.textContent = number;
       } else {
           td.textContent = "-" + number;
       }
       tr.appendChild(td);
       
       tbody.appendChild(tr);
       
       
   })
   table.appendChild(tbody);
   plusOrMinusTable.innerHTML = table.outerHTML;
   //console.log(plusHistoryTable);
   //console.log(plusHistoryNumbers);
   
   submitButton(plusOrMinus);
}

//TODO press numbers, then + or - yo submit to proper history