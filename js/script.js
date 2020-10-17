var Numbers = document.querySelectorAll(".number"),
  Operations = document.querySelectorAll(".operation"),
  DecimalBtn = document.getElementById("decimal"),
  ClearBtns = document.querySelectorAll(".clearBtn"),
  display = document.getElementById("display"),
  minus = document.getElementById("minus"),
  MemoryCurrentNumber = 0,
  MemoryNewNumber = false,
  MemoryPendingOperation = "",
  operationsList = document.getElementById("operationsList");

for (var i = 0; i < Numbers.length; i++) {
  var number = Numbers[i];
  number.addEventListener("click", function (e) {
    numberPress(e.target.value);
    console.log("click po chislu " + e.target.value);
  });
}

for (var i = 0; i < Operations.length; i++) {
  var operationBtn = Operations[i];
  operationBtn.addEventListener("click", function (e) {
    operation(e.target.value);
    console.log("click po operatoru " + e.target.value);
  });
}

for (var i = 0; i < ClearBtns.length; i++) {
  var clearBtn = ClearBtns[i];
  clearBtn.addEventListener("click", function (e) {
    clear(e.srcElement.id);
  });
}

DecimalBtn.addEventListener("click", decimal);

function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === "0") {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operation(op) {
  var localOperationMemory = +display.value;
  if (MemoryNewNumber && MemoryPendingOperation !== "=") {
    display.value = +MemoryCurrentNumber.toFixed(10);
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === "+") {
      MemoryCurrentNumber += parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === "-") {
      MemoryCurrentNumber -= parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === "*") {
      MemoryCurrentNumber *= parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === "/") {
      MemoryCurrentNumber /= parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === "^") {
      MemoryCurrentNumber = Math.pow(
        MemoryCurrentNumber,
        parseFloat(localOperationMemory)
      );
    } else {
      MemoryCurrentNumber = parseFloat(localOperationMemory);
    }
    display.value = +MemoryCurrentNumber.toFixed(10);
    MemoryPendingOperation = op;
  }
}

function clear(id) {
  if (id === "ce") {
    display.value = "0";
    MemoryNewNumber = true;
  } else if (id === "c") {
    display.value = "0";
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = "";
  }
}

function decimal() {
  var localDecimalMemory = display.value;
  if (MemoryNewNumber) {
    localDecimalMemory = "0.";
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf(".") === -1) {
      localDecimalMemory += ".";
    }
  }
  display.value = localDecimalMemory;
}

function minusPlus() {
  var localMinusMemory = document.form.textview.value;
  localMinusMemory = parseFloat(localMinusMemory) * -1;
  document.form.textview.value = localMinusMemory;
  console.log(localMinusMemory);
}

function back() {
  var exp = document.form.textview.value;
  document.form.textview.value = exp.substring(0, exp.length - 1);
}

function sqroot() {
  var sr = document.form.textview.value;
  if (sr > 0) {
    document.form.textview.value = Math.sqrt(+sr);
  } else if (sr < 0) {
    document.form.textview.value = "ERROR!ONLY N MUST >0";
  }
}
