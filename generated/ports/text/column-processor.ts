// @ts-nocheck
// Generated from tools/text/column-processor.html
// Source SHA-256: aa16fbb2aacd4a845b04cbe6135beb1c6ec26a6f45d537faa5d093dc2057a411
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Elements
      // ============================================
      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const delimiterEl = document.getElementById("delimiter");
      const customDelimiterEl = document.getElementById("customDelimiter");
      const customDelimiterGroup = document.getElementById("customDelimiterGroup");
      const operationEl = document.getElementById("operation");
      const col1El = document.getElementById("col1");
      const col2El = document.getElementById("col2");
      const col2Group = document.getElementById("col2Group");
      const addValueEl = document.getElementById("addValue");
      const addValueGroup = document.getElementById("addValueGroup");
      const reorderColsEl = document.getElementById("reorderCols");
      const reorderGroup = document.getElementById("reorderGroup");
      const outputDelimiterEl = document.getElementById("outputDelimiter");
      const columnCountEl = document.getElementById("columnCount");
      const toastEl = document.getElementById("toast");

      // ============================================
      // Delimiter handling
      // ============================================
      delimiterEl.addEventListener("change", () => {
        customDelimiterGroup.style.display = delimiterEl.value === "custom" ? "flex" : "none";
      });

      function getDelimiter(type, customValue) {
        const delimiters = {
          tab: "\t",
          comma: ",",
          semicolon: ";",
          pipe: "|",
          space: " ",
          custom: customValue || "\t"
        };
        return delimiters[type] || "\t";
      }

      // ============================================
      // Operation UI
      // ============================================
      function updateOperationUI() {
        const op = operationEl.value;
        col2Group.style.display = op === "swap" ? "flex" : "none";
        addValueGroup.style.display = op === "add" ? "flex" : "none";
        reorderGroup.style.display = op === "reorder" ? "flex" : "none";

        // Update col1 label
        const col1Label = col1El.previousElementSibling;
        if (op === "add") {
          col1Label.textContent = "插入位置";
        } else if (op === "reorder") {
          col1Label.textContent = "列号 (不使用)";
        } else {
          col1Label.textContent = "列号 (从1开始)";
        }
      }

      // ============================================
      // Process Logic
      // ============================================
      function process() {
        const text = inputEl.value.trim();
        if (!text) {
          outputEl.textContent = "";
          columnCountEl.textContent = "检测到 0 列";
          return;
        }

        const inputDelimiter = getDelimiter(delimiterEl.value, customDelimiterEl.value);
        const lines = text.split("\n");

        // Parse into rows
        const rows = lines.map((line) => line.split(inputDelimiter));

        // Detect column count
        const maxCols = Math.max(...rows.map((r) => r.length));
        columnCountEl.textContent = `检测到 ${maxCols} 列`;

        // Get output delimiter
        let outDelimiter = inputDelimiter;
        if (outputDelimiterEl.value !== "same") {
          outDelimiter = getDelimiter(outputDelimiterEl.value);
        }

        // Perform operation
        const operation = operationEl.value;
        let result = [];

        try {
          switch (operation) {
            case "extract":
              result = extractColumn(rows, parseInt(col1El.value, 10) - 1);
              break;
            case "remove":
              result = removeColumn(rows, parseInt(col1El.value, 10) - 1);
              break;
            case "swap":
              result = swapColumns(
                rows,
                parseInt(col1El.value, 10) - 1,
                parseInt(col2El.value, 10) - 1
              );
              break;
            case "add":
              result = addColumn(rows, parseInt(col1El.value, 10) - 1, addValueEl.value);
              break;
            case "reorder":
              result = reorderColumns(rows, reorderColsEl.value);
              break;
          }

          // Format output
          if (operation === "extract") {
            outputEl.textContent = result.join("\n");
          } else {
            outputEl.textContent = result.map((row) => row.join(outDelimiter)).join("\n");
          }
        } catch (e) {
          outputEl.textContent = `错误: ${e.message}`;
        }

        // Save state
        saveState();
      }

      function extractColumn(rows, colIndex) {
        return rows.map((row) => (colIndex < row.length ? row[colIndex] : ""));
      }

      function removeColumn(rows, colIndex) {
        return rows.map((row) => {
          const newRow = [...row];
          if (colIndex < newRow.length) {
            newRow.splice(colIndex, 1);
          }
          return newRow;
        });
      }

      function swapColumns(rows, col1, col2) {
        return rows.map((row) => {
          const newRow = [...row];
          if (col1 < newRow.length && col2 < newRow.length) {
            [newRow[col1], newRow[col2]] = [newRow[col2], newRow[col1]];
          }
          return newRow;
        });
      }

      function addColumn(rows, position, value) {
        return rows.map((row) => {
          const newRow = [...row];
          const insertPos = Math.min(position, newRow.length);
          newRow.splice(insertPos, 0, value);
          return newRow;
        });
      }

      function reorderColumns(rows, orderStr) {
        const order = orderStr
          .split(",")
          .map((n) => parseInt(n.trim(), 10) - 1)
          .filter((n) => !isNaN(n));
        if (order.length === 0) return rows;

        return rows.map((row) => {
          return order.map((colIndex) => (colIndex < row.length ? row[colIndex] : ""));
        });
      }

      // ============================================
      // Actions
      // ============================================
      async function pasteFromClipboard() {
        try {
          const text = await navigator.clipboard.readText();
          inputEl.value = text;
          process();
          showToast("已粘贴", "success");
        } catch (e) {
          showToast("无法访问剪贴板");
        }
      }

      function loadSample() {
        inputEl.value = `姓名\t年龄\t城市\t职业
张三\t25\t北京\t工程师
李四\t30\t上海\t设计师
王五\t28\t广州\t产品经理
赵六\t35\t深圳\t数据分析师`;
        delimiterEl.value = "tab";
        customDelimiterGroup.style.display = "none";
        process();
        showToast("已加载示例", "success");
      }

      function clearInput() {
        inputEl.value = "";
        outputEl.textContent = "";
        columnCountEl.textContent = "检测到 0 列";
        localStorage.removeItem("column-processor-state");
        showToast("已清空", "success");
      }

      async function copyOutput() {
        const text = outputEl.textContent;
        if (!text) {
          showToast("没有可复制的内容");
          return;
        }
        try {
          await navigator.clipboard.writeText(text);
          showToast("已复制到剪贴板", "success");
        } catch (e) {
          showToast("复制失败");
        }
      }

      function applyToInput() {
        const text = outputEl.textContent;
        if (!text || text.startsWith("错误:")) {
          showToast("没有有效的结果");
          return;
        }
        inputEl.value = text;
        process();
        showToast("已应用为输入", "success");
      }

      // ============================================
      // Toast
      // ============================================
      function showToast(message, type = "") {
        toastEl.textContent = message;
        toastEl.className = "toast show " + type;
        setTimeout(() => {
          toastEl.className = "toast";
        }, 2000);
      }

      // ============================================
      // State Management
      // ============================================
      function saveState() {
        const state = {
          input: inputEl.value,
          delimiter: delimiterEl.value,
          customDelimiter: customDelimiterEl.value,
          operation: operationEl.value,
          col1: col1El.value,
          col2: col2El.value,
          addValue: addValueEl.value,
          reorderCols: reorderColsEl.value,
          outputDelimiter: outputDelimiterEl.value
        };
        localStorage.setItem("column-processor-state", JSON.stringify(state));
      }

      function loadState() {
        const saved = localStorage.getItem("column-processor-state");
        if (saved) {
          try {
            const state = JSON.parse(saved);
            inputEl.value = state.input || "";
            delimiterEl.value = state.delimiter || "tab";
            customDelimiterEl.value = state.customDelimiter || "";
            operationEl.value = state.operation || "extract";
            col1El.value = state.col1 || "1";
            col2El.value = state.col2 || "2";
            addValueEl.value = state.addValue || "";
            reorderColsEl.value = state.reorderCols || "";
            outputDelimiterEl.value = state.outputDelimiter || "same";

            customDelimiterGroup.style.display = delimiterEl.value === "custom" ? "flex" : "none";
            updateOperationUI();
            process();
          } catch (e) {
            console.error("Failed to load state:", e);
          }
        }
      }

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
      // Initialize
      // ============================================
      initTheme();
      updateOperationUI();
      loadState();
    
