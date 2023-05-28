//dom declarations
let total, inputField, minusButton, plusButton, percentButton, keys, backspace, resetButton, minusHistory, plusHistory;

//lets declarations
let currentNumber = [];
let plusHistoryNumbers = [];
let minusHistoryNumbers = [];
let runningTotal = 0;

//when page starts, assign variables
document.addEventListener("DOMContentLoaded", () => {
    total = document.getElementById('total');
    inputField = document.getElementById('input-field');

    minusButton = document.getElementById('minus-button');
    plusButton = document.getElementById('plus-button');
    percentButton = document.getElementById('percent-button');

    keys = document.querySelectorAll('.key');
    backspace = document.getElementById('backspace');

    resetButton = document.getElementById('reset-button');

    minusHistory = document.getElementById('minus-history');
    plusHistory = document.getElementById('plus-history');

    keyPress();
});

//keypress listener
function keyPress() {
    keys.forEach((key) => {
        key.addEventListener("click", () => {
//get key
            let keyValue = key.getAttribute("data-value");
//update current number
            currentNumber += keyValue;
//update input field
            inputField.value = "$" + currentNumber;
//test
            console.log(currentNumber);
        });
    });
};

//update total and histories when submitted
function submitButton(plusOrMinus) {
	if (plusOrMinus == "plus") {
//plus

plusHistoryNumbers.unshift(currentNumber);

let ol = document.createElement("ol");
plusHistory.innerHTML = '';

plusHistoryNumbers.forEach(number => {
	let li = document.createElement("li");
	li.textContent = "$" + number;
	ol.appendChild(li);
	
})
plusHistory.appendChild(ol);
console.log(plusHistory);
	
//minus
	} else if (plusOrMinus == "minus") {
		
	}
//reset current number 
	currentNumber = [];
}
