// @ts-nocheck
// Generated from tools/time/cron-parser.html
// Source SHA-256: 8dfbdc6dba4395b933b0d7426c78bebeea6284c10db16ccea77319169599ba9e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const cronInput = document.getElementById("cronInput");
      const descriptionEl = document.getElementById("description");
      const nextRunsEl = document.getElementById("nextRuns");
      const statusEl = document.getElementById("status");
      const presetGrid = document.getElementById("presetGrid");

      const PRESETS = [
        ["* * * * *", "每分钟"],
        ["0 * * * *", "每小时"],
        ["0 0 * * *", "每天 00:00"],
        ["0 12 * * *", "每天 12:00"],
        ["0 0 * * 0", "每周日 00:00"],
        ["0 0 * * 1", "每周一 00:00"],
        ["0 0 1 * *", "每月1日 00:00"],
        ["0 0 1 1 *", "每年1月1日"],
        ["*/5 * * * *", "每5分钟"],
        ["*/15 * * * *", "每15分钟"],
        ["0 */2 * * *", "每2小时"],
        ["0 9-17 * * 1-5", "工作日 9-17点整"]
      ];

      const DAYS = ["日", "一", "二", "三", "四", "五", "六"];
      const MONTHS = [
        "",
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ];

      function parseCron(expr) {
        const parts = expr.trim().split(/\s+/);

        if (parts.length < 5 || parts.length > 6) {
          return { valid: false, error: "需要 5 或 6 个字段" };
        }

        const hasSeconds = parts.length === 6;
        const offset = hasSeconds ? 1 : 0;

        const fields = {
          second: hasSeconds ? parts[0] : null,
          minute: parts[offset],
          hour: parts[offset + 1],
          day: parts[offset + 2],
          month: parts[offset + 3],
          dow: parts[offset + 4]
        };

        // 验证字段格式
        const validations = {
          minute: { min: 0, max: 59, name: "分钟" },
          hour: { min: 0, max: 23, name: "小时" },
          day: { min: 1, max: 31, name: "日" },
          month: { min: 1, max: 12, name: "月" },
          dow: { min: 0, max: 7, name: "星期" }
        };

        if (hasSeconds) {
          validations.second = { min: 0, max: 59, name: "秒" };
        }

        for (const [field, rules] of Object.entries(validations)) {
          if (!validateField(fields[field], rules.min, rules.max)) {
            return { valid: false, error: rules.name + " 字段格式无效" };
          }
        }

        return { valid: true, fields, hasSeconds };
      }

      function validateField(value, min, max) {
        if (value === "*") return true;

        // 支持 */n 格式
        if (/^\*\/\d+$/.test(value)) {
          const step = parseInt(value.slice(2));
          return step > 0 && step <= max;
        }

        // 支持范围 n-m
        if (/^\d+-\d+$/.test(value)) {
          const [start, end] = value.split("-").map(Number);
          return start >= min && end <= max && start <= end;
        }

        // 支持列表 n,m,p
        if (/^[\d,]+$/.test(value)) {
          return value.split(",").every((n) => {
            const num = parseInt(n);
            return num >= min && num <= max;
          });
        }

        // 支持组合 n-m/s
        if (/^\d+-\d+\/\d+$/.test(value)) {
          return true;
        }

        // 单个数字
        if (/^\d+$/.test(value)) {
          const num = parseInt(value);
          return num >= min && num <= max;
        }

        return false;
      }

      window.describeField = function (value, type) {
        if (value === "*") return "每" + type;
        if (value.startsWith("*/")) return "每 " + value.slice(2) + " " + type;
        if (value.includes("-")) {
          const [start, end] = value.split("-");
          return start + "-" + end + " " + type;
        }
        if (value.includes(",")) return value + " " + type;
        return value + " " + type;
      };

      function describeCron(result) {
        if (!result.valid) return result.error;

        const { fields, hasSeconds } = result;
        let desc = "";

        // 简化描述逻辑
        const isAll = (f) => f === "*";
        const isEvery = (f) => f && f.startsWith("*/");

        if (
          isAll(fields.minute) &&
          isAll(fields.hour) &&
          isAll(fields.day) &&
          isAll(fields.month) &&
          isAll(fields.dow)
        ) {
          desc = "每分钟执行";
        } else if (
          fields.minute === "0" &&
          isAll(fields.hour) &&
          isAll(fields.day) &&
          isAll(fields.month) &&
          isAll(fields.dow)
        ) {
          desc = "每小时整点执行";
        } else if (
          fields.minute === "0" &&
          fields.hour === "0" &&
          isAll(fields.day) &&
          isAll(fields.month) &&
          isAll(fields.dow)
        ) {
          desc = "每天 00:00 执行";
        } else if (isEvery(fields.minute)) {
          desc = "每 " + fields.minute.slice(2) + " 分钟执行";
        } else {
          // 通用描述
          const parts = [];
          if (!isAll(fields.month)) parts.push(fields.month + "月");
          if (!isAll(fields.day)) parts.push(fields.day + "日");
          if (!isAll(fields.dow)) {
            const dow = fields.dow
              .split(",")
              .map((d) => "周" + DAYS[parseInt(d) % 7])
              .join("、");
            parts.push(dow);
          }
          if (!isAll(fields.hour) || !isAll(fields.minute)) {
            parts.push(fields.hour + ":" + fields.minute.padStart(2, "0"));
          }
          desc = parts.join(" ") + " 执行";
        }

        if (hasSeconds && fields.second !== "0") {
          desc += " (秒: " + fields.second + ")";
        }

        return desc;
      }

      function getNextRuns(expr, count = 5) {
        const result = parseCron(expr);
        if (!result.valid) return [];

        const { fields, hasSeconds } = result;
        const runs = [];
        let date = new Date();
        date.setSeconds(0);
        date.setMilliseconds(0);

        const maxIterations = 10000;
        let iterations = 0;

        while (runs.length < count && iterations < maxIterations) {
          iterations++;
          date = new Date(date.getTime() + 60000); // 增加1分钟

          if (matchesCron(date, fields)) {
            runs.push(new Date(date));
          }
        }

        return runs;
      }

      function matchesCron(date, fields) {
        return (
          matchField(date.getMinutes(), fields.minute) &&
          matchField(date.getHours(), fields.hour) &&
          matchField(date.getDate(), fields.day) &&
          matchField(date.getMonth() + 1, fields.month) &&
          matchField(date.getDay(), fields.dow)
        );
      }

      function matchField(value, pattern) {
        if (pattern === "*") return true;
        if (pattern.startsWith("*/")) {
          const step = parseInt(pattern.slice(2));
          return value % step === 0;
        }
        if (pattern.includes("-")) {
          const [start, end] = pattern.split("-").map(Number);
          return value >= start && value <= end;
        }
        if (pattern.includes(",")) {
          return pattern.split(",").map(Number).includes(value);
        }
        return parseInt(pattern) === value;
      }

      function parse() {
        const expr = cronInput.value.trim();
        const result = parseCron(expr);

        // 更新字段显示
        if (result.valid) {
          document.getElementById("f-min").textContent = result.fields.minute;
          document.getElementById("f-hour").textContent = result.fields.hour;
          document.getElementById("f-day").textContent = result.fields.day;
          document.getElementById("f-month").textContent = result.fields.month;
          document.getElementById("f-dow").textContent = result.fields.dow;
          document.getElementById("f-sec").textContent = result.fields.second || "-";
        }

        // 更新描述
        const desc = describeCron(result);
        descriptionEl.textContent = desc;
        descriptionEl.className = "description " + (result.valid ? "valid" : "invalid");

        // 更新下次执行时间
        nextRunsEl.textContent = "";
        if (result.valid) {
          const runs = getNextRuns(expr);
          runs.forEach((date) => {
            const div = document.createElement("div");
            div.className = "run-item";
            div.textContent = formatDate(date);
            nextRunsEl.appendChild(div);
          });
          showStatus("解析成功", "success");
        } else {
          const div = document.createElement("div");
          div.className = "run-item";
          div.textContent = "无法计算";
          nextRunsEl.appendChild(div);
          showStatus(result.error, "error");
        }

        // 保存到 URL
        history.replaceState(null, "", "#" + encodeURIComponent(expr));
      }

      function formatDate(date) {
        const pad = (n) => n.toString().padStart(2, "0");
        return (
          date.getFullYear() +
          "-" +
          pad(date.getMonth() + 1) +
          "-" +
          pad(date.getDate()) +
          " " +
          pad(date.getHours()) +
          ":" +
          pad(date.getMinutes()) +
          " 周" +
          DAYS[date.getDay()]
        );
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // 渲染预设
      PRESETS.forEach(([expr, desc]) => {
        const item = document.createElement("div");
        item.className = "preset-item";
        item.onclick = () => {
          cronInput.value = expr;
          parse();
        };

        const exprSpan = document.createElement("span");
        exprSpan.className = "expr";
        exprSpan.textContent = expr;

        const descSpan = document.createElement("span");
        descSpan.textContent = desc;

        item.appendChild(exprSpan);
        item.appendChild(descSpan);
        presetGrid.appendChild(item);
      });

      // 事件绑定
      document.getElementById("btnParse").onclick = parse;
      cronInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") parse();
      });

      // 从 URL 加载
      const hash = decodeURIComponent(location.hash.slice(1));
      if (hash) {
        cronInput.value = hash;
      }

      // 初始解析
      parse();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
