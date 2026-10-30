// @ts-nocheck
// Generated from tools/calculator/date-calculator.html
// Source SHA-256: 8c1216ebb71ed6d636d2e4dc40ae767551b796e283f3bd0258007a3702ae7182
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const today = new Date().toISOString().split("T")[0];
      document.getElementById("startDate").value = today;
      document.getElementById("endDate").value = today;
      document.getElementById("baseDate").value = today;
      function calcDiff() {
        const start = new Date(document.getElementById("startDate").value);
        const end = new Date(document.getElementById("endDate").value);
        if (isNaN(start) || isNaN(end)) return;
        const diffTime = Math.abs(end - start);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(diffDays / 7);
        const remainDays = diffDays % 7;
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        document.getElementById("diffResult").innerHTML = `
                <div class="result-value">${diffDays} 天</div>
                <div class="result-detail">${weeks}周${remainDays}天 | 约${years}年${months}个月</div>
            `;
      }
      function calcDate() {
        const base = new Date(document.getElementById("baseDate").value);
        const days = parseInt(document.getElementById("days").value) || 0;
        const op = document.getElementById("operation").value;
        if (isNaN(base)) return;
        const result = new Date(base);
        if (op === "add") result.setDate(result.getDate() + days);
        else result.setDate(result.getDate() - days);
        const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
        document.getElementById("calcResult").innerHTML = `
                <div class="result-value">${result.toLocaleDateString("zh-CN")}</div>
                <div class="result-detail">星期${weekdays[result.getDay()]}</div>
            `;
      }
      document.getElementById("startDate").addEventListener("change", calcDiff);
      document.getElementById("endDate").addEventListener("change", calcDiff);
      document.getElementById("baseDate").addEventListener("change", calcDate);
      document.getElementById("operation").addEventListener("change", calcDate);
      document.getElementById("days").addEventListener("input", calcDate);
      calcDiff();
      calcDate();
    
