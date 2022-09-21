const numberButtons = document.querySelectorAll('.numberbutton');
const display = document.querySelector('#screendiv');
const operandButtons = document.querySelectorAll('.operandbutton');
const equalButton = document.querySelector('#equalbutton');
let operationType = null;
let firstNumber;

numberButtons.forEach(button => {
    button.addEventListener('click', addToDisplay)
});

operandButtons.forEach(button => {
    button.addEventListener('click', changeOperationType)
});

equalButton.addEventListener('click', performOperation)


function addToDisplay() {
    const number = (this.id).substr(-1, 1);
    const content = document.querySelector("#screendiv").innerText;
    const length = document.querySelector("#screendiv").innerText.length;
    if (content === '0' || operationType !== null) {
        display.textContent = number;
    } else if (length < 10) {
        display.textContent += number;
    } else {
        alert('Max length reached!')
    }
    operandButtons.forEach(button => button.classList.remove('active'));
}

function changeOperationType() {
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
            display.textContent = round(+firstNumber / +secondNumber);
            break;
        default:
            break;
    }
}

function round (number) {
    return Math.round(number * 10) / 10;
}