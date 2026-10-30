// @ts-nocheck
// Generated from tools/business/invoice.html
// Source SHA-256: 2a0eec658a9b8295ed04a639245f5b445249fd84d28098dbe8613247afd623fd
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function toggleTheme() {
        var theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      }
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved) {
          document.body.setAttribute("data-theme", saved);
        } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      var mode = "withTax";

      function switchMode(newMode) {
        mode = newMode;
        var tabs = document.querySelectorAll(".tab");
        tabs.forEach(function (tab, index) {
          tab.classList.remove("active");
          if ((newMode === "withTax" && index === 0) || (newMode === "withoutTax" && index === 1)) {
            tab.classList.add("active");
          }
        });

        document.getElementById("withTaxInput").classList.toggle("hidden", newMode !== "withTax");
        document
          .getElementById("withoutTaxInput")
          .classList.toggle("hidden", newMode !== "withoutTax");
        calculate();
      }

      function formatMoney(num) {
        return "¥" + num.toFixed(2);
      }

      function calculate() {
        var taxRate = parseFloat(document.getElementById("taxRate").value) || 0;
        var amountWithTax, amountWithoutTax, taxAmount;

        if (mode === "withTax") {
          amountWithTax = parseFloat(document.getElementById("amountWithTax").value) || 0;
          amountWithoutTax = amountWithTax / (1 + taxRate);
          taxAmount = amountWithTax - amountWithoutTax;
        } else {
          amountWithoutTax = parseFloat(document.getElementById("amountWithoutTax").value) || 0;
          taxAmount = amountWithoutTax * taxRate;
          amountWithTax = amountWithoutTax + taxAmount;
        }

        document.getElementById("resultWithoutTax").textContent = formatMoney(amountWithoutTax);
        document.getElementById("resultTax").textContent = formatMoney(taxAmount);
        document.getElementById("resultWithTax").textContent = formatMoney(amountWithTax);
      }

      calculate();
    
