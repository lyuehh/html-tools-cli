// @ts-nocheck
// Generated from tools/security/bcrypt-generator.html
// Source SHA-256: a8b4fec613fc23af107edd753eb05a69f1282d14046e8e913fd2eaef9f6d53a6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.generateHash = async function () {
        const password = document.getElementById("password").value;
        const rounds = parseInt(document.getElementById("rounds").value);
        const btn = document.getElementById("generateBtn");

        if (!password) {
          alert("请输入密码");
          return;
        }

        btn.disabled = true;
        btn.textContent = "计算中...";

        try {
          const hash = await new Promise((resolve, reject) => {
            dcodeIO.bcrypt.hash(password, rounds, (err, hash) => {
              if (err) reject(err);
              else resolve(hash);
            });
          });

          const resultBox = document.getElementById("hashResult");
          resultBox.textContent = hash;
          resultBox.style.display = "block";

          // Auto fill verify section
          document.getElementById("verifyPassword").value = password;
          document.getElementById("verifyHash").value = hash;
        } catch (err) {
          alert("生成失败: " + err.message);
        } finally {
          btn.disabled = false;
          btn.textContent = "生成哈希";
        }
      };

      window.verifyHash = async function () {
        const password = document.getElementById("verifyPassword").value;
        const hash = document.getElementById("verifyHash").value.trim();
        const btn = document.getElementById("verifyBtn");
        const result = document.getElementById("verifyResult");

        if (!password || !hash) {
          alert("请输入密码和哈希值");
          return;
        }

        btn.disabled = true;
        btn.textContent = "验证中...";

        try {
          const isValid = await new Promise((resolve, reject) => {
            dcodeIO.bcrypt.compare(password, hash, (err, res) => {
              if (err) reject(err);
              else resolve(res);
            });
          });

          result.style.display = "block";
          if (isValid) {
            result.className = "verify-result success";
            result.textContent = "✅ 验证成功！密码匹配";
          } else {
            result.className = "verify-result failure";
            result.textContent = "❌ 验证失败！密码不匹配";
          }
        } catch (err) {
          result.style.display = "block";
          result.className = "verify-result failure";
          result.textContent = "❌ 错误: " + err.message;
        } finally {
          btn.disabled = false;
          btn.textContent = "验证";
        }
      };

      window.copyHash = function () {
        const hash = document.getElementById("hashResult").textContent;
        navigator.clipboard.writeText(hash);
        document.getElementById("toast").classList.add("show");
        setTimeout(() => document.getElementById("toast").classList.remove("show"), 2000);
      };

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };

      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
