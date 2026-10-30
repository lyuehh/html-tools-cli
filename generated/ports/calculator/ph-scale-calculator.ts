// @ts-nocheck
// Generated from tools/calculator/ph-scale-calculator.html
// Source SHA-256: 3982124af47cfb1e8f80cf4326e6ee32c71f458e736c2a712095ecb09b0209d2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      /* ── pH 值计算器逻辑 ── */

      var REF_SOLUTIONS = [
        { name: "盐酸（胃酸）", ph: 1.5, note: "强酸" },
        { name: "柠檬汁", ph: 2.4, note: "强酸" },
        { name: "醋 / 食醋", ph: 2.9, note: "强酸" },
        { name: "碳酸饮料", ph: 3.3, note: "弱酸" },
        { name: "番茄汁", ph: 4.1, note: "弱酸" },
        { name: "黑咖啡", ph: 5.0, note: "弱酸" },
        { name: "雨水（洁净）", ph: 5.6, note: "弱酸" },
        { name: "牛奶", ph: 6.4, note: "弱酸" },
        { name: "纯水（25°C）", ph: 7.0, note: "中性" },
        { name: "血液", ph: 7.4, note: "弱碱" },
        { name: "海水", ph: 8.2, note: "弱碱" },
        { name: "小苏打溶液", ph: 8.5, note: "弱碱" },
        { name: "肥皂水", ph: 9.5, note: "弱碱" },
        { name: "氨水（家用）", ph: 11.0, note: "强碱" },
        { name: "漂白水", ph: 12.5, note: "强碱" },
        { name: "NaOH 溶液", ph: 13.5, note: "强碱" }
      ];

      function phToColor(ph) {
        var stops = [
          { t: 0, r: 255, g: 48, b: 48 },
          { t: 1, r: 255, g: 96, b: 48 },
          { t: 2, r: 255, g: 144, b: 48 },
          { t: 3, r: 255, g: 192, b: 48 },
          { t: 4, r: 240, g: 224, b: 64 },
          { t: 5, r: 180, g: 220, b: 50 },
          { t: 6, r: 64, g: 208, b: 80 },
          { t: 7, r: 64, g: 208, b: 128 },
          { t: 8, r: 64, g: 192, b: 208 },
          { t: 9, r: 64, g: 144, b: 224 },
          { t: 10, r: 80, g: 96, b: 224 },
          { t: 11, r: 96, g: 64, b: 224 },
          { t: 12, r: 128, g: 32, b: 208 },
          { t: 13, r: 160, g: 16, b: 176 },
          { t: 14, r: 192, g: 0, b: 144 }
        ];
        ph = Math.max(0, Math.min(14, ph));
        var lo = Math.floor(ph);
        var hi = Math.min(14, lo + 1);
        var f = ph - lo;
        var a = stops[lo];
        var bStop = stops[hi];
        var r = Math.round(a.r + (bStop.r - a.r) * f);
        var g = Math.round(a.g + (bStop.g - a.g) * f);
        var bv = Math.round(a.b + (bStop.b - a.b) * f);
        return "rgb(" + r + "," + g + "," + bv + ")";
      }

      function phLabel(ph) {
        if (ph < 3) return "强酸";
        if (ph < 6) return "弱酸";
        if (ph < 6.9) return "偏酸";
        if (ph <= 7.1) return "中性";
        if (ph <= 8) return "偏碱";
        if (ph <= 11) return "弱碱";
        return "强碱";
      }

      function toSciStr(val) {
        if (val === 0) return "0";
        var exp = Math.floor(Math.log10(val));
        var coeff = val / Math.pow(10, exp);
        var coeffStr = coeff.toFixed(2);
        var supMap = {
          "-": "⁻",
          0: "⁰",
          1: "¹",
          2: "²",
          3: "³",
          4: "⁴",
          5: "⁵",
          6: "⁶",
          7: "⁷",
          8: "⁸",
          9: "⁹"
        };
        var expStr = String(exp)
          .split("")
          .map(function (c) {
            return supMap[c] || c;
          })
          .join("");
        return coeffStr + "×10" + expStr;
      }

      function showResult(ph) {
        var statusEl = document.getElementById("statusEl");
        if (isNaN(ph) || ph < 0 || ph > 14) {
          statusEl.textContent = "pH 超出有效范围（0–14）";
          statusEl.className = "status error";
          return;
        }
        var poh = 14 - ph;
        var hConc = Math.pow(10, -ph);
        var ohConc = Math.pow(10, -poh);
        var color = phToColor(ph);
        var label = phLabel(ph);

        var card = document.getElementById("resultCard");
        card.style.display = "";
        var phValEl = document.getElementById("resultPhValue");
        phValEl.textContent = ph.toFixed(2);
        phValEl.style.color = color;

        var badge = document.getElementById("resultBadge");
        badge.textContent = label;
        badge.style.background = color + "22";
        badge.style.color = color;
        badge.style.border = "1px solid " + color + "66";

        document.getElementById("metaH").textContent = toSciStr(hConc) + " mol/L";
        document.getElementById("metaOH").textContent = toSciStr(ohConc) + " mol/L";
        document.getElementById("metaPOH").textContent = poh.toFixed(2);
        document.getElementById("metaKw").textContent = "1×10⁻¹⁴";

        var pct = (ph / 14) * 100;
        document.getElementById("scaleMarker").style.left = pct + "%";

        statusEl.textContent = "计算完成";
        statusEl.className = "status success";
      }

      function buildRefTable() {
        var tbody = document.getElementById("refTableBody");
        tbody.innerHTML = "";
        REF_SOLUTIONS.forEach(function (sol) {
          var tr = document.createElement("tr");
          var tdName = document.createElement("td");
          var dot = document.createElement("span");
          dot.className = "ref-dot";
          dot.style.background = phToColor(sol.ph);
          tdName.appendChild(dot);
          tdName.appendChild(document.createTextNode(sol.name));

          var tdPh = document.createElement("td");
          tdPh.className = "ref-ph";
          tdPh.textContent = sol.ph.toFixed(1);
          tdPh.style.color = phToColor(sol.ph);

          var tdNote = document.createElement("td");
          tdNote.textContent = sol.note;
          tdNote.style.color = phToColor(sol.ph);

          tr.appendChild(tdName);
          tr.appendChild(tdPh);
          tr.appendChild(tdNote);

          tr.addEventListener("click", function () {
            document.getElementById("phDirect").value = sol.ph;
            document.getElementById("hConc").value = "";
            document.getElementById("pohVal").value = "";
            showResult(sol.ph);
          });

          tbody.appendChild(tr);
        });
      }

      document.getElementById("btnCalcFromH").onclick = function () {
        var raw = document.getElementById("hConc").value.trim();
        var statusEl = document.getElementById("statusEl");
        if (!raw) {
          statusEl.textContent = "请输入 [H⁺] 浓度";
          statusEl.className = "status error";
          return;
        }
        var val = parseFloat(raw);
        if (isNaN(val) || val <= 0) {
          statusEl.textContent = "[H⁺] 必须是正数";
          statusEl.className = "status error";
          return;
        }
        var ph = -Math.log10(val);
        document.getElementById("pohVal").value = "";
        document.getElementById("phDirect").value = "";
        showResult(ph);
      };

      document.getElementById("btnCalcFromPOH").onclick = function () {
        var raw = document.getElementById("pohVal").value.trim();
        var statusEl = document.getElementById("statusEl");
        if (!raw) {
          statusEl.textContent = "请输入 pOH 值";
          statusEl.className = "status error";
          return;
        }
        var poh = parseFloat(raw);
        if (isNaN(poh) || poh < 0 || poh > 14) {
          statusEl.textContent = "pOH 必须在 0–14 之间";
          statusEl.className = "status error";
          return;
        }
        var ph = 14 - poh;
        document.getElementById("hConc").value = "";
        document.getElementById("phDirect").value = "";
        showResult(ph);
      };

      document.getElementById("btnCalcFromPH").onclick = function () {
        var raw = document.getElementById("phDirect").value.trim();
        var statusEl = document.getElementById("statusEl");
        if (!raw) {
          statusEl.textContent = "请输入 pH 值";
          statusEl.className = "status error";
          return;
        }
        var ph = parseFloat(raw);
        if (isNaN(ph) || ph < 0 || ph > 14) {
          statusEl.textContent = "pH 必须在 0–14 之间";
          statusEl.className = "status error";
          return;
        }
        document.getElementById("hConc").value = "";
        document.getElementById("pohVal").value = "";
        showResult(ph);
      };

      document.getElementById("btnClear").onclick = function () {
        document.getElementById("hConc").value = "";
        document.getElementById("pohVal").value = "";
        document.getElementById("phDirect").value = "";
        document.getElementById("resultCard").style.display = "none";
        document.getElementById("scaleMarker").style.left = "50%";
        var statusEl = document.getElementById("statusEl");
        statusEl.textContent = "";
        statusEl.className = "status";
      };

      document.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          var active = document.activeElement;
          if (active && active.id === "hConc") {
            document.getElementById("btnCalcFromH").click();
          } else if (active && active.id === "pohVal") {
            document.getElementById("btnCalcFromPOH").click();
          } else if (active && active.id === "phDirect") {
            document.getElementById("btnCalcFromPH").click();
          }
        }
      });

      buildRefTable();
      showResult(7);

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
    
