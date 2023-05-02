function updateNumber() {
    document.getElementById("amount").innerHTML = 5;
}

const keypad = document.getElementById("button1");
keypad.addEventListener("click", updateNumber);
