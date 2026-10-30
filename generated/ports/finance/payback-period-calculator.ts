// @ts-nocheck
// Generated from tools/finance/payback-period-calculator.html
// Source SHA-256: 90cdbecc25ac55639b056d7dfb140106be0ddb9b846ab8c01cf831024d068474
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "payback_period_v1";

      /* ──────── 状态 ──────── */
      var cashflows = [150000, 200000, 250000, 300000, 350000, 400000];

      /* ──────── DOM 元素 ──────── */
      var rowsEl = document.getElementById("cashflowRows");
      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");
      var resultSection = document.getElementById("resultSection");
      var cfTableBody = document.getElementById("cfTableBody");

      /* ──────── 行管理 ──────── */
      function renderRows() {
        rowsEl.innerHTML = "";
        cashflows.forEach(function (cf, i) {
          var row = document.createElement("div");
          row.className = "cashflow-row";

          var yearSpan = document.createElement("span");
          yearSpan.className = "cashflow-row-year";
          yearSpan.textContent = "第 " + (i + 1) + " 年";

          var inp = document.createElement("input");
          inp.type = "number";
          inp.step = "1";
          inp.placeholder = "净现金流";
          inp.value = cf !== null && cf !== undefined ? String(cf) : "";
          inp.dataset.idx = String(i);
          inp.addEventListener("input", function () {
            var idx = parseInt(this.dataset.idx, 10);
            var v = parseFloat(this.value);
            cashflows[idx] = isNaN(v) ? 0 : v;
          });

          var removeBtn = document.createElement("button");
          removeBtn.className = "btn-remove-row";
          removeBtn.textContent = "×";
          removeBtn.title = "删除此行";
          removeBtn.dataset.idx = String(i);
          removeBtn.addEventListener("click", function () {
            var idx = parseInt(this.dataset.idx, 10);
            cashflows.splice(idx, 1);
            renderRows();
          });

          row.appendChild(yearSpan);
          row.appendChild(inp);
          row.appendChild(removeBtn);
          rowsEl.appendChild(row);
        });
      }

      /* ──────── 格式化工具 ──────── */
      function fmtNum(n) {
        if (Math.abs(n) >= 1e8) return (n / 1e8).toFixed(2) + " 亿";
        if (Math.abs(n) >= 1e4) return (n / 1e4).toFixed(2) + " 万";
        return n.toFixed(2);
      }

      function fmtPeriod(years) {
        var y = Math.floor(years);
        var m = Math.round((years - y) * 12);
        if (m === 12) {
          y += 1;
          m = 0;
        }
        if (y === 0) return m + " 个月";
        if (m === 0) return y + " 年";
        return y + " 年 " + m + " 个月";
      }

      /* ──────── 计算核心 ──────── */
      function computePayback(investment, cfs, rate) {
        var n = cfs.length;
        var cumStatic = 0;
        var cumDynamic = 0;
        var staticPeriod = null;
        var dynamicPeriod = null;
        var rows = [];
        var r = rate / 100;

        for (var i = 0; i < n; i++) {
          var cf = cfs[i];
          var discount = cf / Math.pow(1 + r, i + 1);
          var prevCumStatic = cumStatic;
          var prevCumDynamic = cumDynamic;
          cumStatic += cf;
          cumDynamic += discount;

          // 静态回收期
          if (staticPeriod === null && cumStatic - investment >= 0) {
            var prevNet = prevCumStatic - investment;
            if (prevNet >= 0) {
              staticPeriod = i; // 已经回收（不应到这里）
            } else {
              // 在第 i+1 年内回收：i 年后剩 prevNet（负数），本年回收 cf
              staticPeriod = i + -prevNet / cf;
            }
          }

          // 动态回收期
          if (dynamicPeriod === null && cumDynamic - investment >= 0) {
            var prevDynNet = prevCumDynamic - investment;
            if (prevDynNet >= 0) {
              dynamicPeriod = i;
            } else {
              dynamicPeriod = i + -prevDynNet / discount;
            }
          }

          rows.push({
            year: i + 1,
            cf: cf,
            cumStatic: cumStatic - investment,
            discountedCF: discount,
            cumDynamic: cumDynamic - investment
          });
        }

        return {
          staticPeriod: staticPeriod,
          dynamicPeriod: dynamicPeriod,
          rows: rows,
          totalCF: cumStatic,
          npv: cumDynamic - investment
        };
      }

      /* ──────── 图表绘制 ──────── */
      function drawChart(rows, investment) {
        var canvas = document.getElementById("cfChart");
        var ctx = canvas.getContext("2d");

        // DPI 适配
        var dpr = window.devicePixelRatio || 1;
        var rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = 220 * dpr;
        ctx.scale(dpr, dpr);

        var W = rect.width;
        var H = 220;
        var padL = 72;
        var padR = 20;
        var padT = 24;
        var padB = 36;
        var chartW = W - padL - padR;
        var chartH = H - padT - padB;

        var isDark = document.documentElement.getAttribute("data-theme") !== "light";
        var colBg = isDark ? "#0e0e14" : "#f5f5f5";
        var colGrid = isDark ? "#2a2a3a" : "#e5e5e5";
        var colText = isDark ? "#55556a" : "#999";
        var colStatic = "#00f5d4";
        var colDynamic = "#4cc9f0";
        var colZero = isDark ? "#3a3a4a" : "#ccc";

        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = colBg;
        ctx.fillRect(0, 0, W, H);

        // 数据：从 -investment 开始（第 0 期）
        var staticData = [-investment].concat(
          rows.map(function (r) {
            return r.cumStatic;
          })
        );
        var dynamicData = [-investment].concat(
          rows.map(function (r) {
            return r.cumDynamic;
          })
        );
        var allVals = staticData.concat(dynamicData);
        var minVal = Math.min.apply(null, allVals);
        var maxVal = Math.max.apply(null, allVals);
        var span = maxVal - minVal || 1;
        var pad = span * 0.12;
        minVal -= pad;
        maxVal += pad;
        span = maxVal - minVal;

        function toX(i) {
          return padL + (i / (staticData.length - 1)) * chartW;
        }
        function toY(v) {
          return padT + ((maxVal - v) / span) * chartH;
        }

        // 网格线
        var gridCount = 4;
        for (var gi = 0; gi <= gridCount; gi++) {
          var gv = minVal + (span / gridCount) * gi;
          var gy = toY(gv);
          ctx.strokeStyle = colGrid;
          ctx.lineWidth = 0.5;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(padL, gy);
          ctx.lineTo(W - padR, gy);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = colText;
          ctx.font = "10px 'JetBrains Mono', monospace";
          ctx.textAlign = "right";
          ctx.fillText(fmtNum(gv), padL - 6, gy + 4);
        }

        // 零轴
        if (minVal < 0 && maxVal > 0) {
          var zy = toY(0);
          ctx.strokeStyle = colZero;
          ctx.lineWidth = 1;
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.moveTo(padL, zy);
          ctx.lineTo(W - padR, zy);
          ctx.stroke();
        }

        // X 轴标签
        ctx.fillStyle = colText;
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        staticData.forEach(function (v, i) {
          ctx.fillText(i === 0 ? "初始" : "Y" + i, toX(i), H - padB + 14);
        });

        // 折线绘制
        function drawLine(data, color, dash) {
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.setLineDash(dash || []);
          ctx.beginPath();
          data.forEach(function (v, i) {
            var px = toX(i);
            var py = toY(v);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          });
          ctx.stroke();
          ctx.setLineDash([]);
          data.forEach(function (v, i) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(toX(i), toY(v), 3.5, 0, Math.PI * 2);
            ctx.fill();
          });
        }

        drawLine(staticData, colStatic, []);
        drawLine(dynamicData, colDynamic, [5, 4]);

        // 图例
        var legX = padL + 8;
        var legY = padT + 12;
        ctx.fillStyle = colStatic;
        ctx.fillRect(legX, legY - 6, 16, 3);
        ctx.fillStyle = colText;
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.textAlign = "left";
        ctx.fillText("静态", legX + 20, legY);
        ctx.fillStyle = colDynamic;
        ctx.fillRect(legX + 60, legY - 6, 16, 3);
        ctx.fillStyle = colText;
        ctx.fillText("动态", legX + 80, legY);
      }

      /* ──────── 状态提示 ──────── */
      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      /* ──────── 主计算入口 ──────── */
      function calculate() {
        var investment = parseFloat(document.getElementById("initialInvestment").value);
        var rate = parseFloat(document.getElementById("discountRate").value);

        if (isNaN(investment) || investment <= 0) {
          showStatus("请输入有效的初始投资额", "error");
          return;
        }
        if (isNaN(rate) || rate < 0) {
          showStatus("请输入有效的折现率（≥0）", "error");
          return;
        }
        if (cashflows.length === 0) {
          showStatus("请至少添加一年现金流", "error");
          return;
        }

        var result = computePayback(investment, cashflows, rate);

        // 静态回收期
        if (result.staticPeriod !== null && isFinite(result.staticPeriod)) {
          document.getElementById("staticPayback").textContent = fmtPeriod(result.staticPeriod);
          document.getElementById("staticSub").textContent =
            "约 " + result.staticPeriod.toFixed(2) + " 年";
        } else {
          document.getElementById("staticPayback").textContent = "未回收";
          document.getElementById("staticSub").textContent = "现金流不足以回收投资";
        }

        // 动态回收期
        if (
          result.dynamicPeriod !== null &&
          isFinite(result.dynamicPeriod) &&
          result.dynamicPeriod >= 0
        ) {
          document.getElementById("dynamicPayback").textContent = fmtPeriod(result.dynamicPeriod);
          document.getElementById("dynamicSub").textContent =
            "折现率 " + rate + "% · 约 " + result.dynamicPeriod.toFixed(2) + " 年";
        } else {
          document.getElementById("dynamicPayback").textContent = "未回收";
          document.getElementById("dynamicSub").textContent = "折现后现金流不足以回收投资";
        }

        // 明细表格
        cfTableBody.innerHTML = "";
        result.rows.forEach(function (r) {
          var tr = document.createElement("tr");
          if (r.cumStatic >= 0) tr.classList.add("recovered");

          function td(val) {
            var cell = document.createElement("td");
            cell.textContent = val;
            return cell;
          }
          tr.appendChild(td("第 " + r.year + " 年"));
          tr.appendChild(td(fmtNum(r.cf)));
          tr.appendChild(td(fmtNum(r.cumStatic)));
          tr.appendChild(td(fmtNum(r.discountedCF)));
          tr.appendChild(td(fmtNum(r.cumDynamic)));
          cfTableBody.appendChild(tr);
        });

        // 统计栏
        document.getElementById("statYears").textContent = cashflows.length;
        document.getElementById("statTotalCF").textContent = fmtNum(result.totalCF);
        document.getElementById("statNPV").textContent = fmtNum(result.npv);
        statsEl.classList.add("show");

        resultSection.style.display = "";

        // 图表需要 resultSection 可见后再绘制
        requestAnimationFrame(function () {
          drawChart(result.rows, investment);
        });

        showStatus("计算完成", "success");
        saveToStorage();
      }

      /* ──────── 持久化 ──────── */
      function saveToStorage() {
        var data = {
          investment: document.getElementById("initialInvestment").value,
          rate: document.getElementById("discountRate").value,
          cfs: cashflows.slice()
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        try {
          var raw = localStorage.getItem(LS_KEY);
          if (!raw) return;
          var data = JSON.parse(raw);
          if (data.investment) document.getElementById("initialInvestment").value = data.investment;
          if (data.rate !== undefined) document.getElementById("discountRate").value = data.rate;
          if (Array.isArray(data.cfs) && data.cfs.length > 0) cashflows = data.cfs;
        } catch (e) {
          /* ignore */
        }
      }

      /* ──────── 示例数据 ──────── */
      function loadSample() {
        document.getElementById("initialInvestment").value = "1000000";
        document.getElementById("discountRate").value = "10";
        cashflows = [150000, 200000, 250000, 300000, 350000, 400000];
        renderRows();
        resultSection.style.display = "none";
        statsEl.classList.remove("show");
        showStatus('示例数据已载入，点击"计算"查看结果', "");
      }

      /* ──────── 等额填入 ──────── */
      function fillEqual() {
        var first = cashflows.length > 0 ? cashflows[0] : 0;
        for (var i = 0; i < cashflows.length; i++) {
          cashflows[i] = first;
        }
        renderRows();
      }

      /* ──────── 事件绑定 ──────── */
      document.getElementById("btnCalculate").onclick = calculate;

      document.getElementById("btnReset").onclick = function () {
        document.getElementById("initialInvestment").value = "";
        document.getElementById("discountRate").value = "10";
        cashflows = [0, 0, 0, 0, 0];
        renderRows();
        resultSection.style.display = "none";
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
        localStorage.removeItem(LS_KEY);
      };

      document.getElementById("btnAddYear").onclick = function () {
        cashflows.push(0);
        renderRows();
      };

      document.getElementById("btnFillEqual").onclick = fillEqual;
      document.getElementById("btnLoadSample").onclick = loadSample;

      // Ctrl/Cmd + Enter 触发计算
      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          calculate();
        }
      });

      // 窗口缩放重绘图表
      window.addEventListener("resize", function () {
        if (resultSection.style.display !== "none") {
          var investment = parseFloat(document.getElementById("initialInvestment").value);
          var rate = parseFloat(document.getElementById("discountRate").value);
          if (!isNaN(investment) && investment > 0 && !isNaN(rate)) {
            var result = computePayback(investment, cashflows, rate);
            drawChart(result.rows, investment);
          }
        }
      });

      /* ──────── 初始化 ──────── */
      loadFromStorage();
      renderRows();

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        // 主题切换后重绘图表
        if (resultSection.style.display !== "none") {
          var investment = parseFloat(document.getElementById("initialInvestment").value);
          var rate = parseFloat(document.getElementById("discountRate").value);
          if (!isNaN(investment) && investment > 0 && !isNaN(rate)) {
            var result = computePayback(investment, cashflows, rate);
            drawChart(result.rows, investment);
          }
        }
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
    
