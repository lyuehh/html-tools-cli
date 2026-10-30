// @ts-nocheck
// Generated from tools/calculator/normal-distribution-calculator.html
// Source SHA-256: 1124d114f1f3059e8b647fd913485b23bc94d70b4783b4655ae5331ffa3592ee
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ── 正态分布核心数学 ──

      // 误差函数近似（Abramowitz & Stegun 7.1.26，精度 ≈ 1.5e-7）
      function erf(x) {
        var sign = x >= 0 ? 1 : -1;
        x = Math.abs(x);
        var t = 1 / (1 + 0.3275911 * x);
        var y =
          1 -
          ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t +
            0.254829592) *
            t *
            Math.exp(-x * x);
        return sign * y;
      }

      // 标准正态 CDF Φ(z)
      function stdNormCdf(z) {
        return 0.5 * (1 + erf(z / Math.SQRT2));
      }

      // 标准正态 PDF φ(z)
      function stdNormPdf(z) {
        return Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
      }

      // 一般正态 PDF f(x; μ, σ)
      function normPdf(x, mu, sigma) {
        var z = (x - mu) / sigma;
        return stdNormPdf(z) / sigma;
      }

      // 一般正态 CDF F(x; μ, σ)
      function normCdf(x, mu, sigma) {
        return stdNormCdf((x - mu) / sigma);
      }

      // 逆标准正态 CDF（Beasley-Springer-Moro 算法，精度 ≈ 4.5e-4）
      function invNormCdf(p) {
        if (p <= 0) return -Infinity;
        if (p >= 1) return Infinity;
        var a = [
          -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2,
          -3.066479806614716e1, 2.506628277459239
        ];
        var b = [
          -5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1,
          -1.328068155288572e1
        ];
        var c = [
          -7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734,
          4.374664141464968, 2.938163982698783
        ];
        var d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
        var pLow = 0.02425;
        var pHigh = 1 - pLow;
        var q, r;
        if (p < pLow) {
          q = Math.sqrt(-2 * Math.log(p));
          return (
            (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
            ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
          );
        } else if (p <= pHigh) {
          q = p - 0.5;
          r = q * q;
          return (
            ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
            (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
          );
        } else {
          q = Math.sqrt(-2 * Math.log(1 - p));
          return (
            -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
            ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
          );
        }
      }

      // ── DOM 引用 ──
      var inputMuEl = document.getElementById("inputMu");
      var inputSigmaEl = document.getElementById("inputSigma");
      var inputXEl = document.getElementById("inputX");
      var inputAEl = document.getElementById("inputA");
      var inputBEl = document.getElementById("inputB");
      var inputZEl = document.getElementById("inputZ");
      var resultsEl = document.getElementById("resultsContainer");
      var statusEl = document.getElementById("statusMsg");
      var canvas = document.getElementById("bellCanvas");
      var ctx = canvas.getContext("2d");

      var panelMap = {
        point: document.getElementById("panelPoint"),
        interval: document.getElementById("panelInterval"),
        zscore: document.getElementById("panelZscore")
      };

      // ── 模式切换 ──
      document.querySelectorAll('input[name="mode"]').forEach(function (radio) {
        radio.addEventListener("change", function () {
          Object.keys(panelMap).forEach(function (k) {
            panelMap[k].style.display = k === radio.value ? "" : "none";
          });
          calculate();
        });
      });

      function getMode() {
        return document.querySelector('input[name="mode"]:checked').value;
      }

      // ── 数字格式化 ──
      function fmt(n, digits) {
        if (!isFinite(n)) return n > 0 ? "+∞" : "−∞";
        return n.toPrecision(digits || 7);
      }
      function fmtPct(p) {
        return (p * 100).toFixed(4) + "%";
      }

      // ── 结果渲染 ──
      function renderResults(rows) {
        resultsEl.innerHTML = "";
        rows.forEach(function (row) {
          var div = document.createElement("div");
          div.className = "nd-result-row";
          var lbl = document.createElement("span");
          lbl.className = "nd-result-label";
          lbl.textContent = row.label;
          var val = document.createElement("span");
          val.className = "nd-result-value";
          val.textContent = row.value;
          div.appendChild(lbl);
          div.appendChild(val);
          resultsEl.appendChild(div);
        });
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // ── 主计算函数 ──
      function calculate() {
        var mu = parseFloat(inputMuEl.value);
        var sigma = parseFloat(inputSigmaEl.value);

        if (isNaN(mu) || isNaN(sigma) || sigma <= 0) {
          showStatus("请输入有效的均值和正数标准差", "error");
          renderResults([{ label: "错误", value: "σ 必须 > 0" }]);
          return;
        }

        var mode = getMode();
        var rows = [];

        if (mode === "point") {
          var x = parseFloat(inputXEl.value);
          if (isNaN(x)) {
            showStatus("请输入有效的 x 值", "error");
            return;
          }
          var z = (x - mu) / sigma;
          var pdf = normPdf(x, mu, sigma);
          var cdf = normCdf(x, mu, sigma);
          rows = [
            { label: "Z-score", value: fmt(z) },
            { label: "PDF  f(x)", value: fmt(pdf) },
            { label: "CDF  P(X ≤ x)", value: fmt(cdf) + "  ≈ " + fmtPct(cdf) },
            { label: "P(X > x)", value: fmt(1 - cdf) + "  ≈ " + fmtPct(1 - cdf) },
            { label: "P(|X−μ| ≤ |x−μ|)", value: fmtPct(Math.abs(2 * cdf - 1)) }
          ];
          drawBell(mu, sigma, null, null, x, null);
        } else if (mode === "interval") {
          var a = parseFloat(inputAEl.value);
          var b = parseFloat(inputBEl.value);
          if (isNaN(a) || isNaN(b)) {
            showStatus("请输入有效的区间 [a, b]", "error");
            return;
          }
          if (a > b) {
            var tmp = a;
            a = b;
            b = tmp;
          }
          var pa = normCdf(a, mu, sigma);
          var pb = normCdf(b, mu, sigma);
          var pab = pb - pa;
          var za = (a - mu) / sigma;
          var zb = (b - mu) / sigma;
          rows = [
            { label: "P(a ≤ X ≤ b)", value: fmt(pab) + "  ≈ " + fmtPct(pab) },
            { label: "P(X < a)", value: fmtPct(pa) },
            { label: "P(X > b)", value: fmtPct(1 - pb) },
            { label: "Z(a)", value: fmt(za) },
            { label: "Z(b)", value: fmt(zb) }
          ];
          drawBell(mu, sigma, a, b, null, null);
        } else {
          var zVal = parseFloat(inputZEl.value);
          if (isNaN(zVal)) {
            showStatus("请输入有效的 Z 值", "error");
            return;
          }
          var xFromZ = mu + zVal * sigma;
          var cdfZ = stdNormCdf(zVal);
          var pdfZ = stdNormPdf(zVal);
          rows = [
            { label: "对应 x = μ + Z·σ", value: fmt(xFromZ) },
            { label: "Φ(Z)  =  P(X ≤ x)", value: fmt(cdfZ) + "  ≈ " + fmtPct(cdfZ) },
            { label: "1 − Φ(Z)", value: fmtPct(1 - cdfZ) },
            { label: "双侧  P(|X−μ| ≤ Z·σ)", value: fmtPct(Math.abs(2 * cdfZ - 1)) },
            { label: "φ(Z)  标准正态 PDF", value: fmt(pdfZ) }
          ];
          drawBell(mu, sigma, null, null, null, zVal);
        }

        renderResults(rows);
        showStatus("计算完成", "success");
      }

      // ── 钟形曲线绘制 ──
      function drawBell(mu, sigma, shadeLo, shadeHi, pointX, zVal) {
        var W = canvas.width;
        var H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        // 主题颜色
        var isDark = document.documentElement.getAttribute("data-theme") !== "light";
        var bgColor = isDark ? "#0e0e14" : "#f5f5f5";
        var axisColor = isDark ? "#2a2a3a" : "#d5d5d5";
        var curveColor = isDark ? "#00f5d4" : "#00d4b8";
        var shadeColor = isDark ? "rgba(0,245,212,0.25)" : "rgba(0,184,148,0.25)";
        var textColor = isDark ? "#8888a0" : "#666";
        var pointColor = isDark ? "#f72585" : "#e63975";
        var gridColor = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, W, H);

        var pad = { top: 20, right: 24, bottom: 44, left: 16 };
        var cW = W - pad.left - pad.right;
        var cH = H - pad.top - pad.bottom;

        // x 范围：μ ± 4σ
        var xMin = mu - 4 * sigma;
        var xMax = mu + 4 * sigma;

        function toCanvasX(x) {
          return pad.left + ((x - xMin) / (xMax - xMin)) * cW;
        }
        function toCanvasY(y) {
          var maxPdf = normPdf(mu, mu, sigma);
          return pad.top + cH - (y / (maxPdf * 1.12)) * cH;
        }

        var steps = 400;
        var dx = (xMax - xMin) / steps;

        // 网格
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        for (var g = -4; g <= 4; g++) {
          var gx = toCanvasX(mu + g * sigma);
          ctx.beginPath();
          ctx.moveTo(gx, pad.top);
          ctx.lineTo(gx, pad.top + cH);
          ctx.stroke();
        }

        // 填色区域（区间 / 单点左侧 / Z-score 左侧）
        var fillLo = null;
        var fillHi = null;
        if (shadeLo !== null && shadeHi !== null) {
          fillLo = shadeLo;
          fillHi = shadeHi;
        } else if (pointX !== null) {
          fillLo = xMin;
          fillHi = pointX;
        } else if (zVal !== null) {
          fillLo = xMin;
          fillHi = mu + zVal * sigma;
        }

        if (fillLo !== null && fillHi !== null) {
          ctx.beginPath();
          var fStart = Math.max(fillLo, xMin);
          var fEnd = Math.min(fillHi, xMax);
          ctx.moveTo(toCanvasX(fStart), toCanvasY(0));
          for (var xi = fStart; xi <= fEnd + dx; xi += dx) {
            var xClamped = Math.min(xi, fEnd);
            ctx.lineTo(toCanvasX(xClamped), toCanvasY(normPdf(xClamped, mu, sigma)));
          }
          ctx.lineTo(toCanvasX(fEnd), toCanvasY(0));
          ctx.closePath();
          ctx.fillStyle = shadeColor;
          ctx.fill();
        }

        // 曲线
        ctx.beginPath();
        for (var i = 0; i <= steps; i++) {
          var xv = xMin + i * dx;
          var yv = normPdf(xv, mu, sigma);
          if (i === 0) {
            ctx.moveTo(toCanvasX(xv), toCanvasY(yv));
          } else {
            ctx.lineTo(toCanvasX(xv), toCanvasY(yv));
          }
        }
        ctx.strokeStyle = curveColor;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // 坐标轴
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad.left, pad.top + cH);
        ctx.lineTo(pad.left + cW, pad.top + cH);
        ctx.stroke();

        // 标注 μ ± σ 刻度
        ctx.fillStyle = textColor;
        ctx.font = "11px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        var ticks = [-3, -2, -1, 0, 1, 2, 3];
        ticks.forEach(function (k) {
          var tx = toCanvasX(mu + k * sigma);
          var label =
            k === 0 ? "μ" : (k > 0 ? "μ+" : "μ") + (Math.abs(k) === 1 ? "" : Math.abs(k)) + "σ";
          ctx.fillText(label, tx, pad.top + cH + 16);
          ctx.beginPath();
          ctx.moveTo(tx, pad.top + cH);
          ctx.lineTo(tx, pad.top + cH + 5);
          ctx.strokeStyle = axisColor;
          ctx.stroke();
        });

        // 单点垂线
        if (pointX !== null && pointX >= xMin && pointX <= xMax) {
          var px = toCanvasX(pointX);
          var py = toCanvasY(normPdf(pointX, mu, sigma));
          ctx.beginPath();
          ctx.setLineDash([4, 4]);
          ctx.moveTo(px, pad.top + cH);
          ctx.lineTo(px, py);
          ctx.strokeStyle = pointColor;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, 2 * Math.PI);
          ctx.fillStyle = pointColor;
          ctx.fill();
        }
      }

      // ── Z 表速查 ──
      var ztableData = [
        { z: "±1.00σ", p: "68.27%" },
        { z: "±1.28σ", p: "79.97%" },
        { z: "±1.645σ", p: "90.00%" },
        { z: "±1.96σ", p: "95.00%" },
        { z: "±2.00σ", p: "95.45%" },
        { z: "±2.326σ", p: "98.00%" },
        { z: "±2.576σ", p: "99.00%" },
        { z: "±3.00σ", p: "99.73%" },
        { z: "±3.291σ", p: "99.90%" },
        { z: "±3.891σ", p: "99.99%" },
        { z: "Z=0", p: "Φ=50.00%" },
        { z: "Z=1.282", p: "Φ=90.00%" },
        { z: "Z=1.645", p: "Φ=95.00%" },
        { z: "Z=1.960", p: "Φ=97.50%" },
        { z: "Z=2.326", p: "Φ=99.00%" },
        { z: "Z=2.576", p: "Φ=99.50%" },
        { z: "Z=3.090", p: "Φ=99.90%" },
        { z: "Z=−1.645", p: "Φ=5.00%" },
        { z: "Z=−1.960", p: "Φ=2.50%" },
        { z: "Z=−2.326", p: "Φ=1.00%" }
      ];
      var ztableGrid = document.getElementById("ztableGrid");
      ztableData.forEach(function (item) {
        var cell = document.createElement("div");
        cell.className = "nd-ztable-cell";
        var s1 = document.createElement("span");
        s1.textContent = item.z;
        var s2 = document.createElement("span");
        s2.textContent = item.p;
        cell.appendChild(s1);
        cell.appendChild(s2);
        ztableGrid.appendChild(cell);
      });

      // ── 事件绑定 ──
      document.getElementById("btnCalc").onclick = calculate;
      document.getElementById("btnReset").onclick = function () {
        inputMuEl.value = "0";
        inputSigmaEl.value = "1";
        inputXEl.value = "0";
        inputAEl.value = "-1";
        inputBEl.value = "1";
        inputZEl.value = "1.96";
        document.getElementById("modePoint").checked = true;
        Object.keys(panelMap).forEach(function (k) {
          panelMap[k].style.display = k === "point" ? "" : "none";
        });
        statusEl.textContent = "";
        statusEl.className = "status";
        calculate();
      };

      // 任意输入变化时自动重算
      [inputMuEl, inputSigmaEl, inputXEl, inputAEl, inputBEl, inputZEl].forEach(function (el) {
        el.addEventListener("input", calculate);
      });

      // ── 主题切换后重绘曲线 ──
      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        calculate();
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
      calculate();
    
