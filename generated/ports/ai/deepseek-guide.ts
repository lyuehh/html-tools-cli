// @ts-nocheck
// Generated from tools/ai/deepseek-guide.html
// Source SHA-256: ce40970e4b6b6144a9efe307d076cbf11c40bfcbf4b5e2fcdc7b4b957ead97ec
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // 加载保存的主题
      (function () {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      // Tab 切换
      window.showTab = function (tabId) {
        document.querySelectorAll(".tab-content").forEach((el) => el.classList.remove("active"));
        document.querySelectorAll(".tab-btn").forEach((el) => el.classList.remove("active"));

        document.getElementById(tabId).classList.add("active");
        event.target.classList.add("active");
      };

      // 复制代码
      window.copyCode = function (btn) {
        const pre = btn.closest(".card").querySelector("pre");
        const code = pre.textContent;

        navigator.clipboard.writeText(code).then(() => {
          const originalText = btn.textContent;
          btn.textContent = "已复制!";
          setTimeout(() => (btn.textContent = originalText), 2000);
        });
      };

      // 价格计算
      const pricing = {
        v3: { input: 1, output: 2 }, // 每百万 tokens (RMB)
        r1: { input: 4, output: 16 },
        coder: { input: 1, output: 2 }
      };

      function calculatePrice() {
        const model = document.getElementById("calcModel").value;
        const period = document.getElementById("calcPeriod").value;
        const inputTokens = parseFloat(document.getElementById("inputTokens").value) || 0;
        const outputTokens = parseFloat(document.getElementById("outputTokens").value) || 0;

        const prices = pricing[model];

        // 转换为百万 tokens (输入是万)
        const inputM = inputTokens / 100;
        const outputM = outputTokens / 100;

        let totalPerDay = inputM * prices.input + outputM * prices.output;
        let total = period === "month" ? totalPerDay * 30 : totalPerDay;

        document.getElementById("totalPrice").textContent = "¥" + total.toFixed(2);
        document.getElementById("priceDetail").textContent =
          `输入: ${inputTokens}万 × ¥${prices.input}/百万 + 输出: ${outputTokens}万 × ¥${prices.output}/百万` +
          (period === "month" ? " × 30天" : "");
      }

      // 初始化计算
      calculatePrice();
    
