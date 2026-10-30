// @ts-nocheck
// Generated from tools/calculator/percentage-calc.html
// Source SHA-256: a4c07c019e35c2710ebe1c79bad1c97f96e87e293c33b930fbaa25c966609a0c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calc1() {
        const x = parseFloat(document.getElementById("calc1-x").value);
        const y = parseFloat(document.getElementById("calc1-y").value);
        const result = document.getElementById("calc1-result");
        if (!isNaN(x) && !isNaN(y) && y !== 0) {
          result.textContent = ((x / y) * 100).toFixed(2) + "%";
        } else {
          result.textContent = "?%";
        }
      }

      function calc2() {
        const y = parseFloat(document.getElementById("calc2-y").value);
        const x = parseFloat(document.getElementById("calc2-x").value);
        const result = document.getElementById("calc2-result");
        if (!isNaN(x) && !isNaN(y)) {
          result.textContent = ((y * x) / 100).toFixed(2);
        } else {
          result.textContent = "?";
        }
      }

      function calc3() {
        const x = parseFloat(document.getElementById("calc3-x").value);
        const z = parseFloat(document.getElementById("calc3-z").value);
        const result = document.getElementById("calc3-result");
        if (!isNaN(x) && !isNaN(z) && x !== 0) {
          result.textContent = ((z / x) * 100).toFixed(2);
        } else {
          result.textContent = "?";
        }
      }

      function calc4() {
        const x = parseFloat(document.getElementById("calc4-x").value);
        const y = parseFloat(document.getElementById("calc4-y").value);
        const result = document.getElementById("calc4-result");
        if (!isNaN(x) && !isNaN(y) && x !== 0) {
          const change = (((y - x) / x) * 100).toFixed(2);
          result.textContent = (change >= 0 ? "+" : "") + change + "%";
          result.style.background =
            change >= 0
              ? "linear-gradient(135deg, #43e97b, #38f9d7)"
              : "linear-gradient(135deg, #ff6b6b, #ee5a5a)";
        } else {
          result.textContent = "?%";
          result.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
        }
      }

      function calc5() {
        const x = parseFloat(document.getElementById("calc5-x").value);
        const y = parseFloat(document.getElementById("calc5-y").value);
        const op = document.getElementById("calc5-op").value;
        const result = document.getElementById("calc5-result");
        if (!isNaN(x) && !isNaN(y)) {
          const change = (x * y) / 100;
          result.textContent = (op === "add" ? x + change : x - change).toFixed(2);
        } else {
          result.textContent = "?";
        }
      }

      function setCalc1(x, y) {
        document.getElementById("calc1-x").value = x;
        document.getElementById("calc1-y").value = y;
        calc1();
      }

      function setCalc2(y, x) {
        document.getElementById("calc2-y").value = y;
        document.getElementById("calc2-x").value = x;
        calc2();
      }

      function setCalc3(x, z) {
        document.getElementById("calc3-x").value = x;
        document.getElementById("calc3-z").value = z;
        calc3();
      }

      function setCalc4(x, y) {
        document.getElementById("calc4-x").value = x;
        document.getElementById("calc4-y").value = y;
        calc4();
      }

      function setCalc5(x, op, y) {
        document.getElementById("calc5-x").value = x;
        document.getElementById("calc5-op").value = op;
        document.getElementById("calc5-y").value = y;
        calc5();
      }

      function setQuickPercent(p) {
        document.getElementById("calc2-x").value = p;
        calc2();
      }

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
    
