// @ts-nocheck
// Generated from tools/converter/csv-json.html
// Source SHA-256: a9c843cdf7eac27f64dfe5ce8077e5cc3769af6f11e3256e279a486b5be67f28
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 示例数据
      const samples = {
        users: `name,email,age,city,role
张三,zhangsan@example.com,28,北京,管理员
李四,lisi@example.com,32,上海,用户
王五,wangwu@example.com,25,广州,用户
赵六,zhaoliu@example.com,35,深圳,编辑`,
        products: `id,name,price,stock,category
1,笔记本电脑,5999.00,50,电子产品
2,无线鼠标,129.00,200,配件
3,机械键盘,399.00,80,配件
4,显示器,1599.00,30,电子产品
5,USB-C 转接器,89.00,150,配件`,
        sales: `date,product,quantity,amount,region
2024-01-15,笔记本电脑,5,29995.00,华北
2024-01-15,无线鼠标,20,2580.00,华东
2024-01-16,机械键盘,10,3990.00,华南
2024-01-16,显示器,3,4797.00,华北
2024-01-17,USB-C 转接器,50,4450.00,华东`
      };

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        document.querySelector(".theme-toggle").textContent = newTheme === "light" ? "🌙" : "☀️";
      };

      function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.querySelector(".theme-toggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      // 加载示例
      window.loadSample = function (type) {
        document.getElementById("csvInput").value = samples[type];
        updateStats("csv");
        csvToJson();
      };

      // 解析 CSV
      function parseCSV(csv) {
        const delimiter =
          document.getElementById("delimiter").value === "\\t"
            ? "\t"
            : document.getElementById("delimiter").value;
        const hasHeader = document.getElementById("hasHeader").checked;
        const trimValues = document.getElementById("trimValues").checked;
        const skipEmpty = document.getElementById("skipEmpty").checked;

        let lines = csv.split(/\r?\n/);
        if (skipEmpty) {
          lines = lines.filter((line) => line.trim() !== "");
        }

        if (lines.length === 0) return [];

        const result = [];
        let headers = [];

        // 解析单行，处理引号
        function parseLine(line) {
          const values = [];
          let current = "";
          let inQuotes = false;

          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const nextChar = line[i + 1];

            if (char === '"') {
              if (inQuotes && nextChar === '"') {
                current += '"';
                i++;
              } else {
                inQuotes = !inQuotes;
              }
            } else if (char === delimiter && !inQuotes) {
              values.push(trimValues ? current.trim() : current);
              current = "";
            } else {
              current += char;
            }
          }
          values.push(trimValues ? current.trim() : current);
          return values;
        }

        if (hasHeader && lines.length > 0) {
          headers = parseLine(lines[0]);
          lines = lines.slice(1);
        }

        lines.forEach((line, index) => {
          if (line.trim() === "" && skipEmpty) return;

          const values = parseLine(line);

          if (hasHeader) {
            const obj = {};
            headers.forEach((header, i) => {
              let value = values[i] || "";
              // 尝试转换数字
              if (value !== "" && !isNaN(value) && !isNaN(parseFloat(value))) {
                value = parseFloat(value);
              }
              obj[header] = value;
            });
            result.push(obj);
          } else {
            result.push(values);
          }
        });

        return result;
      }

      // CSV 转 JSON
      function csvToJson() {
        const csv = document.getElementById("csvInput").value.trim();
        if (!csv) {
          showStatus("请输入 CSV 内容", "error");
          return;
        }

        try {
          const data = parseCSV(csv);
          const json = JSON.stringify(data, null, 2);
          document.getElementById("jsonInput").value = json;
          updateStats("json");
          renderPreviewTable(data);
          showStatus("CSV → JSON 转换成功，共 " + data.length + " 条记录", "success");
        } catch (e) {
          showStatus("CSV 解析错误: " + e.message, "error");
        }
      }

      // JSON 转 CSV
      function jsonToCsv() {
        const jsonStr = document.getElementById("jsonInput").value.trim();
        if (!jsonStr) {
          showStatus("请输入 JSON 内容", "error");
          return;
        }

        try {
          const data = JSON.parse(jsonStr);
          if (!Array.isArray(data)) {
            showStatus("JSON 必须是数组格式", "error");
            return;
          }

          if (data.length === 0) {
            showStatus("JSON 数组为空", "error");
            return;
          }

          const delimiter =
            document.getElementById("delimiter").value === "\\t"
              ? "\t"
              : document.getElementById("delimiter").value;
          const hasHeader = document.getElementById("hasHeader").checked;

          let csv = "";

          // 获取所有键
          const allKeys = new Set();
          data.forEach((item) => {
            if (typeof item === "object" && item !== null) {
              Object.keys(item).forEach((key) => allKeys.add(key));
            }
          });
          const headers = Array.from(allKeys);

          // 转义函数
          function escapeValue(val) {
            if (val === null || val === undefined) return "";
            const str = String(val);
            if (str.includes(delimiter) || str.includes('"') || str.includes("\n")) {
              return '"' + str.replace(/"/g, '""') + '"';
            }
            return str;
          }

          // 如果是对象数组
          if (typeof data[0] === "object" && !Array.isArray(data[0])) {
            if (hasHeader) {
              csv += headers.map(escapeValue).join(delimiter) + "\n";
            }
            data.forEach((item) => {
              const row = headers.map((key) => escapeValue(item[key]));
              csv += row.join(delimiter) + "\n";
            });
          } else {
            // 如果是简单数组
            data.forEach((item) => {
              if (Array.isArray(item)) {
                csv += item.map(escapeValue).join(delimiter) + "\n";
              } else {
                csv += escapeValue(item) + "\n";
              }
            });
          }

          document.getElementById("csvInput").value = csv.trim();
          updateStats("csv");
          renderPreviewTable(data);
          showStatus("JSON → CSV 转换成功，共 " + data.length + " 条记录", "success");
        } catch (e) {
          showStatus("JSON 解析错误: " + e.message, "error");
        }
      }

      // 渲染预览表格
      function renderPreviewTable(data) {
        const container = document.getElementById("previewTable");
        if (!data || data.length === 0) {
          container.textContent = "";
          return;
        }

        const maxRows = 10;
        const displayData = data.slice(0, maxRows);

        const table = document.createElement("table");

        // 表头
        if (typeof data[0] === "object" && !Array.isArray(data[0])) {
          const headers = Object.keys(data[0]);
          const thead = document.createElement("thead");
          const headerRow = document.createElement("tr");
          headers.forEach((h) => {
            const th = document.createElement("th");
            th.textContent = h;
            headerRow.appendChild(th);
          });
          thead.appendChild(headerRow);
          table.appendChild(thead);

          // 数据行
          const tbody = document.createElement("tbody");
          displayData.forEach((row) => {
            const tr = document.createElement("tr");
            headers.forEach((h) => {
              const td = document.createElement("td");
              td.textContent = row[h] !== undefined ? String(row[h]) : "";
              tr.appendChild(td);
            });
            tbody.appendChild(tr);
          });
          table.appendChild(tbody);
        }

        container.textContent = "";
        if (data.length > maxRows) {
          const info = document.createElement("p");
          info.style.fontSize = "0.75rem";
          info.style.color = "var(--muted-color)";
          info.textContent = "显示前 " + maxRows + " 条，共 " + data.length + " 条记录";
          container.appendChild(info);
        }
        container.appendChild(table);
      }

      // 格式化 JSON
      window.formatJSON = function () {
        const jsonInput = document.getElementById("jsonInput");
        try {
          const obj = JSON.parse(jsonInput.value);
          jsonInput.value = JSON.stringify(obj, null, 2);
          updateStats("json");
        } catch (e) {
          showStatus("JSON 格式错误", "error");
        }
      };

      // 更新统计
      function updateStats(type) {
        const textarea = document.getElementById(type + "Input");
        const stats = document.getElementById(type + "Stats");
        const content = textarea.value;

        const chars = content.length;
        const lines = content ? content.split("\n").length : 0;
        stats.textContent = chars + " 字符 | " + lines + " 行";

        if (type === "json") {
          const valid = document.getElementById("jsonValid");
          if (content.trim()) {
            try {
              JSON.parse(content);
              valid.textContent = "✓ 有效";
              valid.style.color = "var(--accent-green)";
            } catch {
              valid.textContent = "✗ 无效";
              valid.style.color = "var(--accent-red)";
            }
          } else {
            valid.textContent = "";
          }
        }
      }

      // 文件上传
      window.handleFileUpload = function (event, type) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
          const content = e.target.result;
          document.getElementById(type + "Input").value = content;
          updateStats(type);

          if (type === "csv") {
            csvToJson();
          } else {
            jsonToCsv();
          }
        };
        reader.readAsText(file);
      };

      // 显示状态
      function showStatus(message, type) {
        const bar = document.getElementById("statusBar");
        bar.textContent = message;
        bar.className = "status-bar " + type;
        setTimeout(() => {
          bar.className = "status-bar";
        }, 3000);
      }

      // 复制文本
      window.copyText = function (id) {
        navigator.clipboard.writeText(document.getElementById(id).value).then(() => {
          showStatus("已复制到剪贴板", "success");
        });
      };

      // 清除文本
      window.clearText = function (id) {
        document.getElementById(id).value = "";
        updateStats(id.replace("Input", ""));
        document.getElementById("previewTable").textContent = "";
      };

      // 下载文件
      window.downloadFile = function (type) {
        const content = document.getElementById(type + "Input").value;
        if (!content) {
          showStatus("没有内容可下载", "error");
          return;
        }

        const ext = type === "csv" ? ".csv" : ".json";
        const mime = type === "csv" ? "text/csv;charset=utf-8" : "application/json";
        const blob = new Blob(["\ufeff" + content], { type: mime });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data" + ext;
        a.click();
        URL.revokeObjectURL(url);
      };

      // 初始化
      initTheme();
      loadSample("users");
    
