// @ts-nocheck
// Generated from tools/data/data-normalizer.html
// Source SHA-256: e1420cc58b8cacdf3baa7d2291cb96f691220320e272e35e90742d8d10c2f648
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const methodEl = document.getElementById("method");
      const rangeMinEl = document.getElementById("rangeMin");
      const rangeMaxEl = document.getElementById("rangeMax");
      const precisionEl = document.getElementById("precision");
      const LS_KEY = "data_normalizer_input_v1";

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
          if (inputEl.value.length > 2000) return;
          history.replaceState(null, "", "#" + btoa(encodeURIComponent(inputEl.value)));
        } catch (e) {}
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) inputEl.value = saved;
      }

      function saveToStorage() {
        localStorage.setItem(LS_KEY, inputEl.value);
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function updateRangeInputs() {
        const method = methodEl.value;
        const isMinMax = method === "minmax";
        rangeMinEl.disabled = !isMinMax;
        rangeMaxEl.disabled = !isMinMax;
      }

      methodEl.addEventListener("change", updateRangeInputs);
      updateRangeInputs();

      function parseNumbers(text) {
        const numbers = [];
        const parts = text.split(/[\n,;，；\s]+/);
        for (const part of parts) {
          const trimmed = part.trim();
          if (trimmed === "") continue;
          const num = parseFloat(trimmed);
          if (!isNaN(num) && isFinite(num)) {
            numbers.push(num);
          }
        }
        return numbers;
      }

      function calcStats(numbers) {
        const n = numbers.length;
        const min = Math.min(...numbers);
        const max = Math.max(...numbers);
        const sum = numbers.reduce((a, b) => a + b, 0);
        const mean = sum / n;
        const variance = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
        const std = Math.sqrt(variance);
        return { min, max, mean, std, count: n };
      }

      function normalizeMinMax(numbers, stats, newMin, newMax) {
        const range = stats.max - stats.min;
        const newRange = newMax - newMin;
        if (range === 0) return numbers.map(() => newMin);
        return numbers.map((x) => ((x - stats.min) / range) * newRange + newMin);
      }

      function normalizeZScore(numbers, stats) {
        if (stats.std === 0) return numbers.map(() => 0);
        return numbers.map((x) => (x - stats.mean) / stats.std);
      }

      function normalizeDecimalScaling(numbers, stats) {
        const maxAbs = Math.max(Math.abs(stats.min), Math.abs(stats.max));
        if (maxAbs === 0) return numbers.map(() => 0);
        const j = Math.ceil(Math.log10(maxAbs + 1));
        const divisor = Math.pow(10, j);
        return numbers.map((x) => x / divisor);
      }

      function normalize() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入数据", "error");
          return;
        }

        const numbers = parseNumbers(text);
        if (numbers.length === 0) {
          showStatus("未找到有效数字", "error");
          return;
        }

        const stats = calcStats(numbers);
        const method = methodEl.value;
        const precision = parseInt(precisionEl.value, 10) || 4;
        const newMin = parseFloat(rangeMinEl.value) || 0;
        const newMax = parseFloat(rangeMaxEl.value) || 1;

        if (method === "minmax" && newMin >= newMax) {
          showStatus("范围最小值必须小于最大值", "error");
          return;
        }

        let normalized;
        let methodName;
        switch (method) {
          case "minmax":
            normalized = normalizeMinMax(numbers, stats, newMin, newMax);
            methodName = "Min-Max (" + newMin + "-" + newMax + ")";
            break;
          case "zscore":
            normalized = normalizeZScore(numbers, stats);
            methodName = "Z-score";
            break;
          case "decimal":
            normalized = normalizeDecimalScaling(numbers, stats);
            methodName = "小数定标";
            break;
          default:
            normalized = normalizeMinMax(numbers, stats, newMin, newMax);
            methodName = "Min-Max";
        }

        const lines = numbers.map((original, i) => {
          return original + " → " + normalized[i].toFixed(precision);
        });

        outputEl.value = lines.join("\n");

        document.getElementById("statMin").textContent = stats.min.toFixed(precision);
        document.getElementById("statMax").textContent = stats.max.toFixed(precision);
        document.getElementById("statMean").textContent = stats.mean.toFixed(precision);
        document.getElementById("statStd").textContent = stats.std.toFixed(precision);

        showStatus("已使用 " + methodName + " 处理 " + numbers.length + " 个数值", "success");
      }

      document.getElementById("btnPaste").onclick = async function () {
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

      document.getElementById("btnNormalize").onclick = normalize;

      document.getElementById("btnSample").onclick = function () {
        inputEl.value = "10, 25, 30, 45, 50, 65, 80, 95, 100, 120";
        saveToStorage();
        saveToUrl();
        normalize();
      };

      document.getElementById("btnCopy").onclick = async function () {
        if (!outputEl.value) {
          showStatus("没有内容", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(outputEl.value);
          showStatus("已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnShare").onclick = async function () {
        saveToUrl();
        try {
          await navigator.clipboard.writeText(location.href);
          showStatus("链接已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        inputEl.value = "";
        outputEl.value = "";
        document.getElementById("statMin").textContent = "-";
        document.getElementById("statMax").textContent = "-";
        document.getElementById("statMean").textContent = "-";
        document.getElementById("statStd").textContent = "-";
        statusEl.textContent = "";
        statusEl.className = "status";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
      };

      inputEl.addEventListener("input", function () {
        saveToStorage();
        saveToUrl();
      });

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          normalize();
        }
      });

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }

      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
      if (!loadFromUrl()) loadFromStorage();
    
