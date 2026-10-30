// @ts-nocheck
// Generated from tools/data/excel-to-json.html
// Source SHA-256: 2fa538357f4c629334b221a44d09cbb366d5d13138000cd2be9643fb70633d4f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme toggle
      function toggleTheme() {
        const isDark = document.body.getAttribute("data-theme") !== "light";
        document.body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved === "light") document.body.setAttribute("data-theme", "light");
      })();

      // File upload
      function handleFile(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById("input").value = e.target.result;
          showToast("文件已加载");
        };
        reader.readAsText(file);
      }

      // Drag and drop
      const fileUpload = document.querySelector(".file-upload");
      fileUpload.addEventListener("dragover", (e) => {
        e.preventDefault();
        fileUpload.style.borderColor = "var(--color-accent-cyan)";
      });
      fileUpload.addEventListener("dragleave", () => {
        fileUpload.style.borderColor = "var(--border-subtle)";
      });
      fileUpload.addEventListener("drop", (e) => {
        e.preventDefault();
        fileUpload.style.borderColor = "var(--border-subtle)";
        const file = e.dataTransfer.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            document.getElementById("input").value = ev.target.result;
            showToast("文件已加载");
          };
          reader.readAsText(file);
        }
      });

      // Detect delimiter
      function detectDelimiter(text) {
        const firstLine = text.split("\n")[0];
        const delimiters = [",", "\t", ";", "|"];
        let maxCount = 0;
        let detected = ",";

        for (const d of delimiters) {
          const count = (firstLine.match(new RegExp(d === "|" ? "\\|" : d, "g")) || []).length;
          if (count > maxCount) {
            maxCount = count;
            detected = d;
          }
        }
        return detected;
      }

      // Parse CSV with proper quote handling
      function parseCSV(text, delimiter, trimValues, skipEmpty) {
        const rows = [];
        let currentRow = [];
        let currentValue = "";
        let inQuotes = false;

        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const nextChar = text[i + 1];

          if (inQuotes) {
            if (char === '"' && nextChar === '"') {
              currentValue += '"';
              i++;
            } else if (char === '"') {
              inQuotes = false;
            } else {
              currentValue += char;
            }
          } else {
            if (char === '"') {
              inQuotes = true;
            } else if (char === delimiter) {
              currentRow.push(trimValues ? currentValue.trim() : currentValue);
              currentValue = "";
            } else if (char === "\n" || (char === "\r" && nextChar === "\n")) {
              currentRow.push(trimValues ? currentValue.trim() : currentValue);
              if (!skipEmpty || currentRow.some((v) => v !== "")) {
                rows.push(currentRow);
              }
              currentRow = [];
              currentValue = "";
              if (char === "\r") i++;
            } else if (char !== "\r") {
              currentValue += char;
            }
          }
        }

        // Handle last row
        if (currentValue || currentRow.length > 0) {
          currentRow.push(trimValues ? currentValue.trim() : currentValue);
          if (!skipEmpty || currentRow.some((v) => v !== "")) {
            rows.push(currentRow);
          }
        }

        return rows;
      }

      // Convert to JSON
      function convertToJSON() {
        const input = document.getElementById("input").value;
        if (!input.trim()) {
          showToast("请输入数据");
          return;
        }

        const delimiterSelect = document.getElementById("delimiter").value;
        const delimiter = delimiterSelect === "auto" ? detectDelimiter(input) : delimiterSelect;
        const outputFormat = document.getElementById("outputFormat").value;
        const indent = parseInt(document.getElementById("indent").value);
        const firstRowHeader = document.getElementById("firstRowHeader").checked;
        const trimValues = document.getElementById("trimValues").checked;
        const skipEmpty = document.getElementById("skipEmpty").checked;

        try {
          const rows = parseCSV(input, delimiter, trimValues, skipEmpty);

          if (rows.length === 0) {
            showToast("没有有效数据");
            return;
          }

          let result;
          let headers = [];
          let dataRows = rows;

          if (outputFormat === "objects" && firstRowHeader) {
            headers = rows[0];
            dataRows = rows.slice(1);
            result = dataRows.map((row) => {
              const obj = {};
              headers.forEach((header, i) => {
                obj[header] = row[i] !== undefined ? row[i] : "";
              });
              return obj;
            });
          } else if (outputFormat === "objects" && !firstRowHeader) {
            result = dataRows.map((row) => {
              const obj = {};
              row.forEach((val, i) => {
                obj[`col${i + 1}`] = val;
              });
              return obj;
            });
          } else {
            result = rows;
          }

          const jsonStr = JSON.stringify(result, null, indent || undefined);
          document.getElementById("result").textContent = jsonStr;

          // Update stats
          document.getElementById("stats").style.display = "flex";
          document.getElementById("rowCount").textContent =
            outputFormat === "objects" && firstRowHeader ? dataRows.length : rows.length;
          document.getElementById("colCount").textContent = rows[0]?.length || 0;
          const delimiterNames = { ",": "逗号", "\t": "制表符", ";": "分号", "|": "竖线" };
          document.getElementById("detectedDelimiter").textContent =
            delimiterNames[delimiter] || delimiter;

          showToast("转换成功");
        } catch (err) {
          showToast("转换失败: " + err.message);
        }
      }

      // Paste from clipboard
      async function pasteData() {
        try {
          const text = await navigator.clipboard.readText();
          document.getElementById("input").value = text;
          showToast("已粘贴");
        } catch (err) {
          showToast("粘贴失败");
        }
      }

      // Load sample data
      function loadSample() {
        document.getElementById("input").value = `姓名,年龄,城市,职业
  张三,25,北京,工程师
  李四,30,上海,设计师
  王五,28,"广州,天河区",产品经理
  "赵六",35,深圳,"数据分析师"`;
        showToast("示例数据已加载");
      }

      // Copy result
      function copyResult() {
        const result = document.getElementById("result").textContent;
        if (!result || result === "转换结果将显示在这里...") {
          showToast("没有可复制的内容");
          return;
        }
        navigator.clipboard.writeText(result).then(() => showToast("已复制"));
      }

      // Download JSON
      function downloadJSON() {
        const result = document.getElementById("result").textContent;
        if (!result || result === "转换结果将显示在这里...") {
          showToast("没有可下载的内容");
          return;
        }
        const blob = new Blob([result], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.json";
        a.click();
        URL.revokeObjectURL(url);
        showToast("下载已开始");
      }

      // Clear all
      function clearAll() {
        document.getElementById("input").value = "";
        document.getElementById("result").textContent = "转换结果将显示在这里...";
        document.getElementById("stats").style.display = "none";
        showToast("已清空");
      }

      // Show toast
      function showToast(msg) {
        const toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Keyboard shortcut
      document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          convertToJSON();
        }
      });

      // Load from localStorage
      const savedInput = localStorage.getItem("excel-to-json-input");
      if (savedInput) document.getElementById("input").value = savedInput;

      // Save to localStorage on change
      document.getElementById("input").addEventListener("input", () => {
        localStorage.setItem("excel-to-json-input", document.getElementById("input").value);
      });
    
