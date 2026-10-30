// @ts-nocheck
// Generated from tools/dev/env-editor.html
// Source SHA-256: 86f4a75d3402fc3149055bb2eabd077d5c65a96684251258b2fde63b7eb6b7fe
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let envVars = [];

      function parseEnv() {
        const text = document.getElementById("envText").value;
        envVars = [];

        const lines = text.split("\n");
        lines.forEach((line) => {
          line = line.trim();
          if (!line || line.startsWith("#")) return;

          const eqIndex = line.indexOf("=");
          if (eqIndex > 0) {
            const key = line.substring(0, eqIndex).trim();
            let value = line.substring(eqIndex + 1).trim();
            // Remove surrounding quotes
            if (
              (value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))
            ) {
              value = value.slice(1, -1);
            }
            envVars.push({ key, value });
          }
        });

        renderTable();
        updateStats();
      }

      function renderTable() {
        const tbody = document.getElementById("envTableBody");
        tbody.innerHTML = envVars
          .map(
            (v, i) => `
                <tr>
                    <td class="key-col">
                        <input type="text" value="${escapeHtml(v.key)}" onchange="updateVar(${i}, 'key', this.value)" aria-label="文本输入框" placeholder="请输入文本输入框">
                    </td>
                    <td class="value-col">
                        <input type="text" value="${escapeHtml(v.value)}" onchange="updateVar(${i}, 'value', this.value)" aria-label="文本输入框" placeholder="请输入文本输入框">
                    </td>
                    <td class="action-col">
                        <button class="btn btn-danger btn-sm" onclick="removeVar(${i})" aria-label="×">×</button>
                    </td>
                </tr>
            `
          )
          .join("");
      }

      window.escapeHtml = function (text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      window.updateVar = function (index, field, value) {
        envVars[index][field] = value;
        syncToText();
      };

      window.removeVar = function (index) {
        envVars.splice(index, 1);
        renderTable();
        syncToText();
      };

      window.addVar = function () {
        const key = document.getElementById("newKey").value.trim();
        const value = document.getElementById("newValue").value.trim();

        if (!key) {
          alert("请输入变量名");
          return;
        }

        envVars.push({ key, value });
        document.getElementById("newKey").value = "";
        document.getElementById("newValue").value = "";
        renderTable();
        syncToText();
      };

      function syncToText() {
        const text = envVars
          .map((v) => {
            const needsQuote = v.value.includes(" ") || v.value.includes("#");
            const value = needsQuote ? `"${v.value}"` : v.value;
            return `${v.key}=${value}`;
          })
          .join("\n");

        document.getElementById("envText").value = text;
        updateStats();
      }

      window.sortEnv = function () {
        envVars.sort((a, b) => a.key.localeCompare(b.key));
        renderTable();
        syncToText();
      };

      function updateStats() {
        const count = envVars.length;
        document.getElementById("textStats").textContent = `${count} 变量`;
        document.getElementById("tableStats").textContent = `${count} 变量`;
      }

      window.exportEnv = function () {
        const format = document.querySelector('input[name="format"]:checked').value;
        let output = "";

        switch (format) {
          case "env":
            output = envVars.map((v) => `${v.key}=${v.value}`).join("\n");
            break;
          case "json":
            const obj = {};
            envVars.forEach((v) => (obj[v.key] = v.value));
            output = JSON.stringify(obj, null, 2);
            break;
          case "yaml":
            output = envVars.map((v) => `${v.key}: "${v.value}"`).join("\n");
            break;
          case "shell":
            output = envVars.map((v) => `export ${v.key}="${v.value}"`).join("\n");
            break;
          case "docker":
            output = envVars.map((v) => `-e ${v.key}="${v.value}"`).join(" \\\n  ");
            break;
        }

        document.getElementById("exportOutput").value = output;
      };

      window.copyText = function () {
        navigator.clipboard.writeText(document.getElementById("envText").value);
        showToast();
      };

      window.copyExport = function () {
        const output = document.getElementById("exportOutput").value;
        if (!output) {
          alert("请先点击导出");
          return;
        }
        navigator.clipboard.writeText(output);
        showToast();
      };

      window.downloadExport = function () {
        const output = document.getElementById("exportOutput").value;
        if (!output) {
          alert("请先点击导出");
          return;
        }

        const format = document.querySelector('input[name="format"]:checked').value;
        const extensions = {
          env: ".env",
          json: ".json",
          yaml: ".yaml",
          shell: ".sh",
          docker: ".txt"
        };

        const blob = new Blob([output], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "environment" + extensions[format];
        link.click();
      };

      function showToast() {
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Initialize
      parseEnv();

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
