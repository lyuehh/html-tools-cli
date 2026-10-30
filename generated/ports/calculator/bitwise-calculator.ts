// @ts-nocheck
// Generated from tools/calculator/bitwise-calculator.html
// Source SHA-256: a098dcffa44ffdd50bab17e8d7f7a3a5a3645ce7ce81111c021d1e0564ccfdd9
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // State
      let valueA = 0;
      let valueB = 0;
      let currentOp = "and";
      let formatA = "dec";
      let formatB = "dec";
      let result = null;

      // DOM Elements
      const inputA = document.getElementById("inputA");
      const inputB = document.getElementById("inputB");
      const bitGrid = document.getElementById("bitGrid");
      const bitLabels = document.getElementById("bitLabels");
      const opSelector = document.getElementById("opSelector");
      const shiftInput = document.getElementById("shiftInput");
      const shiftAmount = document.getElementById("shiftAmount");
      const operandBGroup = document.getElementById("operandBGroup");
      const resultsDiv = document.getElementById("results");
      const resultDec = document.getElementById("resultDec");
      const resultHex = document.getElementById("resultHex");
      const resultBin = document.getElementById("resultBin");
      const statusEl = document.getElementById("status");

      // Initialize bit grid using DOM methods (no innerHTML)
      function initBitGrid() {
        // Clear existing content safely
        while (bitGrid.firstChild) {
          bitGrid.removeChild(bitGrid.firstChild);
        }
        while (bitLabels.firstChild) {
          bitLabels.removeChild(bitLabels.firstChild);
        }

        for (let i = 31; i >= 0; i--) {
          const bit = document.createElement("div");
          bit.className = "bit";
          bit.textContent = "0";
          bit.dataset.index = i;
          bit.addEventListener("click", function () {
            toggleBit(parseInt(this.dataset.index, 10));
          });
          bitGrid.appendChild(bit);

          const label = document.createElement("div");
          label.className = "bit-label";
          label.textContent = String(i);
          bitLabels.appendChild(label);
        }
      }

      // Update bit grid display
      function updateBitGrid() {
        const bits = bitGrid.querySelectorAll(".bit");
        for (let i = 31; i >= 0; i--) {
          const bitEl = bits[31 - i];
          const isOn = (valueA >>> i) & 1;
          bitEl.textContent = isOn ? "1" : "0";
          bitEl.classList.toggle("on", isOn === 1);
        }
      }

      // Toggle single bit
      function toggleBit(index) {
        valueA ^= 1 << index;
        valueA = valueA >>> 0; // Convert to unsigned 32-bit
        updateBitGrid();
        updateInputA();
        calculate();
      }

      // Parse input value (supports dec, hex 0x, binary 0b)
      function parseInput(str) {
        str = str.trim();
        if (!str) return 0;

        let value;
        if (str.toLowerCase().startsWith("0x")) {
          value = parseInt(str.slice(2), 16);
        } else if (str.toLowerCase().startsWith("0b")) {
          value = parseInt(str.slice(2), 2);
        } else if (/^-?\d+$/.test(str)) {
          value = parseInt(str, 10);
        } else if (/^[0-9a-fA-F]+$/.test(str)) {
          // Assume hex if valid hex chars
          value = parseInt(str, 16);
        } else {
          return NaN;
        }

        return value >>> 0; // Convert to unsigned 32-bit
      }

      // Format value for display
      function formatValue(val, format) {
        val = val >>> 0;
        switch (format) {
          case "hex":
            return "0x" + val.toString(16).toUpperCase();
          case "bin":
            return "0b" + val.toString(2).padStart(32, "0");
          default:
            return val.toString(10);
        }
      }

      // Update input A display
      function updateInputA() {
        inputA.value = formatValue(valueA, formatA);
      }

      // Update input B display
      function updateInputB() {
        inputB.value = formatValue(valueB, formatB);
      }

      // Handle input A change
      inputA.addEventListener("input", function () {
        const val = parseInput(inputA.value);
        if (!isNaN(val)) {
          valueA = val;
          inputA.classList.remove("error");
          updateBitGrid();
          calculate();
        } else {
          inputA.classList.add("error");
        }
      });

      // Handle input B change
      inputB.addEventListener("input", function () {
        const val = parseInput(inputB.value);
        if (!isNaN(val)) {
          valueB = val;
          inputB.classList.remove("error");
          calculate();
        } else {
          inputB.classList.add("error");
        }
      });

      // Format selector for A
      document.getElementById("formatA").addEventListener("click", function (e) {
        if (e.target.classList.contains("format-btn")) {
          document.querySelectorAll("#formatA .format-btn").forEach(function (b) {
            b.classList.remove("active");
          });
          e.target.classList.add("active");
          formatA = e.target.dataset.format;
          updateInputA();
        }
      });

      // Format selector for B
      document.getElementById("formatB").addEventListener("click", function (e) {
        if (e.target.classList.contains("format-btn")) {
          document.querySelectorAll("#formatB .format-btn").forEach(function (b) {
            b.classList.remove("active");
          });
          e.target.classList.add("active");
          formatB = e.target.dataset.format;
          updateInputB();
        }
      });

      // Operation selector
      opSelector.addEventListener("click", function (e) {
        if (e.target.classList.contains("op-btn")) {
          opSelector.querySelectorAll(".op-btn").forEach(function (b) {
            b.classList.remove("active");
          });
          e.target.classList.add("active");
          currentOp = e.target.dataset.op;

          // Show/hide operand B and shift input based on operation
          const isUnary = currentOp === "not";
          const isShift = currentOp === "shl" || currentOp === "shr";

          operandBGroup.style.display = isUnary || isShift ? "none" : "block";
          shiftInput.classList.toggle("show", isShift);

          calculate();
        }
      });

      // Shift amount change
      shiftAmount.addEventListener("input", calculate);

      // Calculate result
      function calculate() {
        const a = valueA >>> 0;
        const b = valueB >>> 0;
        const shift = Math.min(31, Math.max(0, parseInt(shiftAmount.value) || 0));

        switch (currentOp) {
          case "and":
            result = (a & b) >>> 0;
            break;
          case "or":
            result = (a | b) >>> 0;
            break;
          case "xor":
            result = (a ^ b) >>> 0;
            break;
          case "not":
            result = ~a >>> 0;
            break;
          case "shl":
            result = (a << shift) >>> 0;
            break;
          case "shr":
            result = (a >>> shift) >>> 0;
            break;
        }

        displayResult();
      }

      window.calculate = calculate;

      // Display result
      function displayResult() {
        if (result === null) return;

        resultsDiv.style.display = "block";
        resultDec.textContent = result.toString(10);
        resultHex.textContent = "0x" + result.toString(16).toUpperCase();
        resultBin.textContent = result.toString(2).padStart(32, "0");

        showStatus("计算完成", "success");
      }

      // Copy result
      window.copyResult = async function (format) {
        if (result === null) {
          showStatus("没有结果可复制", "error");
          return;
        }

        let text;
        switch (format) {
          case "hex":
            text = "0x" + result.toString(16).toUpperCase();
            break;
          case "bin":
            text = result.toString(2);
            break;
          default:
            text = result.toString(10);
        }

        try {
          await navigator.clipboard.writeText(text);
          showStatus("已复制: " + text, "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      // Show status message
      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // Clear all
      document.getElementById("btnClear").addEventListener("click", function () {
        valueA = 0;
        valueB = 0;
        result = null;
        inputA.value = "";
        inputB.value = "";
        inputA.classList.remove("error");
        inputB.classList.remove("error");
        shiftAmount.value = "1";
        resultsDiv.style.display = "none";
        updateBitGrid();
        history.replaceState(null, "", location.pathname);
        showStatus("已清空", "success");
      });

      // Calculate button
      document.getElementById("btnCalculate").addEventListener("click", calculate);

      // Share URL
      document.getElementById("btnShare").addEventListener("click", async function () {
        const state = {
          a: valueA,
          b: valueB,
          op: currentOp,
          s: parseInt(shiftAmount.value) || 1
        };

        try {
          const encoded = btoa(encodeURIComponent(JSON.stringify(state)));
          history.replaceState(null, "", "#" + encoded);
          await navigator.clipboard.writeText(location.href);
          showStatus("分享链接已复制", "success");
        } catch (e) {
          showStatus("分享失败", "error");
        }
      });

      // Load from URL
      window.loadFromUrl = function () {
        const hash = location.hash.slice(1);
        if (!hash) return false;

        try {
          const state = JSON.parse(decodeURIComponent(atob(hash)));
          if (typeof state.a === "number") valueA = state.a >>> 0;
          if (typeof state.b === "number") valueB = state.b >>> 0;
          if (state.op) {
            currentOp = state.op;
            opSelector.querySelectorAll(".op-btn").forEach(function (b) {
              b.classList.toggle("active", b.dataset.op === currentOp);
            });
          }
          if (typeof state.s === "number") shiftAmount.value = state.s;

          // Update UI
          const isUnary = currentOp === "not";
          const isShift = currentOp === "shl" || currentOp === "shr";
          operandBGroup.style.display = isUnary || isShift ? "none" : "block";
          shiftInput.classList.toggle("show", isShift);

          updateInputA();
          updateInputB();
          updateBitGrid();
          calculate();
          return true;
        } catch (e) {
          return false;
        }
      };

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      // Initialize
      (function init() {
        // Load theme
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          document.documentElement.setAttribute("data-theme", savedTheme);
          const themeToggle = document.querySelector(".theme-toggle");
          if (themeToggle) themeToggle.textContent = savedTheme === "light" ? "☀️" : "🌙";
        }

        // Initialize bit grid
        initBitGrid();

        // Load from URL or show default
        if (!loadFromUrl()) {
          updateBitGrid();
        }
      })();
    
