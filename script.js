let resultDisp = document.querySelector("#result");
let numBtns = document.querySelectorAll(".number");
let opsBtns = document.querySelectorAll(".operator");
let equals = document.querySelector("#equal");
let clearBtn = document.querySelector("#clear");
let changeSign = document.querySelector("#changeSign");
let delBtn = document.querySelector("#del");
let num1 = '';
let num2 = '';
let total = 0;
let operatorSign = '';
let wasEval = false;

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x/y;
}

function operate(operator, x, y) {
    x = parseFloat(x);
    y = parseFloat(y);
    console.log(x, y);
    switch (operator) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '*':
            return multiply(x, y);
        case '/':
            if(y == 0) {
                return 'ERROR';
            }
            return divide(x, y);
        default:
            return 0;
    }
}

function clear(type) {
    num1 = '';
    num2 = '';
    operatorSign = '';
    wasEval = false;
    if(type == 0) {
        //Used to clear everything but keeps the display
        return true;
    }
    else {
        resultDisp.innerText = ' ';
    }
}

function numbers(nums) {
    if(isNaN(resultDisp.innerText) && resultDisp.innerText != "." || wasEval == true) { 
        resultDisp.innerText = ""; //Clears any non number chars (+, -, *) except the '.'
        if(wasEval) { //if equation was just evaluated, clear everything when picking new numbers
            clear(1);
        }
    }
    if(operatorSign && num2.length < 7) {
        resultDisp.innerText += nums.target.innerText;
        num2 += nums.target.innerText;
    }
    else if(num1.length < 7) {
        resultDisp.innerText += nums.target.innerText;
        num1 += nums.target.innerText;
    }
    
}

function change(number) {
    return (parseFloat(number) * -1).toString();
}

function backspace(string) {
    return string.slice(0, -1);
}

changeSign.addEventListener("click", () => {
    let temp = change(resultDisp.innerText);
    resultDisp.innerText = temp;
    if(operatorSign) {
        num2 = temp;
    }
    else {
        num1 = temp;
    }
})

//Clear button, calls the clear function
clearBtn.addEventListener('click', () => clear(1));

delBtn.addEventListener('click', () => {
    let temp = backspace(resultDisp.innerText);
    resultDisp.innerText = temp;
    if(operatorSign) {
        num2 = temp;
    }
    else {
        num1 = temp;
    }
})

//Number buttons, calls numbers function
numBtns.forEach(btn => {
    btn.addEventListener('click', (e) => numbers(e))
})

//Operations buttons and evaluation logic
opsBtns.forEach(btn => btn.addEventListener('click', function(e) {
    if(e.target.innerText == '=') {
        total = operate(operatorSign, num1, num2)
        if(total > 9999999) {
            
            total = total.toExponential(2);
        }
        resultDisp.innerText = total;
        wasEval = true;
    }
    //If equation was evaluated, this keeps the total saved so you can keep using it
    else if(wasEval == true) {
        operatorSign =  e.target.innerText;
        resultDisp.innerText = operatorSign;
        num1 = total;
        num2 = '';
        wasEval = false;operatorSign =  e.target.innerText;
        resultDisp.innerText = operatorSign
    }
    else {
        if(!num1) {
            num1 = 0;
        }
        operatorSign =  e.target.innerText;
        resultDisp.innerText = operatorSign;
    }
}))