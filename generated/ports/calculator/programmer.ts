// @ts-nocheck
// Generated from tools/calculator/programmer.html
// Source SHA-256: c6fe3941ac1d98b6e82882d148d6a816637dcfdc534079aa74328dc76b82a4a3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentValue = 0n;
      let previousValue = 0n;
      let operator = "";
      let waitingForOperand = true;
      let currentBase = 10;
      let bitSize = 32;
      let inputString = "";

      const display = document.getElementById("display");
      const hexValue = document.getElementById("hexValue");
      const decValue = document.getElementById("decValue");
      const octValue = document.getElementById("octValue");
      const binValue = document.getElementById("binValue");
      const bitDisplay = document.getElementById("bitDisplay");
      const bitSizeLabel = document.getElementById("bitSize");

      const maxValues = {
        8: 0xffn,
        16: 0xffffn,
        32: 0xffffffffn,
        64: 0xffffffffffffffffn
      };

      function getMask() {
        return maxValues[bitSize];
      }

      function toSigned(value) {
        const mask = getMask();
        value = value & mask;
        const signBit = 1n << BigInt(bitSize - 1);
        if (value & signBit) {
          return value - (mask + 1n);
        }
        return value;
      }

      function toUnsigned(value) {
        const mask = getMask();
        if (value < 0n) {
          return (mask + 1n + value) & mask;
        }
        return value & mask;
      }

      function updateDisplay() {
        const unsigned = toUnsigned(currentValue);
        const signed = toSigned(currentValue);

        display.textContent = inputString || formatValue(unsigned, currentBase);

        hexValue.textContent = unsigned.toString(16).toUpperCase();
        decValue.textContent = signed.toString(10);
        octValue.textContent = unsigned.toString(8);
        binValue.textContent = unsigned.toString(2);

        document
          .querySelectorAll(".base-display .value")
          .forEach((el) => el.classList.remove("active"));
        if (currentBase === 16) hexValue.classList.add("active");
        else if (currentBase === 10) decValue.classList.add("active");
        else if (currentBase === 8) octValue.classList.add("active");
        else if (currentBase === 2) binValue.classList.add("active");

        updateBitDisplay(unsigned);
        updateButtonStates();
      }

      function formatValue(value, base) {
        const str = value.toString(base).toUpperCase();
        return str;
      }

      function updateBitDisplay(value) {
        bitSizeLabel.textContent = "(" + bitSize + "位)";
        bitDisplay.textContent = "";

        for (let i = bitSize - 1; i >= 0; i--) {
          if (i < bitSize - 1 && (i + 1) % 4 === 0) {
            const spacer = document.createElement("span");
            spacer.style.width = "0.5rem";
            bitDisplay.appendChild(spacer);
          }

          const bit = document.createElement("span");
          bit.className = "bit" + ((value >> BigInt(i)) & 1n ? " one" : "");
          bit.textContent = (value >> BigInt(i)) & 1n ? "1" : "0";
          bit.onclick = function () {
            toggleBit(i);
          };
          bit.title = "位 " + i;
          bitDisplay.appendChild(bit);
        }
      }

      function toggleBit(index) {
        currentValue = toUnsigned(currentValue) ^ (1n << BigInt(index));
        inputString = "";
        updateDisplay();
      }

      function updateButtonStates() {
        const hexDigits = ["A", "B", "C", "D", "E", "F"];
        const allDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ...hexDigits];

        allDigits.forEach((d) => {
          const btn = document.getElementById("btn" + d);
          if (btn) {
            const digitVal = parseInt(d, 16);
            btn.disabled = digitVal >= currentBase;
          }
        });
      }

      window.setBase = function (base) {
        currentBase = base;
        document.querySelectorAll('input[name="base"]').forEach((r) => {
          r.checked = parseInt(r.value) === base;
        });
        inputString = "";
        updateDisplay();
      };

      window.setSize = function (size) {
        bitSize = size;
        document.querySelectorAll('input[name="size"]').forEach((r) => {
          r.checked = parseInt(r.value) === size;
        });
        currentValue = toUnsigned(currentValue);
        inputString = "";
        updateDisplay();
      };

      window.inputDigit = function (digit) {
        if (waitingForOperand) {
          inputString = digit;
          waitingForOperand = false;
        } else {
          inputString += digit;
        }

        try {
          currentValue = BigInt(parseInt(inputString, currentBase));
        } catch (e) {
          currentValue = 0n;
        }

        updateDisplay();
      };

      window.inputDecimal = function () {
        // Programmer calculator typically doesn't use decimals
        // But we'll allow it for decimal mode
        if (currentBase === 10 && !inputString.includes(".")) {
          if (waitingForOperand) {
            inputString = "0.";
            waitingForOperand = false;
          } else {
            inputString += ".";
          }
          display.textContent = inputString;
        }
      };

      window.inputOperator = function (op) {
        previousValue = toUnsigned(currentValue);
        operator = op;
        waitingForOperand = true;
        inputString = "";
      };

      window.bitwiseOp = function (op) {
        previousValue = toUnsigned(currentValue);
        operator = op;
        waitingForOperand = true;
        inputString = "";
      };

      window.shiftOp = function (op) {
        previousValue = toUnsigned(currentValue);
        operator = op;
        waitingForOperand = true;
        inputString = "";
      };

      window.bitwiseNot = function () {
        currentValue = ~toUnsigned(currentValue) & getMask();
        inputString = "";
        updateDisplay();
      };

      window.calculate = function () {
        if (operator === "" || waitingForOperand) return;

        const a = previousValue;
        const b = toUnsigned(currentValue);
        let result;

        switch (operator) {
          case "+":
            result = a + b;
            break;
          case "-":
            result = a - b;
            break;
          case "*":
            result = a * b;
            break;
          case "/":
            result = b !== 0n ? a / b : 0n;
            break;
          case "%":
            result = b !== 0n ? a % b : 0n;
            break;
          case "AND":
            result = a & b;
            break;
          case "OR":
            result = a | b;
            break;
          case "XOR":
            result = a ^ b;
            break;
          case "NAND":
            result = ~(a & b);
            break;
          case "<<":
            result = a << b;
            break;
          case ">>":
            result = a >> b;
            break;
          default:
            result = b;
        }

        currentValue = result & getMask();
        previousValue = 0n;
        operator = "";
        waitingForOperand = true;
        inputString = "";
        updateDisplay();
      };

      window.toggleSign = function () {
        currentValue = -toSigned(currentValue);
        inputString = "";
        updateDisplay();
      };

      window.clearAll = function () {
        currentValue = 0n;
        previousValue = 0n;
        operator = "";
        waitingForOperand = true;
        inputString = "";
        updateDisplay();
      };

      window.backspace = function () {
        if (waitingForOperand || inputString.length === 0) return;
        inputString = inputString.slice(0, -1);
        if (inputString.length === 0) {
          currentValue = 0n;
        } else {
          try {
            currentValue = BigInt(parseInt(inputString, currentBase));
          } catch (e) {
            currentValue = 0n;
          }
        }
        updateDisplay();
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
        const key = e.key.toUpperCase();
        if ((key >= "0" && key <= "9") || (key >= "A" && key <= "F")) {
          const digitVal = parseInt(key, 16);
          if (digitVal < currentBase) {
            inputDigit(key);
          }
        } else if (e.key === "+") inputOperator("+");
        else if (e.key === "-") inputOperator("-");
        else if (e.key === "*") inputOperator("*");
        else if (e.key === "/") {
          e.preventDefault();
          inputOperator("/");
        } else if (e.key === "%") inputOperator("%");
        else if (e.key === "Enter" || e.key === "=") {
          e.preventDefault();
          calculate();
        } else if (e.key === "Escape") clearAll();
        else if (e.key === "Backspace") backspace();
      });

      updateDisplay();
    
