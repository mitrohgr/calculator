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

let firstNumber = 5;
let operator = "+"
let secondNumber = 13;

console.log(operate(firstNumber, operator, secondNumber));

let displayValue;

const displayContainer = document.querySelector(".display-container");

const numberButtons = document.querySelectorAll(".num");

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", function (e) {
    populateDisplay(e);
  });
});

function populateDisplay(e) {
  displayContainer.textContent = e.target.textContent;
  displayValue = displayContainer.textContent;
}
