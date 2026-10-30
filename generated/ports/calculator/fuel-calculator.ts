// @ts-nocheck
// Generated from tools/calculator/fuel-calculator.html
// Source SHA-256: c1247df99cef17b7c130196973195add7fa5e3d24c2d7a2e5d416fcd12bb2074
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculate() {
        const distance = parseFloat(document.getElementById("distance").value) || 0;
        const fuel = parseFloat(document.getElementById("fuel").value) || 0;
        const price = parseFloat(document.getElementById("price").value) || 0;
        if (distance <= 0 || fuel <= 0) return;
        const consumption = (fuel / distance) * 100;
        const costPer100 = consumption * price;
        const kmPerLiter = distance / fuel;
        document.getElementById("consumption").textContent = consumption.toFixed(2);
        document.getElementById("costPer100").textContent = "¥" + costPer100.toFixed(2);
        document.getElementById("kmPerLiter").textContent = kmPerLiter.toFixed(1) + "km";
      }
      document.querySelectorAll("input").forEach((el) => el.addEventListener("input", calculate));
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
    
