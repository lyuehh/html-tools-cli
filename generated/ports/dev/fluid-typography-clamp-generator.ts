// @ts-nocheck
// Generated from tools/dev/fluid-typography-clamp-generator.html
// Source SHA-256: 5a285d27d759331e10e0c7facdbeeb227983ce66fd13df5f648b5fe4c6e8acda
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var minVpEl = document.getElementById("minVp");
      var maxVpEl = document.getElementById("maxVp");
      var minFsEl = document.getElementById("minFs");
      var maxFsEl = document.getElementById("maxFs");
      var rootFsEl = document.getElementById("rootFs");
      var outputUnitEl = document.getElementById("outputUnit");
      var useRoundEl = document.getElementById("useRound");
      var resultCodeEl = document.getElementById("resultCode");
      var resultBreakdownEl = document.getElementById("resultBreakdown");
      var resultBoxEl = document.getElementById("resultBox");
      var previewTextEl = document.getElementById("previewText");
      var previewFsDisplayEl = document.getElementById("previewFsDisplay");
      var vpDisplayEl = document.getElementById("vpDisplay");
      var vpSliderEl = document.getElementById("vpSlider");
      var sliderMinEl = document.getElementById("sliderMin");
      var sliderMaxEl = document.getElementById("sliderMax");
      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");

      var currentClamp = null;

      var PRESETS = {
        presetH1: { minFs: 24, maxFs: 48 },
        presetH2: { minFs: 20, maxFs: 36 },
        presetH3: { minFs: 18, maxFs: 28 },
        presetBody: { minFs: 16, maxFs: 18 },
        presetSm: { minFs: 13, maxFs: 15 },
        presetHero: { minFs: 36, maxFs: 72 }
      };

      Object.keys(PRESETS).forEach(function (id) {
        var btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener("click", function () {
          var p = PRESETS[id];
          minFsEl.value = p.minFs;
          maxFsEl.value = p.maxFs;
          generate();
        });
      });

      function roundVal(val, places) {
        var factor = Math.pow(10, places);
        return Math.round(val * factor) / factor;
      }

      function fmtNum(val) {
        return roundVal(val, 4);
      }

      function generate() {
        var minVp = parseFloat(minVpEl.value);
        var maxVp = parseFloat(maxVpEl.value);
        var minFs = parseFloat(minFsEl.value);
        var maxFs = parseFloat(maxFsEl.value);
        var rootFs = parseFloat(rootFsEl.value) || 16;
        var unit = outputUnitEl.value;

        if (
          isNaN(minVp) ||
          isNaN(maxVp) ||
          isNaN(minFs) ||
          isNaN(maxFs) ||
          minVp <= 0 ||
          maxVp <= 0 ||
          minFs <= 0 ||
          maxFs <= 0
        ) {
          showStatus("请输入有效的正数", "error");
          return;
        }
        if (minVp >= maxVp) {
          showStatus("最小视口宽度必须小于最大视口宽度", "error");
          return;
        }
        if (minFs > maxFs) {
          showStatus("最小字号不应大于最大字号", "error");
          return;
        }

        // clamp() fluid type formula:
        // slope = (maxFs - minFs) / (maxVp - minVp)
        // interceptPx = minFs - slope * minVp
        // slopeVw = slope * 100
        // font-size: clamp(minFs, interceptPx + slopeVw*1vw, maxFs)
        var slope = (maxFs - minFs) / (maxVp - minVp);
        var interceptPx = minFs - slope * minVp;
        var slopeVw = slope * 100;

        var clampStr;
        var interceptDisplay;
        if (unit === "rem") {
          var minRem = fmtNum(minFs / rootFs);
          var maxRem = fmtNum(maxFs / rootFs);
          var interceptRem = fmtNum(interceptPx / rootFs);
          var slopeVwFmt = fmtNum(slopeVw);
          var absInterceptRem = Math.abs(interceptRem);
          var interceptSign = interceptRem >= 0 ? " + " : " - ";
          clampStr =
            "clamp(" +
            minRem +
            "rem, " +
            absInterceptRem +
            "rem" +
            interceptSign +
            slopeVwFmt +
            "vw, " +
            maxRem +
            "rem)";
          interceptDisplay = interceptRem + "rem";
        } else {
          var interceptFmt = fmtNum(interceptPx);
          var slopeVwFmt2 = fmtNum(slopeVw);
          var absInterceptPx = Math.abs(interceptFmt);
          var interceptSign2 = interceptFmt >= 0 ? " + " : " - ";
          clampStr =
            "clamp(" +
            minFs +
            "px, " +
            absInterceptPx +
            "px" +
            interceptSign2 +
            slopeVwFmt2 +
            "vw, " +
            maxFs +
            "px)";
          interceptDisplay = interceptFmt + "px";
        }

        resultCodeEl.textContent = "font-size: " + clampStr + ";";
        resultBoxEl.classList.add("has-result");

        // breakdown cards
        resultBreakdownEl.innerHTML = "";
        var breakdownData = [
          {
            label: "min 字号",
            value: unit === "rem" ? fmtNum(minFs / rootFs) + "rem" : minFs + "px"
          },
          {
            label: "max 字号",
            value: unit === "rem" ? fmtNum(maxFs / rootFs) + "rem" : maxFs + "px"
          },
          { label: "斜率 (slope)", value: fmtNum(slopeVw) + "vw" },
          { label: "截距", value: interceptDisplay },
          { label: "视口范围", value: minVp + "px → " + maxVp + "px" },
          { label: "字号范围", value: minFs + "px → " + maxFs + "px" }
        ];
        breakdownData.forEach(function (item) {
          var div = document.createElement("div");
          div.className = "breakdown-item";
          var bdLabel = document.createElement("div");
          bdLabel.className = "bd-label";
          bdLabel.textContent = item.label;
          var bdValue = document.createElement("div");
          bdValue.className = "bd-value";
          bdValue.textContent = item.value;
          div.appendChild(bdLabel);
          div.appendChild(bdValue);
          resultBreakdownEl.appendChild(div);
        });

        currentClamp = { minVp: minVp, maxVp: maxVp, minFs: minFs, maxFs: maxFs };

        // update slider bounds
        vpSliderEl.min = minVp;
        vpSliderEl.max = maxVp;
        sliderMinEl.textContent = minVp + "px";
        sliderMaxEl.textContent = maxVp + "px";
        var currentSliderVal = parseFloat(vpSliderEl.value);
        if (currentSliderVal < minVp || currentSliderVal > maxVp) {
          vpSliderEl.value = Math.round((minVp + maxVp) / 2);
        }

        updatePreview();
        document.getElementById("statSlope").textContent = fmtNum(slopeVw) + "vw";
        document.getElementById("statIntercept").textContent = interceptDisplay;
        document.getElementById("statRange").textContent = minFs + "px → " + maxFs + "px";
        statsEl.classList.add("show");
        showStatus("clamp() 已生成", "success");
      }

      function calcFsAtVp(vp) {
        if (!currentClamp) return null;
        var s = currentClamp;
        var slope = (s.maxFs - s.minFs) / (s.maxVp - s.minVp);
        var intercept = s.minFs - slope * s.minVp;
        var computed = intercept + slope * vp;
        return Math.min(Math.max(computed, s.minFs), s.maxFs);
      }

      function updatePreview() {
        if (!currentClamp) return;
        var vp = parseFloat(vpSliderEl.value);
        var fs = calcFsAtVp(vp);
        if (fs === null) return;
        previewTextEl.style.fontSize = fs + "px";
        previewFsDisplayEl.textContent = "当前字号: " + roundVal(fs, 2) + "px";
        vpDisplayEl.textContent = "视口: " + vp + "px";
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      vpSliderEl.addEventListener("input", updatePreview);

      document.getElementById("btnGenerate").addEventListener("click", generate);

      document.getElementById("btnCopyResult").addEventListener("click", function () {
        var text = resultCodeEl.textContent;
        if (!text || text === "—") {
          showStatus("请先生成 clamp()", "error");
          return;
        }
        navigator.clipboard.writeText(text).then(
          function () {
            showStatus("已复制到剪贴板", "success");
          },
          function () {
            showStatus("复制失败", "error");
          }
        );
      });

      document.getElementById("btnReset").addEventListener("click", function () {
        minVpEl.value = 320;
        maxVpEl.value = 1280;
        minFsEl.value = 16;
        maxFsEl.value = 24;
        rootFsEl.value = 16;
        outputUnitEl.value = "rem";
        useRoundEl.checked = false;
        resultCodeEl.textContent = "—";
        resultBreakdownEl.innerHTML = "";
        resultBoxEl.classList.remove("has-result");
        previewTextEl.style.fontSize = "";
        previewFsDisplayEl.textContent = "当前字号: —";
        vpDisplayEl.textContent = "视口: — px";
        statsEl.classList.remove("show");
        currentClamp = null;
        showStatus("已重置", "");
      });

      // auto-regenerate on any input change
      [minVpEl, maxVpEl, minFsEl, maxFsEl, rootFsEl].forEach(function (el) {
        el.addEventListener("change", generate);
      });
      outputUnitEl.addEventListener("change", generate);
      useRoundEl.addEventListener("change", generate);

      // keyboard shortcut Ctrl/Cmd + Enter
      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          generate();
        }
      });

      // init
      generate();

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
    
