// @ts-nocheck
// Generated from tools/converter/binary-translator.html
// Source SHA-256: 699098bd0f850e868df724c6283ae0d73e81b20cf7618fcbaac6fdb9bab25b0c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputs = {
        text: document.getElementById("textInput"),
        binary: document.getElementById("binaryInput"),
        decimal: document.getElementById("decimalInput"),
        hex: document.getElementById("hexInput"),
        octal: document.getElementById("octalInput")
      };
      let isConverting = false;

      function textToNumbers(text) {
        const chars = [];
        for (let i = 0; i < text.length; i++) chars.push(text.charCodeAt(i));
        return chars;
      }

      function numbersToText(numbers) {
        return numbers.map((n) => String.fromCharCode(n)).join("");
      }

      function updateAllFromText(text) {
        const numbers = textToNumbers(text);
        inputs.binary.value = numbers.map((n) => n.toString(2).padStart(8, "0")).join(" ");
        inputs.decimal.value = numbers.join(" ");
        inputs.hex.value = numbers
          .map((n) => n.toString(16).toUpperCase().padStart(2, "0"))
          .join(" ");
        inputs.octal.value = numbers.map((n) => n.toString(8).padStart(3, "0")).join(" ");
        updateCharDisplay(text);
      }

      function updateAllFromNumbers(numbers, sourceInput) {
        const text = numbersToText(numbers);
        if (sourceInput !== "text") inputs.text.value = text;
        if (sourceInput !== "binary")
          inputs.binary.value = numbers.map((n) => n.toString(2).padStart(8, "0")).join(" ");
        if (sourceInput !== "decimal") inputs.decimal.value = numbers.join(" ");
        if (sourceInput !== "hex")
          inputs.hex.value = numbers
            .map((n) => n.toString(16).toUpperCase().padStart(2, "0"))
            .join(" ");
        if (sourceInput !== "octal")
          inputs.octal.value = numbers.map((n) => n.toString(8).padStart(3, "0")).join(" ");
        updateCharDisplay(text);
      }

      function parseInput(value, base) {
        const parts = value.trim().split(/\s+/);
        const numbers = [];
        for (const part of parts) {
          if (!part) continue;
          const num = parseInt(part, base);
          if (!isNaN(num) && num >= 0 && num <= 0x10ffff) numbers.push(num);
        }
        return numbers;
      }

      function updateCharDisplay(text) {
        const display = document.getElementById("charDisplay");
        display.innerHTML = "";
        for (let i = 0; i < text.length && i < 50; i++) {
          const char = text[i];
          const code = text.charCodeAt(i);
          const item = document.createElement("span");
          item.className = "char-item";
          let displayChar = char;
          if (code < 32 || code === 127) displayChar = "·";
          item.textContent = `'${displayChar}' = ${code}`;
          display.appendChild(item);
        }
        if (text.length > 50) {
          const more = document.createElement("span");
          more.className = "char-item";
          more.textContent = `... +${text.length - 50}`;
          display.appendChild(more);
        }
      }

      function handleInput(sourceType) {
        if (isConverting) return;
        isConverting = true;
        try {
          const value = inputs[sourceType].value;
          if (sourceType === "text") {
            updateAllFromText(value);
          } else {
            let base;
            switch (sourceType) {
              case "binary":
                base = 2;
                break;
              case "decimal":
                base = 10;
                break;
              case "hex":
                base = 16;
                break;
              case "octal":
                base = 8;
                break;
            }
            const numbers = parseInput(value, base);
            updateAllFromNumbers(numbers, sourceType);
          }
        } finally {
          isConverting = false;
        }
      }

      window.clearAll = function () {
        Object.values(inputs).forEach((input) => (input.value = ""));
        document.getElementById("charDisplay").innerHTML = "";
      };

      window.loadSample = function () {
        inputs.text.value = "Hello, World!";
        handleInput("text");
      };

      window.copyValue = function (inputId) {
        const input = document.getElementById(inputId);
        navigator.clipboard.writeText(input.value).then(() => {
          const btn = input.parentElement.querySelector(".copy-btn");
          const originalText = btn.textContent;
          btn.textContent = "已复制";
          setTimeout(() => (btn.textContent = originalText), 1500);
        });
      };

      inputs.text.addEventListener("input", () => handleInput("text"));
      inputs.binary.addEventListener("input", () => handleInput("binary"));
      inputs.decimal.addEventListener("input", () => handleInput("decimal"));
      inputs.hex.addEventListener("input", () => handleInput("hex"));
      inputs.octal.addEventListener("input", () => handleInput("octal"));
    
