// @ts-nocheck
// Generated from tools/text/slugify.html
// Source SHA-256: 27eff09a67a70321c4ef0f69e6f5f4e7f924804f4c6b7cb40f57450ed334d969
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var inputEl = document.getElementById("input");
      var outputEl = document.getElementById("output");
      var origLenEl = document.getElementById("origLen");
      var slugLenEl = document.getElementById("slugLen");
      var statusEl = document.getElementById("status");

      var optLower = document.getElementById("optLower");
      var optSeparator = document.getElementById("optSeparator");
      var optTrim = document.getElementById("optTrim");
      var optStrict = document.getElementById("optStrict");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      var charMap = {
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "a",
        å: "a",
        æ: "ae",
        ç: "c",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        ð: "d",
        ñ: "n",
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "o",
        ø: "o",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "u",
        ý: "y",
        þ: "th",
        ÿ: "y",
        ß: "ss",
        ł: "l",
        ő: "o",
        ű: "u",
        ţ: "t",
        ą: "a",
        ę: "e",
        ś: "s",
        ź: "z",
        ż: "z",
        ń: "n",
        ć: "c",
        ĺ: "l",
        ŕ: "r",
        ď: "d",
        ť: "t",
        ň: "n",
        ľ: "l",
        "&": "and",
        "@": "at",
        "©": "c",
        "®": "r",
        "™": "tm"
      };

      function slugify(text) {
        var separator = optSeparator.value;
        var lower = optLower.checked;
        var trim = optTrim.checked;
        var strict = optStrict.checked;

        var result = text;

        if (trim) {
          result = result.trim();
        }

        if (lower) {
          result = result.toLowerCase();
        }

        result = result.replace(/[^\u0000-\u007F]/g, function (c) {
          return charMap[c] || "";
        });

        if (strict) {
          result = result.replace(/[^a-z0-9\s]/gi, "");
        } else {
          result = result.replace(/[^a-z0-9\s\-_]/gi, "");
        }

        result = result.replace(/\s+/g, separator);

        if (separator) {
          var sep = separator.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
          result = result.replace(new RegExp(sep + "+", "g"), separator);
          result = result.replace(new RegExp("^" + sep + "|" + sep + "$", "g"), "");
        }

        return result;
      }

      function update() {
        var input = inputEl.value;
        var slug = slugify(input);

        outputEl.textContent = slug || "-";
        origLenEl.textContent = input.length;
        slugLenEl.textContent = slug.length;
      }

      document.getElementById("btnPaste").onclick = async function () {
        try {
          inputEl.value = await navigator.clipboard.readText();
          update();
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnCopy").onclick = async function () {
        var slug = outputEl.textContent;
        if (slug && slug !== "-") {
          await navigator.clipboard.writeText(slug);
          showStatus("已复制", "success");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        inputEl.value = "";
        update();
        showStatus("已清空", "success");
      };

      inputEl.addEventListener("input", update);
      optLower.addEventListener("change", update);
      optSeparator.addEventListener("change", update);
      optTrim.addEventListener("change", update);
      optStrict.addEventListener("change", update);

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
