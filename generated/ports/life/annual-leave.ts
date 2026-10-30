// @ts-nocheck
// Generated from tools/life/annual-leave.html
// Source SHA-256: 93022c84a39f0d8a49255ea5a13297c73a0d88b26d6ec1b18ffcc1a78bf83f91
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentMode = "standard";
      let inputMethod = "years";

      // 初始化日期
      document.addEventListener("DOMContentLoaded", () => {
        const today = new Date();
        const yearEnd = new Date(today.getFullYear(), 11, 31);
        const yearStart = new Date(today.getFullYear(), 0, 1);

        document.getElementById("calcDate").value = yearEnd.toISOString().split("T")[0];
        document.getElementById("yearEndDate").value = yearEnd.toISOString().split("T")[0];
        document.getElementById("yearStartDate").value = yearStart.toISOString().split("T")[0];
        document.getElementById("resignDate").value = today.toISOString().split("T")[0];
        document.getElementById("entryDate").value = today.toISOString().split("T")[0];
      });

      function switchMode(mode) {
        currentMode = mode;

        // 更新标签页状态
        document.querySelectorAll(".mode-tab").forEach((tab) => {
          tab.classList.toggle("active", tab.dataset.mode === mode);
        });

        // 显示/隐藏对应的输入区域
        document.getElementById("newEntrySection").classList.toggle("show", mode === "newEntry");
        document.getElementById("resignSection").classList.toggle("show", mode === "resign");
        document
          .getElementById("compensationSection")
          .classList.toggle("show", mode === "compensation");

        // 隐藏结果
        document.getElementById("resultSection").classList.remove("show");
      }

      function switchInputMethod(method) {
        inputMethod = method;

        document.querySelectorAll(".method-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.method === method);
        });

        document.getElementById("yearsInput").classList.toggle("show", method === "years");
        document.getElementById("dateInput").classList.toggle("show", method === "date");
      }

      function getWorkYears() {
        if (inputMethod === "years") {
          return parseFloat(document.getElementById("workYears").value) || 0;
        } else {
          const firstDate = new Date(document.getElementById("firstWorkDate").value);
          const calcDate = new Date(document.getElementById("calcDate").value);

          if (isNaN(firstDate.getTime()) || isNaN(calcDate.getTime())) {
            return 0;
          }

          const diffTime = calcDate.getTime() - firstDate.getTime();
          const diffDays = diffTime / (1000 * 60 * 60 * 24);
          return diffDays / 365;
        }
      }

      function getBaseLeaveDays(workYears) {
        if (workYears < 1) return 0;
        if (workYears < 10) return 5;
        if (workYears < 20) return 10;
        return 15;
      }

      function calculate() {
        const workYears = getWorkYears();
        const baseDays = getBaseLeaveDays(workYears);

        let resultDays = baseDays;
        let details = [];
        let showCompensation = false;

        details.push({ label: "累计工龄", value: workYears.toFixed(1) + " 年" });
        details.push({ label: "基准年假", value: baseDays + " 天" });

        switch (currentMode) {
          case "standard":
            resultDays = baseDays;
            break;

          case "newEntry": {
            const entryDate = new Date(document.getElementById("entryDate").value);
            const yearEndDate = new Date(document.getElementById("yearEndDate").value);

            if (isNaN(entryDate.getTime()) || isNaN(yearEndDate.getTime())) {
              alert("请填写正确的日期");
              return;
            }

            const remainingDays = Math.ceil((yearEndDate - entryDate) / (1000 * 60 * 60 * 24)) + 1;
            const yearDays = isLeapYear(entryDate.getFullYear()) ? 366 : 365;

            // 折算公式：(当年度剩余日历天数÷365天)×职工本人全年应享受的年休假天数
            resultDays = Math.floor((remainingDays / yearDays) * baseDays);

            details.push({ label: "入职日期", value: formatDate(entryDate) });
            details.push({ label: "当年剩余天数", value: remainingDays + " 天" });
            details.push({
              label: "折算比例",
              value: ((remainingDays / yearDays) * 100).toFixed(1) + "%"
            });
            break;
          }

          case "resign": {
            const yearStartDate = new Date(document.getElementById("yearStartDate").value);
            const resignDate = new Date(document.getElementById("resignDate").value);

            if (isNaN(yearStartDate.getTime()) || isNaN(resignDate.getTime())) {
              alert("请填写正确的日期");
              return;
            }

            const workedDays = Math.ceil((resignDate - yearStartDate) / (1000 * 60 * 60 * 24)) + 1;
            const yearDays = isLeapYear(resignDate.getFullYear()) ? 366 : 365;

            // 折算公式：(当年度已过日历天数÷365天)×职工本人全年应享受的年休假天数
            resultDays = Math.floor((workedDays / yearDays) * baseDays);

            details.push({ label: "起始日期", value: formatDate(yearStartDate) });
            details.push({ label: "离职日期", value: formatDate(resignDate) });
            details.push({ label: "当年已工作天数", value: workedDays + " 天" });
            details.push({
              label: "折算比例",
              value: ((workedDays / yearDays) * 100).toFixed(1) + "%"
            });
            break;
          }

          case "compensation": {
            const totalDays = parseFloat(document.getElementById("totalLeaveDays").value) || 0;
            const usedDays = parseFloat(document.getElementById("usedLeaveDays").value) || 0;
            const monthlySalary = parseFloat(document.getElementById("monthlySalary").value) || 0;

            const unusedDays = Math.max(0, totalDays - usedDays);
            resultDays = unusedDays;

            // 日工资 = 月工资 ÷ 21.75
            const dailySalary = monthlySalary / 21.75;
            // 补偿 = 未休天数 × 日工资 × 300%（包含正常工资，所以实际额外补偿是200%）
            const compensation = unusedDays * dailySalary * 2; // 额外补偿部分

            details.push({ label: "应休年假", value: totalDays + " 天" });
            details.push({ label: "已休年假", value: usedDays + " 天" });
            details.push({ label: "未休年假", value: unusedDays + " 天", highlight: true });

            if (monthlySalary > 0) {
              details.push({ label: "日工资", value: "¥" + dailySalary.toFixed(2) });
              showCompensation = true;
              document.getElementById("compensationValue").textContent =
                "¥" + compensation.toFixed(2);
            }
            break;
          }
        }

        // 显示结果
        document.getElementById("resultSection").classList.add("show");
        document.getElementById("resultValue").textContent = resultDays;

        const labelMap = {
          standard: "应休年假天数",
          newEntry: "当年可享年假（折算）",
          resign: "离职前应休年假（折算）",
          compensation: "未休年假天数"
        };
        document.getElementById("resultLabel").textContent = labelMap[currentMode];

        // 渲染详情
        const detailsHtml = details
          .map(
            (item) => `
                <div class="detail-item">
                    <span class="detail-label">${item.label}</span>
                    <span class="detail-value ${item.highlight ? "highlight" : ""}">${item.value}</span>
                </div>
            `
          )
          .join("");
        document.getElementById("resultDetails").innerHTML = detailsHtml;

        // 显示补偿结果
        document.getElementById("compensationResult").style.display = showCompensation
          ? "block"
          : "none";

        // 滚动到结果
        document.getElementById("resultSection").scrollIntoView({ behavior: "smooth" });
      }

      function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      }

      function formatDate(date) {
        return date.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
      }

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
    
