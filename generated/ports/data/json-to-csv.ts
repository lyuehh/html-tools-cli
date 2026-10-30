// @ts-nocheck
// Generated from tools/data/json-to-csv.html
// Source SHA-256: 5a3a0e360acd60d592bd8c712a23baadb091a5e0c53126e6300cef3b60258094
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const errorDetailEl = document.getElementById("errorDetail");
      const statsEl = document.getElementById("stats");
      const delimiterEl = document.getElementById("delimiter");
      const includeHeadersEl = document.getElementById("includeHeaders");
      const flattenNestedEl = document.getElementById("flattenNested");
      const quoteAllEl = document.getElementById("quoteAll");
      const LS_KEY = "json_to_csv_input_v1";

      // Sample data for demonstration
      const SAMPLE_JSON = [
        {
          name: "张三",
          age: 25,
          email: "zhangsan@example.com",
          address: {
            city: "北京",
            district: "朝阳区",
            zip: "100000"
          },
          hobbies: ["读书", "游泳", "编程"],
          active: true
        },
        {
          name: "李四",
          age: 30,
          email: "lisi@example.com",
          address: {
            city: "上海",
            district: "浦东新区",
            zip: "200000"
          },
          hobbies: ["音乐", "旅行"],
          active: false
        },
        {
          name: "王五",
          age: 28,
          email: "wangwu@example.com",
          address: {
            city: "深圳",
            district: "南山区",
            zip: "518000"
          },
          hobbies: ["摄影"],
          active: true
        }
      ];

      // URL state management
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
        } catch (e) {
          // Ignore encoding errors
        }
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) inputEl.value = saved;
      }

      function saveToStorage() {
        localStorage.setItem(LS_KEY, inputEl.value);
      }

      // Flatten nested objects with dot notation
      function flattenObject(obj, prefix = "", result = {}) {
        for (const key in obj) {
          if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

          const newKey = prefix ? `${prefix}.${key}` : key;
          const value = obj[key];

          if (value === null || value === undefined) {
            result[newKey] = "";
          } else if (Array.isArray(value)) {
            // Convert array to string representation
            result[newKey] = value
              .map((item) => {
                if (typeof item === "object" && item !== null) {
                  return JSON.stringify(item);
                }
                return String(item);
              })
              .join("; ");
          } else if (typeof value === "object") {
            flattenObject(value, newKey, result);
          } else {
            result[newKey] = value;
          }
        }
        return result;
      }

      // Escape CSV field value
      function escapeCSVField(value, delimiter, quoteAll) {
        if (value === null || value === undefined) {
          return quoteAll ? '""' : "";
        }

        const stringValue = String(value);

        // Check if quoting is needed
        const needsQuoting =
          quoteAll ||
          stringValue.includes('"') ||
          stringValue.includes(delimiter) ||
          stringValue.includes("\n") ||
          stringValue.includes("\r");

        if (needsQuoting) {
          // Escape double quotes by doubling them
          const escaped = stringValue.replace(/"/g, '""');
          return `"${escaped}"`;
        }

        return stringValue;
      }

      // Convert JSON array to CSV
      function jsonToCsv(data, options) {
        const { delimiter, includeHeaders, flattenNested, quoteAll } = options;

        if (!Array.isArray(data)) {
          throw new Error("输入必须是 JSON 数组");
        }

        if (data.length === 0) {
          throw new Error("JSON 数组为空");
        }

        // Process each row
        const processedRows = data.map((row) => {
          if (typeof row !== "object" || row === null || Array.isArray(row)) {
            throw new Error("数组元素必须是对象");
          }
          return flattenNested ? flattenObject(row) : row;
        });

        // Collect all unique headers from all rows
        const headerSet = new Set();
        processedRows.forEach((row) => {
          Object.keys(row).forEach((key) => headerSet.add(key));
        });
        const headers = Array.from(headerSet);

        // Build CSV lines
        const lines = [];

        if (includeHeaders) {
          lines.push(headers.map((h) => escapeCSVField(h, delimiter, quoteAll)).join(delimiter));
        }

        processedRows.forEach((row) => {
          const values = headers.map((header) => {
            let value = row[header];

            // Handle different value types
            if (value === undefined || value === null) {
              value = "";
            } else if (typeof value === "boolean") {
              value = value ? "true" : "false";
            } else if (typeof value === "object") {
              // This handles any remaining objects or arrays that weren't flattened
              value = JSON.stringify(value);
            }

            return escapeCSVField(value, delimiter, quoteAll);
          });
          lines.push(values.join(delimiter));
        });

        return {
          csv: lines.join("\n"),
          rows: processedRows.length,
          cols: headers.length
        };
      }

      // Convert function
      function convert() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入 JSON 数据", "error");
          return;
        }

        try {
          const data = JSON.parse(text);
          const options = {
            delimiter: delimiterEl.value,
            includeHeaders: includeHeadersEl.checked,
            flattenNested: flattenNestedEl.checked,
            quoteAll: quoteAllEl.checked
          };

          const result = jsonToCsv(data, options);
          outputEl.value = result.csv;
          inputEl.classList.remove("error");
          errorDetailEl.classList.remove("show");

          // Update stats
          document.getElementById("statRows").textContent = result.rows;
          document.getElementById("statCols").textContent = result.cols;
          document.getElementById("statSize").textContent = formatSize(new Blob([result.csv]).size);
          statsEl.classList.add("show");

          showStatus(`转换成功: ${result.rows} 行, ${result.cols} 列`, "success");
        } catch (e) {
          inputEl.classList.add("error");
          errorDetailEl.textContent = e.message;
          errorDetailEl.classList.add("show");
          statsEl.classList.remove("show");
          showStatus("转换失败", "error");
        }
      }

      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // Download CSV file
      function downloadCSV() {
        const csv = outputEl.value;
        if (!csv) {
          showStatus("没有可下载的内容", "error");
          return;
        }

        // Add BOM for Excel compatibility with Chinese characters
        const BOM = "\uFEFF";
        const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `data_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showStatus("已下载 CSV 文件", "success");
      }

      // Load sample data
      function loadSample() {
        inputEl.value = JSON.stringify(SAMPLE_JSON, null, 2);
        saveToStorage();
        saveToUrl();
        showStatus("已加载示例数据", "success");
      }

      // Event listeners
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

      document.getElementById("btnConvert").onclick = convert;
      document.getElementById("btnSample").onclick = loadSample;
      document.getElementById("btnDownload").onclick = downloadCSV;

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
        inputEl.classList.remove("error");
        errorDetailEl.classList.remove("show");
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
      };

      inputEl.addEventListener("input", function () {
        saveToStorage();
        saveToUrl();
        inputEl.classList.remove("error");
        errorDetailEl.classList.remove("show");
      });

      // Auto-convert when options change
      [delimiterEl, includeHeadersEl, flattenNestedEl, quoteAllEl].forEach((el) => {
        el.addEventListener("change", function () {
          if (inputEl.value.trim()) {
            convert();
          }
        });
      });

      // Keyboard shortcuts
      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          convert();
        }
      });

      // Theme toggle
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

      // Initialize
      initTheme();
      if (!loadFromUrl()) loadFromStorage();
    
