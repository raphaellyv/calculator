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
let equalButtonWasPressed = false;

function displayKey(key) {
  if (equalButtonWasPressed) {
    displayedKeys = '';
    display.textContent = displayedKeys;
    equalButtonWasPressed = false;
  }

  display.textContent += key;
  displayedKeys += key;
};

function displayPoint() {
  if (!displayedKeys.includes('.')
    || (currentOperator !== '' && displayedKeys.split('.').length < 3)) {
    displayKey('.');
  }
}

function displayOperator(op) {
  if (displayedKeys.length === 0) {
    displayedKeys += 0;
    display.textContent = displayedKeys;
  }

  const operator = op === '*' ? 'x' : op;
  if (currentOperator === '' ) {
    currentOperator = operator;
  } else if ('-+/x'.includes(displayedKeys.slice(-1))) {
    currentOperator = operator;
    displayedKeys = displayedKeys.slice(0, -1);
    display.textContent = displayedKeys;
  } else {
    displayResult();
    currentOperator = operator;
  };

  equalButtonWasPressed = false
  displayKey(operator);
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
    displayedKeys = operate(num1, currentOperator, num2).toString();
    display.textContent = displayedKeys;
    currentOperator = '';
  }
}

function isEqualTo() {
  equalButtonWasPressed = true;
  displayResult()
}

function clearDisplay() {
  displayedKeys = '';
  currentOperator = '';
  display.textContent = displayedKeys;
}

function eraseLastKey() {
  if (equalButtonWasPressed) {
    clearDisplay();
  } else {
    displayedKeys = displayedKeys.slice(0,-1);
    display.textContent = displayedKeys;
  }
}

document.addEventListener('keydown', (e) => {
  const key = e.key.toString();

  switch (true) {
    case /[0-9]/.test(key):
      displayKey(key);
      break;
    case /[-+/*]/.test(key):
      displayOperator(key);
      break;
    case /[.]/.test(key):
      displayPoint();
      break;
    case /\bEnter\b/.test(key):
      isEqualTo();
      break;
    case /\bBackspace\b/.test(key):
      eraseLastKey();
      break;
    default:
      console.log(key);
  }
})
