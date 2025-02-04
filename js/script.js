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
  if (isNaN(result) || !isFinite(result)) {
    return NaN;
  }
  if (result.toString().includes(".")) {
    result = result.toFixed(5);
    if (result.toString().length >= 20) {
      return NaN;
    }
  }
  if (result.toString().length >= 12) {
    return NaN;
  }
  return parseFloat(result);
}

function calcBackspace() {
  display.textContent = display.textContent.slice(0, -1);
  currNumber = display.textContent;
  if (currNumber === "") {
    currNumber = "";
    return;
  }
  currNumber = parseFloat(currNumber);
}

function calcDelete() {
  result = 0;
  operator = null;
  currNumber = "";
  prevNumber = null;
  display.textContent = "0";
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
  if (isNaN(result)) {
    display.textContent = "Funny!";
    return;
  } else {
    display.textContent = result;
  }
  prevNumber = result;
  currNumber = "";
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
    if (isNaN(result)) {
      display.textContent = "Funny!";
      return;
    } else {
      display.textContent = result;
    }
    prevNumber = result;
  }
  operator = symbol;
  currNumber = "";
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
    case "Del":
    case "Delete":
      calcDelete();
      break;
    case "Back":
    case "Backspace":
      calcBackspace();
      break;
  }
}

function handleNumberInput(inputValue) {
  number = inputValue;
  if (currNumber.length >= 10) {
    return;
  }
  switch (number) {
    case ".":
      if (display.textContent.includes(".")) {
        return;
      } else if (currNumber.length === 0) {
        currNumber = "0.";
      } else {
        currNumber += ".";
      }
      break;
    default:
      currNumber += number;
  }
  display.textContent = currNumber;
}

function handleEvent(e) {
  let inputValue;
  if (e.type === "click") {
    inputValue = e.target.textContent;
  } else if (e.type === "keydown") {
    inputValue = e.key;
  }
  if (inputValue === ".") {
    handleNumberInput(inputValue);
  } else if (isNaN(inputValue)) {
    handleSymbolInput(inputValue);
  } else {
    handleNumberInput(inputValue);
  }
}

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

document.addEventListener("keydown", handleEvent);
