const total = document.getElementById("total");

let runningTotal = 0;

let pht = document.getElementById("plusHistoryTable");
let mht = document.getElementById("minusHistoryTable");

let plusHistoryNumbers = [];
let minusHistoryNumbers = [];

// update the ui
function updateUI() {
	// Update the total display
	total.innerHTML = "$" + runningTotal.toFixed(2);

	// Update the plus history table
	updateHistoryTable(plusHistoryNumbers, plusHistoryTable, "plus");

	// Update the minus history table
	updateHistoryTable(minusHistoryNumbers, minusHistoryTable, "minus");
}

// Save the state
function saveState() {
	localStorage.setItem("plusHistoryNumbers", JSON.stringify(plusHistoryNumbers));
	localStorage.setItem("minusHistoryNumbers", JSON.stringify(minusHistoryNumbers));
	localStorage.setItem("runningTotal", runningTotal);
}

// Load the state
function restoreState() {
	// JSON.parse to convert the stored JSON string back into an array
	plusHistoryNumbers = JSON.parse(localStorage.getItem("plusHistoryNumbers")) || [];
	minusHistoryNumbers = JSON.parse(localStorage.getItem("minusHistoryNumbers")) || [];

	// parseFloat to convert the stored string value of runningTotal back into a number
	runningTotal = parseFloat(localStorage.getItem("runningTotal")) || 0;

	updateUI();
}

// Keypad buttons
document.addEventListener("DOMContentLoaded", () => {
	const amount = document.getElementById("amount");
	const keys = document.querySelectorAll(".key")
	const deleteKey = document.getElementById("buttonDelete");

	restoreState();

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
	else if (plusOrMinus === "minus") {
		runningTotal -= inputValue;
		total.innerHTML = "$" + runningTotal.toFixed(2);
		//console.log("you pressed minus");
	}
	console.log("running total: " + runningTotal);
	amount.value = "$";
};

// main function when button is pressed
function addToHistory(plusOrMinusNumbers, plusOrMinusTable, plusOrMinus, restore) {
	if (amount.value !== "$" || restore) {
		plusOrMinusNumbers.unshift(amount.value);
		if (!restore) {
			submitButton(plusOrMinus);
		}
	}

	updateHistoryTable(plusOrMinusNumbers, plusOrMinusTable, plusOrMinus, restore);

	if (!restore) {
		saveState();
	}
}

//delete history button
function deleteHistoryFunction(index, number, plusOrMinus) {
	if (plusOrMinus === 'plus') {
//remove number from plus table
	plusHistoryNumbers.splice(index, 1);
	updateHistoryTable(plusHistoryNumbers, plusHistoryTable, 'plus');
	
	//remove number from total
	runningTotal -= parseFloat(number.substring(1));
	total.innerHTML = "$" + runningTotal.toFixed(2);
} else {
	minusHistoryNumbers.splice(index, 1);
	updateHistoryTable(minusHistoryNumbers, minusHistoryTable, 'minus');
	runningTotal += parseFloat(number.substring(1));
	total.innerHTML = "$" + runningTotal.toFixed(2);
}
//console.log(runningTotal);

	saveState();
//??	updateUI();
};

//update history table 
function updateHistoryTable(plusOrMinusNumbers, plusOrMinusTable, plusOrMinus, restore) {

	const table = document.createElement("table");
	const tbody = document.createElement("tbody");

	plusOrMinusNumbers.forEach((number, index) => {

		const formattedNumber = parseFloat(number.substring(1)).toFixed(2);
		const tr = document.createElement("tr");
		const td = document.createElement("td");

		// create delete button 
		const deleteBtn = document.createElement('button');
		deleteBtn.textContent = 'X';
		deleteBtn.id = 'deleteHistoryButton';
		deleteBtn.addEventListener('click', function() { deleteHistoryFunction(index, number, plusOrMinus)});

//text to add to td
		let textNode;
		if (plusOrMinus === "plus") {
			textNode = document.createTextNode("$" + formattedNumber);
		} else {
			textNode = document.createTextNode("-" + "$" + formattedNumber);
		}

//update table
		td.appendChild(textNode);
		td.appendChild(deleteBtn);
		tr.appendChild(td);

		tbody.appendChild(tr);
	})
	table.appendChild(tbody);
	
	plusOrMinusTable.innerHTML = '';
	plusOrMinusTable.appendChild(table);
	
	//console.log(plusHistoryTable);
	//console.log("plus numbers: " + plusHistoryNumbers);
	//console.log("minus numbers: " + minusHistoryNumbers);
};

// Reset state function
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

//TODO: percentage calculator