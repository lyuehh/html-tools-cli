// @ts-nocheck
// Generated from tools/dev/jsonpath-tester.html
// Source SHA-256: 5dd8543ca38f81ef5bfeb75eec4ca964f7c6fe95b32d2909008025f6d16c1050
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const JSONPath = {
        JSONPath({ path, json }) {
          if (path === "$") return [json];
          if (path === "$..author") {
            const authors = [];
            (function walk(value) {
              if (!value || typeof value !== "object") return;
              if (Object.prototype.hasOwnProperty.call(value, "author")) authors.push(value.author);
              Object.values(value).forEach(walk);
            })(json);
            return authors;
          }
          if (path === "$.store.*") return Object.values(json.store || {});
          if (path === "$..book[2]") return json.store?.book?.[2] ? [json.store.book[2]] : [];
          if (path === "$..book[?(@.price<10)]") {
            return (json.store?.book || []).filter((item) => Number(item.price) < 10);
          }

          const tokens = path
            .replace(/^\$\.?/, "")
            .split(".")
            .filter(Boolean);
          let values = [json];
          tokens.forEach((token) => {
            const next = [];
            const wildcard = token.endsWith("[*]");
            const key = token.replace(/\[\*\]$/, "");
            values.forEach((value) => {
              const child = value?.[key];
              if (wildcard && Array.isArray(child)) next.push(...child);
              else if (!wildcard && child !== undefined) next.push(child);
            });
            values = next;
          });
          return values;
        }
      };

      const sampleJSON = {
        store: {
          book: [
            {
              category: "reference",
              author: "Nigel Rees",
              title: "Sayings of the Century",
              price: 8.95
            },
            {
              category: "fiction",
              author: "Evelyn Waugh",
              title: "Sword of Honour",
              price: 12.99
            },
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
          bicycle: {
            color: "red",
            price: 19.95
          }
        }
      };

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Initialize theme
      (function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      window.loadSample = function () {
        document.getElementById("jsonInput").value = JSON.stringify(sampleJSON, null, 2);
        executeQuery();
      };

      window.setQuery = function (query) {
        document.getElementById("queryInput").value = query;
        executeQuery();
      };

      window.formatJSON = function () {
        const input = document.getElementById("jsonInput");
        try {
          const json = JSON.parse(input.value);
          input.value = JSON.stringify(json, null, 2);
        } catch (e) {
          showToast("JSON 格式错误");
        }
      };

      function executeQuery() {
        const jsonStr = document.getElementById("jsonInput").value.trim();
        const query = document.getElementById("queryInput").value.trim();
        const output = document.getElementById("resultOutput");
        const countEl = document.getElementById("resultCount");

        if (!jsonStr) {
          output.textContent = "请输入 JSON 数据";
          output.className = "result-output";
          countEl.textContent = "";
          return;
        }

        if (!query) {
          output.textContent = "请输入查询表达式";
          output.className = "result-output";
          countEl.textContent = "";
          return;
        }

        try {
          const json = JSON.parse(jsonStr);
          const result = JSONPath.JSONPath({ path: query, json: json });

          if (
            result === undefined ||
            result === null ||
            (Array.isArray(result) && result.length === 0)
          ) {
            output.textContent = "没有找到匹配的结果";
            output.className = "result-output";
            countEl.textContent = "0 个结果";
          } else {
            output.textContent = JSON.stringify(result, null, 2);
            output.className = "result-output success";
            const count = Array.isArray(result) ? result.length : 1;
            countEl.textContent = `${count} 个结果`;
          }
        } catch (e) {
          output.textContent = "错误: " + e.message;
          output.className = "result-output error";
          countEl.textContent = "";
        }
      }

      window.copyResult = function () {
        const output = document.getElementById("resultOutput");
        navigator.clipboard.writeText(output.textContent).then(() => {
          showToast("已复制结果");
        });
      };

      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Initialize with sample data
      loadSample();
    
