// @ts-nocheck
// Generated from tools/life/password-generator.html
// Source SHA-256: 5df2f20c36ef4bb0506ad4e5169283e5f2adf31d852b64c718fafe57f6807c94
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const CHARS = {
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        numbers: "0123456789",
        symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
      };

      let history = JSON.parse(localStorage.getItem("passwordHistory") || "[]");

      function getCharset() {
        let charset = "";
        const excludeChars = document.getElementById("excludeChars").value;

        if (document.getElementById("uppercase").checked) {
          charset += CHARS.uppercase;
        }
        if (document.getElementById("lowercase").checked) {
          charset += CHARS.lowercase;
        }
        if (document.getElementById("numbers").checked) {
          charset += CHARS.numbers;
        }
        if (document.getElementById("symbols").checked) {
          charset += CHARS.symbols;
        }

        // 排除指定字符
        if (excludeChars) {
          for (let char of excludeChars) {
            charset = charset.replace(
              new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
              ""
            );
          }
        }

        return charset;
      }

      function generatePassword() {
        const length = parseInt(document.getElementById("lengthSlider").value);
        const charset = getCharset();

        if (!charset) {
          document.getElementById("passwordText").textContent = "请至少选择一种字符类型";
          return "";
        }

        let password = "";
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
          password += charset[array[i] % charset.length];
        }

        document.getElementById("passwordText").textContent = password;
        updateStrength(password);

        return password;
      }

      function updateLength() {
        const length = document.getElementById("lengthSlider").value;
        document.getElementById("lengthValue").textContent = length;
        generatePassword();
      }

      function updateStrength(password) {
        if (!password) {
          document.getElementById("strengthFill").style.width = "0%";
          document.getElementById("strengthLabel").textContent = "-";
          document.getElementById("strengthTime").textContent = "-";
          return;
        }

        let score = 0;
        const length = password.length;

        // 长度得分
        if (length >= 8) score += 1;
        if (length >= 12) score += 1;
        if (length >= 16) score += 1;
        if (length >= 20) score += 1;

        // 字符类型得分
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^a-zA-Z0-9]/.test(password)) score += 1;

        // 计算破解时间估算
        const charset = getCharset().length;
        const combinations = Math.pow(charset, length);
        const guessesPerSecond = 1e10; // 假设每秒100亿次尝试
        const seconds = combinations / guessesPerSecond;

        let timeText = "";
        if (seconds < 1) timeText = "瞬间破解";
        else if (seconds < 60) timeText = `${Math.round(seconds)} 秒`;
        else if (seconds < 3600) timeText = `${Math.round(seconds / 60)} 分钟`;
        else if (seconds < 86400) timeText = `${Math.round(seconds / 3600)} 小时`;
        else if (seconds < 31536000) timeText = `${Math.round(seconds / 86400)} 天`;
        else if (seconds < 31536000 * 100) timeText = `${Math.round(seconds / 31536000)} 年`;
        else if (seconds < 31536000 * 1000000)
          timeText = `${Math.round(seconds / 31536000 / 1000)} 千年`;
        else timeText = "几乎不可能破解";

        const fill = document.getElementById("strengthFill");
        const label = document.getElementById("strengthLabel");

        let strength, color, width;
        if (score <= 3) {
          strength = "弱";
          color = "#f44336";
          width = "25%";
        } else if (score <= 5) {
          strength = "中等";
          color = "#ff9800";
          width = "50%";
        } else if (score <= 7) {
          strength = "强";
          color = "#8bc34a";
          width = "75%";
        } else {
          strength = "非常强";
          color = "#4caf50";
          width = "100%";
        }

        fill.style.width = width;
        fill.style.background = color;
        label.textContent = strength;
        label.style.color = color;
        document.getElementById("strengthTime").textContent = `暴力破解约需: ${timeText}`;
      }

      function copyPassword() {
        const password = document.getElementById("passwordText").textContent;
        if (!password || password.includes("请") || password.includes("点击")) return;

        navigator.clipboard.writeText(password).then(() => {
          const display = document.getElementById("passwordDisplay");
          const hint = document.getElementById("copyHint");
          display.classList.add("copied");
          hint.classList.add("show");

          // 添加到历史
          addToHistory(password);

          setTimeout(() => {
            display.classList.remove("copied");
            hint.classList.remove("show");
          }, 2000);
        });
      }

      function addToHistory(password) {
        if (history.includes(password)) return;

        history.unshift(password);
        if (history.length > 10) history.pop();

        localStorage.setItem("passwordHistory", JSON.stringify(history));
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
            (pwd, index) => `
                  <div class="history-item">
                      <span>${pwd}</span>
                      <button onclick="copyFromHistory(${index})">复制</button>
                  </div>
              `
          )
          .join("");
      }

      function copyFromHistory(index) {
        navigator.clipboard.writeText(history[index]);
      }

      function clearHistory() {
        history = [];
        localStorage.removeItem("passwordHistory");
        renderHistory();
      }

      function generateBatch() {
        const count = Math.min(
          100,
          Math.max(1, parseInt(document.getElementById("batchCount").value) || 5)
        );
        const container = document.getElementById("batchResults");
        const passwords = [];

        for (let i = 0; i < count; i++) {
          const length = parseInt(document.getElementById("lengthSlider").value);
          const charset = getCharset();

          if (!charset) {
            container.innerHTML = '<div class="empty-history">请至少选择一种字符类型</div>';
            return;
          }

          let password = "";
          const array = new Uint32Array(length);
          crypto.getRandomValues(array);

          for (let j = 0; j < length; j++) {
            password += charset[array[j] % charset.length];
          }
          passwords.push(password);
        }

        container.innerHTML = passwords
          .map(
            (pwd, index) => `
                  <div class="batch-item">
                      <span>${index + 1}. ${pwd}</span>
                      <button onclick="copyBatchItem('${pwd}', this)">复制</button>
                  </div>
              `
          )
          .join("");
      }

      function copyBatchItem(password, btn) {
        navigator.clipboard.writeText(password).then(() => {
          const originalText = btn.textContent;
          btn.textContent = "已复制";
          setTimeout(() => {
            btn.textContent = originalText;
          }, 1000);
        });
      }

      // 初始化
      renderHistory();
      generatePassword();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        const themeIcon = document.getElementById("theme-icon");
        if (themeIcon) themeIcon.textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        const themeIcon = document.getElementById("theme-icon");
        if (themeIcon) themeIcon.textContent = "☀️";
      }
    
