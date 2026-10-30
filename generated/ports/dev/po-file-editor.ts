// @ts-nocheck
// Generated from tools/dev/po-file-editor.html
// Source SHA-256: f7fe5ab3348dc029ca572059ddb61ca60b3b40262be0fee3002b1c4267da19e4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      /* ───────────── PO file parser / serializer ───────────── */

      function parsePo(text) {
        var lines = text.split(/\r?\n/);
        var entries = [];
        var current = null;
        var currentKey = null;
        var i = 0;

        function flush() {
          if (current) entries.push(current);
          current = null;
          currentKey = null;
        }

        function newEntry() {
          flush();
          current = {
            comments: [],
            flags: [],
            msgid: "",
            msgidPlural: null,
            msgstr: "",
            msgstrPlural: []
          };
        }

        while (i < lines.length) {
          var line = lines[i];
          var trimmed = line.trim();

          if (trimmed === "") {
            flush();
            i++;
            continue;
          }

          if (/^#\s/.test(line) || line === "#") {
            if (!current) newEntry();
            current.comments.push(line);
            currentKey = null;
            i++;
            continue;
          }
          if (/^#[.:,|~]/.test(line)) {
            if (!current) newEntry();
            current.comments.push(line);
            if (/^#,/.test(line)) {
              var flagStr = line.slice(2).trim();
              current.flags = flagStr.split(/\s*,\s*/).map(function (f) {
                return f.trim();
              });
            }
            currentKey = null;
            i++;
            continue;
          }

          var msgidMatch = line.match(/^msgid\s+"(.*)"$/);
          if (msgidMatch) {
            if (!current) newEntry();
            current.msgid = unescapePo(msgidMatch[1]);
            currentKey = "msgid";
            i++;
            continue;
          }
          var msgidPluralMatch = line.match(/^msgid_plural\s+"(.*)"$/);
          if (msgidPluralMatch) {
            if (!current) newEntry();
            current.msgidPlural = unescapePo(msgidPluralMatch[1]);
            currentKey = "msgidPlural";
            i++;
            continue;
          }
          var msgstrMatch = line.match(/^msgstr\s+"(.*)"$/);
          if (msgstrMatch) {
            if (!current) newEntry();
            current.msgstr = unescapePo(msgstrMatch[1]);
            currentKey = "msgstr";
            i++;
            continue;
          }
          var msgstrPluralMatch = line.match(/^msgstr\[(\d+)\]\s+"(.*)"$/);
          if (msgstrPluralMatch) {
            if (!current) newEntry();
            var pidx = parseInt(msgstrPluralMatch[1], 10);
            current.msgstrPlural[pidx] = unescapePo(msgstrPluralMatch[2]);
            currentKey = "msgstrPlural:" + pidx;
            i++;
            continue;
          }
          var contMatch = line.match(/^"(.*)"$/);
          if (contMatch && current && currentKey) {
            var cont = unescapePo(contMatch[1]);
            if (currentKey === "msgid") {
              current.msgid += cont;
            } else if (currentKey === "msgidPlural") {
              current.msgidPlural += cont;
            } else if (currentKey === "msgstr") {
              current.msgstr += cont;
            } else if (currentKey && currentKey.indexOf("msgstrPlural:") === 0) {
              var pIdx = parseInt(currentKey.split(":")[1], 10);
              current.msgstrPlural[pIdx] = (current.msgstrPlural[pIdx] || "") + cont;
            }
            i++;
            continue;
          }

          i++;
        }
        flush();
        return entries;
      }

      function unescapePo(s) {
        return s
          .replace(/\\n/g, "\n")
          .replace(/\\t/g, "\t")
          .replace(/\\r/g, "\r")
          .replace(/\\"/g, '"')
          .replace(/\\\\/g, "\\");
      }

      function escapePo(s) {
        return s
          .replace(/\\/g, "\\\\")
          .replace(/"/g, '\\"')
          .replace(/\r/g, "\\r")
          .replace(/\n/g, "\\n")
          .replace(/\t/g, "\\t");
      }

      function serializePoString(label, value) {
        var escaped = escapePo(value);
        if (value.indexOf("\n") !== -1) {
          var parts = escaped.split("\\n");
          var out = label + ' ""\n';
          for (var k = 0; k < parts.length; k++) {
            var seg = parts[k] + (k < parts.length - 1 ? "\\n" : "");
            if (seg !== "" || k < parts.length - 1) {
              out += '"' + seg + '"\n';
            }
          }
          return out;
        }
        return label + ' "' + escaped + '"\n';
      }

      function serializeEntry(entry) {
        var out = "";
        if (entry.comments && entry.comments.length) {
          out += entry.comments.join("\n") + "\n";
        }
        out += serializePoString("msgid", entry.msgid);
        if (entry.msgidPlural !== null && entry.msgidPlural !== undefined) {
          out += serializePoString("msgid_plural", entry.msgidPlural);
          for (var j = 0; j < entry.msgstrPlural.length; j++) {
            out += serializePoString("msgstr[" + j + "]", entry.msgstrPlural[j] || "");
          }
        } else {
          out += serializePoString("msgstr", entry.msgstr);
        }
        return out;
      }

      function serializePo(entries) {
        return entries.map(serializeEntry).join("\n");
      }

      /* ───────────── App state ───────────── */
      var allEntries = [];
      var fileName = "translated.po";
      var filterMode = "all";
      var searchQ = "";
      var unsaved = false;

      /* ───────────── DOM refs ───────────── */
      var dropZone = document.getElementById("dropZone");
      var fileInput = document.getElementById("fileInput");
      var editorToolbar = document.getElementById("editorToolbar");
      var statsBar = document.getElementById("statsBar");
      var tableWrap = document.getElementById("tableWrap");
      var poTbody = document.getElementById("poTbody");
      var emptyState = document.getElementById("emptyState");
      var statusEl = document.getElementById("statusEl");
      var statTotal = document.getElementById("statTotal");
      var statDone = document.getElementById("statDone");
      var statLeft = document.getElementById("statLeft");
      var statPct = document.getElementById("statPct");

      /* ───────────── File loading ───────────── */
      dropZone.onclick = function () {
        fileInput.click();
      };
      dropZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropZone.classList.add("drag-over");
      });
      dropZone.addEventListener("dragleave", function () {
        dropZone.classList.remove("drag-over");
      });
      dropZone.addEventListener("drop", function (e) {
        e.preventDefault();
        dropZone.classList.remove("drag-over");
        var files = e.dataTransfer.files;
        if (files.length) loadFile(files[0]);
      });
      fileInput.addEventListener("change", function () {
        if (fileInput.files.length) loadFile(fileInput.files[0]);
      });

      function loadFile(file) {
        if (!file.name.match(/\.(po|pot)$/i)) {
          showStatus("请选择 .po 或 .pot 文件", "error");
          return;
        }
        fileName = file.name.replace(/\.pot$/i, ".po");
        var reader = new FileReader();
        reader.onload = function (ev) {
          try {
            allEntries = parsePo(ev.target.result);
            showEditor();
            renderTable();
            showStatus("已加载 " + file.name, "success");
          } catch (err) {
            showStatus("解析失败: " + err.message, "error");
          }
        };
        reader.readAsText(file, "utf-8");
      }

      function showEditor() {
        dropZone.style.display = "none";
        editorToolbar.style.display = "";
        statsBar.style.display = "";
        tableWrap.style.display = "";
      }

      /* ───────────── Table rendering ───────────── */
      function isTranslated(entry) {
        if (entry.msgid === "") return true;
        if (entry.msgidPlural !== null && entry.msgidPlural !== undefined) {
          return entry.msgstrPlural.some(function (s) {
            return s && s.trim() !== "";
          });
        }
        return entry.msgstr.trim() !== "";
      }

      function getVisibleEntries() {
        var q = searchQ.toLowerCase();
        return allEntries.filter(function (entry) {
          if (entry.msgid === "") return false;
          var done = isTranslated(entry);
          if (filterMode === "untranslated" && done) return false;
          if (filterMode === "translated" && !done) return false;
          if (q) {
            var inId = entry.msgid.toLowerCase().indexOf(q) !== -1;
            var inStr = entry.msgstr.toLowerCase().indexOf(q) !== -1;
            var inPlural = entry.msgstrPlural.some(function (s) {
              return s && s.toLowerCase().indexOf(q) !== -1;
            });
            if (!inId && !inStr && !inPlural) return false;
          }
          return true;
        });
      }

      function updateStats() {
        var nonHeader = allEntries.filter(function (e) {
          return e.msgid !== "";
        });
        var total = nonHeader.length;
        var done = nonHeader.filter(isTranslated).length;
        var left = total - done;
        var pct = total ? Math.round((done / total) * 100) : 0;
        statTotal.textContent = total;
        statDone.textContent = done;
        statLeft.textContent = left;
        statPct.textContent = pct + "%";
      }

      function buildMsgstrInputSingular(entry, tr, dot) {
        var ta = document.createElement("textarea");
        ta.className = "po-msgstr-input" + (entry.msgstr.trim() !== "" ? " filled" : "");
        ta.value = entry.msgstr;
        ta.rows = 3;
        ta.spellcheck = true;
        ta.placeholder = "输入译文…";
        ta.addEventListener("input", function () {
          entry.msgstr = ta.value;
          var filled = ta.value.trim() !== "";
          ta.classList.toggle("filled", filled);
          dot.classList.toggle("done", filled);
          tr.classList.toggle("untranslated", !filled);
          updateStats();
          setUnsaved();
        });
        return ta;
      }

      function buildMsgstrPluralInput(entry, pi) {
        var ta = document.createElement("textarea");
        var val = entry.msgstrPlural[pi] || "";
        ta.className = "po-msgstr-input" + (val.trim() !== "" ? " filled" : "");
        ta.value = val;
        ta.rows = 2;
        ta.spellcheck = true;
        ta.placeholder = "plural[" + pi + "]…";
        (function (index) {
          ta.addEventListener("input", function () {
            entry.msgstrPlural[index] = ta.value;
            ta.classList.toggle("filled", ta.value.trim() !== "");
            updateStats();
            setUnsaved();
          });
        })(pi);
        return ta;
      }

      function renderTable() {
        updateStats();
        var visible = getVisibleEntries();
        poTbody.innerHTML = "";

        if (visible.length === 0) {
          emptyState.style.display = "";
          return;
        }
        emptyState.style.display = "none";

        visible.forEach(function (entry, idx) {
          var done = isTranslated(entry);
          var tr = document.createElement("tr");
          if (!done) tr.classList.add("untranslated");

          var tdNum = document.createElement("td");
          tdNum.className = "col-num";
          tdNum.textContent = idx + 1;
          tr.appendChild(tdNum);

          var tdStatus = document.createElement("td");
          tdStatus.className = "col-status";
          var dot = document.createElement("span");
          dot.className = "status-dot" + (done ? " done" : "");
          dot.title = done ? "已翻译" : "未翻译";
          tdStatus.appendChild(dot);
          tr.appendChild(tdStatus);

          var tdId = document.createElement("td");
          tdId.className = "col-msgid";
          var idDiv = document.createElement("div");
          idDiv.className = "po-msgid-text";
          idDiv.textContent = entry.msgid;
          tdId.appendChild(idDiv);
          tr.appendChild(tdId);

          var tdStr = document.createElement("td");
          tdStr.className = "col-msgstr";

          if (entry.msgidPlural !== null && entry.msgidPlural !== undefined) {
            var numForms = Math.max(2, entry.msgstrPlural.length);
            for (var pi = 0; pi < numForms; pi++) {
              tdStr.appendChild(buildMsgstrPluralInput(entry, pi));
            }
          } else {
            tdStr.appendChild(buildMsgstrInputSingular(entry, tr, dot));
          }
          tr.appendChild(tdStr);

          var tdCmt = document.createElement("td");
          tdCmt.className = "col-comment";
          var cmt = document.createElement("div");
          cmt.className = "po-comment-text";
          var commentLines = (entry.comments || []).filter(function (c) {
            return /^#\s/.test(c) || c === "#";
          });
          cmt.textContent = commentLines
            .map(function (c) {
              return c.replace(/^#\s?/, "");
            })
            .join("\n");
          tdCmt.appendChild(cmt);
          tr.appendChild(tdCmt);

          poTbody.appendChild(tr);
        });
      }

      function setUnsaved() {
        if (!unsaved) {
          unsaved = true;
          showStatus("有未保存的修改", "");
        }
      }

      /* ───────────── Filters ───────────── */
      document.getElementById("btnShowAll").onclick = function () {
        filterMode = "all";
        updateFilterButtons();
        renderTable();
      };
      document.getElementById("btnShowUntranslated").onclick = function () {
        filterMode = "untranslated";
        updateFilterButtons();
        renderTable();
      };
      document.getElementById("btnShowTranslated").onclick = function () {
        filterMode = "translated";
        updateFilterButtons();
        renderTable();
      };

      function updateFilterButtons() {
        document.getElementById("btnShowAll").classList.toggle("btn-primary", filterMode === "all");
        document
          .getElementById("btnShowUntranslated")
          .classList.toggle("btn-primary", filterMode === "untranslated");
        document
          .getElementById("btnShowTranslated")
          .classList.toggle("btn-primary", filterMode === "translated");
      }

      var searchTimer = null;
      document.getElementById("searchInput").addEventListener("input", function () {
        clearTimeout(searchTimer);
        var val = this.value;
        searchTimer = setTimeout(function () {
          searchQ = val.trim();
          renderTable();
        }, 200);
      });

      /* ───────────── Download ───────────── */
      document.getElementById("btnDownload").onclick = function () {
        var content = serializePo(allEntries);
        var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        unsaved = false;
        showStatus("已下载 " + fileName, "success");
      };

      /* ───────────── Reset ───────────── */
      document.getElementById("btnReset").onclick = function () {
        allEntries = [];
        filterMode = "all";
        searchQ = "";
        unsaved = false;
        document.getElementById("searchInput").value = "";
        updateFilterButtons();
        dropZone.style.display = "";
        editorToolbar.style.display = "none";
        statsBar.style.display = "none";
        tableWrap.style.display = "none";
        fileInput.value = "";
        showStatus("", "");
      };

      /* ───────────── Status helper ───────────── */
      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      /* ───────────── Theme ───────────── */
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
    
