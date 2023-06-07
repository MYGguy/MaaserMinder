//dom declarations
let total, inputField, percentField, minusButton, plusButton, percentButton, keys, backspace, resetButton, minusHistory, plusHistory;

//lets declarations
let currentNumber = 0;
let plusHistoryNumbers = [];
let minusHistoryNumbers = [];
let runningTotal = 0;

let percentTime = false;
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
			if (!percentTime) {
            inputField.value += keyValue;
            currentNumber = inputField.value.substring(1);
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
	if (currentNumber !== 0) {

	if (percentNumber.length == 0 && percentTime) {
		return;
	} else {
		currentNumber = parseFloat(currentNumber);
		
	if (percentTime == true) {
		currentNumber = currentNumber * (percentNumber / 100);
		
		
		percentFunction();
	};

	//add to history numbers array
	plusOrMinusNumbers.unshift(currentNumber);
	
	let ol = document.createElement("ol");
	plusOrMinusHistory.innerHTML = '';
	
	//write each number into the history
	plusOrMinusNumbers.forEach(number => {
		number = number.toFixed(2);
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
		total.innerHTML = "$" + parseFloat(runningTotal.toFixed(2));
		
	} else if (plusOrMinusOrPercent == 'minus') {
		runningTotal -= currentNumber;
		total.innerHTML = "$" + parseFloat(runningTotal.toFixed(2));
	}
	
	//reset current number and input field
		currentNumber = 0;
		inputField.value = "$";
	}
	}
}

function percentFunction() {
//percentTime = !percentTime;
	if (percentTime == false) {
		
	percentTime = true;
	
	percentField.classList.add("active");
	minusButton.classList.add("inactive");
	
	} else if (percentTime == true) {
	percentTime = false;
		
	percentField.classList.remove("active");
	minusButton.classList.remove("inactive");
	
	percentField.value = "%";
	percentNumber = [];
	}
}