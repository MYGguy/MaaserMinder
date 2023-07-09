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
			if (!percentTime && keyValue !== 'backspace') {
            inputField.value += keyValue;
            currentNumber = inputField.value.substring(1);
            console.log(currentNumber);
//update input field
            
			} else if (percentTime && keyValue !== 'backspace' && percentNumber.length <= 1){
				percentNumber += keyValue;
				percentField.value = percentNumber + "%";
				console.log(percentNumber);
				
			} else if (keyValue == 'backspace' && inputField.value !== '$') {
				if (percentTime == false) {
				inputField.value = inputField.value.slice(0, -1)
				currentNumber = inputField.value.substring(1);
				console.log(currentNumber);
				} else if (percentTime) {
					// remove "%" before slicing
					percentNumber = percentField.value.replace('%', '');
					// slice one digit from the end
					percentNumber = percentNumber.slice(0, -1);
					// update the percentField
					percentField.value = percentNumber + "%";
					console.log(percentNumber);
				}
			}
        });
    });
};

//update total and histories when submitted
function submitButton(plusOrMinusOrPercent, plusOrMinusNumbers, plusOrMinusHistory) {
	if (currentNumber !== 0 && currentNumber !== '') {

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
	plusOrMinusNumbers.forEach((number, index) => {
		number = number.toFixed(2);
		let li = document.createElement("li");
		
		let removeBtn = document.createElement("button");
		removeBtn.textContent = "X";
		removeBtn.id = "remove-button";
		removeBtn.addEventListener("click", function () {
			removeHistoryFunction(index, number, plusOrMinusOrPercent);
		})
		
		if (plusOrMinusOrPercent == 'plus') {
			li.textContent = "$" + number;
		} else if (plusOrMinusOrPercent == 'minus') {
			li.textContent = "-$" + number;
		}
			ol.appendChild(li)
			ol.appendChild(removeBtn);
		
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
//	minusButton.classList.add("inactive");
	
	} else if (percentTime == true) {
	percentTime = false;
		
	percentField.classList.remove("active");
//	minusButton.classList.remove("inactive");
	
	percentField.value = "%";
	percentNumber = [];
	}
}

function removeHistoryFunction(index, number, plusOrMinusOrPercent) {
	if (plusOrMinusOrPercent == 'plus') {
		plusHistoryNumbers.splice(index, 1);
		console.log(plusHistoryNumbers);
		//submitButton('plus', plusHistoryNumbers, plusHistory);
	}
}