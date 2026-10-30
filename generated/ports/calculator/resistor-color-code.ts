// @ts-nocheck
// Generated from tools/calculator/resistor-color-code.html
// Source SHA-256: c960e5f5c5754e191571eba94bf1266ce368c90c996dc30c51e06030637c181a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ── 数据表 ──────────────────────────────────────────────────
      const COLORS = [
        // name, hex, digit, multiplier, tolerance(%), tempco(ppm/°C)
        { name: "黑", en: "Black", hex: "#1a1a1a", digit: 0, mult: 1, tol: null, tc: 250 },
        { name: "棕", en: "Brown", hex: "#8b4513", digit: 1, mult: 10, tol: 1, tc: 100 },
        { name: "红", en: "Red", hex: "#cc2222", digit: 2, mult: 100, tol: 2, tc: 50 },
        { name: "橙", en: "Orange", hex: "#e06010", digit: 3, mult: 1000, tol: null, tc: 15 },
        { name: "黄", en: "Yellow", hex: "#e8c000", digit: 4, mult: 10000, tol: null, tc: 25 },
        { name: "绿", en: "Green", hex: "#248c24", digit: 5, mult: 100000, tol: 0.5, tc: 20 },
        { name: "蓝", en: "Blue", hex: "#1a5aba", digit: 6, mult: 1000000, tol: 0.25, tc: 10 },
        { name: "紫", en: "Violet", hex: "#7a30a0", digit: 7, mult: 10000000, tol: 0.1, tc: 5 },
        {
          name: "灰",
          en: "Gray",
          hex: "#888888",
          digit: 8,
          mult: 100000000,
          tol: 0.05,
          tc: 1
        },
        {
          name: "白",
          en: "White",
          hex: "#e8e8e8",
          digit: 9,
          mult: 1000000000,
          tol: null,
          tc: null
        },
        { name: "金", en: "Gold", hex: "#d4a843", digit: null, mult: 0.1, tol: 5, tc: null },
        { name: "银", en: "Silver", hex: "#b0b0b0", digit: null, mult: 0.01, tol: 10, tc: null },
        {
          name: "无",
          en: "None",
          hex: "transparent",
          digit: null,
          mult: null,
          tol: 20,
          tc: null
        }
      ];

      // 索引便捷访问
      const COLOR_BY_NAME = {};
      COLORS.forEach(function (c) {
        COLOR_BY_NAME[c.name] = c;
      });

      // 哪些颜色有数字位（digit 0-9）
      const DIGIT_COLORS = COLORS.filter(function (c) {
        return c.digit !== null;
      });
      // 哪些颜色有乘数
      const MULT_COLORS = COLORS.filter(function (c) {
        return c.mult !== null && c.name !== "无";
      });
      // 哪些颜色有误差
      const TOL_COLORS = COLORS.filter(function (c) {
        return c.tol !== null;
      });
      // 哪些颜色有温度系数
      const TC_COLORS = COLORS.filter(function (c) {
        return c.tc !== null;
      });

      // E 系列标称
      const E_SERIES = {
        E12: [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2],
        E24: [
          1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1,
          5.6, 6.2, 6.8, 7.5, 8.2, 9.1
        ],
        E96: [
          1.0, 1.02, 1.05, 1.07, 1.1, 1.13, 1.15, 1.18, 1.21, 1.24, 1.27, 1.3, 1.33, 1.37, 1.4,
          1.43, 1.47, 1.5, 1.54, 1.58, 1.62, 1.65, 1.69, 1.74, 1.78, 1.82, 1.87, 1.91, 1.96, 2.0,
          2.05, 2.1, 2.15, 2.21, 2.26, 2.32, 2.37, 2.43, 2.49, 2.55, 2.61, 2.67, 2.74, 2.8, 2.87,
          2.94, 3.01, 3.09, 3.16, 3.24, 3.32, 3.4, 3.48, 3.57, 3.65, 3.74, 3.83, 3.92, 4.02, 4.12,
          4.22, 4.32, 4.42, 4.53, 4.64, 4.75, 4.87, 4.99, 5.11, 5.23, 5.36, 5.49, 5.62, 5.76, 5.9,
          6.04, 6.19, 6.34, 6.49, 6.65, 6.81, 6.98, 7.15, 7.32, 7.5, 7.68, 7.87, 8.06, 8.25, 8.45,
          8.66, 8.87, 9.09, 9.31, 9.53, 9.76
        ]
      };

      // ── 状态 ──────────────────────────────────────────────────
      var bandCount = 4;
      // 默认色环 (4环: 棕黑橙金 = 10kΩ ±5%)
      var selectedBands = ["棕", "黑", "橙", "金"];

      // ── DOM 引用 ──────────────────────────────────────────────
      const resistorVisual = document.getElementById("resistorVisual");
      const bandSelectorsEl = document.getElementById("bandSelectors");
      const resultValueEl = document.getElementById("resultValue");
      const resultMetaEl = document.getElementById("resultMeta");
      const statusEl = document.getElementById("statusEl");

      // ── 模式切换 ─────────────────────────────────────────────
      function setMode(n) {
        bandCount = n;
        if (n === 4) selectedBands = ["棕", "黑", "橙", "金"];
        else if (n === 5) selectedBands = ["棕", "黑", "黑", "橙", "棕"];
        else selectedBands = ["棕", "黑", "黑", "橙", "棕", "棕"];
        ["btnMode4", "btnMode5", "btnMode6"].forEach(function (id, i) {
          const el = document.getElementById(id);
          if (el) el.classList.toggle("active", i + 4 === n);
        });
        renderBandSelectors();
        renderResistor();
        calculate();
      }

      document.getElementById("btnMode4").onclick = function () {
        setMode(4);
      };
      document.getElementById("btnMode5").onclick = function () {
        setMode(5);
      };
      document.getElementById("btnMode6").onclick = function () {
        setMode(6);
      };

      // ── 色环 meta：每个位置的含义 ─────────────────────────────
      function getBandMeta(index) {
        if (bandCount === 4) {
          const labels = ["第 1 位数字", "第 2 位数字", "乘数", "误差"];
          const pools = [DIGIT_COLORS, DIGIT_COLORS, MULT_COLORS, TOL_COLORS];
          return { label: labels[index], pool: pools[index] };
        } else if (bandCount === 5) {
          const labels = ["第 1 位数字", "第 2 位数字", "第 3 位数字", "乘数", "误差"];
          const pools = [DIGIT_COLORS, DIGIT_COLORS, DIGIT_COLORS, MULT_COLORS, TOL_COLORS];
          return { label: labels[index], pool: pools[index] };
        } else {
          const labels = ["第 1 位数字", "第 2 位数字", "第 3 位数字", "乘数", "误差", "温度系数"];
          const pools = [
            DIGIT_COLORS,
            DIGIT_COLORS,
            DIGIT_COLORS,
            MULT_COLORS,
            TOL_COLORS,
            TC_COLORS
          ];
          return { label: labels[index], pool: pools[index] };
        }
      }

      // ── 渲染 <select> 选择器 ──────────────────────────────────
      function renderBandSelectors() {
        bandSelectorsEl.innerHTML = "";
        for (var i = 0; i < bandCount; i++) {
          const meta = getBandMeta(i);
          const row = document.createElement("div");
          row.className = "band-row";

          const labelEl = document.createElement("div");
          labelEl.className = "band-label";
          const dot = document.createElement("span");
          dot.className = "band-dot";
          dot.style.background = getColor(selectedBands[i]).hex;
          labelEl.appendChild(dot);
          labelEl.appendChild(document.createTextNode(meta.label));

          const sel = document.createElement("select");
          sel.className = "band-select";
          sel.id = "band_" + i;
          meta.pool.forEach(function (c) {
            const opt = document.createElement("option");
            opt.value = c.name;
            opt.textContent = c.name + " (" + c.en + ")";
            if (c.name === selectedBands[i]) opt.selected = true;
            sel.appendChild(opt);
          });
          (function (idx, selEl) {
            selEl.onchange = function () {
              selectedBands[idx] = selEl.value;
              updateBandDot(idx);
              renderResistor();
              calculate();
            };
          })(i, sel);

          row.appendChild(labelEl);
          row.appendChild(sel);
          bandSelectorsEl.appendChild(row);
        }
      }

      function updateBandDot(idx) {
        const row = bandSelectorsEl.children[idx];
        if (!row) return;
        const dot = row.querySelector(".band-dot");
        if (dot) dot.style.background = getColor(selectedBands[idx]).hex;
      }

      // ── 渲染电阻可视化 ────────────────────────────────────────
      function renderResistor() {
        resistorVisual.innerHTML = "";
        const lw = document.createElement("div");
        lw.className = "resistor-wire";
        resistorVisual.appendChild(lw);

        const body = document.createElement("div");
        body.className = "resistor-body";

        const base1 = document.createElement("div");
        base1.className = "resistor-base";
        body.appendChild(base1);

        for (var j = 0; j < bandCount; j++) {
          const band = document.createElement("div");
          band.className = "resistor-band";
          const c = getColor(selectedBands[j]);
          band.style.background = c.hex !== "transparent" ? c.hex : "#d4a843";
          body.appendChild(band);

          if (j < bandCount - 2) {
            const gap = document.createElement("div");
            gap.className = "resistor-gap";
            body.appendChild(gap);
          } else if (j === bandCount - 2) {
            const gapWide = document.createElement("div");
            gapWide.className = "resistor-gap-wide";
            body.appendChild(gapWide);
          }
        }

        const base2 = document.createElement("div");
        base2.className = "resistor-base";
        body.appendChild(base2);

        resistorVisual.appendChild(body);

        const rw = document.createElement("div");
        rw.className = "resistor-wire";
        resistorVisual.appendChild(rw);
      }

      // ── 计算阻值 ──────────────────────────────────────────────
      function calculate() {
        var digits = 0;
        var multColor, tolColor, tcColor;

        if (bandCount === 4) {
          const d1 = getColor(selectedBands[0]);
          const d2 = getColor(selectedBands[1]);
          if (d1.digit === null || d2.digit === null) {
            showResult(null, "请选择有效的数字色环");
            return;
          }
          digits = d1.digit * 10 + d2.digit;
          multColor = getColor(selectedBands[2]);
          tolColor = getColor(selectedBands[3]);
        } else if (bandCount === 5) {
          const d1 = getColor(selectedBands[0]);
          const d2 = getColor(selectedBands[1]);
          const d3 = getColor(selectedBands[2]);
          if (d1.digit === null || d2.digit === null || d3.digit === null) {
            showResult(null, "请选择有效的数字色环");
            return;
          }
          digits = d1.digit * 100 + d2.digit * 10 + d3.digit;
          multColor = getColor(selectedBands[3]);
          tolColor = getColor(selectedBands[4]);
        } else {
          const d1 = getColor(selectedBands[0]);
          const d2 = getColor(selectedBands[1]);
          const d3 = getColor(selectedBands[2]);
          if (d1.digit === null || d2.digit === null || d3.digit === null) {
            showResult(null, "请选择有效的数字色环");
            return;
          }
          digits = d1.digit * 100 + d2.digit * 10 + d3.digit;
          multColor = getColor(selectedBands[3]);
          tolColor = getColor(selectedBands[4]);
          tcColor = getColor(selectedBands[5]);
        }

        if (multColor.mult === null) {
          showResult(null, "乘数色环无效");
          return;
        }
        if (tolColor.tol === null) {
          showResult(null, "误差色环无效");
          return;
        }

        const ohms = digits * multColor.mult;
        const tol = tolColor.tol;
        const tc = tcColor ? tcColor.tc : null;

        showResult(ohms, null, tol, tc);
        statusEl.textContent = "计算完成";
        statusEl.className = "status success";
      }

      function showResult(ohms, errMsg, tol, tc) {
        if (ohms === null) {
          resultValueEl.textContent = "—";
          resultMetaEl.innerHTML =
            '<span style="color:var(--color-error)">' + (errMsg || "无效") + "</span>";
          statusEl.textContent = errMsg || "无效";
          statusEl.className = "status error";
          return;
        }
        resultValueEl.textContent = formatOhms(ohms);

        var meta = "";
        if (tol !== null && tol !== undefined) {
          meta +=
            '<span>误差 <strong style="color:var(--color-accent-primary)">±' +
            tol +
            "%</strong></span>";
          const lo = (ohms * (1 - tol / 100)).toPrecision(4);
          const hi = (ohms * (1 + tol / 100)).toPrecision(4);
          meta +=
            '<span class="tag">' +
            formatOhmsShort(parseFloat(lo)) +
            " ~ " +
            formatOhmsShort(parseFloat(hi)) +
            "</span>";
        }
        if (tc !== null && tc !== undefined) {
          meta +=
            '<span>温度系数 <strong style="color:var(--color-accent-secondary)">' +
            tc +
            " ppm/°C</strong></span>";
        }
        resultMetaEl.innerHTML = meta;
      }

      // ── 格式化 ─────────────────────────────────────────────────
      function formatOhms(v) {
        if (v >= 1e9) return (v / 1e9).toPrecision(4).replace(/\.?0+$/, "") + " GΩ";
        if (v >= 1e6) return (v / 1e6).toPrecision(4).replace(/\.?0+$/, "") + " MΩ";
        if (v >= 1e3) return (v / 1e3).toPrecision(4).replace(/\.?0+$/, "") + " kΩ";
        return v.toPrecision(4).replace(/\.?0+$/, "") + " Ω";
      }
      function formatOhmsShort(v) {
        if (v >= 1e9) return (v / 1e9).toPrecision(3) + "G";
        if (v >= 1e6) return (v / 1e6).toPrecision(3) + "M";
        if (v >= 1e3) return (v / 1e3).toPrecision(3) + "k";
        return v.toPrecision(3) + "Ω";
      }

      function getColor(name) {
        return COLOR_BY_NAME[name] || COLORS[COLORS.length - 1];
      }

      // ── 复制 & 重置 ───────────────────────────────────────────
      document.getElementById("btnCopy").onclick = async function () {
        const txt = resultValueEl.textContent;
        if (txt === "—") {
          statusEl.textContent = "没有结果";
          statusEl.className = "status error";
          return;
        }
        try {
          await navigator.clipboard.writeText(txt);
          statusEl.textContent = "已复制";
          statusEl.className = "status success";
        } catch (e) {
          statusEl.textContent = "复制失败";
          statusEl.className = "status error";
        }
      };
      document.getElementById("btnReset").onclick = function () {
        setMode(bandCount);
      };

      // ── Tab 切换 ──────────────────────────────────────────────
      function switchTab(name) {
        ["Lookup", "Table", "Series"].forEach(function (t) {
          const btn = document.getElementById("tab" + t);
          const pan = document.getElementById("panel" + t);
          const active = t === name;
          if (btn) btn.classList.toggle("active", active);
          if (pan) pan.classList.toggle("active", active);
        });
      }
      document.getElementById("tabLookup").onclick = function () {
        switchTab("Lookup");
      };
      document.getElementById("tabTable").onclick = function () {
        switchTab("Table");
        renderColorTable();
      };
      document.getElementById("tabSeries").onclick = function () {
        switchTab("Series");
        renderSeries();
      };

      // ── 反查 ──────────────────────────────────────────────────
      function doLookup() {
        const valStr = document.getElementById("lookupVal").value.trim();
        const series = document.getElementById("lookupSeries").value;
        const container = document.getElementById("lookupResults");
        container.innerHTML = "";

        if (!valStr) {
          container.innerHTML = '<div class="lookup-empty">请输入阻值</div>';
          return;
        }
        const target = parseFloat(valStr);
        if (isNaN(target) || target <= 0) {
          container.innerHTML = '<div class="lookup-empty">请输入有效正数</div>';
          return;
        }

        const candidates = [];
        const seriesList = series === "all" ? ["E12", "E24", "E96"] : [series];
        const seen = new Set();
        seriesList.forEach(function (s) {
          E_SERIES[s].forEach(function (base) {
            for (var exp = 0; exp <= 9; exp++) {
              const v = parseFloat((base * Math.pow(10, exp)).toPrecision(6));
              const key = v.toFixed(6);
              if (!seen.has(key)) {
                seen.add(key);
                candidates.push({ v: v, s: s });
              }
            }
          });
        });
        candidates.sort(function (a, b) {
          return Math.abs(a.v - target) - Math.abs(b.v - target);
        });
        const top = candidates.slice(0, 8);

        if (top.length === 0) {
          container.innerHTML = '<div class="lookup-empty">无匹配结果</div>';
          return;
        }

        top.forEach(function (item) {
          const row = document.createElement("div");
          row.className = "lookup-result-row";

          const bandNames = valueToBands4(item.v);
          const bandsMini = document.createElement("div");
          bandsMini.className = "bands-mini";
          bandNames.forEach(function (bName) {
            const mb = document.createElement("div");
            mb.className = "mini-band";
            const col = getColor(bName);
            mb.style.background = col.hex !== "transparent" ? col.hex : "#aaa";
            mb.title = bName;
            bandsMini.appendChild(mb);
          });

          const info = document.createElement("div");
          info.style.display = "flex";
          info.style.flexDirection = "column";
          info.style.gap = "2px";

          const valSpan = document.createElement("span");
          valSpan.className = "lookup-result-val";
          valSpan.textContent = formatOhms(item.v);

          const bandText = document.createElement("span");
          bandText.style.color = "var(--text-muted)";
          bandText.style.fontSize = "0.7rem";
          bandText.textContent = bandNames.join(" · ") + " [" + item.s + "]";

          const err = ((Math.abs(item.v - target) / target) * 100).toFixed(2);
          const errSpan = document.createElement("span");
          const errNum = parseFloat(err);
          errSpan.style.color =
            errNum < 1
              ? "var(--color-success)"
              : errNum < 5
                ? "var(--color-warning)"
                : "var(--color-error)";
          errSpan.style.fontSize = "0.7rem";
          errSpan.textContent = "偏差 " + err + "%";

          info.appendChild(valSpan);
          info.appendChild(bandText);
          info.appendChild(errSpan);

          row.appendChild(info);
          row.appendChild(bandsMini);
          container.appendChild(row);
        });
      }

      // 将阻值转为 4 色环色带名（数1·数2·乘数·金5%）
      function valueToBands4(ohms) {
        var exp = Math.floor(Math.log10(ohms)) - 1;
        var sig = Math.round(ohms / Math.pow(10, exp));
        if (sig >= 100) {
          sig = Math.round(sig / 10);
          exp += 1;
        }
        const d1 = Math.floor(sig / 10);
        const d2 = sig % 10;
        const multVal = Math.pow(10, exp);

        const c1 = DIGIT_COLORS.find(function (c) {
          return c.digit === d1;
        });
        const c2 = DIGIT_COLORS.find(function (c) {
          return c.digit === d2;
        });
        const mc = MULT_COLORS.reduce(function (best, c) {
          return Math.abs(c.mult - multVal) < Math.abs(best.mult - multVal) ? c : best;
        });

        return [c1 ? c1.name : "黑", c2 ? c2.name : "黑", mc.name, "金"];
      }

      document.getElementById("lookupVal").addEventListener("input", doLookup);
      document.getElementById("lookupSeries").addEventListener("change", doLookup);

      // ── 色环参考表 ────────────────────────────────────────────
      var colorTableRendered = false;
      function renderColorTable() {
        if (colorTableRendered) return;
        colorTableRendered = true;
        const tbl = document.getElementById("colorRefTable");
        const thead = document.createElement("thead");
        const hr = document.createElement("tr");
        ["颜色", "数字位", "乘数", "误差", "温度系数(ppm/°C)"].forEach(function (h) {
          const th = document.createElement("th");
          th.textContent = h;
          hr.appendChild(th);
        });
        thead.appendChild(hr);
        tbl.appendChild(thead);

        const tbody = document.createElement("tbody");
        COLORS.forEach(function (c) {
          const tr = document.createElement("tr");

          const tdName = document.createElement("td");
          const swatch = document.createElement("span");
          swatch.className = "color-swatch";
          swatch.style.background = c.hex !== "transparent" ? c.hex : "var(--color-bg-card)";
          swatch.style.border =
            c.hex === "transparent"
              ? "1px dashed var(--color-border-strong)"
              : "1px solid rgba(255,255,255,0.2)";
          tdName.appendChild(swatch);
          tdName.appendChild(document.createTextNode(c.name + " " + c.en));
          tr.appendChild(tdName);

          const tdDigit = document.createElement("td");
          tdDigit.textContent = c.digit !== null ? c.digit : "—";
          tr.appendChild(tdDigit);

          const tdMult = document.createElement("td");
          tdMult.textContent = c.mult !== null ? "×" + formatOhmsNum(c.mult) : "—";
          tr.appendChild(tdMult);

          const tdTol = document.createElement("td");
          tdTol.textContent = c.tol !== null ? "±" + c.tol + "%" : "—";
          tr.appendChild(tdTol);

          const tdTc = document.createElement("td");
          tdTc.textContent = c.tc !== null ? c.tc : "—";
          tr.appendChild(tdTc);

          tbody.appendChild(tr);
        });
        tbl.appendChild(tbody);
      }

      function formatOhmsNum(v) {
        if (v >= 1e9) return v / 1e9 + "G";
        if (v >= 1e6) return v / 1e6 + "M";
        if (v >= 1e3) return v / 1e3 + "k";
        return v;
      }

      // ── E 系列 ─────────────────────────────────────────────────
      var seriesRendered = {};
      function renderSeries() {
        const sel = document.getElementById("seriesSelect").value;
        const container = document.getElementById("seriesValues");
        if (seriesRendered[sel]) return;
        seriesRendered[sel] = true;
        const vals = E_SERIES[sel];
        const all = [];
        vals.forEach(function (base) {
          for (var exp = 0; exp <= 6; exp++) {
            all.push(parseFloat((base * Math.pow(10, exp)).toPrecision(4)));
          }
        });
        all.sort(function (a, b) {
          return a - b;
        });
        container.textContent = all.map(formatOhmsShort).join("  ");
      }
      document.getElementById("seriesSelect").addEventListener("change", function () {
        seriesRendered = {};
        renderSeries();
      });

      // ── 初始化 ────────────────────────────────────────────────
      setMode(4);

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
    
