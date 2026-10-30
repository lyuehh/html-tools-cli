// @ts-nocheck
// Generated from tools/education/grade-calculator.html
// Source SHA-256: c000f060abc58834e4c7d235307f542e2144bb8a392a00ae9036769c55f34aab
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let components = [];
      let componentId = 0;

      const presets = {
        exam: [
          { name: "平时成绩", weight: 30, score: 85 },
          { name: "期中考试", weight: 20, score: 80 },
          { name: "期末考试", weight: 50, score: 0 }
        ],
        homework: [
          { name: "作业", weight: 20, score: 90 },
          { name: "出勤", weight: 10, score: 100 },
          { name: "期中考试", weight: 30, score: 75 },
          { name: "期末考试", weight: 40, score: 0 }
        ],
        project: [
          { name: "小组项目", weight: 40, score: 88 },
          { name: "个人报告", weight: 25, score: 82 },
          { name: "课堂展示", weight: 20, score: 90 },
          { name: "参与度", weight: 15, score: 95 }
        ]
      };

      function init() {
        const saved = localStorage.getItem("grade_calc_data");
        if (saved) {
          try {
            const data = JSON.parse(saved);
            components = data.components || [];
            componentId = data.componentId || 0;
          } catch (e) {
            components = [];
          }
        }

        if (components.length === 0) {
          loadPreset("exam");
        } else {
          renderComponents();
          calculate();
        }
      }

      function loadPreset(type) {
        components = [];
        componentId = 0;
        presets[type].forEach((p) => {
          components.push({
            id: ++componentId,
            name: p.name,
            weight: p.weight,
            score: p.score
          });
        });
        renderComponents();
        calculate();
        saveData();
      }

      function addComponent() {
        components.push({
          id: ++componentId,
          name: "",
          weight: 10,
          score: 0
        });
        renderComponents();
        saveData();
      }

      function removeComponent(id) {
        components = components.filter((c) => c.id !== id);
        if (components.length === 0) {
          addComponent();
        } else {
          renderComponents();
          calculate();
          saveData();
        }
      }

      function renderComponents() {
        const container = document.getElementById("componentList");
        container.textContent = "";

        components.forEach((comp) => {
          const row = document.createElement("div");
          row.className = "component-row";

          const nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.placeholder = "组件名称";
          nameInput.value = comp.name;
          nameInput.oninput = function () {
            comp.name = this.value;
            saveData();
          };

          const weightInput = document.createElement("input");
          weightInput.type = "number";
          weightInput.placeholder = "权重%";
          weightInput.min = "0";
          weightInput.max = "100";
          weightInput.value = comp.weight;
          weightInput.oninput = function () {
            comp.weight = parseFloat(this.value) || 0;
            calculate();
            saveData();
          };

          const scoreInput = document.createElement("input");
          scoreInput.type = "number";
          scoreInput.placeholder = "分数";
          scoreInput.min = "0";
          scoreInput.max = "100";
          scoreInput.value = comp.score;
          scoreInput.oninput = function () {
            comp.score = parseFloat(this.value) || 0;
            calculate();
            saveData();
          };

          const pointsSpan = document.createElement("span");
          pointsSpan.style.cssText =
            "text-align: center; color: var(--text-secondary); font-size: 0.9rem;";
          const points = ((comp.weight * comp.score) / 100).toFixed(1);
          pointsSpan.textContent = points + "分";

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-danger";
          deleteBtn.textContent = "×";
          deleteBtn.onclick = function () {
            removeComponent(comp.id);
          };

          row.appendChild(nameInput);
          row.appendChild(weightInput);
          row.appendChild(scoreInput);
          row.appendChild(pointsSpan);
          row.appendChild(deleteBtn);
          container.appendChild(row);
        });
      }

      function calculate() {
        let totalWeight = 0;
        let weightedSum = 0;
        let completedWeight = 0;

        components.forEach((comp) => {
          totalWeight += comp.weight;
          if (comp.score > 0) {
            weightedSum += (comp.weight * comp.score) / 100;
            completedWeight += comp.weight;
          }
        });

        const finalGrade = completedWeight > 0 ? (weightedSum / completedWeight) * 100 : 0;
        const currentPoints = weightedSum;

        document.getElementById("finalGrade").textContent = finalGrade.toFixed(2);
        document.getElementById("totalWeight").textContent = completedWeight.toFixed(0) + "%";

        let letterGrade = "-";
        if (completedWeight > 0) {
          if (finalGrade >= 90) letterGrade = "A";
          else if (finalGrade >= 80) letterGrade = "B";
          else if (finalGrade >= 70) letterGrade = "C";
          else if (finalGrade >= 60) letterGrade = "D";
          else letterGrade = "F";
        }
        document.getElementById("letterGrade").textContent = letterGrade;

        const progressFill = document.getElementById("progressFill");
        const progressText = document.getElementById("progressText");
        progressFill.style.width = Math.min(finalGrade, 100) + "%";
        progressText.textContent = finalGrade.toFixed(1) + "%";

        const warning = document.getElementById("weightWarning");
        if (totalWeight !== 100) {
          warning.style.display = "block";
          warning.textContent = "⚠️ 权重总和为 " + totalWeight + "%，建议调整为100%";
        } else {
          warning.style.display = "none";
        }

        document.getElementById("remainingWeight").textContent = 100 - completedWeight + "%";
        calculateTarget();

        renderComponents();
      }

      function calculateTarget() {
        const targetGrade = parseFloat(document.getElementById("targetGrade").value) || 0;
        const resultDiv = document.getElementById("targetResult");

        let completedWeight = 0;
        let currentPoints = 0;

        components.forEach((comp) => {
          if (comp.score > 0) {
            currentPoints += (comp.weight * comp.score) / 100;
            completedWeight += comp.weight;
          }
        });

        const remainingWeight = 100 - completedWeight;

        if (remainingWeight <= 0) {
          resultDiv.textContent = "所有组件已完成评分";
          return;
        }

        const neededPoints = targetGrade - currentPoints;
        const neededAverage = (neededPoints / remainingWeight) * 100;

        if (neededAverage > 100) {
          resultDiv.textContent = "⚠️ 即使剩余部分全部得满分，也无法达到目标分数 " + targetGrade;
        } else if (neededAverage < 0) {
          resultDiv.textContent = "✅ 已达成目标！当前已获得 " + currentPoints.toFixed(1) + " 分";
        } else {
          resultDiv.textContent =
            "📌 要达到 " +
            targetGrade +
            " 分，剩余 " +
            remainingWeight +
            "% 权重需平均得 " +
            neededAverage.toFixed(1) +
            " 分";
        }
      }

      function clearAll() {
        components = [];
        componentId = 0;
        addComponent();
        calculate();
        saveData();
      }

      function saveData() {
        localStorage.setItem(
          "grade_calc_data",
          JSON.stringify({
            components: components,
            componentId: componentId
          })
        );
      }

      init();

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
    
