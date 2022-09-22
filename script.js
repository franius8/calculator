
// Variable declarations

const numberButtons = document.querySelectorAll('.numberbutton');
const display = document.querySelector('#screendiv');
const operandButtons = document.querySelectorAll('.operandbutton');
const equalButton = document.querySelector('#equalbutton');
const clear = document.querySelector('#clear');
const clearCurrent = document.querySelector('#clearcurrent');
let operationType = null;
let firstNumber;
let finishedOperation;
let operationInProgress = false;

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

document.addEventListener('keydown', addKeyboardInput);

// Functions

function addToDisplay() {
    const number = (this.id).substr(-1, 1);
    const content = document.querySelector("#screendiv").innerText;
    const length = document.querySelector("#screendiv").innerText.length;
    if (finishedOperation === true) {
        displayChangeContent (number);
        finishedOperation = false;
    } else if (content === '0') {
        displayChangeContent (number);
    } else if (operationType !== null && operationInProgress === false) {
        displayChangeContent (number);
        operationInProgress = true;
    } else if (length < 10) {
        displayConcatContent(number);
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
    operationInProgress = false;
}

function round (number) {
    let result = Math.round(number * 10) / 10;
    if (result === Infinity) {
        result = "Too large!";
    }
    if (result >= 9999999999) {
        result = result.toExponential(2);
    }
    return result
}

function clearCurrentFunction () {
    display.textContent = '0';
    operationInProgress = false;
    const activeOperand = document.querySelector('#' + operationType);
    activeOperand.classList.add('active');
}

function clearFunction () {
    display.textContent = '0';
    operationType = null;
    operationInProgress = false;
}

function addKeyboardInput(e) {
    const content = document.querySelector("#screendiv").innerText;
    const length = document.querySelector("#screendiv").innerText.length;
    const reg = /^\d+$/;
    if (reg.test(e.key)) {    
        document.querySelector('#number' + e.key).click();
    }
    switch (e.key) {
        case '+':
            document.querySelector('#add').click();
            break;
        case '-':
            document.querySelector('#subtract').click();
            break;
        case '*':
            document.querySelector('#multiply').click();
            break;
        case '/':
            document.querySelector('#divide').click();
            break;
        case '=':
        case 'Enter':
            document.querySelector('#equalbutton').click();
            break;
        case '^':
            document.querySelector('#exponent').click();
            break;
        case '%':
            document.querySelector('#modulo').click();
            break;
        case 'c':
            document.querySelector('#clearcurrent').click();
            break;
        case 'a':
            document.querySelector('#clear').click();
            break;
        default:
            break;
    }
}

function displayChangeContent (number) {
    const content = document.querySelector("#screendiv").innerText;
    if (number !== '.') {
        display.textContent = number;
    } else if (!content.includes('.')) {
        display.textContent = '0.';
    }
}

function displayConcatContent (number) {
    const content = document.querySelector("#screendiv").innerText;
    if (number !== '.' || !content.includes('.')) {
        display.textContent += number;
    }
}