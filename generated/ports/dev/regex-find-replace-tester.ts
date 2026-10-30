// @ts-nocheck
// Generated from tools/dev/regex-find-replace-tester.html
// Source SHA-256: a7bc21345db5b787d5246aeaf5a8b99d74a299cd1194d6db3cf9697e3233e186
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var patternEl = document.getElementById("regexPattern");
      var flagsEl = document.getElementById("regexFlags");
      var replaceEl = document.getElementById("replacePattern");
      var sourceEl = document.getElementById("sourceText");
      var resultEl = document.getElementById("resultPreview");
      var statusEl = document.getElementById("status");
      var errorDetailEl = document.getElementById("errorDetail");
      var statsEl = document.getElementById("stats");
      var captureTableEl = document.getElementById("captureTable");
      var captureBodyEl = document.getElementById("captureBody");
      var patternWrapEl = document.getElementById("patternWrap");

      var LS_KEY = "regex_replace_tester_v1";

      function saveState() {
        try {
          localStorage.setItem(
            LS_KEY,
            JSON.stringify({
              pattern: patternEl.value,
              flags: flagsEl.value,
              replace: replaceEl.value,
              source: sourceEl.value
            })
          );
        } catch (e) {
          // ignore storage errors
        }
      }

      function loadState() {
        try {
          var raw = localStorage.getItem(LS_KEY);
          if (!raw) return false;
          var s = JSON.parse(raw);
          patternEl.value = s.pattern || "";
          flagsEl.value = s.flags || "";
          replaceEl.value = s.replace || "";
          sourceEl.value = s.source || "";
          return true;
        } catch (e) {
          return false;
        }
      }

      function loadFromUrl() {
        var hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          var s = JSON.parse(decodeURIComponent(atob(hash)));
          patternEl.value = s.pattern || "";
          flagsEl.value = s.flags || "";
          replaceEl.value = s.replace || "";
          sourceEl.value = s.source || "";
          return true;
        } catch (e) {
          return false;
        }
      }

      function saveToUrl() {
        try {
          var obj = {
            pattern: patternEl.value,
            flags: flagsEl.value,
            replace: replaceEl.value,
            source: sourceEl.value.slice(0, 1500)
          };
          var encoded = btoa(encodeURIComponent(JSON.stringify(obj)));
          history.replaceState(null, "", "#" + encoded);
        } catch (e) {
          // ignore
        }
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function escapeHtml(str) {
        return str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      }

      function buildResult() {
        var pattern = patternEl.value;
        var flags = flagsEl.value;
        var replacement = replaceEl.value;
        var source = sourceEl.value;

        errorDetailEl.textContent = "";
        errorDetailEl.classList.remove("show");
        patternWrapEl.classList.remove("error");

        if (!pattern) {
          resultEl.textContent = source;
          statsEl.classList.remove("show");
          captureTableEl.classList.remove("show");
          showStatus("请输入正则表达式");
          return;
        }

        var safeFlags = flags.replace(/[^gimsuy]/g, "");
        var regex;
        try {
          regex = new RegExp(pattern, safeFlags);
        } catch (e) {
          patternWrapEl.classList.add("error");
          errorDetailEl.textContent = "正则语法错误: " + e.message;
          errorDetailEl.classList.add("show");
          resultEl.textContent = source;
          statsEl.classList.remove("show");
          captureTableEl.classList.remove("show");
          showStatus("正则表达式错误", "error");
          return;
        }

        // Collect all matches using a global variant for iteration
        var allMatches = [];
        var globalFlags = safeFlags.indexOf("g") === -1 ? safeFlags + "g" : safeFlags;
        var searchRegex;
        try {
          searchRegex = new RegExp(pattern, globalFlags);
        } catch (e) {
          searchRegex = null;
        }

        if (searchRegex) {
          searchRegex.lastIndex = 0;
          var iterations = 0;
          var m;
          while ((m = searchRegex.exec(source)) !== null) {
            iterations++;
            allMatches.push({
              index: m.index,
              length: m[0].length,
              full: m[0],
              groups: Array.prototype.slice.call(m, 1)
            });
            if (m[0].length === 0) {
              searchRegex.lastIndex++;
            }
            if (iterations > 10000) break;
          }
        }

        // Compute replaced string
        var replaced;
        try {
          replaced = source.replace(regex, replacement);
        } catch (e) {
          replaced = source;
        }

        // Show replacement in result panel
        resultEl.textContent = replaced;

        // Update stats
        var groupCount = allMatches.length > 0 ? allMatches[0].groups.length : 0;
        document.getElementById("statMatches").textContent = allMatches.length;
        document.getElementById("statGroups").textContent = groupCount;
        document.getElementById("statReplaced").textContent = allMatches.length;
        statsEl.classList.add("show");

        // Build capture table
        if (allMatches.length > 0) {
          captureBodyEl.innerHTML = "";
          var limit = Math.min(allMatches.length, 200);
          for (var j = 0; j < limit; j++) {
            var am = allMatches[j];
            var tr = document.createElement("tr");

            var tdIdx = document.createElement("td");
            tdIdx.className = "match-index";
            tdIdx.textContent = j + 1;
            tr.appendChild(tdIdx);

            var tdFull = document.createElement("td");
            tdFull.textContent = am.full;
            tr.appendChild(tdFull);

            var tdGroups = document.createElement("td");
            tdGroups.className = "group-index";
            if (am.groups.length === 0) {
              tdGroups.textContent = "—";
            } else {
              tdGroups.textContent = am.groups
                .map(function (g, gi) {
                  return "$" + (gi + 1) + ": " + (g === undefined ? "undefined" : g);
                })
                .join("  |  ");
            }
            tr.appendChild(tdGroups);

            var tdPos = document.createElement("td");
            tdPos.className = "match-pos";
            tdPos.textContent = "pos " + am.index + "–" + (am.index + am.length - 1);
            tr.appendChild(tdPos);

            captureBodyEl.appendChild(tr);
          }
          captureTableEl.classList.add("show");
          if (allMatches.length > 200) {
            var infoRow = document.createElement("tr");
            var infoTd = document.createElement("td");
            infoTd.colSpan = 4;
            infoTd.style.textAlign = "center";
            infoTd.style.color = "var(--text-muted)";
            infoTd.textContent = "... 仅显示前 200 条（共 " + allMatches.length + " 条）";
            infoRow.appendChild(infoTd);
            captureBodyEl.appendChild(infoRow);
          }
        } else {
          captureTableEl.classList.remove("show");
        }

        if (allMatches.length === 0) {
          showStatus("无匹配");
        } else {
          showStatus("匹配 " + allMatches.length + " 处，已替换", "success");
        }
      }

      // Wire events
      patternEl.addEventListener("input", function () {
        saveState();
        saveToUrl();
        buildResult();
      });
      flagsEl.addEventListener("input", function () {
        saveState();
        saveToUrl();
        buildResult();
      });
      replaceEl.addEventListener("input", function () {
        saveState();
        saveToUrl();
        buildResult();
      });
      sourceEl.addEventListener("input", function () {
        saveState();
        saveToUrl();
        buildResult();
      });

      document.getElementById("btnCopy").onclick = async function () {
        if (!patternEl.value) {
          showStatus("无内容可复制", "error");
          return;
        }
        var text = sourceEl.value;
        try {
          var safeF = flagsEl.value.replace(/[^gimsuy]/g, "");
          var re = new RegExp(patternEl.value, safeF);
          text = sourceEl.value.replace(re, replaceEl.value);
        } catch (e) {
          // fall back to source
        }
        try {
          await navigator.clipboard.writeText(text);
          showStatus("已复制替换结果", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnShare").onclick = async function () {
        saveToUrl();
        try {
          await navigator.clipboard.writeText(location.href);
          showStatus("链接已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        patternEl.value = "";
        flagsEl.value = "";
        replaceEl.value = "";
        sourceEl.value = "";
        resultEl.textContent = "";
        errorDetailEl.textContent = "";
        errorDetailEl.classList.remove("show");
        statsEl.classList.remove("show");
        captureTableEl.classList.remove("show");
        patternWrapEl.classList.remove("error");
        statusEl.textContent = "";
        statusEl.className = "status";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
      };

      document.getElementById("btnExample1").onclick = function () {
        patternEl.value = "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}";
        flagsEl.value = "g";
        replaceEl.value = "[$&]";
        sourceEl.value =
          "联系我们：support@example.com\n销售：sales@company.org\n无效邮件：notanemail\n另一封：user.name+tag@sub.domain.co";
        saveState();
        saveToUrl();
        buildResult();
      };

      document.getElementById("btnExample2").onclick = function () {
        patternEl.value = "([A-Z])";
        flagsEl.value = "g";
        replaceEl.value = "-$1";
        sourceEl.value = "camelCaseString\ngetUserName\nparseHTMLContent\nmyVariableName";
        saveState();
        saveToUrl();
        buildResult();
      };

      document.getElementById("btnExample3").onclick = function () {
        patternEl.value = "(\\d{4})-(\\d{2})-(\\d{2})";
        flagsEl.value = "g";
        replaceEl.value = "$3/$2/$1";
        sourceEl.value = "今天的日期：2024-01-15\n会议时间：2024-03-22\n截止日期：2025-12-31";
        saveState();
        saveToUrl();
        buildResult();
      };

      // Init
      if (!loadFromUrl()) {
        loadState();
      }
      buildResult();

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
    
