// @ts-nocheck
// Generated from tools/dev/html-table-generator.html
// Source SHA-256: 22fc78947d5af3cb89cffcc8158ff63207a3d8025d3d634278d6251d463d8e01
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let tableData = [];
      let hasHeader = true;

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Initialize theme
      (function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      function regenerateTable() {
        const rows = parseInt(document.getElementById("rows").value) || 4;
        const cols = parseInt(document.getElementById("cols").value) || 4;
        hasHeader = document.getElementById("hasHeader").value === "true";

        tableData = [];
        for (let i = 0; i < rows; i++) {
          const row = [];
          for (let j = 0; j < cols; j++) {
            if (i === 0 && hasHeader) {
              row.push("标题 " + (j + 1));
            } else {
              row.push("内容 " + (i + 1) + "-" + (j + 1));
            }
          }
          tableData.push(row);
        }

        renderTable();
        generateCode();
      }

      function renderTable() {
        const table = document.getElementById("editableTable");
        let html = "";

        tableData.forEach((row, rowIndex) => {
          html += "<tr>";
          row.forEach((cell, colIndex) => {
            const tag = rowIndex === 0 && hasHeader ? "th" : "td";
            html += `<${tag}>
                        <input type="text" value="${escapeHtml(cell)}" 
                               onchange="updateCell(${rowIndex}, ${colIndex}, this.value)"
                               onkeydown="handleKeydown(event, ${rowIndex}, ${colIndex})" aria-label="文本输入框" placeholder="请输入文本输入框">
                    </${tag}>`;
          });
          html += `<td class="row-actions">
                    <button onclick="deleteRow(${rowIndex})" title="删除行" aria-label="🗑️">🗑️</button>
                </td>`;
          html += "</tr>";
        });

        table.innerHTML = html;
      }

      window.updateCell = function (row, col, value) {
        tableData[row][col] = value;
        generateCode();
      };

      window.handleKeydown = function (event, row, col) {
        const inputs = document.querySelectorAll(".editable-table input");
        const currentIndex = row * tableData[0].length + col;

        if (event.key === "Tab") {
          // Default tab behavior
        } else if (event.key === "Enter") {
          event.preventDefault();
          const nextRow = row + 1;
          if (nextRow < tableData.length) {
            const nextIndex = nextRow * tableData[0].length + col;
            inputs[nextIndex]?.focus();
          }
        }
      };

      window.addRow = function () {
        const cols = tableData[0]?.length || parseInt(document.getElementById("cols").value);
        const newRow = [];
        for (let i = 0; i < cols; i++) {
          newRow.push("");
        }
        tableData.push(newRow);
        document.getElementById("rows").value = tableData.length;
        renderTable();
        generateCode();
      };

      window.addColumn = function () {
        tableData.forEach((row, index) => {
          if (index === 0 && hasHeader) {
            row.push("新标题");
          } else {
            row.push("");
          }
        });
        document.getElementById("cols").value = tableData[0].length;
        renderTable();
        generateCode();
      };

      window.deleteRow = function (index) {
        if (tableData.length <= 1) {
          showToast("至少保留一行");
          return;
        }
        tableData.splice(index, 1);
        document.getElementById("rows").value = tableData.length;
        renderTable();
        generateCode();
      };

      window.clearTable = function () {
        tableData = tableData.map((row, rowIndex) =>
          row.map((_, colIndex) => {
            if (rowIndex === 0 && hasHeader) {
              return "标题 " + (colIndex + 1);
            }
            return "";
          })
        );
        renderTable();
        generateCode();
      };

      function generateCode() {
        const format = document.getElementById("outputFormat").value;
        let code = "";

        switch (format) {
          case "html":
            code = generateHTML();
            break;
          case "markdown":
            code = generateMarkdown();
            break;
          case "csv":
            code = generateCSV();
            break;
        }

        document.getElementById("codeOutput").value = code;
        updatePreview();
      }

      function generateHTML() {
        let html = "<table>\n";

        tableData.forEach((row, rowIndex) => {
          if (rowIndex === 0 && hasHeader) {
            html += "  <thead>\n    <tr>\n";
            row.forEach((cell) => {
              html += `      <th>${escapeHtml(cell)}</th>\n`;
            });
            html += "    </tr>\n  </thead>\n  <tbody>\n";
          } else {
            if (rowIndex === 1 && hasHeader) {
              // tbody already opened
            } else if (rowIndex === 0 && !hasHeader) {
              html += "  <tbody>\n";
            }
            html += "    <tr>\n";
            row.forEach((cell) => {
              html += `      <td>${escapeHtml(cell)}</td>\n`;
            });
            html += "    </tr>\n";
          }
        });

        html += "  </tbody>\n</table>";
        return html;
      }

      function generateMarkdown() {
        let md = "";

        tableData.forEach((row, rowIndex) => {
          md += "| " + row.map((cell) => cell.replace(/\|/g, "\\|")).join(" | ") + " |\n";

          if (rowIndex === 0 && hasHeader) {
            md += "| " + row.map(() => "---").join(" | ") + " |\n";
          }
        });

        return md;
      }

      function generateCSV() {
        return tableData
          .map((row) =>
            row
              .map((cell) => {
                if (cell.includes(",") || cell.includes('"') || cell.includes("\n")) {
                  return '"' + cell.replace(/"/g, '""') + '"';
                }
                return cell;
              })
              .join(",")
          )
          .join("\n");
      }

      window.updatePreview = function () {
        const preview = document.getElementById("previewSection");
        preview.innerHTML = generateHTML();
      };

      window.switchTab = function (tab) {
        document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
        document
          .querySelectorAll(".tab-content")
          .forEach((content) => content.classList.remove("active"));

        if (tab === "code") {
          document.querySelector(".tab-btn:nth-child(1)").classList.add("active");
          document.getElementById("codeTab").classList.add("active");
        } else {
          document.querySelector(".tab-btn:nth-child(2)").classList.add("active");
          document.getElementById("previewTab").classList.add("active");
        }
      };

      window.copyCode = function () {
        const code = document.getElementById("codeOutput").value;
        navigator.clipboard.writeText(code).then(() => {
          showToast("代码已复制");
        });
      };

      window.downloadCode = function () {
        const code = document.getElementById("codeOutput").value;
        const format = document.getElementById("outputFormat").value;
        const extensions = { html: "html", markdown: "md", csv: "csv" };

        const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `table.${extensions[format]}`;
        a.click();
        URL.revokeObjectURL(url);
        showToast("文件已下载");
      };

      window.escapeHtml = function (text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Initialize
      regenerateTable();
    
