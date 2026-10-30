// @ts-nocheck
// Generated from tools/dev/email-address-validator.html
// Source SHA-256: ae2305546206439fd7f34e14db5ac0556a4d249622e622bf484d55114145d3d2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var inputEl = document.getElementById("input");
      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");
      var resultListEl = document.getElementById("resultList");

      var validResults = [];
      var invalidResults = [];

      /**
       * RFC 5321/5322 邮箱格式验证
       * 规则：
       *  1. 必须包含且仅包含一个 @ 符号
       *  2. 本地部分（local-part）长度 1-64，使用合法字符
       *  3. 域名部分长度 1-253，至少含一个点，各标签长度 1-63
       *  4. 总长度不超过 254（含 @）
       */
      function validateEmail(raw) {
        var optTrim = document.getElementById("optTrim").checked;
        var email = optTrim ? raw.trim() : raw;

        if (!email) {
          return { email: email, valid: false, reason: "地址为空" };
        }

        if (email.length > 254) {
          return { email: email, valid: false, reason: "总长度超过 254 字符（RFC 5321）" };
        }

        var atIdx = email.indexOf("@");
        if (atIdx === -1) {
          return { email: email, valid: false, reason: "缺少 @ 符号" };
        }
        if (email.indexOf("@", atIdx + 1) !== -1) {
          return { email: email, valid: false, reason: "包含多个 @ 符号" };
        }

        var local = email.slice(0, atIdx);
        var domain = email.slice(atIdx + 1);

        /* 本地部分验证 */
        if (local.length === 0) {
          return { email: email, valid: false, reason: "@ 前本地部分为空" };
        }
        if (local.length > 64) {
          return { email: email, valid: false, reason: "本地部分超过 64 字符（RFC 5321）" };
        }

        if (local.charAt(0) === '"') {
          if (local.charAt(local.length - 1) !== '"') {
            return { email: email, valid: false, reason: "引号本地部分未正确闭合" };
          }
        } else {
          if (/^\./.test(local) || /\.$/.test(local)) {
            return { email: email, valid: false, reason: "本地部分不能以点开头或结尾" };
          }
          if (/\.{2,}/.test(local)) {
            return { email: email, valid: false, reason: "本地部分不能包含连续点" };
          }
          if (!/^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.]+$/.test(local)) {
            return { email: email, valid: false, reason: "本地部分包含非法字符" };
          }
        }

        /* 域名部分验证 */
        if (domain.length === 0) {
          return { email: email, valid: false, reason: "@ 后域名部分为空" };
        }
        if (domain.length > 253) {
          return { email: email, valid: false, reason: "域名部分超过 253 字符（RFC 5321）" };
        }

        if (/^\[.+\]$/.test(domain)) {
          var ip = domain.slice(1, -1);
          var ipv4Match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(ip);
          if (ipv4Match) {
            var allValid = ipv4Match.slice(1).every(function (n) {
              return parseInt(n, 10) <= 255;
            });
            if (!allValid) {
              return { email: email, valid: false, reason: "IP 地址字面量无效" };
            }
          }
          return { email: email, valid: true, local: local, domain: domain };
        }

        var labels = domain.split(".");
        if (labels.length < 2) {
          return { email: email, valid: false, reason: "域名至少需要一个点（如 example.com）" };
        }

        for (var i = 0; i < labels.length; i++) {
          var label = labels[i];
          if (label.length === 0) {
            return { email: email, valid: false, reason: "域名中存在空标签（连续点或首尾点）" };
          }
          if (label.length > 63) {
            return {
              email: email,
              valid: false,
              reason: '域名标签 "' + label + '" 超过 63 字符'
            };
          }
          if (
            !/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(label) &&
            !/^[a-zA-Z0-9]$/.test(label)
          ) {
            return {
              email: email,
              valid: false,
              reason:
                '域名标签 "' + label + '" 格式无效（只允许字母数字连字符，不能以连字符开头/结尾）'
            };
          }
        }

        var tld = labels[labels.length - 1];
        if (/^\d+$/.test(tld)) {
          return { email: email, valid: false, reason: "顶级域名不能全为数字" };
        }

        return { email: email, valid: true, local: local, domain: domain };
      }

      function runValidation() {
        var raw = inputEl.value;
        if (!raw.trim()) {
          showStatus("请输入邮箱地址", "error");
          return;
        }

        var optSkipEmpty = document.getElementById("optSkipEmpty").checked;
        var optShowParts = document.getElementById("optShowParts").checked;
        var lines = raw.split("\n");

        validResults = [];
        invalidResults = [];
        var skippedCount = 0;
        var items = [];

        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          var isEmpty = line.trim() === "";
          if (isEmpty) {
            if (optSkipEmpty) {
              skippedCount++;
              continue;
            }
          }
          var result = validateEmail(line);
          if (result.valid) {
            validResults.push(result.email.trim());
          } else if (!isEmpty) {
            invalidResults.push(result.email);
          }
          items.push({ result: result, isEmpty: isEmpty });
        }

        renderResults(items, optShowParts, skippedCount);

        var total = items.length;
        var validCount = validResults.length;
        var invalidCount = invalidResults.length;

        document.getElementById("statTotal").textContent = total;
        document.getElementById("statValid").textContent = validCount;
        document.getElementById("statInvalid").textContent = invalidCount;
        document.getElementById("statSkipped").textContent = skippedCount;
        statsEl.classList.add("show");

        if (invalidCount === 0 && validCount > 0) {
          showStatus("全部 " + validCount + " 个地址均有效", "success");
        } else if (validCount === 0 && invalidCount > 0) {
          showStatus("全部 " + invalidCount + " 个地址均无效", "error");
        } else {
          showStatus(validCount + " 个有效，" + invalidCount + " 个无效", "");
        }
      }

      function renderResults(items, showParts, skippedCount) {
        resultListEl.textContent = "";

        if (items.length === 0) {
          var hint = document.createElement("div");
          hint.className = "empty-hint";
          hint.textContent = "没有可处理的行（已跳过 " + skippedCount + " 个空行）";
          resultListEl.appendChild(hint);
          return;
        }

        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          var r = item.result;

          var row = document.createElement("div");
          var badge = document.createElement("span");
          var emailSpan = document.createElement("div");
          var emailText = document.createElement("div");

          badge.className = "result-badge";
          row.className = "result-item";

          if (item.isEmpty) {
            row.classList.add("skipped");
            badge.classList.add("skipped");
            badge.textContent = "空";
            emailText.textContent = "(空行)";
            emailText.style.color = "var(--text-muted)";
            emailSpan.appendChild(emailText);
          } else if (r.valid) {
            row.classList.add("valid");
            badge.classList.add("valid");
            badge.textContent = "有效";
            emailText.textContent = r.email;
            emailText.className = "result-email";
            emailSpan.appendChild(emailText);
            if (showParts && r.local !== undefined) {
              var parts = document.createElement("div");
              parts.className = "result-parts";
              var localSpan = document.createElement("span");
              localSpan.textContent = r.local;
              var domainSpan = document.createElement("span");
              domainSpan.textContent = r.domain;
              parts.appendChild(document.createTextNode("本地: "));
              parts.appendChild(localSpan);
              parts.appendChild(document.createTextNode("  域名: "));
              parts.appendChild(domainSpan);
              emailSpan.appendChild(parts);
            }
          } else {
            row.classList.add("invalid");
            badge.classList.add("invalid");
            badge.textContent = "无效";
            emailText.textContent = r.email || "(空)";
            emailText.className = "result-email";
            var reasonEl = document.createElement("div");
            reasonEl.className = "result-reason";
            reasonEl.textContent = r.reason;
            emailSpan.appendChild(emailText);
            emailSpan.appendChild(reasonEl);
          }

          row.appendChild(badge);
          row.appendChild(emailSpan);
          resultListEl.appendChild(row);
        }
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      document.getElementById("btnPaste").onclick = async function () {
        try {
          var text = await navigator.clipboard.readText();
          inputEl.value = text;
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnValidate").onclick = runValidation;

      document.getElementById("btnClear").onclick = function () {
        inputEl.value = "";
        resultListEl.textContent = "";
        var hintEl = document.createElement("div");
        hintEl.className = "empty-hint";
        hintEl.textContent = "在左侧输入邮箱地址后，点击「验证」按钮";
        resultListEl.appendChild(hintEl);
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
        validResults = [];
        invalidResults = [];
      };

      document.getElementById("btnCopyValid").onclick = async function () {
        if (validResults.length === 0) {
          showStatus("没有有效地址", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(validResults.join("\n"));
          showStatus("已复制 " + validResults.length + " 个有效地址", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnCopyInvalid").onclick = async function () {
        if (invalidResults.length === 0) {
          showStatus("没有无效地址", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(invalidResults.join("\n"));
          showStatus("已复制 " + invalidResults.length + " 个无效地址", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          runValidation();
        }
      });

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
    
