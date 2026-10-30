// @ts-nocheck
// Generated from tools/math/logarithm-calculator.html
// Source SHA-256: c1988573ad325c1093bd2f117eb41ddac3ee4922d55e91ebadebec55e34cbf79
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let mode = "ln";

      function setMode(m, btn) {
        mode = m;
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        btn.classList.add("active");

        const baseGroup = document.getElementById("baseGroup");
        const formula = document.getElementById("formula");

        if (m === "ln") {
          baseGroup.style.display = "none";
          formula.innerHTML = "ln(x) = log<sub>e</sub>(x)";
        } else if (m === "log10") {
          baseGroup.style.display = "none";
          formula.innerHTML = "lg(x) = log<sub>10</sub>(x)";
        } else if (m === "log2") {
          baseGroup.style.display = "none";
          formula.innerHTML = "log<sub>2</sub>(x)";
        } else {
          baseGroup.style.display = "block";
          formula.innerHTML = "log<sub>b</sub>(x) = ln(x) / ln(b)";
        }

        calculate();
      }

      function calculate() {
        const x = parseFloat(document.getElementById("x").value);
        const b = parseFloat(document.getElementById("base").value);

        const resultLabel = document.getElementById("resultLabel");
        const resultValue = document.getElementById("resultValue");

        if (isNaN(x) || x <= 0) {
          resultLabel.textContent = "错误";
          resultValue.textContent = "x 必须大于 0";
          return;
        }

        let result;
        let label;

        switch (mode) {
          case "ln":
            result = Math.log(x);
            label = `ln(${x}) =`;
            break;
          case "log10":
            result = Math.log10(x);
            label = `lg(${x}) =`;
            break;
          case "log2":
            result = Math.log2(x);
            label = `log₂(${x}) =`;
            break;
          case "custom":
            if (isNaN(b) || b <= 0 || b === 1) {
              resultLabel.textContent = "错误";
              resultValue.textContent = "底数必须大于 0 且不等于 1";
              return;
            }
            result = Math.log(x) / Math.log(b);
            label = `log${b}(${x}) =`;
            break;
        }

        resultLabel.textContent = label;
        resultValue.textContent = result.toFixed(10).replace(/\.?0+$/, "");

        // Update conversions
        document.getElementById("lnVal").textContent = Math.log(x).toFixed(6);
        document.getElementById("lgVal").textContent = Math.log10(x).toFixed(6);
        document.getElementById("log2Val").textContent = Math.log2(x).toFixed(6);
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
    
