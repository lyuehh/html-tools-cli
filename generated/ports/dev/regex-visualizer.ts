// @ts-nocheck
// Generated from tools/dev/regex-visualizer.html
// Source SHA-256: 79295c2467078d2d7e477883ec6cf5555670550a2fd5e15be3e71b9e91100973
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Initialize theme
      (function () {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      const presets = {
        email: { pattern: "[\\w.-]+@[\\w.-]+\\.\\w+", flags: "gi", text: null },
        phone: { pattern: "1[3-9]\\d{9}", flags: "g", text: null },
        url: { pattern: "https?://[\\w.-]+(?:/[\\w./-]*)?", flags: "gi", text: null },
        ip: { pattern: "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}", flags: "g", text: null },
        date: { pattern: "\\d{4}[-/]\\d{1,2}[-/]\\d{1,2}", flags: "g", text: null },
        chinese: { pattern: "[\\u4e00-\\u9fa5]+", flags: "g", text: null },
        html: { pattern: "<([a-z]+)[^>]*>.*?</\\1>", flags: "gis", text: null }
      };

      const regexInput = document.getElementById("regexInput");
      const flagsInput = document.getElementById("flagsInput");
      const testText = document.getElementById("testText");
      const highlightResult = document.getElementById("highlightResult");
      const matchesList = document.getElementById("matchesList");
      const errorMessage = document.getElementById("errorMessage");
      const stats = document.getElementById("stats");

      window.setPreset = function (name) {
        const preset = presets[name];
        if (preset) {
          regexInput.value = preset.pattern;
          flagsInput.value = preset.flags;
          updateFlagButtons();
          runMatch();
        }
      };

      window.toggleFlag = function (flag) {
        let flags = flagsInput.value;
        if (flags.includes(flag)) {
          flags = flags.replace(flag, "");
        } else {
          flags += flag;
        }
        flagsInput.value = flags;
        updateFlagButtons();
        runMatch();
      };

      function updateFlagButtons() {
        const flags = flagsInput.value;
        document.querySelectorAll(".flag-btn").forEach((btn) => {
          const flag = btn.dataset.flag;
          btn.classList.toggle("active", flags.includes(flag));
        });
      }

      window.escapeHtml = function (text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      function runMatch() {
        const pattern = regexInput.value;
        const flags = flagsInput.value;
        const text = testText.value;

        // Clear previous results
        errorMessage.classList.remove("show");

        if (!pattern) {
          highlightResult.innerHTML = escapeHtml(text);
          matchesList.innerHTML =
            '<div style="text-align: center; color: var(--text-color); opacity: 0.6; padding: 20px;">输入正则表达式开始匹配</div>';
          stats.innerHTML = "";
          return;
        }

        let regex;
        try {
          regex = new RegExp(pattern, flags);
        } catch (e) {
          errorMessage.textContent = "正则表达式错误: " + e.message;
          errorMessage.classList.add("show");
          highlightResult.innerHTML = escapeHtml(text);
          matchesList.innerHTML = "";
          stats.innerHTML = "";
          return;
        }

        // Find all matches
        const matches = [];
        let match;
        const globalRegex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");

        while ((match = globalRegex.exec(text)) !== null) {
          matches.push({
            value: match[0],
            index: match.index,
            groups: match.slice(1),
            namedGroups: match.groups || {}
          });

          // Prevent infinite loop for zero-length matches
          if (match[0].length === 0) {
            globalRegex.lastIndex++;
          }
        }

        // Highlight matches
        if (matches.length > 0) {
          let result = "";
          let lastIndex = 0;

          matches.forEach((m) => {
            result += escapeHtml(text.slice(lastIndex, m.index));
            result += '<span class="match">' + escapeHtml(m.value) + "</span>";
            lastIndex = m.index + m.value.length;
          });
          result += escapeHtml(text.slice(lastIndex));

          highlightResult.innerHTML = result;
        } else {
          highlightResult.innerHTML = escapeHtml(text);
        }

        // Show matches list
        if (matches.length > 0) {
          const groupColors = ["#e3f2fd", "#f3e5f5", "#e8f5e9", "#fff3e0", "#fce4ec", "#e0f7fa"];

          matchesList.innerHTML = matches
            .map((m, i) => {
              let groupsHtml = "";

              // Numbered groups
              if (m.groups.length > 0) {
                groupsHtml = '<div class="match-groups">';
                m.groups.forEach((g, gi) => {
                  const color = groupColors[gi % groupColors.length];
                  groupsHtml += `<div class="group-item">
                                <span class="group-label">组 ${gi + 1}:</span>
                                <span class="group-value" style="background: ${color}">${g !== undefined ? escapeHtml(g) : "(空)"}</span>
                            </div>`;
                });
                groupsHtml += "</div>";
              }

              // Named groups
              const namedKeys = Object.keys(m.namedGroups);
              if (namedKeys.length > 0) {
                if (!groupsHtml) groupsHtml = '<div class="match-groups">';
                else groupsHtml = groupsHtml.slice(0, -6); // Remove closing div

                namedKeys.forEach((key, ki) => {
                  const color = groupColors[(m.groups.length + ki) % groupColors.length];
                  groupsHtml += `<div class="group-item">
                                <span class="group-label">${key}:</span>
                                <span class="group-value" style="background: ${color}">${escapeHtml(m.namedGroups[key])}</span>
                            </div>`;
                });
                groupsHtml += "</div>";
              }

              return `<div class="match-item">
                        <span class="match-index">#${i + 1}</span>
                        <div class="match-content">
                            <span class="match-value">${escapeHtml(m.value)}</span>
                            <div class="match-position">位置: ${m.index} - ${m.index + m.value.length}</div>
                            ${groupsHtml}
                        </div>
                    </div>`;
            })
            .join("");
        } else {
          matchesList.innerHTML =
            '<div style="text-align: center; color: var(--text-color); opacity: 0.6; padding: 20px;">无匹配结果</div>';
        }

        // Update stats
        stats.innerHTML = `
                <div class="stat-item">匹配数量: <span>${matches.length}</span></div>
                <div class="stat-item">文本长度: <span>${text.length}</span></div>
                <div class="stat-item">表达式: <span>/${pattern}/${flags}</span></div>
            `;
      }

      // Event listeners
      regexInput.addEventListener("input", runMatch);
      flagsInput.addEventListener("input", () => {
        updateFlagButtons();
        runMatch();
      });
      testText.addEventListener("input", runMatch);

      // Initialize
      updateFlagButtons();
      runMatch();
    
