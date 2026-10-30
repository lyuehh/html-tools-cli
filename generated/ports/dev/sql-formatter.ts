// @ts-nocheck
// Generated from tools/dev/sql-formatter.html
// Source SHA-256: cf88b6470aa569b70a20e62bfbb1204ba23b231cc23ed941ccd113968e41714d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const keywords = [
        "SELECT",
        "FROM",
        "WHERE",
        "AND",
        "OR",
        "NOT",
        "IN",
        "LIKE",
        "BETWEEN",
        "IS",
        "NULL",
        "JOIN",
        "INNER",
        "LEFT",
        "RIGHT",
        "OUTER",
        "FULL",
        "CROSS",
        "ON",
        "AS",
        "GROUP",
        "BY",
        "HAVING",
        "ORDER",
        "ASC",
        "DESC",
        "LIMIT",
        "OFFSET",
        "INSERT",
        "INTO",
        "VALUES",
        "UPDATE",
        "SET",
        "DELETE",
        "CREATE",
        "TABLE",
        "ALTER",
        "DROP",
        "INDEX",
        "VIEW",
        "DATABASE",
        "PRIMARY",
        "KEY",
        "FOREIGN",
        "REFERENCES",
        "UNIQUE",
        "DEFAULT",
        "CHECK",
        "CONSTRAINT",
        "CASCADE",
        "TRUNCATE",
        "DISTINCT",
        "ALL",
        "UNION",
        "EXCEPT",
        "INTERSECT",
        "CASE",
        "WHEN",
        "THEN",
        "ELSE",
        "END",
        "EXISTS",
        "ANY",
        "SOME"
      ];

      const functions = [
        "COUNT",
        "SUM",
        "AVG",
        "MIN",
        "MAX",
        "COALESCE",
        "NULLIF",
        "CAST",
        "CONVERT",
        "CONCAT",
        "SUBSTRING",
        "TRIM",
        "UPPER",
        "LOWER",
        "LENGTH",
        "REPLACE",
        "DATE",
        "NOW",
        "CURDATE",
        "YEAR",
        "MONTH",
        "DAY",
        "DATEDIFF",
        "DATE_FORMAT",
        "ROUND",
        "FLOOR",
        "CEIL",
        "ABS",
        "MOD",
        "POWER",
        "SQRT",
        "IF",
        "IFNULL",
        "IIF",
        "NVL",
        "DECODE"
      ];

      const mainClauses = [
        "SELECT",
        "FROM",
        "WHERE",
        "GROUP BY",
        "HAVING",
        "ORDER BY",
        "LIMIT",
        "INNER JOIN",
        "LEFT JOIN",
        "RIGHT JOIN",
        "FULL JOIN",
        "CROSS JOIN",
        "JOIN",
        "ON",
        "INSERT INTO",
        "VALUES",
        "UPDATE",
        "SET",
        "DELETE FROM",
        "CREATE TABLE",
        "ALTER TABLE",
        "DROP TABLE",
        "UNION",
        "UNION ALL"
      ];

      const templates = {
        select:
          "SELECT id, name, email FROM users WHERE status = 'active' ORDER BY created_at DESC LIMIT 10;",
        join: "SELECT u.name, o.order_id, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id LEFT JOIN products p ON o.product_id = p.id WHERE u.status = 'active';",
        subquery:
          "SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE total_amount > 1000) AND created_at >= (SELECT MIN(created_at) FROM users WHERE status = 'vip');",
        insert:
          "INSERT INTO users (name, email, status, created_at) VALUES ('张三', 'zhangsan@example.com', 'active', NOW());",
        update:
          "UPDATE users SET status = 'inactive', updated_at = NOW() WHERE last_login < '2023-01-01' AND status = 'active';",
        create:
          "CREATE TABLE orders (id INT PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL, product_name VARCHAR(255), quantity INT DEFAULT 1, total_amount DECIMAL(10,2), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id));"
      };

      function setTemplate(name) {
        document.getElementById("sqlInput").value = templates[name];
        formatSQL();
      }

      function formatSQL() {
        let sql = document.getElementById("sqlInput").value.trim();
        if (!sql) {
          document.getElementById("sqlOutput").innerHTML = "";
          return;
        }

        const keywordCase = document.getElementById("keywordCase").value;
        const indentSize = parseInt(document.getElementById("indentSize").value);
        const newlineClause = document.getElementById("newlineClause").checked;
        const indent = " ".repeat(indentSize);

        // Normalize whitespace
        sql = sql.replace(/\s+/g, " ").trim();

        // Format main clauses
        if (newlineClause) {
          mainClauses.forEach((clause) => {
            const regex = new RegExp(`\\b(${clause})\\b`, "gi");
            sql = sql.replace(regex, "\n$1");
          });

          // Indent after some keywords
          sql = sql.replace(/\bAND\b/gi, "\n" + indent + "AND");
          sql = sql.replace(/\bOR\b/gi, "\n" + indent + "OR");
        }

        // Apply keyword case
        keywords.forEach((kw) => {
          const regex = new RegExp(`\\b(${kw})\\b`, "gi");
          sql = sql.replace(regex, (match) => {
            switch (keywordCase) {
              case "upper":
                return kw.toUpperCase();
              case "lower":
                return kw.toLowerCase();
              case "capitalize":
                return kw.charAt(0).toUpperCase() + kw.slice(1).toLowerCase();
              default:
                return match;
            }
          });
        });

        // Clean up
        sql = sql.replace(/^\n+/, "").replace(/\n{3,}/g, "\n\n");

        // Syntax highlight
        document.getElementById("sqlOutput").innerHTML = highlightSQL(sql);
      }

      function highlightSQL(sql) {
        let result = escapeHtml(sql);

        // Highlight keywords
        keywords.forEach((kw) => {
          const regex = new RegExp(`\\b(${kw})\\b`, "gi");
          result = result.replace(regex, '<span class="keyword">$1</span>');
        });

        // Highlight functions
        functions.forEach((fn) => {
          const regex = new RegExp(`\\b(${fn})\\s*\\(`, "gi");
          result = result.replace(regex, '<span class="function">$1</span>(');
        });

        // Highlight strings
        result = result.replace(/'([^']*)'/g, "<span class=\"string\">'$1'</span>");

        // Highlight numbers
        result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');

        // Highlight comments
        result = result.replace(/--(.*?)(\n|$)/g, '<span class="comment">--$1</span>$2');
        result = result.replace(/\/\*([\s\S]*?)\*\//g, '<span class="comment">/*$1*/</span>');

        return result;
      }

      function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }

      function minifySQL() {
        let sql = document.getElementById("sqlInput").value;
        sql = sql
          .replace(/\s+/g, " ")
          .replace(/\s*([,()])\s*/g, "$1")
          .trim();
        document.getElementById("sqlInput").value = sql;
        formatSQL();
      }

      function copySQL() {
        const output = document.getElementById("sqlOutput").textContent;
        navigator.clipboard.writeText(output);
        alert("已复制到剪贴板!");
      }

      function clearAll() {
        document.getElementById("sqlInput").value = "";
        document.getElementById("sqlOutput").innerHTML = "";
      }

      formatSQL();

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
    
