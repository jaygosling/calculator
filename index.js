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

var currentNumber = '';
var operation = [];
var keys = [['%','CE','C','÷'], ['7','8','9','×'], ['4','5','6','-'], ['1','2','3','+'], ['±','0','.','=']];
var keypad = document.getElementById('buttons');
var buttons = document.getElementsByTagName('button');
var display = document.getElementsByTagName('input');

for (let row of keys) {
    var divRow = document.createElement('div');
    divRow.className = "container-fluid d-flex flex-row mb-2"
    for(let button of row) {
        var btn = document.createElement('button');
        btn.className = "btn btn-info btn-lg btn-rounded col mx-1";
        btn.setAttribute("type", "button")
        btn.innerHTML = button;
        divRow.appendChild(btn);
    }
    keypad.appendChild(divRow);
}

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
            if (currentNumber == '' && !operation[0]) currentNumber = 0;
            break;
        case 'CE':
            operation = [];
            currentNumber = 0;
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
            if (currentNumber == 0) currentNumber = ''
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
