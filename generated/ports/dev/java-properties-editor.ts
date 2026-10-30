// @ts-nocheck
// Generated from tools/dev/java-properties-editor.html
// Source SHA-256: d95b6e98cb6b10a3a1447c85d86609ec765e79f0c719f2f77b0d1f03afeea81f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ===== .properties parser / serializer =====

      /**
       * Decode \uXXXX escape sequences to readable characters.
       */
      function decodeUnicode(str) {
        return str.replace(/\\u([0-9a-fA-F]{4})/g, function (_, hex) {
          return String.fromCharCode(parseInt(hex, 16));
        });
      }

      /**
       * Encode non-ASCII chars to \uXXXX.
       */
      function encodeUnicode(str) {
        var out = "";
        for (var i = 0; i < str.length; i++) {
          var c = str.charCodeAt(i);
          if (c > 127) {
            out += "\\u" + c.toString(16).padStart(4, "0");
          } else {
            out += str[i];
          }
        }
        return out;
      }

      /**
       * Escape a value for .properties output.
       */
      function escapeValue(val) {
        return val
          .replace(/\\/g, "\\\\")
          .replace(/\n/g, "\\n")
          .replace(/\r/g, "\\r")
          .replace(/\t/g, "\\t");
      }

      /**
       * Unescape a raw .properties value for display.
       */
      function unescapeValue(val) {
        return val
          .replace(/\\n/g, "\n")
          .replace(/\\r/g, "\r")
          .replace(/\\t/g, "\t")
          .replace(/\\\\/g, "\\")
          .replace(/\\=/g, "=")
          .replace(/\\:/g, ":");
      }

      /**
       * Count \uXXXX occurrences in a string.
       */
      function countUnicodeEscapes(str) {
        var m = str.match(/\\u[0-9a-fA-F]{4}/g);
        return m ? m.length : 0;
      }

      /**
       * Parse a .properties text into an array of row objects.
       */
      function parseProperties(text) {
        var lines = text.split(/\r?\n/);
        var rows = [];
        var i = 0;
        while (i < lines.length) {
          var line = lines[i];
          var trimmed = line.trim();
          if (trimmed === "") {
            rows.push({ type: "empty", lineNum: i + 1 });
            i++;
            continue;
          }
          if (trimmed[0] === "#" || trimmed[0] === "!") {
            rows.push({ type: "comment", comment: trimmed, lineNum: i + 1 });
            i++;
            continue;
          }
          // Handle continuation lines (ending with odd backslashes)
          var fullLine = trimmed;
          while (fullLine.endsWith("\\") && fullLine.match(/\\+$/)[0].length % 2 === 1) {
            i++;
            if (i >= lines.length) break;
            fullLine = fullLine.slice(0, -1) + lines[i].trim();
          }
          // Split on first unescaped = or :
          var sepIdx = -1;
          for (var j = 0; j < fullLine.length; j++) {
            if (fullLine[j] === "\\") {
              j++;
              continue;
            }
            if (fullLine[j] === "=" || fullLine[j] === ":") {
              sepIdx = j;
              break;
            }
            if (fullLine[j] === " " || fullLine[j] === "\t") {
              if (sepIdx === -1) sepIdx = j;
            } else if (sepIdx !== -1) {
              break;
            }
          }
          var key, rawVal;
          if (sepIdx === -1) {
            key = fullLine;
            rawVal = "";
          } else {
            key = fullLine.slice(0, sepIdx).trimEnd();
            rawVal = fullLine.slice(sepIdx + 1).trimStart();
          }
          rows.push({ type: "kv", key: key, rawValue: rawVal, lineNum: i + 1 });
          i++;
        }
        return rows;
      }

      /**
       * Serialize rows back to .properties text.
       */
      function serializeProperties(rows) {
        return rows
          .map(function (row) {
            if (row.type === "empty") return "";
            if (row.type === "comment") return row.comment;
            return (row.key || "") + "=" + (row.rawValue || "");
          })
          .join("\n");
      }

      // ===== State =====
      var rows = [];
      var LS_KEY = "java_props_editor_v1";

      // ===== DOM refs =====
      var propsBody = document.getElementById("propsBody");
      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");
      var searchInput = document.getElementById("searchInput");
      var searchCount = document.getElementById("searchCount");
      var showCommentsEl = document.getElementById("showComments");
      var showEmptyEl = document.getElementById("showEmpty");
      var autoUnicodeEl = document.getElementById("autoUnicode");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function updateStats() {
        var kvCount = 0;
        var commentCount = 0;
        var unicodeCount = 0;
        rows.forEach(function (row) {
          if (row.type === "kv") {
            kvCount++;
            unicodeCount += countUnicodeEscapes(row.rawValue || "");
          } else if (row.type === "comment") {
            commentCount++;
          }
        });
        document.getElementById("statKv").textContent = kvCount;
        document.getElementById("statComments").textContent = commentCount;
        document.getElementById("statUnicode").textContent = unicodeCount;
        statsEl.classList.add("show");
      }

      function renderTable() {
        var searchTerm = searchInput.value.toLowerCase();
        var showComm = showCommentsEl.checked;
        var showEmp = showEmptyEl.checked;
        var matchCount = 0;

        propsBody.innerHTML = "";
        rows.forEach(function (row, idx) {
          var tr = document.createElement("tr");

          var hidden = false;
          if (row.type === "comment" && !showComm) hidden = true;
          if (row.type === "empty" && !showEmp) hidden = true;

          if (searchTerm && !hidden) {
            if (row.type === "kv") {
              var keyMatch = (row.key || "").toLowerCase().includes(searchTerm);
              var valDecoded = decodeUnicode(unescapeValue(row.rawValue || "")).toLowerCase();
              var valMatch = valDecoded.includes(searchTerm);
              var rawMatch = (row.rawValue || "").toLowerCase().includes(searchTerm);
              if (!keyMatch && !valMatch && !rawMatch) hidden = true;
            } else if (row.type === "comment") {
              if (!(row.comment || "").toLowerCase().includes(searchTerm)) hidden = true;
            } else {
              hidden = true;
            }
          }

          if (hidden) {
            tr.classList.add("hidden-row");
          } else if (row.type === "kv") {
            matchCount++;
          }

          // Line number cell
          var tdLine = document.createElement("td");
          tdLine.className = "col-line";
          tdLine.textContent = row.lineNum;
          tr.appendChild(tdLine);

          // Type badge cell
          var tdType = document.createElement("td");
          tdType.className = "col-type";
          var badge = document.createElement("span");
          badge.className = "type-badge";
          if (row.type === "kv") {
            badge.className += " type-kv";
            badge.textContent = "KV";
          } else if (row.type === "comment") {
            badge.className += " type-comment";
            badge.textContent = "#!";
            tr.classList.add("is-comment");
          } else {
            badge.className += " type-empty";
            badge.textContent = "∅";
          }
          tdType.appendChild(badge);
          tr.appendChild(tdType);

          // Key cell
          var tdKey = document.createElement("td");
          tdKey.className = "col-key";

          // Value cell (may be replaced for comment/empty)
          var tdVal = document.createElement("td");
          tdVal.className = "col-value";

          if (row.type === "kv") {
            var keyInput = document.createElement("input");
            keyInput.type = "text";
            keyInput.className = "cell-input";
            keyInput.value = row.key || "";
            keyInput.placeholder = "键";
            keyInput.spellcheck = false;
            (function (i) {
              keyInput.addEventListener("input", function () {
                rows[i].key = keyInput.value;
                saveToStorage();
              });
            })(idx);
            tdKey.appendChild(keyInput);

            var valDecoded = decodeUnicode(unescapeValue(row.rawValue || ""));
            var hasUni = countUnicodeEscapes(row.rawValue || "") > 0;
            if (hasUni) {
              var uniIndicator = document.createElement("span");
              uniIndicator.className = "unicode-indicator";
              uniIndicator.title = "含 Unicode 转义";
              uniIndicator.textContent = "\\u";
              tdVal.appendChild(uniIndicator);
            }
            var valInput = document.createElement("input");
            valInput.type = "text";
            valInput.className = "cell-input";
            valInput.value = valDecoded;
            valInput.placeholder = "值";
            valInput.spellcheck = false;
            (function (i, vi) {
              vi.addEventListener("input", function () {
                var displayVal = vi.value;
                if (autoUnicodeEl.checked) {
                  rows[i].rawValue = escapeValue(encodeUnicode(displayVal));
                } else {
                  rows[i].rawValue = escapeValue(displayVal);
                }
                saveToStorage();
              });
            })(idx, valInput);
            tdVal.appendChild(valInput);
          } else if (row.type === "comment") {
            var commInput = document.createElement("input");
            commInput.type = "text";
            commInput.className = "cell-comment";
            commInput.value = row.comment || "";
            commInput.spellcheck = false;
            commInput.style.width = "100%";
            (function (i) {
              commInput.addEventListener("input", function () {
                rows[i].comment = commInput.value;
                saveToStorage();
              });
            })(idx);
            tdKey.colSpan = 2;
            tdKey.appendChild(commInput);
            tdVal = null;
          } else {
            var emptySpan = document.createElement("span");
            emptySpan.className = "cell-empty";
            emptySpan.textContent = "(空行)";
            tdKey.colSpan = 2;
            tdKey.appendChild(emptySpan);
            tdVal = null;
          }

          tr.appendChild(tdKey);
          if (tdVal) tr.appendChild(tdVal);

          // Delete action cell
          var tdAct = document.createElement("td");
          tdAct.className = "col-actions";
          var btnDel = document.createElement("button");
          btnDel.className = "btn-icon";
          btnDel.title = "删除此行";
          btnDel.textContent = "×";
          (function (i) {
            btnDel.addEventListener("click", function () {
              rows.splice(i, 1);
              reassignLineNums();
              renderTable();
              updateStats();
              saveToStorage();
              showStatus("已删除第 " + (i + 1) + " 行", "");
            });
          })(idx);
          tdAct.appendChild(btnDel);
          tr.appendChild(tdAct);

          propsBody.appendChild(tr);
        });

        if (searchTerm) {
          searchCount.textContent = "匹配 " + matchCount + " 个键值对";
          searchCount.className = "status";
        } else {
          searchCount.textContent = "";
        }
      }

      function reassignLineNums() {
        rows.forEach(function (row, i) {
          row.lineNum = i + 1;
        });
      }

      function loadText(text) {
        rows = parseProperties(text);
        renderTable();
        updateStats();
        saveToStorage();
        showStatus("已加载 " + rows.length + " 行", "success");
      }

      function getRawText() {
        return serializeProperties(rows);
      }

      function saveToStorage() {
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(rows));
        } catch (e) {
          // ignore quota errors
        }
      }

      function loadFromStorage() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            rows = JSON.parse(saved);
            renderTable();
            updateStats();
          }
        } catch (e) {
          rows = [];
        }
      }

      // ===== Button handlers =====

      document.getElementById("btnPaste").onclick = async function () {
        try {
          var text = await navigator.clipboard.readText();
          loadText(text);
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnLoad").onclick = function () {
        document.getElementById("fileInput").click();
      };

      document.getElementById("fileInput").onchange = function (e) {
        var file = e.target.files && e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (ev) {
          loadText(ev.target.result);
        };
        reader.readAsText(file, "UTF-8");
        e.target.value = "";
      };

      document.getElementById("btnUnicodeDecode").onclick = function () {
        var changed = 0;
        rows.forEach(function (row) {
          if (row.type === "kv" && countUnicodeEscapes(row.rawValue || "") > 0) {
            row.rawValue = decodeUnicode(row.rawValue);
            changed++;
          }
        });
        renderTable();
        updateStats();
        saveToStorage();
        showStatus("已解码 " + changed + " 个含 Unicode 转义的值", "success");
      };

      document.getElementById("btnUnicodeEncode").onclick = function () {
        var changed = 0;
        rows.forEach(function (row) {
          if (row.type === "kv") {
            var decoded = decodeUnicode(unescapeValue(row.rawValue || ""));
            var encoded = encodeUnicode(decoded);
            if (encoded !== decoded) {
              row.rawValue = escapeValue(encoded);
              changed++;
            }
          }
        });
        renderTable();
        updateStats();
        saveToStorage();
        showStatus("已编码 " + changed + " 行中的非 ASCII 字符", "success");
      };

      document.getElementById("btnDownload").onclick = function () {
        var text = getRawText();
        var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "application.properties";
        a.click();
        URL.revokeObjectURL(url);
        showStatus("已下载", "success");
      };

      document.getElementById("btnCopyRaw").onclick = async function () {
        var text = getRawText();
        try {
          await navigator.clipboard.writeText(text);
          showStatus("已复制原文到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        rows = [];
        renderTable();
        updateStats();
        localStorage.removeItem(LS_KEY);
        showStatus("已清空", "");
      };

      document.getElementById("btnAddRow").onclick = function () {
        rows.push({ type: "kv", key: "", rawValue: "", lineNum: rows.length + 1 });
        reassignLineNums();
        renderTable();
        updateStats();
        saveToStorage();
        var allInputs = propsBody.querySelectorAll(".cell-input");
        if (allInputs.length > 0) allInputs[allInputs.length - 2].focus();
      };

      searchInput.addEventListener("input", function () {
        renderTable();
      });

      showCommentsEl.addEventListener("change", function () {
        renderTable();
      });

      showEmptyEl.addEventListener("change", function () {
        renderTable();
      });

      // ===== Init =====
      loadFromStorage();
      if (rows.length === 0) {
        var demo = [
          "# Java .properties 示例文件",
          "# 本工具支持 Unicode 转义自动处理",
          "",
          "app.name=WebUtils",
          "app.version=2.0.0",
          "app.description=\\u7eaf\\u524d\\u7aef\\u5de5\\u5177\\u96c6",
          "",
          "# i18n \\u793a\\u4f8b",
          "greeting.hello=\\u4f60\\u597d",
          "greeting.welcome=\\u6b22\\u8fce\\u4f7f\\u7528",
          "",
          "server.host=localhost",
          "server.port=8080",
          "server.debug=false"
        ].join("\n");
        loadText(demo);
      }

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
    
