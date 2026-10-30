// @ts-nocheck
// Generated from tools/dev/glob-tester.html
// Source SHA-256: 4aa5a3e88832f91e0b90f608a9f6f1729e383434242043957d11a5a3a11bbe8e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function globToRegExp(pattern) {
        var source = "";
        for (var i = 0; i < pattern.length; i++) {
          var char = pattern[i];
          var next = pattern[i + 1];
          if (char === "*" && next === "*") {
            source += ".*";
            i++;
          } else if (char === "*") {
            source += "[^/]*";
          } else if (char === "?") {
            source += "[^/]";
          } else if (char === "{") {
            var end = pattern.indexOf("}", i + 1);
            if (end === -1) {
              source += "\\{";
            } else {
              source +=
                "(" +
                pattern
                  .slice(i + 1, end)
                  .split(",")
                  .map(function (part) {
                    return part.trim().replace(/[.+^${}()|[\]\\]/g, "\\$&");
                  })
                  .join("|") +
                ")";
              i = end;
            }
          } else {
            source += char.replace(/[.+^${}()|[\]\\]/g, "\\$&");
          }
        }
        return new RegExp("^" + source + "$", "u");
      }

      function picomatch(pattern) {
        var negate = pattern.charAt(0) === "!";
        var regex = globToRegExp(negate ? pattern.slice(1) : pattern);
        return function (value) {
          var matched = regex.test(value);
          return negate ? !matched : matched;
        };
      }

      var patternEl = document.getElementById("pattern");
      var pathsEl = document.getElementById("paths");
      var explanationEl = document.getElementById("explanation");
      var resultsListEl = document.getElementById("resultsList");
      var totalCountEl = document.getElementById("totalCount");
      var matchedCountEl = document.getElementById("matchedCount");
      var unmatchedCountEl = document.getElementById("unmatchedCount");

      var LS_KEY = "glob_tester_v1";

      window.escapeHtml = function (text) {
        var div = document.createElement("div");
        div.textContent = text;
        return div.textContent;
      };

      function createCodeElement(text) {
        var code = document.createElement("code");
        code.textContent = text;
        return code;
      }

      function explainPattern(pattern) {
        explanationEl.classList.remove("error");

        if (!pattern) {
          explanationEl.textContent = "输入 glob 模式后将显示模式说明";
          return;
        }

        var fragment = document.createDocumentFragment();
        var parts = [];
        var isNegation = pattern.startsWith("!");
        var p = isNegation ? pattern.slice(1) : pattern;

        if (isNegation) {
          parts.push({ text: "排除（否定）模式" });
        }

        if (p.includes("**")) {
          parts.push({ text: "任意层级目录", code: "**" });
        }

        if (/(?<!\*)\*(?!\*)/.test(p)) {
          parts.push({ text: "任意字符（不含路径分隔符）", code: "*" });
        }

        if (p.includes("?")) {
          parts.push({ text: "单个字符", code: "?" });
        }

        var bracketMatch = p.match(/\[([^\]]+)\]/);
        if (bracketMatch) {
          if (bracketMatch[1].includes("-")) {
            parts.push({ text: "字符范围", code: "[" + bracketMatch[1] + "]" });
          } else {
            parts.push({ text: "其中任意一个字符", code: "[" + bracketMatch[1] + "]" });
          }
        }

        var braceMatch = p.match(/\{([^}]+)\}/);
        if (braceMatch) {
          var options = braceMatch[1].split(",").map(function (o) {
            return o.trim();
          });
          parts.push({ text: "匹配 " + options.join(" 或 "), code: "{...}" });
        }

        var extMatch = p.match(/\*\.(\w+)$/);
        if (extMatch && !braceMatch) {
          parts.push({ text: "扩展名", code: "." + extMatch[1] });
        }

        if (parts.length === 0) {
          parts.push({ text: "精确匹配", code: pattern });
        }

        explanationEl.textContent = "";
        parts.forEach(function (part, index) {
          if (index > 0) {
            explanationEl.appendChild(document.createTextNode("，"));
          }
          if (part.code) {
            explanationEl.appendChild(createCodeElement(part.code));
            explanationEl.appendChild(document.createTextNode(" " + part.text));
          } else {
            explanationEl.appendChild(document.createTextNode(part.text));
          }
        });
      }

      function createResultItem(path, matched) {
        var item = document.createElement("div");
        item.className = "result-item " + (matched ? "matched" : "unmatched");

        var icon = document.createElement("span");
        icon.className = "result-icon";
        icon.textContent = matched ? "✓" : "✗";

        var pathSpan = document.createElement("span");
        pathSpan.className = "result-path";
        pathSpan.textContent = path;

        item.appendChild(icon);
        item.appendChild(pathSpan);

        return item;
      }

      function runTest() {
        var pattern = patternEl.value.trim();
        var pathsText = pathsEl.value.trim();

        explainPattern(pattern);

        if (!pathsText) {
          resultsListEl.textContent = "";
          var noPathsDiv = document.createElement("div");
          noPathsDiv.className = "no-paths";
          noPathsDiv.textContent = "请输入文件路径进行测试";
          resultsListEl.appendChild(noPathsDiv);
          totalCountEl.textContent = "0";
          matchedCountEl.textContent = "0";
          unmatchedCountEl.textContent = "0";
          return;
        }

        var paths = pathsText
          .split("\n")
          .map(function (p) {
            return p.trim();
          })
          .filter(function (p) {
            return p.length > 0;
          });

        if (paths.length === 0) {
          resultsListEl.textContent = "";
          var noPathsDiv = document.createElement("div");
          noPathsDiv.className = "no-paths";
          noPathsDiv.textContent = "请输入文件路径进行测试";
          resultsListEl.appendChild(noPathsDiv);
          totalCountEl.textContent = "0";
          matchedCountEl.textContent = "0";
          unmatchedCountEl.textContent = "0";
          return;
        }

        var isMatch;
        try {
          if (pattern) {
            isMatch = picomatch(pattern, { dot: true });
          } else {
            isMatch = function () {
              return false;
            };
          }
        } catch (e) {
          explanationEl.textContent = "模式语法错误: " + e.message;
          explanationEl.classList.add("error");
          return;
        }

        var matchedCount = 0;
        var unmatchedCount = 0;
        var fragment = document.createDocumentFragment();

        paths.forEach(function (path) {
          var matched = false;
          try {
            matched = isMatch(path);
          } catch (e) {
            matched = false;
          }

          if (matched) {
            matchedCount++;
          } else {
            unmatchedCount++;
          }

          fragment.appendChild(createResultItem(path, matched));
        });

        resultsListEl.textContent = "";
        resultsListEl.appendChild(fragment);
        totalCountEl.textContent = paths.length;
        matchedCountEl.textContent = matchedCount;
        unmatchedCountEl.textContent = unmatchedCount;

        saveToStorage();
        saveToUrl();
      }

      window.loadFromUrl = function () {
        var hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          var data = JSON.parse(decodeURIComponent(atob(hash)));
          patternEl.value = data.p || "";
          pathsEl.value = data.t || "";
          return true;
        } catch (e) {
          return false;
        }
      };

      function saveToUrl() {
        try {
          var data = {
            p: patternEl.value,
            t: pathsEl.value
          };
          var encoded = btoa(encodeURIComponent(JSON.stringify(data)));
          if (encoded.length < 2000) {
            history.replaceState(null, "", "#" + encoded);
          }
        } catch (e) {}
      }

      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            var data = JSON.parse(saved);
            patternEl.value = data.p || "";
            pathsEl.value = data.t || "";
          } catch (e) {}
        }
      }

      function saveToStorage() {
        var data = {
          p: patternEl.value,
          t: pathsEl.value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function showStatus(msg) {
        var statusEl = document.createElement("div");
        statusEl.className = "toast";
        statusEl.textContent = msg;
        document.body.appendChild(statusEl);
        setTimeout(function () {
          statusEl.remove();
        }, 2000);
      }

      document.getElementById("btnPaste").onclick = async function () {
        try {
          var text = await navigator.clipboard.readText();
          pathsEl.value = text;
          runTest();
          showStatus("已粘贴");
        } catch (e) {
          showStatus("无法访问剪贴板");
        }
      };

      document.getElementById("btnShare").onclick = async function () {
        saveToUrl();
        try {
          await navigator.clipboard.writeText(location.href);
          showStatus("分享链接已复制");
        } catch (e) {
          showStatus("复制失败");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        patternEl.value = "";
        pathsEl.value = "";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
        runTest();
        showStatus("已清空");
      };

      patternEl.addEventListener("input", runTest);
      pathsEl.addEventListener("input", runTest);

      var presetBtns = document.querySelectorAll(".preset-btn");
      for (var i = 0; i < presetBtns.length; i++) {
        presetBtns[i].addEventListener("click", function () {
          patternEl.value = this.dataset.pattern;
          runTest();
        });
      }

      if (!loadFromUrl()) {
        loadFromStorage();
      }
      runTest();

      window.toggleTheme = function () {
        var html = document.documentElement;
        var btn = document.querySelector(".theme-toggle");
        var current = html.getAttribute("data-theme");
        var next = current === "light" ? "dark" : "light";

        if (next === "light") {
          html.setAttribute("data-theme", "light");
          btn.textContent = "☀️";
        } else {
          html.removeAttribute("data-theme");
          btn.textContent = "🌙";
        }
        localStorage.setItem("theme", next);
      };

      (function () {
        var saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.documentElement.setAttribute("data-theme", "light");
          var btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = "☀️";
        }
      })();
    
