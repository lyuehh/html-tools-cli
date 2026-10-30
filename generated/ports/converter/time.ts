// @ts-nocheck
// Generated from tools/converter/time.html
// Source SHA-256: 4c94490753ceed864e000e0957d7bd42a8ad5314e52d97ca95b4e8daceb4e8f6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const units = {
        ns: { name: "纳秒 (ns)", toMs: 1e-6 },
        us: { name: "微秒 (μs)", toMs: 0.001 },
        ms: { name: "毫秒 (ms)", toMs: 1 },
        s: { name: "秒 (s)", toMs: 1000 },
        min: { name: "分钟 (min)", toMs: 60000 },
        h: { name: "小时 (h)", toMs: 3600000 },
        d: { name: "天 (day)", toMs: 86400000 },
        w: { name: "周 (week)", toMs: 604800000 },
        mo: { name: "月 (30天)", toMs: 2592000000 },
        y: { name: "年 (365天)", toMs: 31536000000 }
      };

      function convert() {
        const value = parseFloat(document.getElementById("inputValue").value) || 0;
        const fromUnit = document.getElementById("inputUnit").value;
        const ms = value * units[fromUnit].toMs;

        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";

        Object.entries(units).forEach(([key, unit]) => {
          const result = ms / unit.toMs;
          const formatted = formatNumber(result);
          resultsDiv.innerHTML += `
                    <div class="result-item" onclick="copyValue('${formatted}')">
                        <div class="unit">${unit.name}</div>
                        <div class="value">${formatted}</div>
                    </div>
                `;
        });

        updateBreakdown(ms);
      }

      function updateBreakdown(ms) {
        if (ms <= 0) {
          document.getElementById("breakdown").textContent = "0";
          return;
        }

        const parts = [];
        let remaining = ms;

        const y = Math.floor(remaining / 31536000000);
        if (y > 0) {
          parts.push(`${y}年`);
          remaining %= 31536000000;
        }

        const d = Math.floor(remaining / 86400000);
        if (d > 0) {
          parts.push(`${d}天`);
          remaining %= 86400000;
        }

        const h = Math.floor(remaining / 3600000);
        if (h > 0) {
          parts.push(`${h}时`);
          remaining %= 3600000;
        }

        const min = Math.floor(remaining / 60000);
        if (min > 0) {
          parts.push(`${min}分`);
          remaining %= 60000;
        }

        const s = Math.floor(remaining / 1000);
        if (s > 0) {
          parts.push(`${s}秒`);
          remaining %= 1000;
        }

        if (remaining > 0) {
          parts.push(`${Math.round(remaining)}毫秒`);
        }

        document.getElementById("breakdown").textContent = parts.join(" ") || "0";
      }

      function formatNumber(num) {
        if (num === 0) return "0";
        if (Math.abs(num) >= 1e12 || Math.abs(num) < 1e-6) {
          return num.toExponential(4);
        }
        return parseFloat(num.toPrecision(10)).toString();
      }

      window.copyValue = function (value) {
        navigator.clipboard.writeText(value);
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      };

      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) document.documentElement.setAttribute("data-theme", saved);
        convert();
      })();
    
