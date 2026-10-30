// @ts-nocheck
// Generated from tools/extractor/json-path-extractor.html
// Source SHA-256: c7f95ad8b02b66429a0493b7317e35b76f062e039e74272571502ea69cdf545a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const jsonInput = document.getElementById("jsonInput");
      const pathInput = document.getElementById("pathInput");
      const resultOutput = document.getElementById("resultOutput");
      const resultCount = document.getElementById("resultCount");
      const errorMsg = document.getElementById("errorMsg");

      // JSONPath 简易实现
      function jsonPath(obj, path) {
        if (!path || path === "$") return [obj];

        const results = [];
        const normalized = path.replace(/\[(\d+)\]/g, ".$1").replace(/^\$\.?/, "");

        function traverse(current, pathParts, idx) {
          if (idx >= pathParts.length) {
            results.push(current);
            return;
          }

          const part = pathParts[idx];

          if (part === "*") {
            if (Array.isArray(current)) {
              current.forEach((item) => traverse(item, pathParts, idx + 1));
            } else if (typeof current === "object" && current !== null) {
              Object.values(current).forEach((val) => traverse(val, pathParts, idx + 1));
            }
          } else if (part === "..") {
            // 递归下降
            traverse(current, pathParts, idx + 1);
            if (typeof current === "object" && current !== null) {
              Object.values(current).forEach((val) => {
                if (typeof val === "object") traverse(val, pathParts, idx);
              });
            }
          } else if (part.startsWith("?(@.")) {
            // 简单过滤器支持
            const match = part.match(/\?\(@\.(\w+)(>|<|=)(\d+)\)/);
            if (match && Array.isArray(current)) {
              const [, prop, op, val] = match;
              current.forEach((item) => {
                if (item && typeof item === "object") {
                  const itemVal = item[prop];
                  let pass = false;
                  if (op === ">" && itemVal > Number(val)) pass = true;
                  if (op === "<" && itemVal < Number(val)) pass = true;
                  if (op === "=" && itemVal === Number(val)) pass = true;
                  if (pass) traverse(item, pathParts, idx + 1);
                }
              });
            }
          } else if (current && typeof current === "object") {
            const key = part.replace(/[[\]]/g, "");
            if (key in current || (Array.isArray(current) && !isNaN(key))) {
              traverse(current[key], pathParts, idx + 1);
            }
          }
        }

        // 处理 .. 递归
        const parts = normalized.split(/\.(?![^[]*\])/).filter(Boolean);
        traverse(obj, parts, 0);

        return results;
      }

      function extract() {
        const jsonStr = jsonInput.value.trim();
        const path = pathInput.value.trim();

        errorMsg.style.display = "none";

        if (!jsonStr) {
          resultOutput.value = "";
          resultCount.innerHTML = "";
          return;
        }

        try {
          const data = JSON.parse(jsonStr);
          const results = jsonPath(data, path || "$");

          resultCount.innerHTML = `找到 <span>${results.length}</span> 个结果`;

          if (results.length === 1) {
            resultOutput.value = JSON.stringify(results[0], null, 2);
          } else {
            resultOutput.value = JSON.stringify(results, null, 2);
          }
        } catch (e) {
          errorMsg.textContent = "错误: " + e.message;
          errorMsg.style.display = "block";
          resultOutput.value = "";
          resultCount.innerHTML = "";
        }
      }

      function usePath(path) {
        pathInput.value = path;
        extract();
      }

      function formatJson() {
        try {
          const data = JSON.parse(jsonInput.value);
          jsonInput.value = JSON.stringify(data, null, 2);
        } catch (e) {
          errorMsg.textContent = "JSON 格式错误: " + e.message;
          errorMsg.style.display = "block";
        }
      }

      function loadSample() {
        jsonInput.value = JSON.stringify(
          {
            users: [
              { name: "张三", age: 25, city: "北京" },
              { name: "李四", age: 30, city: "上海" },
              { name: "王五", age: 18, city: "广州" }
            ],
            total: 3,
            meta: { version: "1.0" }
          },
          null,
          2
        );
        pathInput.value = "$.users[*].name";
        extract();
      }

      function copyResult() {
        resultOutput.select();
        document.execCommand("copy");
      }

      // 初始化
      loadSample();

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
    
