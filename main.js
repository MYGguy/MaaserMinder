const total = document.getElementById("total");

let runningTotal = 0;

let pht = document.getElementById("plusHistoryTable");
let mht = document.getElementById("minusHistoryTable");

let plusHistoryNumbers = [];
let minusHistoryNumbers = [];

const amount = document.getElementById("amount");
const keys = document.querySelectorAll(".key");
const deleteKey = document.getElementById("buttonDelete");

// Keypad buttons
document.addEventListener("DOMContentLoaded", () => {
  restoreState();

  amount.value = "$";

  // Update input field value
  keys.forEach((key) => {
    key.addEventListener("click", () => {
      const value = key.getAttribute("data-value");
      amount.value += value;
    });
  });

  // Delete button
  deleteKey.addEventListener("click", () => {
    if (amount.value.length > 1) {
      amount.value = amount.value.slice(0, -1);
    }
  });
});

// main function when button is pressed
//#1
function addToHistory(
  plusOrMinusNumbers,
  plusOrMinusTable,
  plusOrMinus,
  restore
) {
  if (amount.value !== "$" || restore) {
    if (plusOrMinus === "perc10") {
      x = parseFloat(amount.value.substring(1)) * 0.1;
      plusOrMinusNumbers.unshift(x.toFixed(2));
      console.log("perc10 number: " + x);
    } else {
      plusOrMinusNumbers.unshift(amount.value.substring(1));
    }
    if (!restore) {
      submitButton(plusOrMinus);
    }
  }

  updateHistoryTable(
    plusOrMinusNumbers,
    plusOrMinusTable,
    plusOrMinus,
    restore
  );

  if (!restore) {
    saveState();
  }
}

//update history table
//#2
function updateHistoryTable(
  plusOrMinusNumbers,
  plusOrMinusTable,
  plusOrMinus,
  restore
) {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  plusOrMinusNumbers.forEach((number, index) => {
    const formattedNumber = parseFloat(number).toFixed(2);

    const tr = document.createElement("tr");
    const td = document.createElement("td");

    // create delete button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.id = "deleteHistoryButton";
    removeBtn.addEventListener("click", function () {
      removeHistoryFunction(index, number, plusOrMinus);
    });

    //text to add to td
    let textNode;
    if (plusOrMinus === "plus") {
      textNode = document.createTextNode("$" + formattedNumber);
    } else if (plusOrMinus === "minus") {
      textNode = document.createTextNode("-" + "$" + formattedNumber);
    } else if (plusOrMinus === "perc10") {
      let newFormattedNumber = formattedNumber * 0.1;
      textNode = document.createTextNode("$" + formattedNumber);
    }

    //update table
    td.appendChild(textNode);
    td.appendChild(removeBtn);
    tr.appendChild(td);

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  plusOrMinusTable.innerHTML = "";
  plusOrMinusTable.appendChild(table);

  //console.log(plusHistoryTable);
  //console.log("plus numbers: " + plusHistoryNumbers);
  //console.log("minus numbers: " + minusHistoryNumbers);
}

// Submit button
//#3
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
  else if (plusOrMinus === "minus") {
    runningTotal -= inputValue;
    total.innerHTML = "$" + runningTotal.toFixed(2);
    //console.log("you pressed minus");
  }

  // plus percentage
  else if (plusOrMinus === "perc10") {
    runningTotal += inputValue * 0.1;
    total.innerHTML = "$" + runningTotal.toFixed(2);
  }
  console.log("running total: " + runningTotal);
  console.log("plushistorynumbers: " + plusHistoryNumbers);

  amount.value = "$";
}

//delete history button
function removeHistoryFunction(index, number, plusOrMinus) {
  if (plusOrMinus === "plus" || plusOrMinus === "perc10") {
    //remove number from plus table
    plusHistoryNumbers.splice(index, 1);
    updateHistoryTable(plusHistoryNumbers, plusHistoryTable, "plus");

    //remove number from total
    runningTotal -= parseFloat(number);
    total.innerHTML = "$" + runningTotal.toFixed(2);
  } else {
    minusHistoryNumbers.splice(index, 1);
    updateHistoryTable(minusHistoryNumbers, minusHistoryTable, "minus");

    runningTotal += parseFloat(number);
    total.innerHTML = "$" + runningTotal.toFixed(2);
  }
  //console.log(runningTotal);

  saveState();
  //??	updateUI();
}

// Reset state button
function resetState() {
  if (confirm("Are you sure you want to reset all?")) {
    localStorage.removeItem("plusHistoryNumbers");
    localStorage.removeItem("minusHistoryNumbers");
    localStorage.removeItem("runningTotal");

    plusHistoryNumbers = [];
    minusHistoryNumbers = [];
    runningTotal = 0;
    amount.value = "$";
    total.innerHTML = "$";

    updateUI();
  } else {
    return;
  }
}

// Save the state
function saveState() {
  localStorage.setItem(
    "plusHistoryNumbers",
    JSON.stringify(plusHistoryNumbers)
  );
  localStorage.setItem(
    "minusHistoryNumbers",
    JSON.stringify(minusHistoryNumbers)
  );
  localStorage.setItem("runningTotal", runningTotal);
}

// Load the state
function restoreState() {
  // JSON.parse to convert the stored JSON string back into an array
  plusHistoryNumbers =
    JSON.parse(localStorage.getItem("plusHistoryNumbers")) || [];
  minusHistoryNumbers =
    JSON.parse(localStorage.getItem("minusHistoryNumbers")) || [];

  // parseFloat to convert the stored string value of runningTotal back into a number
  runningTotal = parseFloat(localStorage.getItem("runningTotal")) || 0;

  updateUI();
}

// update the ui
function updateUI() {
  // Update the total display
  total.innerHTML = "$" + runningTotal.toFixed(2);

  // Update the plus history table
  updateHistoryTable(plusHistoryNumbers, plusHistoryTable, "plus");

  // Update the minus history table
  updateHistoryTable(minusHistoryNumbers, minusHistoryTable, "minus");
}

//TODO: ////rethink: -- percent button. it's gray, put in numbers. percent button becomes green. click percent button, numbers become green. put in percent number, then plus.

//bug: reopening page in codepen shows '$'

//BUG: refresh breaks page
// only happens in spck