// @ts-nocheck
// Generated from tools/dev/json-to-sql.html
// Source SHA-256: 1231fa0a82b63ec23c3f20585d5803ab6621f44790ddede01ec75193e7369a66
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

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
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.querySelector(".theme-toggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      // 字段配置
      let fieldConfig = {};

      // 转义字符串
      function escapeString(str, dbType) {
        if (str === null || str === undefined) return null;
        str = String(str);

        // 基本转义
        str = str.replace(/'/g, "''");

        if (dbType === "mysql") {
          str = str.replace(/\\/g, "\\\\");
        }

        return str;
      }

      // 格式化值
      function formatValue(value, dbType, nullString) {
        if (value === null || value === undefined) {
          return "NULL";
        }

        if (nullString && value === "") {
          return "NULL";
        }

        if (typeof value === "boolean") {
          if (dbType === "postgresql") {
            return value ? "TRUE" : "FALSE";
          }
          return value ? "1" : "0";
        }

        if (typeof value === "number") {
          return String(value);
        }

        if (typeof value === "object") {
          // 嵌套对象转 JSON 字符串
          return "'" + escapeString(JSON.stringify(value), dbType) + "'";
        }

        return "'" + escapeString(value, dbType) + "'";
      }

      // 包裹标识符
      function wrapIdentifier(name, dbType) {
        switch (dbType) {
          case "mysql":
            return "`" + name + "`";
          case "postgresql":
            return '"' + name + '"';
          case "sqlserver":
            return "[" + name + "]";
          case "oracle":
            return '"' + name.toUpperCase() + '"';
          default:
            return name;
        }
      }

      // 生成单条 INSERT
      function generateSingleInsert(data, columns, tableName, dbType, options) {
        const values = columns
          .map((col) => {
            const mappedCol = fieldConfig[col];
            if (mappedCol && mappedCol.exclude) return null;
            return formatValue(data[col], dbType, options.nullString);
          })
          .filter((v) => v !== null);

        const cols = columns
          .filter((col) => !fieldConfig[col] || !fieldConfig[col].exclude)
          .map((col) => {
            const mapped = fieldConfig[col];
            return wrapIdentifier(mapped && mapped.rename ? mapped.rename : col, dbType);
          });

        let sql = "";

        if (options.replace && (dbType === "mysql" || dbType === "sqlite")) {
          sql = "REPLACE INTO";
        } else if (options.ignore) {
          if (dbType === "mysql") {
            sql = "INSERT IGNORE INTO";
          } else if (dbType === "sqlite") {
            sql = "INSERT OR IGNORE INTO";
          } else {
            sql = "INSERT INTO";
          }
        } else {
          sql = "INSERT INTO";
        }

        sql += " " + wrapIdentifier(tableName, dbType);

        if (options.pretty) {
          sql += "\n  (" + cols.join(", ") + ")\nVALUES\n  (" + values.join(", ") + ")";
        } else {
          sql += " (" + cols.join(", ") + ") VALUES (" + values.join(", ") + ")";
        }

        // PostgreSQL ON CONFLICT
        if (options.ignore && dbType === "postgresql") {
          sql += "\nON CONFLICT DO NOTHING";
        }

        return sql + ";";
      }

      // 生成批量 INSERT (MySQL)
      function generateBatchInsertMySQL(dataArray, columns, tableName, dbType, options) {
        const cols = columns
          .filter((col) => !fieldConfig[col] || !fieldConfig[col].exclude)
          .map((col) => {
            const mapped = fieldConfig[col];
            return wrapIdentifier(mapped && mapped.rename ? mapped.rename : col, dbType);
          });

        let sql = options.ignore ? "INSERT IGNORE INTO" : "INSERT INTO";
        sql += " " + wrapIdentifier(tableName, dbType);

        if (options.pretty) {
          sql += "\n  (" + cols.join(", ") + ")\nVALUES";
        } else {
          sql += " (" + cols.join(", ") + ") VALUES ";
        }

        const valueRows = dataArray.map((data) => {
          const values = columns
            .map((col) => {
              if (fieldConfig[col] && fieldConfig[col].exclude) return null;
              return formatValue(data[col], dbType, options.nullString);
            })
            .filter((v) => v !== null);
          return "(" + values.join(", ") + ")";
        });

        if (options.pretty) {
          sql += "\n  " + valueRows.join(",\n  ");
        } else {
          sql += valueRows.join(", ");
        }

        return sql + ";";
      }

      // 生成 Oracle INSERT ALL
      function generateOracleInsertAll(dataArray, columns, tableName, dbType, options) {
        const cols = columns
          .filter((col) => !fieldConfig[col] || !fieldConfig[col].exclude)
          .map((col) => {
            const mapped = fieldConfig[col];
            return wrapIdentifier(mapped && mapped.rename ? mapped.rename : col, dbType);
          });

        let sql = "INSERT ALL";

        dataArray.forEach((data) => {
          const values = columns
            .map((col) => {
              if (fieldConfig[col] && fieldConfig[col].exclude) return null;
              return formatValue(data[col], dbType, options.nullString);
            })
            .filter((v) => v !== null);

          if (options.pretty) {
            sql += "\n  INTO " + wrapIdentifier(tableName, dbType);
            sql += " (" + cols.join(", ") + ")";
            sql += " VALUES (" + values.join(", ") + ")";
          } else {
            sql += " INTO " + wrapIdentifier(tableName, dbType);
            sql += " (" + cols.join(", ") + ") VALUES (" + values.join(", ") + ")";
          }
        });

        sql += "\nSELECT 1 FROM DUAL;";
        return sql;
      }

      // 主转换函数
      window.convertToSql = function () {
        const input = document.getElementById("jsonInput").value.trim();
        const tableName = document.getElementById("tableName").value.trim() || "table_name";
        const dbType = document.getElementById("dbType").value;
        const statusText = document.getElementById("statusText");
        const statsText = document.getElementById("statsText");

        if (!input) {
          setStatus("请输入 JSON 数据", "error");
          return;
        }

        try {
          let json = JSON.parse(input);

          // 确保是数组
          const dataArray = Array.isArray(json) ? json : [json];

          if (dataArray.length === 0) {
            setStatus("JSON 数组为空", "error");
            return;
          }

          // 获取所有列
          const allColumns = new Set();
          dataArray.forEach((item) => {
            if (typeof item === "object" && item !== null) {
              Object.keys(item).forEach((key) => allColumns.add(key));
            }
          });
          const columns = Array.from(allColumns);

          if (columns.length === 0) {
            setStatus("无法从 JSON 中提取字段", "error");
            return;
          }

          // 更新字段映射 UI
          updateFieldMapping(columns, dataArray[0]);

          // 生成 SQL
          const options = {
            batch: document.getElementById("optBatch").checked,
            ignore: document.getElementById("optIgnore").checked,
            replace: document.getElementById("optReplace").checked,
            pretty: document.getElementById("optPretty").checked,
            nullString: document.getElementById("optNullString").checked
          };

          let sql = "";

          if (options.batch && dataArray.length > 1) {
            if (dbType === "oracle") {
              sql = generateOracleInsertAll(dataArray, columns, tableName, dbType, options);
            } else {
              sql = generateBatchInsertMySQL(dataArray, columns, tableName, dbType, options);
            }
          } else {
            const statements = dataArray.map((data) =>
              generateSingleInsert(data, columns, tableName, dbType, options)
            );
            sql = statements.join(options.pretty ? "\n\n" : "\n");
          }

          document.getElementById("sqlOutput").value = sql;

          // 更新预览表格
          updatePreviewTable(dataArray, columns);

          statsText.textContent = "记录数: " + dataArray.length + " | 字段数: " + columns.length;
          setStatus("生成成功", "success");
        } catch (e) {
          setStatus("JSON 解析错误: " + e.message, "error");
          document.getElementById("sqlOutput").value = "";
          statsText.textContent = "";
        }
      };

      // 更新字段映射
      function updateFieldMapping(columns, sampleData) {
        const container = document.getElementById("fieldMapping");
        container.textContent = "";

        columns.forEach((col) => {
          const value = sampleData[col];
          const type = value === null ? "null" : typeof value;

          if (!fieldConfig[col]) {
            fieldConfig[col] = { exclude: false, rename: "" };
          }

          const div = document.createElement("div");
          div.className = "field-item";

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = !fieldConfig[col].exclude;
          checkbox.onchange = function () {
            fieldConfig[col].exclude = !this.checked;
          };

          const nameSpan = document.createElement("span");
          nameSpan.className = "field-name";
          nameSpan.textContent = col;

          const typeSpan = document.createElement("span");
          typeSpan.className = "field-type";
          typeSpan.textContent = "(" + type + ")";

          const renameInput = document.createElement("input");
          renameInput.type = "text";
          renameInput.placeholder = "重命名为...";
          renameInput.value = fieldConfig[col].rename || "";
          renameInput.oninput = function () {
            fieldConfig[col].rename = this.value;
          };

          div.appendChild(checkbox);
          div.appendChild(nameSpan);
          div.appendChild(typeSpan);
          div.appendChild(renameInput);
          container.appendChild(div);
        });
      }

      // 更新预览表格
      function updatePreviewTable(dataArray, columns) {
        const container = document.getElementById("previewTable");
        container.textContent = "";

        const table = document.createElement("table");

        // 表头
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        columns.forEach((col) => {
          const th = document.createElement("th");
          th.textContent = col;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 表体（最多显示10行）
        const tbody = document.createElement("tbody");
        const displayData = dataArray.slice(0, 10);
        displayData.forEach((data) => {
          const tr = document.createElement("tr");
          columns.forEach((col) => {
            const td = document.createElement("td");
            const value = data[col];
            if (value === null || value === undefined) {
              td.textContent = "NULL";
              td.style.color = "var(--pico-muted-color)";
            } else if (typeof value === "object") {
              td.textContent = JSON.stringify(value);
            } else {
              td.textContent = String(value);
            }
            td.title = td.textContent;
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        container.appendChild(table);

        if (dataArray.length > 10) {
          const note = document.createElement("p");
          note.style.color = "var(--pico-muted-color)";
          note.style.fontSize = "0.85rem";
          note.textContent = "仅显示前 10 条，共 " + dataArray.length + " 条记录";
          container.appendChild(note);
        }
      }

      // 设置状态
      function setStatus(text, type) {
        const statusText = document.getElementById("statusText");
        statusText.textContent = text;
        statusText.className = type || "";
      }

      // 格式化 JSON
      window.formatJson = function () {
        const input = document.getElementById("jsonInput");
        try {
          const json = JSON.parse(input.value);
          input.value = JSON.stringify(json, null, 2);
          setStatus("格式化成功", "success");
        } catch (e) {
          setStatus("JSON 格式错误: " + e.message, "error");
        }
      };

      // 复制 SQL
      window.copySql = function () {
        const output = document.getElementById("sqlOutput");
        if (!output.value) {
          setStatus("没有可复制的内容", "error");
          return;
        }
        navigator.clipboard
          .writeText(output.value)
          .then(() => {
            setStatus("已复制到剪贴板", "success");
          })
          .catch(() => {
            output.select();
            document.execCommand("copy");
            setStatus("已复制到剪贴板", "success");
          });
      };

      // 清空
      window.clearAll = function () {
        document.getElementById("jsonInput").value = "";
        document.getElementById("sqlOutput").value = "";
        document.getElementById("statsText").textContent = "";
        document.getElementById("fieldMapping").textContent = "";
        document.getElementById("previewTable").textContent = "";
        fieldConfig = {};
        setStatus("已清空", "success");
      };

      // 加载示例
      window.loadExample = function () {
        const example = [
          {
            id: 1,
            name: "张三",
            email: "zhangsan@example.com",
            age: 28,
            is_active: true,
            balance: 1234.56,
            created_at: "2024-01-15 10:30:00"
          },
          {
            id: 2,
            name: "李四",
            email: "lisi@example.com",
            age: 32,
            is_active: false,
            balance: 5678.9,
            created_at: "2024-01-16 14:20:00"
          },
          {
            id: 3,
            name: "王五",
            email: null,
            age: 25,
            is_active: true,
            balance: 0,
            created_at: "2024-01-17 09:15:00"
          }
        ];
        document.getElementById("jsonInput").value = JSON.stringify(example, null, 2);
        document.getElementById("tableName").value = "users";
        setStatus("已加载示例数据", "success");
      };

      // 初始化
      document.addEventListener("DOMContentLoaded", () => {
        initTheme();

        // 互斥选项
        document.getElementById("optIgnore").addEventListener("change", function () {
          if (this.checked) {
            document.getElementById("optReplace").checked = false;
          }
        });

        document.getElementById("optReplace").addEventListener("change", function () {
          if (this.checked) {
            document.getElementById("optIgnore").checked = false;
          }
        });
      });
    
