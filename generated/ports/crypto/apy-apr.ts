// @ts-nocheck
// Generated from tools/crypto/apy-apr.html
// Source SHA-256: cf4f69ed2610fdd79613694dd9ea64f4d69408a5179991d2c3c5a76c350267e0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var mode = "aprToApy";

      function switchMode(newMode) {
        mode = newMode;
        document.querySelectorAll(".tab").forEach(function (tab, idx) {
          tab.classList.remove("active");
          if ((newMode === "aprToApy" && idx === 0) || (newMode === "apyToApr" && idx === 1)) {
            tab.classList.add("active");
          }
        });
        document.getElementById("aprToApyCard").classList.toggle("hidden", newMode !== "aprToApy");
        document.getElementById("apyToAprCard").classList.toggle("hidden", newMode !== "apyToApr");
        calcEarnings();
      }

      function calcAprToApy() {
        var apr = parseFloat(document.getElementById("aprInput").value) / 100 || 0;
        var n = parseInt(document.getElementById("compoundFreq").value) || 365;

        var apy = Math.pow(1 + apr / n, n) - 1;
        var gain = apy - apr;

        document.getElementById("apyResult").textContent = (apy * 100).toFixed(2) + "%";
        document.getElementById("compoundGain").textContent = "+" + (gain * 100).toFixed(2) + "%";
        calcEarnings();
      }

      function calcApyToApr() {
        var apy = parseFloat(document.getElementById("apyInput").value) / 100 || 0;
        var n = parseInt(document.getElementById("compoundFreq2").value) || 365;

        var apr = n * (Math.pow(1 + apy, 1 / n) - 1);
        var periodRate = apr / n;

        document.getElementById("aprResult").textContent = (apr * 100).toFixed(2) + "%";
        document.getElementById("periodRate").textContent = (periodRate * 100).toFixed(4) + "%";
        calcEarnings();
      }

      function calcEarnings() {
        var principal = parseFloat(document.getElementById("principal").value) || 0;
        var days = parseInt(document.getElementById("days").value) || 365;

        var apr, apy, n;
        if (mode === "aprToApy") {
          apr = parseFloat(document.getElementById("aprInput").value) / 100 || 0;
          n = parseInt(document.getElementById("compoundFreq").value) || 365;
          apy = Math.pow(1 + apr / n, n) - 1;
        } else {
          apy = parseFloat(document.getElementById("apyInput").value) / 100 || 0;
          n = parseInt(document.getElementById("compoundFreq2").value) || 365;
          apr = n * (Math.pow(1 + apy, 1 / n) - 1);
        }

        var simpleEarning = (principal * apr * days) / 365;
        var compoundEarning = principal * (Math.pow(1 + apy, days / 365) - 1);

        document.getElementById("simpleEarning").textContent = simpleEarning.toLocaleString(
          "en-US",
          {
            maximumFractionDigits: 0
          }
        );
        document.getElementById("compoundEarning").textContent = compoundEarning.toLocaleString(
          "en-US",
          { maximumFractionDigits: 0 }
        );
      }

      calcAprToApy();

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
    
