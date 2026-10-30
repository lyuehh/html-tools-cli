// @ts-nocheck
// Generated from tools/text/typing-test.html
// Source SHA-256: 35eb72ffb2535e643daeab9dbd4837c8b88410e000dcabe76db640ebad1e2d26
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 示例文本库
      const sampleTexts = {
        chinese: [
          "生活不止眼前的苟且，还有诗和远方的田野。你赤手空拳来到人世间，为了找到那片海不顾一切。",
          "时间就像海绵里的水，只要愿意挤，总还是有的。鲁迅先生的这句话激励了无数人珍惜时间。",
          "人生若只如初见，何事秋风悲画扇。等闲变却故人心，却道故人心易变。骊山语罢清宵半。",
          "落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨；雁阵惊寒，声断衡阳之浦。",
          "天行健，君子以自强不息。地势坤，君子以厚德载物。这是中华民族的精神核心所在。"
        ],
        english: [
          "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
          "To be or not to be, that is the question. Whether it is nobler in the mind to suffer the slings and arrows of outrageous fortune.",
          "In the beginning God created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face.",
          "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.",
          "All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience."
        ],
        mixed: [
          "今天的weather很好，适合出去walking。Let us go to the park，享受这美好的sunshine吧！",
          "Programming编程是一门art艺术，需要不断practice练习才能master掌握。Keep coding每天进步！",
          "在这个digital数字时代，学习new skills新技能变得越来越important重要。Never stop learning！",
          "Good morning早上好！今天是wonderful美好的一天。Let us start开始我们的journey旅程吧！",
          "The Internet互联网改变了我们的life生活方式。We can learn学习anything任何东西online在线上。"
        ],
        code: [
          'function hello() { console.log("Hello, World!"); return true; }',
          "const arr = [1, 2, 3, 4, 5]; const sum = arr.reduce((a, b) => a + b, 0);",
          "for (let i = 0; i < 10; i++) { if (i % 2 === 0) { console.log(i); } }",
          "class Person { constructor(name) { this.name = name; } sayHello() { return `Hi, ${this.name}`; } }",
          "const fetchData = async (url) => { const response = await fetch(url); return response.json(); };"
        ]
      };

      // 状态变量
      let currentText = "";
      let currentPosition = 0;
      let startTime = null;
      let endTime = null;
      let timerInterval = null;
      let isRunning = false;
      let correctChars = 0;
      let errorChars = 0;
      let history = JSON.parse(localStorage.getItem("typingHistory") || "[]");

      // 加载示例文本
      function loadSampleText() {
        const type = document.getElementById("text-type").value;

        if (type === "custom") {
          currentText = prompt("请输入自定义文本:", "") || "";
          if (!currentText) {
            document.getElementById("text-type").value = "chinese";
            loadSampleText();
            return;
          }
        } else {
          const texts = sampleTexts[type];
          currentText = texts[Math.floor(Math.random() * texts.length)];
        }

        renderSampleText();
        resetTest();
      }

      // 渲染示例文本
      function renderSampleText() {
        const container = document.getElementById("sample-text");
        container.textContent = "";

        currentText.split("").forEach((char, index) => {
          const span = document.createElement("span");
          span.className = "char" + (index === 0 ? " current" : " pending");
          span.textContent = char;
          span.dataset.index = index;
          container.appendChild(span);
        });
      }

      // 开始测试
      function startTest() {
        if (isRunning) return;

        isRunning = true;
        startTime = Date.now();
        currentPosition = 0;
        correctChars = 0;
        errorChars = 0;

        const duration = parseInt(document.getElementById("test-duration").value);
        let timeLeft = duration;

        document.getElementById("timer").textContent = timeLeft;
        document.getElementById("timer").classList.remove("warning");
        document.getElementById("typing-input").focus();
        document.getElementById("typing-input").value = "";
        document.getElementById("start-btn").disabled = true;
        document.getElementById("result-panel").classList.remove("show");

        renderSampleText();

        timerInterval = setInterval(() => {
          timeLeft--;
          document.getElementById("timer").textContent = timeLeft;

          if (timeLeft <= 10) {
            document.getElementById("timer").classList.add("warning");
          }

          // 更新进度
          const progress = ((duration - timeLeft) / duration) * 100;
          document.getElementById("progress-bar").style.width = progress + "%";

          if (timeLeft <= 0) {
            endTest();
          }
        }, 1000);
      }

      // 结束测试
      function endTest() {
        if (!isRunning) return;

        isRunning = false;
        endTime = Date.now();
        clearInterval(timerInterval);

        // 计算结果
        const duration = (endTime - startTime) / 1000 / 60; // 分钟
        const totalChars = correctChars + errorChars;
        const wpm = Math.round(correctChars / 5 / duration); // 标准: 5字符=1词
        const cpm = Math.round(correctChars / duration);
        const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

        // 显示结果
        document.getElementById("result-wpm").textContent = wpm;
        document.getElementById("result-cpm").textContent = cpm;
        document.getElementById("result-accuracy").textContent = accuracy + "%";
        document.getElementById("result-chars").textContent = totalChars;
        document.getElementById("result-correct").textContent = correctChars;
        document.getElementById("result-errors").textContent = errorChars;
        document.getElementById("result-panel").classList.add("show");

        // 保存历史
        saveHistory({
          date: new Date().toLocaleString(),
          wpm: wpm,
          cpm: cpm,
          accuracy: accuracy,
          type: document.getElementById("text-type").value
        });

        document.getElementById("start-btn").disabled = false;
      }

      // 重置测试
      function resetTest() {
        isRunning = false;
        clearInterval(timerInterval);
        startTime = null;
        endTime = null;
        currentPosition = 0;
        correctChars = 0;
        errorChars = 0;

        const duration = document.getElementById("test-duration").value;
        document.getElementById("timer").textContent = duration;
        document.getElementById("timer").classList.remove("warning");
        document.getElementById("progress-bar").style.width = "0%";
        document.getElementById("typing-input").value = "";
        document.getElementById("start-btn").disabled = false;
        document.getElementById("result-panel").classList.remove("show");

        // 重置统计
        document.getElementById("live-wpm").textContent = "0";
        document.getElementById("live-cpm").textContent = "0";
        document.getElementById("live-accuracy").textContent = "100%";
        document.getElementById("live-errors").textContent = "0";

        renderSampleText();
      }

      // 处理输入
      document.getElementById("typing-input").addEventListener("input", function (e) {
        if (!isRunning) {
          startTest();
        }

        const inputValue = this.value;
        const chars = document.querySelectorAll(".sample-text .char");

        // 检查输入的每个字符
        for (let i = 0; i < inputValue.length && i < currentText.length; i++) {
          const char = chars[i];
          char.classList.remove("current", "pending");

          if (inputValue[i] === currentText[i]) {
            char.classList.add("correct");
            if (i >= currentPosition) {
              correctChars++;
            }
          } else {
            char.classList.add("error");
            if (i >= currentPosition) {
              errorChars++;
            }
          }
        }

        currentPosition = inputValue.length;

        // 标记当前位置
        if (currentPosition < chars.length) {
          chars[currentPosition].classList.add("current");
          chars[currentPosition].classList.remove("pending");

          // 键盘提示
          if (document.getElementById("show-keyboard").checked) {
            document.getElementById("keyboard-hint").textContent =
              "下一个字符: " + currentText[currentPosition];
          }
        }

        // 重置后续字符状态
        for (let i = currentPosition + 1; i < chars.length; i++) {
          chars[i].classList.remove("correct", "error", "current");
          chars[i].classList.add("pending");
        }

        // 更新实时统计
        updateLiveStats();

        // 检查是否完成
        if (currentPosition >= currentText.length) {
          endTest();
        }
      });

      // 更新实时统计
      function updateLiveStats() {
        if (!startTime) return;

        const duration = (Date.now() - startTime) / 1000 / 60; // 分钟
        const totalChars = correctChars + errorChars;

        const wpm = duration > 0 ? Math.round(correctChars / 5 / duration) : 0;
        const cpm = duration > 0 ? Math.round(correctChars / duration) : 0;
        const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

        document.getElementById("live-wpm").textContent = wpm;
        document.getElementById("live-cpm").textContent = cpm;
        document.getElementById("live-accuracy").textContent = accuracy + "%";
        document.getElementById("live-errors").textContent = errorChars;
      }

      // 保存历史
      function saveHistory(record) {
        history.unshift(record);
        if (history.length > 50) history.pop();
        localStorage.setItem("typingHistory", JSON.stringify(history));
        updateHistoryList();
      }

      // 更新历史列表
      function updateHistoryList() {
        const container = document.getElementById("history-list");
        container.textContent = "";

        if (history.length === 0) {
          const p = document.createElement("p");
          p.style.color = "var(--pico-muted-color)";
          p.style.textAlign = "center";
          p.textContent = "暂无历史记录";
          container.appendChild(p);
          return;
        }

        history.slice(0, 20).forEach((record) => {
          const item = document.createElement("div");
          item.className = "history-item";

          const dateSpan = document.createElement("span");
          dateSpan.textContent = record.date;

          const typeSpan = document.createElement("span");
          typeSpan.textContent = record.type;

          const wpmSpan = document.createElement("span");
          wpmSpan.textContent = record.wpm + " WPM";

          const cpmSpan = document.createElement("span");
          cpmSpan.textContent = record.cpm + " CPM";

          const accSpan = document.createElement("span");
          accSpan.textContent = record.accuracy + "%";

          item.appendChild(dateSpan);
          item.appendChild(typeSpan);
          item.appendChild(wpmSpan);
          item.appendChild(cpmSpan);
          item.appendChild(accSpan);

          container.appendChild(item);
        });
      }

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      // 初始化
      document.addEventListener("DOMContentLoaded", function () {
        // 初始化主题
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.getElementById("theme-icon").textContent = savedTheme === "light" ? "🌙" : "☀️";

        // 加载示例文本
        loadSampleText();

        // 更新历史
        updateHistoryList();
      });

      // 防止粘贴
      document.getElementById("typing-input").addEventListener("paste", function (e) {
        e.preventDefault();
      });

      // 键盘快捷键
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          resetTest();
        }
      });
    
