// @ts-nocheck
// Generated from tools/data/data-sorter.html
// Source SHA-256: 9cc1394d4ef9ca368114eb30133e7453c6fc68e0ec76d12a72a2a56907c0c853
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const statsEl = document.getElementById("stats");
      const dataTypeEl = document.getElementById("dataType");
      const sortModeEl = document.getElementById("sortMode");
      const sortOrderEl = document.getElementById("sortOrder");
      const caseSensitiveEl = document.getElementById("caseSensitive");
      const csvOptionsEl = document.getElementById("csvOptions");
      const csvDelimiterEl = document.getElementById("csvDelimiter");
      const csvColumnEl = document.getElementById("csvColumn");
      const csvHasHeaderEl = document.getElementById("csvHasHeader");
      const LS_KEY = "data_sorter_input_v1";

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

      dataTypeEl.addEventListener("change", function () {
        if (dataTypeEl.value === "csv") {
          csvOptionsEl.classList.add("show");
          updateCsvColumns();
        } else {
          csvOptionsEl.classList.remove("show");
        }
      });

      inputEl.addEventListener("input", function () {
        saveToStorage();
        saveToUrl();
        if (dataTypeEl.value === "csv") {
          updateCsvColumns();
        }
      });

      function updateCsvColumns() {
        const text = inputEl.value.trim();
        if (!text) return;

        const delimiter = csvDelimiterEl.value === "tab" ? "\t" : csvDelimiterEl.value;
        const lines = text.split("\n");
        if (lines.length === 0) return;

        const firstLine = lines[0];
        const columns = parseCSVLine(firstLine, delimiter);

        while (csvColumnEl.firstChild) {
          csvColumnEl.removeChild(csvColumnEl.firstChild);
        }
        columns.forEach(function (col, index) {
          const option = document.createElement("option");
          option.value = index;
          if (csvHasHeaderEl.checked && col.trim()) {
            option.textContent = col.trim() + " (列 " + (index + 1) + ")";
          } else {
            option.textContent = "第 " + (index + 1) + " 列";
          }
          csvColumnEl.appendChild(option);
        });
      }

      csvDelimiterEl.addEventListener("change", updateCsvColumns);
      csvHasHeaderEl.addEventListener("change", updateCsvColumns);

      function parseCSVLine(line, delimiter) {
        const result = [];
        let current = "";
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
              current += '"';
              i++;
            } else {
              inQuotes = !inQuotes;
            }
          } else if (char === delimiter && !inQuotes) {
            result.push(current);
            current = "";
          } else {
            current += char;
          }
        }
        result.push(current);
        return result;
      }

      function naturalCompare(a, b) {
        const ax = [];
        const bx = [];

        a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
          ax.push([$1 || Infinity, $2 || ""]);
        });
        b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
          bx.push([$1 || Infinity, $2 || ""]);
        });

        while (ax.length && bx.length) {
          const an = ax.shift();
          const bn = bx.shift();
          const nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
          if (nn) return nn;
        }

        return ax.length - bx.length;
      }

      function sortData() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入数据", "error");
          return;
        }

        const dataType = dataTypeEl.value;
        const sortMode = sortModeEl.value;
        const sortOrder = sortOrderEl.value;
        const caseSensitive = caseSensitiveEl.checked;

        let result;
        let lineCount;

        if (dataType === "text") {
          result = sortText(text, sortMode, sortOrder, caseSensitive);
          lineCount = result.split("\n").filter(function (l) {
            return l.trim();
          }).length;
        } else {
          result = sortCSV(text, sortMode, sortOrder, caseSensitive);
          lineCount = result.split("\n").filter(function (l) {
            return l.trim();
          }).length;
        }

        outputEl.value = result;
        document.getElementById("statLines").textContent = lineCount;
        statsEl.classList.add("show");
        showStatus("排序完成", "success");
      }

      function sortText(text, sortMode, sortOrder, caseSensitive) {
        let lines = text.split("\n").filter(function (l) {
          return l.trim();
        });

        const compareFn = getCompareFn(sortMode, caseSensitive, function (item) {
          return item;
        });

        lines.sort(compareFn);

        if (sortOrder === "desc") {
          lines.reverse();
        }

        return lines.join("\n");
      }

      function sortCSV(text, sortMode, sortOrder, caseSensitive) {
        const delimiter = csvDelimiterEl.value === "tab" ? "\t" : csvDelimiterEl.value;
        const columnIndex = parseInt(csvColumnEl.value, 10);
        const hasHeader = csvHasHeaderEl.checked;

        let lines = text.split("\n");
        let header = "";

        if (hasHeader && lines.length > 0) {
          header = lines.shift();
        }

        lines = lines.filter(function (l) {
          return l.trim();
        });

        const getValue = function (line) {
          const columns = parseCSVLine(line, delimiter);
          return columns[columnIndex] || "";
        };

        const compareFn = getCompareFn(sortMode, caseSensitive, getValue);

        lines.sort(compareFn);

        if (sortOrder === "desc") {
          lines.reverse();
        }

        if (hasHeader && header) {
          lines.unshift(header);
        }

        return lines.join("\n");
      }

      function getCompareFn(sortMode, caseSensitive, getValue) {
        return function (a, b) {
          let valA = getValue(a);
          let valB = getValue(b);

          if (!caseSensitive) {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
          }

          switch (sortMode) {
            case "numeric":
              const numA = parseFloat(valA) || 0;
              const numB = parseFloat(valB) || 0;
              return numA - numB;

            case "length":
              return valA.length - valB.length;

            case "natural":
              return naturalCompare(valA, valB);

            case "alphabetical":
            default:
              return valA.localeCompare(valB);
          }
        };
      }

      document.getElementById("btnPaste").onclick = async function () {
        try {
          const text = await navigator.clipboard.readText();
          inputEl.value = text;
          saveToStorage();
          saveToUrl();
          if (dataTypeEl.value === "csv") {
            updateCsvColumns();
          }
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnSort").onclick = sortData;

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

      document.getElementById("btnDownload").onclick = function () {
        if (!outputEl.value) {
          showStatus("没有内容", "error");
          return;
        }
        const blob = new Blob([outputEl.value], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = dataTypeEl.value === "csv" ? "sorted_data.csv" : "sorted_data.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showStatus("已下载", "success");
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
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
      };

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          sortData();
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
    
