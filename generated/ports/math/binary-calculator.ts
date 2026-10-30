// @ts-nocheck
// Generated from tools/math/binary-calculator.html
// Source SHA-256: 57c81a04a50f94b592ce76ef2dae6376b369905d4c2c2c75dc467d9d3d4f3c90
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentOp = "AND";

      function setOp(op, btn) {
        currentOp = op;
        document.querySelectorAll(".op-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const isSingleOp = op === "NOT";
        document.getElementById("inputBGroup").style.display = isSingleOp ? "none" : "block";
        document.getElementById("bitsBlabel").style.display = isSingleOp ? "none" : "block";
        document.getElementById("bitsB").style.display = isSingleOp ? "none" : "flex";

        calculate();
      }

      function parseValue(input, base) {
        const val = input.trim();
        if (!val) return NaN;
        return parseInt(val, base);
      }

      function renderBits(num, containerId) {
        const container = document.getElementById(containerId);
        if (isNaN(num)) {
          container.innerHTML = '<span style="color:var(--text-muted)">-</span>';
          return;
        }

        const isNeg = num < 0;
        const absNum = Math.abs(num);
        let binary = absNum.toString(2).padStart(8, "0");
        if (binary.length > 32) binary = binary.slice(-32);
        while (binary.length < 8 || binary.length % 4 !== 0) {
          binary = "0" + binary;
        }

        let html = "";
        for (let i = 0; i < binary.length; i++) {
          if (i > 0 && i % 4 === 0) {
            html += '<div class="bit-separator"></div>';
          }
          html += `<div class="bit ${binary[i] === "1" ? "one" : "zero"}">${binary[i]}</div>`;
        }
        container.innerHTML =
          (isNeg ? '<span style="margin-right:8px;color:var(--accent-cyan)">-</span>' : "") + html;
      }

      function calculate() {
        const baseA = parseInt(document.getElementById("baseA").value);
        const baseB = parseInt(document.getElementById("baseB").value);
        const a = parseValue(document.getElementById("inputA").value, baseA);
        const b = parseValue(document.getElementById("inputB").value, baseB);

        renderBits(a, "bitsA");
        renderBits(b, "bitsB");

        if (isNaN(a) || (currentOp !== "NOT" && isNaN(b))) {
          document.getElementById("resultBin").textContent = "-";
          document.getElementById("resultDec").textContent = "-";
          document.getElementById("resultHex").textContent = "-";
          document.getElementById("bitsResult").innerHTML =
            '<span style="color:var(--text-muted)">-</span>';
          return;
        }

        let result;
        switch (currentOp) {
          case "AND":
            result = a & b;
            break;
          case "OR":
            result = a | b;
            break;
          case "XOR":
            result = a ^ b;
            break;
          case "NOT":
            result = ~a;
            break;
          case "LSHIFT":
            result = a << b;
            break;
          case "RSHIFT":
            result = a >> b;
            break;
          case "ADD":
            result = a + b;
            break;
          case "SUB":
            result = a - b;
            break;
        }

        const absResult = Math.abs(result);
        document.getElementById("resultBin").textContent =
          (result < 0 ? "-" : "") + absResult.toString(2);
        document.getElementById("resultDec").textContent = result.toString(10);
        document.getElementById("resultHex").textContent =
          (result < 0 ? "-" : "") + absResult.toString(16).toUpperCase();
        renderBits(result, "bitsResult");
      }

      calculate();

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
