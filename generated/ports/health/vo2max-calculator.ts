// @ts-nocheck
// Generated from tools/health/vo2max-calculator.html
// Source SHA-256: 8b4fa99db498a3ca4593f4ed79977edcc7f1634fe99614f2ad87d49129df9978
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var currentMethod = "cooper";
      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");
      var resultSection = document.getElementById("resultSection");
      var resultValue = document.getElementById("resultValue");
      var resultRating = document.getElementById("resultRating");
      var resultCategory = document.getElementById("resultCategory");
      var ratingFill = document.getElementById("ratingFill");

      /* ---------- 等级数据 ---------- */
      // 格式：[极差上限, 差上限, 一般上限, 良好上限, 优秀上限] → 超出为精英
      var NORMS = {
        male: {
          "20-29": [33, 37, 42, 47, 53],
          "30-39": [31, 35, 40, 45, 51],
          "40-49": [29, 33, 38, 43, 49],
          "50-59": [27, 31, 36, 41, 46],
          "60+": [24, 28, 32, 36, 41]
        },
        female: {
          "20-29": [25, 29, 34, 39, 45],
          "30-39": [23, 27, 32, 37, 43],
          "40-49": [21, 25, 30, 35, 41],
          "50-59": [19, 23, 28, 32, 37],
          "60+": [17, 21, 25, 29, 34]
        }
      };
      var GRADE_LABELS = ["极差", "差", "一般", "良好", "优秀", "精英"];
      var GRADE_COLORS = ["#f43f5e", "#ff9f1c", "#fbbf24", "#4cc9f0", "#10b981", "#00f5d4"];
      // Approximate percentile per grade
      var GRADE_PCTS = ["5%", "20%", "40%", "65%", "85%", "95%+"];

      function getAgeGroup(age) {
        if (age < 30) return "20-29";
        if (age < 40) return "30-39";
        if (age < 50) return "40-49";
        if (age < 60) return "50-59";
        return "60+";
      }

      function getRating(vo2, sex, age) {
        var grp = getAgeGroup(age);
        var thresholds = NORMS[sex][grp];
        for (var i = 0; i < thresholds.length; i++) {
          if (vo2 < thresholds[i]) return i;
        }
        return 5;
      }

      /* ---------- 计算逻辑 ---------- */
      function calcCooper() {
        var dist = parseFloat(document.getElementById("cooperDist").value);
        var age = parseFloat(document.getElementById("cooperAge").value);
        var sex = document.getElementById("cooperSex").value;
        if (!dist || dist < 500 || dist > 6000) {
          showStatus("请输入有效的跑步距离（500–6000 米）", "error");
          return null;
        }
        if (!age || age < 10 || age > 100) {
          showStatus("请输入有效的年龄（10–100）", "error");
          return null;
        }
        var vo2 = (dist - 504.9) / 44.73;
        return { vo2: vo2, sex: sex, age: age };
      }

      function calcHR() {
        var rhr = parseFloat(document.getElementById("hrResting").value);
        var age = parseFloat(document.getElementById("hrAge").value);
        var sex = document.getElementById("hrSex").value;
        if (!rhr || rhr < 30 || rhr > 120) {
          showStatus("请输入有效的静息心率（30–120 bpm）", "error");
          return null;
        }
        if (!age || age < 10 || age > 100) {
          showStatus("请输入有效的年龄（10–100）", "error");
          return null;
        }
        var maxHR = 220 - age;
        var vo2 = 15 * (maxHR / rhr);
        return { vo2: vo2, sex: sex, age: age };
      }

      function calcRockport() {
        var time = parseFloat(document.getElementById("rpTime").value);
        var hr = parseFloat(document.getElementById("rpHR").value);
        var weight = parseFloat(document.getElementById("rpWeight").value);
        var age = parseFloat(document.getElementById("rpAge").value);
        var sex = document.getElementById("rpSex").value;
        if (!time || time < 8 || time > 30) {
          showStatus("请输入有效的步行时间（8–30 分钟）", "error");
          return null;
        }
        if (!hr || hr < 50 || hr > 220) {
          showStatus("请输入有效的心率（50–220 bpm）", "error");
          return null;
        }
        if (!weight || weight < 20 || weight > 300) {
          showStatus("请输入有效的体重（20–300 kg）", "error");
          return null;
        }
        if (!age || age < 10 || age > 100) {
          showStatus("请输入有效的年龄（10–100）", "error");
          return null;
        }
        var weightLbs = weight * 2.20462;
        var genderFactor = sex === "male" ? 1 : 0;
        var vo2 =
          132.853 -
          0.0769 * weightLbs -
          0.3877 * age +
          6.315 * genderFactor -
          3.2649 * time -
          0.1565 * hr;
        return { vo2: vo2, sex: sex, age: age };
      }

      function calculate() {
        var res = null;
        if (currentMethod === "cooper") res = calcCooper();
        else if (currentMethod === "hr") res = calcHR();
        else res = calcRockport();

        if (!res) return;

        var vo2 = Math.max(0, res.vo2);
        var roundedVO2 = Math.round(vo2 * 10) / 10;
        var gradeIdx = getRating(vo2, res.sex, res.age);
        var gradeName = GRADE_LABELS[gradeIdx];
        var gradeColor = GRADE_COLORS[gradeIdx];
        var gradePct = GRADE_PCTS[gradeIdx];

        // 百分比 bar：映射 vo2 范围 15–80 → 0–100%
        var barPct = Math.min(100, Math.max(0, ((vo2 - 15) / 65) * 100));

        resultValue.textContent = roundedVO2.toFixed(1);
        resultValue.style.color = gradeColor;
        resultRating.textContent = gradeName;
        resultRating.style.color = gradeColor;
        resultCategory.textContent =
          "心肺适能评级 · " + (res.sex === "male" ? "男性" : "女性") + " · " + res.age + " 岁";
        ratingFill.style.width = barPct + "%";
        ratingFill.style.background =
          "linear-gradient(90deg, #f43f5e 0%, #fbbf24 40%, #10b981 70%, #00f5d4 100%)";

        // 高亮参考表对应行
        var rows = document.querySelectorAll("#referenceTable tbody tr");
        rows.forEach(function (row, idx) {
          row.classList.toggle("highlight", idx === gradeIdx);
        });

        resultSection.classList.add("show");
        statsEl.classList.add("show");
        document.getElementById("statVO2").textContent = roundedVO2.toFixed(1);
        document.getElementById("statGrade").textContent = gradeName;
        document.getElementById("statPct").textContent = gradePct;

        showStatus("计算完成", "success");
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function switchTab(method) {
        currentMethod = method;
        // Update tab buttons
        document.getElementById("tabCooper").classList.toggle("active", method === "cooper");
        document.getElementById("tabHR").classList.toggle("active", method === "hr");
        document.getElementById("tabRockport").classList.toggle("active", method === "rockport");
        // Show/hide input sections
        document.getElementById("sectionCooper").classList.toggle("active", method === "cooper");
        document.getElementById("sectionHR").classList.toggle("active", method === "hr");
        document
          .getElementById("sectionRockport")
          .classList.toggle("active", method === "rockport");
        // Hide previous result
        resultSection.classList.remove("show");
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
      }

      function resetAll() {
        document.querySelectorAll(".field-input").forEach(function (el) {
          el.value = "";
          el.classList.remove("has-error");
        });
        resultSection.classList.remove("show");
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
      }

      document.getElementById("tabCooper").onclick = function () {
        switchTab("cooper");
      };
      document.getElementById("tabHR").onclick = function () {
        switchTab("hr");
      };
      document.getElementById("tabRockport").onclick = function () {
        switchTab("rockport");
      };
      document.getElementById("btnCalc").onclick = calculate;
      document.getElementById("btnReset").onclick = resetAll;

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          calculate();
        }
      });

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
    
