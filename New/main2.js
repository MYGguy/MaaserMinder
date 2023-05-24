//dom declarations
const total = document.getElementById('total');
const inputField = document.getElementById('input-field');

const minusButton = document.getElementById('minus-button');
const plusButton = document.getElementById('plus-button');
const percentButton = document.getElementById('percent-button');

const keys = document.querySelectorAll('.key');
const backspace = document.getElementById('backspace');

const resetButton = document.getElementById('reset-button');

const minusHistory = document.getElementById('minus-history');
const plusHistory = document.getElementById('plus-history');

//lets declarations
let currentNumber = [];

document.addEventListener("DOMContentLoaded", () => {
	keys.forEach((key) => {
		key.addEventListener("click", () => {
			let keyValue = key.getAttribute("data-value");
			
			currentNumber += keyValue;
			inputField.value = "$" + currentNumber;
		});
	});
});

//todo: add keypresses to currentNumber array
//todo: update inputfield.value
