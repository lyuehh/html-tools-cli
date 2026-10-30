// @ts-nocheck
// Generated from tools/dev/yaml-formatter.html
// Source SHA-256: 62b593bdaa78e1aa24a68d79471282b6d0dd4801fbbaa22f5082519820b3e69d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function showStatus(message, isValid) {
        const el = document.getElementById("status");
        el.textContent = message;
        el.className = "status " + (isValid ? "valid" : "invalid");
        el.style.display = "block";
      }

      function validate() {
        const input = document.getElementById("input").value.trim();
        if (!input) {
          document.getElementById("status").style.display = "none";
          return null;
        }

        try {
          const result = jsyaml.load(input);
          showStatus("✓ YAML 格式正确", true);
          return result;
        } catch (e) {
          showStatus("✗ YAML 格式错误: " + e.message, false);
          return null;
        }
      }

      function formatYaml() {
        const obj = validate();
        if (obj !== null) {
          document.getElementById("output").value = jsyaml.dump(obj, {
            indent: 2,
            lineWidth: -1,
            noRefs: true
          });
        }
      }

      function yamlToJson() {
        const obj = validate();
        if (obj !== null) {
          document.getElementById("output").value = JSON.stringify(obj, null, 2);
          showStatus("✓ 已转换为 JSON", true);
        }
      }

      function jsonToYaml() {
        const input = document.getElementById("input").value.trim();
        try {
          const obj = JSON.parse(input);
          document.getElementById("output").value = jsyaml.dump(obj, {
            indent: 2,
            lineWidth: -1,
            noRefs: true
          });
          showStatus("✓ 已转换为 YAML", true);
        } catch (e) {
          showStatus("✗ JSON 格式错误: " + e.message, false);
        }
      }

      function minifyYaml() {
        const obj = validate();
        if (obj !== null) {
          document.getElementById("output").value = jsyaml.dump(obj, {
            flowLevel: 0,
            noRefs: true
          });
          showStatus("✓ 已压缩 YAML", true);
        }
      }

      function loadSample() {
        document.getElementById("input").value = `# 服务器配置示例
server:
  host: localhost
  port: 8080
  ssl:
    enabled: true
    cert: /path/to/cert.pem
    key: /path/to/key.pem

database:
  type: postgresql
  host: db.example.com
  port: 5432
  name: myapp
  credentials:
    username: admin
    password: secret123

logging:
  level: info
  format: json
  outputs:
    - type: file
      path: /var/log/app.log
    - type: console

features:
  - name: authentication
    enabled: true
  - name: caching
    enabled: true
    ttl: 3600
  - name: rate-limiting
    enabled: false`;
        validate();
      }

      function copyInput() {
        navigator.clipboard.writeText(document.getElementById("input").value);
      }

      function copyOutput() {
        navigator.clipboard.writeText(document.getElementById("output").value);
      }

      function clearAll() {
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
        document.getElementById("status").style.display = "none";
      }

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
    
