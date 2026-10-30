// @ts-nocheck
// Generated from tools/dev/table-generator.html
// Source SHA-256: c664e8ce515f42ff2d6af84d56feb144cd7b2c6c258ae5d32ac7c06ade4ded56
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let data = [];
      let currentFormat = "markdown";

      function initData() {
        const rows = parseInt(document.getElementById("rows").value);
        const cols = parseInt(document.getElementById("cols").value);

        data = [];
        for (let i = 0; i < rows + 1; i++) {
          // +1 for header
          data[i] = [];
          for (let j = 0; j < cols; j++) {
            if (i === 0) {
              data[i][j] = `Header ${j + 1}`;
            } else {
              data[i][j] = `Row ${i} Col ${j + 1}`;
            }
          }
        }
      }

      function updateTable() {
        initData();
        renderTable();
        generateOutput();
      }

      function renderTable() {
        const table = document.getElementById("tableEditor");
        let html = "";

        data.forEach((row, i) => {
          html += "<tr>";
          row.forEach((cell, j) => {
            if (i === 0) {
              html += `<th><input type="text" value="${cell}" onchange="updateCell(${i}, ${j}, this.value)" aria-label="文本输入框" placeholder="请输入文本输入框"></th>`;
            } else {
              html += `<td><input type="text" value="${cell}" onchange="updateCell(${i}, ${j}, this.value)" aria-label="文本输入框" placeholder="请输入文本输入框"></td>`;
            }
          });
          html += "</tr>";
        });

        table.innerHTML = html;
      }

      function updateCell(row, col, value) {
        data[row][col] = value;
        generateOutput();
      }

      function generateMarkdown() {
        if (data.length === 0) return "";

        let md = "";

        // Header
        md += "| " + data[0].join(" | ") + " |\n";

        // Separator
        md += "| " + data[0].map(() => "---").join(" | ") + " |\n";

        // Rows
        for (let i = 1; i < data.length; i++) {
          md += "| " + data[i].join(" | ") + " |\n";
        }

        return md;
      }

      function generateHTML() {
        if (data.length === 0) return "";

        let html = "<table>\n";

        // Header
        html += "  <thead>\n    <tr>\n";
        data[0].forEach((cell) => {
          html += `      <th>${cell}</th>\n`;
        });
        html += "    </tr>\n  </thead>\n";

        // Body
        html += "  <tbody>\n";
        for (let i = 1; i < data.length; i++) {
          html += "    <tr>\n";
          data[i].forEach((cell) => {
            html += `      <td>${cell}</td>\n`;
          });
          html += "    </tr>\n";
        }
        html += "  </tbody>\n</table>";

        return html;
      }

      function generateCSV() {
        if (data.length === 0) return "";

        return data
          .map((row) => {
            return row
              .map((cell) => {
                // Escape cells with commas or quotes
                if (cell.includes(",") || cell.includes('"') || cell.includes("\n")) {
                  return `"${cell.replace(/"/g, '""')}"`;
                }
                return cell;
              })
              .join(",");
          })
          .join("\n");
      }

      function generateOutput() {
        let output = "";

        if (currentFormat === "markdown") {
          output = generateMarkdown();
        } else if (currentFormat === "html") {
          output = generateHTML();
        } else if (currentFormat === "csv") {
          output = generateCSV();
        }

        document.getElementById("output").textContent = output;
      }

      function switchTab(format) {
        currentFormat = format;

        document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
        event.target.classList.add("active");

        generateOutput();
      }

      function copyOutput() {
        const output = document.getElementById("output").textContent;
        navigator.clipboard.writeText(output).then(() => {
          const btn = document.querySelector(".copy-btn");
          btn.textContent = "已复制!";
          btn.classList.add("copied");

          setTimeout(() => {
            btn.textContent = "复制";
            btn.classList.remove("copied");
          }, 2000);
        });
      }

      // Initialize
      initData();
      renderTable();
      generateOutput();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
