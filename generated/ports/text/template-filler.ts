// @ts-nocheck
// Generated from tools/text/template-filler.html
// Source SHA-256: 54efe34ca00f427b6d019a38e8264e4f84f71148c4dec9619428ea69aa378044
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const presetTemplates = {
        email: `尊敬的 {{name}}：

您好！感谢您使用我们的服务。

您的订单号：{{orderNo}}
订单金额：¥{{amount}}

如有问题，请联系客服。

祝好！
{{company}}`,
        sql: `INSERT INTO {{table}} ({{columns}}) VALUES ({{values}});

SELECT * FROM {{table}} WHERE {{condition}};

UPDATE {{table}} SET {{field}} = '{{value}}' WHERE id = {{id}};`,
        code: `/**
 * {{description}}
 * @param {{paramType}} {{paramName}} - {{paramDesc}}
 * @returns {{returnType}}
 */
function {{functionName}}({{paramName}}) {
    // TODO: implement
    return {{defaultReturn}};
}`,
        message: "【{{appName}}】您的验证码是 {{code}}，{{minutes}} 分钟内有效，请勿泄露给他人。",
        url: "{{protocol}}://{{domain}}/{{path}}?id={{id}}&token={{token}}&timestamp={{timestamp}}"
      };

      let variables = {};

      function parseVariables(template) {
        const regex = /\{\{(\w+)\}\}/g;
        const vars = new Set();
        let match;
        while ((match = regex.exec(template)) !== null) {
          vars.add(match[1]);
        }
        return [...vars];
      }

      function renderVariables() {
        const template = document.getElementById("templateInput").value;
        const vars = parseVariables(template);
        const container = document.getElementById("variables");

        // Keep existing values
        const oldVars = { ...variables };
        variables = {};

        let html = '<div class="panel-title">变量值</div>';
        vars.forEach((v) => {
          variables[v] = oldVars[v] || "";
          html += `
                    <div class="var-item">
                        <span class="var-name">{{${v}}}</span>
                        <input type="text" data-var="${v}" value="${escapeHtml(variables[v])}" placeholder="输入值...">
                        <button onclick="insertNow('${v}')" title="插入当前时间">⏰</button>
                    </div>
                `;
        });

        if (vars.length === 0) {
          html += '<div class="help-text">模板中未发现变量，请使用 {{变量名}} 格式定义</div>';
        }

        container.innerHTML = html;

        // Add listeners
        container.querySelectorAll("input").forEach((input) => {
          input.addEventListener("input", (e) => {
            variables[e.target.dataset.var] = e.target.value;
            fillTemplate();
          });
        });
      }

      function fillTemplate() {
        let template = document.getElementById("templateInput").value;
        let output = template;

        for (const [key, value] of Object.entries(variables)) {
          output = output.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
        }

        document.getElementById("output").value = output;
      }

      window.insertNow = function (varName) {
        const now = new Date();
        const formatted = now.toLocaleString("zh-CN");
        variables[varName] = formatted;
        document.querySelector(`input[data-var="${varName}"]`).value = formatted;
        fillTemplate();
      };

      window.clearVars = function () {
        for (const key in variables) {
          variables[key] = "";
        }
        renderVariables();
        fillTemplate();
      };

      window.copyOutput = function () {
        navigator.clipboard.writeText(document.getElementById("output").value);
        event.target.textContent = "✓ 已复制";
        setTimeout(() => (event.target.textContent = "📋 复制"), 2000);
      };

      window.downloadOutput = function () {
        const blob = new Blob([document.getElementById("output").value], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "output.txt";
        a.click();
      };

      function parseCSV(csv) {
        const lines = csv.trim().split("\n");
        if (lines.length < 2) return [];

        const headers = lines[0].split(",").map((h) => h.trim());
        const data = [];

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(",").map((v) => v.trim());
          const row = {};
          headers.forEach((h, j) => (row[h] = values[j] || ""));
          data.push(row);
        }

        return data;
      }

      window.batchFill = function () {
        const template = document.getElementById("templateInput").value;
        const csvData = document.getElementById("batchData").value;
        const data = parseCSV(csvData);

        if (data.length === 0) {
          document.getElementById("batchOutput").innerHTML =
            '<div class="help-text">请输入有效的 CSV 数据</div>';
          return;
        }

        const results = data.map((row, i) => {
          let output = template;
          for (const [key, value] of Object.entries(row)) {
            output = output.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
          }
          return output;
        });

        document.getElementById("batchOutput").innerHTML = results
          .map(
            (r, i) => `<div class="batch-item"><strong>#${i + 1}</strong>\n${escapeHtml(r)}</div>`
          )
          .join("");

        window.batchResults = results;
      };

      window.copyBatch = function () {
        if (window.batchResults) {
          navigator.clipboard.writeText(window.batchResults.join("\n\n---\n\n"));
          event.target.textContent = "✓ 已复制";
          setTimeout(() => (event.target.textContent = "📋 复制全部"), 2000);
        }
      };

      window.downloadBatch = function () {
        if (window.batchResults) {
          const blob = new Blob([window.batchResults.join("\n\n---\n\n")], { type: "text/plain" });
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "batch_output.txt";
          a.click();
        }
      };

      window.escapeHtml = function (str) {
        if (!str) return "";
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      };

      // Template presets
      document.querySelectorAll(".template-btn").forEach((btn) => {
        btn.onclick = () => {
          document.getElementById("templateInput").value = presetTemplates[btn.dataset.template];
          renderVariables();
          fillTemplate();
        };
      });

      // Auto parse on template change
      document.getElementById("templateInput").addEventListener("input", () => {
        renderVariables();
        fillTemplate();
      });

      // Theme toggle
      const theme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", theme);
      document.getElementById("themeToggle").textContent = theme === "dark" ? "☀️" : "🌙";
      document.getElementById("themeToggle").onclick = () => {
        const next =
          document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        document.getElementById("themeToggle").textContent = next === "dark" ? "☀️" : "🌙";
      };

      // Initialize
      renderVariables();

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
    
