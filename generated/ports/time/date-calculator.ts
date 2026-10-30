// @ts-nocheck
// Generated from tools/time/date-calculator.html
// Source SHA-256: b3b0979506db49089159ab8488719d7fb0635e0c1921e09ba7f089f966bc3a94
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var diffStart = document.getElementById("diffStart");
      var diffEnd = document.getElementById("diffEnd");
      var addStart = document.getElementById("addStart");
      var addDays = document.getElementById("addDays");
      var workStart = document.getElementById("workStart");
      var workEnd = document.getElementById("workEnd");

      // 切换标签
      window.switchTab = function (tabName) {
        document.querySelectorAll(".tab").forEach(function (tab) {
          tab.classList.remove("active");
        });
        document.querySelectorAll(".panel").forEach(function (panel) {
          panel.classList.remove("active");
        });

        document.querySelector('.tab[data-tab="' + tabName + '"]').classList.add("active");
        document.getElementById("panel-" + tabName).classList.add("active");
      };

      // 格式化日期为 YYYY-MM-DD
      function formatDate(date) {
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, "0");
        var day = String(date.getDate()).padStart(2, "0");
        return year + "-" + month + "-" + day;
      }

      // 格式化日期为中文
      function formatDateCN(date) {
        return (
          date.getFullYear() +
          "年" +
          (date.getMonth() + 1) +
          "月" +
          date.getDate() +
          "日 " +
          ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][date.getDay()]
        );
      }

      // 设置今天
      window.setToday = function (inputId) {
        document.getElementById(inputId).value = formatDate(new Date());
      };

      // 快速日期设置
      window.setQuickDate = function (mode, type) {
        var today = new Date();
        var year = today.getFullYear();

        if (type === "today") {
          diffStart.value = formatDate(today);
          diffEnd.value = formatDate(today);
        } else if (type === "year-start") {
          diffStart.value = year + "-01-01";
          diffEnd.value = formatDate(today);
        } else if (type === "year-end") {
          diffStart.value = formatDate(today);
          diffEnd.value = year + "-12-31";
        } else if (type === "birthday") {
          diffEnd.value = formatDate(today);
        }

        calculateDiff();
      };

      // 设置推算天数
      window.setAddDays = function (days) {
        addDays.value = days;
        if (!addStart.value) {
          addStart.value = formatDate(new Date());
        }
        calculateAdd();
      };

      // 交换日期
      window.swapDates = function () {
        var temp = diffStart.value;
        diffStart.value = diffEnd.value;
        diffEnd.value = temp;
        calculateDiff();
      };

      // 计算日期差
      function calculateDiff() {
        var start = new Date(diffStart.value);
        var end = new Date(diffEnd.value);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          return;
        }

        var diffTime = Math.abs(end - start);
        var diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        var diffWeeks = Math.floor(diffDays / 7);

        // 计算月份和年份差异
        var years = end.getFullYear() - start.getFullYear();
        var months = end.getMonth() - start.getMonth();
        var days = end.getDate() - start.getDate();

        if (days < 0) {
          months--;
          var prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
          days += prevMonth.getDate();
        }
        if (months < 0) {
          years--;
          months += 12;
        }

        document.getElementById("diffDays").textContent = diffDays;
        document.getElementById("diffWeeks").textContent = diffWeeks;
        document.getElementById("diffMonths").textContent = years * 12 + months;
        document.getElementById("diffYears").textContent = (diffDays / 365).toFixed(2);

        var detail = formatDateCN(start) + " 到 " + formatDateCN(end) + "：";
        if (years > 0) {
          detail += years + "年";
        }
        if (months > 0) {
          detail += months + "个月";
        }
        if (days > 0) {
          detail += days + "天";
        }
        if (years === 0 && months === 0 && days === 0) {
          detail += "同一天";
        }

        document.getElementById("diffDetail").textContent = detail;
        document.getElementById("diffResult").style.display = "block";

        saveState();
      }

      // 计算日期推算
      function calculateAdd() {
        var start = new Date(addStart.value);
        var days = parseInt(addDays.value);

        if (isNaN(start.getTime()) || isNaN(days)) {
          return;
        }

        var result = new Date(start);
        result.setDate(result.getDate() + days);

        var direction = days >= 0 ? "后" : "前";
        var detail =
          formatDateCN(start) +
          " " +
          direction +
          " " +
          Math.abs(days) +
          " 天是：" +
          formatDateCN(result);

        document.getElementById("addDetail").textContent = detail;
        document.getElementById("addResult").style.display = "block";

        saveState();
      }

      // 计算工作日
      function calculateWorkdays() {
        var start = new Date(workStart.value);
        var end = new Date(workEnd.value);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          return;
        }

        // 确保 start <= end
        if (start > end) {
          var temp = start;
          start = end;
          end = temp;
        }

        var workdays = 0;
        var weekends = 0;
        var current = new Date(start);

        while (current <= end) {
          var dayOfWeek = current.getDay();
          if (dayOfWeek === 0 || dayOfWeek === 6) {
            weekends++;
          } else {
            workdays++;
          }
          current.setDate(current.getDate() + 1);
        }

        var total = workdays + weekends;

        document.getElementById("workDays").textContent = workdays;
        document.getElementById("weekendDays").textContent = weekends;
        document.getElementById("totalDays").textContent = total;
        document.getElementById("workResult").style.display = "block";

        saveState();
      }

      // URL 状态持久化
      function saveState() {
        var state = {
          tab: document.querySelector(".tab.active").dataset.tab,
          diffStart: diffStart.value,
          diffEnd: diffEnd.value,
          addStart: addStart.value,
          addDays: addDays.value,
          workStart: workStart.value,
          workEnd: workEnd.value
        };
        try {
          var hash = btoa(encodeURIComponent(JSON.stringify(state)));
          history.replaceState(null, "", "#" + hash);
        } catch (e) {
          console.error("保存状态失败:", e);
        }
      }

      function loadState() {
        var hash = window.location.hash.slice(1);
        if (hash) {
          try {
            var state = JSON.parse(decodeURIComponent(atob(hash)));
            if (state.tab) switchTab(state.tab);
            if (state.diffStart) diffStart.value = state.diffStart;
            if (state.diffEnd) diffEnd.value = state.diffEnd;
            if (state.addStart) addStart.value = state.addStart;
            if (state.addDays) addDays.value = state.addDays;
            if (state.workStart) workStart.value = state.workStart;
            if (state.workEnd) workEnd.value = state.workEnd;

            // 重新计算
            if (state.diffStart && state.diffEnd) calculateDiff();
            if (state.addStart && state.addDays) calculateAdd();
            if (state.workStart && state.workEnd) calculateWorkdays();
          } catch (e) {
            console.error("加载状态失败:", e);
            initDefaults();
          }
        } else {
          initDefaults();
        }
      }

      // 初始化默认值
      function initDefaults() {
        var today = formatDate(new Date());
        diffStart.value = today;
        diffEnd.value = today;
        addStart.value = today;
        workStart.value = today;
        workEnd.value = today;
      }

      // 初始化
      loadState();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
