// @ts-nocheck
// Generated from tools/pets/pet-age-calculator.html
// Source SHA-256: 768e77e10af86cb0225be6b0ad0f9dd205c007f00b064e28bcbbb670577cb2ea
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculateAge(petType, petAge) {
        let humanAge = 0;
        let detail = "";

        switch (petType) {
          case "dog":
            // First 2 years: 10.5 years each, then 4 years per year
            if (petAge <= 1) {
              humanAge = petAge * 15;
              detail = "幼犬期：1岁相当于人类15岁";
            } else if (petAge <= 2) {
              humanAge = 15 + (petAge - 1) * 9;
              detail = "青年犬：2岁相当于人类24岁";
            } else {
              humanAge = 24 + (petAge - 2) * 4;
              detail = "成年犬：每增加1岁相当于人类4岁";
            }
            break;

          case "cat":
            // First year: 15, second year: 24, then 4 years per year
            if (petAge <= 1) {
              humanAge = petAge * 15;
              detail = "幼猫期：1岁相当于人类15岁";
            } else if (petAge <= 2) {
              humanAge = 15 + (petAge - 1) * 9;
              detail = "青年猫：2岁相当于人类24岁";
            } else {
              humanAge = 24 + (petAge - 2) * 4;
              detail = "成年猫：每增加1岁相当于人类4岁";
            }
            break;

          case "rabbit":
            // Rabbits: ~8 years per year
            humanAge = petAge * 8;
            detail = "兔子的寿命通常为8-12年";
            break;

          case "hamster":
            // Hamsters: ~25 years per year
            humanAge = petAge * 25;
            detail = "仓鼠的寿命通常为2-3年";
            break;
        }

        return { humanAge: Math.round(humanAge), detail };
      }

      function calculate() {
        const petType = document.getElementById("petType").value;
        const petAge = parseFloat(document.getElementById("petAge").value);

        if (!petAge || petAge < 0) {
          alert("请输入有效的宠物年龄");
          return;
        }

        const result = calculateAge(petType, petAge);

        const icons = {
          dog: "🐕",
          cat: "🐈",
          rabbit: "🐰",
          hamster: "🐹"
        };

        document.getElementById("icon").textContent = icons[petType];
        document.getElementById("humanAge").textContent = result.humanAge;
        document.getElementById("humanAgeText").textContent = result.humanAge;
        document.getElementById("detail").textContent = result.detail;

        document.getElementById("resultCard").classList.add("show");
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
    
