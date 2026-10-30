// @ts-nocheck
// Generated from tools/text/vigenere-cipher.html
// Source SHA-256: 94bbf5feb76f48a80b3410fbd84e7bf28be8eb1d7468d85ab7c84412b6e2111d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var keyInputEl = document.getElementById("keyInput");
      var inputTextEl = document.getElementById("inputText");
      var outputTextEl = document.getElementById("outputText");
      var statusMsgEl = document.getElementById("statusMsg");
      var statRowEl = document.getElementById("statRow");
      var modeSelectEl = document.getElementById("modeSelect");
      var preserveCaseEl = document.getElementById("preserveCase");
      var skipNonAlphaEl = document.getElementById("skipNonAlpha");

      var LS_KEY_TEXT = "vigenere_input_v1";
      var LS_KEY_KEY = "vigenere_key_v1";
      var tableVisible = true;
      var hlRow = -1;
      var hlCol = -1;

      // ── Vigenère core ──────────────────────────────────────────────────────
      function getCleanKey() {
        return keyInputEl.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
      }

      function vigenereProcess(text, key, encrypt) {
        if (!key) return null;
        var preserveCase = preserveCaseEl.checked;
        var skipNonAlpha = skipNonAlphaEl.checked;
        var result = [];
        var ki = 0;
        for (var i = 0; i < text.length; i++) {
          var ch = text[i];
          var isUpper = ch >= "A" && ch <= "Z";
          var isLower = ch >= "a" && ch <= "z";
          if (!isUpper && !isLower) {
            if (skipNonAlpha) {
              result.push(ch);
            }
            continue;
          }
          var base = isUpper ? 65 : 97;
          var plain = ch.charCodeAt(0) - base;
          var shift = key.charCodeAt(ki % key.length) - 65;
          ki++;
          var coded = encrypt ? (plain + shift + 26) % 26 : (plain - shift + 26) % 26;
          var outBase = preserveCase ? base : 65;
          result.push(String.fromCharCode(outBase + coded));
        }
        return result.join("");
      }

      function showStatus(msg, type) {
        statusMsgEl.textContent = msg;
        statusMsgEl.className = "status " + (type || "");
      }

      function updateStats(text, key) {
        var letters = (text.match(/[a-zA-Z]/g) || []).length;
        document.getElementById("statLetters").textContent = letters;
        document.getElementById("statKeyLen").textContent = key.length;
        document.getElementById("statTotal").textContent = text.length;
        statRowEl.style.display = letters > 0 ? "flex" : "none";
      }

      function runProcess(encrypt) {
        var text = inputTextEl.value;
        var key = getCleanKey();
        if (!key) {
          showStatus("请输入有效密钥（仅英文字母）", "error");
          keyInputEl.classList.add("key-error");
          return;
        }
        keyInputEl.classList.remove("key-error");
        if (!text) {
          showStatus("请输入文本", "error");
          return;
        }
        var result = vigenereProcess(text, key, encrypt);
        if (result === null) {
          showStatus("密钥无效", "error");
          return;
        }
        outputTextEl.value = result;
        updateStats(text, key);
        showStatus(encrypt ? "加密完成" : "解密完成", "success");
        saveState();
      }

      // ── Table ──────────────────────────────────────────────────────────────
      function buildTable() {
        var tbl = document.getElementById("vigenereTable");
        tbl.innerHTML = "";

        var thead = document.createElement("thead");
        var headerRow = document.createElement("tr");
        var cornerTh = document.createElement("th");
        cornerTh.textContent = "K\\P";
        cornerTh.style.fontSize = "0.5rem";
        headerRow.appendChild(cornerTh);
        for (var c = 0; c < 26; c++) {
          var th = document.createElement("th");
          th.textContent = String.fromCharCode(65 + c);
          headerRow.appendChild(th);
        }
        thead.appendChild(headerRow);
        tbl.appendChild(thead);

        var tbody = document.createElement("tbody");
        for (var r = 0; r < 26; r++) {
          var tr = document.createElement("tr");
          var rowTh = document.createElement("th");
          rowTh.textContent = String.fromCharCode(65 + r);
          tr.appendChild(rowTh);
          for (var col = 0; col < 26; col++) {
            var td = document.createElement("td");
            td.textContent = String.fromCharCode(65 + ((r + col) % 26));
            td.dataset.row = r;
            td.dataset.col = col;
            tr.appendChild(td);
          }
          tbody.appendChild(tr);
        }
        tbl.appendChild(tbody);
        tbl.addEventListener("click", handleTableClick);
      }

      function handleTableClick(e) {
        var td = e.target.closest("td");
        if (!td || td.dataset.row === undefined) return;
        var r = parseInt(td.dataset.row, 10);
        var c = parseInt(td.dataset.col, 10);
        if (hlRow === r && hlCol === c) {
          hlRow = -1;
          hlCol = -1;
        } else {
          hlRow = r;
          hlCol = c;
        }
        applyTableHighlights();
      }

      function applyTableHighlights() {
        document.querySelectorAll("#vigenereTable td").forEach(function (td) {
          var r = parseInt(td.dataset.row, 10);
          var c = parseInt(td.dataset.col, 10);
          td.classList.remove("hl-key", "hl-plain", "hl-cipher");
          if (hlRow >= 0 && hlCol >= 0) {
            if (r === hlRow && c === hlCol) {
              td.classList.add("hl-cipher");
            } else if (r === hlRow) {
              td.classList.add("hl-key");
            } else if (c === hlCol) {
              td.classList.add("hl-plain");
            }
          }
        });
      }

      // ── UI wiring ──────────────────────────────────────────────────────────
      document.getElementById("btnEncrypt").onclick = function () {
        modeSelectEl.value = "encrypt";
        runProcess(true);
      };

      document.getElementById("btnDecrypt").onclick = function () {
        modeSelectEl.value = "decrypt";
        runProcess(false);
      };

      document.getElementById("btnSwap").onclick = function () {
        var tmp = inputTextEl.value;
        inputTextEl.value = outputTextEl.value;
        outputTextEl.value = tmp;
        showStatus("已交换", "success");
        saveState();
      };

      document.getElementById("btnCopy").onclick = function () {
        if (!outputTextEl.value) {
          showStatus("没有内容", "error");
          return;
        }
        navigator.clipboard
          .writeText(outputTextEl.value)
          .then(function () {
            showStatus("已复制", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      };

      document.getElementById("btnClear").onclick = function () {
        inputTextEl.value = "";
        outputTextEl.value = "";
        statusMsgEl.textContent = "";
        statusMsgEl.className = "status";
        statRowEl.style.display = "none";
        localStorage.removeItem(LS_KEY_TEXT);
      };

      document.getElementById("btnToggleTable").onclick = function () {
        tableVisible = !tableVisible;
        document.getElementById("tableWrapper").style.display = tableVisible ? "" : "none";
        document.getElementById("btnToggleTable").textContent = tableVisible
          ? "隐藏方阵"
          : "显示方阵";
      };

      keyInputEl.addEventListener("input", function () {
        var key = getCleanKey();
        var keyInfoEl = document.getElementById("keyInfo");
        if (keyInputEl.value.length === 0) {
          keyInfoEl.textContent = "";
          keyInputEl.classList.remove("key-error");
        } else if (key.length === 0) {
          keyInfoEl.textContent = "请输入英文字母";
          keyInputEl.classList.add("key-error");
        } else {
          keyInfoEl.textContent = "有效密钥长度: " + key.length;
          keyInputEl.classList.remove("key-error");
        }
        localStorage.setItem(LS_KEY_KEY, keyInputEl.value);
      });

      inputTextEl.addEventListener("input", saveState);

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          runProcess(modeSelectEl.value !== "decrypt");
        }
      });

      // ── Persistence ────────────────────────────────────────────────────────
      function saveState() {
        localStorage.setItem(LS_KEY_TEXT, inputTextEl.value);
      }

      function loadState() {
        var savedKey = localStorage.getItem(LS_KEY_KEY);
        if (savedKey) {
          keyInputEl.value = savedKey;
          var key = getCleanKey();
          var keyInfoEl = document.getElementById("keyInfo");
          keyInfoEl.textContent = key ? "有效密钥长度: " + key.length : "";
        }
        var savedText = localStorage.getItem(LS_KEY_TEXT);
        if (savedText) inputTextEl.value = savedText;
      }

      // ── Init ───────────────────────────────────────────────────────────────
      buildTable();
      loadState();

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
    
