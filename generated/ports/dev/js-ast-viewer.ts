// @ts-nocheck
// Generated from tools/dev/js-ast-viewer.html
// Source SHA-256: 41d06a009ddc9ad1387df97ff83f88137410d7e39f31286d39196e0e1af1e37b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      let currentAST = null;
      let currentView = "tree";

      function parseCode() {
        const code = document.getElementById("codeEditor").value;

        try {
          currentAST = acorn.parse(code, {
            ecmaVersion: 2022,
            sourceType: "module",
            locations: true
          });

          renderAST();
          updateStats();
        } catch (e) {
          document.getElementById("astOutput").innerHTML =
            `<div class="error-message">解析错误: ${escapeHtml(e.message)}</div>`;
          document.getElementById("stats").innerHTML = "<span>解析失败</span>";
        }
      }

      function renderAST() {
        const output = document.getElementById("astOutput");

        if (currentView === "tree") {
          output.innerHTML = renderTreeNode(currentAST, "Program");
        } else {
          output.innerHTML = `<div class="json-view">${syntaxHighlight(JSON.stringify(currentAST, null, 2))}</div>`;
        }
      }

      function renderTreeNode(node, key = "", depth = 0) {
        if (node === null || node === undefined) {
          return '<span class="node-keyword">null</span>';
        }

        if (typeof node !== "object") {
          if (typeof node === "string") {
            return `<span class="node-string">"${escapeHtml(node)}"</span>`;
          }
          if (typeof node === "number") {
            return `<span class="node-number">${node}</span>`;
          }
          if (typeof node === "boolean") {
            return `<span class="node-keyword">${node}</span>`;
          }
          return escapeHtml(String(node));
        }

        if (Array.isArray(node)) {
          if (node.length === 0) return "[]";

          const items = node
            .map(
              (item, i) => `
                    <div class="ast-node">
                        <div class="node-line">
                            <span class="node-key">[${i}]</span>: ${renderTreeNode(item, "", depth + 1)}
                        </div>
                    </div>
                `
            )
            .join("");

          return `[<div class="node-children">${items}</div>]`;
        }

        // Object node
        const type = node.type;
        const id = "node-" + Math.random().toString(36).substr(2, 9);

        const entries = Object.entries(node).filter(
          ([k]) => !["loc", "start", "end", "range"].includes(k)
        );

        if (entries.length === 0) return "{}";

        const content = entries
          .map(([k, v]) => {
            const isType = k === "type";
            return `
                    <div class="ast-node">
                        <div class="node-line">
                            <span class="node-key">${k}</span>: ${isType ? `<span class="node-type">${escapeHtml(v)}</span>` : renderTreeNode(v, k, depth + 1)}
                        </div>
                    </div>
                `;
          })
          .join("");

        const header = type ? `<span class="node-type">${type}</span>` : "{";

        return `
                <span class="node-toggle" onclick="toggleNode('${id}')">▼</span>
                ${header}
                <div class="node-children" id="${id}">
                    ${content}
                </div>
                }
            `;
      }

      window.toggleNode = function (id) {
        const node = document.getElementById(id);
        const toggle = node.previousElementSibling.previousElementSibling;
        node.classList.toggle("collapsed");
        toggle.textContent = node.classList.contains("collapsed") ? "▶" : "▼";
      };

      window.expandAll = function () {
        document.querySelectorAll(".node-children").forEach((n) => n.classList.remove("collapsed"));
        document.querySelectorAll(".node-toggle").forEach((t) => (t.textContent = "▼"));
      };

      window.collapseAll = function () {
        document.querySelectorAll(".node-children").forEach((n) => n.classList.add("collapsed"));
        document.querySelectorAll(".node-toggle").forEach((t) => (t.textContent = "▶"));
      };

      window.setView = function (view) {
        currentView = view;
        document.querySelectorAll(".view-btn").forEach((b) => b.classList.remove("active"));
        event.target.classList.add("active");
        if (currentAST) renderAST();
      };

      function updateStats() {
        let nodeCount = 0;
        let maxDepth = 0;

        function traverse(node, depth) {
          if (!node || typeof node !== "object") return;

          if (node.type) {
            nodeCount++;
            maxDepth = Math.max(maxDepth, depth);
          }

          for (const key of Object.keys(node)) {
            if (Array.isArray(node[key])) {
              node[key].forEach((child) => traverse(child, depth + 1));
            } else if (typeof node[key] === "object") {
              traverse(node[key], depth + 1);
            }
          }
        }

        traverse(currentAST, 0);
        document.getElementById("stats").innerHTML = `
                <span>节点数: ${nodeCount}</span>
                <span>最大深度: ${maxDepth}</span>
            `;
      }

      function syntaxHighlight(json) {
        return json.replace(
          /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
          (match) => {
            let cls = "node-number";
            if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                cls = "node-key";
              } else {
                cls = "node-string";
              }
            } else if (/true|false/.test(match)) {
              cls = "node-keyword";
            } else if (/null/.test(match)) {
              cls = "node-keyword";
            }
            return `<span class="${cls}">${match}</span>`;
          }
        );
      }

      window.escapeHtml = function (str) {
        return String(str).replace(
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

      window.copyAST = function () {
        if (!currentAST) return;
        navigator.clipboard.writeText(JSON.stringify(currentAST, null, 2));
        alert("AST已复制到剪贴板");
      };

      window.clearCode = function () {
        document.getElementById("codeEditor").value = "";
        document.getElementById("astOutput").innerHTML =
          '<span style="color: var(--color-text-secondary);">点击"解析 AST"按钮查看语法树</span>';
        document.getElementById("stats").innerHTML = "<span>节点数: -</span><span>深度: -</span>";
        currentAST = null;
      };

      window.loadExample = function (type) {
        const examples = {
          function: `function add(a, b) {
  return a + b;
}

const result = add(1, 2);`,
          class: `class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(\`\${this.name} makes a sound.\`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(\`\${this.name} barks.\`);
  }
}`,
          arrow: `const add = (a, b) => a + b;

const multiply = (a, b) => {
  const result = a * b;
  return result;
};

const numbers = [1, 2, 3].map(n => n * 2);`,
          async: `async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}`,
          destructure: `const { name, age, address: { city } } = person;

const [first, second, ...rest] = numbers;

function greet({ name = 'Guest', greeting = 'Hello' }) {
  return \`\${greeting}, \${name}!\`;
}`,
          spread: `const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };

function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}`
        };

        document.getElementById("codeEditor").value = examples[type] || "";
        parseCode();
      };

      // Auto-parse on load
      parseCode();

      // Keyboard shortcut
      document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          parseCode();
        }
      });
    
