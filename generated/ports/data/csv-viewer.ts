// @ts-nocheck
// Generated from tools/data/csv-viewer.html
// Source SHA-256: 0ebe73e9b4d2dc6e401f93e0812be5b5867ae806fdf4e9885415967070959673
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function toggleTheme() {
        const body = document.body;
        const isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved === "light") document.body.setAttribute("data-theme", "light");
      })();

      function parseCSV() {
        const input = document.getElementById("csvInput").value.trim();
        if (!input) {
          showToast("请输入 CSV 数据");
          return;
        }

        const lines = input.split("\n").filter((line) => line.trim());
        if (lines.length === 0) {
          showToast("没有有效数据");
          return;
        }

        const rows = lines.map((line) => line.split(",").map((cell) => cell.trim()));
        const headers = rows[0];
        const data = rows.slice(1);

        // 使用 DOM API 防止 XSS
        const container = document.getElementById("tableContainer");
        container.textContent = "";
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        headers.forEach((h) => {
          const th = document.createElement("th");
          th.textContent = h;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        data.forEach((row) => {
          const tr = document.createElement("tr");
          row.forEach((cell) => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        container.appendChild(table);

        document.getElementById("stats").style.display = "flex";
        document.getElementById("rowCount").textContent = data.length;
        document.getElementById("colCount").textContent = headers.length;
        showToast("解析成功");
      }

      function clearAll() {
        document.getElementById("csvInput").value = "";
        document.getElementById("tableContainer").textContent = "";
        document.getElementById("stats").style.display = "none";
        showToast("已清空");
      }

      function downloadCSV() {
        const input = document.getElementById("csvInput").value;
        if (!input) {
          showToast("没有数据可下载");
          return;
        }
        const blob = new Blob([input], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.csv";
        a.click();
        URL.revokeObjectURL(url);
        showToast("下载成功");
      }

      function showToast(msg) {
        const toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }
    
