// @ts-nocheck
// Generated from tools/calculator/bmi-calculator.html
// Source SHA-256: 6344914df8cf034c3d179c61679ea6b60337159ceeef722280175d3e45ec67f4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Elements
      // ============================================
      const heightInput = document.getElementById("height");
      const heightUnitSelect = document.getElementById("heightUnit");
      const weightInput = document.getElementById("weight");
      const weightUnitSelect = document.getElementById("weightUnit");
      const calculateBtn = document.getElementById("calculateBtn");
      const statusEl = document.getElementById("status");
      const resultCard = document.getElementById("resultCard");
      const bmiValueEl = document.getElementById("bmiValue");
      const bmiStatusEl = document.getElementById("bmiStatus");
      const bmiMarkerEl = document.getElementById("bmiMarker");

      // ============================================
      // Unit Conversion
      // ============================================
      function convertHeightToCm(value, unit) {
        switch (unit) {
          case "m":
            return value * 100;
          case "in":
            return value * 2.54;
          case "cm":
          default:
            return value;
        }
      }

      function convertWeightToKg(value, unit) {
        switch (unit) {
          case "lb":
            return value * 0.453592;
          case "kg":
          default:
            return value;
        }
      }

      // ============================================
      // BMI Calculation
      // ============================================
      function getBMIStatus(bmi) {
        if (bmi < 18.5) {
          return { label: "偏瘦", class: "underweight" };
        } else if (bmi < 24) {
          return { label: "正常体重", class: "normal" };
        } else if (bmi < 28) {
          return { label: "偏胖", class: "overweight" };
        } else if (bmi < 32) {
          return { label: "肥胖", class: "obese" };
        } else {
          return { label: "重度肥胖", class: "severely-obese" };
        }
      }

      function calculateBMI() {
        const heightValue = parseFloat(heightInput.value);
        const weightValue = parseFloat(weightInput.value);

        if (!heightValue || !weightValue || heightValue <= 0 || weightValue <= 0) {
          resultCard.style.display = "none";
          showStatus("请输入有效的身高和体重", "error");
          return;
        }

        // Convert to cm and kg
        const heightCm = convertHeightToCm(heightValue, heightUnitSelect.value);
        const weightKg = convertWeightToKg(weightValue, weightUnitSelect.value);

        // Convert cm to meters for BMI calculation
        const heightM = heightCm / 100;

        // Calculate BMI
        const bmi = weightKg / (heightM * heightM);

        // Display result
        bmiValueEl.textContent = bmi.toFixed(1);

        const status = getBMIStatus(bmi);
        bmiStatusEl.textContent = status.label;
        bmiStatusEl.className = "bmi-status " + status.class;

        // Update marker position (scaled from 0-50 BMI)
        const percent = Math.min(Math.max((bmi / 50) * 100, 0), 100);
        bmiMarkerEl.style.left = percent + "%";

        resultCard.style.display = "block";
        showStatus("计算成功", "success");
      }

      function showStatus(message, type) {
        statusEl.textContent = message;
        statusEl.className = "status " + (type || "");
      }

      // ============================================
      // Event Handlers
      // ============================================
      calculateBtn.addEventListener("click", calculateBMI);
      heightInput.addEventListener("input", calculateBMI);
      heightInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") calculateBMI();
      });
      weightInput.addEventListener("input", calculateBMI);
      weightInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") calculateBMI();
      });
      heightUnitSelect.addEventListener("change", calculateBMI);
      weightUnitSelect.addEventListener("change", calculateBMI);

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
      calculateBMI();
    
