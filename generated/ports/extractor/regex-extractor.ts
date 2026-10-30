// @ts-nocheck
// Generated from tools/extractor/regex-extractor.html
// Source SHA-256: 23bbc6c6407284b9390b966c98e939cc23e4d9092b80657a3e5c08e510f72959
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let matches = [];

      window.extract = function () {
        const regexStr = document.getElementById("regexInput").value;
        const text = document.getElementById("textInput").value;

        let flags = "";
        if (document.getElementById("flagG").checked) flags += "g";
        if (document.getElementById("flagI").checked) flags += "i";
        if (document.getElementById("flagM").checked) flags += "m";
        if (document.getElementById("flagS").checked) flags += "s";

        document.getElementById("errorPanel").style.display = "none";
        document.getElementById("results").style.display = "none";
        document.getElementById("stats").style.display = "none";

        try {
          const regex = new RegExp(regexStr, flags);
          matches = [];

          if (flags.includes("g")) {
            let match;
            while ((match = regex.exec(text)) !== null) {
              matches.push({
                full: match[0],
                groups: match.slice(1),
                index: match.index
              });
            }
          } else {
            const match = regex.exec(text);
            if (match) {
              matches.push({
                full: match[0],
                groups: match.slice(1),
                index: match.index
              });
            }
          }

          renderResults();
          highlightText(text, regexStr, flags);
        } catch (e) {
          document.getElementById("errorPanel").style.display = "block";
          document.getElementById("errorMsg").textContent = "正则表达式错误: " + e.message;
        }
      };

      function renderResults() {
        if (matches.length === 0) {
          document.getElementById("results").style.display = "block";
          document.getElementById("matchList").innerHTML =
            '<div style="color:var(--pico-muted-color);padding:1rem;text-align:center;">没有找到匹配项</div>';
          document.getElementById("stats").style.display = "flex";
          document.getElementById("matchCount").textContent = "0";
          document.getElementById("groupCount").textContent = "0";
          document.getElementById("uniqueCount").textContent = "0";
          return;
        }

        const uniqueMatches = [...new Set(matches.map((m) => m.full))];
        const hasGroups = matches.some((m) => m.groups.length > 0);

        document.getElementById("stats").style.display = "flex";
        document.getElementById("matchCount").textContent = matches.length;
        document.getElementById("groupCount").textContent = hasGroups
          ? matches[0].groups.length
          : 0;
        document.getElementById("uniqueCount").textContent = uniqueMatches.length;

        const html = matches
          .map(
            (m, i) => `
                <div class="match-item">
                    <span class="match-num">#${i + 1}</span>
                    <div class="match-content">
                        ${escapeHtml(m.full)}
                        ${
                          m.groups.length > 0
                            ? `
                            <div class="match-groups">
                                ${m.groups.map((g, j) => `<span>$${j + 1}: ${escapeHtml(g || "空")}</span>`).join("")}
                            </div>
                        `
                            : ""
                        }
                    </div>
                </div>
            `
          )
          .join("");

        document.getElementById("results").style.display = "block";
        document.getElementById("matchList").innerHTML = html;
      }

      function highlightText(text, regexStr, flags) {
        try {
          const regex = new RegExp(regexStr, flags.includes("g") ? flags : flags + "g");
          const highlighted = text.replace(
            regex,
            (match) => `<span class="highlight">${escapeHtml(match)}</span>`
          );
          document.getElementById("highlightText").innerHTML = highlighted;
        } catch (e) {
          document.getElementById("highlightText").textContent = text;
        }
      }

      window.escapeHtml = function (str) {
        if (!str) return "";
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      };

      window.copyAll = function () {
        const text = matches.map((m) => m.full).join("\n");
        navigator.clipboard.writeText(text);
        event.target.textContent = "✓ 已复制";
        setTimeout(() => (event.target.textContent = "📋 复制全部"), 2000);
      };

      window.copyUnique = function () {
        const text = [...new Set(matches.map((m) => m.full))].join("\n");
        navigator.clipboard.writeText(text);
        event.target.textContent = "✓ 已复制";
        setTimeout(() => (event.target.textContent = "📋 复制去重"), 2000);
      };

      window.exportCSV = function () {
        const hasGroups = matches.some((m) => m.groups.length > 0);
        let csv = hasGroups
          ? "序号,匹配内容," + matches[0].groups.map((_, i) => `捕获组${i + 1}`).join(",") + "\n"
          : "序号,匹配内容\n";

        matches.forEach((m, i) => {
          const row = [i + 1, `"${m.full.replace(/"/g, '""')}"`];
          if (hasGroups) {
            m.groups.forEach((g) => row.push(`"${(g || "").replace(/"/g, '""')}"`));
          }
          csv += row.join(",") + "\n";
        });

        const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "regex_matches.csv";
        a.click();
      };

      // Preset buttons
      document.querySelectorAll(".preset-btn").forEach((btn) => {
        btn.onclick = () => {
          document.getElementById("regexInput").value = btn.dataset.regex;
          extract();
        };
      });

      // Auto extract on input
      document.getElementById("regexInput").addEventListener("input", debounce(extract, 300));
      document.getElementById("textInput").addEventListener("input", debounce(extract, 300));
      document
        .querySelectorAll('[id^="flag"]')
        .forEach((cb) => cb.addEventListener("change", extract));

      function debounce(fn, delay) {
        let timer;
        return function (...args) {
          clearTimeout(timer);
          timer = setTimeout(() => fn.apply(this, args), delay);
        };
      }

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

      // Initial extract
      extract();

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
    
