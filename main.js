const total = document.getElementById("total");

let runningTotal = 0;

document.addEventListener("DOMContentLoaded", () => {
    const amount = document.getElementById("amount");
    const keys = document.querySelectorAll(".key")
    const deleteKey = document.getElementById("buttonDelete");
    
    amount.value = "$";
    
    let inputSequence = [];
    
    keys.forEach(key => {
    key.addEventListener("click", () => {
        const value = key.getAttribute("data-value");
        //amount.value += value;
        inputSequence.push(value);
        console.log(inputSequence);
        amount.value = "$" + inputSequence.join("");
    })
    
    deleteKey.addEventListener("click", () => {
        /*if (amount.value.length > 1) {
            amount.value = amount.value.slice(0, -1);
            
        }*/
        
        if (inputSequence.length > 0) {
            inputSequence.pop();
            amount.value = "$" + inputSequence.join("");
        }
    })
})
})

let pht = document.getElementById("plusHistoryTable");

function submitButton() {
   pht.innerHTML = amount.value;
    
   let inputValue = parseInt(amount.value.substring(1));
    
   runningTotal += inputValue;
   total.innerHTML = "$" + runningTotal;
   
   amount.value = "$";
   inputSequence = [];
   runningTotal = 0;
   console.log("inputSequence" + inputSequence)
   console.log("amount.value" + amount.value)
   console.log("runningTotal" + runningTotal)
};

//TODO backspace
//TODO add multiple history rows