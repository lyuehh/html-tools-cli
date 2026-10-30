// @ts-nocheck
// Generated from tools/calculator/scientific.html
// Source SHA-256: 94beab09d21cee11b59f895b194e9e26d4528b87609f98e579b1c6a33edac952
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentValue = "0";
      let previousValue = "";
      let operator = "";
      let waitingForOperand = false;
      let memory = 0;
      let history = JSON.parse(localStorage.getItem("scientific_calc_history") || "[]");
      let lastExpression = "";

      const display = document.getElementById("display");
      const historyDisplay = document.getElementById("historyDisplay");
      const memoryIndicator = document.getElementById("memoryIndicator");
      const historyList = document.getElementById("historyList");

      function updateDisplay() {
        display.textContent = currentValue;
        historyDisplay.textContent = lastExpression;
        memoryIndicator.textContent = memory !== 0 ? "M" : "";
      }

      window.inputDigit = function (digit) {
        if (waitingForOperand) {
          currentValue = digit;
          waitingForOperand = false;
        } else {
          currentValue = currentValue === "0" ? digit : currentValue + digit;
        }
        updateDisplay();
      };

      window.inputDecimal = function () {
        if (waitingForOperand) {
          currentValue = "0.";
          waitingForOperand = false;
        } else if (!currentValue.includes(".")) {
          currentValue += ".";
        }
        updateDisplay();
      };

      window.inputOperator = function (op) {
        const inputValue = parseFloat(currentValue);

        if (previousValue !== "" && !waitingForOperand) {
          const result = performCalculation();
          currentValue = String(result);
          previousValue = result;
        } else {
          previousValue = inputValue;
        }

        operator = op;
        waitingForOperand = true;
        lastExpression = previousValue + " " + getOperatorSymbol(op);
        updateDisplay();
      };

      function getOperatorSymbol(op) {
        const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷", "^": "^", "%": "%" };
        return symbols[op] || op;
      }

      function performCalculation() {
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);

        switch (operator) {
          case "+":
            return prev + current;
          case "-":
            return prev - current;
          case "*":
            return prev * current;
          case "/":
            return current !== 0 ? prev / current : "Error";
          case "^":
            return Math.pow(prev, current);
          case "%":
            return prev % current;
          default:
            return current;
        }
      }

      window.calculate = function () {
        if (operator === "" || waitingForOperand) return;

        const expression = previousValue + " " + getOperatorSymbol(operator) + " " + currentValue;
        const result = performCalculation();

        if (result === "Error") {
          currentValue = "Error";
        } else {
          addToHistory(expression, result);
          currentValue = formatNumber(result);
        }

        lastExpression = expression + " =";
        previousValue = "";
        operator = "";
        waitingForOperand = true;
        updateDisplay();
      };

      function formatNumber(num) {
        if (typeof num !== "number" || isNaN(num)) return "Error";
        if (!isFinite(num)) return "Error";

        if (Math.abs(num) < 1e-10 && num !== 0) {
          return num.toExponential(6);
        }
        if (Math.abs(num) >= 1e10) {
          return num.toExponential(6);
        }

        const rounded = Math.round(num * 1e10) / 1e10;
        return String(rounded);
      }

      window.inputFunction = function (func) {
        const value = parseFloat(currentValue);
        let result;

        switch (func) {
          case "sin":
            result = Math.sin((value * Math.PI) / 180);
            lastExpression = "sin(" + value + "°)";
            break;
          case "cos":
            result = Math.cos((value * Math.PI) / 180);
            lastExpression = "cos(" + value + "°)";
            break;
          case "tan":
            result = Math.tan((value * Math.PI) / 180);
            lastExpression = "tan(" + value + "°)";
            break;
          case "asin":
            result = (Math.asin(value) * 180) / Math.PI;
            lastExpression = "asin(" + value + ")";
            break;
          case "acos":
            result = (Math.acos(value) * 180) / Math.PI;
            lastExpression = "acos(" + value + ")";
            break;
          case "atan":
            result = (Math.atan(value) * 180) / Math.PI;
            lastExpression = "atan(" + value + ")";
            break;
          case "log":
            result = Math.log10(value);
            lastExpression = "log(" + value + ")";
            break;
          case "ln":
            result = Math.log(value);
            lastExpression = "ln(" + value + ")";
            break;
          case "sqrt":
            result = Math.sqrt(value);
            lastExpression = "√(" + value + ")";
            break;
          case "cbrt":
            result = Math.cbrt(value);
            lastExpression = "∛(" + value + ")";
            break;
          case "square":
            result = value * value;
            lastExpression = value + "²";
            break;
          case "cube":
            result = value * value * value;
            lastExpression = value + "³";
            break;
          case "inverse":
            result = 1 / value;
            lastExpression = "1/" + value;
            break;
          case "abs":
            result = Math.abs(value);
            lastExpression = "|" + value + "|";
            break;
          case "fact":
            result = factorial(Math.floor(value));
            lastExpression = Math.floor(value) + "!";
            break;
          default:
            return;
        }

        addToHistory(lastExpression, result);
        currentValue = formatNumber(result);
        waitingForOperand = true;
        updateDisplay();
      };

      window.factorial = function (n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        if (n > 170) return Infinity;
        let result = 1;
        for (let i = 2; i <= n; i++) {
          result *= i;
        }
        return result;
      };

      window.inputConstant = function (constant) {
        switch (constant) {
          case "pi":
            currentValue = String(Math.PI);
            lastExpression = "π";
            break;
          case "e":
            currentValue = String(Math.E);
            lastExpression = "e";
            break;
        }
        waitingForOperand = true;
        updateDisplay();
      };

      window.toggleSign = function () {
        currentValue = String(-parseFloat(currentValue));
        updateDisplay();
      };

      window.clearAll = function () {
        currentValue = "0";
        previousValue = "";
        operator = "";
        waitingForOperand = false;
        lastExpression = "";
        updateDisplay();
      };

      window.clearEntry = function () {
        currentValue = "0";
        updateDisplay();
      };

      window.backspace = function () {
        if (waitingForOperand) return;
        currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
        updateDisplay();
      };

      window.clearMemory = function () {
        memory = 0;
        updateDisplay();
      };

      window.recallMemory = function () {
        currentValue = String(memory);
        waitingForOperand = true;
        updateDisplay();
      };

      window.addToMemory = function () {
        memory += parseFloat(currentValue);
        waitingForOperand = true;
        updateDisplay();
      };

      window.subtractFromMemory = function () {
        memory -= parseFloat(currentValue);
        waitingForOperand = true;
        updateDisplay();
      };

      window.storeMemory = function () {
        memory = parseFloat(currentValue);
        waitingForOperand = true;
        updateDisplay();
      };

      function addToHistory(expression, result) {
        history.unshift({ expression: expression, result: formatNumber(result) });
        if (history.length > 50) history.pop();
        localStorage.setItem("scientific_calc_history", JSON.stringify(history));
        renderHistory();
      }

      function renderHistory() {
        historyList.textContent = "";
        history.forEach(function (item, index) {
          const li = document.createElement("li");
          li.textContent = item.expression + " = " + item.result;
          li.onclick = function () {
            loadFromHistory(index);
          };
          historyList.appendChild(li);
        });
      }

      function loadFromHistory(index) {
        currentValue = history[index].result;
        waitingForOperand = true;
        updateDisplay();
      }

      window.clearHistory = function () {
        history = [];
        localStorage.removeItem("scientific_calc_history");
        renderHistory();
      };

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.getElementById("themeBtn");
        if (html.getAttribute("data-theme") === "light") {
          html.setAttribute("data-theme", "dark");
          btn.textContent = "☀️ 浅色";
        } else {
          html.setAttribute("data-theme", "light");
          btn.textContent = "🌙 深色";
        }
      };

      document.addEventListener("keydown", function (e) {
        if (e.key >= "0" && e.key <= "9") inputDigit(e.key);
        else if (e.key === ".") inputDecimal();
        else if (e.key === "+") inputOperator("+");
        else if (e.key === "-") inputOperator("-");
        else if (e.key === "*") inputOperator("*");
        else if (e.key === "/") {
          e.preventDefault();
          inputOperator("/");
        } else if (e.key === "^") inputOperator("^");
        else if (e.key === "%") inputOperator("%");
        else if (e.key === "Enter" || e.key === "=") {
          e.preventDefault();
          calculate();
        } else if (e.key === "Escape") clearAll();
        else if (e.key === "Backspace") backspace();
      });

      updateDisplay();
      renderHistory();
    
