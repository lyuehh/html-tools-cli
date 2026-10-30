// @ts-nocheck
// Generated from tools/text/markdown-table.html
// Source SHA-256: 030f6243307c2584ef715307988fd51a035bd4d7af77d964a5ed594d0b908337
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 状态
      const state = {
        cols: 3,
        rows: 3,
        data: [],
        headers: [],
        aligns: [] // 'left' | 'center' | 'right'
      };

      // DOM
      const editTable = document.getElementById("edit-table");
      const outputEl = document.getElementById("output");
      const previewEl = document.getElementById("preview");
      const colsInput = document.getElementById("cols");
      const rowsInput = document.getElementById("rows");
      const messageEl = document.getElementById("message");
      const importModal = document.getElementById("import-modal");
      const csvInput = document.getElementById("csv-input");

      // 初始化数据
      function initData() {
        state.headers = Array(state.cols)
          .fill("")
          .map((_, i) => `列${i + 1}`);
        state.data = Array(state.rows)
          .fill(null)
          .map(() => Array(state.cols).fill(""));
        state.aligns = Array(state.cols).fill("left");
      }

      // 渲染表格
      function renderTable() {
        let html = "<thead><tr>";

        // 表头
        for (let c = 0; c < state.cols; c++) {
          html += `
          <th>
            <input type="text" value="${escapeHtml(state.headers[c])}" data-type="header" data-col="${c}" placeholder="表头">
            <div class="align-btns">
              <button class="align-btn ${state.aligns[c] === "left" ? "active" : ""}" data-col="${c}" data-align="left">⬅</button>
              <button class="align-btn ${state.aligns[c] === "center" ? "active" : ""}" data-col="${c}" data-align="center">⬌</button>
              <button class="align-btn ${state.aligns[c] === "right" ? "active" : ""}" data-col="${c}" data-align="right">➡</button>
            </div>
          </th>
        `;
        }
        html += '<th style="width:60px"></th></tr></thead><tbody>';

        // 数据行
        for (let r = 0; r < state.rows; r++) {
          html += "<tr>";
          for (let c = 0; c < state.cols; c++) {
            html += `
            <td>
              <input type="text" value="${escapeHtml(state.data[r][c])}" data-type="cell" data-row="${r}" data-col="${c}" placeholder="...">
            </td>
          `;
          }
          html += `
          <td class="row-actions">
            <button class="row-action-btn" data-action="delete-row" data-row="${r}" title="删除行">✕</button>
          </td>
        </tr>`;
        }
        html += "</tbody>";

        editTable.innerHTML = html;
        bindTableEvents();
        generateOutput();
      }

      // 绑定表格事件
      function bindTableEvents() {
        // 输入事件
        editTable.querySelectorAll("input").forEach((input) => {
          input.addEventListener("input", (e) => {
            const type = e.target.dataset.type;
            const col = parseInt(e.target.dataset.col);

            if (type === "header") {
              state.headers[col] = e.target.value;
            } else {
              const row = parseInt(e.target.dataset.row);
              state.data[row][col] = e.target.value;
            }
            generateOutput();
          });
        });

        // 对齐按钮
        editTable.querySelectorAll(".align-btn").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            const col = parseInt(btn.dataset.col);
            const align = btn.dataset.align;
            state.aligns[col] = align;
            renderTable();
          });
        });

        // 删除行
        editTable.querySelectorAll('[data-action="delete-row"]').forEach((btn) => {
          btn.addEventListener("click", () => {
            const row = parseInt(btn.dataset.row);
            if (state.rows > 1) {
              state.data.splice(row, 1);
              state.rows--;
              rowsInput.value = state.rows;
              renderTable();
            }
          });
        });
      }

      // 生成 Markdown 输出
      function generateOutput() {
        const lines = [];

        // 转义 Markdown 表格中的管道符
        function escapePipe(text) {
          return (text || "").replace(/\|/g, "\\|");
        }

        // 表头行
        lines.push("| " + state.headers.map((h) => escapePipe(h)).join(" | ") + " |");

        // 分隔行
        const separators = state.aligns.map((align) => {
          if (align === "center") return ":---:";
          if (align === "right") return "---:";
          return "---";
        });
        lines.push("| " + separators.join(" | ") + " |");

        // 数据行
        for (const row of state.data) {
          lines.push("| " + row.map((cell) => escapePipe(cell) || " ").join(" | ") + " |");
        }

        const markdown = lines.join("\n");
        outputEl.textContent = markdown;
        renderPreview();
      }

      // 渲染预览
      function renderPreview() {
        let html = "<table><thead><tr>";

        for (let c = 0; c < state.cols; c++) {
          const align = state.aligns[c];
          html += `<th class="align-${align}">${escapeHtml(state.headers[c]) || "&nbsp;"}</th>`;
        }
        html += "</tr></thead><tbody>";

        for (const row of state.data) {
          html += "<tr>";
          for (let c = 0; c < state.cols; c++) {
            const align = state.aligns[c];
            html += `<td class="align-${align}">${escapeHtml(row[c]) || "&nbsp;"}</td>`;
          }
          html += "</tr>";
        }
        html += "</tbody></table>";

        previewEl.innerHTML = html;
      }

      // 转义 HTML
      window.escapeHtml = function (str) {
        if (!str) return "";
        return str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      };

      // 解析 CSV
      function parseCSV(csv) {
        const lines = csv.trim().split("\n");
        const result = lines.map((line) => {
          // 简单 CSV 解析（不处理引号内的逗号）
          return line.split(/[,\t]/).map((cell) => cell.trim());
        });
        return result;
      }

      // 导入 CSV
      function importCSV(csv) {
        const data = parseCSV(csv);
        if (data.length < 1) return;

        state.headers = data[0];
        state.cols = state.headers.length;
        state.data = data.slice(1);
        state.rows = state.data.length || 1;

        if (state.rows === 0) {
          state.data = [Array(state.cols).fill("")];
          state.rows = 1;
        }

        state.aligns = Array(state.cols).fill("left");

        colsInput.value = state.cols;
        rowsInput.value = state.rows;

        renderTable();
        showMessage("CSV 导入成功", "success");
      }

      // 显示消息
      function showMessage(text, type) {
        messageEl.textContent = text;
        messageEl.className = "message " + type;
        setTimeout(() => {
          messageEl.className = "message";
        }, 3000);
      }

      // 事件绑定
      document.getElementById("apply-size").addEventListener("click", () => {
        const newCols = parseInt(colsInput.value) || 3;
        const newRows = parseInt(rowsInput.value) || 3;

        // 调整列
        if (newCols > state.cols) {
          const diff = newCols - state.cols;
          state.headers.push(...Array(diff).fill(""));
          state.aligns.push(...Array(diff).fill("left"));
          state.data.forEach((row) => row.push(...Array(diff).fill("")));
        } else if (newCols < state.cols) {
          state.headers = state.headers.slice(0, newCols);
          state.aligns = state.aligns.slice(0, newCols);
          state.data = state.data.map((row) => row.slice(0, newCols));
        }

        // 调整行
        if (newRows > state.rows) {
          const diff = newRows - state.rows;
          for (let i = 0; i < diff; i++) {
            state.data.push(Array(newCols).fill(""));
          }
        } else if (newRows < state.rows) {
          state.data = state.data.slice(0, newRows);
        }

        state.cols = newCols;
        state.rows = newRows;
        renderTable();
      });

      document.getElementById("add-row-btn").addEventListener("click", () => {
        state.data.push(Array(state.cols).fill(""));
        state.rows++;
        rowsInput.value = state.rows;
        renderTable();
      });

      document.getElementById("add-col-btn").addEventListener("click", () => {
        state.headers.push("");
        state.aligns.push("left");
        state.data.forEach((row) => row.push(""));
        state.cols++;
        colsInput.value = state.cols;
        renderTable();
      });

      document.getElementById("clear-btn").addEventListener("click", () => {
        state.cols = 3;
        state.rows = 3;
        colsInput.value = 3;
        rowsInput.value = 3;
        initData();
        renderTable();
      });

      document.getElementById("copy-btn").addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(outputEl.textContent);
          showMessage("已复制到剪贴板", "success");
        } catch (err) {
          showMessage("复制失败", "error");
        }
      });

      // 导入 CSV
      document.getElementById("import-csv-btn").addEventListener("click", () => {
        if (!importModal) return;
        importModal.classList.add("show");
      });

      document.getElementById("cancel-import")?.addEventListener("click", () => {
        importModal.classList.remove("show");
        csvInput.value = "";
      });

      document.getElementById("confirm-import")?.addEventListener("click", () => {
        const csv = csvInput.value.trim();
        if (csv) {
          importCSV(csv);
        }
        importModal.classList.remove("show");
        csvInput.value = "";
      });

      // 标签页切换
      document.querySelectorAll(".tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
          document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
          tab.classList.add("active");
          document.getElementById("tab-" + tab.dataset.tab).classList.add("active");
        });
      });

      // 粘贴事件（直接粘贴 CSV）
      document.addEventListener("paste", (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
        const text = e.clipboardData?.getData("text");
        if (text && (text.includes(",") || text.includes("\t")) && text.includes("\n")) {
          e.preventDefault();
          importCSV(text);
        }
      });

      // 初始化
      initData();
      renderTable();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
