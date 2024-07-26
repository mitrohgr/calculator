let symbol;
let inputValue;
let result = 0;
let currNumber = "";
let operator = null;
let prevNumber = null;

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

function handleSymbolInput(inputValue) {
  symbol = inputValue;
  switch (symbol) {
    case "/": case "*":
    case "-": case "+":
      calcWOperator(symbol);
      break;
    case "=":
      calcWEquals();
      break;
    case "AC":
      calcAllClear();
      break;
  }
}

function handleNumberInput(inputValue) {
  currNumber += inputValue;
  currNumber = parseFloat(currNumber);
  display.textContent = currNumber;
}

function calcWOperator(symbol) {
  if (operator === null) {
    if (currNumber === "") {
      return;
    }
    prevNumber = currNumber;
    display.textContent = currNumber;
  } else if (prevNumber !== null) {
    if (currNumber === "") {
      operator = symbol;
      return;
    }
    prevNumber = parseFloat(prevNumber);
    currNumber = parseFloat(currNumber);
    result = operate(prevNumber, operator, currNumber);
    display.textContent = result;
    prevNumber = result;
  }
  operator = symbol;
  currNumber = "";
}

function calcWEquals() {
  if (currNumber === "") {
    if (prevNumber !== null) {
      return;
    }
    return;
  }
  if (operator === null) {
    return;
  }
  prevNumber = parseFloat(prevNumber);
  currNumber = parseFloat(currNumber);
  result = operate(prevNumber, operator, currNumber);
  display.textContent = result;
  prevNumber = result;
  currNumber = "";
}

function calcAllClear() {
  result = 0;
  operator = null;
  currNumber = "";
  prevNumber = null;
  display.textContent = "0";
}

function operate(prevNumber, operator, currNumber) {
  let result;
  switch (operator) {
    case "+":
      result = add(prevNumber, currNumber);
      break;
    case "-":
      result = subtract(prevNumber, currNumber);
      break;
    case "*":
      result = multiply(prevNumber, currNumber);
      break;
    case "/":
      result = divide(prevNumber, currNumber);
      break;
  }
  return result;
}

function add(prevNumber, currNumber) {
  return prevNumber + currNumber;
}

function subtract(prevNumber, currNumber) {
  return prevNumber - currNumber;
}

function multiply(prevNumber, currNumber) {
  return prevNumber * currNumber;
}

function divide(prevNumber, currNumber) {
  return prevNumber / currNumber;
}
