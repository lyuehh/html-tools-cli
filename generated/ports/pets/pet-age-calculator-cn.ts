// @ts-nocheck
// Generated from tools/pets/pet-age-calculator-cn.html
// Source SHA-256: 3c2a48be66041647c4aace2b840359a194203009636856149cb3551f68e4edd9
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentPet = "dog";

      function selectPet(pet) {
        currentPet = pet;
        document.querySelectorAll(".pet-btn").forEach((btn) => btn.classList.remove("active"));
        event.target.closest(".pet-btn").classList.add("active");

        // Show/hide dog size selector
        document.getElementById("dogSizeGroup").style.display = pet === "dog" ? "block" : "none";

        calculate();
      }

      function calculate() {
        const petAge = parseFloat(document.getElementById("petAge").value) || 0;
        const dogSize = document.getElementById("dogSize").value;

        let humanAge = 0;

        if (currentPet === "dog") {
          // Dog age calculation
          if (petAge <= 1) {
            humanAge = petAge * 15;
          } else if (petAge <= 2) {
            humanAge = 15 + (petAge - 1) * 9;
          } else {
            let yearlyRate = 4;
            if (dogSize === "small") yearlyRate = 4;
            else if (dogSize === "medium") yearlyRate = 5;
            else yearlyRate = 7;

            humanAge = 24 + (petAge - 2) * yearlyRate;
          }
        } else {
          // Cat age calculation
          if (petAge <= 1) {
            humanAge = petAge * 15;
          } else if (petAge <= 2) {
            humanAge = 15 + (petAge - 1) * 9;
          } else {
            humanAge = 24 + (petAge - 2) * 4;
          }
        }

        document.getElementById("humanAge").textContent = Math.round(humanAge);

        updateLifeStage(humanAge);
        updateComparisonTable();
      }

      function updateLifeStage(humanAge) {
        const stage = document.getElementById("lifeStage");
        let title, desc;

        if (humanAge < 18) {
          title = "幼年期";
          desc = "宠物还在成长发育阶段，需要充足的营养和训练";
        } else if (humanAge < 40) {
          title = "青年期";
          desc = "宠物正处于精力旺盛的黄金时期，活跃好动";
        } else if (humanAge < 60) {
          title = "中年期";
          desc = "宠物开始进入成熟稳重阶段，需要注意健康检查";
        } else if (humanAge < 75) {
          title = "老年期";
          desc = "宠物进入老年，需要更多关爱和医疗照顾";
        } else {
          title = "高龄期";
          desc = "宠物已经高龄，需要特别的照料和舒适的环境";
        }

        stage.innerHTML = `
        <div class="life-stage-title">生命阶段：${title}</div>
        <div class="life-stage-desc">${desc}</div>
      `;
      }

      function updateComparisonTable() {
        const container = document.getElementById("comparisonTable");
        const dogSize = document.getElementById("dogSize").value;

        let html = "";
        for (let age = 1; age <= 15; age++) {
          let humanAge = 0;

          if (currentPet === "dog") {
            if (age <= 1) {
              humanAge = age * 15;
            } else if (age <= 2) {
              humanAge = 15 + (age - 1) * 9;
            } else {
              let yearlyRate = dogSize === "small" ? 4 : dogSize === "medium" ? 5 : 7;
              humanAge = 24 + (age - 2) * yearlyRate;
            }
          } else {
            if (age <= 1) {
              humanAge = age * 15;
            } else if (age <= 2) {
              humanAge = 15 + (age - 1) * 9;
            } else {
              humanAge = 24 + (age - 2) * 4;
            }
          }

          html += `
          <div class="comparison-card">
            <div class="comparison-label">${currentPet === "dog" ? "🐕" : "🐈"} ${age} 岁</div>
            <div class="comparison-age">≈ ${Math.round(humanAge)}</div>
            <div class="comparison-label">人类年龄</div>
          </div>
        `;
        }

        container.innerHTML = html;
      }

      // Initialize
      calculate();

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
    
