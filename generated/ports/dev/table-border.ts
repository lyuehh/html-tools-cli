// @ts-nocheck
// Generated from tools/dev/table-border.html
// Source SHA-256: 4c36671add094b34bcf4ec9cc96bc3c15d5e9e3042d51a34027b1bb258e51a9e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const borderStyles = {
        ascii: {
          name: "ASCII",
          chars: {
            topLeft: "+",
            topRight: "+",
            bottomLeft: "+",
            bottomRight: "+",
            horizontal: "-",
            vertical: "|",
            topMid: "+",
            bottomMid: "+",
            leftMid: "+",
            rightMid: "+",
            cross: "+"
          }
        },
        single: {
          name: "单线",
          chars: {
            topLeft: "┌",
            topRight: "┐",
            bottomLeft: "└",
            bottomRight: "┘",
            horizontal: "─",
            vertical: "│",
            topMid: "┬",
            bottomMid: "┴",
            leftMid: "├",
            rightMid: "┤",
            cross: "┼"
          }
        },
        double: {
          name: "双线",
          chars: {
            topLeft: "╔",
            topRight: "╗",
            bottomLeft: "╚",
            bottomRight: "╝",
            horizontal: "═",
            vertical: "║",
            topMid: "╦",
            bottomMid: "╩",
            leftMid: "╠",
            rightMid: "╣",
            cross: "╬"
          }
        },
        rounded: {
          name: "圆角",
          chars: {
            topLeft: "╭",
            topRight: "╮",
            bottomLeft: "╰",
            bottomRight: "╯",
            horizontal: "─",
            vertical: "│",
            topMid: "┬",
            bottomMid: "┴",
            leftMid: "├",
            rightMid: "┤",
            cross: "┼"
          }
        },
        heavy: {
          name: "粗线",
          chars: {
            topLeft: "┏",
            topRight: "┓",
            bottomLeft: "┗",
            bottomRight: "┛",
            horizontal: "━",
            vertical: "┃",
            topMid: "┳",
            bottomMid: "┻",
            leftMid: "┣",
            rightMid: "┫",
            cross: "╋"
          }
        },
        dashed: {
          name: "虚线",
          chars: {
            topLeft: "┌",
            topRight: "┐",
            bottomLeft: "└",
            bottomRight: "┘",
            horizontal: "┄",
            vertical: "┆",
            topMid: "┬",
            bottomMid: "┴",
            leftMid: "├",
            rightMid: "┤",
            cross: "┼"
          }
        }
      };

      const boxChars = [
        { char: "─", name: "横线" },
        { char: "│", name: "竖线" },
        { char: "┌", name: "左上角" },
        { char: "┐", name: "右上角" },
        { char: "└", name: "左下角" },
        { char: "┘", name: "右下角" },
        { char: "├", name: "左T" },
        { char: "┤", name: "右T" },
        { char: "┬", name: "上T" },
        { char: "┴", name: "下T" },
        { char: "┼", name: "十字" },
        { char: "═", name: "双横" },
        { char: "║", name: "双竖" },
        { char: "╔", name: "双左上" },
        { char: "╗", name: "双右上" },
        { char: "╚", name: "双左下" },
        { char: "╝", name: "双右下" },
        { char: "╠", name: "双左T" },
        { char: "╣", name: "双右T" },
        { char: "╦", name: "双上T" },
        { char: "╩", name: "双下T" },
        { char: "╬", name: "双十字" },
        { char: "━", name: "粗横" },
        { char: "┃", name: "粗竖" }
      ];

      let currentStyle = "single";
      let tableData = [
        ["标题1", "标题2", "标题3"],
        ["内容A", "内容B", "内容C"],
        ["数据1", "数据2", "数据3"]
      ];

      function init() {
        renderStyleOptions();
        renderCellInputs();
        renderCharGrid();
        generateTable();

        const savedTheme = localStorage.getItem("table-border-theme");
        if (savedTheme) {
          document.documentElement.setAttribute("data-theme", savedTheme);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      }

      function renderStyleOptions() {
        const container = document.getElementById("styleOptions");
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        Object.keys(borderStyles).forEach(function (styleId) {
          const style = borderStyles[styleId];
          const btn = document.createElement("button");
          btn.className = "style-btn" + (styleId === currentStyle ? " active" : "");
          btn.textContent =
            style.name + " " + style.chars.topLeft + style.chars.horizontal + style.chars.topRight;
          btn.onclick = function () {
            selectStyle(styleId);
          };
          container.appendChild(btn);
        });
      }

      window.selectStyle = function (styleId) {
        currentStyle = styleId;
        renderStyleOptions();
        generateTable();
      };

      function renderCellInputs() {
        const container = document.getElementById("cellInputs");
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        tableData.forEach(function (row, rowIndex) {
          const rowDiv = document.createElement("div");
          rowDiv.className = "cell-row";

          row.forEach(function (cell, colIndex) {
            const input = document.createElement("input");
            input.type = "text";
            input.className = "cell-input";
            input.value = cell;
            input.placeholder = "R" + (rowIndex + 1) + "C" + (colIndex + 1);
            input.oninput = function () {
              tableData[rowIndex][colIndex] = this.value;
              generateTable();
            };
            rowDiv.appendChild(input);
          });

          container.appendChild(rowDiv);
        });

        document.getElementById("rowCount").value = tableData.length;
        document.getElementById("colCount").value = tableData[0].length;
      }

      function renderCharGrid() {
        const grid = document.getElementById("charGrid");
        while (grid.firstChild) {
          grid.removeChild(grid.firstChild);
        }

        boxChars.forEach(function (item) {
          const div = document.createElement("div");
          div.className = "char-item";
          div.onclick = function () {
            copyText(item.char);
          };
          div.title = "点击复制";

          const charSpan = document.createElement("div");
          charSpan.className = "char";
          charSpan.textContent = item.char;

          const nameSpan = document.createElement("div");
          nameSpan.className = "name";
          nameSpan.textContent = item.name;

          div.appendChild(charSpan);
          div.appendChild(nameSpan);
          grid.appendChild(div);
        });
      }

      window.updateTable = function () {
        const rows = parseInt(document.getElementById("rowCount").value) || 3;
        const cols = parseInt(document.getElementById("colCount").value) || 3;

        // Adjust rows
        while (tableData.length < rows) {
          const newRow = [];
          for (let i = 0; i < tableData[0].length; i++) {
            newRow.push("");
          }
          tableData.push(newRow);
        }
        while (tableData.length > rows) {
          tableData.pop();
        }

        // Adjust columns
        tableData.forEach(function (row) {
          while (row.length < cols) {
            row.push("");
          }
          while (row.length > cols) {
            row.pop();
          }
        });

        renderCellInputs();
        generateTable();
      };

      window.addRow = function () {
        const newRow = [];
        for (let i = 0; i < tableData[0].length; i++) {
          newRow.push("");
        }
        tableData.push(newRow);
        renderCellInputs();
        generateTable();
      };

      window.removeRow = function () {
        if (tableData.length > 1) {
          tableData.pop();
          renderCellInputs();
          generateTable();
        }
      };

      window.addCol = function () {
        tableData.forEach(function (row) {
          row.push("");
        });
        renderCellInputs();
        generateTable();
      };

      window.removeCol = function () {
        if (tableData[0].length > 1) {
          tableData.forEach(function (row) {
            row.pop();
          });
          renderCellInputs();
          generateTable();
        }
      };

      function generateTable() {
        const chars = borderStyles[currentStyle].chars;
        const alignment = document.getElementById("alignment").value;

        // Calculate column widths
        const colWidths = [];
        const numCols = tableData[0].length;

        for (let col = 0; col < numCols; col++) {
          let maxWidth = 0;
          tableData.forEach(function (row) {
            const cellWidth = getStringWidth(row[col] || "");
            if (cellWidth > maxWidth) {
              maxWidth = cellWidth;
            }
          });
          colWidths.push(Math.max(maxWidth, 4));
        }

        const lines = [];

        // Top border
        let topLine = chars.topLeft;
        colWidths.forEach(function (width, index) {
          topLine += chars.horizontal.repeat(width + 2);
          topLine += index < colWidths.length - 1 ? chars.topMid : chars.topRight;
        });
        lines.push(topLine);

        // Data rows
        tableData.forEach(function (row, rowIndex) {
          let dataLine = chars.vertical;
          row.forEach(function (cell, colIndex) {
            const paddedCell = padString(cell || "", colWidths[colIndex], alignment);
            dataLine += " " + paddedCell + " " + chars.vertical;
          });
          lines.push(dataLine);

          // Row separator (except last row)
          if (rowIndex < tableData.length - 1) {
            let sepLine = chars.leftMid;
            colWidths.forEach(function (width, index) {
              sepLine += chars.horizontal.repeat(width + 2);
              sepLine += index < colWidths.length - 1 ? chars.cross : chars.rightMid;
            });
            lines.push(sepLine);
          }
        });

        // Bottom border
        let bottomLine = chars.bottomLeft;
        colWidths.forEach(function (width, index) {
          bottomLine += chars.horizontal.repeat(width + 2);
          bottomLine += index < colWidths.length - 1 ? chars.bottomMid : chars.bottomRight;
        });
        lines.push(bottomLine);

        document.getElementById("previewOutput").textContent = lines.join("\n");
      }

      function getStringWidth(str) {
        let width = 0;
        for (let i = 0; i < str.length; i++) {
          const code = str.charCodeAt(i);
          // Simple check for CJK characters (wider)
          if (code >= 0x4e00 && code <= 0x9fff) {
            width += 2;
          } else {
            width += 1;
          }
        }
        return width;
      }

      function padString(str, targetWidth, alignment) {
        const currentWidth = getStringWidth(str);
        const padding = targetWidth - currentWidth;

        if (padding <= 0) return str;

        if (alignment === "center") {
          const leftPad = Math.floor(padding / 2);
          const rightPad = padding - leftPad;
          return " ".repeat(leftPad) + str + " ".repeat(rightPad);
        } else if (alignment === "right") {
          return " ".repeat(padding) + str;
        } else {
          return str + " ".repeat(padding);
        }
      }

      window.copyTable = function () {
        const table = document.getElementById("previewOutput").textContent;
        navigator.clipboard.writeText(table).then(function () {
          showToast("表格已复制到剪贴板");
        });
      };

      window.copyText = function (text) {
        navigator.clipboard.writeText(text).then(function () {
          showToast("已复制: " + text);
        });
      };

      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("table-border-theme", newTheme);
      };

      init();
    
