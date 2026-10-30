// @ts-nocheck
// Generated from tools/text/pangu-spacing.html
// Source SHA-256: 324839a56c685d8ef8d2e211dd9fce29a03a052f659f973ea144786815add9c7
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const inputInfoEl = document.getElementById("inputInfo");
      const outputInfoEl = document.getElementById("outputInfo");
      const statSpacesEl = document.getElementById("statSpaces");
      const statPunctEl = document.getElementById("statPunct");
      const LS_KEY = "pangu_spacing_v1";

      // CJK character ranges
      const CJK =
        "\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\ufe30-\ufe4f";
      const CJK_REGEX = new RegExp("[" + CJK + "]");

      // Regex patterns for spacing
      const PATTERNS = {
        // CJK followed by half-width content
        cjkToHalf: new RegExp("([" + CJK + "])([A-Za-z0-9\\[\\(`])", "g"),
        // Half-width content followed by CJK
        halfToCjk: new RegExp("([A-Za-z0-9\\]\\)`])([" + CJK + "])", "g"),
        // CJK followed by number
        cjkToNum: new RegExp("([" + CJK + "])([0-9])", "g"),
        // Number followed by CJK
        numToCjk: new RegExp("([0-9])([" + CJK + "])", "g")
      };

      // Punctuation mappings (half-width to full-width for CJK context)
      const PUNCT_MAP = {
        ",": "，",
        ".": "。",
        "!": "！",
        "?": "？",
        ":": "：",
        ";": "；",
        "(": "（",
        ")": "）"
      };

      function updateInputInfo() {
        inputInfoEl.textContent = inputEl.value.length + " 字符";
      }

      function updateOutputInfo() {
        outputInfoEl.textContent = outputEl.value.length + " 字符";
      }

      function formatText() {
        var text = inputEl.value;
        if (!text.trim()) {
          showStatus("请输入文本", "error");
          return;
        }

        var spaceCjkEn = document.getElementById("spaceCjkEn").checked;
        var spaceCjkNum = document.getElementById("spaceCjkNum").checked;
        var fixPunctuation = document.getElementById("fixPunctuation").checked;
        var removeExtraSpaces = document.getElementById("removeExtraSpaces").checked;

        var spacesAdded = 0;
        var punctFixed = 0;
        var result = text;

        // Add spaces between CJK and English
        if (spaceCjkEn) {
          var before = result;
          result = result.replace(PATTERNS.cjkToHalf, "$1 $2");
          result = result.replace(PATTERNS.halfToCjk, "$1 $2");
          spacesAdded += countDiff(before, result);
        }

        // Add spaces between CJK and numbers
        if (spaceCjkNum) {
          var before = result;
          result = result.replace(PATTERNS.cjkToNum, "$1 $2");
          result = result.replace(PATTERNS.numToCjk, "$1 $2");
          spacesAdded += countDiff(before, result);
        }

        // Fix punctuation
        if (fixPunctuation) {
          // Replace half-width punctuation in CJK context
          var chars = result.split("");
          for (var i = 0; i < chars.length; i++) {
            var char = chars[i];
            if (PUNCT_MAP[char]) {
              // Check if surrounded by CJK
              var prevCjk = i > 0 && CJK_REGEX.test(chars[i - 1]);
              var nextCjk = i < chars.length - 1 && CJK_REGEX.test(chars[i + 1]);
              if (prevCjk || nextCjk) {
                chars[i] = PUNCT_MAP[char];
                punctFixed++;
              }
            }
          }
          result = chars.join("");
        }

        // Remove extra spaces
        if (removeExtraSpaces) {
          result = result.replace(/  +/g, " ");
        }

        outputEl.value = result;
        updateOutputInfo();
        statSpacesEl.textContent = spacesAdded;
        statPunctEl.textContent = punctFixed;
        saveToStorage();
        showStatus("校正完成，添加了 " + spacesAdded + " 个空格", "success");
      }

      function countDiff(before, after) {
        return after.length - before.length;
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function saveToStorage() {
        var data = {
          input: inputEl.value,
          spaceCjkEn: document.getElementById("spaceCjkEn").checked,
          spaceCjkNum: document.getElementById("spaceCjkNum").checked,
          fixPunctuation: document.getElementById("fixPunctuation").checked,
          removeExtraSpaces: document.getElementById("removeExtraSpaces").checked
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            var data = JSON.parse(saved);
            inputEl.value = data.input || "";
            document.getElementById("spaceCjkEn").checked = data.spaceCjkEn !== false;
            document.getElementById("spaceCjkNum").checked = data.spaceCjkNum !== false;
            document.getElementById("fixPunctuation").checked = data.fixPunctuation !== false;
            document.getElementById("removeExtraSpaces").checked = data.removeExtraSpaces !== false;
            updateInputInfo();
          }
        } catch (e) {
          // Ignore parse errors
        }
      }

      document.getElementById("btnFormat").onclick = formatText;

      document.getElementById("btnCopy").onclick = async function () {
        if (!outputEl.value) {
          showStatus("没有内容可复制", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(outputEl.value);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnSwap").onclick = function () {
        var temp = inputEl.value;
        inputEl.value = outputEl.value;
        outputEl.value = temp;
        updateInputInfo();
        updateOutputInfo();
        saveToStorage();
      };

      document.getElementById("btnClear").onclick = function () {
        inputEl.value = "";
        outputEl.value = "";
        statusEl.textContent = "";
        statSpacesEl.textContent = "0";
        statPunctEl.textContent = "0";
        updateInputInfo();
        updateOutputInfo();
        localStorage.removeItem(LS_KEY);
      };

      inputEl.addEventListener("input", function () {
        updateInputInfo();
        saveToStorage();
      });

      document.querySelectorAll('.option-group input[type="checkbox"]').forEach(function (cb) {
        cb.addEventListener("change", saveToStorage);
      });

      loadFromStorage();

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
    
