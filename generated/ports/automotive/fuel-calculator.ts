// @ts-nocheck
// Generated from tools/automotive/fuel-calculator.html
// Source SHA-256: 708c5dafe28115a5ff14ceb1b57c9af79c683a2cea063798df19d439834c6882
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculate() {
        const distance = parseFloat(document.getElementById("distance").value);
        const fuel = parseFloat(document.getElementById("fuel").value);
        const price = parseFloat(document.getElementById("price").value);

        if (!distance || !fuel || distance <= 0 || fuel <= 0) {
          alert("请输入有效的里程和油量");
          return;
        }

        // Calculate consumption (L/100km)
        const consumption = (fuel / distance) * 100;

        // Calculate MPG (Miles per Gallon) for reference
        const mpg = 235.21 / consumption; // Conversion factor

        // Calculate total cost
        const totalCost = fuel * price;
        const costPerKm = totalCost / distance;

        // Calculate range with full tank (assume 50L tank)
        const tankSize = 50;
        const estimatedRange = (tankSize / consumption) * 100;

        // Display results
        document.getElementById("consumption").textContent = consumption.toFixed(2) + " L";
        document.getElementById("mpg").textContent = `≈ ${mpg.toFixed(1)} MPG`;
        document.getElementById("totalCost").textContent = "¥" + totalCost.toFixed(2);
        document.getElementById("perKm").textContent = `¥${costPerKm.toFixed(2)}/公里`;
        document.getElementById("range").textContent = estimatedRange.toFixed(0) + " km";
        document.getElementById("tankInfo").textContent = `满油箱 (${tankSize}L) 预估`;

        document.getElementById("resultCard").classList.add("show");

        // Fuel efficiency rating
        let rating = "";
        if (consumption < 6) rating = "🌟 非常省油";
        else if (consumption < 8) rating = "✅ 较为省油";
        else if (consumption < 10) rating = "⚠️ 中等油耗";
        else if (consumption < 12) rating = "😐 较高油耗";
        else rating = "🔴 油耗偏高";

        document.querySelector(".result-title").textContent = `📊 计算结果 ${rating}`;
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
    
