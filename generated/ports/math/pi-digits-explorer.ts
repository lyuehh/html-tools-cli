// @ts-nocheck
// Generated from tools/math/pi-digits-explorer.html
// Source SHA-256: 687f8c317f18f5d230151e33e5343cb872cc37aefe8a6d7e0efc9a3b0ed1a93a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ── π digits — computed client-side via Machin-like formula ─────────────
      // π/4 = 4·arctan(1/5) − arctan(1/239)  (Machin 1706)
      // Uses JavaScript BigInt for exact integer arithmetic.

      var PI_STRING = ""; // "3.14159…" populated on demand

      function computePi(decimals) {
        var extra = 10;
        var n = decimals + extra;
        var scale = BigInt(10) ** BigInt(n);

        function arctanSeries(denom) {
          var d = BigInt(denom);
          var term = scale / d;
          var sum = term;
          var k = BigInt(1);
          for (;;) {
            term = term / (d * d);
            k += BigInt(2);
            var next = term / k;
            if (next === BigInt(0)) break;
            if (k % BigInt(4) === BigInt(3)) {
              sum -= next;
            } else {
              sum += next;
            }
          }
          return sum;
        }

        var pi4 = BigInt(4) * arctanSeries(5) - arctanSeries(239);
        var pi = pi4 * BigInt(4);
        var s = pi.toString();
        // s is scaled integer: first digit = 3, rest = decimal digits
        return s.slice(0, 1) + "." + s.slice(1, decimals + 1);
      }

      function ensureDigits(count) {
        if (PI_STRING.length >= count + 2) return;
        PI_STRING = computePi(count);
      }

      var currentDigits = ""; // decimal part only (after "3.")

      var piDigitsBoxEl = document.getElementById("piDigitsBox");
      var piDisplayLabelEl = document.getElementById("piDisplayLabel");
      var piDigitCountEl = document.getElementById("piDigitCount");
      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");
      var searchResultsEl = document.getElementById("searchResults");
      var searchInputEl = document.getElementById("searchInput");
      var freqGridEl = document.getElementById("freqGrid");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function loadDigits(count) {
        count = Math.max(1, Math.min(10000, count));
        showStatus("正在计算 π 的前 " + count + " 位…", "");
        ensureDigits(count);
        currentDigits = PI_STRING.slice(2, count + 2);
        renderDigitsBox("");
        updateFreq();
        piDisplayLabelEl.textContent = "π 数字（前 " + count + " 位小数）";
        piDigitCountEl.textContent = count + " 位";
        document.getElementById("statTotal").textContent = count;
        statsEl.classList.add("show");
        showStatus("已加载 π 前 " + count + " 位小数", "success");
      }

      function renderDigitsBox(highlight) {
        piDigitsBoxEl.textContent = "";
        piDigitsBoxEl.appendChild(document.createTextNode("3."));
        if (!highlight) {
          piDigitsBoxEl.appendChild(document.createTextNode(currentDigits));
          return;
        }
        var idx = 0;
        while (idx < currentDigits.length) {
          var pos = currentDigits.indexOf(highlight, idx);
          if (pos === -1) {
            piDigitsBoxEl.appendChild(document.createTextNode(currentDigits.slice(idx)));
            break;
          }
          if (pos > idx) {
            piDigitsBoxEl.appendChild(document.createTextNode(currentDigits.slice(idx, pos)));
          }
          var span = document.createElement("span");
          span.className = "pi-digit-highlight";
          span.textContent = highlight;
          piDigitsBoxEl.appendChild(span);
          idx = pos + highlight.length;
        }
      }

      function updateFreq() {
        var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < currentDigits.length; i++) {
          var d = parseInt(currentDigits[i], 10);
          if (d >= 0 && d <= 9) counts[d]++;
        }
        var maxCount = Math.max.apply(null, counts);
        freqGridEl.textContent = "";
        for (var di = 0; di <= 9; di++) {
          var item = document.createElement("div");
          item.className = "freq-item";
          var dSpan = document.createElement("span");
          dSpan.className = "freq-digit";
          dSpan.textContent = String(di);
          var cSpan = document.createElement("span");
          cSpan.className = "freq-count";
          cSpan.textContent = counts[di].toLocaleString();
          var barWrap = document.createElement("div");
          barWrap.className = "freq-bar-wrap";
          var bar = document.createElement("div");
          bar.className = "freq-bar";
          var pct = maxCount > 0 ? (counts[di] / maxCount) * 100 : 0;
          bar.style.width = pct.toFixed(1) + "%";
          barWrap.appendChild(bar);
          item.appendChild(dSpan);
          item.appendChild(cSpan);
          item.appendChild(barWrap);
          freqGridEl.appendChild(item);
        }
      }

      function doSearch() {
        var query = searchInputEl.value.replace(/\D/g, "");
        if (!query) {
          showStatus("请输入要搜索的数字串", "error");
          return;
        }
        if (!currentDigits) {
          showStatus("请先加载 π 数字", "error");
          return;
        }
        searchResultsEl.textContent = "";
        searchResultsEl.classList.add("show");

        var positions = [];
        var si = 0;
        while (positions.length < 20) {
          var p = currentDigits.indexOf(query, si);
          if (p === -1) break;
          positions.push(p);
          si = p + 1;
        }
        // count total hits
        var totalHits = 0;
        var ci = 0;
        while (true) {
          var cp = currentDigits.indexOf(query, ci);
          if (cp === -1) break;
          totalHits++;
          ci = cp + 1;
        }

        if (positions.length === 0) {
          var noResult = document.createElement("div");
          noResult.className = "search-no-result";
          noResult.textContent = "在前 " + currentDigits.length + " 位中未找到 " + query;
          searchResultsEl.appendChild(noResult);
          document.getElementById("statSearchHits").textContent = "0";
          showStatus("未找到", "error");
          renderDigitsBox("");
          return;
        }

        for (var ri = 0; ri < positions.length; ri++) {
          var rp = positions[ri];
          var ctxStart = Math.max(0, rp - 6);
          var ctxEnd = Math.min(currentDigits.length, rp + query.length + 6);
          var resultItem = document.createElement("div");
          resultItem.className = "search-result-item";
          var posSpan = document.createElement("span");
          posSpan.className = "search-result-pos";
          posSpan.textContent = "第 " + (rp + 1) + " 位";
          var ctxSpan = document.createElement("span");
          ctxSpan.className = "search-result-ctx";
          ctxSpan.appendChild(
            document.createTextNode((ctxStart > 0 ? "…" : "") + currentDigits.slice(ctxStart, rp))
          );
          var matchSpan = document.createElement("span");
          matchSpan.className = "match";
          matchSpan.textContent = currentDigits.slice(rp, rp + query.length);
          ctxSpan.appendChild(matchSpan);
          ctxSpan.appendChild(
            document.createTextNode(
              currentDigits.slice(rp + query.length, ctxEnd) +
                (ctxEnd < currentDigits.length ? "…" : "")
            )
          );
          resultItem.appendChild(posSpan);
          resultItem.appendChild(ctxSpan);
          searchResultsEl.appendChild(resultItem);
        }

        if (totalHits > positions.length) {
          var moreNote = document.createElement("div");
          moreNote.style.cssText =
            "font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);padding:var(--space-2) 0;text-align:center";
          moreNote.textContent = "…共 " + totalHits + " 处（仅显示前 20 处）";
          searchResultsEl.appendChild(moreNote);
        }

        document.getElementById("statSearchHits").textContent = totalHits;
        statsEl.classList.add("show");
        showStatus('找到 "' + query + '" ' + totalHits + " 处", "success");
        renderDigitsBox(query);
      }

      function clearAll() {
        currentDigits = "";
        PI_STRING = "";
        piDigitsBoxEl.textContent = "";
        searchResultsEl.classList.remove("show");
        freqGridEl.textContent = "";
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
        piDisplayLabelEl.textContent = "π 数字";
        piDigitCountEl.textContent = "";
        document.getElementById("statSearchHits").textContent = "—";
      }

      // ── Event bindings ───────────────────────────────────────────────────────
      document.getElementById("btnLoad100").onclick = function () {
        searchResultsEl.classList.remove("show");
        document.getElementById("statSearchHits").textContent = "—";
        loadDigits(100);
      };
      document.getElementById("btnLoad1000").onclick = function () {
        searchResultsEl.classList.remove("show");
        document.getElementById("statSearchHits").textContent = "—";
        loadDigits(1000);
      };
      document.getElementById("btnLoad10000").onclick = function () {
        searchResultsEl.classList.remove("show");
        document.getElementById("statSearchHits").textContent = "—";
        loadDigits(10000);
      };
      document.getElementById("btnCustomLoad").onclick = function () {
        var val = parseInt(document.getElementById("customCount").value, 10);
        if (!val || val < 1) {
          showStatus("请输入有效位数（1–10000）", "error");
          return;
        }
        searchResultsEl.classList.remove("show");
        document.getElementById("statSearchHits").textContent = "—";
        loadDigits(val);
      };

      document.getElementById("btnSearch").onclick = doSearch;
      searchInputEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter") doSearch();
      });
      searchInputEl.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");
      });

      document.getElementById("btnCopyDigits").onclick = function () {
        if (!currentDigits) {
          showStatus("还没有加载 π 数字", "error");
          return;
        }
        navigator.clipboard.writeText("3." + currentDigits).then(
          function () {
            showStatus("已复制 π 前 " + currentDigits.length + " 位", "success");
          },
          function () {
            showStatus("复制失败", "error");
          }
        );
      };

      document.getElementById("btnClear").onclick = clearAll;

      // ── Theme ────────────────────────────────────────────────────────────────
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
      // Defer heavy BigInt π computation until after first paint
      setTimeout(function () {
        loadDigits(10000);
      }, 50);
    
