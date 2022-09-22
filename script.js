
// Variable declarations

const numberButtons = document.querySelectorAll('.numberbutton');
const display = document.querySelector('#screendiv');
const operandButtons = document.querySelectorAll('.operandbutton');
const equalButton = document.querySelector('#equalbutton');
const clear = document.querySelector('#clear');
const clearCurrent = document.querySelector('#clearcurrent');
let operationType = null;
let firstNumber;
let finishedOperation

// Event listeners

numberButtons.forEach(button => {
    button.addEventListener('click', addToDisplay);
});

operandButtons.forEach(button => {
    button.addEventListener('click', changeOperationType);
});

equalButton.addEventListener('click', performOperation);

clearCurrent.addEventListener('click', clearCurrentFunction);

clear.addEventListener('click', clearFunction);

// Functions

function addToDisplay() {
    const number = (this.id).substr(-1, 1);
    const content = document.querySelector("#screendiv").innerText;
    const length = document.querySelector("#screendiv").innerText.length;
    if (finishedOperation === true) {
        display.textContent = number;
        finishedOperation = false;
    } else if (content === '0' || operationType !== null) {
        display.textContent = number;
    } else if (length < 10) {
        display.textContent += number;
    } else {
        alert('Max length reached!')
    }
    operandButtons.forEach(button => button.classList.remove('active'));
}

function changeOperationType() {
    let activeOperand = false;
    operandButtons.forEach(button => {
        if (button.classList.contains('active')) {
           button.classList.remove('active');
           activeOperand = true;
        }
    });
    if (operationType !== null && activeOperand === false) {
        performOperation();
    }
    operationType = this.id;
    this.classList.add('active');
    firstNumber = document.querySelector("#screendiv").innerText;
    console.log(operationType);
}

function performOperation() {
    const secondNumber = document.querySelector("#screendiv").innerText;
    switch (operationType) {
        case 'add':
            display.textContent = round(+firstNumber + +secondNumber);
            break;
        case 'subtract':
            display.textContent = round(+firstNumber - +secondNumber);
            break;
        case 'multiply':
            display.textContent = round(+firstNumber * +secondNumber);
            break;
        case 'divide':
            if (secondNumber === '0') {
                display.textContent = 'Really?';
            } else {
            display.textContent = round(+firstNumber / +secondNumber);
            }
            break;
        case 'exponent':
            display.textContent = round((+firstNumber) ** (+secondNumber));
            break;
        case 'modulo':
            display.textContent = round((+firstNumber) % (+secondNumber));
            break;
        default:
            break;
    }
    operationType = null;
    finishedOperation = true;
}

function round (number) {
    return Math.round(number * 10) / 10;
}

function clearCurrentFunction () {
    display.textContent = '0';
    const activeOperand = document.querySelector('#' + operationType);
    activeOperand.classList.add('active');
}

function clearFunction () {
    display.textContent = '0';
    operationType = null;
}