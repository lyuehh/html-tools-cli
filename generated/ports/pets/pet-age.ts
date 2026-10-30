// @ts-nocheck
// Generated from tools/pets/pet-age.html
// Source SHA-256: c73d89a199ed4b8876326acaa058e53007834f789013788c19261bf089554d71
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentPet = "dog";
      let currentSize = "small";

      const petEmojis = {
        dog: "🐕",
        cat: "🐱",
        rabbit: "🐰",
        hamster: "🐹"
      };

      // Age conversion formulas
      const ageConversions = {
        dog: {
          small: (age) => {
            if (age <= 1) return age * 15;
            if (age <= 2) return 15 + (age - 1) * 9;
            return 24 + (age - 2) * 4;
          },
          medium: (age) => {
            if (age <= 1) return age * 15;
            if (age <= 2) return 15 + (age - 1) * 9;
            return 24 + (age - 2) * 5;
          },
          large: (age) => {
            if (age <= 1) return age * 15;
            if (age <= 2) return 15 + (age - 1) * 9;
            return 24 + (age - 2) * 6;
          }
        },
        cat: {
          all: (age) => {
            if (age <= 1) return age * 15;
            if (age <= 2) return 15 + (age - 1) * 9;
            return 24 + (age - 2) * 4;
          }
        },
        rabbit: {
          all: (age) => {
            if (age <= 1) return age * 20;
            return 20 + (age - 1) * 8;
          }
        },
        hamster: {
          all: (age) => {
            return age * 25;
          }
        }
      };

      const lifespans = {
        dog: { small: 15, medium: 12, large: 10 },
        cat: { all: 15 },
        rabbit: { all: 10 },
        hamster: { all: 3 }
      };

      const tips = {
        dog: {
          puppy: "幼犬期需要充足营养、定期疫苗接种和社会化训练。",
          young: "青年期精力旺盛，需要充足运动和训练。",
          adult: "成年期保持规律运动和均衡饮食，定期体检。",
          senior: "老年期注意关节保护，减少剧烈运动，增加体检频率。"
        },
        cat: {
          puppy: "幼猫期需要高蛋白饮食、疫苗接种和适应新环境。",
          young: "青年期活跃好动，提供足够玩具和攀爬空间。",
          adult: "成年期注意体重控制，保持口腔健康。",
          senior: "老年期关注肾脏健康，提供安静舒适环境。"
        },
        rabbit: {
          puppy: "幼兔需要干净饮水、新鲜草料和安全活动空间。",
          young: "青年期可以开始训练和社交。",
          adult: "成年期保持饮食规律，定期修剪指甲。",
          senior: "老年期注意消化健康，提供易消化食物。"
        },
        hamster: {
          puppy: "幼鼠需要安静环境适应，提供藏身处。",
          young: "青年期活跃，需要跑轮等运动设施。",
          adult: "成年期保持笼舍清洁，饮食多样化。",
          senior: "老年期减少打扰，注意保暖。"
        }
      };

      function selectPet(pet) {
        currentPet = pet;
        document.querySelectorAll(".pet-option").forEach((el) => el.classList.remove("active"));
        event.target.closest(".pet-option").classList.add("active");

        // Show/hide size selector for dogs
        document.getElementById("dogSizeGroup").style.display = pet === "dog" ? "block" : "none";

        calculate();
      }

      function selectSize(size) {
        currentSize = size;
        document.querySelectorAll(".size-option").forEach((el) => el.classList.remove("active"));
        event.target.classList.add("active");
        calculate();
      }

      function getHumanAge(petAge) {
        if (currentPet === "dog") {
          return ageConversions.dog[currentSize](petAge);
        } else {
          return ageConversions[currentPet].all(petAge);
        }
      }

      function getLifeStage(petAge) {
        const humanAge = getHumanAge(petAge);
        if (humanAge < 18) return "puppy";
        if (humanAge < 30) return "young";
        if (humanAge < 60) return "adult";
        return "senior";
      }

      function getStageLabel(stage) {
        const labels = {
          puppy: "幼年期",
          young: "青年期",
          adult: "成年期",
          senior: "老年期"
        };
        return labels[stage];
      }

      function calculate() {
        const petAge = parseFloat(document.getElementById("petAge").value) || 0;
        const humanAge = Math.round(getHumanAge(petAge));
        const stage = getLifeStage(petAge);

        document.getElementById("resultPet").textContent = petEmojis[currentPet];
        document.getElementById("resultAge").textContent = humanAge + " 岁";
        document.getElementById("resultStage").textContent = getStageLabel(stage);
        document.getElementById("tipsText").textContent = tips[currentPet][stage];

        updateChart();
      }

      function updateChart() {
        const maxAge =
          currentPet === "dog" ? lifespans.dog[currentSize] : currentPet === "hamster" ? 3 : 15;
        const chart = document.getElementById("ageChart");
        chart.innerHTML = "";

        const ages = currentPet === "hamster" ? [0.5, 1, 1.5, 2, 2.5, 3] : [1, 2, 5, 8, 10, 12, 15];

        ages.forEach((age) => {
          if (age > maxAge) return;
          const humanAge = Math.round(getHumanAge(age));
          const percentage = Math.min(100, (humanAge / 100) * 100);

          const row = document.createElement("div");
          row.className = "chart-row";
          row.innerHTML = `
          <div class="chart-pet-age">${age} 岁</div>
          <div class="chart-bar">
            <div class="chart-fill" style="width: ${percentage}%"></div>
          </div>
          <div class="chart-human-age">${humanAge} 岁</div>
        `;
          chart.appendChild(row);
        });
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
    
