// @ts-nocheck
// Generated from tools/text/random-picker.html
// Source SHA-256: 33a0ee84fad5a8a31c1114bee799cf0c032bc61511705779915ed511df8720c0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        document.querySelector(".theme-toggle").textContent = newTheme === "light" ? "🌙" : "☀️";
      };

      // 初始化主题
      function initTheme() {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.querySelector(".theme-toggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      // 获取所有选项
      function getOptions() {
        const text = document.getElementById("textInput").value;
        return text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);
      }

      // 获取去重后的选项
      function getUniqueOptions() {
        return [...new Set(getOptions())];
      }

      // 更新统计
      function updateStats() {
        const options = getOptions();
        const unique = getUniqueOptions();
        document.getElementById("totalCount").textContent = options.length;
        document.getElementById("uniqueCount").textContent = unique.length;
      }

      // 随机抽取
      window.pickRandom = function () {
        const options = getUniqueOptions();
        const count = parseInt(document.getElementById("pickCount").value) || 1;
        const allowDuplicate = document.getElementById("allowDuplicate").checked;
        const showAnimation = document.getElementById("showAnimation").checked;

        if (options.length === 0) {
          alert("请先输入选项");
          return;
        }

        let results = [];
        if (allowDuplicate) {
          for (let i = 0; i < count; i++) {
            const idx = Math.floor(Math.random() * options.length);
            results.push(options[idx]);
          }
        } else {
          if (count > options.length) {
            alert(`选项数量不足，最多只能抽取 ${options.length} 个不重复选项`);
            return;
          }
          const shuffled = [...options].sort(() => Math.random() - 0.5);
          results = shuffled.slice(0, count);
        }

        displayResults(results, showAnimation);
        addToHistory(results);
      };

      // 显示结果
      function displayResults(results, animate) {
        const box = document.getElementById("resultBox");
        box.textContent = "";

        if (animate) {
          results.forEach((item, index) => {
            setTimeout(() => {
              const div = document.createElement("div");
              div.className = "result-item";
              div.textContent = index + 1 + ". " + item;
              if (index === results.length - 1) {
                div.classList.add("highlight");
              }
              box.appendChild(div);
            }, index * 150);
          });
        } else {
          results.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "result-item";
            if (index === results.length - 1 && results.length === 1) {
              div.classList.add("highlight");
            }
            div.textContent = index + 1 + ". " + item;
            box.appendChild(div);
          });
        }
      }

      // 打乱顺序
      window.shuffleAll = function () {
        const options = getOptions();
        if (options.length === 0) {
          alert("请先输入选项");
          return;
        }
        const shuffled = options.sort(() => Math.random() - 0.5);
        document.getElementById("textInput").value = shuffled.join("\n");
        updateStats();
      };

      // 清空
      window.clearAll = function () {
        document.getElementById("textInput").value = "";
        const box = document.getElementById("resultBox");
        box.textContent = "";
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "empty-state";
        emptyDiv.textContent = '点击"开始抽取"查看结果';
        box.appendChild(emptyDiv);
        updateStats();
      };

      // 加载示例
      window.loadExample = function () {
        const examples = [
          "张三",
          "李四",
          "王五",
          "赵六",
          "钱七",
          "孙八",
          "周九",
          "吴十",
          "郑十一",
          "王十二"
        ];
        document.getElementById("textInput").value = examples.join("\n");
        updateStats();
      };

      // 历史记录
      let history = JSON.parse(localStorage.getItem("picker-history") || "[]");

      function addToHistory(results) {
        const record = {
          time: new Date().toLocaleString("zh-CN"),
          results: results
        };
        history.unshift(record);
        if (history.length > 50) history.pop();
        localStorage.setItem("picker-history", JSON.stringify(history));
        renderHistory();
      }

      function renderHistory() {
        const list = document.getElementById("historyList");
        list.textContent = "";

        if (history.length === 0) {
          const emptyDiv = document.createElement("div");
          emptyDiv.className = "empty-state";
          emptyDiv.textContent = "暂无历史记录";
          list.appendChild(emptyDiv);
          return;
        }

        history.forEach((item) => {
          const div = document.createElement("div");
          div.className = "history-item";

          const resultSpan = document.createElement("span");
          resultSpan.textContent = item.results.join(", ");

          const timeSpan = document.createElement("span");
          timeSpan.className = "history-time";
          timeSpan.textContent = item.time;

          div.appendChild(resultSpan);
          div.appendChild(timeSpan);
          list.appendChild(div);
        });
      }

      window.clearHistory = function () {
        history = [];
        localStorage.removeItem("picker-history");
        renderHistory();
      };

      // 初始化
      document.addEventListener("DOMContentLoaded", () => {
        initTheme();
        renderHistory();
        document.getElementById("textInput").addEventListener("input", updateStats);
        updateStats();
      });
    
