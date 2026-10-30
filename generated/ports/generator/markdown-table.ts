// @ts-nocheck
// Generated from tools/generator/markdown-table.html
// Source SHA-256: 51a49133bd5a92b01e17e522e860dec1896049940a211f9937dd812b661428d2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let tableData = {
        headers: ["列 1", "列 2", "列 3"],
        aligns: ["left", "left", "left"],
        rows: [
          ["数据 1", "数据 2", "数据 3"],
          ["数据 4", "数据 5", "数据 6"],
          ["数据 7", "数据 8", "数据 9"]
        ]
      };

      function renderEditTable() {
        const table = document.getElementById("editTable");
        let html = "<thead><tr>";

        // Header row
        tableData.headers.forEach((h, i) => {
          html += `<th><input type="text" value="${escapeHtml(h)}" onchange="updateHeader(${i}, this.value)" aria-label="文本输入框" placeholder="请输入文本输入框"></th>`;
        });
        html += "</tr>";

        // Align row
        html += '<tr class="align-row">';
        tableData.aligns.forEach((a, i) => {
          html += `<td><select onchange="updateAlign(${i}, this.value)">
          <option value="left" ${a === "left" ? "selected" : ""}>左对齐</option>
          <option value="center" ${a === "center" ? "selected" : ""}>居中</option>
          <option value="right" ${a === "right" ? "selected" : ""}>右对齐</option>
        </select></td>`;
        });
        html += "</tr></thead><tbody>";

        // Data rows
        tableData.rows.forEach((row, ri) => {
          html += "<tr>";
          row.forEach((cell, ci) => {
            html += `<td><input type="text" value="${escapeHtml(cell)}" onchange="updateCell(${ri}, ${ci}, this.value)" aria-label="文本输入框" placeholder="请输入文本输入框"></td>`;
          });
          html += "</tr>";
        });

        html += "</tbody>";
        table.innerHTML = html;

        generateMarkdown();
      }

      function escapeHtml(str) {
        return str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      }

      function updateHeader(index, value) {
        tableData.headers[index] = value;
        generateMarkdown();
      }

      function updateAlign(index, value) {
        tableData.aligns[index] = value;
        generateMarkdown();
      }

      function updateCell(row, col, value) {
        tableData.rows[row][col] = value;
        generateMarkdown();
      }

      function addColumn() {
        const colNum = tableData.headers.length + 1;
        tableData.headers.push(`列 ${colNum}`);
        tableData.aligns.push("left");
        tableData.rows.forEach((row) => row.push(""));
        document.getElementById("cols").value = tableData.headers.length;
        renderEditTable();
      }

      function addRow() {
        const newRow = tableData.headers.map(() => "");
        tableData.rows.push(newRow);
        document.getElementById("rows").value = tableData.rows.length;
        renderEditTable();
      }

      function resizeTable() {
        const cols = parseInt(document.getElementById("cols").value) || 1;
        const rows = parseInt(document.getElementById("rows").value) || 1;

        // Resize columns
        while (tableData.headers.length < cols) {
          tableData.headers.push(`列 ${tableData.headers.length + 1}`);
          tableData.aligns.push("left");
          tableData.rows.forEach((row) => row.push(""));
        }
        while (tableData.headers.length > cols) {
          tableData.headers.pop();
          tableData.aligns.pop();
          tableData.rows.forEach((row) => row.pop());
        }

        // Resize rows
        while (tableData.rows.length < rows) {
          tableData.rows.push(tableData.headers.map(() => ""));
        }
        while (tableData.rows.length > rows) {
          tableData.rows.pop();
        }

        renderEditTable();
      }

      function clearTable() {
        const cols = tableData.headers.length;
        const rows = tableData.rows.length;
        tableData.headers = tableData.headers.map((_, i) => `列 ${i + 1}`);
        tableData.aligns = tableData.aligns.map(() => "left");
        tableData.rows = tableData.rows.map(() => tableData.headers.map(() => ""));
        renderEditTable();
      }

      function loadSample() {
        tableData = {
          headers: ["功能", "免费版", "专业版", "企业版"],
          aligns: ["left", "center", "center", "center"],
          rows: [
            ["存储空间", "5 GB", "100 GB", "无限"],
            ["API 调用", "1000/月", "10000/月", "无限"],
            ["技术支持", "社区", "邮件", "24/7 专属"],
            ["价格", "免费", "$9/月", "联系销售"]
          ]
        };
        document.getElementById("cols").value = 4;
        document.getElementById("rows").value = 4;
        renderEditTable();
      }

      function generateMarkdown() {
        // Calculate column widths
        const widths = tableData.headers.map((h, i) => {
          let max = h.length;
          tableData.rows.forEach((row) => {
            if (row[i].length > max) max = row[i].length;
          });
          return Math.max(max, 3);
        });

        // Generate markdown
        let md = "| " + tableData.headers.map((h, i) => h.padEnd(widths[i])).join(" | ") + " |\n";

        // Separator row
        md +=
          "| " +
          tableData.aligns
            .map((a, i) => {
              const w = widths[i];
              if (a === "center") return ":" + "-".repeat(w - 2) + ":";
              if (a === "right") return "-".repeat(w - 1) + ":";
              return "-".repeat(w);
            })
            .join(" | ") +
          " |\n";

        // Data rows
        tableData.rows.forEach((row) => {
          md += "| " + row.map((cell, i) => cell.padEnd(widths[i])).join(" | ") + " |\n";
        });

        document.getElementById("output").textContent = md;

        // Preview
        let previewHtml = "<table><thead><tr>";
        tableData.headers.forEach((h, i) => {
          const align = tableData.aligns[i];
          previewHtml += `<th style="text-align: ${align}">${escapeHtml(h)}</th>`;
        });
        previewHtml += "</tr></thead><tbody>";
        tableData.rows.forEach((row) => {
          previewHtml += "<tr>";
          row.forEach((cell, i) => {
            const align = tableData.aligns[i];
            previewHtml += `<td style="text-align: ${align}">${escapeHtml(cell)}</td>`;
          });
          previewHtml += "</tr>";
        });
        previewHtml += "</tbody></table>";
        document.getElementById("preview").innerHTML = previewHtml;
      }

      function copyMarkdown() {
        navigator.clipboard.writeText(document.getElementById("output").textContent);
      }

      renderEditTable();

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
