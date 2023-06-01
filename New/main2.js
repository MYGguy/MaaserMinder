//dom declarations
let total, inputField, percentField, minusButton, plusButton, percentButton, keys, backspace, resetButton, minusHistory, plusHistory;

//lets declarations
let currentNumber = 0;
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
			if (percentTime !== true) {
            currentNumber = parseFloat(currentNumber || "0") * 10 + parseFloat(keyValue);
            console.log(currentNumber);
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
function submitButton(plusOrMinusOrPercent, plusOrMinusNumbers, plusOrMinusHistory) {
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
		
	if (plusOrMinusOrPercent == 'plus') {
		li.textContent = "$" + number;
	} else if (plusOrMinusOrPercent == 'minus') {
		li.textContent = "-$" + number;
	}
		ol.appendChild(li);
		
	})
	plusOrMinusHistory.appendChild(ol);
	
	//update total
	if (plusOrMinusOrPercent == 'plus') {
		runningTotal += currentNumber;
		total.innerHTML = "$" + runningTotal;
		console.log(runningTotal);
	} else if (plusOrMinusOrPercent == 'minus') {
		runningTotal -= currentNumber;
		total.innerHTML = "$" + runningTotal;
	} else {
		
	}
	
	//reset current number and input field
		currentNumber = 0;
		inputField.value = "$";
	
	}

function percentFunction() {
	percentTime = true;
	percentField.classList.toggle("active");
}