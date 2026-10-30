// @ts-nocheck
// Generated from tools/realestate/property-fee.html
// Source SHA-256: 40be244b0862a45baa040ef4f7c0e3ff470539568e2e8c03fef4ef137e388061
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatMoney(num) {
        if (num >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toLocaleString("zh-CN", { maximumFractionDigits: 2 }) + "元";
      }

      function calculate() {
        const area = parseFloat(document.getElementById("area").value) || 0;
        const feeRate = parseFloat(document.getElementById("feeRate").value) || 0;
        const housePrice = parseFloat(document.getElementById("housePrice").value) || 0;
        const maintenanceRate =
          parseFloat(document.getElementById("maintenanceRate").value) / 100 || 0;
        const hasElevator = document.getElementById("hasElevator").value === "yes";

        if (area <= 0 || feeRate <= 0) {
          return;
        }

        const monthlyFee = area * feeRate;
        const yearlyFee = monthlyFee * 12;
        const quarterlyFee = monthlyFee * 3;
        const halfYearFee = monthlyFee * 6;
        const tenYearFee = yearlyFee * 10;

        // 维修基金计算（有电梯的通常更高）
        let maintenanceFund = area * housePrice * maintenanceRate;
        if (hasElevator) {
          maintenanceFund *= 1.2; // 有电梯增加20%
        }

        document.getElementById("result").style.display = "block";

        document.getElementById("monthlyFee").textContent = formatMoney(monthlyFee);
        document.getElementById("yearlyFee").textContent = formatMoney(yearlyFee);
        document.getElementById("maintenanceFund").textContent = formatMoney(maintenanceFund);
        document.getElementById("tenYearFee").textContent = formatMoney(tenYearFee);

        document.getElementById("detailArea").textContent = area + " ㎡";
        document.getElementById("detailRate").textContent = feeRate + " 元/㎡/月";
        document.getElementById("detailMonthly").textContent = formatMoney(monthlyFee);
        document.getElementById("detailQuarterly").textContent = formatMoney(quarterlyFee);
        document.getElementById("detailHalfYear").textContent = formatMoney(halfYearFee);
        document.getElementById("detailYearly").textContent = formatMoney(yearlyFee);
      }

      function clearAll() {
        document.getElementById("result").style.display = "none";
      }

      function toggleTheme() {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      }

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
        calculate();
      })();
    
