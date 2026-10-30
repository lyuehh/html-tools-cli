// @ts-nocheck
// Generated from tools/health/calorie-burn-calculator.html
// Source SHA-256: a8617300db8be1eb79068f8d80d2ded26c732359b49163d9ad6006867aa8ffb4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentMET = 9.8;

      function selectExercise(event, type, met) {
        currentMET = met;

        // Update UI
        document.querySelectorAll(".exercise-btn").forEach((btn) => {
          btn.classList.remove("selected");
        });
        event.target.closest(".exercise-btn").classList.add("selected");

        calculate();
      }

      function calculate() {
        const weight = parseFloat(document.getElementById("weight").value) || 70;
        const duration = parseFloat(document.getElementById("duration").value) || 30;

        // MET formula: Calories = MET × weight (kg) × duration (hours)
        const hours = duration / 60;
        const calories = currentMET * weight * hours;

        // Update display
        document.getElementById("caloriesBurned").textContent = Math.round(calories);

        // Calculate food equivalents
        const rice = calories / 300; // 1 bowl rice ≈ 300 kcal
        const apple = calories / 52; // 1 apple ≈ 52 kcal
        const chocolate = calories / 550; // 1 bar chocolate ≈ 550 kcal
        const cola = calories / 140; // 1 can cola ≈ 140 kcal

        document.getElementById("riceEquiv").textContent = rice.toFixed(1);
        document.getElementById("appleEquiv").textContent = apple.toFixed(1);
        document.getElementById("chocolateEquiv").textContent = chocolate.toFixed(1);
        document.getElementById("colaEquiv").textContent = cola.toFixed(1);
      }

      // Initialize
      calculate();

      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // ============================================
      // Initialize
      // ============================================
      initTheme();
    
