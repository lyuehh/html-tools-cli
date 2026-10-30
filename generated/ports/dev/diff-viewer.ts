// @ts-nocheck
// Generated from tools/dev/diff-viewer.html
// Source SHA-256: 777b93fdd800e6556cd6ae46acd64b50bb627f2f7e37c2cfcc7c015c97f437d4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function lcs(a, b) {
        const m = a.length,
          n = b.length;
        const dp = Array(m + 1)
          .fill(null)
          .map(() => Array(n + 1).fill(0));
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            dp[i][j] =
              a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
        }
        const result = [];
        let i = m,
          j = n;
        while (i > 0 && j > 0) {
          if (a[i - 1] === b[j - 1]) {
            result.unshift({ type: "same", old: i - 1, new: j - 1 });
            i--;
            j--;
          } else if (dp[i - 1][j] > dp[i][j - 1]) {
            result.unshift({ type: "remove", old: i - 1 });
            i--;
          } else {
            result.unshift({ type: "add", new: j - 1 });
            j--;
          }
        }
        while (i > 0) {
          result.unshift({ type: "remove", old: i - 1 });
          i--;
        }
        while (j > 0) {
          result.unshift({ type: "add", new: j - 1 });
          j--;
        }
        return result;
      }
      function escapeHtml(text) {
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
      function compare() {
        const lines1 = document.getElementById("text1").value.split("\n");
        const lines2 = document.getElementById("text2").value.split("\n");
        const diff = lcs(lines1, lines2);
        let leftHtml = "",
          rightHtml = "",
          unifiedHtml = "";
        let addCount = 0,
          removeCount = 0,
          sameCount = 0;
        let leftNum = 1,
          rightNum = 1;
        diff.forEach((d) => {
          if (d.type === "same") {
            const content = escapeHtml(lines1[d.old]);
            leftHtml += `<div class="diff-line line-same"><span class="line-num">${leftNum++}</span><span class="line-content">${content}</span></div>`;
            rightHtml += `<div class="diff-line line-same"><span class="line-num">${rightNum++}</span><span class="line-content">${content}</span></div>`;
            unifiedHtml += `<div class="diff-line line-same"><span class="line-num">${leftNum - 1}</span><span class="line-content">  ${content}</span></div>`;
            sameCount++;
          } else if (d.type === "remove") {
            const content = escapeHtml(lines1[d.old]);
            leftHtml += `<div class="diff-line line-remove"><span class="line-num">${leftNum++}</span><span class="line-content">${content}</span></div>`;
            rightHtml += `<div class="diff-line line-empty"><span class="line-num"></span><span class="line-content"></span></div>`;
            unifiedHtml += `<div class="diff-line line-remove"><span class="line-num">${leftNum - 1}</span><span class="line-content">- ${content}</span></div>`;
            removeCount++;
          } else {
            const content = escapeHtml(lines2[d.new]);
            leftHtml += `<div class="diff-line line-empty"><span class="line-num"></span><span class="line-content"></span></div>`;
            rightHtml += `<div class="diff-line line-add"><span class="line-num">${rightNum++}</span><span class="line-content">${content}</span></div>`;
            unifiedHtml += `<div class="diff-line line-add"><span class="line-num">${rightNum - 1}</span><span class="line-content">+ ${content}</span></div>`;
            addCount++;
          }
        });
        document.getElementById("splitView").innerHTML =
          `<div class="diff-side">${leftHtml}</div><div class="diff-side">${rightHtml}</div>`;
        document.getElementById("unifiedView").innerHTML =
          `<div class="diff-side">${unifiedHtml}</div>`;
        document.getElementById("addCount").textContent = "+" + addCount;
        document.getElementById("removeCount").textContent = "-" + removeCount;
        document.getElementById("sameCount").textContent = sameCount + " 相同";
        document.getElementById("result").style.display = "block";
      }
      function setView(type) {
        document
          .querySelectorAll(".view-toggle button")
          .forEach((b) => b.classList.remove("active"));
        event.target.classList.add("active");
        document.getElementById("splitView").style.display = type === "split" ? "grid" : "none";
        document.getElementById("unifiedView").style.display = type === "unified" ? "grid" : "none";
      }
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
    
