// @ts-nocheck
// Generated from tools/privacy/log-masker.html
// Source SHA-256: 89843bc6ad7a0e1a6275cb984a12eace5a52744de23921302ed6a02899e56dc7
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Elements
      // ============================================
      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const statsEl = document.getElementById("stats");
      const statsListEl = document.getElementById("statsList");

      const LS_KEY = "log_masker_input_v1";

      // ============================================
      // Masking Rules
      // ============================================
      const rules = {
        ip: {
          pattern:
            /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
          mask: (match) => match.replace(/\d+/g, (d, i) => (i > 0 ? "***" : d)),
          label: "IPv4 地址"
        },
        ipv6: {
          pattern:
            /\b(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b|\b(?:[0-9a-fA-F]{1,4}:){1,7}:|:(?::[0-9a-fA-F]{1,4}){1,7}\b/g,
          mask: () => "****:****:****:****",
          label: "IPv6 地址"
        },
        email: {
          pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
          mask: (match) => {
            const [local, domain] = match.split("@");
            const maskedLocal = local.length > 2 ? local[0] + "***" + local.slice(-1) : "***";
            return maskedLocal + "@" + domain;
          },
          label: "邮箱"
        },
        phone: {
          pattern: /\b1[3-9]\d{9}\b/g,
          mask: (match) => match.slice(0, 3) + "****" + match.slice(-4),
          label: "手机号"
        },
        idCard: {
          pattern:
            /\b[1-9]\d{5}(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dXx]\b/g,
          mask: (match) => match.slice(0, 6) + "********" + match.slice(-4),
          label: "身份证号"
        },
        bankCard: {
          pattern: /\b\d{16,19}\b/g,
          mask: (match) => match.slice(0, 4) + " **** **** " + match.slice(-4),
          label: "银行卡号"
        },
        mac: {
          pattern: /\b(?:[0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}\b/g,
          mask: (match) => {
            const sep = match.includes(":") ? ":" : "-";
            return "XX" + sep + "XX" + sep + "XX" + sep + "XX" + sep + "XX" + sep + "XX";
          },
          label: "MAC 地址"
        }
      };

      // ============================================
      // URL State Management
      // ============================================
      window.loadFromUrl = function () {
        const hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          inputEl.value = decodeURIComponent(atob(hash));
          return true;
        } catch (e) {
          return false;
        }
      };

      function saveToUrl() {
        try {
          const encoded = btoa(encodeURIComponent(inputEl.value));
          history.replaceState(null, "", "#" + encoded);
        } catch (e) {}
      }

      // ============================================
      // Local Storage Management
      // ============================================
      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          inputEl.value = saved;
        }
      }

      function saveToStorage() {
        localStorage.setItem(LS_KEY, inputEl.value);
      }

      // ============================================
      // Masking Logic
      // ============================================
      function maskLog() {
        const text = inputEl.value;
        if (!text.trim()) {
          showStatus("请输入内容", "error");
          return;
        }

        let result = text;
        const stats = {};
        const ruleOrder = ["idCard", "bankCard", "ipv6", "ip", "email", "phone", "mac"];

        ruleOrder.forEach((key) => {
          const checkbox = document.getElementById(
            "mask" + key.charAt(0).toUpperCase() + key.slice(1)
          );
          if (!checkbox || !checkbox.checked) return;

          const rule = rules[key];
          if (!rule) return;

          let count = 0;
          result = result.replace(rule.pattern, (match) => {
            count++;
            return rule.mask(match);
          });

          if (count > 0) {
            stats[rule.label] = count;
          }
        });

        outputEl.value = result;

        const entries = Object.entries(stats);
        if (entries.length > 0) {
          statsListEl.textContent = "";
          entries.forEach(([label, count]) => {
            const item = document.createElement("span");
            item.className = "stat-item";
            item.textContent = label + ": ";
            const countSpan = document.createElement("span");
            countSpan.className = "stat-count";
            countSpan.textContent = count;
            item.appendChild(countSpan);
            statsListEl.appendChild(item);
          });
          statsEl.style.display = "block";

          const total = entries.reduce((sum, [, c]) => sum + c, 0);
          showStatus("脱敏完成，共处理 " + total + " 处敏感信息", "success");
        } else {
          statsEl.style.display = "none";
          showStatus("未发现需要脱敏的内容", "success");
        }
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // ============================================
      // Event Handlers
      // ============================================
      document.getElementById("btnPaste").onclick = async () => {
        try {
          const text = await navigator.clipboard.readText();
          inputEl.value = text;
          saveToStorage();
          saveToUrl();
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnMask").onclick = maskLog;

      document.getElementById("btnCopy").onclick = async () => {
        if (!outputEl.value) {
          showStatus("没有可复制的内容", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(outputEl.value);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnShare").onclick = async () => {
        saveToUrl();
        try {
          await navigator.clipboard.writeText(location.href);
          showStatus("分享链接已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = () => {
        inputEl.value = "";
        outputEl.value = "";
        statsEl.style.display = "none";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
        showStatus("已清空", "success");
      };

      inputEl.addEventListener("input", () => {
        saveToStorage();
        saveToUrl();
      });

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
      // Initialization
      // ============================================
      window.toggleTheme = toggleTheme;
      initTheme();
      if (!loadFromUrl()) {
        loadFromStorage();
      }
    
