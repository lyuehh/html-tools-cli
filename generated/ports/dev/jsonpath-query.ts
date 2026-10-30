// @ts-nocheck
// Generated from tools/dev/jsonpath-query.html
// Source SHA-256: 29553656dd64870e2e5cc205325f34fab3b9d6c3f9c4decb3d76a543c9c3edf7
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const queryInputEl = document.getElementById("queryInput");
      const statusEl = document.getElementById("status");
      const matchCountEl = document.getElementById("matchCount");

      const LS_KEY = "jsonpath_query_v1";

      const sampleData = {
        store: {
          book: [
            {
              category: "reference",
              author: "Nigel Rees",
              title: "Sayings of the Century",
              price: 8.95
            },
            { category: "fiction", author: "Evelyn Waugh", title: "Sword of Honour", price: 12.99 },
            {
              category: "fiction",
              author: "Herman Melville",
              title: "Moby Dick",
              isbn: "0-553-21311-3",
              price: 8.99
            },
            {
              category: "fiction",
              author: "J. R. R. Tolkien",
              title: "The Lord of the Rings",
              isbn: "0-395-19395-8",
              price: 22.99
            }
          ],
          bicycle: { color: "red", price: 19.95 }
        },
        expensive: 10
      };

      // Simple JSONPath implementation
      function jsonPath(obj, expr) {
        const results = [];

        if (expr === "$") return [obj];

        // Normalize expression
        expr = expr.replace(/\[(\d+)\]/g, ".$1");
        expr = expr.replace(/\['([^']+)'\]/g, ".$1");
        expr = expr.replace(/\["([^"]+)"\]/g, ".$1");

        const parts = expr.split(".");

        function traverse(current, pathParts, depth) {
          if (depth >= pathParts.length) {
            results.push(current);
            return;
          }

          const part = pathParts[depth];

          if (part === "$") {
            traverse(current, pathParts, depth + 1);
          } else if (part === "") {
            // Handle recursive descent (..)
            traverse(current, pathParts, depth + 1);
            if (typeof current === "object" && current !== null) {
              for (const key in current) {
                traverse(current[key], pathParts, depth);
              }
            }
          } else if (part === "*") {
            if (Array.isArray(current)) {
              current.forEach((item) => traverse(item, pathParts, depth + 1));
            } else if (typeof current === "object" && current !== null) {
              Object.values(current).forEach((val) => traverse(val, pathParts, depth + 1));
            }
          } else if (part.includes(":")) {
            // Slice notation
            if (Array.isArray(current)) {
              const [start, end] = part.split(":").map((n) => (n === "" ? undefined : parseInt(n)));
              const sliced = current.slice(start, end);
              sliced.forEach((item) => traverse(item, pathParts, depth + 1));
            }
          } else if (/^-?\d+$/.test(part)) {
            // Array index
            const idx = parseInt(part);
            if (Array.isArray(current)) {
              const actualIdx = idx < 0 ? current.length + idx : idx;
              if (current[actualIdx] !== undefined) {
                traverse(current[actualIdx], pathParts, depth + 1);
              }
            }
          } else {
            // Property access
            if (current && typeof current === "object" && part in current) {
              traverse(current[part], pathParts, depth + 1);
            }
          }
        }

        traverse(obj, parts, 0);
        return results;
      }

      function query() {
        const text = inputEl.value.trim();
        const queryExpr = queryInputEl.value.trim();

        if (!text) {
          showStatus("请输入 JSON 数据", "error");
          return;
        }

        if (!queryExpr) {
          showStatus("请输入查询表达式", "error");
          return;
        }

        try {
          const obj = JSON.parse(text);
          const results = jsonPath(obj, queryExpr);

          if (results.length === 0) {
            outputEl.value = "无匹配结果";
            matchCountEl.textContent = "0 个匹配";
            showStatus("查询完成", "success");
          } else if (results.length === 1) {
            outputEl.value = JSON.stringify(results[0], null, 2);
            matchCountEl.textContent = "1 个匹配";
            showStatus("查询完成", "success");
          } else {
            outputEl.value = JSON.stringify(results, null, 2);
            matchCountEl.textContent = results.length + " 个匹配";
            showStatus("查询完成", "success");
          }

          inputEl.classList.remove("error");
        } catch (e) {
          inputEl.classList.add("error");
          showStatus("JSON 解析失败: " + e.message, "error");
          matchCountEl.textContent = "";
        }
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function saveToStorage() {
        localStorage.setItem(
          LS_KEY,
          JSON.stringify({
            input: inputEl.value,
            query: queryInputEl.value
          })
        );
      }

      function loadFromStorage() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const data = JSON.parse(saved);
            inputEl.value = data.input || "";
            queryInputEl.value = data.query || "$";
          }
        } catch (e) {}
      }

      document.getElementById("btnQuery").onclick = query;

      document.getElementById("btnPaste").onclick = async function () {
        try {
          const text = await navigator.clipboard.readText();
          inputEl.value = text;
          saveToStorage();
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnFormat").onclick = function () {
        try {
          const obj = JSON.parse(inputEl.value);
          inputEl.value = JSON.stringify(obj, null, 2);
          inputEl.classList.remove("error");
          saveToStorage();
          showStatus("格式化完成", "success");
        } catch (e) {
          inputEl.classList.add("error");
          showStatus("JSON 格式错误", "error");
        }
      };

      document.getElementById("btnSample").onclick = function () {
        inputEl.value = JSON.stringify(sampleData, null, 2);
        saveToStorage();
        showStatus("已加载示例数据", "success");
      };

      document.getElementById("btnCopy").onclick = async function () {
        if (!outputEl.value) {
          showStatus("没有结果", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(outputEl.value);
          showStatus("已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        inputEl.value = "";
        outputEl.value = "";
        queryInputEl.value = "$";
        inputEl.classList.remove("error");
        statusEl.textContent = "";
        statusEl.className = "status";
        matchCountEl.textContent = "";
        localStorage.removeItem(LS_KEY);
      };

      document.querySelectorAll(".example-btn").forEach((btn) => {
        btn.onclick = function () {
          queryInputEl.value = this.dataset.query;
          saveToStorage();
          if (inputEl.value.trim()) query();
        };
      });

      inputEl.addEventListener("input", saveToStorage);
      queryInputEl.addEventListener("input", saveToStorage);

      queryInputEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          query();
        }
      });

      loadFromStorage();

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
    
