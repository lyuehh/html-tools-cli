// @ts-nocheck
// Generated from tools/text/text-case-converter.html
// Source SHA-256: d5e16da8bf5c9cb968dda6d5f823312b4b9ba8d1a409d9eee90eb84b7cd505ac
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function getWords(text) {
        return text
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/[_\-\.]+/g, " ")
          .trim()
          .split(/\s+/);
      }
      function convert(type) {
        const text = document.getElementById("input").value;
        let result = "";
        switch (type) {
          case "upper":
            result = text.toUpperCase();
            break;
          case "lower":
            result = text.toLowerCase();
            break;
          case "title":
            result = text.replace(
              /\w\S*/g,
              (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
            );
            break;
          case "sentence":
            result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
            break;
          case "camel":
            result = getWords(text)
              .map((w, i) =>
                i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
              )
              .join("");
            break;
          case "pascal":
            result = getWords(text)
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
              .join("");
            break;
          case "snake":
            result = getWords(text)
              .map((w) => w.toLowerCase())
              .join("_");
            break;
          case "kebab":
            result = getWords(text)
              .map((w) => w.toLowerCase())
              .join("-");
            break;
          case "constant":
            result = getWords(text)
              .map((w) => w.toUpperCase())
              .join("_");
            break;
          case "dot":
            result = getWords(text)
              .map((w) => w.toLowerCase())
              .join(".");
            break;
          case "toggle":
            result = text
              .split("")
              .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
              .join("");
            break;
          case "random":
            result = text
              .split("")
              .map((c) => (Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()))
              .join("");
            break;
        }
        document.getElementById("output").value = result;
      }
      function copyResult() {
        navigator.clipboard.writeText(document.getElementById("output").value);
        const btn = document.querySelector(".copy-btn");
        btn.textContent = "已复制!";
        setTimeout(() => (btn.textContent = "复制结果"), 1500);
      }
    
