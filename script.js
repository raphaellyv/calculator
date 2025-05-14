function add(a, b) {
  return a + b;
};

function subtract(a, b) {
  return a - b;
}
;
function multiply(a, b) {
  return a * b;
};

function divide(a, b) {
  return a / b;
};

function operate(num1, operator, num2) {
  switch (operator) {
    case "+": return add(num1, num2);
    case "-": return subtract(num1, num2);
    case "x": return multiply(num1, num2);
    case "/": return divide(num1, num2);
  }
}

const display = document.querySelector("#display");
let displayedKeys = '';
let currentOperator = '';

function displayKey(key) {
  console.log(key);

  display.textContent += key;
  displayedKeys += key;
};

function displayOperator(op) {
  if (currentOperator === '' ) {
    currentOperator = op;
  } else if ('-+/x'.includes(displayedKeys.slice(-1))) {
    currentOperator = op;
    displayedKeys = displayedKeys.slice(0, -1);
    display.textContent = displayedKeys;
  } else {
    displayResult();
    currentOperator = op;
  };

  displayKey(op);
}

function displayResult() {
  const displayedNumbers = displayedKeys.split(/[-+/x]/);
  const num1 = +displayedNumbers[0];
  const num2 = +displayedNumbers[1];
  
  if (currentOperator === '/' && num2 === 0) {
    displayedKeys = 'Not gonna work';
    currentOperator = '';
    display.textContent = displayedKeys;
  } else if (currentOperator !== '' && num1 && num2 ) {
    displayedKeys = operate(num1, currentOperator, num2)
    display.textContent = displayedKeys;
    currentOperator = '';
  }
}

function clearDisplay() {
  displayedKeys = '';
  currentOperator = '';
  display.textContent = displayedKeys;
}

