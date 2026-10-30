// @ts-nocheck
// Generated from tools/dev/sql-converter.html
// Source SHA-256: ef675a2f1c1f572f4cbceebd1e77a30fbca499298e01cbeb7a3e7db06579f198
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme
      function initTheme() {
        const saved = localStorage.getItem("theme");
        if (saved) document.documentElement.setAttribute("data-theme", saved);
        else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
          document.documentElement.setAttribute("data-theme", "dark");
      }
      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };
      initTheme();

      const examples = {
        users: `INSERT INTO users (id, name, email, age, created_at) VALUES
(1, '张三', 'zhangsan@example.com', 28, '2024-01-15'),
(2, '李四', 'lisi@example.com', 32, '2024-02-20'),
(3, '王五', 'wangwu@example.com', 25, '2024-03-10');`,
        products: `INSERT INTO products (id, name, price, category, stock) VALUES
(101, 'iPhone 15', 7999.00, '手机', 100),
(102, 'MacBook Pro', 14999.00, '电脑', 50),
(103, 'AirPods Pro', 1899.00, '配件', 200);`,
        orders: `INSERT INTO orders (order_id, user_id, amount, status, order_date) VALUES
('ORD001', 1, 8998.00, 'completed', '2024-03-15'),
('ORD002', 2, 14999.00, 'shipped', '2024-03-16'),
('ORD003', 3, 1899.00, 'pending', '2024-03-17');`
      };

      window.loadExample = function (name) {
        document.getElementById("inputArea").value = examples[name];
        document.getElementById("inputFormat").value = "sql";
        convert();
      };

      function updatePlaceholder() {
        const format = document.getElementById("inputFormat").value;
        const placeholders = {
          sql: "粘贴 SQL INSERT 语句...",
          json: '粘贴 JSON 数组...\n[\n  {"id": 1, "name": "示例"},\n  {"id": 2, "name": "数据"}\n]',
          csv: "粘贴 CSV 数据...\nid,name,email\n1,张三,test@example.com"
        };
        document.getElementById("inputArea").placeholder = placeholders[format];
      }

      function parseSQL(sql) {
        const result = { columns: [], rows: [] };

        // Extract table name and columns
        const headerMatch = sql.match(/INSERT\s+INTO\s+(\w+)\s*\(([^)]+)\)/i);
        if (!headerMatch) return null;

        result.table = headerMatch[1];
        result.columns = headerMatch[2].split(",").map((c) => c.trim());

        // Extract values
        const valuesMatch = sql.match(/VALUES\s*([\s\S]+)/i);
        if (!valuesMatch) return null;

        const valuesStr = valuesMatch[1];
        const rowMatches = valuesStr.match(/\([^)]+\)/g);

        if (rowMatches) {
          for (const rowStr of rowMatches) {
            const values = [];
            const inner = rowStr.slice(1, -1);

            // Parse values handling strings and numbers
            let current = "";
            let inString = false;
            let stringChar = "";

            for (let i = 0; i < inner.length; i++) {
              const char = inner[i];

              if (!inString && (char === "'" || char === '"')) {
                inString = true;
                stringChar = char;
              } else if (inString && char === stringChar) {
                inString = false;
              } else if (!inString && char === ",") {
                values.push(parseValue(current.trim()));
                current = "";
                continue;
              }
              current += char;
            }
            if (current.trim()) values.push(parseValue(current.trim()));

            result.rows.push(values);
          }
        }

        return result;
      }

      function parseValue(val) {
        if (
          (val.startsWith("'") && val.endsWith("'")) ||
          (val.startsWith('"') && val.endsWith('"'))
        ) {
          return val.slice(1, -1);
        }
        if (val.toLowerCase() === "null") return null;
        if (!isNaN(val)) return parseFloat(val);
        return val;
      }

      function parseJSON(json) {
        try {
          const data = JSON.parse(json);
          if (!Array.isArray(data) || data.length === 0) return null;

          const columns = Object.keys(data[0]);
          const rows = data.map((row) => columns.map((col) => row[col]));

          return { columns, rows, table: "table_name" };
        } catch (e) {
          return null;
        }
      }

      function parseCSV(csv) {
        const lines = csv.trim().split("\n");
        if (lines.length < 2) return null;

        const columns = lines[0].split(",").map((c) => c.trim());
        const rows = [];

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(",").map((v) => {
            v = v.trim();
            if (!isNaN(v) && v !== "") return parseFloat(v);
            return v;
          });
          rows.push(values);
        }

        return { columns, rows, table: "table_name" };
      }

      function toJSON(data) {
        const result = data.rows.map((row) => {
          const obj = {};
          data.columns.forEach((col, i) => {
            obj[col] = row[i];
          });
          return obj;
        });
        return JSON.stringify(result, null, 2);
      }

      function toCSV(data) {
        let csv = data.columns.join(",") + "\n";
        for (const row of data.rows) {
          csv +=
            row
              .map((v) => {
                if (v === null) return "";
                if (typeof v === "string" && (v.includes(",") || v.includes('"'))) {
                  return '"' + v.replace(/"/g, '""') + '"';
                }
                return v;
              })
              .join(",") + "\n";
        }
        return csv.trim();
      }

      function toMarkdown(data) {
        let md = "| " + data.columns.join(" | ") + " |\n";
        md += "| " + data.columns.map(() => "---").join(" | ") + " |\n";
        for (const row of data.rows) {
          md += "| " + row.map((v) => (v === null ? "" : v)).join(" | ") + " |\n";
        }
        return md.trim();
      }

      function toSQL(data) {
        const table = data.table || "table_name";
        let sql = `INSERT INTO ${table} (${data.columns.join(", ")}) VALUES\n`;

        const valueStrings = data.rows.map((row) => {
          const values = row.map((v) => {
            if (v === null) return "NULL";
            if (typeof v === "string") return `'${v.replace(/'/g, "''")}'`;
            return v;
          });
          return `(${values.join(", ")})`;
        });

        sql += valueStrings.join(",\n") + ";";
        return sql;
      }

      function toHTML(data) {
        let html = '<table border="1" cellpadding="5" cellspacing="0">\n';
        html += "  <thead>\n    <tr>\n";
        for (const col of data.columns) {
          html += `      <th>${col}</th>\n`;
        }
        html += "    </tr>\n  </thead>\n  <tbody>\n";
        for (const row of data.rows) {
          html += "    <tr>\n";
          for (const val of row) {
            html += `      <td>${val === null ? "" : val}</td>\n`;
          }
          html += "    </tr>\n";
        }
        html += "  </tbody>\n</table>";
        return html;
      }

      function convert() {
        const input = document.getElementById("inputArea").value.trim();
        if (!input) {
          document.getElementById("outputArea").value = "";
          return;
        }

        const inputFormat = document.getElementById("inputFormat").value;
        const outputFormat = document.getElementById("outputFormat").value;

        let data;
        switch (inputFormat) {
          case "sql":
            data = parseSQL(input);
            break;
          case "json":
            data = parseJSON(input);
            break;
          case "csv":
            data = parseCSV(input);
            break;
        }

        if (!data) {
          document.getElementById("outputArea").value = "解析失败，请检查输入格式";
          return;
        }

        let output;
        switch (outputFormat) {
          case "json":
            output = toJSON(data);
            break;
          case "csv":
            output = toCSV(data);
            break;
          case "markdown":
            output = toMarkdown(data);
            break;
          case "sql":
            output = toSQL(data);
            break;
          case "html":
            output = toHTML(data);
            break;
        }

        document.getElementById("outputArea").value = output;
      }

      let autoConvertTimer;
      window.autoConvert = function () {
        clearTimeout(autoConvertTimer);
        autoConvertTimer = setTimeout(convert, 500);
      };

      window.swapPanels = function () {
        const inputArea = document.getElementById("inputArea");
        const outputArea = document.getElementById("outputArea");
        const inputFormat = document.getElementById("inputFormat");
        const outputFormat = document.getElementById("outputFormat");

        const tempValue = inputArea.value;
        inputArea.value = outputArea.value;
        outputArea.value = tempValue;

        const tempFormat = inputFormat.value;
        inputFormat.value = outputFormat.value;
        outputFormat.value = tempFormat;

        updatePlaceholder();
      };

      window.clearAll = function () {
        document.getElementById("inputArea").value = "";
        document.getElementById("outputArea").value = "";
      };

      window.pasteInput = async function () {
        try {
          const text = await navigator.clipboard.readText();
          document.getElementById("inputArea").value = text;
          convert();
        } catch (e) {
          alert("无法访问剪贴板");
        }
      };

      window.formatInput = function () {
        const format = document.getElementById("inputFormat").value;
        const input = document.getElementById("inputArea").value;

        if (format === "json") {
          try {
            const data = JSON.parse(input);
            document.getElementById("inputArea").value = JSON.stringify(data, null, 2);
          } catch (e) {}
        }
      };

      window.copyOutput = function () {
        const output = document.getElementById("outputArea").value;
        if (output) {
          navigator.clipboard.writeText(output);
          alert("已复制");
        }
      };

      window.downloadOutput = function () {
        const output = document.getElementById("outputArea").value;
        if (!output) return;

        const format = document.getElementById("outputFormat").value;
        const extensions = { json: "json", csv: "csv", markdown: "md", sql: "sql", html: "html" };

        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `data.${extensions[format]}`;
        a.click();
        URL.revokeObjectURL(url);
      };
    
