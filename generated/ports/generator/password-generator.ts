// @ts-nocheck
// Generated from tools/generator/password-generator.html
// Source SHA-256: 0de4c5e7dddc112e22388314f871bb36ddc793ff5c72618a1ee73731d801dfb7
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const chars = {
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        numbers: "0123456789",
        symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
      };
      let history = JSON.parse(localStorage.getItem("pwdHistory") || "[]");

      window.generate = function () {
        const length = parseInt(document.getElementById("length").value);
        let charset = "";

        if (document.getElementById("uppercase").checked) charset += chars.uppercase;
        if (document.getElementById("lowercase").checked) charset += chars.lowercase;
        if (document.getElementById("numbers").checked) charset += chars.numbers;
        if (document.getElementById("symbols").checked) charset += chars.symbols;

        if (!charset) {
          alert("请至少选择一种字符类型");
          return;
        }

        let password = "";
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        for (let i = 0; i < length; i++) {
          password += charset[array[i] % charset.length];
        }

        document.getElementById("password").textContent = password;
        updateStrength(password);

        history.unshift(password);
        if (history.length > 10) history.pop();
        localStorage.setItem("pwdHistory", JSON.stringify(history));
        renderHistory();
      };

      function updateStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (password.length >= 16) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        const fill = document.getElementById("strengthFill");
        const text = document.getElementById("strengthText");
        const percent = (score / 7) * 100;

        fill.style.width = percent + "%";
        if (score <= 2) {
          fill.style.background = "#ef4444";
          text.textContent = "弱";
        } else if (score <= 4) {
          fill.style.background = "#f59e0b";
          text.textContent = "中等";
        } else if (score <= 5) {
          fill.style.background = "#22c55e";
          text.textContent = "强";
        } else {
          fill.style.background = "linear-gradient(90deg, #22c55e, #10b981)";
          text.textContent = "非常强";
        }
      }

      window.copyPassword = function () {
        const password = document.getElementById("password").textContent;
        if (password && password !== "点击生成按钮") {
          navigator.clipboard.writeText(password);
          showToast();
        }
      };

      window.copyHistoryItem = function (pwd) {
        navigator.clipboard.writeText(pwd);
        showToast();
      };

      window.updateLength = function () {
        var value = document.getElementById("length").value;
        document.getElementById("lengthValue").textContent = value;
        document.getElementById("lengthDisplay").textContent = value;
      };

      function renderHistory() {
        const list = document.getElementById("historyList");
        list.innerHTML = history
          .map(
            (pwd) =>
              `<div class="history-item"><span>${pwd.substring(0, 30)}${pwd.length > 30 ? "..." : ""}</span><button onclick="copyHistoryItem('${pwd}')">复制</button></div>`
          )
          .join("");
      }

      function showToast() {
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // ============================================
      // Theme Management
      // ============================================
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // ============================================
      // Initialize
      // ============================================
      initTheme();
      renderHistory();
    
