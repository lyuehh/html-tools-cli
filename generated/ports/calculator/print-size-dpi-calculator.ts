// @ts-nocheck
// Generated from tools/calculator/print-size-dpi-calculator.html
// Source SHA-256: 1b4ab665f1cfe64f1b011476a64353da3f4c501804ecc968cf28136901f26ca0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var currentMode = "pixelToSize";
      var CM_PER_INCH = 2.54;

      var PAPER_PRESETS = [
        { name: '2"×3"（5×7.6cm）', wCm: 5.08, hCm: 7.62 },
        { name: '4"×6"（10.2×15.2cm）', wCm: 10.16, hCm: 15.24 },
        { name: '5"×7"（12.7×17.8cm）', wCm: 12.7, hCm: 17.78 },
        { name: '6"×8"（15.2×20.3cm）', wCm: 15.24, hCm: 20.32 },
        { name: '8"×10"（20.3×25.4cm）', wCm: 20.32, hCm: 25.4 },
        { name: "A4（21×29.7cm）", wCm: 21, hCm: 29.7 },
        { name: "A3（29.7×42cm）", wCm: 29.7, hCm: 42 },
        { name: "A2（42×59.4cm）", wCm: 42, hCm: 59.4 }
      ];

      function pxFromInch(inches, dpi) {
        return Math.ceil(inches * dpi);
      }
      function inchFromPx(px, dpi) {
        return px / dpi;
      }
      function inchToCm(inch) {
        return inch * CM_PER_INCH;
      }

      function fmt(n, dec) {
        return Number(n.toFixed(dec === undefined ? 2 : dec)).toLocaleString();
      }
      function fmtMP(px) {
        return (px / 1e6).toFixed(2) + " MP";
      }

      function qualityLabel(dpi) {
        if (dpi >= 300) return { text: "优秀（≥300 DPI）", cls: "quality-excellent" };
        if (dpi >= 150) return { text: "合格（150~299 DPI）", cls: "quality-good" };
        return { text: "偏低（<150 DPI）", cls: "quality-poor" };
      }

      function matchPaper(wCm, hCm) {
        var best = null;
        var bestDiff = Infinity;
        PAPER_PRESETS.forEach(function (p) {
          var d1 = Math.abs(p.wCm - wCm) + Math.abs(p.hCm - hCm);
          var d2 = Math.abs(p.wCm - hCm) + Math.abs(p.hCm - wCm);
          var d = Math.min(d1, d2);
          if (d < bestDiff) {
            bestDiff = d;
            best = p;
          }
        });
        return bestDiff < 1.5 ? best : null;
      }

      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function showError(elId, msg) {
        var el = document.getElementById(elId);
        el.textContent = msg;
        el.classList.add("show");
      }
      function hideError(elId) {
        var el = document.getElementById(elId);
        el.textContent = "";
        el.classList.remove("show");
      }

      /* ---- Mode A: pixel → print size ---- */
      function calcPixelToSize() {
        hideError("errorPixel");
        var w = parseFloat(document.getElementById("pixW").value);
        var h = parseFloat(document.getElementById("pixH").value);
        var dpi = parseFloat(document.getElementById("pixDpi").value);

        if (!w || !h || !dpi || w <= 0 || h <= 0 || dpi <= 0) {
          showError("errorPixel", "请填写有效的像素宽度、高度和 DPI（均须大于 0）");
          document.getElementById("resultPixel").classList.remove("show");
          showStatus("输入有误", "error");
          return;
        }

        var inchW = inchFromPx(w, dpi);
        var inchH = inchFromPx(h, dpi);
        var cmW = inchToCm(inchW);
        var cmH = inchToCm(inchH);
        var totalPx = w * h;
        var q = qualityLabel(dpi);
        var paper = matchPaper(cmW, cmH);

        document.getElementById("resInchW").textContent = fmt(inchW) + " in";
        document.getElementById("resInchH").textContent = fmt(inchH) + " in";
        document.getElementById("resCmW").textContent = fmt(cmW) + " cm";
        document.getElementById("resCmH").textContent = fmt(cmH) + " cm";
        document.getElementById("resMegapix").textContent = fmtMP(totalPx);
        document.getElementById("resPaperMatch").textContent = paper ? paper.name : "无精确匹配";

        var qEl = document.getElementById("resQuality");
        qEl.textContent = q.text;
        qEl.className = "quality-badge " + q.cls;

        document.getElementById("resultPixel").classList.add("show");
        showStatus("打印尺寸：" + fmt(cmW) + " × " + fmt(cmH) + " cm @" + dpi + " DPI", "success");
      }

      /* ---- Mode B: print size → pixels ---- */
      function sizeToInch(val, unit) {
        if (unit === "cm") return val / CM_PER_INCH;
        if (unit === "mm") return val / 10 / CM_PER_INCH;
        return val; /* inch */
      }

      function calcSizeToPixel() {
        hideError("errorSize");
        var wVal = parseFloat(document.getElementById("sizeW").value);
        var hVal = parseFloat(document.getElementById("sizeH").value);
        var dpi = parseFloat(document.getElementById("sizeDpi").value);
        var unit = document.getElementById("sizeUnit").value;

        if (!wVal || !hVal || !dpi || wVal <= 0 || hVal <= 0 || dpi <= 0) {
          showError("errorSize", "请填写有效的目标尺寸和 DPI（均须大于 0）");
          document.getElementById("resultSize").classList.remove("show");
          showStatus("输入有误", "error");
          return;
        }

        var inchW = sizeToInch(wVal, unit);
        var inchH = sizeToInch(hVal, unit);
        var cmW = inchToCm(inchW);
        var cmH = inchToCm(inchH);

        var pxW = pxFromInch(inchW, dpi);
        var pxH = pxFromInch(inchH, dpi);

        document.getElementById("resPixW").textContent = pxW.toLocaleString() + " px";
        document.getElementById("resPixH").textContent = pxH.toLocaleString() + " px";
        document.getElementById("resMinMegapix").textContent = fmtMP(pxW * pxH);
        document.getElementById("resSizeCm").textContent = fmt(cmW) + " × " + fmt(cmH) + " cm";
        document.getElementById("resSizeInch").textContent =
          fmt(inchW) + " × " + fmt(inchH) + " in";
        document.getElementById("res150").textContent =
          pxFromInch(inchW, 150).toLocaleString() +
          " × " +
          pxFromInch(inchH, 150).toLocaleString() +
          " px";
        document.getElementById("res300").textContent =
          pxFromInch(inchW, 300).toLocaleString() +
          " × " +
          pxFromInch(inchH, 300).toLocaleString() +
          " px";
        document.getElementById("res600").textContent =
          pxFromInch(inchW, 600).toLocaleString() +
          " × " +
          pxFromInch(inchH, 600).toLocaleString() +
          " px";

        document.getElementById("resultSize").classList.add("show");
        showStatus(
          "@" + dpi + " DPI 需要 " + pxW.toLocaleString() + " × " + pxH.toLocaleString() + " px",
          "success"
        );
      }

      /* ---- Reference table ---- */
      function buildRefTable() {
        var tbody = document.getElementById("refBody");
        PAPER_PRESETS.forEach(function (p) {
          var inchW = p.wCm / CM_PER_INCH;
          var inchH = p.hCm / CM_PER_INCH;
          var tr = document.createElement("tr");
          var tdSize = document.createElement("td");
          tdSize.textContent = fmt(p.wCm) + " × " + fmt(p.hCm) + " cm";
          var tdName = document.createElement("td");
          tdName.textContent = p.name;
          var td150 = document.createElement("td");
          td150.className = "ref-dpi";
          td150.textContent =
            pxFromInch(inchW, 150).toLocaleString() +
            " × " +
            pxFromInch(inchH, 150).toLocaleString();
          var td300 = document.createElement("td");
          td300.className = "ref-dpi";
          td300.textContent =
            pxFromInch(inchW, 300).toLocaleString() +
            " × " +
            pxFromInch(inchH, 300).toLocaleString();
          var td600 = document.createElement("td");
          td600.className = "ref-dpi";
          td600.textContent =
            pxFromInch(inchW, 600).toLocaleString() +
            " × " +
            pxFromInch(inchH, 600).toLocaleString();
          tr.appendChild(tdSize);
          tr.appendChild(tdName);
          tr.appendChild(td150);
          tr.appendChild(td300);
          tr.appendChild(td600);
          /* Click row to fill Mode B */
          tr.addEventListener("click", function () {
            switchMode("sizeToPixel");
            document.getElementById("sizeUnit").value = "cm";
            updateSizeLabels();
            document.getElementById("sizeW").value = p.wCm;
            document.getElementById("sizeH").value = p.hCm;
          });
          tbody.appendChild(tr);
        });
      }

      /* ---- Mode switching ---- */
      function switchMode(mode) {
        currentMode = mode;
        document.getElementById("panelPixelToSize").style.display =
          mode === "pixelToSize" ? "" : "none";
        document.getElementById("panelSizeToPixel").style.display =
          mode === "sizeToPixel" ? "" : "none";
        document.getElementById("btnModePixelToSize").className =
          "btn" + (mode === "pixelToSize" ? " btn-primary" : "");
        document.getElementById("btnModeSizeToPixel").className =
          "btn" + (mode === "sizeToPixel" ? " btn-primary" : "");
        showStatus("", "");
      }

      function updateSizeLabels() {
        var unit = document.getElementById("sizeUnit").value;
        var label = unit === "cm" ? "cm" : unit === "mm" ? "mm" : "英寸";
        document.getElementById("labelSizeW").textContent = "目标宽度（" + label + "）";
        document.getElementById("labelSizeH").textContent = "目标高度（" + label + "）";
      }

      /* ---- Event wiring ---- */
      document.getElementById("btnModePixelToSize").onclick = function () {
        switchMode("pixelToSize");
      };
      document.getElementById("btnModeSizeToPixel").onclick = function () {
        switchMode("sizeToPixel");
      };
      document.getElementById("btnCalcPixel").onclick = calcPixelToSize;
      document.getElementById("btnCalcSize").onclick = calcSizeToPixel;
      document.getElementById("sizeUnit").onchange = updateSizeLabels;

      document.getElementById("btnReset").onclick = function () {
        ["pixW", "pixH", "sizeW", "sizeH"].forEach(function (id) {
          document.getElementById(id).value = "";
        });
        document.getElementById("pixDpi").value = "300";
        document.getElementById("sizeDpi").value = "300";
        document.getElementById("resultPixel").classList.remove("show");
        document.getElementById("resultSize").classList.remove("show");
        hideError("errorPixel");
        hideError("errorSize");
        showStatus("", "");
      };

      /* Pixel→Size presets */
      document.querySelectorAll("[data-preset-w]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          document.getElementById("pixW").value = btn.getAttribute("data-preset-w");
          document.getElementById("pixH").value = btn.getAttribute("data-preset-h");
        });
      });

      /* Size→Pixel presets */
      document.querySelectorAll("[data-preset-size]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var parts = btn.getAttribute("data-preset-size").split("x");
          document.getElementById("sizeUnit").value = "cm";
          updateSizeLabels();
          document.getElementById("sizeW").value = parts[0];
          document.getElementById("sizeH").value = parts[1];
        });
      });

      /* Enter key to calculate */
      document.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          if (currentMode === "pixelToSize") {
            calcPixelToSize();
          } else {
            calcSizeToPixel();
          }
        }
      });

      /* Init */
      buildRefTable();

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
    
