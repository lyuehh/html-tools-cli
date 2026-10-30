// @ts-nocheck
// Generated from tools/calculator/base-calculator.html
// Source SHA-256: d320e820ad0fae675cc396601c794891d0442f0b979b90537875c8d7675d44c4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentValue = 0n;
      const MAX_BITS = 32;

      function updateAll(value, sourceId) {
        currentValue = value;
        if (sourceId !== "dec") document.getElementById("dec").value = value.toString(10);
        if (sourceId !== "bin") document.getElementById("bin").value = value.toString(2);
        if (sourceId !== "oct") document.getElementById("oct").value = value.toString(8);
        if (sourceId !== "hex")
          document.getElementById("hex").value = value.toString(16).toUpperCase();
        updateBitDisplay();
      }

      function updateBitDisplay() {
        const display = document.getElementById("bitDisplay");
        const labels = document.getElementById("bitLabels");
        const binStr = currentValue.toString(2).padStart(MAX_BITS, "0").slice(-MAX_BITS);

        let html = "";
        let labelHtml = "";
        for (let i = 0; i < MAX_BITS; i++) {
          if (i > 0 && i % 4 === 0) html += '</div><div class="bit-group">';
          if (i === 0) html += '<div class="bit-group">';
          const bit = binStr[i];
          const pos = MAX_BITS - 1 - i;
          html += `<div class="bit ${bit === "1" ? "one" : ""}" data-pos="${pos}">${bit}</div>`;
        }
        html += "</div>";
        display.innerHTML = html;

        // Add click handlers
        display.querySelectorAll(".bit").forEach((bit) => {
          bit.onclick = () => {
            const pos = parseInt(bit.dataset.pos);
            currentValue ^= 1n << BigInt(pos);
            updateAll(currentValue, null);
          };
        });

        // Labels for bit positions
        labelHtml = "";
        for (let i = MAX_BITS - 1; i >= 0; i--) {
          labelHtml += `<span class="bit-label">${i}</span>`;
        }
        labels.innerHTML = labelHtml;
      }

      function parseInput(value, base) {
        value = value.trim().toLowerCase();
        if (!value) return 0n;
        try {
          // Remove common prefixes
          if (base === 2) value = value.replace(/^0b/, "");
          if (base === 8) value = value.replace(/^0o/, "");
          if (base === 16) value = value.replace(/^0x/, "");
          return BigInt(parseInt(value, base));
        } catch {
          return 0n;
        }
      }

      // Input handlers
      ["dec", "bin", "oct", "hex"].forEach((id) => {
        const input = document.getElementById(id);
        const base = parseInt(input.dataset.base);
        input.addEventListener("input", () => {
          const value = parseInput(input.value, base);
          updateAll(value, id);
        });
      });

      // Preset buttons
      document.querySelectorAll(".preset-btn").forEach((btn) => {
        btn.onclick = () => {
          const val = BigInt(btn.dataset.val);
          updateAll(val, null);
        };
      });

      // Calculator
      window.calculate = function () {
        const a = parseInput(document.getElementById("calcA").value, 10);
        const b = parseInput(document.getElementById("calcB").value, 10);
        const op = document.getElementById("calcOp").value;
        let result = 0n;

        switch (op) {
          case "add":
            result = a + b;
            break;
          case "sub":
            result = a - b;
            break;
          case "mul":
            result = a * b;
            break;
          case "div":
            result = b !== 0n ? a / b : 0n;
            break;
          case "mod":
            result = b !== 0n ? a % b : 0n;
            break;
          case "and":
            result = a & b;
            break;
          case "or":
            result = a | b;
            break;
          case "xor":
            result = a ^ b;
            break;
          case "shl":
            result = a << b;
            break;
          case "shr":
            result = a >> b;
            break;
        }

        document.getElementById("calcResult").value = result.toString();
        document.getElementById("calcResultAll").innerHTML =
          `DEC: ${result.toString(10)} | BIN: ${result.toString(2)} | OCT: ${result.toString(8)} | HEX: ${result.toString(16).toUpperCase()}`;
      };

      ["calcA", "calcB", "calcOp"].forEach((id) => {
        document.getElementById(id).addEventListener("input", calculate);
        document.getElementById(id).addEventListener("change", calculate);
      });

      window.copyValue = function (id) {
        const value = document.getElementById(id).value;
        navigator.clipboard.writeText(value);
      };

      // Theme toggle
      const theme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", theme);
      document.getElementById("themeToggle").textContent = theme === "dark" ? "☀️" : "🌙";
      document.getElementById("themeToggle").onclick = () => {
        const next =
          document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        document.getElementById("themeToggle").textContent = next === "dark" ? "☀️" : "🌙";
      };

      // Initialize
      updateAll(255n, null);
      calculate();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
