// @ts-nocheck
// Generated from tools/text/string-escape.html
// Source SHA-256: a10002b84a7630ff30f66aec23e45822fabfa70cd35e509fabb3d8a7a3e53fff
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let mode = "json",
        action = "escape";
      const infos = {
        json: ["\\n → 换行", '\\" → 双引号', "\\\\ → 反斜杠", "\\t → 制表符"],
        js: ["\\n → 换行", "\\' → 单引号", '\\" → 双引号', "\\\\ → 反斜杠"],
        html: ["&lt; → <", "&gt; → >", "&amp; → &", '&quot; → "'],
        url: ["空格 → %20", "& → %26", "= → %3D", "? → %3F"],
        csv: ['双引号加倍 → ""', "包含逗号/换行时加双引号"]
      };
      function process() {
        const input = document.getElementById("input").value;
        let output = "";
        if (action === "escape") {
          switch (mode) {
            case "json":
              output = JSON.stringify(input);
              break;
            case "js":
              output =
                "'" +
                input
                  .replace(/\\/g, "\\\\")
                  .replace(/'/g, "\\'")
                  .replace(/\n/g, "\\n")
                  .replace(/\r/g, "\\r")
                  .replace(/\t/g, "\\t") +
                "'";
              break;
            case "html":
              output = input
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
              break;
            case "url":
              output = encodeURIComponent(input);
              break;
            case "csv":
              output =
                input.includes(",") || input.includes("\n") || input.includes('"')
                  ? '"' + input.replace(/"/g, '""') + '"'
                  : input;
              break;
          }
        } else {
          switch (mode) {
            case "json":
              try {
                output = JSON.parse(input);
              } catch (e) {
                output = "解析错误: " + e.message;
              }
              break;
            case "js":
              output = input
                .replace(/^['"]|['"]$/g, "")
                .replace(/\\n/g, "\n")
                .replace(/\\r/g, "\r")
                .replace(/\\t/g, "\t")
                .replace(/\\'/g, "'")
                .replace(/\\"/g, '"')
                .replace(/\\\\/g, "\\");
              break;
            case "html":
              output = input
                .replace(/&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&nbsp;/g, " ");
              break;
            case "url":
              try {
                output = decodeURIComponent(input);
              } catch (e) {
                output = "解码错误: " + e.message;
              }
              break;
            case "csv":
              output = input.replace(/^"|"$/g, "").replace(/""/g, '"');
              break;
          }
        }
        document.getElementById("output").value = output;
        document.getElementById("info").innerHTML = infos[mode]
          .map((i) => "<li>" + i + "</li>")
          .join("");
      }
      function setMode(m) {
        mode = m;
        document
          .querySelectorAll(".tabs:first-of-type .tab")
          .forEach((t, i) =>
            t.classList.toggle("active", ["json", "js", "html", "url", "csv"][i] === m)
          );
        process();
      }
      function setAction(a) {
        action = a;
        document
          .querySelectorAll(".tabs:nth-of-type(2) .tab")
          .forEach((t, i) =>
            t.classList.toggle(
              "active",
              (a === "escape" && i === 0) || (a === "unescape" && i === 1)
            )
          );
        document.getElementById("inputLabel").textContent =
          a === "escape" ? "输入文本" : "输入转义后的文本";
        document.getElementById("outputLabel").textContent =
          a === "escape" ? "转义结果" : "反转义结果";
        process();
      }
      function copyResult() {
        navigator.clipboard.writeText(document.getElementById("output").value);
        const btn = document.querySelector(".copy-btn");
        btn.textContent = "已复制!";
        setTimeout(() => (btn.textContent = "复制结果"), 1500);
      }
      document.getElementById("input").addEventListener("input", process);
      process();

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
    
