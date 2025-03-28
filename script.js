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

function displayKey(key) {
  console.log(key);  
  display.textContent += key;
  displayedKeys += key;
};

function displayResult() {
  const displayedNumbers = displayedKeys.split(/[-+/x]/);
  const firstOperator = displayedKeys.match(/[-/+x]/)[0];
  const num1 = Number(displayedNumbers[0]);
  const num2 = +displayedNumbers[1];
  
  displayedKeys = operate(num1, firstOperator, num2)
  display.textContent = displayedKeys;
}
