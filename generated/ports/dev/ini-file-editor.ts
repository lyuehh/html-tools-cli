// @ts-nocheck
// Generated from tools/dev/ini-file-editor.html
// Source SHA-256: 98090cb377261f38379b673e7df8ea48839802643e9b835d4553380c497c7c97
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // INI data model: array of sections
      // section: { name: string|null, entries: [ {type:'kv'|'comment', key, value, text} ] }
      var iniData = [];

      var inputAreaEl = document.getElementById("inputArea");
      var sectionListEl = document.getElementById("sectionList");
      var statusEl = document.getElementById("status");
      var errorDetailEl = document.getElementById("errorDetail");
      var statsEl = document.getElementById("stats");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function updateStats() {
        var totalKeys = 0;
        var totalComments = 0;
        iniData.forEach(function (sec) {
          sec.entries.forEach(function (e) {
            if (e.type === "kv") {
              totalKeys++;
            } else if (e.type === "comment") {
              totalComments++;
            }
          });
        });
        document.getElementById("statSections").textContent = iniData.length;
        document.getElementById("statKeys").textContent = totalKeys;
        document.getElementById("statComments").textContent = totalComments;
        statsEl.classList.add("show");
      }

      function parseINI(text) {
        var sections = [];
        var currentSection = { name: null, entries: [] };
        sections.push(currentSection);

        var lines = text.split(/\r?\n/);
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          var trimmed = line.trim();
          if (trimmed === "") {
            continue;
          }
          var sectionMatch = trimmed.match(/^\[([^\]]*)\]$/);
          if (sectionMatch) {
            currentSection = { name: sectionMatch[1], entries: [] };
            sections.push(currentSection);
            continue;
          }
          if (trimmed.charAt(0) === ";" || trimmed.charAt(0) === "#") {
            currentSection.entries.push({ type: "comment", text: trimmed });
            continue;
          }
          var eqIdx = trimmed.indexOf("=");
          if (eqIdx > 0) {
            var key = trimmed.slice(0, eqIdx).trim();
            var val = trimmed.slice(eqIdx + 1).trim();
            // Strip inline comment
            var inlineM = val.match(/^(.*?)\s*[;#]/);
            if (inlineM) {
              val = inlineM[1].trim();
            }
            currentSection.entries.push({ type: "kv", key: key, value: val });
            continue;
          }
          var colonIdx = trimmed.indexOf(":");
          if (colonIdx > 0) {
            var ckey = trimmed.slice(0, colonIdx).trim();
            var cval = trimmed.slice(colonIdx + 1).trim();
            currentSection.entries.push({ type: "kv", key: ckey, value: cval });
            continue;
          }
          currentSection.entries.push({ type: "comment", text: trimmed });
        }

        // Remove leading empty global section if no entries
        if (sections.length > 1 && sections[0].name === null && sections[0].entries.length === 0) {
          sections.shift();
        }
        return sections;
      }

      function serializeINI(data) {
        var lines = [];
        for (var si = 0; si < data.length; si++) {
          var sec = data[si];
          if (sec.name !== null) {
            lines.push("[" + sec.name + "]");
          }
          for (var ei = 0; ei < sec.entries.length; ei++) {
            var entry = sec.entries[ei];
            if (entry.type === "comment") {
              lines.push(entry.text);
            } else if (entry.type === "kv") {
              lines.push(entry.key + " = " + entry.value);
            }
          }
          lines.push("");
        }
        var result = lines.join("\n");
        return result.replace(/\n+$/, "\n");
      }

      function makeSectionBlock(sec, secIdx) {
        var block = document.createElement("div");
        block.className = "section-block";

        // Title row
        var titleRow = document.createElement("div");
        titleRow.className = "section-title-row";

        if (sec.name === null) {
          var globalLabel = document.createElement("span");
          globalLabel.className = "global-section-label";
          globalLabel.textContent = "(全局，无 section 头)";
          titleRow.appendChild(globalLabel);
        } else {
          var nameInput = document.createElement("input");
          nameInput.className = "section-name-input";
          nameInput.type = "text";
          nameInput.value = sec.name;
          nameInput.setAttribute("aria-label", "节名称");
          (function (s, inp) {
            inp.addEventListener("input", function () {
              s.name = inp.value;
              syncToText();
            });
          })(sec, nameInput);
          titleRow.appendChild(nameInput);

          var delSecBtn = document.createElement("button");
          delSecBtn.className = "btn-icon";
          delSecBtn.title = "删除此节";
          delSecBtn.setAttribute("aria-label", "删除节");
          delSecBtn.textContent = "\xd7";
          (function (idx) {
            delSecBtn.addEventListener("click", function () {
              iniData.splice(idx, 1);
              renderEditor();
              syncToText();
              showStatus("节已删除", "success");
            });
          })(secIdx);
          titleRow.appendChild(delSecBtn);
        }
        block.appendChild(titleRow);

        // KV table
        var table = document.createElement("table");
        table.className = "kv-table";
        var tbody = document.createElement("tbody");

        for (var ei = 0; ei < sec.entries.length; ei++) {
          var entry = sec.entries[ei];
          var tr = document.createElement("tr");

          if (entry.type === "comment") {
            tr.className = "comment-row";
            var tdC = document.createElement("td");
            tdC.colSpan = 3;
            tdC.textContent = entry.text;
            tr.appendChild(tdC);
          } else {
            var tdKey = document.createElement("td");
            var keyInput = document.createElement("input");
            keyInput.className = "kv-input kv-key";
            keyInput.type = "text";
            keyInput.value = entry.key;
            keyInput.setAttribute("aria-label", "键名");
            (function (e, inp) {
              inp.addEventListener("input", function () {
                e.key = inp.value;
                syncToText();
              });
            })(entry, keyInput);
            tdKey.appendChild(keyInput);
            tr.appendChild(tdKey);

            var tdVal = document.createElement("td");
            var valInput = document.createElement("input");
            valInput.className = "kv-input";
            valInput.type = "text";
            valInput.value = entry.value;
            valInput.setAttribute("aria-label", "值");
            (function (e, inp) {
              inp.addEventListener("input", function () {
                e.value = inp.value;
                syncToText();
              });
            })(entry, valInput);
            tdVal.appendChild(valInput);
            tr.appendChild(tdVal);

            var tdDel = document.createElement("td");
            var delBtn = document.createElement("button");
            delBtn.className = "btn-icon";
            delBtn.title = "删除此键值对";
            delBtn.setAttribute("aria-label", "删除键值对");
            delBtn.textContent = "\xd7";
            (function (s, idx) {
              delBtn.addEventListener("click", function () {
                s.entries.splice(idx, 1);
                renderEditor();
                syncToText();
              });
            })(sec, ei);
            tdDel.appendChild(delBtn);
            tr.appendChild(tdDel);
          }
          tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        block.appendChild(table);

        // Add KV button
        var addKvBtn = document.createElement("button");
        addKvBtn.className = "btn-add-kv";
        addKvBtn.textContent = "+ 添加键值对";
        (function (s) {
          addKvBtn.addEventListener("click", function () {
            s.entries.push({ type: "kv", key: "key", value: "value" });
            renderEditor();
            syncToText();
          });
        })(sec);
        block.appendChild(addKvBtn);

        return block;
      }

      function renderEditor() {
        sectionListEl.innerHTML = "";
        if (iniData.length === 0) {
          var hint = document.createElement("p");
          hint.className = "editor-empty-hint";
          hint.textContent =
            "暂无内容，请粘贴 INI 文本后点击「解析」，或点击「+ 添加节」开始编辑。";
          sectionListEl.appendChild(hint);
        } else {
          for (var i = 0; i < iniData.length; i++) {
            sectionListEl.appendChild(makeSectionBlock(iniData[i], i));
          }
        }
        updateStats();
      }

      function syncToText() {
        inputAreaEl.value = serializeINI(iniData);
      }

      function parseAndRender() {
        var text = inputAreaEl.value;
        if (!text.trim()) {
          showStatus("请先输入 INI 内容", "error");
          return;
        }
        errorDetailEl.classList.remove("show");
        try {
          iniData = parseINI(text);
          renderEditor();
          showStatus("解析成功，共 " + iniData.length + " 个节", "success");
        } catch (err) {
          errorDetailEl.textContent = "解析失败：" + err.message;
          errorDetailEl.classList.add("show");
          showStatus("解析失败", "error");
        }
      }

      document.getElementById("btnLoad").onclick = parseAndRender;

      document.getElementById("btnPaste").onclick = async function () {
        try {
          var text = await navigator.clipboard.readText();
          inputAreaEl.value = text;
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnAddSection").onclick = function () {
        iniData.push({ name: "new_section", entries: [] });
        renderEditor();
        syncToText();
        showStatus("已添加新节", "success");
      };

      document.getElementById("btnCopy").onclick = async function () {
        var text = serializeINI(iniData);
        if (!text.trim()) {
          showStatus("没有内容可复制", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(text);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnDownload").onclick = function () {
        var text = serializeINI(iniData);
        if (!text.trim()) {
          showStatus("没有内容可下载", "error");
          return;
        }
        var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "config.ini";
        a.click();
        URL.revokeObjectURL(url);
        showStatus("已下载 config.ini", "success");
      };

      document.getElementById("btnClear").onclick = function () {
        inputAreaEl.value = "";
        iniData = [];
        renderEditor();
        errorDetailEl.classList.remove("show");
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
      };

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          parseAndRender();
        }
      });

      renderEditor();

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
    
