// @ts-nocheck
// Generated from tools/life/random-number.html
// Source SHA-256: 0d87256c4fb698cf67a4d79e66acde70d8718140338b89be4517141702068c9e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let history = [];
      let currentResult = "";

      function switchTab(tab) {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));

        document
          .querySelector(`.tab:nth-child(${tab === "number" ? 1 : tab === "dice" ? 2 : 3})`)
          .classList.add("active");
        document.getElementById(tab + "Panel").classList.add("active");
      }

      function setPreset(min, max) {
        document.getElementById("minValue").value = min;
        document.getElementById("maxValue").value = max;
        document.getElementById("countValue").value = 1;
        document.getElementById("decimalValue").value = 0;
      }

      function generateNumbers() {
        const min = parseFloat(document.getElementById("minValue").value);
        const max = parseFloat(document.getElementById("maxValue").value);
        const count = parseInt(document.getElementById("countValue").value) || 1;
        const decimals = parseInt(document.getElementById("decimalValue").value) || 0;
        const unique = document.getElementById("uniqueCheck").checked;
        const sort = document.getElementById("sortCheck").checked;

        if (min > max) {
          alert("最小值不能大于最大值");
          return;
        }

        if (unique && decimals === 0 && count > max - min + 1) {
          alert("不重复模式下，生成个数不能超过范围内整数个数");
          return;
        }

        let numbers = [];
        const usedNumbers = new Set();

        for (let i = 0; i < count; i++) {
          let num;
          do {
            if (decimals === 0) {
              num = Math.floor(Math.random() * (max - min + 1)) + min;
            } else {
              num = Math.random() * (max - min) + min;
              num = parseFloat(num.toFixed(decimals));
            }
          } while (unique && usedNumbers.has(num));

          usedNumbers.add(num);
          numbers.push(num);
        }

        if (sort) {
          numbers.sort((a, b) => a - b);
        }

        currentResult = numbers.join(", ");

        const resultEl = document.getElementById("resultNumber");
        const hintEl = document.getElementById("resultHint");

        if (count === 1) {
          resultEl.className = "result-number";
          resultEl.textContent = numbers[0];
          hintEl.textContent = `范围: ${min} - ${max}`;
        } else {
          resultEl.className = "result-numbers";
          resultEl.textContent = numbers.join("  ");
          hintEl.textContent = `共 ${count} 个数，范围: ${min} - ${max}`;
        }

        addToHistory(`[${min}-${max}] ${currentResult}`);
      }

      function rollDice() {
        const count = parseInt(document.getElementById("diceCount").value) || 2;
        const sides = parseInt(document.getElementById("diceSides").value) || 6;
        const container = document.getElementById("diceContainer");

        // 生成骰子
        let results = [];
        let html = "";

        for (let i = 0; i < count; i++) {
          const value = Math.floor(Math.random() * sides) + 1;
          results.push(value);
          html += `<div class="dice rolling">${value}</div>`;
        }

        container.innerHTML = html;

        // 移除动画类
        setTimeout(() => {
          container.querySelectorAll(".dice").forEach((d) => d.classList.remove("rolling"));
        }, 500);

        const sum = results.reduce((a, b) => a + b, 0);
        document.getElementById("diceSum").innerHTML = `总点数: <span>${sum}</span>`;

        currentResult = results.join(", ");
        addToHistory(`🎲 ${count}d${sides}: ${currentResult} (和=${sum})`);
      }

      function generateLottery(type) {
        const container = document.getElementById("lotteryNumbers");
        let html = "";
        let result = "";

        switch (type) {
          case "ssq": // 双色球: 6红(1-33) + 1蓝(1-16)
            const ssqRed = generateUnique(6, 1, 33).sort((a, b) => a - b);
            const ssqBlue = Math.floor(Math.random() * 16) + 1;
            html = ssqRed
              .map((n) => `<div class="lottery-ball red">${n.toString().padStart(2, "0")}</div>`)
              .join("");
            html += `<div class="lottery-ball blue">${ssqBlue.toString().padStart(2, "0")}</div>`;
            result = `双色球: ${ssqRed.join(" ")} + ${ssqBlue}`;
            break;

          case "dlt": // 大乐透: 5前区(1-35) + 2后区(1-12)
            const dltFront = generateUnique(5, 1, 35).sort((a, b) => a - b);
            const dltBack = generateUnique(2, 1, 12).sort((a, b) => a - b);
            html = dltFront
              .map((n) => `<div class="lottery-ball red">${n.toString().padStart(2, "0")}</div>`)
              .join("");
            html += dltBack
              .map((n) => `<div class="lottery-ball blue">${n.toString().padStart(2, "0")}</div>`)
              .join("");
            result = `大乐透: ${dltFront.join(" ")} + ${dltBack.join(" ")}`;
            break;

          case "3d": // 福彩3D: 3位(0-9)
            const d3 = [0, 0, 0].map(() => Math.floor(Math.random() * 10));
            html = d3.map((n) => `<div class="lottery-ball red">${n}</div>`).join("");
            result = `福彩3D: ${d3.join(" ")}`;
            break;

          case "p5": // 排列5: 5位(0-9)
            const p5 = [0, 0, 0, 0, 0].map(() => Math.floor(Math.random() * 10));
            html = p5.map((n) => `<div class="lottery-ball red">${n}</div>`).join("");
            result = `排列5: ${p5.join(" ")}`;
            break;
        }

        container.innerHTML = html;
        currentResult = result;
        addToHistory(result);
      }

      function generateUnique(count, min, max) {
        const numbers = new Set();
        while (numbers.size < count) {
          numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return Array.from(numbers);
      }

      function copyResult() {
        if (!currentResult) {
          alert("请先生成随机数");
          return;
        }
        navigator.clipboard.writeText(currentResult).then(() => {
          alert("已复制到剪贴板");
        });
      }

      function addToHistory(value) {
        const time = new Date().toLocaleTimeString();
        history.unshift({ time, value });
        if (history.length > 20) history.pop();
        renderHistory();
      }

      function renderHistory() {
        const container = document.getElementById("historyList");
        if (history.length === 0) {
          container.innerHTML = '<div class="empty-history">暂无历史记录</div>';
          return;
        }
        container.innerHTML = history
          .map(
            (item) => `
                <div class="history-item">
                    <span class="history-time">${item.time}</span>
                    <span class="history-value">${item.value}</span>
                </div>
            `
          )
          .join("");
      }

      function clearHistory() {
        history = [];
        renderHistory();
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
    
