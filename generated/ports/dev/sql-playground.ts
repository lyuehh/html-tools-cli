// @ts-nocheck
// Generated from tools/dev/sql-playground.html
// Source SHA-256: 50c130bc07d9c5170d770579700852378af732d845ec20f20df436fc8345ae2c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      let db = null;

      // Initialize SQL.js
      async function initDB() {
        try {
          const SQL = await initSqlJs({
            locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
          });
          db = new SQL.Database();

          // Create sample tables
          db.run(`
                    CREATE TABLE users (
                        id INTEGER PRIMARY KEY,
                        name TEXT NOT NULL,
                        email TEXT UNIQUE,
                        age INTEGER,
                        created_at TEXT DEFAULT CURRENT_TIMESTAMP
                    );
                    
                    CREATE TABLE posts (
                        id INTEGER PRIMARY KEY,
                        user_id INTEGER,
                        title TEXT NOT NULL,
                        content TEXT,
                        views INTEGER DEFAULT 0,
                        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (user_id) REFERENCES users(id)
                    );
                    
                    CREATE TABLE comments (
                        id INTEGER PRIMARY KEY,
                        post_id INTEGER,
                        user_id INTEGER,
                        content TEXT NOT NULL,
                        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (post_id) REFERENCES posts(id),
                        FOREIGN KEY (user_id) REFERENCES users(id)
                    );
                    
                    INSERT INTO users (name, email, age) VALUES 
                        ('张三', 'zhangsan@example.com', 28),
                        ('李四', 'lisi@example.com', 32),
                        ('王五', 'wangwu@example.com', 25),
                        ('赵六', 'zhaoliu@example.com', 35),
                        ('陈七', 'chenqi@example.com', 29);
                    
                    INSERT INTO posts (user_id, title, content, views) VALUES 
                        (1, 'Hello World', '这是我的第一篇文章', 100),
                        (1, 'SQL入门教程', '今天学习了基础SQL语法', 250),
                        (2, '前端开发心得', '分享一些前端开发经验', 180),
                        (3, '后端架构设计', '微服务架构实践', 320),
                        (4, '数据库优化', 'MySQL性能优化技巧', 420);
                    
                    INSERT INTO comments (post_id, user_id, content) VALUES 
                        (1, 2, '写得很好！'),
                        (1, 3, '期待更多文章'),
                        (2, 4, '非常实用'),
                        (3, 1, '学习了'),
                        (4, 5, '干货满满');
                `);

          updateTableList();
        } catch (e) {
          document.getElementById("tableList").innerHTML =
            `<div class="message error">初始化失败: ${e.message}</div>`;
        }
      }

      function updateTableList() {
        const result = db.exec("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
        const tables = result.length ? result[0].values.map((v) => v[0]) : [];

        const list = document.getElementById("tableList");
        if (tables.length === 0) {
          list.innerHTML = '<div class="message">暂无数据表</div>';
          return;
        }

        list.innerHTML = tables
          .map(
            (t) => `
                <div class="table-item" onclick="showTableSchema('${t}')">
                    <span class="table-icon">📄</span>
                    <span>${t}</span>
                </div>
            `
          )
          .join("");
      }

      window.showTableSchema = function (tableName) {
        document.querySelectorAll(".table-item").forEach((i) => i.classList.remove("active"));
        event.currentTarget.classList.add("active");

        const result = db.exec(`PRAGMA table_info(${tableName})`);
        if (!result.length) return;

        const columns = result[0].values;
        const schemaInfo = document.getElementById("schemaInfo");
        schemaInfo.innerHTML = `
                <div class="schema-info">
                    <strong>${tableName}</strong>
                    ${columns
                      .map(
                        (col) => `
                        <div class="column-item">
                            <span class="column-name">${col[1]}</span>
                            <span class="column-type">${col[2]}${col[3] ? " NOT NULL" : ""}${col[5] ? " PK" : ""}</span>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `;

        // Quick select
        document.getElementById("sqlEditor").value = `SELECT * FROM ${tableName} LIMIT 100;`;
      };

      function executeSQL() {
        const sql = document.getElementById("sqlEditor").value.trim();
        if (!sql) {
          showMessage("请输入SQL语句", "error");
          return;
        }

        const startTime = performance.now();

        try {
          // Split multiple statements
          const statements = sql.split(";").filter((s) => s.trim());
          let lastResult = null;
          let affectedRows = 0;

          for (const stmt of statements) {
            if (!stmt.trim()) continue;

            const isSelect = stmt.trim().toUpperCase().startsWith("SELECT");

            if (isSelect) {
              lastResult = db.exec(stmt);
            } else {
              db.run(stmt);
              affectedRows += db.getRowsModified();
            }
          }

          const endTime = performance.now();
          const execTime = (endTime - startTime).toFixed(2);

          if (lastResult && lastResult.length > 0) {
            showResults(lastResult[0], execTime);
          } else {
            showMessage(`执行成功，影响 ${affectedRows} 行 (${execTime}ms)`, "success");
            updateTableList();
          }
        } catch (e) {
          showMessage(`错误: ${e.message}`, "error");
        }
      }

      function showResults(result, time) {
        const { columns, values } = result;
        const meta = document.getElementById("resultsMeta");
        meta.textContent = `${values.length} 行 · ${time}ms`;

        const content = document.getElementById("resultsContent");

        if (values.length === 0) {
          content.innerHTML = '<div class="message">查询结果为空</div>';
          return;
        }

        content.innerHTML = `
                <table>
                    <thead>
                        <tr>${columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("")}</tr>
                    </thead>
                    <tbody>
                        ${values
                          .map(
                            (row) => `
                            <tr>${row.map((cell) => `<td>${cell === null ? '<span style="color:var(--color-text-secondary)">NULL</span>' : escapeHtml(String(cell))}</td>`).join("")}</tr>
                        `
                          )
                          .join("")}
                    </tbody>
                </table>
            `;
      }

      function showMessage(msg, type) {
        document.getElementById("resultsMeta").textContent = "";
        document.getElementById("resultsContent").innerHTML =
          `<div class="message ${type}">${escapeHtml(msg)}</div>`;
      }

      window.escapeHtml = function (str) {
        return str.replace(
          /[&<>"']/g,
          (m) =>
            ({
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;"
            })[m]
        );
      };

      window.formatSQL = function () {
        let sql = document.getElementById("sqlEditor").value;
        // Basic formatting
        const keywords = [
          "SELECT",
          "FROM",
          "WHERE",
          "AND",
          "OR",
          "ORDER BY",
          "GROUP BY",
          "HAVING",
          "JOIN",
          "LEFT JOIN",
          "RIGHT JOIN",
          "INNER JOIN",
          "INSERT INTO",
          "VALUES",
          "UPDATE",
          "SET",
          "DELETE FROM",
          "CREATE TABLE",
          "ALTER TABLE",
          "DROP TABLE",
          "LIMIT",
          "OFFSET"
        ];

        keywords.forEach((kw) => {
          sql = sql.replace(new RegExp("\\b" + kw + "\\b", "gi"), "\n" + kw);
        });

        sql = sql.trim().replace(/\n+/g, "\n");
        document.getElementById("sqlEditor").value = sql;
      };

      window.clearEditor = function () {
        document.getElementById("sqlEditor").value = "";
      };

      window.loadExample = function (type) {
        const examples = {
          select: "SELECT id, name, email, age\nFROM users\nWHERE age > 25\nORDER BY age DESC;",
          insert: "INSERT INTO users (name, email, age)\nVALUES ('新用户', 'new@example.com', 30);",
          update: "UPDATE users\nSET age = age + 1\nWHERE name = '张三';",
          create:
            "CREATE TABLE products (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  price REAL,\n  stock INTEGER DEFAULT 0\n);",
          join: "SELECT u.name, p.title, p.views\nFROM users u\nJOIN posts p ON u.id = p.user_id\nORDER BY p.views DESC;",
          group:
            "SELECT u.name, COUNT(p.id) as post_count, SUM(p.views) as total_views\nFROM users u\nLEFT JOIN posts p ON u.id = p.user_id\nGROUP BY u.id\nORDER BY total_views DESC;"
        };
        document.getElementById("sqlEditor").value = examples[type] || "";
      };

      // Keyboard shortcuts
      document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          executeSQL();
        }
      });

      // Initialize
      initDB();
    
