// @ts-nocheck
// Generated from tools/office/invoice-calculator.html
// Source SHA-256: 7980d1a5779c81da1627bc79395dc95f62257ff2212349b647c4c4d99e85fe31
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let mode = "withTax"; // withTax: 含税算税额, withoutTax: 不含税算合计
      let taxRate = 13;

      function setMode(newMode) {
        mode = newMode;
        document.querySelectorAll(".tab").forEach((btn, i) => {
          btn.classList.toggle(
            "active",
            (newMode === "withTax" && i === 0) || (newMode === "withoutTax" && i === 1)
          );
        });

        document.getElementById("inputLabel").textContent =
          mode === "withTax" ? "含税金额 (元)" : "不含税金额 (元)";
        calculate();
      }

      function setTaxRate(rate) {
        taxRate = rate;
        document.querySelectorAll(".tax-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.textContent === rate + "%");
        });
        calculate();
      }

      function calculate() {
        const amount = parseFloat(document.getElementById("amount").value) || 0;

        let priceWithoutTax, tax, total;

        if (mode === "withTax") {
          // 含税金额算税额
          // 不含税金额 = 含税金额 / (1 + 税率)
          // 税额 = 含税金额 - 不含税金额
          total = amount;
          priceWithoutTax = amount / (1 + taxRate / 100);
          tax = amount - priceWithoutTax;
        } else {
          // 不含税算价税合计
          // 税额 = 不含税金额 × 税率
          // 价税合计 = 不含税金额 + 税额
          priceWithoutTax = amount;
          tax = (amount * taxRate) / 100;
          total = amount + tax;
        }

        // Round to 2 decimal places
        priceWithoutTax = Math.round(priceWithoutTax * 100) / 100;
        tax = Math.round(tax * 100) / 100;
        total = Math.round(total * 100) / 100;

        // Update display
        document.getElementById("priceWithoutTax").textContent = "¥" + priceWithoutTax.toFixed(2);
        document.getElementById("taxAmount").textContent = "¥" + tax.toFixed(2);
        document.getElementById("totalAmount").textContent = "¥" + total.toFixed(2);

        // Update formula
        if (mode === "withTax") {
          document.getElementById("formula").innerHTML = `
          不含税金额 = ${amount.toFixed(2)} ÷ (1 + ${taxRate}%) = ${priceWithoutTax.toFixed(2)}<br>
          税额 = ${amount.toFixed(2)} - ${priceWithoutTax.toFixed(2)} = ${tax.toFixed(2)}<br>
          价税合计 = ${total.toFixed(2)}
        `;
        } else {
          document.getElementById("formula").innerHTML = `
          税额 = ${amount.toFixed(2)} × ${taxRate}% = ${tax.toFixed(2)}<br>
          价税合计 = ${amount.toFixed(2)} + ${tax.toFixed(2)} = ${total.toFixed(2)}
        `;
        }
      }

      function copyResult() {
        const priceWithoutTax = document.getElementById("priceWithoutTax").textContent;
        const taxAmount = document.getElementById("taxAmount").textContent;
        const totalAmount = document.getElementById("totalAmount").textContent;

        const text = `不含税金额: ${priceWithoutTax}\n税额: ${taxAmount}\n价税合计: ${totalAmount}\n税率: ${taxRate}%`;

        navigator.clipboard.writeText(text).then(() => {
          const btn = document.querySelector(".copy-btn");
          btn.innerHTML = "✅ 已复制";
          setTimeout(() => {
            btn.innerHTML = "📋 复制结果";
          }, 2000);
        });
      }

      // Initialize
      calculate();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
