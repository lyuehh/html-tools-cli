// @ts-nocheck
// Generated from tools/finance/tip-calculator.html
// Source SHA-256: 82e7cd8d3d7b3f8996a0fde88fb6e78e377f18437feea71ad8281d92e3560090
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let tipPercent = 15;
      let people = 2;

      function setTip(percent) {
        tipPercent = percent;
        document.querySelectorAll(".tip-btn").forEach((btn) => {
          btn.classList.toggle("active", parseInt(btn.dataset.tip) === percent);
        });
        document.getElementById("customTip").value = "";
        calculate();
      }

      function setCustomTip() {
        const custom = parseFloat(document.getElementById("customTip").value);
        if (!isNaN(custom) && custom >= 0) {
          tipPercent = custom;
          document.querySelectorAll(".tip-btn").forEach((btn) => btn.classList.remove("active"));
          calculate();
        }
      }

      function changePeople(delta) {
        people = Math.max(1, people + delta);
        document.getElementById("peopleCount").textContent = people;
        calculate();
      }

      function calculate() {
        const bill = parseFloat(document.getElementById("bill").value) || 0;
        const tip = bill * (tipPercent / 100);
        const total = bill + tip;
        const perPerson = total / people;

        const fmt = (n) => "¥" + n.toFixed(2);

        document.getElementById("displayBill").textContent = fmt(bill);
        document.getElementById("tipAmount").textContent = fmt(tip) + " (" + tipPercent + "%)";
        document.getElementById("total").textContent = fmt(total);
        document.getElementById("perPerson").textContent = fmt(perPerson);
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
    
