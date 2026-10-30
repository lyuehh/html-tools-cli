// @ts-nocheck
// Generated from tools/dev/toml-yaml-json.html
// Source SHA-256: 84e195b1eeb5003436008c975a922d33d4b50fff8ae1a7c30a1901fa53104b08
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.TOML = {
        parse(text) {
          return text.split(/\r?\n/).reduce((obj, line) => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith("#")) return obj;
            const match = trimmed.match(/^([A-Za-z0-9_-]+)\s*=\s*(.*)$/);
            if (!match) return obj;
            let value = match[2].trim();
            if (/^".*"$/.test(value)) value = value.slice(1, -1);
            else if (value === "true" || value === "false") value = value === "true";
            else if (!Number.isNaN(Number(value))) value = Number(value);
            obj[match[1]] = value;
            return obj;
          }, {});
        },
        stringify(obj) {
          return Object.entries(obj)
            .map(
              ([key, value]) =>
                key + " = " + (typeof value === "string" ? JSON.stringify(value) : String(value))
            )
            .join("\n");
        }
      };
    
;

      let currentFormat = "json";
      const tabs = document.querySelectorAll(".tab");
      const input = document.getElementById("input");
      const output = document.getElementById("output");

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          tabs.forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");
          currentFormat = tab.dataset.format;
          document.getElementById("inputFormat").textContent = currentFormat.toUpperCase();
          convert();
        });
      });

      input.addEventListener("input", convert);

      function parse(text, format) {
        if (!text.trim()) return null;
        switch (format) {
          case "json":
            return JSON.parse(text);
          case "yaml":
            return jsyaml.load(text);
          case "toml":
            return TOML.parse(text);
        }
      }

      function stringify(obj, format) {
        switch (format) {
          case "json":
            return JSON.stringify(obj, null, 2);
          case "yaml":
            return jsyaml.dump(obj, { indent: 2 });
          case "toml":
            return TOML.stringify(obj);
        }
      }

      function convert() {
        const text = input.value;
        if (!text.trim()) {
          output.innerHTML = '<span style="color:var(--text-muted)">转换结果将显示在这里</span>';
          return;
        }
        try {
          const obj = parse(text, currentFormat);
          const formats = ["json", "yaml", "toml"].filter((f) => f !== currentFormat);
          let result = "";
          formats.forEach((f) => {
            result += `<div style="color:var(--color-accent-cyan);margin-bottom:.5rem">=== ${f.toUpperCase()} ===</div>`;
            result += stringify(obj, f) + "\n\n";
          });
          output.textContent = "";
          output.innerHTML = result;
        } catch (e) {
          output.innerHTML = '<span class="error">解析错误: ' + e.message + "</span>";
        }
      }

      window.clearInput = function () {
        input.value = "";
        convert();
      };

      window.copyOutput = function () {
        navigator.clipboard.writeText(output.textContent);
      };

      // Sample
      input.value =
        '{\n  "name": "example",\n  "version": "1.0.0",\n  "dependencies": {\n    "lodash": "^4.17.21"\n  }\n}';
      convert();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
