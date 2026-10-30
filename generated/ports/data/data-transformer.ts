// @ts-nocheck
// Generated from tools/data/data-transformer.html
// Source SHA-256: f8bd1a2866afe305ac41161f24c5de744c33e43c9b43ebc747160fe72ce8e02e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "data-transformer-state";
      let currentType = "prefix-suffix";

      // Elements
      const inputEl = document.getElementById("input");
      const resultEl = document.getElementById("result");

      // Transform type selection
      document.querySelectorAll(".type-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          document.querySelectorAll(".type-btn").forEach((b) => b.classList.remove("active"));
          this.classList.add("active");
          currentType = this.dataset.type;

          // Show/hide options
          document.querySelectorAll(".transform-options").forEach((opt) => {
            opt.classList.add("hidden");
          });
          document.getElementById("opt-" + currentType).classList.remove("hidden");
          saveState();
        });
      });

      // Parse lines
      function parseLines(text) {
        return text
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l !== "");
      }

      // Transform functions
      function transformPrefixSuffix(lines) {
        const prefix = document.getElementById("prefix").value;
        const suffix = document.getElementById("suffix").value;
        return lines.map((line) => prefix + line + suffix);
      }

      function transformWrap(lines) {
        const left = document.getElementById("wrapLeft").value;
        const right = document.getElementById("wrapRight").value;
        const sep = document.getElementById("wrapSeparator").value;
        const wrapped = lines.map((line) => left + line + right);
        return [wrapped.join(sep)];
      }

      function transformTemplate(lines) {
        const template = document.getElementById("template").value;
        if (!template) return lines;
        return lines.map((line, i) =>
          template
            .replace(/{value}/g, line)
            .replace(/{index}/g, i + 1)
            .replace(/{index0}/g, i)
        );
      }

      function transformNumber(lines) {
        const format = document.getElementById("numberFormat").value;
        const nonNumAction = document.getElementById("nonNumberAction").value;

        return lines
          .map((line) => {
            const num = parseFloat(line);
            if (isNaN(num)) {
              if (nonNumAction === "skip") return null;
              if (nonNumAction === "zero") return "0";
              return line;
            }

            switch (format) {
              case "thousands":
                return num.toLocaleString("en-US");
              case "fixed2":
                return num.toFixed(2);
              case "fixed4":
                return num.toFixed(4);
              case "percent":
                return (num * 100).toFixed(2) + "%";
              case "scientific":
                return num.toExponential(2);
              case "currency-cny":
                return "¥" + num.toLocaleString("zh-CN", { minimumFractionDigits: 2 });
              case "currency-usd":
                return "$" + num.toLocaleString("en-US", { minimumFractionDigits: 2 });
              default:
                return line;
            }
          })
          .filter((l) => l !== null);
      }

      function transformCase(lines) {
        const caseType = document.getElementById("caseType").value;

        return lines.map((line) => {
          switch (caseType) {
            case "upper":
              return line.toUpperCase();
            case "lower":
              return line.toLowerCase();
            case "capitalize":
              return line.replace(/\b\w/g, (c) => c.toUpperCase());
            case "sentence":
              return line.charAt(0).toUpperCase() + line.slice(1).toLowerCase();
            case "camel":
              return line.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
            case "pascal":
              return line
                .toLowerCase()
                .replace(/(?:^|[^a-zA-Z0-9]+)(.)/g, (_, c) => c.toUpperCase());
            case "snake":
              return line
                .replace(/\s+/g, "_")
                .replace(/([a-z])([A-Z])/g, "$1_$2")
                .toLowerCase();
            case "kebab":
              return line
                .replace(/\s+/g, "-")
                .replace(/([a-z])([A-Z])/g, "$1-$2")
                .toLowerCase();
            default:
              return line;
          }
        });
      }

      function transformReplace(lines) {
        const find = document.getElementById("replaceFind").value;
        const replaceWith = document.getElementById("replaceWith").value;
        const useRegex = document.getElementById("replaceRegex").checked;

        if (!find) return lines;

        return lines.map((line) => {
          if (useRegex) {
            try {
              const regex = new RegExp(find, "g");
              return line.replace(regex, replaceWith);
            } catch {
              return line;
            }
          }
          return line.split(find).join(replaceWith);
        });
      }

      // Main transform function
      function transformData() {
        const lines = parseLines(inputEl.value);
        if (lines.length === 0) {
          showToast("请输入数据");
          return;
        }

        let result;
        switch (currentType) {
          case "prefix-suffix":
            result = transformPrefixSuffix(lines);
            break;
          case "wrap":
            result = transformWrap(lines);
            break;
          case "template":
            result = transformTemplate(lines);
            break;
          case "number":
            result = transformNumber(lines);
            break;
          case "case":
            result = transformCase(lines);
            break;
          case "replace":
            result = transformReplace(lines);
            break;
          default:
            result = lines;
        }

        document.getElementById("inputCount").textContent = lines.length;
        document.getElementById("outputCount").textContent = result.length;
        resultEl.textContent = result.join("\n");
        saveState();
        showToast("转换完成");
      }

      // Copy result
      function copyResult() {
        const text = resultEl.textContent;
        if (!text || text === "转换结果将显示在这里...") {
          showToast("没有可复制的内容");
          return;
        }
        navigator.clipboard.writeText(text).then(() => {
          showToast("已复制到剪贴板");
        });
      }

      // Download result
      function downloadResult() {
        const text = resultEl.textContent;
        if (!text || text === "转换结果将显示在这里...") {
          showToast("没有可下载的内容");
          return;
        }
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "transformed-data.txt";
        a.click();
        URL.revokeObjectURL(url);
        showToast("下载已开始");
      }

      // Clear all
      function clearAll() {
        inputEl.value = "";
        resultEl.textContent = "转换结果将显示在这里...";
        document.getElementById("inputCount").textContent = "0";
        document.getElementById("outputCount").textContent = "0";
        localStorage.removeItem(LS_KEY);
        showToast("已清空");
      }

      // Save state
      function saveState() {
        const state = {
          input: inputEl.value,
          type: currentType,
          prefix: document.getElementById("prefix").value,
          suffix: document.getElementById("suffix").value,
          wrapLeft: document.getElementById("wrapLeft").value,
          wrapRight: document.getElementById("wrapRight").value,
          wrapSeparator: document.getElementById("wrapSeparator").value,
          template: document.getElementById("template").value,
          numberFormat: document.getElementById("numberFormat").value,
          nonNumberAction: document.getElementById("nonNumberAction").value,
          caseType: document.getElementById("caseType").value,
          replaceFind: document.getElementById("replaceFind").value,
          replaceWith: document.getElementById("replaceWith").value,
          replaceRegex: document.getElementById("replaceRegex").checked
        };
        localStorage.setItem(LS_KEY, JSON.stringify(state));
      }

      // Load state
      function loadState() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const state = JSON.parse(saved);
            inputEl.value = state.input || "";

            if (state.type) {
              currentType = state.type;
              document.querySelectorAll(".type-btn").forEach((btn) => {
                if (btn.dataset.type === state.type) {
                  btn.classList.add("active");
                } else {
                  btn.classList.remove("active");
                }
              });
              document.querySelectorAll(".transform-options").forEach((opt) => {
                opt.classList.add("hidden");
              });
              document.getElementById("opt-" + currentType).classList.remove("hidden");
            }

            document.getElementById("prefix").value = state.prefix || "";
            document.getElementById("suffix").value = state.suffix || "";
            document.getElementById("wrapLeft").value = state.wrapLeft || '"';
            document.getElementById("wrapRight").value = state.wrapRight || '"';
            document.getElementById("wrapSeparator").value = state.wrapSeparator || ",";
            document.getElementById("template").value = state.template || "";
            document.getElementById("numberFormat").value = state.numberFormat || "thousands";
            document.getElementById("nonNumberAction").value = state.nonNumberAction || "keep";
            document.getElementById("caseType").value = state.caseType || "upper";
            document.getElementById("replaceFind").value = state.replaceFind || "";
            document.getElementById("replaceWith").value = state.replaceWith || "";
            document.getElementById("replaceRegex").checked = state.replaceRegex || false;
          }
        } catch {
          // ignore
        }
      }

      // Theme toggle
      function toggleTheme() {
        const body = document.body;
        const isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      // Show toast
      function showToast(msg) {
        const toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Init theme
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      // Auto-save on input
      inputEl.addEventListener("input", saveState);

      // Load state on init
      loadState();
    
