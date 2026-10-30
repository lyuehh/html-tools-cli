// @ts-nocheck
// Generated from tools/text/text-compare.html
// Source SHA-256: b10e8853a5b76bf824bf2fe897483a03e8adfd0497fbf312eade7d492ac38f46
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.lcs = function (a, b) {
        const m = a.length,
          n = b.length;
        const dp = Array(m + 1)
          .fill(null)
          .map(() => Array(n + 1).fill(0));
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
        }
        return dp[m][n];
      };

      function diffLines(oldLines, newLines) {
        const m = oldLines.length,
          n = newLines.length;
        const dp = Array(m + 1)
          .fill(null)
          .map(() => Array(n + 1).fill(0));

        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            if (normalize(oldLines[i - 1]) === normalize(newLines[j - 1])) {
              dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
              dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
          }
        }

        const result = [];
        let i = m,
          j = n;
        while (i > 0 || j > 0) {
          if (i > 0 && j > 0 && normalize(oldLines[i - 1]) === normalize(newLines[j - 1])) {
            result.unshift({
              type: "equal",
              left: oldLines[i - 1],
              right: newLines[j - 1],
              leftNum: i,
              rightNum: j
            });
            i--;
            j--;
          } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            result.unshift({ type: "add", right: newLines[j - 1], rightNum: j });
            j--;
          } else {
            result.unshift({ type: "del", left: oldLines[i - 1], leftNum: i });
            i--;
          }
        }
        return result;
      }

      function normalize(str) {
        let s = str;
        if (document.getElementById("ignoreCase").checked) s = s.toLowerCase();
        if (document.getElementById("ignoreWhitespace").checked) s = s.replace(/\s+/g, " ").trim();
        return s;
      }

      window.highlightDiff = function (oldStr, newStr) {
        const level = document.getElementById("diffLevel").value;
        if (level === "line") return { old: escapeHtml(oldStr), new: escapeHtml(newStr) };

        const oldParts = level === "char" ? [...oldStr] : oldStr.split(/(\s+)/);
        const newParts = level === "char" ? [...newStr] : newStr.split(/(\s+)/);

        const m = oldParts.length,
          n = newParts.length;
        const dp = Array(m + 1)
          .fill(null)
          .map(() => Array(n + 1).fill(0));
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            if (oldParts[i - 1] === newParts[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
        }

        let oldHtml = "",
          newHtml = "";
        let i = m,
          j = n;
        const oldStack = [],
          newStack = [];

        while (i > 0 || j > 0) {
          if (i > 0 && j > 0 && oldParts[i - 1] === newParts[j - 1]) {
            oldStack.unshift(escapeHtml(oldParts[i - 1]));
            newStack.unshift(escapeHtml(newParts[j - 1]));
            i--;
            j--;
          } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            newStack.unshift(`<span class="char-add">${escapeHtml(newParts[j - 1])}</span>`);
            j--;
          } else {
            oldStack.unshift(`<span class="char-del">${escapeHtml(oldParts[i - 1])}</span>`);
            i--;
          }
        }

        return { old: oldStack.join(""), new: newStack.join("") };
      };

      window.escapeHtml = function (str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      };

      window.compare = function () {
        const leftText = document.getElementById("textLeft").value;
        const rightText = document.getElementById("textRight").value;
        const leftLines = leftText.split("\n");
        const rightLines = rightText.split("\n");

        document.getElementById("statsLeft").textContent =
          `${leftLines.length} 行, ${leftText.length} 字符`;
        document.getElementById("statsRight").textContent =
          `${rightLines.length} 行, ${rightText.length} 字符`;

        const diff = diffLines(leftLines, rightLines);

        let leftHtml = "",
          rightHtml = "",
          unifiedHtml = "";
        let addCount = 0,
          delCount = 0,
          modCount = 0;
        let leftNum = 0,
          rightNum = 0;

        for (let i = 0; i < diff.length; i++) {
          const d = diff[i];
          if (d.type === "equal") {
            leftNum++;
            rightNum++;
            leftHtml += `<div class="diff-line"><span class="line-num">${leftNum}</span><span class="line-content">${escapeHtml(d.left)}</span></div>`;
            rightHtml += `<div class="diff-line"><span class="line-num">${rightNum}</span><span class="line-content">${escapeHtml(d.right)}</span></div>`;
            unifiedHtml += `<div class="diff-line"><span class="line-num">${leftNum}</span><span class="line-content">  ${escapeHtml(d.left)}</span></div>`;
          } else if (d.type === "del") {
            leftNum++;
            delCount++;
            leftHtml += `<div class="diff-line diff-del"><span class="line-num">${leftNum}</span><span class="line-content">${escapeHtml(d.left)}</span></div>`;
            rightHtml +=
              '<div class="diff-line"><span class="line-num"></span><span class="line-content"></span></div>';
            unifiedHtml += `<div class="diff-line diff-del"><span class="line-num">${leftNum}</span><span class="line-content">- ${escapeHtml(d.left)}</span></div>`;
          } else if (d.type === "add") {
            rightNum++;
            addCount++;
            leftHtml +=
              '<div class="diff-line"><span class="line-num"></span><span class="line-content"></span></div>';
            rightHtml += `<div class="diff-line diff-add"><span class="line-num">${rightNum}</span><span class="line-content">${escapeHtml(d.right)}</span></div>`;
            unifiedHtml += `<div class="diff-line diff-add"><span class="line-num">${rightNum}</span><span class="line-content">+ ${escapeHtml(d.right)}</span></div>`;
          }
        }

        document.getElementById("diffLeft").innerHTML = leftHtml;
        document.getElementById("diffRight").innerHTML = rightHtml;
        document.getElementById("diffUnified").innerHTML = unifiedHtml;

        // Calculate similarity
        const totalLines = Math.max(leftLines.length, rightLines.length);
        const similarity =
          totalLines > 0 ? Math.round((1 - (addCount + delCount) / (totalLines * 2)) * 100) : 100;

        document.getElementById("addCount").textContent = addCount;
        document.getElementById("delCount").textContent = delCount;
        document.getElementById("modCount").textContent = modCount;
        document.getElementById("similarity").textContent = similarity + "%";
        document.getElementById("summary").style.display = "flex";
      };

      window.swap = function () {
        const left = document.getElementById("textLeft").value;
        const right = document.getElementById("textRight").value;
        document.getElementById("textLeft").value = right;
        document.getElementById("textRight").value = left;
        compare();
      };

      window.clearAll = function () {
        document.getElementById("textLeft").value = "";
        document.getElementById("textRight").value = "";
        document.getElementById("diffLeft").innerHTML = "";
        document.getElementById("diffRight").innerHTML = "";
        document.getElementById("diffUnified").innerHTML = "";
        document.getElementById("summary").style.display = "none";
      };

      window.toggleView = function () {
        const mode = document.getElementById("viewMode").value;
        document
          .querySelectorAll(".split-view")
          .forEach((el) => el.classList.toggle("active", mode === "split"));
        document
          .querySelectorAll(".unified-view")
          .forEach((el) => el.classList.toggle("active", mode === "unified"));
      };

      // Sync scroll
      const diffLeft = document.getElementById("diffLeft");
      const diffRight = document.getElementById("diffRight");
      diffLeft.addEventListener("scroll", () => (diffRight.scrollTop = diffLeft.scrollTop));
      diffRight.addEventListener("scroll", () => (diffLeft.scrollTop = diffRight.scrollTop));

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

      // Initial compare
      compare();

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
    
