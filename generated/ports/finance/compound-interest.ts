// @ts-nocheck
// Generated from tools/finance/compound-interest.html
// Source SHA-256: f9405b319b07c3ca1149185d5d8fc4d6ab49ab97bf1c53a6d700caccff8067bf
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculate() {
        const P = parseFloat(document.getElementById("principal").value) || 0;
        const r = parseFloat(document.getElementById("rate").value) / 100 || 0;
        const t = parseFloat(document.getElementById("years").value) || 0;
        const n = parseFloat(document.getElementById("frequency").value) || 12;
        const monthlyAdd = parseFloat(document.getElementById("monthly").value) || 0;

        // Compound interest formula: A = P(1 + r/n)^(nt)
        let finalAmount = P * Math.pow(1 + r / n, n * t);

        // Add monthly contributions with compound interest
        if (monthlyAdd > 0) {
          // Future value of annuity: FV = PMT * [(1 + r/n)^(nt) - 1] / (r/n)
          const monthlyRate = r / 12;
          const months = t * 12;
          const annuityFV = (monthlyAdd * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate;
          finalAmount += annuityFV;
        }

        const totalPrincipal = P + monthlyAdd * t * 12;
        const totalInterest = finalAmount - totalPrincipal;

        // Update display
        document.getElementById("finalAmount").textContent =
          "¥" + finalAmount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById("totalPrincipal").textContent =
          "¥" + totalPrincipal.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById("totalInterest").textContent =
          "¥" + totalInterest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // Render chart
        renderChart(P, r, t, n, monthlyAdd);
      }

      function renderChart(P, r, t, n, monthlyAdd) {
        const container = document.getElementById("chartBars");
        const steps = Math.min(10, t);
        const interval = Math.ceil(t / steps);

        let bars = "";
        let maxAmount = 0;
        const data = [];

        for (let year = interval; year <= t; year += interval) {
          let amount = P * Math.pow(1 + r / n, n * year);

          if (monthlyAdd > 0) {
            const monthlyRate = r / 12;
            const months = year * 12;
            const annuityFV = (monthlyAdd * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate;
            amount += annuityFV;
          }

          const principal = P + monthlyAdd * year * 12;
          const interest = amount - principal;

          data.push({ year, amount, principal, interest });
          maxAmount = Math.max(maxAmount, amount);
        }

        data.forEach((d) => {
          const height = (d.amount / maxAmount) * 100;
          const principalHeight = (d.principal / maxAmount) * 100;

          bars += `
          <div class="chart-bar" style="height: ${height}%">
            <div class="chart-bar-value">¥${(d.amount / 10000).toFixed(1)}万</div>
            <div class="chart-bar-label">${d.year}年</div>
          </div>
        `;
        });

        container.innerHTML = bars;
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
    
