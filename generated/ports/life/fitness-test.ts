// @ts-nocheck
// Generated from tools/life/fitness-test.html
// Source SHA-256: ed11a364f97d18c63bb17698aaf8a3ad41dce67becc46dd244ae0272a6b7d773
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 评分标准数据（简化版，实际应更详细）
      const standards = {
        // 大学男生标准
        college_male: {
          bmi: {
            weight: 15,
            ranges: [
              { min: 17.9, max: 23.9, score: 100 },
              { min: 17.0, max: 17.8, score: 80 },
              { min: 24.0, max: 27.9, score: 80 },
              { min: 16.0, max: 16.9, score: 60 },
              { min: 28.0, max: 29.9, score: 60 },
              { min: 0, max: 15.9, score: 50 },
              { min: 30.0, max: 999, score: 50 }
            ]
          },
          vitalCapacity: {
            weight: 15,
            unit: "ml/kg",
            ranges: [
              { min: 78, score: 100 },
              { min: 70, score: 86 },
              { min: 62, score: 72 },
              { min: 54, score: 58 },
              { min: 46, score: 44 },
              { min: 0, score: 30 }
            ]
          },
          run50: {
            weight: 20,
            unit: "秒",
            isLowerBetter: true,
            ranges: [
              { max: 6.7, score: 100 },
              { max: 6.9, score: 95 },
              { max: 7.1, score: 90 },
              { max: 7.3, score: 85 },
              { max: 7.5, score: 80 },
              { max: 7.7, score: 75 },
              { max: 7.9, score: 70 },
              { max: 8.1, score: 65 },
              { max: 8.3, score: 60 },
              { max: 9.1, score: 50 },
              { max: 999, score: 30 }
            ]
          },
          sitAndReach: {
            weight: 10,
            unit: "cm",
            ranges: [
              { min: 24.9, score: 100 },
              { min: 21.3, score: 86 },
              { min: 17.7, score: 72 },
              { min: 14.1, score: 58 },
              { min: 10.5, score: 44 },
              { min: -999, score: 30 }
            ]
          },
          standingJump: {
            weight: 10,
            unit: "cm",
            ranges: [
              { min: 273, score: 100 },
              { min: 256, score: 86 },
              { min: 238, score: 72 },
              { min: 220, score: 58 },
              { min: 202, score: 44 },
              { min: 0, score: 30 }
            ]
          },
          pullUp: {
            weight: 10,
            unit: "个",
            ranges: [
              { min: 19, score: 100 },
              { min: 16, score: 86 },
              { min: 12, score: 72 },
              { min: 8, score: 58 },
              { min: 5, score: 44 },
              { min: 0, score: 30 }
            ]
          },
          run1000: {
            weight: 20,
            unit: "分秒",
            isLowerBetter: true,
            isEndurance: true,
            ranges: [
              { max: 207, score: 100 }, // 3'27"
              { max: 217, score: 95 }, // 3'37"
              { max: 227, score: 90 }, // 3'47"
              { max: 237, score: 85 }, // 3'57"
              { max: 247, score: 80 }, // 4'07"
              { max: 257, score: 75 }, // 4'17"
              { max: 267, score: 70 }, // 4'27"
              { max: 277, score: 65 }, // 4'37"
              { max: 290, score: 60 }, // 4'50"
              { max: 330, score: 50 }, // 5'30"
              { max: 9999, score: 30 }
            ]
          }
        },
        // 大学女生标准
        college_female: {
          bmi: {
            weight: 15,
            ranges: [
              { min: 17.2, max: 23.9, score: 100 },
              { min: 16.5, max: 17.1, score: 80 },
              { min: 24.0, max: 27.9, score: 80 },
              { min: 15.8, max: 16.4, score: 60 },
              { min: 28.0, max: 29.9, score: 60 },
              { min: 0, max: 15.7, score: 50 },
              { min: 30.0, max: 999, score: 50 }
            ]
          },
          vitalCapacity: {
            weight: 15,
            unit: "ml/kg",
            ranges: [
              { min: 66, score: 100 },
              { min: 58, score: 86 },
              { min: 50, score: 72 },
              { min: 42, score: 58 },
              { min: 34, score: 44 },
              { min: 0, score: 30 }
            ]
          },
          run50: {
            weight: 20,
            unit: "秒",
            isLowerBetter: true,
            ranges: [
              { max: 7.5, score: 100 },
              { max: 7.7, score: 95 },
              { max: 8.0, score: 90 },
              { max: 8.3, score: 85 },
              { max: 8.6, score: 80 },
              { max: 8.9, score: 75 },
              { max: 9.2, score: 70 },
              { max: 9.5, score: 65 },
              { max: 9.8, score: 60 },
              { max: 10.6, score: 50 },
              { max: 999, score: 30 }
            ]
          },
          sitAndReach: {
            weight: 10,
            unit: "cm",
            ranges: [
              { min: 25.8, score: 100 },
              { min: 22.0, score: 86 },
              { min: 18.2, score: 72 },
              { min: 14.4, score: 58 },
              { min: 10.6, score: 44 },
              { min: -999, score: 30 }
            ]
          },
          standingJump: {
            weight: 10,
            unit: "cm",
            ranges: [
              { min: 207, score: 100 },
              { min: 193, score: 86 },
              { min: 178, score: 72 },
              { min: 163, score: 58 },
              { min: 148, score: 44 },
              { min: 0, score: 30 }
            ]
          },
          sitUp: {
            weight: 10,
            unit: "个/分钟",
            ranges: [
              { min: 56, score: 100 },
              { min: 48, score: 86 },
              { min: 40, score: 72 },
              { min: 32, score: 58 },
              { min: 24, score: 44 },
              { min: 0, score: 30 }
            ]
          },
          run800: {
            weight: 20,
            unit: "分秒",
            isLowerBetter: true,
            isEndurance: true,
            ranges: [
              { max: 198, score: 100 }, // 3'18"
              { max: 208, score: 95 }, // 3'28"
              { max: 218, score: 90 }, // 3'38"
              { max: 228, score: 85 }, // 3'48"
              { max: 238, score: 80 }, // 3'58"
              { max: 248, score: 75 }, // 4'08"
              { max: 258, score: 70 }, // 4'18"
              { max: 268, score: 65 }, // 4'28"
              { max: 280, score: 60 }, // 4'40"
              { max: 318, score: 50 }, // 5'18"
              { max: 9999, score: 30 }
            ]
          }
        }
      };

      // 测试项目配置
      const testItemsConfig = {
        male: [
          { id: "vitalCapacity", name: "肺活量", unit: "ml", icon: "🫁", weight: 15 },
          { id: "run50", name: "50米跑", unit: "秒", icon: "🏃", weight: 20 },
          { id: "sitAndReach", name: "坐位体前屈", unit: "cm", icon: "🧘", weight: 10 },
          { id: "standingJump", name: "立定跳远", unit: "cm", icon: "🦘", weight: 10 },
          { id: "pullUp", name: "引体向上", unit: "个", icon: "💪", weight: 10 },
          { id: "run1000", name: "1000米跑", unit: "", icon: "🏅", weight: 20, isTime: true }
        ],
        female: [
          { id: "vitalCapacity", name: "肺活量", unit: "ml", icon: "🫁", weight: 15 },
          { id: "run50", name: "50米跑", unit: "秒", icon: "🏃", weight: 20 },
          { id: "sitAndReach", name: "坐位体前屈", unit: "cm", icon: "🧘", weight: 10 },
          { id: "standingJump", name: "立定跳远", unit: "cm", icon: "🦘", weight: 10 },
          { id: "sitUp", name: "仰卧起坐", unit: "个/分", icon: "🤸", weight: 10 },
          { id: "run800", name: "800米跑", unit: "", icon: "🏅", weight: 20, isTime: true }
        ]
      };

      function updateTestItems() {
        const gender = document.getElementById("gender").value;
        const items = testItemsConfig[gender];
        const container = document.getElementById("testItems");

        container.innerHTML = items
          .map((item) => {
            if (item.isTime) {
              return `
                        <div class="test-item">
                            <div class="test-item-header">
                                <span class="test-item-name">${item.icon} ${item.name}</span>
                                <span class="test-item-weight">${item.weight}%</span>
                            </div>
                            <div class="test-item-input">
                                <input type="number" id="${item.id}_min" placeholder="分" min="0" max="30" style="width: 60px;">
                                <span class="unit">分</span>
                                <input type="number" id="${item.id}_sec" placeholder="秒" min="0" max="59" style="width: 60px;">
                                <span class="unit">秒</span>
                            </div>
                        </div>
                    `;
            }
            return `
                    <div class="test-item">
                        <div class="test-item-header">
                            <span class="test-item-name">${item.icon} ${item.name}</span>
                            <span class="test-item-weight">${item.weight}%</span>
                        </div>
                        <div class="test-item-input">
                            <input type="number" id="${item.id}" placeholder="输入成绩" step="0.1">
                            <span class="unit">${item.unit}</span>
                        </div>
                    </div>
                `;
          })
          .join("");
      }

      function getScore(value, ranges, isLowerBetter = false) {
        if (value === null || isNaN(value)) return { score: 0, grade: "未测" };

        for (const range of ranges) {
          if (isLowerBetter) {
            if (range.max !== undefined && value <= range.max) {
              return { score: range.score, grade: getGrade(range.score) };
            }
          } else {
            if (range.min !== undefined && range.max !== undefined) {
              if (value >= range.min && value <= range.max) {
                return { score: range.score, grade: getGrade(range.score) };
              }
            } else if (range.min !== undefined && value >= range.min) {
              return { score: range.score, grade: getGrade(range.score) };
            }
          }
        }
        return { score: 0, grade: "未测" };
      }

      function getGrade(score) {
        if (score >= 90) return "优秀";
        if (score >= 80) return "良好";
        if (score >= 60) return "及格";
        return "不及格";
      }

      function getGradeClass(grade) {
        switch (grade) {
          case "优秀":
            return "grade-excellent";
          case "良好":
            return "grade-good";
          case "及格":
            return "grade-pass";
          default:
            return "grade-fail";
        }
      }

      function calculate() {
        const gender = document.getElementById("gender").value;
        const height = parseFloat(document.getElementById("height").value);
        const weight = parseFloat(document.getElementById("weight").value);

        if (!height || !weight) {
          alert("请输入身高和体重");
          return;
        }

        // 获取标准（简化为大学标准）
        const standardKey = `college_${gender}`;
        const standard = standards[standardKey];

        const results = [];
        let totalWeightedScore = 0;
        let bmiPassed = true;
        let enduranceScore = 0;

        // 1. BMI计算
        const bmi = weight / (height / 100) ** 2;
        const bmiResult = getScore(bmi, standard.bmi.ranges);
        results.push({
          name: "BMI指数",
          value: bmi.toFixed(1),
          unit: "kg/m²",
          score: bmiResult.score,
          weight: standard.bmi.weight,
          grade: bmiResult.grade
        });
        totalWeightedScore += (bmiResult.score * standard.bmi.weight) / 100;
        if (bmiResult.score < 60) bmiPassed = false;

        // 2. 肺活量体重指数
        const vitalCapacity = parseFloat(document.getElementById("vitalCapacity")?.value);
        if (vitalCapacity) {
          const vitalIndex = vitalCapacity / weight;
          const vitalResult = getScore(vitalIndex, standard.vitalCapacity.ranges);
          results.push({
            name: "肺活量体重指数",
            value: vitalIndex.toFixed(0),
            unit: "ml/kg",
            score: vitalResult.score,
            weight: standard.vitalCapacity.weight,
            grade: vitalResult.grade
          });
          totalWeightedScore += (vitalResult.score * standard.vitalCapacity.weight) / 100;
        }

        // 3. 50米跑
        const run50 = parseFloat(document.getElementById("run50")?.value);
        if (run50) {
          const run50Result = getScore(run50, standard.run50.ranges, true);
          results.push({
            name: "50米跑",
            value: run50.toFixed(1),
            unit: "秒",
            score: run50Result.score,
            weight: standard.run50.weight,
            grade: run50Result.grade
          });
          totalWeightedScore += (run50Result.score * standard.run50.weight) / 100;
        }

        // 4. 坐位体前屈
        const sitAndReach = parseFloat(document.getElementById("sitAndReach")?.value);
        if (sitAndReach !== undefined && !isNaN(sitAndReach)) {
          const sitAndReachResult = getScore(sitAndReach, standard.sitAndReach.ranges);
          results.push({
            name: "坐位体前屈",
            value: sitAndReach.toFixed(1),
            unit: "cm",
            score: sitAndReachResult.score,
            weight: standard.sitAndReach.weight,
            grade: sitAndReachResult.grade
          });
          totalWeightedScore += (sitAndReachResult.score * standard.sitAndReach.weight) / 100;
        }

        // 5. 立定跳远
        const standingJump = parseFloat(document.getElementById("standingJump")?.value);
        if (standingJump) {
          const standingJumpResult = getScore(standingJump, standard.standingJump.ranges);
          results.push({
            name: "立定跳远",
            value: standingJump.toFixed(0),
            unit: "cm",
            score: standingJumpResult.score,
            weight: standard.standingJump.weight,
            grade: standingJumpResult.grade
          });
          totalWeightedScore += (standingJumpResult.score * standard.standingJump.weight) / 100;
        }

        // 6. 引体向上/仰卧起坐
        if (gender === "male") {
          const pullUp = parseFloat(document.getElementById("pullUp")?.value);
          if (pullUp !== undefined && !isNaN(pullUp)) {
            const pullUpResult = getScore(pullUp, standard.pullUp.ranges);
            results.push({
              name: "引体向上",
              value: pullUp,
              unit: "个",
              score: pullUpResult.score,
              weight: standard.pullUp.weight,
              grade: pullUpResult.grade
            });
            totalWeightedScore += (pullUpResult.score * standard.pullUp.weight) / 100;
          }
        } else {
          const sitUp = parseFloat(document.getElementById("sitUp")?.value);
          if (sitUp !== undefined && !isNaN(sitUp)) {
            const sitUpResult = getScore(sitUp, standard.sitUp.ranges);
            results.push({
              name: "仰卧起坐",
              value: sitUp,
              unit: "个/分钟",
              score: sitUpResult.score,
              weight: standard.sitUp.weight,
              grade: sitUpResult.grade
            });
            totalWeightedScore += (sitUpResult.score * standard.sitUp.weight) / 100;
          }
        }

        // 7. 1000米/800米跑
        const enduranceId = gender === "male" ? "run1000" : "run800";
        const enduranceStandard = gender === "male" ? standard.run1000 : standard.run800;
        const enduranceMin = parseInt(document.getElementById(`${enduranceId}_min`)?.value) || 0;
        const enduranceSec = parseInt(document.getElementById(`${enduranceId}_sec`)?.value) || 0;

        if (enduranceMin > 0 || enduranceSec > 0) {
          const totalSeconds = enduranceMin * 60 + enduranceSec;
          const enduranceResult = getScore(totalSeconds, enduranceStandard.ranges, true);
          enduranceScore = enduranceResult.score;

          results.push({
            name: gender === "male" ? "1000米跑" : "800米跑",
            value: `${enduranceMin}'${enduranceSec.toString().padStart(2, "0")}"`,
            unit: "",
            score: enduranceResult.score,
            weight: enduranceStandard.weight,
            grade: enduranceResult.grade
          });
          totalWeightedScore += (enduranceResult.score * enduranceStandard.weight) / 100;
        }

        // 计算加分
        let bonusScore = 0;
        if (document.getElementById("bonusEndurance").checked && enduranceScore >= 80) {
          bonusScore = enduranceScore >= 90 ? 20 : 10;
        }

        // 计算最终得分
        let finalScore = totalWeightedScore + bonusScore;

        // BMI不合格限制最高分
        if (!bmiPassed) {
          finalScore = Math.min(finalScore, 59);
        }

        finalScore = Math.min(120, Math.max(0, finalScore));

        // 显示结果
        document.getElementById("resultSection").classList.add("show");
        document.getElementById("totalScore").textContent = finalScore.toFixed(1);

        const finalGrade = getGrade(finalScore);
        const gradeElement = document.getElementById("totalGrade");
        gradeElement.textContent = finalGrade;
        gradeElement.className = `grade-badge ${getGradeClass(finalGrade)}`;

        // 更新总分卡片颜色
        const scoreCard = document.getElementById("totalScoreCard");
        if (finalScore >= 90) {
          scoreCard.style.background = `linear-gradient(135deg, ${getComputedStyle(document.documentElement).getPropertyValue("--excellent-color")}, #1e8449)`;
        } else if (finalScore >= 80) {
          scoreCard.style.background = `linear-gradient(135deg, ${getComputedStyle(document.documentElement).getPropertyValue("--good-color")}, #2471a3)`;
        } else if (finalScore >= 60) {
          scoreCard.style.background = `linear-gradient(135deg, ${getComputedStyle(document.documentElement).getPropertyValue("--pass-color")}, #d68910)`;
        } else {
          scoreCard.style.background = `linear-gradient(135deg, ${getComputedStyle(document.documentElement).getPropertyValue("--fail-color")}, #922b21)`;
        }

        // 渲染成绩表格
        const tableBody = document.getElementById("scoreTableBody");
        tableBody.innerHTML = results
          .map(
            (r) => `
                <tr>
                    <td class="item-name">${r.name}</td>
                    <td>${r.value} ${r.unit}</td>
                    <td class="score-cell">${r.score}</td>
                    <td>${r.weight}%</td>
                    <td><span class="grade-cell ${getGradeClass(r.grade)}">${r.grade}</span></td>
                </tr>
            `
          )
          .join("");

        if (bonusScore > 0) {
          tableBody.innerHTML += `
                    <tr>
                        <td class="item-name">耐力加分</td>
                        <td colspan="2">-</td>
                        <td class="score-cell" style="color: var(--success-color)">+${bonusScore}</td>
                        <td><span class="grade-cell grade-excellent">加分</span></td>
                    </tr>
                `;
        }

        // 滚动到结果
        document.getElementById("resultSection").scrollIntoView({ behavior: "smooth" });
      }

      // 初始化
      updateTestItems();

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
    
