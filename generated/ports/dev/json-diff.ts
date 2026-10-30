// @ts-nocheck
// Generated from tools/dev/json-diff.html
// Source SHA-256: 2eae5fdc76bf2aa1d525e2fd8709378f81c104ab466aeca300386cd90b27c8ad
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme
      function initTheme() {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      }
      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };
      initTheme();

      const leftJson = document.getElementById("leftJson");
      const rightJson = document.getElementById("rightJson");
      const diffContainer = document.getElementById("diffContainer");
      const statsContainer = document.getElementById("stats");

      window.parseJson = function (str) {
        try {
          return { success: true, data: JSON.parse(str) };
        } catch (e) {
          return { success: false, error: e.message };
        }
      };

      window.formatJson = function (side) {
        const textarea = side === "left" ? leftJson : rightJson;
        const result = parseJson(textarea.value);
        if (result.success) {
          textarea.value = JSON.stringify(result.data, null, 2);
        } else {
          alert("JSON 格式错误: " + result.error);
        }
      };

      window.formatBoth = function () {
        formatJson("left");
        formatJson("right");
      };

      window.pasteJson = async function (side) {
        try {
          const text = await navigator.clipboard.readText();
          const textarea = side === "left" ? leftJson : rightJson;
          textarea.value = text;
        } catch (e) {
          alert("无法访问剪贴板");
        }
      };

      window.swapInputs = function () {
        const temp = leftJson.value;
        leftJson.value = rightJson.value;
        rightJson.value = temp;
      };

      function deepCompare(obj1, obj2, path = "") {
        const diffs = [];

        const keys1 = obj1 ? Object.keys(obj1) : [];
        const keys2 = obj2 ? Object.keys(obj2) : [];
        const allKeys = [...new Set([...keys1, ...keys2])];

        for (const key of allKeys) {
          const currentPath = path ? `${path}.${key}` : key;
          const val1 = obj1 ? obj1[key] : undefined;
          const val2 = obj2 ? obj2[key] : undefined;
          const has1 = obj1 && key in obj1;
          const has2 = obj2 && key in obj2;

          if (!has1 && has2) {
            // Added in B
            diffs.push({
              type: "added",
              path: currentPath,
              value: val2
            });
          } else if (has1 && !has2) {
            // Removed from B
            diffs.push({
              type: "removed",
              path: currentPath,
              value: val1
            });
          } else if (has1 && has2) {
            const type1 = typeof val1;
            const type2 = typeof val2;
            const isObj1 = val1 !== null && type1 === "object" && !Array.isArray(val1);
            const isObj2 = val2 !== null && type2 === "object" && !Array.isArray(val2);
            const isArr1 = Array.isArray(val1);
            const isArr2 = Array.isArray(val2);

            if (isObj1 && isObj2) {
              // Both are objects, recurse
              diffs.push(...deepCompare(val1, val2, currentPath));
            } else if (isArr1 && isArr2) {
              // Both are arrays
              if (JSON.stringify(val1) !== JSON.stringify(val2)) {
                diffs.push({
                  type: "changed",
                  path: currentPath,
                  oldValue: val1,
                  newValue: val2
                });
              }
            } else if (val1 !== val2) {
              // Different values or types
              diffs.push({
                type: "changed",
                path: currentPath,
                oldValue: val1,
                newValue: val2
              });
            }
          }
        }

        return diffs;
      }

      function formatValue(val) {
        if (val === undefined) return "undefined";
        if (val === null) return "null";
        if (typeof val === "string") return `"${val}"`;
        if (typeof val === "object") return JSON.stringify(val);
        return String(val);
      }

      window.compare = function () {
        const result1 = parseJson(leftJson.value);
        const result2 = parseJson(rightJson.value);

        if (!result1.success) {
          diffContainer.innerHTML = `<div class="error-msg">❌ 左侧 JSON 格式错误: ${result1.error}</div>`;
          statsContainer.innerHTML = "";
          return;
        }
        if (!result2.success) {
          diffContainer.innerHTML = `<div class="error-msg">❌ 右侧 JSON 格式错误: ${result2.error}</div>`;
          statsContainer.innerHTML = "";
          return;
        }

        const diffs = deepCompare(result1.data, result2.data);

        if (diffs.length === 0) {
          diffContainer.innerHTML = '<div class="no-diff">✅ 两个 JSON 完全相同</div>';
          statsContainer.innerHTML = "";
          return;
        }

        // Stats
        const added = diffs.filter((d) => d.type === "added").length;
        const removed = diffs.filter((d) => d.type === "removed").length;
        const changed = diffs.filter((d) => d.type === "changed").length;

        statsContainer.innerHTML = `
                <span class="stat added">+${added} 新增</span>
                <span class="stat removed">-${removed} 删除</span>
                <span class="stat changed">~${changed} 修改</span>
            `;

        // Render diffs
        let html = '<div class="diff-tree">';
        for (const diff of diffs) {
          if (diff.type === "added") {
            html += `<div class="diff-item added">
                        <span class="diff-key">+ ${diff.path}</span>
                        <span class="diff-value">: ${formatValue(diff.value)}</span>
                    </div>`;
          } else if (diff.type === "removed") {
            html += `<div class="diff-item removed">
                        <span class="diff-key">- ${diff.path}</span>
                        <span class="diff-value">: ${formatValue(diff.value)}</span>
                    </div>`;
          } else if (diff.type === "changed") {
            html += `<div class="diff-item changed">
                        <span class="diff-key">~ ${diff.path}</span>
                        <span class="diff-value">: ${formatValue(diff.oldValue)}</span>
                        <span class="diff-arrow">→</span>
                        <span class="diff-value">${formatValue(diff.newValue)}</span>
                    </div>`;
          }
        }
        html += "</div>";
        diffContainer.innerHTML = html;
      };

      window.loadExample = function () {
        leftJson.value = JSON.stringify(
          {
            name: "张三",
            age: 25,
            email: "zhangsan@example.com",
            address: {
              city: "北京",
              street: "长安街"
            },
            hobbies: ["读书", "游泳"],
            active: true
          },
          null,
          2
        );

        rightJson.value = JSON.stringify(
          {
            name: "张三",
            age: 26,
            phone: "13800138000",
            address: {
              city: "上海",
              street: "南京路",
              zip: "200000"
            },
            hobbies: ["读书", "跑步", "游泳"],
            active: false
          },
          null,
          2
        );

        compare();
      };

      window.clearAll = function () {
        leftJson.value = "";
        rightJson.value = "";
        diffContainer.innerHTML =
          '<div class="no-diff">输入两个 JSON 并点击"比较差异"查看结果</div>';
        statsContainer.innerHTML = "";
      };

      // Auto compare on input
      let debounceTimer;
      function autoCompare() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          if (leftJson.value.trim() && rightJson.value.trim()) {
            compare();
          }
        }, 500);
      }

      leftJson.addEventListener("input", autoCompare);
      rightJson.addEventListener("input", autoCompare);
    
