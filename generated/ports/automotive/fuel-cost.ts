// @ts-nocheck
// Generated from tools/automotive/fuel-cost.html
// Source SHA-256: fc621038098c760caa72de50962a933904504fdcd3729cfb392784a4237648e7
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function switchTab(tab) {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach((t) => t.classList.remove("active"));

        event.target.classList.add("active");
        document.getElementById(tab + "Tab").classList.add("active");

        if (tab === "trip") calculateTrip();
        if (tab === "monthly") calculateMonthly();
        if (tab === "compare") calculateCompare();
      }

      function setConsumption(inputId, value) {
        document.getElementById(inputId).value = value;
        if (inputId === "tripConsumption") calculateTrip();
        if (inputId === "monthlyConsumption") calculateMonthly();
      }

      function setPrice(inputId, value) {
        document.getElementById(inputId).value = value;
        if (inputId === "tripPrice") calculateTrip();
        if (inputId === "monthlyPrice") calculateMonthly();
        if (inputId === "comparePrice") calculateCompare();
      }

      function calculateTrip() {
        const distance = parseFloat(document.getElementById("tripDistance").value) || 0;
        const consumption = parseFloat(document.getElementById("tripConsumption").value) || 0;
        const price = parseFloat(document.getElementById("tripPrice").value) || 0;

        const fuel = (distance * consumption) / 100;
        const cost = fuel * price;
        const perKm = cost / distance;

        document.getElementById("tripCost").textContent = "¥" + cost.toFixed(2);
        document.getElementById("tripFuel").textContent = fuel.toFixed(2) + " L";
        document.getElementById("tripPerKm").textContent = perKm ? "¥" + perKm.toFixed(2) : "¥0.00";
      }

      function calculateMonthly() {
        const distance = parseFloat(document.getElementById("monthlyDistance").value) || 0;
        const consumption = parseFloat(document.getElementById("monthlyConsumption").value) || 0;
        const price = parseFloat(document.getElementById("monthlyPrice").value) || 0;

        const monthlyFuel = (distance * consumption) / 100;
        const monthlyCost = monthlyFuel * price;
        const yearlyFuel = monthlyFuel * 12;
        const yearlyCost = monthlyCost * 12;

        document.getElementById("monthlyCost").textContent = "¥" + monthlyCost.toFixed(2);
        document.getElementById("yearlyCost").textContent = "¥" + yearlyCost.toFixed(0);
        document.getElementById("monthlyFuel").textContent = monthlyFuel.toFixed(1) + " L";
        document.getElementById("yearlyFuel").textContent = yearlyFuel.toFixed(0) + " L";
      }

      function calculateCompare() {
        const distance = parseFloat(document.getElementById("compareDistance").value) || 0;
        const price = parseFloat(document.getElementById("comparePrice").value) || 0;

        const carTypes = [
          { name: "节能车 (混动)", consumption: 4 },
          { name: "小型车", consumption: 6 },
          { name: "紧凑型车", consumption: 7 },
          { name: "中型车", consumption: 8 },
          { name: "中大型车", consumption: 9 },
          { name: "SUV", consumption: 10 },
          { name: "大型SUV", consumption: 12 },
          { name: "性能车", consumption: 14 }
        ];

        const content = carTypes
          .map((car) => {
            const fuel = (distance * car.consumption) / 100;
            const cost = fuel * price;
            return `
          <div class="comparison-row">
            <div class="comparison-label">${car.name}</div>
            <div class="comparison-value" style="color:var(--color-text-secondary)">${car.consumption}L/100km</div>
            <div class="comparison-value" style="color:var(--accent-orange)">¥${cost.toFixed(0)}</div>
          </div>
        `;
          })
          .join("");

        document.getElementById("comparisonContent").innerHTML = content;
      }

      // Initialize
      calculateTrip();
      calculateMonthly();
      calculateCompare();

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
    
