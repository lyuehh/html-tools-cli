// @ts-nocheck
// Generated from tools/dev/sql-keywords.html
// Source SHA-256: 03f68ad0478b9293a4c16acaca6cc8dce72830215913b9babf8bc207402165c3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const sqlKeywords = [
        {
          cat: "查询",
          kw: "SELECT",
          syntax: "SELECT column1, column2 FROM table",
          desc: "从表中查询数据"
        },
        { cat: "查询", kw: "FROM", syntax: "SELECT * FROM table_name", desc: "指定查询的表" },
        {
          cat: "查询",
          kw: "WHERE",
          syntax: "SELECT * FROM table WHERE condition",
          desc: "过滤查询结果"
        },
        {
          cat: "查询",
          kw: "ORDER BY",
          syntax: "SELECT * FROM table ORDER BY column ASC/DESC",
          desc: "排序结果"
        },
        {
          cat: "查询",
          kw: "GROUP BY",
          syntax: "SELECT column, COUNT(*) FROM table GROUP BY column",
          desc: "分组统计"
        },
        {
          cat: "查询",
          kw: "HAVING",
          syntax: "SELECT ... GROUP BY column HAVING COUNT(*) > 1",
          desc: "分组后过滤"
        },
        {
          cat: "查询",
          kw: "LIMIT",
          syntax: "SELECT * FROM table LIMIT 10 OFFSET 20",
          desc: "限制返回数量"
        },
        {
          cat: "查询",
          kw: "DISTINCT",
          syntax: "SELECT DISTINCT column FROM table",
          desc: "去除重复值"
        },
        {
          cat: "连接",
          kw: "JOIN",
          syntax: "SELECT * FROM a JOIN b ON a.id = b.a_id",
          desc: "内连接两表"
        },
        {
          cat: "连接",
          kw: "LEFT JOIN",
          syntax: "SELECT * FROM a LEFT JOIN b ON a.id = b.a_id",
          desc: "左外连接"
        },
        {
          cat: "连接",
          kw: "RIGHT JOIN",
          syntax: "SELECT * FROM a RIGHT JOIN b ON a.id = b.a_id",
          desc: "右外连接"
        },
        {
          cat: "连接",
          kw: "UNION",
          syntax: "SELECT col FROM a UNION SELECT col FROM b",
          desc: "合并结果集(去重)"
        },
        {
          cat: "修改",
          kw: "INSERT",
          syntax: "INSERT INTO table (col1, col2) VALUES (val1, val2)",
          desc: "插入数据"
        },
        {
          cat: "修改",
          kw: "UPDATE",
          syntax: "UPDATE table SET column = value WHERE condition",
          desc: "更新数据"
        },
        {
          cat: "修改",
          kw: "DELETE",
          syntax: "DELETE FROM table WHERE condition",
          desc: "删除数据"
        },
        {
          cat: "表",
          kw: "CREATE TABLE",
          syntax: "CREATE TABLE name (id INT PRIMARY KEY, ...)",
          desc: "创建表"
        },
        {
          cat: "表",
          kw: "ALTER TABLE",
          syntax: "ALTER TABLE table ADD column datatype",
          desc: "修改表结构"
        },
        { cat: "表", kw: "DROP TABLE", syntax: "DROP TABLE table_name", desc: "删除表" },
        { cat: "表", kw: "TRUNCATE", syntax: "TRUNCATE TABLE table_name", desc: "清空表数据" },
        { cat: "函数", kw: "COUNT", syntax: "SELECT COUNT(*) FROM table", desc: "计算行数" },
        { cat: "函数", kw: "SUM", syntax: "SELECT SUM(column) FROM table", desc: "求和" },
        { cat: "函数", kw: "AVG", syntax: "SELECT AVG(column) FROM table", desc: "求平均值" },
        {
          cat: "函数",
          kw: "MAX/MIN",
          syntax: "SELECT MAX(column), MIN(column) FROM table",
          desc: "最大/最小值"
        },
        {
          cat: "条件",
          kw: "AND/OR",
          syntax: "WHERE condition1 AND condition2",
          desc: "逻辑运算符"
        },
        { cat: "条件", kw: "IN", syntax: "WHERE column IN ('a', 'b', 'c')", desc: "值在列表中" },
        { cat: "条件", kw: "BETWEEN", syntax: "WHERE column BETWEEN 1 AND 10", desc: "值在范围内" },
        { cat: "条件", kw: "LIKE", syntax: "WHERE column LIKE '%pattern%'", desc: "模糊匹配" },
        { cat: "条件", kw: "IS NULL", syntax: "WHERE column IS NULL", desc: "判断空值" }
      ];
      const categories = [...new Set(sqlKeywords.map((k) => k.cat))];
      let activeCategory = "全部";
      function render(filter = "") {
        const filtered = sqlKeywords.filter(
          (k) =>
            (activeCategory === "全部" || k.cat === activeCategory) &&
            (!filter ||
              k.kw.toLowerCase().includes(filter.toLowerCase()) ||
              k.desc.includes(filter))
        );
        document.getElementById("content").innerHTML =
          filtered
            .map(
              (k) => `
                <div class="sql-item">
                    <div class="sql-keyword">${k.kw}</div>
                    <div class="sql-syntax">${k.syntax}</div>
                    <div class="sql-desc">${k.desc}</div>
                </div>
            `
            )
            .join("") || '<p style="text-align:center;color:#999;padding:20px">未找到匹配结果</p>';
      }
      function renderCategories() {
        document.getElementById("categories").innerHTML = ["全部", ...categories]
          .map(
            (c) =>
              `<button class="cat-btn ${c === activeCategory ? "active" : ""}" onclick="setCategory('${c}')">${c}</button>`
          )
          .join("");
      }
      function setCategory(cat) {
        activeCategory = cat;
        renderCategories();
        render(document.getElementById("search").value);
      }
      document.getElementById("search").addEventListener("input", (e) => render(e.target.value));
      renderCategories();
      render();

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
    
