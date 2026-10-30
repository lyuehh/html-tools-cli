// @ts-nocheck
// Generated from tools/privacy/password-strength.html
// Source SHA-256: 540547c3bbb639cf7fff65e062e2d2c16236ffe88559dead665b90a95ff19924
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var passwordEl = document.getElementById("password");
      var toggleBtn = document.getElementById("toggleBtn");
      var strengthFill = document.getElementById("strengthFill");
      var strengthLabel = document.getElementById("strengthLabel");
      var statsEl = document.getElementById("stats");
      var warningEl = document.getElementById("warning");

      // Common passwords list (top 100)
      var commonPasswords = [
        "123456",
        "password",
        "123456789",
        "12345678",
        "12345",
        "1234567",
        "1234567890",
        "qwerty",
        "abc123",
        "monkey",
        "1234",
        "111111",
        "qwerty123",
        "0987654321",
        "dragon",
        "master",
        "hello",
        "freedom",
        "whatever",
        "qazwsx",
        "trustno1",
        "password1",
        "iloveyou",
        "princess",
        "admin",
        "welcome",
        "sunshine",
        "shadow",
        "superman",
        "michael",
        "football",
        "baseball",
        "letmein",
        "696969",
        "batman",
        "passw0rd",
        "zaq1zaq1",
        "qwerty1",
        "login",
        "starwars",
        "123qwe",
        "killer"
      ];

      var strengthLevels = [
        { name: "非常弱", class: "very-weak" },
        { name: "弱", class: "weak" },
        { name: "一般", class: "fair" },
        { name: "强", class: "strong" },
        { name: "非常强", class: "very-strong" }
      ];

      function checkPassword(password) {
        var criteria = {
          length: password.length >= 8,
          lowercase: /[a-z]/.test(password),
          uppercase: /[A-Z]/.test(password),
          number: /[0-9]/.test(password),
          special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
          noCommon: !commonPasswords.includes(password.toLowerCase())
        };

        // Update criteria display
        for (var key in criteria) {
          var item = document.querySelector('[data-criteria="' + key + '"]');
          if (item) {
            if (criteria[key]) {
              item.classList.add("pass");
              item.classList.remove("fail");
              item.querySelector(".icon").textContent = "✓";
            } else {
              item.classList.remove("pass");
              item.classList.add("fail");
              item.querySelector(".icon").textContent = "○";
            }
          }
        }

        // Calculate score
        var score = 0;
        if (criteria.length) score++;
        if (criteria.lowercase) score++;
        if (criteria.uppercase) score++;
        if (criteria.number) score++;
        if (criteria.special) score++;
        if (password.length >= 12) score++;
        if (password.length >= 16) score++;
        if (criteria.noCommon) score++;

        // Normalize to 0-4
        var level = Math.min(4, Math.floor(score / 2));

        return {
          criteria: criteria,
          score: score,
          level: level
        };
      }

      function calculateEntropy(password) {
        var charsetSize = 0;
        if (/[a-z]/.test(password)) charsetSize += 26;
        if (/[A-Z]/.test(password)) charsetSize += 26;
        if (/[0-9]/.test(password)) charsetSize += 10;
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) charsetSize += 32;

        if (charsetSize === 0) return 0;
        return Math.round(password.length * Math.log2(charsetSize));
      }

      function formatCrackTime(entropy) {
        // Assuming 10 billion guesses per second
        var guesses = Math.pow(2, entropy);
        var seconds = guesses / 10000000000;

        if (seconds < 1) return "瞬间";
        if (seconds < 60) return Math.round(seconds) + " 秒";
        if (seconds < 3600) return Math.round(seconds / 60) + " 分钟";
        if (seconds < 86400) return Math.round(seconds / 3600) + " 小时";
        if (seconds < 31536000) return Math.round(seconds / 86400) + " 天";
        if (seconds < 31536000 * 100) return Math.round(seconds / 31536000) + " 年";
        if (seconds < 31536000 * 1000000) return Math.round(seconds / 31536000 / 1000) + "k 年";
        return "数百万年+";
      }

      window.analyze = function () {
        var password = passwordEl.value;

        if (!password) {
          strengthFill.className = "strength-fill";
          strengthLabel.className = "strength-label";
          strengthLabel.textContent = "输入密码开始检测";
          statsEl.style.display = "none";
          warningEl.style.display = "none";

          document.querySelectorAll(".criteria-item").forEach(function (item) {
            item.classList.remove("pass");
            item.classList.add("fail");
            item.querySelector(".icon").textContent = "○";
          });
          return;
        }

        var result = checkPassword(password);
        var level = strengthLevels[result.level];

        strengthFill.className = "strength-fill " + level.class;
        strengthLabel.className = "strength-label " + level.class;
        strengthLabel.textContent = level.name;

        // Stats
        statsEl.style.display = "grid";
        document.getElementById("statLength").textContent = password.length;

        var entropy = calculateEntropy(password);
        document.getElementById("statEntropy").textContent = entropy;
        document.getElementById("statCrackTime").textContent = formatCrackTime(entropy);

        // Warnings
        var warnings = [];
        if (!result.criteria.noCommon) {
          warnings.push("此密码在常见密码列表中，极易被破解！");
        }
        if (password.length < 8) {
          warnings.push("密码太短，建议至少使用 8 个字符。");
        }
        if (/^[a-z]+$/.test(password) || /^[A-Z]+$/.test(password) || /^[0-9]+$/.test(password)) {
          warnings.push("密码只包含单一类型字符，建议混合使用。");
        }
        if (/(.)\1{2,}/.test(password)) {
          warnings.push("密码包含重复字符序列，降低了安全性。");
        }
        if (/123|abc|qwe|password/i.test(password)) {
          warnings.push("密码包含常见序列，容易被猜测。");
        }

        if (warnings.length > 0) {
          warningEl.textContent = warnings.join(" ");
          warningEl.style.display = "block";
        } else {
          warningEl.style.display = "none";
        }
      };

      toggleBtn.addEventListener("click", function () {
        if (passwordEl.type === "password") {
          passwordEl.type = "text";
          toggleBtn.textContent = "🙈";
        } else {
          passwordEl.type = "password";
          toggleBtn.textContent = "👁";
        }
      });

      passwordEl.addEventListener("input", analyze);

      // Initial state
      analyze();

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
    
