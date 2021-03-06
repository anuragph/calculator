/* =====
Calculation
=====
*/
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return "Nope, can't do that";
    }
    return a / b;
}

function operate(operator, a, b) {
    if (operator == 'add') {
        return add(a, b);
    } else if (operator == 'subtract') {
        return subtract(a, b);
    } else if (operator == 'multiply') {
        return multiply(a, b);
    } else if (operator == 'divide') {
        return divide(a, b);
    }
}

/* Input functions */
const display = document.querySelector('.display');
display.textContent = 0; // On startup

const inputNums = document.querySelectorAll('.btn');
inputNums.forEach(inputNum => inputNum.addEventListener('click', calculator));

const operationArr = ['add', 'subtract', 'multiply', 'divide'];
// Initialization
let numArr = [];
let operation = '';

let inOperation = false;
let refresh = false;
let totalExists = false;

let total = 0;
let next = 0;

function calculator(e) {
    if(e.target.value.match(/[0-9]/g)) {
        numKey(e);
    } else if (operationArr.includes(e.target.value)) {
        opKey(e);
    } else if (e.target.value == 'equals') {
        equalsKey();
    } else if (e.target.value == 'clear') {
        clearKey();
    }
}



function numKey(e) {
    if(refresh == true) {
        numArr = [];
    }
    refresh = false;
    // Hold upto 11 digits.
    if (numArr.length < 11) {
        numArr.push(e.target.value);
    }
    const toDisplay = parseFloat(numArr.join(''));
    display.textContent = toDisplay;

    if (inOperation == false) {
        total = toDisplay;
        totalExists = true;
    } else {
        next = toDisplay;
    }
    console.log(`total: ${total}, next ${next}`);
}

function opKey(e) {
    inOperation = true;
    
    if (operation == '') {
        operation = e.target.value;
    } else {
        equalsKey();
        operation = e.target.value;
    }
    refresh = true;
    
}

function equalsKey() {
    if (totalExists && inOperation) {
        total = operate(operation, total, next);
        // Round solution upto 2 decimal places.
        total = Math.round(total * 100) / 100;

        next = 0;
        numArr = [];
        operation = '';      
    }

    // Display solution of only upto 11 digits.
    if (total.toString().length > 11) {
        display.textContent = "Can't fit that here";
    } else {
        display.textContent = total;
    }
    
}

function clearKey() {
    numArr = [];
    operation = '';
    inOperation = false;
    refresh = false;
    totalExists = false;
    total = 0;
    next = 0;
    display.textContent = 0;
}

