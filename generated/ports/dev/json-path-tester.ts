// @ts-nocheck
// Generated from tools/dev/json-path-tester.html
// Source SHA-256: 8a402e4e344e8ce00a5d001a07a6f8267a0a06b1a15687e9fa511dd1dd359b8f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Simple JSONPath implementation
      function jsonPath(obj, path) {
        if (!path || path === "$") return [obj];

        const results = [];

        function traverse(current, pathParts, index) {
          if (index >= pathParts.length) {
            results.push(current);
            return;
          }

          const part = pathParts[index];

          if (part === "*") {
            if (Array.isArray(current)) {
              current.forEach((item) => traverse(item, pathParts, index + 1));
            } else if (typeof current === "object" && current !== null) {
              Object.values(current).forEach((val) => traverse(val, pathParts, index + 1));
            }
          } else if (part === "..") {
            // Recursive descent
            const nextPart = pathParts[index + 1];
            function recurse(node) {
              if (typeof node !== "object" || node === null) return;

              if (Array.isArray(node)) {
                node.forEach(recurse);
              } else {
                Object.keys(node).forEach((key) => {
                  if (key === nextPart) {
                    traverse(node[key], pathParts, index + 2);
                  }
                  recurse(node[key]);
                });
              }
            }
            if (typeof current === "object" && current !== null && nextPart in current) {
              traverse(current[nextPart], pathParts, index + 2);
            }
            recurse(current);
          } else if (part.includes("[")) {
            const key = part.replace(/\[.*\]$/, "");
            const bracketContent = part.match(/\[(.*)\]$/)?.[1];

            let target = key ? current[key] : current;

            if (bracketContent === "*") {
              if (Array.isArray(target)) {
                target.forEach((item) => traverse(item, pathParts, index + 1));
              }
            } else if (bracketContent.includes(":")) {
              const [start, end] = bracketContent
                .split(":")
                .map((n) => (n ? parseInt(n) : undefined));
              if (Array.isArray(target)) {
                const slice = target.slice(start, end);
                slice.forEach((item) => traverse(item, pathParts, index + 1));
              }
            } else if (bracketContent.includes(",")) {
              const indices = bracketContent.split(",").map((n) => parseInt(n.trim()));
              if (Array.isArray(target)) {
                indices.forEach((i) => {
                  if (target[i] !== undefined) traverse(target[i], pathParts, index + 1);
                });
              }
            } else {
              let idx = parseInt(bracketContent);
              if (Array.isArray(target)) {
                if (idx < 0) idx = target.length + idx;
                if (target[idx] !== undefined) traverse(target[idx], pathParts, index + 1);
              }
            }
          } else if (current && typeof current === "object" && part in current) {
            traverse(current[part], pathParts, index + 1);
          }
        }

        // Parse path
        let pathStr = path.replace(/^\$\.?/, "");
        const parts = [];
        let current = "";
        let inBracket = false;

        for (let i = 0; i < pathStr.length; i++) {
          const char = pathStr[i];
          if (char === "[") {
            if (current) parts.push(current);
            current = "[";
            inBracket = true;
          } else if (char === "]") {
            current += "]";
            parts.push(current);
            current = "";
            inBracket = false;
          } else if (char === "." && !inBracket) {
            if (current) parts.push(current);
            current = "";
            if (pathStr[i + 1] === ".") {
              parts.push("..");
              i++;
            }
          } else {
            current += char;
          }
        }
        if (current) parts.push(current);

        traverse(obj, parts, 0);
        return results;
      }

      function setPath(path) {
        document.getElementById("pathInput").value = path;
        queryPath();
      }

      function queryPath() {
        const jsonStr = document.getElementById("jsonInput").value;
        const path = document.getElementById("pathInput").value;

        document.getElementById("jsonError").textContent = "";
        document.getElementById("matchCount").textContent = "";

        try {
          const json = JSON.parse(jsonStr);
          const results = jsonPath(json, path);

          document.getElementById("resultOutput").value = JSON.stringify(results, null, 2);
          document.getElementById("matchCount").textContent = `找到 ${results.length} 个匹配`;
        } catch (e) {
          if (e instanceof SyntaxError) {
            document.getElementById("jsonError").textContent = "JSON 格式错误: " + e.message;
          } else {
            document.getElementById("resultOutput").value = "查询错误: " + e.message;
          }
        }
      }

      queryPath();

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
