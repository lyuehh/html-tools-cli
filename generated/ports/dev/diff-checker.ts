// @ts-nocheck
// Generated from tools/dev/diff-checker.html
// Source SHA-256: 3171b03d858c2baaa15b756bb52d42db779b96bb69ebc3d985357faf4ac9d03d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let diffResult = null;

      function clearText(id) {
        document.getElementById(id).value = "";
      }
      function swapTexts() {
        const text1 = document.getElementById("text1");
        const text2 = document.getElementById("text2");
        const temp = text1.value;
        text1.value = text2.value;
        text2.value = temp;
      }

      function loadSample() {
        document.getElementById("text1").value = `function greet(name) {
    console.log("Hello, " + name);
    return true;
  }

  const user = "World";
  greet(user);`;
        document.getElementById("text2").value = `function greet(name, greeting = "Hello") {
    console.log(greeting + ", " + name + "!");
    return true;
  }

  const user = "World";
  const message = "Hi";
  greet(user, message);`;
      }

      function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      }

      function getDiff(lines1, lines2) {
        const m = lines1.length,
          n = lines2.length;
        const dp = Array(m + 1)
          .fill(null)
          .map(() => Array(n + 1).fill(0));
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            if (lines1[i - 1] === lines2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
        }
        const result = [];
        let i = m,
          j = n;
        while (i > 0 || j > 0) {
          if (i > 0 && j > 0 && lines1[i - 1] === lines2[j - 1]) {
            result.unshift({ type: "same", line1: i, line2: j, content: lines1[i - 1] });
            i--;
            j--;
          } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            result.unshift({ type: "added", line1: null, line2: j, content: lines2[j - 1] });
            j--;
          } else if (i > 0) {
            result.unshift({ type: "removed", line1: i, line2: null, content: lines1[i - 1] });
            i--;
          }
        }
        return result;
      }

      function compareDiff() {
        const text1 = document.getElementById("text1").value;
        const text2 = document.getElementById("text2").value;
        const lines1 = text1.split("\n");
        const lines2 = text2.split("\n");
        diffResult = getDiff(lines1, lines2);
        let added = 0,
          removed = 0;
        diffResult.forEach((item) => {
          if (item.type === "added") added++;
          else if (item.type === "removed") removed++;
        });
        document.getElementById("addedCount").textContent = added;
        document.getElementById("removedCount").textContent = removed;
        document.getElementById("stats").style.display = "flex";
        renderDiff();
      }

      function renderDiff() {
        if (!diffResult) return;
        const container = document.getElementById("diffContainer");
        if (diffResult.every((d) => d.type === "same")) {
          container.innerHTML = '<div class="no-diff">两段文本完全相同</div>';
          return;
        }
        let html = '<table class="diff-table">';
        for (const item of diffResult) {
          const lineNum1 = item.line1 || "";
          const lineNum2 = item.line2 || "";
          const content = escapeHtml(item.content || "");
          let rowClass = "",
            prefix = "  ";
          if (item.type === "added") {
            rowClass = "diff-added";
            prefix = "+ ";
          } else if (item.type === "removed") {
            rowClass = "diff-removed";
            prefix = "- ";
          }
          html += `<tr class="${rowClass}">
            <td class="line-number">${lineNum1}</td>
            <td class="line-number">${lineNum2}</td>
            <td class="line-content">${prefix}${content}</td>
          </tr>`;
        }
        html += "</table>";
        container.innerHTML = html;
      }

      function setView(view) {
        document
          .querySelectorAll(".view-btn")
          .forEach((btn) => btn.classList.toggle("active", btn.textContent.includes("统一")));
        renderDiff();
      }

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
    
