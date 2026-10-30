// @ts-nocheck
// Generated from tools/calculator/loan-calculator.html
// Source SHA-256: da1bb054a339ae63f76a6e5234910bc942165db3174de52348b98dd2f34151a8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Calculation Logic
      // ============================================
      function calculate() {
        const P = parseFloat(document.getElementById("principal").value) || 0;
        const annualRate = parseFloat(document.getElementById("rate").value) || 0;
        const years = parseFloat(document.getElementById("years").value) || 0;

        const r = annualRate / 100 / 12; // Monthly interest rate
        const n = years * 12; // Total months

        if (P <= 0 || n <= 0) {
          return;
        }

        // Equal principal and interest formula
        // Handle 0% interest rate (promotional loans)
        let monthly;
        if (r === 0) {
          monthly = P / n;
        } else {
          monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        }
        const totalPayment = monthly * n;
        const totalInterest = totalPayment - P;

        // Format numbers with thousand separators
        const formatMoney = (num) => {
          return "¥ " + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        document.getElementById("monthly").textContent = formatMoney(monthly);
        document.getElementById("totalInterest").textContent = formatMoney(totalInterest);
        document.getElementById("totalPayment").textContent = formatMoney(totalPayment);

        // Save to localStorage
        saveState();
      }

      // ============================================
      // Theme Management
      // ============================================
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
      // State Persistence
      // ============================================
      const LS_KEY = "loan-calculator-state";

      function saveState() {
        const state = {
          principal: document.getElementById("principal").value,
          rate: document.getElementById("rate").value,
          years: document.getElementById("years").value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(state));
      }

      function loadState() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const state = JSON.parse(saved);
            if (state.principal) document.getElementById("principal").value = state.principal;
            if (state.rate) document.getElementById("rate").value = state.rate;
            if (state.years) document.getElementById("years").value = state.years;
            calculate();
          }
        } catch (e) {
          // Ignore parse errors
        }
      }

      // ============================================
      // Event Listeners
      // ============================================
      document.querySelectorAll(".form-input").forEach((input) => {
        input.addEventListener("input", () => {
          calculate();
        });

        input.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            calculate();
          }
        });
      });

      // Listen for system theme changes
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
        }
      });

      // ============================================
      // Initialize
      // ============================================
      initTheme();
      loadState();
    
