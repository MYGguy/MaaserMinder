//dom declarations
let total, inputField, percentField, minusButton, plusButton, percentButton, keys, backspace, resetButton, minusHistory, plusHistory;

//lets declarations
let currentNumber = [];
let plusHistoryNumbers = [];
let minusHistoryNumbers = [];
let runningTotal = 0;

let percentTime;
let percentNumber = [];

//when page starts, assign variables
document.addEventListener("DOMContentLoaded", () => {
    total = document.getElementById('total');
    inputField = document.getElementById('input-field');
    percentField = document.getElementById('percent-field')

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
			if (percentTime === false) {
            currentNumber += keyValue;
//update input field
            inputField.value = "$" + currentNumber;
            
			} else {
				percentNumber += keyValue;
				percentField.value = percentNumber + "%";
			}
        });
    });
};

//update total and histories when submitted
function submitButton(plusOrMinus, plusOrMinusNumbers, plusOrMinusHistory) {
	if (percentTime === true) {
		console.log('hello');
	}
		
	//add to history numbers array
	plusOrMinusNumbers.unshift(currentNumber);
	
	let ol = document.createElement("ol");
	plusOrMinusHistory.innerHTML = '';
	
	//write each number into the history
	plusOrMinusNumbers.forEach(number => {
		let li = document.createElement("li");
		li.textContent = "$" + number;
		ol.appendChild(li);
		
	})
	plusOrMinusHistory.appendChild(ol);
	
	//reset current number and input field
		currentNumber = [];
		inputField.value = "$";
	
	}

function percentFunction() {
	percentTime = true;
	percentField.classList.toggle("active");
}