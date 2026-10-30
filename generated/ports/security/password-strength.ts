// @ts-nocheck
// Generated from tools/security/password-strength.html
// Source SHA-256: 33ef5a5d07ab22a52eac3943a422ed413f96b6c120b7d279933f63fe11f82c09
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const commonPatterns = [
        /^123456/,
        /^password/i,
        /^qwerty/i,
        /^abc123/i,
        /^admin/i,
        /^letmein/i,
        /^welcome/i,
        /^monkey/i,
        /^master/i,
        /^dragon/i,
        /^111111/,
        /^666666/,
        /^888888/,
        /^000000/,
        /(.)\1{3,}/, // Repeated characters
        /^[a-z]+$/i, // Only letters
        /^[0-9]+$/, // Only numbers
        /^(19|20)\d{2}/ // Years
      ];

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      (function () {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      window.toggleVisibility = function () {
        const input = document.getElementById("passwordInput");
        input.type = input.type === "password" ? "text" : "password";
      };

      function checkPassword() {
        const password = document.getElementById("passwordInput").value;

        if (!password) {
          resetDisplay();
          return;
        }

        // Check criteria
        const criteria = [
          { test: password.length >= 8, text: "至少 8 个字符" },
          { test: /[A-Z]/.test(password), text: "包含大写字母 (A-Z)" },
          { test: /[a-z]/.test(password), text: "包含小写字母 (a-z)" },
          { test: /[0-9]/.test(password), text: "包含数字 (0-9)" },
          {
            test: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
            text: "包含特殊字符 (!@#$%...)"
          },
          { test: !commonPatterns.some((p) => p.test(password)), text: "不包含常见密码模式" }
        ];

        // Update criteria display
        const criteriaList = document.getElementById("criteriaList");
        criteriaList.innerHTML = criteria
          .map(
            (c) => `
                <li class="criteria-item">
                    <span class="criteria-icon ${c.test ? "pass" : "fail"}">${c.test ? "✓" : "✗"}</span>
                    <span class="criteria-text ${c.test ? "pass" : "fail"}">${c.text}</span>
                </li>
            `
          )
          .join("");

        // Calculate score
        let score = 0;
        score += Math.min(password.length * 4, 40); // Length (max 40)
        score += criteria[0].test ? 10 : 0;
        score += criteria[1].test ? 10 : 0;
        score += criteria[2].test ? 10 : 0;
        score += criteria[3].test ? 10 : 0;
        score += criteria[4].test ? 15 : 0;
        score += criteria[5].test ? 15 : 0;

        // Calculate charset size
        let charsetSize = 0;
        if (/[a-z]/.test(password)) charsetSize += 26;
        if (/[A-Z]/.test(password)) charsetSize += 26;
        if (/[0-9]/.test(password)) charsetSize += 10;
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) charsetSize += 32;

        // Calculate entropy
        const entropy = Math.round(password.length * Math.log2(charsetSize || 1));

        // Crack time estimation (assuming 10 billion guesses/sec)
        const combinations = Math.pow(charsetSize || 1, password.length);
        const crackSeconds = combinations / 10000000000;
        const crackTime = formatCrackTime(crackSeconds);

        // Determine strength
        let strength, strengthClass;
        if (score < 40) {
          strength = "弱";
          strengthClass = "weak";
        } else if (score < 60) {
          strength = "一般";
          strengthClass = "fair";
        } else if (score < 80) {
          strength = "良好";
          strengthClass = "good";
        } else {
          strength = "强";
          strengthClass = "strong";
        }

        // Update display
        document.getElementById("strengthFill").className = `strength-fill ${strengthClass}`;
        document.getElementById("strengthText").textContent = strength;
        document.getElementById("strengthText").className = `strength-text ${strengthClass}`;
        document.getElementById("strengthScore").textContent = `${score}/100`;

        document.getElementById("lengthStat").textContent = password.length;
        document.getElementById("entropyStat").textContent = entropy;
        document.getElementById("crackTimeStat").textContent = crackTime;
        document.getElementById("charsetStat").textContent = charsetSize;

        // Generate suggestions
        const suggestions = [];
        if (password.length < 12) suggestions.push("增加密码长度至少到 12 个字符");
        if (!criteria[1].test) suggestions.push("添加大写字母");
        if (!criteria[2].test) suggestions.push("添加小写字母");
        if (!criteria[3].test) suggestions.push("添加数字");
        if (!criteria[4].test) suggestions.push("添加特殊字符如 !@#$%^&*");
        if (!criteria[5].test) suggestions.push("避免使用常见密码模式和重复字符");
        if (password.length > 0 && password.length < 16)
          suggestions.push("考虑使用密码管理器生成更长的随机密码");

        const suggestionsEl = document.getElementById("suggestions");
        if (suggestions.length > 0 && score < 100) {
          document.getElementById("suggestionList").innerHTML = suggestions
            .map((s) => `<li>${s}</li>`)
            .join("");
          suggestionsEl.style.display = "block";
        } else {
          suggestionsEl.style.display = "none";
        }
      }

      function formatCrackTime(seconds) {
        if (seconds < 1) return "瞬间";
        if (seconds < 60) return `${Math.round(seconds)} 秒`;
        if (seconds < 3600) return `${Math.round(seconds / 60)} 分钟`;
        if (seconds < 86400) return `${Math.round(seconds / 3600)} 小时`;
        if (seconds < 31536000) return `${Math.round(seconds / 86400)} 天`;
        if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} 年`;
        if (seconds < 31536000 * 1000000) return `${Math.round(seconds / 31536000 / 1000)} 千年`;
        return "数百万年+";
      }

      function resetDisplay() {
        document.getElementById("strengthFill").className = "strength-fill";
        document.getElementById("strengthText").textContent = "输入密码开始检测";
        document.getElementById("strengthText").className = "strength-text";
        document.getElementById("strengthScore").textContent = "";
        document.getElementById("lengthStat").textContent = "0";
        document.getElementById("entropyStat").textContent = "0";
        document.getElementById("crackTimeStat").textContent = "-";
        document.getElementById("charsetStat").textContent = "0";
        document.getElementById("suggestions").style.display = "none";
      }

      function generatePassword() {
        const length = parseInt(document.getElementById("genLength").value) || 16;
        const useUpper = document.getElementById("genUpper").checked;
        const useLower = document.getElementById("genLower").checked;
        const useNumbers = document.getElementById("genNumbers").checked;
        const useSymbols = document.getElementById("genSymbols").checked;

        let charset = "";
        if (useUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (useLower) charset += "abcdefghijklmnopqrstuvwxyz";
        if (useNumbers) charset += "0123456789";
        if (useSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

        if (!charset) {
          showToast("请至少选择一种字符类型", "error");
          return;
        }

        let password = "";
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);
        for (let i = 0; i < length; i++) {
          password += charset[array[i] % charset.length];
        }

        document.getElementById("generatedPassword").value = password;
      }

      window.copyGenerated = function () {
        const password = document.getElementById("generatedPassword").value;
        if (password) {
          navigator.clipboard.writeText(password);
          showToast("密码已复制");
        }
      };

      window.useGeneratedPassword = function () {
        const generated = document.getElementById("generatedPassword").value;
        if (generated) {
          document.getElementById("passwordInput").value = generated;
          document.getElementById("passwordInput").type = "text";
          checkPassword();
        } else {
          generatePassword();
          useGeneratedPassword();
        }
      };

      function showToast(message, type = "success") {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.style.background = type === "error" ? "#ef4444" : "#10b981";
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Generate initial password
      generatePassword();
    
