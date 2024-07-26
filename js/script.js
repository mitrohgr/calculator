function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(firstNumber, operator, secondNumber) {
  let result;
  switch (operator) {
    case "+":
      result = add(firstNumber, secondNumber);
      break;
    case "-":
      result = subtract(firstNumber, secondNumber);
      break;
    case "*":
      result = multiply(firstNumber, secondNumber);
      break;
    case "/":
      result = divide(firstNumber, secondNumber);
      break;
    default:
      result = "Invalid operator."
  }
  return result;
}

let symbol;
let inputValue;
let currNumber = "";

const display = document.querySelector(".display");
const buttons = document.querySelectorAll (".btn");

buttons.forEach((button) => { 
  button.addEventListener("click", handleEvent);
});

function handleEvent(e) {
  inputValue = e.target.textContent;
  if (isNaN(inputValue)) {
    handleSymbolInput(inputValue);
  } else {
    handleNumberInput(inputValue);
  }
}

function handleNumberInput(inputValue) {
  currNumber += inputValue;
  currNumber = parseFloat(currNumber);
  display.textContent = currNumber;
}

function handleSymbolInput(inputValue) {
  symbol = inputValue;
  switch (symbol) {
    case "/": case "*":
    case "-": case "+":
      calcWOperator(symbol);
      break;
  }
}
