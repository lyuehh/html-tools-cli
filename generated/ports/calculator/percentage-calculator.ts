// @ts-nocheck
// Generated from tools/calculator/percentage-calculator.html
// Source SHA-256: 039f533b30b6baf1aa755af96c2854fc2a1e9a772ae195cca7e6fa57dab82d66
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Calculator Functions
      // ============================================
      function calc1() {
        const v = parseFloat(document.getElementById("v1").value) || 0;
        const p = parseFloat(document.getElementById("p1").value) || 0;
        const result = ((v * p) / 100).toFixed(2);
        document.getElementById("r1").textContent = result;
      }

      function calc2() {
        const v = parseFloat(document.getElementById("v2").value) || 0;
        const t = parseFloat(document.getElementById("t2").value) || 1;
        const result = ((v / t) * 100).toFixed(2);
        document.getElementById("r2").textContent = result;
      }

      function calc3() {
        const v = parseFloat(document.getElementById("v3").value) || 0;
        const p = parseFloat(document.getElementById("p3").value) || 0;
        const result = (v * (1 + p / 100)).toFixed(2);
        document.getElementById("r3").textContent = result;
      }

      function calc4() {
        const v1 = parseFloat(document.getElementById("v4").value) || 0;
        const v2 = parseFloat(document.getElementById("v5").value) || 0;
        if (v1 === 0) {
          document.getElementById("r4").textContent = "0%";
          return;
        }
        const change = (((v2 - v1) / v1) * 100).toFixed(2);
        const sign = change > 0 ? "+" : "";
        document.getElementById("r4").textContent = sign + change + "%";
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
      // Initialize
      // ============================================
      initTheme();
    
