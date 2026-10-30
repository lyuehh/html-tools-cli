// @ts-nocheck
// Generated from tools/life/date-diff.html
// Source SHA-256: 42429817e7831f5c607c2afe5ffcf2f44c5d77bc6e0db84629d0ef972acff18c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let direction = "after";

      // 初始化日期
      function init() {
        const today = new Date().toISOString().split("T")[0];
        document.getElementById("startDate").value = today;
        document.getElementById("endDate").value = today;
        document.getElementById("baseDate").value = today;
      }

      function switchTab(tab) {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));

        if (tab === "diff") {
          document.querySelector(".tab:nth-child(1)").classList.add("active");
          document.getElementById("diffPanel").classList.add("active");
        } else {
          document.querySelector(".tab:nth-child(2)").classList.add("active");
          document.getElementById("calcPanel").classList.add("active");
        }

        document.getElementById("resultContainer").innerHTML = "";
      }

      function setQuickDate(field, type) {
        const today = new Date();
        let date;

        switch (type) {
          case "today":
            date = today;
            break;
          case "year-start":
            date = new Date(today.getFullYear(), 0, 1);
            break;
          case "year-end":
            date = new Date(today.getFullYear(), 11, 31);
            break;
          case "month-start":
            date = new Date(today.getFullYear(), today.getMonth(), 1);
            break;
          case "month-end":
            date = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            break;
        }

        const dateStr = date.toISOString().split("T")[0];

        if (field === "start") {
          document.getElementById("startDate").value = dateStr;
        } else if (field === "end") {
          document.getElementById("endDate").value = dateStr;
        } else {
          document.getElementById("baseDate").value = dateStr;
        }
      }

      function swapDates() {
        const start = document.getElementById("startDate").value;
        const end = document.getElementById("endDate").value;
        document.getElementById("startDate").value = end;
        document.getElementById("endDate").value = start;
      }

      function setDirection(dir) {
        direction = dir;
        document.getElementById("dirAfter").classList.toggle("active", dir === "after");
        document.getElementById("dirBefore").classList.toggle("active", dir === "before");
      }

      function calculateDiff() {
        const start = new Date(document.getElementById("startDate").value);
        const end = new Date(document.getElementById("endDate").value);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          alert("请选择有效的日期");
          return;
        }

        const diffTime = Math.abs(end - start);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.floor(diffDays / 7);
        const diffMonths = monthDiff(start, end);
        const diffYears = Math.floor(diffMonths / 12);

        const hours = Math.floor(diffTime / (1000 * 60 * 60));
        const minutes = Math.floor(diffTime / (1000 * 60));
        const seconds = Math.floor(diffTime / 1000);

        // 计算详细的年月日
        const detailed = getDetailedDiff(start, end);

        const weekday = ["日", "一", "二", "三", "四", "五", "六"];

        document.getElementById("resultContainer").innerHTML = `
                <div class="result-card">
                    <div class="result-main">${diffDays}</div>
                    <div class="result-unit">天</div>
                    <div class="result-details">
                        <div class="detail-item">
                            <div class="detail-value">${diffWeeks}</div>
                            <div class="detail-label">周</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-value">${diffMonths}</div>
                            <div class="detail-label">月</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-value">${diffYears}</div>
                            <div class="detail-label">年</div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="info-section">
                        <div class="info-row">
                            <span class="info-label">详细时间差</span>
                            <span class="info-value">${detailed}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">总小时数</span>
                            <span class="info-value">${hours.toLocaleString()} 小时</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">总分钟数</span>
                            <span class="info-value">${minutes.toLocaleString()} 分钟</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">总秒数</span>
                            <span class="info-value">${seconds.toLocaleString()} 秒</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">开始日期</span>
                            <span class="info-value">${formatDate(start)} 周${weekday[start.getDay()]}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">结束日期</span>
                            <span class="info-value">${formatDate(end)} 周${weekday[end.getDay()]}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">工作日天数</span>
                            <span class="info-value">${countWorkdays(start, end)} 天</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">周末天数</span>
                            <span class="info-value">${diffDays - countWorkdays(start, end)} 天</span>
                        </div>
                    </div>
                </div>
            `;
      }

      function calculateDate() {
        const base = new Date(document.getElementById("baseDate").value);
        const value = parseInt(document.getElementById("intervalValue").value) || 0;
        const unit = document.getElementById("intervalUnit").value;

        if (isNaN(base.getTime())) {
          alert("请选择有效的基准日期");
          return;
        }

        let result = new Date(base);
        const multiplier = direction === "after" ? 1 : -1;

        switch (unit) {
          case "days":
            result.setDate(result.getDate() + value * multiplier);
            break;
          case "weeks":
            result.setDate(result.getDate() + value * 7 * multiplier);
            break;
          case "months":
            result.setMonth(result.getMonth() + value * multiplier);
            break;
          case "years":
            result.setFullYear(result.getFullYear() + value * multiplier);
            break;
        }

        const weekday = ["日", "一", "二", "三", "四", "五", "六"];
        const dirText = direction === "after" ? "之后" : "之前";
        const unitText = { days: "天", weeks: "周", months: "月", years: "年" };

        document.getElementById("resultContainer").innerHTML = `
                <div class="result-card">
                    <div class="result-date">
                        <div class="result-date-label">${formatDate(base)} ${dirText} ${value} ${unitText[unit]}</div>
                        <div class="result-date-value">${formatDate(result)} 周${weekday[result.getDay()]}</div>
                    </div>
                </div>
                <div class="card">
                    <div class="info-section">
                        <div class="info-row">
                            <span class="info-label">基准日期</span>
                            <span class="info-value">${formatDate(base)} 周${weekday[base.getDay()]}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">计算结果</span>
                            <span class="info-value">${formatDate(result)} 周${weekday[result.getDay()]}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">距今天</span>
                            <span class="info-value">${getDaysFromToday(result)}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">是否周末</span>
                            <span class="info-value">${result.getDay() === 0 || result.getDay() === 6 ? "是" : "否"}</span>
                        </div>
                    </div>
                </div>
            `;
      }

      function monthDiff(start, end) {
        const d1 = start < end ? start : end;
        const d2 = start < end ? end : start;
        return (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth();
      }

      function getDetailedDiff(start, end) {
        const d1 = start < end ? new Date(start) : new Date(end);
        const d2 = start < end ? new Date(end) : new Date(start);

        let years = d2.getFullYear() - d1.getFullYear();
        let months = d2.getMonth() - d1.getMonth();
        let days = d2.getDate() - d1.getDate();

        if (days < 0) {
          months--;
          const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
          days += prevMonth.getDate();
        }

        if (months < 0) {
          years--;
          months += 12;
        }

        const parts = [];
        if (years > 0) parts.push(`${years}年`);
        if (months > 0) parts.push(`${months}月`);
        if (days > 0) parts.push(`${days}天`);

        return parts.length > 0 ? parts.join(" ") : "0天";
      }

      function countWorkdays(start, end) {
        const d1 = start < end ? start : end;
        const d2 = start < end ? end : start;

        let count = 0;
        const current = new Date(d1);

        while (current <= d2) {
          const day = current.getDay();
          if (day !== 0 && day !== 6) {
            count++;
          }
          current.setDate(current.getDate() + 1);
        }

        return count;
      }

      function formatDate(date) {
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      }

      function getDaysFromToday(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

        const diff = Math.floor((date - today) / (1000 * 60 * 60 * 24));

        if (diff === 0) return "今天";
        if (diff === 1) return "明天";
        if (diff === -1) return "昨天";
        if (diff > 0) return `${diff}天后`;
        return `${Math.abs(diff)}天前`;
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
    
