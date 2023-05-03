/*function updateNumber() {
    document.getElementById("amount").innerHTML = 5;
}
*/

//const keypad = document.getElementById("button1");

document.addEventListener("DOMContentLoaded", () => {
    const amount = document.getElementById("amount");
    const keys = document.querySelectorAll(".key")
    
    amount.value = "$";
    
    keys.forEach(key => {
    key.addEventListener("click", () => {
        const value = key.getAttribute("data-value");
        amount.value += value;
    })
})
})


//keypad.addEventListener("click", updateNumber);
