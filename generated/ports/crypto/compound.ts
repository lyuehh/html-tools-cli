// @ts-nocheck
// Generated from tools/crypto/compound.html
// Source SHA-256: 6298f688333039a69a27c0d95e26e42bd3e35f225bfa9f4008bcb184232c6c34
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatMoney(num) {
        if (num >= 100000000) {
          return (num / 100000000).toFixed(2) + "亿";
        }
        if (num >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(2);
      }

      function calculate() {
        var principal = parseFloat(document.getElementById("principal").value) || 0;
        var apy = parseFloat(document.getElementById("apy").value) / 100 || 0;
        var compoundFreq = parseInt(document.getElementById("compoundFreq").value) || 365;
        var years = parseInt(document.getElementById("years").value) || 1;

        var ratePerPeriod = apy / compoundFreq;
        var totalPeriods = compoundFreq * years;
        var finalAmount = principal * Math.pow(1 + ratePerPeriod, totalPeriods);
        var totalProfit = finalAmount - principal;
        var simpleInterest = principal * apy * years;
        var compoundBonus = totalProfit - simpleInterest;
        var multiple = finalAmount / principal;

        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("finalAmount").textContent = formatMoney(finalAmount) + " USDT";
        document.getElementById("totalProfit").textContent = "+" + formatMoney(totalProfit);
        document.getElementById("multiple").textContent = multiple.toFixed(2) + "x";
        document.getElementById("simpleInterest").textContent = formatMoney(simpleInterest);
        document.getElementById("compoundBonus").textContent = "+" + formatMoney(compoundBonus);

        var timeline = document.getElementById("timeline");
        while (timeline.firstChild) {
          timeline.removeChild(timeline.firstChild);
        }

        for (var year = 1; year <= Math.min(years, 10); year++) {
          var yearAmount = principal * Math.pow(1 + ratePerPeriod, compoundFreq * year);
          var yearProfit = yearAmount - principal;

          var item = document.createElement("div");
          item.className = "timeline-item";

          var yearLabel = document.createElement("span");
          yearLabel.textContent = "第" + year + "年";

          var valueSpan = document.createElement("span");
          valueSpan.textContent = formatMoney(yearAmount) + " USDT";
          valueSpan.style.color = "var(--accent-cyan)";

          var profitSpan = document.createElement("span");
          profitSpan.textContent = "+" + formatMoney(yearProfit);
          profitSpan.style.color = "var(--accent-green)";

          item.appendChild(yearLabel);
          item.appendChild(valueSpan);
          item.appendChild(profitSpan);
          timeline.appendChild(item);
        }
      }

      calculate();

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
    
