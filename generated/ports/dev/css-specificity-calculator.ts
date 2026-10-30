// @ts-nocheck
// Generated from tools/dev/css-specificity-calculator.html
// Source SHA-256: 102950badba7f5ab858ab590feb618852dca04796c494149844d316d2bae708f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var statusEl = document.getElementById("status");
      var selectorInput = document.getElementById("selectorInput");
      var warningBox = document.getElementById("warningBox");
      var specAEl = document.getElementById("specA");
      var specBEl = document.getElementById("specB");
      var specCEl = document.getElementById("specC");
      var specTotalEl = document.getElementById("specTotal");
      var specBreakdownEl = document.getElementById("specBreakdown");
      var compareListEl = document.getElementById("compareList");
      var emptyCompareEl = document.getElementById("emptyCompare");
      var compareCountEl = document.getElementById("compareCount");

      var compareItems = [];

      var EXAMPLES = [
        "*",
        "div",
        ".class",
        "#id",
        "div p",
        ".nav > a",
        "a:hover",
        "input[type='text']",
        "#header .nav li a",
        "div#app .item:first-child::before",
        ":not(.foo)",
        "::before"
      ];

      function buildExamples() {
        var bar = document.getElementById("examplesBar");
        EXAMPLES.forEach(function (ex) {
          var chip = document.createElement("button");
          chip.className = "example-chip";
          chip.textContent = ex;
          chip.addEventListener("click", function () {
            selectorInput.value = ex;
            selectorInput.dispatchEvent(new Event("input"));
          });
          bar.appendChild(chip);
        });
      }

      /**
       * Calculate CSS specificity for a single simple selector token.
       * Returns {a, b, c} delta for that token.
       */
      function tokenSpecificity(token) {
        // Inline style: not handled here (a=1 would need special input)
        if (!token || token === "*" || token === ">" || token === "+" || token === "~") {
          return { a: 0, b: 0, c: 0, kind: "universal" };
        }
        // ID selector
        if (token.startsWith("#")) {
          return { a: 1, b: 0, c: 0, kind: "id" };
        }
        // Class selector
        if (token.startsWith(".")) {
          return { a: 0, b: 1, c: 0, kind: "class" };
        }
        // Attribute selector
        if (token.startsWith("[")) {
          return { a: 0, b: 1, c: 0, kind: "attr" };
        }
        // Pseudo-element (double colon or single-colon legacy)
        if (/^::/.test(token)) {
          return { a: 0, b: 0, c: 1, kind: "pseudo-element" };
        }
        // :not(), :is(), :has(), :where() — special
        var notMatch = token.match(/^:(not|is|has|where)\((.+)\)$/i);
        if (notMatch) {
          var inner = notMatch[2];
          var fnName = notMatch[1].toLowerCase();
          // :where() has zero specificity for its argument
          if (fnName === "where") {
            return { a: 0, b: 0, c: 0, kind: "pseudo-class" };
          }
          // :not/:is/:has — use highest specificity of arguments (simplified: sum)
          var innerSpec = parseSpecificity(inner);
          return { a: innerSpec.a, b: innerSpec.b, c: innerSpec.c, kind: "pseudo-class" };
        }
        // Pseudo-class (single colon)
        if (token.startsWith(":")) {
          return { a: 0, b: 1, c: 0, kind: "pseudo-class" };
        }
        // Element type selector
        if (/^[a-z_-][a-z0-9_-]*/i.test(token)) {
          return { a: 0, b: 0, c: 1, kind: "element" };
        }
        return { a: 0, b: 0, c: 0, kind: "universal" };
      }

      /**
       * Tokenize a selector into meaningful parts.
       * Handles complex selectors with combinators, :not(), attribute selectors, etc.
       */
      function tokenizeSelector(selector) {
        var tokens = [];
        var i = 0;
        var s = selector.trim();

        while (i < s.length) {
          // Skip whitespace combinators
          if (/\s/.test(s[i])) {
            i++;
            tokens.push({ raw: " ", kind: "universal" });
            // Skip consecutive spaces
            while (i < s.length && /\s/.test(s[i])) i++;
            continue;
          }
          // Combinator > + ~
          if (s[i] === ">" || s[i] === "+" || s[i] === "~") {
            tokens.push({ raw: s[i], kind: "universal" });
            i++;
            continue;
          }
          // Universal
          if (s[i] === "*") {
            tokens.push({ raw: "*", kind: "universal" });
            i++;
            continue;
          }
          // Attribute selector [...]
          if (s[i] === "[") {
            var end = s.indexOf("]", i);
            if (end === -1) end = s.length - 1;
            var attrToken = s.slice(i, end + 1);
            tokens.push({ raw: attrToken, kind: "attr" });
            i = end + 1;
            continue;
          }
          // ID selector #foo
          if (s[i] === "#") {
            var j = i + 1;
            while (j < s.length && /[\w-]/.test(s[j])) j++;
            tokens.push({ raw: s.slice(i, j), kind: "id" });
            i = j;
            continue;
          }
          // Class selector .foo
          if (s[i] === ".") {
            var k = i + 1;
            while (k < s.length && /[\w-]/.test(s[k])) k++;
            tokens.push({ raw: s.slice(i, k), kind: "class" });
            i = k;
            continue;
          }
          // Pseudo-element ::before OR :not(...) etc.
          if (s[i] === ":") {
            // Check ::
            var isPseudoElement = s[i + 1] === ":";
            var m = i + (isPseudoElement ? 2 : 1);
            // Read pseudo name
            while (m < s.length && /[\w-]/.test(s[m])) m++;
            // Check for functional pseudo :foo(...)
            if (m < s.length && s[m] === "(") {
              var depth = 1;
              m++;
              while (m < s.length && depth > 0) {
                if (s[m] === "(") depth++;
                else if (s[m] === ")") depth--;
                m++;
              }
            }
            var pseudoRaw = s.slice(i, m);
            var pseudoKind = isPseudoElement ? "pseudo-element" : "pseudo-class";
            tokens.push({ raw: pseudoRaw, kind: pseudoKind });
            i = m;
            continue;
          }
          // Element type selector
          if (/[a-z_-]/i.test(s[i])) {
            var n = i;
            while (n < s.length && /[\w-]/.test(s[n])) n++;
            tokens.push({ raw: s.slice(i, n), kind: "element" });
            i = n;
            continue;
          }
          // Unknown char — skip
          i++;
        }
        return tokens;
      }

      /**
       * Parse full specificity for a selector string.
       * Returns {a, b, c, tokens, warning}.
       */
      function parseSpecificity(selector) {
        if (!selector || !selector.trim()) {
          return { a: 0, b: 0, c: 0, tokens: [], warning: "" };
        }
        var s = selector.trim();
        var warning = "";

        // Detect !important (not a specificity concept, but worth flagging)
        if (/!important/i.test(s)) {
          warning = "!important 不属于选择器权重范畴，它会覆盖所有正常声明权重。";
          s = s.replace(/!important/gi, "").trim();
        }

        var tokens = tokenizeSelector(s);
        var a = 0;
        var b = 0;
        var c = 0;
        var processed = [];

        tokens.forEach(function (tok) {
          var spec = tokenSpecificity(tok.raw);
          a += spec.a;
          b += spec.b;
          c += spec.c;
          if (
            tok.kind !== "universal" ||
            (tok.raw !== " " && tok.raw !== ">" && tok.raw !== "+" && tok.raw !== "~")
          ) {
            processed.push({ raw: tok.raw, kind: spec.kind });
          }
        });

        return { a: a, b: b, c: c, tokens: processed, warning: warning };
      }

      function formatScore(a, b, c) {
        return a + "-" + b + "-" + c;
      }

      function numericScore(a, b, c) {
        // Compare lexicographically as (a,b,c) tuples
        return a * 1000000 + b * 1000 + c;
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function renderCurrentSpec() {
        var sel = selectorInput.value;
        if (!sel.trim()) {
          specAEl.textContent = "0";
          specBEl.textContent = "0";
          specCEl.textContent = "0";
          specTotalEl.innerHTML = "";
          specBreakdownEl.innerHTML = "";
          warningBox.textContent = "";
          warningBox.classList.remove("show");
          selectorInput.classList.remove("invalid");
          showStatus("", "");
          return;
        }

        var result = parseSpecificity(sel);
        specAEl.textContent = String(result.a);
        specBEl.textContent = String(result.b);
        specCEl.textContent = String(result.c);
        specTotalEl.innerHTML =
          "权重值 <strong>" + formatScore(result.a, result.b, result.c) + "</strong>";

        // Breakdown tokens
        specBreakdownEl.innerHTML = "";
        result.tokens.forEach(function (tok) {
          if (tok.raw === " " || tok.raw === ">" || tok.raw === "+" || tok.raw === "~") return;
          var span = document.createElement("span");
          span.className = "spec-token type-" + tok.kind;
          span.textContent = tok.raw;
          specBreakdownEl.appendChild(span);
        });

        if (result.warning) {
          warningBox.textContent = "⚠ " + result.warning;
          warningBox.classList.add("show");
        } else {
          warningBox.textContent = "";
          warningBox.classList.remove("show");
        }

        selectorInput.classList.remove("invalid");
        showStatus("", "");
      }

      function renderCompareList() {
        if (compareItems.length === 0) {
          compareListEl.innerHTML = "";
          compareListEl.appendChild(emptyCompareEl);
          compareCountEl.textContent = "";
          return;
        }

        // Find max numeric score for bar widths
        var maxScore = 0;
        compareItems.forEach(function (item) {
          var s = numericScore(item.a, item.b, item.c);
          if (s > maxScore) maxScore = s;
        });

        // Sort by score descending (for ranking)
        var ranked = compareItems.slice().sort(function (x, y) {
          return numericScore(y.a, y.b, y.c) - numericScore(x.a, x.b, x.c);
        });
        var highestScore = ranked.length ? numericScore(ranked[0].a, ranked[0].b, ranked[0].c) : 0;

        compareListEl.innerHTML = "";

        compareItems.forEach(function (item, idx) {
          var myScore = numericScore(item.a, item.b, item.c);
          var isHighest = myScore === highestScore;
          var barPct = maxScore > 0 ? Math.round((myScore / maxScore) * 100) : 0;

          var row = document.createElement("div");
          row.className = "compare-item" + (isHighest ? " highest" : "");

          var selSpan = document.createElement("span");
          selSpan.className = "compare-selector";
          selSpan.textContent = item.selector;

          var specSpan = document.createElement("span");
          specSpan.className = "compare-spec";
          specSpan.textContent = formatScore(item.a, item.b, item.c);

          var badge = document.createElement("span");
          badge.className = "compare-badge";
          badge.textContent = "最高";

          var delBtn = document.createElement("button");
          delBtn.className = "compare-item-delete";
          delBtn.textContent = "✕";
          delBtn.setAttribute("aria-label", "删除");
          (function (i) {
            delBtn.addEventListener("click", function () {
              compareItems.splice(i, 1);
              renderCompareList();
            });
          })(idx);

          var barWrap = document.createElement("div");
          barWrap.className = "compare-bar-wrap";
          var bar = document.createElement("div");
          bar.className = "compare-bar";
          bar.style.width = barPct + "%";
          barWrap.appendChild(bar);

          row.appendChild(selSpan);
          row.appendChild(specSpan);
          row.appendChild(badge);
          row.appendChild(delBtn);
          row.appendChild(barWrap);

          compareListEl.appendChild(row);
        });

        compareCountEl.textContent = "（" + compareItems.length + " 个）";
      }

      document.getElementById("btnAdd").addEventListener("click", function () {
        var sel = selectorInput.value.trim();
        if (!sel) {
          showStatus("请先输入选择器", "error");
          return;
        }
        // Avoid exact duplicate
        var exists = compareItems.some(function (item) {
          return item.selector === sel;
        });
        if (exists) {
          showStatus("该选择器已在列表中", "error");
          return;
        }
        var result = parseSpecificity(sel);
        compareItems.push({ selector: sel, a: result.a, b: result.b, c: result.c });
        renderCompareList();
        showStatus("已添加到比较", "success");
      });

      document.getElementById("btnClear").addEventListener("click", function () {
        selectorInput.value = "";
        compareItems = [];
        renderCurrentSpec();
        renderCompareList();
        showStatus("已清空", "success");
      });

      selectorInput.addEventListener("input", renderCurrentSpec);

      selectorInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          document.getElementById("btnAdd").click();
        }
      });

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
      buildExamples();
    
