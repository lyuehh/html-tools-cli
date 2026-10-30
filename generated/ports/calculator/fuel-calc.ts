// @ts-nocheck
// Generated from tools/calculator/fuel-calc.html
// Source SHA-256: a9bac74f4345e4b2d572c796f0fce0d1e3c3b62852c13de97e5a9d0ca1004f63
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("themeToggle").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      function loadTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.getElementById("themeToggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      window.showTab = function (tabId) {
        document.querySelectorAll(".tab-content").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".tabs button").forEach((b) => b.classList.remove("active"));
        document.getElementById(tabId).classList.add("active");
        event.target.classList.add("active");
      };

      window.calcConsumption = function () {
        const distance = parseFloat(document.getElementById("distance1").value) || 0;
        const fuel = parseFloat(document.getElementById("fuel1").value) || 0;

        if (distance <= 0) return;

        const consumption = (fuel / distance) * 100;
        const perKm = fuel / distance;
        const perLiter = distance / fuel;
        const mpg = 235.215 / consumption; // Convert L/100km to MPG

        document.getElementById("consumptionResult").textContent =
          consumption.toFixed(2) + " L/100km";
        document.getElementById("perKm").textContent = perKm.toFixed(4) + " L";
        document.getElementById("perLiter").textContent = perLiter.toFixed(2) + " km";
        document.getElementById("mpg").textContent = mpg.toFixed(1);
      };

      window.calcCost = function () {
        const distance = parseFloat(document.getElementById("distance2").value) || 0;
        const consumption = parseFloat(document.getElementById("consumption2").value) || 0;
        const price = parseFloat(document.getElementById("fuelPrice").value) || 0;

        const totalFuel = (distance / 100) * consumption;
        const totalCost = totalFuel * price;
        const costPerKm = totalCost / distance;
        const yearCost = (15000 / 100) * consumption * price; // 假设年行驶15000km

        document.getElementById("costResult").textContent = "¥" + totalCost.toFixed(2);
        document.getElementById("totalFuel").textContent = totalFuel.toFixed(2) + " L";
        document.getElementById("costPerKm").textContent = "¥" + costPerKm.toFixed(2);
        document.getElementById("yearCost").textContent = "¥" + Math.round(yearCost);
      };

      window.calcTrip = function () {
        const distance = parseFloat(document.getElementById("tripDistance").value) || 0;
        const consumption = parseFloat(document.getElementById("tripConsumption").value) || 0;
        const tankSize = parseFloat(document.getElementById("tankSize").value) || 0;
        const currentFuel = parseFloat(document.getElementById("currentFuel").value) || 0;
        const price = parseFloat(document.getElementById("tripFuelPrice").value) || 0;

        const neededFuel = (distance / 100) * consumption;
        const tripCost = neededFuel * price;
        const currentRange = (currentFuel / consumption) * 100;
        const fullRange = (tankSize / consumption) * 100;
        const needToFill = Math.max(0, neededFuel - currentFuel);
        const fillCost = needToFill * price;

        document.getElementById("neededFuel").textContent = neededFuel.toFixed(1) + " L";
        document.getElementById("tripCost").textContent = "¥" + tripCost.toFixed(2);
        document.getElementById("currentRange").textContent = Math.round(currentRange) + " km";
        document.getElementById("fullRange").textContent = Math.round(fullRange) + " km";
        document.getElementById("needToFill").textContent = needToFill.toFixed(1) + " L";
        document.getElementById("fillCost").textContent = "¥" + fillCost.toFixed(2);
      };

      window.calcCompare = function () {
        const yearlyDistance = parseFloat(document.getElementById("yearlyDistance").value) || 0;
        const gasConsumption = parseFloat(document.getElementById("gasConsumption").value) || 0;
        const gasPrice = parseFloat(document.getElementById("gasPrice").value) || 0;
        const evConsumption = parseFloat(document.getElementById("evConsumption").value) || 0;
        const electricityPrice = parseFloat(document.getElementById("electricityPrice").value) || 0;

        const gasCost = (yearlyDistance / 100) * gasConsumption * gasPrice;
        const evCost = (yearlyDistance / 100) * evConsumption * electricityPrice;
        const saving = gasCost - evCost;
        const perKmDiff = saving / yearlyDistance;

        document.getElementById("gasYearlyCost").textContent = "¥" + Math.round(gasCost);
        document.getElementById("evYearlyCost").textContent = "¥" + Math.round(evCost);
        document.getElementById("yearlySaving").textContent = "¥" + Math.round(saving);
        document.getElementById("perKmDiff").textContent = "¥" + perKmDiff.toFixed(2);
      };

      loadTheme();
    
