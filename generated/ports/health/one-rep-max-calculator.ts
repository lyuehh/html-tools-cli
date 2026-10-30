// @ts-nocheck
// Generated from tools/health/one-rep-max-calculator.html
// Source SHA-256: d45d3659f1681a1141a7118507de0db136bc94c90a0aec543b416dee9565aebd
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var weightEl = document.getElementById("weightInput");
      var repsEl = document.getElementById("repsInput");
      var unitEl = document.getElementById("unitSelect");
      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");
      var resultSection = document.getElementById("resultSection");
      var rm1Display = document.getElementById("rm1Display");
      var rm1Unit = document.getElementById("rm1Unit");
      var formulaGrid = document.getElementById("formulaGrid");
      var pctBody = document.getElementById("pctBody");

      var LS_KEY = "one_rep_max_v1";

      /* ── 1RM 公式 ── */
      function epley(w, r) {
        if (r === 1) return w;
        return w * (1 + r / 30);
      }
      function brzycki(w, r) {
        if (r === 1) return w;
        return w * (36 / (37 - r));
      }
      function lombardi(w, r) {
        return w * Math.pow(r, 0.1);
      }
      function mayhew(w, r) {
        return (100 * w) / (52.2 + 41.9 * Math.exp(-0.055 * r));
      }
      function oConner(w, r) {
        return w * (1 + r / 40);
      }
      function wathan(w, r) {
        return (100 * w) / (48.8 + 53.8 * Math.exp(-0.075 * r));
      }

      var FORMULAS = [
        { id: "epley", name: "Epley", fn: epley },
        { id: "brzycki", name: "Brzycki", fn: brzycki },
        { id: "lombardi", name: "Lombardi", fn: lombardi },
        { id: "mayhew", name: "Mayhew", fn: mayhew },
        { id: "oconner", name: "O'Conner", fn: oConner },
        { id: "wathan", name: "Wathan", fn: wathan }
      ];

      /* 百分比表数据 */
      var PCT_ROWS = [
        { pct: 100, repsRange: "1", goal: "最大力量测试" },
        { pct: 95, repsRange: "2", goal: "最大力量" },
        { pct: 90, repsRange: "3", goal: "力量 / 爆发力" },
        { pct: 85, repsRange: "4–5", goal: "力量" },
        { pct: 80, repsRange: "5–6", goal: "力量增肌" },
        { pct: 75, repsRange: "6–8", goal: "力量增肌" },
        { pct: 70, repsRange: "8–10", goal: "肌肉肥大" },
        { pct: 65, repsRange: "10–12", goal: "肌肉肥大" },
        { pct: 60, repsRange: "12–15", goal: "肌耐力" },
        { pct: 55, repsRange: "15–20", goal: "肌耐力" },
        { pct: 50, repsRange: "20+", goal: "有氧耐力" }
      ];

      function roundTo(val, dec) {
        var f = Math.pow(10, dec);
        return Math.round(val * f) / f;
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function saveState() {
        try {
          localStorage.setItem(
            LS_KEY,
            JSON.stringify({
              weight: weightEl.value,
              reps: repsEl.value,
              unit: unitEl.value
            })
          );
        } catch (e) {
          /* ignore */
        }
      }

      function loadState() {
        try {
          var raw = localStorage.getItem(LS_KEY);
          if (!raw) return;
          var state = JSON.parse(raw);
          if (state.weight) weightEl.value = state.weight;
          if (state.reps) repsEl.value = state.reps;
          if (state.unit) unitEl.value = state.unit;
        } catch (e) {
          /* ignore */
        }
      }

      function calc() {
        var weight = parseFloat(weightEl.value);
        var reps = parseInt(repsEl.value, 10);
        var unit = unitEl.value;

        if (!weight || weight <= 0 || isNaN(weight)) {
          showStatus("请输入有效的重量", "error");
          return;
        }
        if (!reps || reps < 1 || reps > 30 || isNaN(reps)) {
          showStatus("次数须在 1–30 之间", "error");
          return;
        }

        saveState();

        /* 计算各公式 */
        var results = FORMULAS.map(function (f) {
          return { name: f.name, val: roundTo(f.fn(weight, reps), 1) };
        });

        /* 平均值（排除最大最小各1个再平均，若公式 >= 4） */
        var sorted = results.map(function (r) {
          return r.val;
        });
        sorted.sort(function (a, b) {
          return a - b;
        });
        var trimmed = sorted.length >= 4 ? sorted.slice(1, sorted.length - 1) : sorted;
        var avg =
          trimmed.reduce(function (s, v) {
            return s + v;
          }, 0) / trimmed.length;
        var avgRounded = roundTo(avg, 1);

        /* 更新主显示 */
        rm1Display.textContent = avgRounded;
        rm1Unit.textContent = unit;

        /* 公式卡片 */
        formulaGrid.innerHTML = "";
        results.forEach(function (r) {
          var card = document.createElement("div");
          card.className = "formula-card" + (r.val === avgRounded ? " highlight" : "");
          var nameEl = document.createElement("div");
          nameEl.className = "formula-name";
          nameEl.textContent = r.name;
          var valEl = document.createElement("div");
          valEl.className = "formula-val";
          valEl.textContent = r.val + " " + unit;
          card.appendChild(nameEl);
          card.appendChild(valEl);
          formulaGrid.appendChild(card);
        });

        /* 百分比表 */
        pctBody.innerHTML = "";
        PCT_ROWS.forEach(function (row) {
          var tr = document.createElement("tr");
          var weightAtPct = roundTo((avgRounded * row.pct) / 100, 1);
          var isCurrentPct = reps === 1 && row.pct === 100;
          tr.innerHTML =
            '<td class="' +
            (isCurrentPct ? "pct-highlight" : "") +
            '">' +
            row.pct +
            "%</td>" +
            '<td class="' +
            (isCurrentPct ? "pct-highlight" : "") +
            '">' +
            weightAtPct +
            " " +
            unit +
            "</td>" +
            "<td>" +
            row.repsRange +
            " 次</td>" +
            "<td>" +
            row.goal +
            "</td>";
          pctBody.appendChild(tr);
        });

        /* 状态栏 stats */
        document.getElementById("statEpley").textContent = results[0].val + " " + unit;
        document.getElementById("statBrzycki").textContent = results[1].val + " " + unit;
        document.getElementById("statAvg").textContent = avgRounded + " " + unit;
        statsEl.classList.add("show");

        resultSection.style.display = "";
        showStatus("计算完成（次数 " + reps + "，平均估算 1RM）", "success");
      }

      document.getElementById("btnCalc").onclick = calc;

      document.getElementById("btnReset").onclick = function () {
        weightEl.value = "";
        repsEl.value = "";
        resultSection.style.display = "none";
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
        try {
          localStorage.removeItem(LS_KEY);
        } catch (e) {
          /* ignore */
        }
      };

      document.getElementById("btnCopyResult").onclick = async function () {
        var rm1 = rm1Display.textContent;
        if (!rm1 || rm1 === "—") {
          showStatus("尚无结果", "error");
          return;
        }
        var unit = unitEl.value;
        var lines = ["1RM 估算结果（" + unit + "）", "平均: " + rm1 + " " + unit];
        document.querySelectorAll(".formula-card").forEach(function (card) {
          var nameDiv = card.querySelector(".formula-name");
          var valDiv = card.querySelector(".formula-val");
          if (nameDiv && valDiv) {
            lines.push(nameDiv.textContent + ": " + valDiv.textContent);
          }
        });
        try {
          await navigator.clipboard.writeText(lines.join("\n"));
          showStatus("已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      /* 回车触发计算 */
      [weightEl, repsEl].forEach(function (el) {
        el.addEventListener("keydown", function (e) {
          if (e.key === "Enter") calc();
        });
      });

      /* 单位切换时重算 */
      unitEl.addEventListener("change", function () {
        if (rm1Display.textContent !== "—") calc();
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
      loadState();
    
