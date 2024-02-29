// Math operation functions
function add(n1, n2) {
  return +n1 + +n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function mulitply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  if (n2 == 0) {
    return Error("Error: Division by 0");
  } else {
    return n1 / n2;
  }
}

// Turns the background on for the current math operator
function turnBackgroundOn(op) {
  if (op == "=") {
    document.querySelector('button[value="="]').style.backgroundColor =
      "lightgreen";
  } else if (addOp) {
    document.querySelector('button[value="+"]').style.backgroundColor = "red";
  } else if (subtractOp) {
    document.querySelector('button[value="-"]').style.backgroundColor = "red";
  } else if (mulitplyOp) {
    document.querySelector('button[value="*"]').style.backgroundColor = "red";
  } else if (divideOp) {
    document.querySelector('button[value="/"]').style.backgroundColor = "red";
  }
}

// Turns background of opperators off
function turnBackgroundOff() {
  if (addOp) {
    document.querySelector('button[value="+"]').style.backgroundColor = null;
  }
  if (subtractOp) {
    document.querySelector('button[value="-"]').style.backgroundColor = null;
  }
  if (mulitplyOp) {
    document.querySelector('button[value="*"]').style.backgroundColor = null;
  }
  if (divideOp) {
    document.querySelector('button[value="/"]').style.backgroundColor = null;
  }
  if (!equalClicked) {
    document.querySelector('button[value="="]').style.backgroundColor = null;
  }
}

// Turns all the backgrounds off
function turnBackgroundOffAll() {
  document.querySelector('button[value="+"]').style.backgroundColor = null;
  document.querySelector('button[value="-"]').style.backgroundColor = null;
  document.querySelector('button[value="*"]').style.backgroundColor = null;
  document.querySelector('button[value="/"]').style.backgroundColor = null;
  document.querySelector('button[value="="]').style.backgroundColor = null;
}

// Sets the booleans for the math operators
function setMathOp(op) {
  if (op == "+") {
    addOp = true;
    subtractOp = false;
    mulitplyOp = false;
    divideOp = false;
  } else if (op == "-") {
    subtractOp = true;
    addOp = false;
    mulitplyOp = false;
    divideOp = false;
  } else if (op == "*") {
    mulitplyOp = true;
    addOp = false;
    subtractOp = false;
    divideOp = false;
  } else if (op == "/") {
    divideOp = true;
    addOp = false;
    subtractOp = false;
    mulitplyOp = false;
  } else if (op == "off") {
    addOp = false;
    subtractOp = false;
    mulitplyOp = false;
    divideOp = false;
  }
}

// numbers to operate
let num1 = null;
let num2 = null;

// Operation booleans
let addOp = false;
let subtractOp = false;
let mulitplyOp = false;
let divideOp = false;

// Evaluates the numbers based on the operator picked
function evaluate(n1, n2) {
  if (addOp) {
    addOp = false;
    num1 = add(n1, n2);
    num2 = null;
    return num1;
  } else if (subtractOp) {
    subtractOp = false;
    num1 = subtract(n1, n2);
    num2 = null;
    return num1;
  } else if (mulitplyOp) {
    mulitplyOp = false;
    num1 = mulitply(n1, n2);
    num2 = null;
    return num1;
  } else if (divideOp) {
    divideOp = false;
    num1 = divide(n1, n2);
    num2 = null;
    return num1;
  }
}

// boolean that shows if an operation or number has been clicked
let operationClicked = false;
let numberClicked = false;
let equalClicked = false;

// Starting equation
let equation = "";

// Input tag
const display = document.querySelector("#display input");

// Shows the number in the display
const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    numberClicked = true;
    if (operationClicked) {
      // Will clear the display of the orignal number after an operation has been clicked
      display.value = "";
      // sets operationClicked to false so the new number can be displayed
      operationClicked = false;

      // When a number gets clicked for num2, it will turnoff the background for the operator
      if (num1) {
        equalClicked = false;
        turnBackgroundOff();
      }
    }

    // Updates the current display with the numbers clicked
    console.log("Number Clicked: " + number.value);
    display.value += number.value;
  });
});

// Clears the display when you click the clear button
const clear = document.querySelector("#editRow #clear");
clear.addEventListener("click", () => {
  // Clears the display of the current number
  display.value = "";
  // Clears equation to start fresh
  equation = "";
  num1 = null;
  num2 = null;

  //   Sets the other functionalities to false
  operationClicked = false;
  numberClicked = false;
  equalClicked = false;

  //   Turns off any math op
  setMathOp("off");
  turnBackgroundOffAll();
});

// Deletes the previous number in the input
const deleteNum = document.querySelector("#editRow #delete");
deleteNum.addEventListener("click", () => {
  console.log("Delete");
  display.value = display.value.slice(0, -1);
});

// Math Operators
const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (numberClicked || num1 != null) {
      numberClicked = false;

      //   First time clicking an operator
      if (!operationClicked) {
        operationClicked = true;

        // Sets the operator background to red
        operator.style.backgroundColor = "red";

        if (num1 == null) {
          num1 = display.value;
          equation =+ num1
        } else if (equalClicked) {
          // Have to set num2 = null if equalClicked because it will assign the result when pressing the equal sign to num2
          num2 = null;
          equalClicked = false;
          //   Turns off the background for equal
          turnBackgroundOff();
        } else {
          num2 = display.value;
          equation += num2
          display.value = evaluate(num1, num2);
        }

        // Debugging
        console.log("Num1: " + num1);
        console.log("Num2: " + num2);

        // Sets the booleans for the operation that is going to be performed to true and the rest to false
        if (operationClicked) {
          setMathOp(operator.value);
          equation += operator.value;
        }
      }
      //   Already clicked an operator and decided to pick a different operator
      else {
        setMathOp(operator.value);

        // Appends the current number on the display plus the operation going to be performed to the equation string
        equation += display.value + operator.value;

        // Sets the background for the clicked operator
        turnBackgroundOffAll();
        turnBackgroundOn(operator.value);
      }
    }
  });
});

// Equal button
const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
  //   Takes the last number to be inputed and adds it to the equation that needs to be solved
  equation += display.value;
  console.log(`Equation to evaluation: ${equation}`);

  //   Turns the backgronds of the operators off and the booleans to false
  equalClicked = true;
  turnBackgroundOn("=");
  turnBackgroundOff();

  numberClicked = false;
  operationClicked = false;

  // num2 is the number in the curernt display value
  num2 = display.value;

  // Updates display with result
  display.value = evaluate(num1, num2);
  setMathOp("off");

  // Resets equation string
  equation = "";
});
