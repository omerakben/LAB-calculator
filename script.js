// Calculator functionality
const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operation = null;

function updateScreen() {
    screen.value = currentInput || '0';
}

function clear() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateScreen();
}

function handleNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateScreen();
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateScreen();
    }
}

function handleOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                result = 'Error';
            } else {
                result = prev / current;
            }
            break;
        case '%':
            result = (prev / 100) * current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateScreen();
}

function handleBackspace() {
    currentInput = currentInput.slice(0, -1);
    updateScreen();
}

function handleButtonClick(value) {
    switch (value) {
        case 'C':
            clear();
            break;
        case '←':
            handleBackspace();
            break;
        case '=':
            calculate();
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
        case '%':
            handleOperator(value);
            break;
        case '.':
            handleDecimal();
            break;
        default:
            handleNumber(value);
    }
}

buttons.forEach(button => button.addEventListener('click', () => handleButtonClick(button.textContent)));

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', 'Enter', 'Backspace', 'Escape', '%'];
    
    if (validKeys.includes(key)) {
        event.preventDefault();
        let buttonValue = key;
        if (key === 'Enter') buttonValue = '=';
        if (key === '*') buttonValue = '×';
        if (key === '/') buttonValue = '÷';
        if (key === 'Backspace') buttonValue = '←';
        if (key === 'Escape') buttonValue = 'C';
        handleButtonClick(buttonValue);
    }
});

console.log('Calculator by Ozzy!');
