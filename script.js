const numberButtons = document.querySelectorAll('.numberbutton');
const display = document.querySelector('#screendiv');

numberButtons.forEach(button => {
    button.addEventListener('click', addToDisplay)
});

function addToDisplay() {
    const number = (this.id).substr(-1, 1);
    console.log(number);
    const content = document.querySelector("#screendiv").innerText;
    const length = document.querySelector("#screendiv").innerText.length;
    console.log(typeof content);
    if (content === '0') {
        display.textContent = number;
    } else if (length < 10) {
        display.textContent += number;
    } else {
        alert('Max length reached!')
    }
}