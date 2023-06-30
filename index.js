const calcFunctions = {
    '+': function (x, y) {
        return x + y;
    },
    '-': function (x, y) {
        return x - y;
    },
    '×': function (x, y) {
        return x * y;
    },
    '÷': function (x, y) {
        return x / y;
    }
}

var operation = [];

var buttons = document.getElementsByTagName('button');
var display = document.getElementsByTagName('input');
var currentNumber = '';

function handleButtons(e) {
    switch (e.target.textContent) {
        case '=':
            if (operation.length == 2 && currentNumber) {
                operation.push(currentNumber);
                console.log(operation);
                currentNumber = '';
                operation = [calcFunctions[operation[1]](Number(operation[0]), Number(operation[2]))];
            }
            break;
        case 'C':
            if (currentNumber) currentNumber = currentNumber.replace(/[0-9]$/, '');
            else operation.pop();
            break;
        case 'CE':
            operation = [];
            currentNumber = '';
            break;
        case '±':
            currentNumber = -currentNumber;
            break;
        case '%':
            if (currentNumber) currentNumber /= 100;
            break;
        case '+':
        case '-':
        case '÷':
        case '×':
            if ((operation.length == 0 && currentNumber) || operation.length == 1) {
                if (currentNumber) operation.push(currentNumber);
                operation.push(e.target.textContent);
                currentNumber = '';
            }
            break;
        default:
            if (Number.isInteger(operation[0]) && !operation[1]) operation = [];
            if (operation[0] && !currentNumber && operation.length == 1) {
                currentNumber = operation[0];
                operation = [];
            }
            currentNumber += e.target.textContent;
            break;
    }
    display[0].value = operation.join(' ') + ' ' + currentNumber;
}

for (let x of buttons) {
    x.addEventListener('click', (event) => {
        handleButtons(event);
    })
}
