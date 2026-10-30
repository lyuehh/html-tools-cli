// @ts-nocheck
// Generated from tools/text/diff-checker.html
// Source SHA-256: 345f56523225580f1bbdb81f31c7f9a3cff38d9ea945e2714380a0c07e4430b4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentView = "unified";
      let lastDiff = null;

      window.lcs = function (a, b) {
        const m = a.length,
          n = b.length;
        const dp = Array(m + 1)
          .fill(null)
          .map(() => Array(n + 1).fill(0));

        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            if (a[i - 1] === b[j - 1]) {
              dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
              dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
          }
        }

        const result = [];
        let i = m,
          j = n;
        while (i > 0 && j > 0) {
          if (a[i - 1] === b[j - 1]) {
            result.unshift({ type: "unchanged", text: a[i - 1], lineA: i, lineB: j });
            i--;
            j--;
          } else if (dp[i - 1][j] > dp[i][j - 1]) {
            result.unshift({ type: "del", text: a[i - 1], lineA: i });
            i--;
          } else {
            result.unshift({ type: "add", text: b[j - 1], lineB: j });
            j--;
          }
        }
        while (i > 0) {
          result.unshift({ type: "del", text: a[i - 1], lineA: i });
          i--;
        }
        while (j > 0) {
          result.unshift({ type: "add", text: b[j - 1], lineB: j });
          j--;
        }

        return result;
      };

      window.compare = function () {
        const text1 = document.getElementById("text1").value;
        const text2 = document.getElementById("text2").value;

        const lines1 = text1.split("\n");
        const lines2 = text2.split("\n");

        lastDiff = lcs(lines1, lines2);

        const adds = lastDiff.filter((d) => d.type === "add").length;
        const dels = lastDiff.filter((d) => d.type === "del").length;
        const unchanged = lastDiff.filter((d) => d.type === "unchanged").length;

        document.getElementById("stats").style.display = "flex";
        document.getElementById("stats").innerHTML = `
                  <div class="stat add">+ ${adds} 行添加</div>
                  <div class="stat del">- ${dels} 行删除</div>
                  <div class="stat">${unchanged} 行未变</div>
                  <div class="stat">共 ${lines1.length} → ${lines2.length} 行</div>
              `;

        document.getElementById("diffOutput").style.display = "block";
        renderDiff();
      };

      function renderDiff() {
        if (!lastDiff) return;

        const content = document.getElementById("diffContent");

        if (currentView === "unified") {
          let lineNum = 0;
          content.innerHTML = lastDiff
            .map((d) => {
              if (d.type !== "del") lineNum++;
              const num = d.type === "del" ? d.lineA : d.type === "add" ? d.lineB : d.lineA;
              return `<div class="diff-line ${d.type}">
                          <span class="line-num">${num}</span>
                          <span class="line-content">${escapeHtml(d.text)}</span>
                      </div>`;
            })
            .join("");
        } else {
          // Split view - simplified
          let html = '<div style="display: grid; grid-template-columns: 1fr 1fr;">';
          html +=
            "<div>" +
            lastDiff
              .filter((d) => d.type !== "add")
              .map(
                (d) =>
                  `<div class="diff-line ${d.type === "del" ? "del" : ""}">
                          <span class="line-num">${d.lineA || ""}</span>
                          <span class="line-content">${escapeHtml(d.text)}</span>
                      </div>`
              )
              .join("") +
            "</div>";
          html +=
            "<div>" +
            lastDiff
              .filter((d) => d.type !== "del")
              .map(
                (d) =>
                  `<div class="diff-line ${d.type === "add" ? "add" : ""}">
                          <span class="line-num">${d.lineB || ""}</span>
                          <span class="line-content">${escapeHtml(d.text)}</span>
                      </div>`
              )
              .join("") +
            "</div>";
          html += "</div>";
          content.innerHTML = html;
        }
      }

      window.setView = function (view) {
        currentView = view;
        document.querySelectorAll(".view-btn").forEach((btn) => btn.classList.remove("active"));
        document
          .querySelector(`.view-btn:nth-child(${view === "unified" ? 1 : 2})`)
          .classList.add("active");
        renderDiff();
      };

      window.escapeHtml = function (text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };

      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
