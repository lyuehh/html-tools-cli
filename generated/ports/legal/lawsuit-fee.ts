// @ts-nocheck
// Generated from tools/legal/lawsuit-fee.html
// Source SHA-256: a02ebaf72ab1f8ce21d14b96ca9ed5672b7683d71082bf1c84bbf28d67e8506d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function updateForm() {
        const caseType = document.getElementById("caseType").value;
        const amountGroup = document.getElementById("amountGroup");
        const divorceGroup = document.getElementById("divorceGroup");
        const propertyAmountGroup = document.getElementById("propertyAmountGroup");

        amountGroup.classList.toggle("hidden", caseType !== "property" && caseType !== "ip");
        divorceGroup.classList.toggle("hidden", caseType !== "divorce");
        propertyAmountGroup.classList.add("hidden");

        if (caseType === "divorce") {
          updateDivorceForm();
        }

        calculate();
      }

      function updateDivorceForm() {
        const hasProperty = document.getElementById("divorceProperty").value === "yes";
        document.getElementById("propertyAmountGroup").classList.toggle("hidden", !hasProperty);
        calculate();
      }

      document.getElementById("divorceProperty").addEventListener("change", updateDivorceForm);

      function calculatePropertyFee(amount) {
        if (amount <= 0) return 0;

        if (amount <= 10000) {
          return 50;
        } else if (amount <= 100000) {
          return amount * 0.025 - 200;
        } else if (amount <= 200000) {
          return amount * 0.02 + 300;
        } else if (amount <= 500000) {
          return amount * 0.015 + 1300;
        } else if (amount <= 1000000) {
          return amount * 0.01 + 3800;
        } else if (amount <= 2000000) {
          return amount * 0.009 + 4800;
        } else if (amount <= 5000000) {
          return amount * 0.008 + 6800;
        } else if (amount <= 10000000) {
          return amount * 0.007 + 11800;
        } else if (amount <= 20000000) {
          return amount * 0.006 + 21800;
        } else {
          return amount * 0.005 + 41800;
        }
      }

      function calculate() {
        const caseType = document.getElementById("caseType").value;
        let fee = 0;
        let breakdown = [];
        let note = "";

        if (caseType === "property" || caseType === "ip") {
          const amount = parseFloat(document.getElementById("amount").value) || 0;
          fee = calculatePropertyFee(amount);
          breakdown.push({ label: "标的额", value: "¥ " + amount.toLocaleString() });
          breakdown.push({ label: "案件受理费", value: "¥ " + Math.round(fee).toLocaleString() });
          note = "财产案件按标的额比例计算";
        } else if (caseType === "divorce") {
          fee = 300; // 基础离婚案件费
          breakdown.push({ label: "离婚案件基础费", value: "¥ 300" });

          const hasProperty = document.getElementById("divorceProperty").value === "yes";
          if (hasProperty) {
            const propertyAmount = parseFloat(document.getElementById("propertyAmount").value) || 0;
            if (propertyAmount > 200000) {
              const extraFee = (propertyAmount - 200000) * 0.005;
              fee += extraFee;
              breakdown.push({
                label: "财产分割金额",
                value: "¥ " + propertyAmount.toLocaleString()
              });
              breakdown.push({
                label: "超过20万部分费用",
                value: "¥ " + Math.round(extraFee).toLocaleString()
              });
            }
          }
          note = "涉及财产分割，超过20万元部分按0.5%加收";
        } else if (caseType === "labor") {
          fee = 10;
          breakdown.push({ label: "劳动争议案件费", value: "¥ 10" });
          note = "劳动争议案件每件10元";
        } else if (caseType === "admin") {
          fee = 50;
          breakdown.push({ label: "行政案件费", value: "¥ 50" });
          note = "行政案件每件50元";
        } else {
          fee = 100;
          breakdown.push({ label: "其他非财产案件", value: "¥ 100" });
          note = "其他非财产案件每件50-100元";
        }

        // Show result
        document.getElementById("resultCard").style.display = "block";
        document.getElementById("resultFee").textContent = "¥ " + Math.round(fee).toLocaleString();
        document.getElementById("resultNote").textContent = note;

        // Show breakdown
        const breakdownHtml = breakdown
          .map(
            (item) => `
        <div class="breakdown-row">
          <span class="breakdown-label">${item.label}</span>
          <span class="breakdown-value">${item.value}</span>
        </div>
      `
          )
          .join("");

        document.getElementById("breakdown").innerHTML = `
        <div class="breakdown-title">费用明细</div>
        ${breakdownHtml}
        <div class="breakdown-row" style="font-weight:600;color:var(--color-accent-cyan)">
          <span class="breakdown-label">合计</span>
          <span class="breakdown-value">¥ ${Math.round(fee).toLocaleString()}</span>
        </div>
      `;
      }

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
    
