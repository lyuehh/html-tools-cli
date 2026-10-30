// @ts-nocheck
// Generated from tools/health/macro-calculator.html
// Source SHA-256: 9c3d825a766ec44c4d897aca8fa722d15aa7d3e334effec610b8010b0e26720f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      /* ===== 宏量营养素计算器逻辑 ===== */

      // 预设比例定义：{ protein%, fat%, carb%, label }
      var PRESETS = {
        "standard-cut": { protein: 40, fat: 30, carb: 30, label: "标准减脂" },
        "low-carb": { protein: 35, fat: 45, carb: 20, label: "低碳饮食" },
        keto: { protein: 25, fat: 70, carb: 5, label: "生酮饮食" },
        "standard-maintain": { protein: 30, fat: 30, carb: 40, label: "标准维持" },
        "high-carb": { protein: 25, fat: 20, carb: 55, label: "高碳增肌" },
        zone: { protein: 30, fat: 30, carb: 40, label: "区间饮食" },
        custom: { protein: 30, fat: 30, carb: 40, label: "自定义" }
      };

      // 目标热量修正系数
      var GOAL_FACTOR = {
        cut: 0.8,
        maintain: 1.0,
        bulk: 1.1
      };

      var currentGoal = "cut";
      var currentResult = null;
      var LS_KEY = "macro_calc_v1";

      // DOM refs
      var inputTdee = document.getElementById("inputTdee");
      var selectPreset = document.getElementById("selectPreset");
      var selectMeals = document.getElementById("selectMeals");
      var customRatioBox = document.getElementById("customRatioBox");
      var customProteinEl = document.getElementById("customProtein");
      var customFatEl = document.getElementById("customFat");
      var customCarbEl = document.getElementById("customCarb");
      var ratioSumIndicator = document.getElementById("ratioSumIndicator");
      var resultEmpty = document.getElementById("resultEmpty");
      var resultPanel = document.getElementById("resultPanel");
      var statusMsg = document.getElementById("statusMsg");
      var ratioDisplay = document.getElementById("ratioDisplay");
      var presetTagEl = document.getElementById("presetTag");
      var ratioChipEl = document.getElementById("ratioChip");

      function showStatus(msg, type) {
        statusMsg.textContent = msg;
        statusMsg.className = "status " + (type || "");
      }

      function getRatio() {
        var preset = selectPreset.value;
        if (preset === "custom") {
          var p = parseInt(customProteinEl.value, 10) || 0;
          var f = parseInt(customFatEl.value, 10) || 0;
          var c = parseInt(customCarbEl.value, 10) || 0;
          return { protein: p, fat: f, carb: c };
        }
        var pr = PRESETS[preset];
        return { protein: pr.protein, fat: pr.fat, carb: pr.carb };
      }

      function updateRatioSum() {
        var r = getRatio();
        var sum = r.protein + r.fat + r.carb;
        ratioSumIndicator.textContent = sum + "%";
        if (sum === 100) {
          ratioSumIndicator.className = "ratio-sum-indicator ratio-sum-ok";
        } else {
          ratioSumIndicator.className = "ratio-sum-indicator ratio-sum-err";
        }
      }

      function calculate() {
        var tdee = parseFloat(inputTdee.value);
        if (!tdee || tdee < 800 || tdee > 6000) {
          showStatus("请输入有效的 TDEE（800 ~ 6000 千卡）", "error");
          return;
        }
        var ratio = getRatio();
        var sum = ratio.protein + ratio.fat + ratio.carb;
        if (sum !== 100) {
          showStatus("宏量比例合计必须等于 100%（当前 " + sum + "%）", "error");
          return;
        }

        var targetKcal = Math.round(tdee * GOAL_FACTOR[currentGoal]);
        // 蛋白质/碳水 4 kcal/g，脂肪 9 kcal/g
        var proteinKcal = Math.round(targetKcal * (ratio.protein / 100));
        var fatKcal = Math.round(targetKcal * (ratio.fat / 100));
        var carbKcal = targetKcal - proteinKcal - fatKcal;

        var proteinGrams = Math.round(proteinKcal / 4);
        var fatGrams = Math.round(fatKcal / 9);
        var carbGrams = Math.round(carbKcal / 4);

        var meals = parseInt(selectMeals.value, 10);

        currentResult = {
          tdee: tdee,
          goal: currentGoal,
          targetKcal: targetKcal,
          proteinG: proteinGrams,
          fatG: fatGrams,
          carbG: carbGrams,
          proteinKcal: proteinKcal,
          fatKcal: fatKcal,
          carbKcal: carbKcal,
          ratio: ratio,
          meals: meals
        };

        renderResult(currentResult);
        saveToStorage();
        showStatus("计算完成", "success");
      }

      function renderResult(r) {
        // 目标热量
        document.getElementById("resultCalories").textContent = r.targetKcal.toLocaleString();

        // 三宏
        document.getElementById("proteinG").textContent = r.proteinG;
        document.getElementById("fatG").textContent = r.fatG;
        document.getElementById("carbG").textContent = r.carbG;
        document.getElementById("proteinPct").textContent = r.ratio.protein + "% 热量";
        document.getElementById("fatPct").textContent = r.ratio.fat + "% 热量";
        document.getElementById("carbPct").textContent = r.ratio.carb + "% 热量";
        document.getElementById("proteinKcal").textContent = r.proteinKcal + " kcal";
        document.getElementById("fatKcal").textContent = r.fatKcal + " kcal";
        document.getElementById("carbKcal").textContent = r.carbKcal + " kcal";

        // 进度条
        document.getElementById("barProtein").style.width = r.ratio.protein + "%";
        document.getElementById("barFat").style.width = r.ratio.fat + "%";
        document.getElementById("barCarb").style.width = r.ratio.carb + "%";
        document.getElementById("barProteinLabel").innerHTML =
          "<strong>" + r.proteinG + "g</strong> · " + r.proteinKcal + " kcal";
        document.getElementById("barFatLabel").innerHTML =
          "<strong>" + r.fatG + "g</strong> · " + r.fatKcal + " kcal";
        document.getElementById("barCarbLabel").innerHTML =
          "<strong>" + r.carbG + "g</strong> · " + r.carbKcal + " kcal";

        // 每餐分配
        var tbody = document.getElementById("mealTableBody");
        tbody.innerHTML = "";
        var mealKcal = Math.round(r.targetKcal / r.meals);
        var mealP = Math.round(r.proteinG / r.meals);
        var mealF = Math.round(r.fatG / r.meals);
        var mealC = Math.round(r.carbG / r.meals);
        for (var i = 1; i <= r.meals; i++) {
          var tr = document.createElement("tr");
          tr.innerHTML =
            "<td>第 " +
            i +
            " 餐</td><td>" +
            mealKcal +
            " kcal</td><td>" +
            mealP +
            " g</td><td>" +
            mealF +
            " g</td><td>" +
            mealC +
            " g</td>";
          tbody.appendChild(tr);
        }

        // 预设标签
        var presetKey = selectPreset.value;
        var presetLabel =
          presetKey === "custom"
            ? "自定义"
            : (PRESETS[presetKey] && PRESETS[presetKey].label) || "";
        presetTagEl.textContent = presetLabel;
        ratioChipEl.textContent =
          "P" + r.ratio.protein + " / F" + r.ratio.fat + " / C" + r.ratio.carb;

        // 显示结果
        resultEmpty.style.display = "none";
        resultPanel.classList.add("show");
        ratioDisplay.style.display = "flex";
      }

      function reset() {
        inputTdee.value = "";
        selectPreset.value = "standard-cut";
        selectMeals.value = "3";
        customRatioBox.style.display = "none";
        currentGoal = "cut";
        document.querySelectorAll(".goal-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.goal === "cut");
        });
        resultEmpty.style.display = "";
        resultPanel.classList.remove("show");
        ratioDisplay.style.display = "none";
        statusMsg.textContent = "";
        statusMsg.className = "status";
        currentResult = null;
        localStorage.removeItem(LS_KEY);
      }

      function copyResult() {
        if (!currentResult) {
          showStatus("没有可复制的结果", "error");
          return;
        }
        var r = currentResult;
        var goalLabels = { cut: "减脂", maintain: "维持", bulk: "增肌" };
        var lines = [
          "【宏量营养素计算结果】",
          "TDEE: " + r.tdee + " kcal | 目标: " + goalLabels[r.goal],
          "目标热量: " + r.targetKcal + " kcal/天",
          "",
          "蛋白质: " + r.proteinG + "g（" + r.proteinKcal + " kcal，" + r.ratio.protein + "%）",
          "脂肪:   " + r.fatG + "g（" + r.fatKcal + " kcal，" + r.ratio.fat + "%）",
          "碳水:   " + r.carbG + "g（" + r.carbKcal + " kcal，" + r.ratio.carb + "%）",
          "",
          "每餐（共 " +
            r.meals +
            " 餐）: " +
            Math.round(r.targetKcal / r.meals) +
            " kcal | P" +
            Math.round(r.proteinG / r.meals) +
            "g F" +
            Math.round(r.fatG / r.meals) +
            "g C" +
            Math.round(r.carbG / r.meals) +
            "g"
        ];
        navigator.clipboard
          .writeText(lines.join("\n"))
          .then(function () {
            showStatus("已复制到剪贴板", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      }

      function saveToStorage() {
        if (!currentResult) return;
        var state = {
          tdee: inputTdee.value,
          goal: currentGoal,
          preset: selectPreset.value,
          meals: selectMeals.value,
          customP: customProteinEl.value,
          customF: customFatEl.value,
          customC: customCarbEl.value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(state));
      }

      function loadFromStorage() {
        try {
          var raw = localStorage.getItem(LS_KEY);
          if (!raw) return;
          var state = JSON.parse(raw);
          if (state.tdee) inputTdee.value = state.tdee;
          if (state.goal) {
            currentGoal = state.goal;
            document.querySelectorAll(".goal-btn").forEach(function (btn) {
              btn.classList.toggle("active", btn.dataset.goal === state.goal);
            });
          }
          if (state.preset) {
            selectPreset.value = state.preset;
            if (state.preset === "custom") {
              customRatioBox.style.display = "block";
            }
          }
          if (state.meals) selectMeals.value = state.meals;
          if (state.customP) customProteinEl.value = state.customP;
          if (state.customF) customFatEl.value = state.customF;
          if (state.customC) customCarbEl.value = state.customC;
          if (state.tdee) calculate();
        } catch (e) {
          // ignore corrupt storage
        }
      }

      // 目标按钮绑定
      document.querySelectorAll(".goal-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          currentGoal = btn.dataset.goal;
          document.querySelectorAll(".goal-btn").forEach(function (b) {
            b.classList.remove("active");
          });
          btn.classList.add("active");
        });
      });

      // 预设切换
      selectPreset.addEventListener("change", function () {
        if (selectPreset.value === "custom") {
          customRatioBox.style.display = "block";
          updateRatioSum();
        } else {
          customRatioBox.style.display = "none";
        }
      });

      // 自定义比例实时检查
      [customProteinEl, customFatEl, customCarbEl].forEach(function (el) {
        el.addEventListener("input", updateRatioSum);
      });

      // 按钮
      document.getElementById("btnCalculate").addEventListener("click", calculate);
      document.getElementById("btnReset").addEventListener("click", reset);
      document.getElementById("btnCopy").addEventListener("click", copyResult);

      // Enter 键触发计算
      inputTdee.addEventListener("keydown", function (e) {
        if (e.key === "Enter") calculate();
      });

      // 初始化
      loadFromStorage();

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
    
