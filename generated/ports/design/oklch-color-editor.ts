// @ts-nocheck
// Generated from tools/design/oklch-color-editor.html
// Source SHA-256: c2682b2ac5a5bf7906533675d357d3539ba58ae6c39fb4a3a495c7422421201f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ── OKLCH math helpers ──────────────────────────────────────────────────

      function oklchToOklab(L, C, H) {
        var hRad = (H * Math.PI) / 180;
        return { L: L, a: C * Math.cos(hRad), b: C * Math.sin(hRad) };
      }

      function oklabToLinearSrgb(lab) {
        var l = lab.L + 0.3963377774 * lab.a + 0.2158037573 * lab.b;
        var m = lab.L - 0.1055613458 * lab.a - 0.0638541728 * lab.b;
        var s = lab.L - 0.0894841775 * lab.a - 1.291485548 * lab.b;

        l = l * l * l;
        m = m * m * m;
        s = s * s * s;

        return {
          r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
          g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
          b: -0.004196086 * l - 0.7034186147 * m + 1.707614701 * s
        };
      }

      function linearToGamma(c) {
        if (c <= 0.0031308) return 12.92 * c;
        return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
      }

      function oklchToSrgb01(L, C, H) {
        var lab = oklchToOklab(L, C, H);
        var lin = oklabToLinearSrgb(lab);
        return {
          r: linearToGamma(lin.r),
          g: linearToGamma(lin.g),
          b: linearToGamma(lin.b)
        };
      }

      function linearSrgbToLinearP3(r, g, b) {
        return {
          r: 0.8224621 * r + 0.177538 * g + 0.0 * b,
          g: 0.0331941 * r + 0.9668058 * g + 0.0 * b,
          b: 0.0170827 * r + 0.0723974 * g + 0.9105199 * b
        };
      }

      function clamp(v, lo, hi) {
        return Math.min(Math.max(v, lo), hi);
      }

      function isInSrgbGamut(rgb) {
        var eps = 0.0001;
        return (
          rgb.r >= -eps &&
          rgb.r <= 1 + eps &&
          rgb.g >= -eps &&
          rgb.g <= 1 + eps &&
          rgb.b >= -eps &&
          rgb.b <= 1 + eps
        );
      }

      function to255(c) {
        return Math.round(clamp(c, 0, 1) * 255);
      }

      function toHexByte(n) {
        return n.toString(16).padStart(2, "0");
      }

      function srgbToHex(rgb) {
        return "#" + toHexByte(to255(rgb.r)) + toHexByte(to255(rgb.g)) + toHexByte(to255(rgb.b));
      }

      function srgbToHsl(rgb) {
        var r = clamp(rgb.r, 0, 1);
        var g = clamp(rgb.g, 0, 1);
        var b = clamp(rgb.b, 0, 1);
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var l = (max + min) / 2;
        var h = 0;
        var s = 0;

        if (max !== min) {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          else if (max === g) h = ((b - r) / d + 2) / 6;
          else h = ((r - g) / d + 4) / 6;
        }
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
      }

      function parseHex(hex) {
        var h = hex.trim().replace(/^#/, "");
        if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
        if (h.length === 6) h += "ff";
        if (h.length !== 8) return null;
        var r = parseInt(h.slice(0, 2), 16) / 255;
        var g = parseInt(h.slice(2, 4), 16) / 255;
        var b = parseInt(h.slice(4, 6), 16) / 255;
        var a = parseInt(h.slice(6, 8), 16) / 255;
        if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) return null;
        return { r: r, g: g, b: b, a: a };
      }

      function gammaToLinear(c) {
        if (c <= 0.04045) return c / 12.92;
        return Math.pow((c + 0.055) / 1.055, 2.4);
      }

      function linearSrgbToOklab(r, g, b) {
        var l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
        var m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
        var s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
        var lo = Math.cbrt(l);
        var mo = Math.cbrt(m);
        var so = Math.cbrt(s);
        return {
          L: 0.2104542553 * lo + 0.793617785 * mo - 0.004072047 * so,
          a: 1.9779984951 * lo - 2.428592205 * mo + 0.4505937099 * so,
          b: 0.0259040371 * lo + 0.7827717662 * mo - 0.808675766 * so
        };
      }

      function hexToOklch(hex) {
        var parsed = parseHex(hex);
        if (!parsed) return null;
        var linR = gammaToLinear(parsed.r);
        var linG = gammaToLinear(parsed.g);
        var linB = gammaToLinear(parsed.b);
        var lab = linearSrgbToOklab(linR, linG, linB);
        var C = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
        var H = ((Math.atan2(lab.b, lab.a) * 180) / Math.PI + 360) % 360;
        return { L: lab.L, C: C, H: H, alpha: parsed.a };
      }

      // ── State ───────────────────────────────────────────────────────────────
      var state = { L: 0.65, C: 0.2, H: 210, A: 1 };
      var palette = [];
      var LS_KEY = "oklch_editor_v1";
      var LS_PALETTE = "oklch_palette_v1";

      // ── DOM refs ─────────────────────────────────────────────────────────────
      var sliderL = document.getElementById("sliderL");
      var sliderC = document.getElementById("sliderC");
      var sliderH = document.getElementById("sliderH");
      var sliderA = document.getElementById("sliderA");
      var inputL = document.getElementById("inputL");
      var inputC = document.getElementById("inputC");
      var inputH = document.getElementById("inputH");
      var inputA = document.getElementById("inputA");
      var inputHex = document.getElementById("inputHex");
      var swatchLarge = document.getElementById("swatchLarge");
      var swatchLabel = document.getElementById("swatchLabel");
      var gamutBadge = document.getElementById("gamutBadge");
      var outOklch = document.getElementById("outOklch");
      var outP3 = document.getElementById("outP3");
      var outRgb = document.getElementById("outRgb");
      var outHex = document.getElementById("outHex");
      var outHsl = document.getElementById("outHsl");
      var statusBar = document.getElementById("statusBar");
      var harmonySelect = document.getElementById("harmonySelect");
      var harmonySwatch = document.getElementById("harmonySwatch");
      var paletteRow = document.getElementById("paletteRow");
      var paletteEmpty = document.getElementById("paletteEmpty");

      // ── Presets ──────────────────────────────────────────────────────────────
      var PRESETS = [
        { L: 0.63, C: 0.26, H: 29, label: "Sunset" },
        { L: 0.55, C: 0.22, H: 327, label: "Pink" },
        { L: 0.6, C: 0.25, H: 145, label: "Emerald" },
        { L: 0.5, C: 0.22, H: 262, label: "Violet" },
        { L: 0.7, C: 0.18, H: 220, label: "Sky" },
        { L: 0.65, C: 0.24, H: 50, label: "Amber" },
        { L: 0.45, C: 0.2, H: 350, label: "Crimson" },
        { L: 0.72, C: 0.15, H: 180, label: "Cyan" },
        { L: 0.6, C: 0.2, H: 100, label: "Lime" },
        { L: 0.55, C: 0.18, H: 0, label: "Red" },
        { L: 0.75, C: 0.05, H: 0, label: "Light" },
        { L: 0.25, C: 0.05, H: 240, label: "Dark" }
      ];

      function buildPresets() {
        var grid = document.getElementById("presetGrid");
        grid.innerHTML = "";
        PRESETS.forEach(function (p) {
          var rgb = oklchToSrgb01(p.L, p.C, p.H);
          var hex = srgbToHex(rgb);
          var chip = document.createElement("div");
          chip.className = "preset-chip";
          chip.style.backgroundColor = hex;
          chip.title = p.label + " — oklch(" + p.L + " " + p.C + " " + p.H + ")";
          chip.addEventListener("click", function () {
            setState(p.L, p.C, p.H, 1);
            setStatus("已应用预设：" + p.label, "success");
          });
          grid.appendChild(chip);
        });
      }

      // ── Core update ──────────────────────────────────────────────────────────
      function round(v, digits) {
        var f = Math.pow(10, digits);
        return Math.round(v * f) / f;
      }

      function fmt3(n) {
        return round(n, 3);
      }

      function fmt4(n) {
        return round(n, 4);
      }

      function updateAll() {
        var L = state.L;
        var C = state.C;
        var H = state.H;
        var A = state.A;

        sliderL.value = L;
        inputL.value = fmt3(L);
        sliderC.value = C;
        inputC.value = fmt3(C);
        sliderH.value = H;
        inputH.value = Math.round(H);
        sliderA.value = A;
        inputA.value = fmt3(A);

        sliderC.style.background =
          "linear-gradient(to right, oklch(" +
          fmt3(L) +
          " 0 " +
          Math.round(H) +
          "), oklch(" +
          fmt3(L) +
          " 0.4 " +
          Math.round(H) +
          "))";

        sliderL.style.background =
          "linear-gradient(to right, oklch(0 " +
          fmt3(C) +
          " " +
          Math.round(H) +
          "), oklch(1 " +
          fmt3(C) +
          " " +
          Math.round(H) +
          "))";

        var rgb = oklchToSrgb01(L, C, H);
        var inGamut = isInSrgbGamut(rgb);

        var alphaStr = A < 1 ? " / " + fmt3(A) : "";
        var oklchCss = "oklch(" + fmt3(L) + " " + fmt3(C) + " " + Math.round(H) + alphaStr + ")";

        swatchLarge.style.backgroundColor = oklchCss;
        swatchLabel.textContent = oklchCss;
        outOklch.textContent = oklchCss;

        if (inGamut) {
          gamutBadge.className = "gamut-badge srgb";
          gamutBadge.textContent = "sRGB";
        } else {
          gamutBadge.className = "gamut-badge p3";
          gamutBadge.textContent = "P3 超域";
        }

        var lab = oklchToOklab(L, C, H);
        var linSrgb = oklabToLinearSrgb(lab);
        var linP3 = linearSrgbToLinearP3(linSrgb.r, linSrgb.g, linSrgb.b);
        var p3R = fmt4(clamp(linearToGamma(linP3.r), 0, 1));
        var p3G = fmt4(clamp(linearToGamma(linP3.g), 0, 1));
        var p3B = fmt4(clamp(linearToGamma(linP3.b), 0, 1));
        var p3Str =
          A < 1
            ? "color(display-p3 " + p3R + " " + p3G + " " + p3B + " / " + fmt3(A) + ")"
            : "color(display-p3 " + p3R + " " + p3G + " " + p3B + ")";
        outP3.textContent = p3Str;

        var rCl = clamp(rgb.r, 0, 1);
        var gCl = clamp(rgb.g, 0, 1);
        var bCl = clamp(rgb.b, 0, 1);
        var r255 = to255(rCl);
        var g255 = to255(gCl);
        var b255 = to255(bCl);
        var rgbStr =
          A < 1
            ? "rgba(" + r255 + ", " + g255 + ", " + b255 + ", " + fmt3(A) + ")"
            : "rgb(" + r255 + ", " + g255 + ", " + b255 + ")";
        outRgb.textContent = rgbStr;

        var hexStr = srgbToHex({ r: rCl, g: gCl, b: bCl });
        if (A < 1) hexStr += toHexByte(Math.round(A * 255));
        outHex.textContent = hexStr;

        var hsl = srgbToHsl({ r: rCl, g: gCl, b: bCl });
        var hslStr =
          A < 1
            ? "hsla(" + hsl.h + "deg, " + hsl.s + "%, " + hsl.l + "%, " + fmt3(A) + ")"
            : "hsl(" + hsl.h + "deg, " + hsl.s + "%, " + hsl.l + "%)";
        outHsl.textContent = hslStr;

        if (document.activeElement !== inputHex) inputHex.value = hexStr;

        updateHarmony();
        saveState();
      }

      // ── Harmony ──────────────────────────────────────────────────────────────
      var HARMONY_DEFS = {
        complementary: [0, 180],
        triadic: [0, 120, 240],
        analogous: [-30, 0, 30],
        split: [0, 150, 210],
        tetradic: [0, 90, 180, 270]
      };

      var HARMONY_LABELS = {
        complementary: ["主色", "互补"],
        triadic: ["主色", "120°", "240°"],
        analogous: ["-30°", "主色", "+30°"],
        split: ["主色", "+150°", "+210°"],
        tetradic: ["主色", "+90°", "+180°", "+270°"]
      };

      function updateHarmony() {
        var mode = harmonySelect.value;
        var offsets = HARMONY_DEFS[mode];
        var labels = HARMONY_LABELS[mode];
        harmonySwatch.innerHTML = "";
        offsets.forEach(function (offset, i) {
          var hue = (((state.H + offset) % 360) + 360) % 360;
          var chip = document.createElement("div");
          chip.className = "harmony-chip";

          var colorDiv = document.createElement("div");
          colorDiv.className = "harmony-color";
          colorDiv.style.backgroundColor =
            "oklch(" + fmt3(state.L) + " " + fmt3(state.C) + " " + Math.round(hue) + ")";

          var lbl = document.createElement("span");
          lbl.className = "harmony-chip-label";
          lbl.textContent = labels[i];

          chip.appendChild(colorDiv);
          chip.appendChild(lbl);

          var capturedHue = hue;
          var capturedLabel = labels[i];
          chip.addEventListener("click", function () {
            setState(state.L, state.C, capturedHue, state.A);
            setStatus("已切换到和谐色 " + capturedLabel, "success");
          });

          chip.title = "oklch(" + fmt3(state.L) + " " + fmt3(state.C) + " " + Math.round(hue) + ")";
          harmonySwatch.appendChild(chip);
        });
      }

      // ── Set state ────────────────────────────────────────────────────────────
      function setState(L, C, H, A) {
        state.L = clamp(parseFloat(L) || 0, 0, 1);
        state.C = clamp(parseFloat(C) || 0, 0, 0.4);
        state.H = (((parseFloat(H) || 0) % 360) + 360) % 360;
        state.A = clamp(parseFloat(A) || 0, 0, 1);
        updateAll();
      }

      // ── Palette ──────────────────────────────────────────────────────────────
      function savePalette() {
        try {
          localStorage.setItem(LS_PALETTE, JSON.stringify(palette));
        } catch (e) {
          // ignore quota errors
        }
      }

      function loadPalette() {
        try {
          var raw = localStorage.getItem(LS_PALETTE);
          if (raw) palette = JSON.parse(raw);
        } catch (e) {
          palette = [];
        }
      }

      function renderPalette() {
        paletteRow.innerHTML = "";
        if (palette.length === 0) {
          paletteRow.appendChild(paletteEmpty);
          paletteEmpty.style.display = "";
          return;
        }
        paletteEmpty.style.display = "none";
        palette.forEach(function (item, idx) {
          var swatch = document.createElement("div");
          swatch.className = "palette-swatch";
          swatch.style.backgroundColor =
            "oklch(" + fmt3(item.L) + " " + fmt3(item.C) + " " + Math.round(item.H) + ")";
          swatch.title =
            "oklch(" + fmt3(item.L) + " " + fmt3(item.C) + " " + Math.round(item.H) + ")";

          var capturedIdx = idx;
          swatch.addEventListener("click", function () {
            var entry = palette[capturedIdx];
            setState(entry.L, entry.C, entry.H, entry.A || 1);
            setStatus("已恢复调色板颜色", "success");
          });
          paletteRow.appendChild(swatch);
        });
      }

      function addToPalette() {
        var entry = { L: state.L, C: state.C, H: state.H, A: state.A };
        for (var i = 0; i < palette.length; i++) {
          if (
            palette[i].L === entry.L &&
            palette[i].C === entry.C &&
            palette[i].H === entry.H &&
            palette[i].A === entry.A
          ) {
            setStatus("颜色已在调色板中", "");
            return;
          }
        }
        palette.unshift(entry);
        if (palette.length > 32) palette.pop();
        savePalette();
        renderPalette();
        setStatus("已存入调色板", "success");
      }

      // ── LocalStorage state ───────────────────────────────────────────────────
      function saveState() {
        try {
          localStorage.setItem(
            LS_KEY,
            JSON.stringify({ L: state.L, C: state.C, H: state.H, A: state.A })
          );
        } catch (e) {
          // ignore quota errors
        }
      }

      function loadState() {
        try {
          var raw = localStorage.getItem(LS_KEY);
          if (raw) {
            var s = JSON.parse(raw);
            if (typeof s.L === "number") state.L = clamp(s.L, 0, 1);
            if (typeof s.C === "number") state.C = clamp(s.C, 0, 0.4);
            if (typeof s.H === "number") state.H = ((s.H % 360) + 360) % 360;
            if (typeof s.A === "number") state.A = clamp(s.A, 0, 1);
          }
        } catch (e) {
          // ignore
        }
      }

      // ── URL hash persistence ──────────────────────────────────────────────────
      function stateToHash() {
        return (
          "L" +
          fmt3(state.L) +
          "C" +
          fmt3(state.C) +
          "H" +
          Math.round(state.H) +
          "A" +
          fmt3(state.A)
        );
      }

      function loadFromHash() {
        var hash = location.hash.slice(1);
        if (!hash) return false;
        var mL = hash.match(/L([\d.]+)/);
        var mC = hash.match(/C([\d.]+)/);
        var mH = hash.match(/H([\d.]+)/);
        var mA = hash.match(/A([\d.]+)/);
        if (mL && mC && mH) {
          state.L = clamp(parseFloat(mL[1]), 0, 1);
          state.C = clamp(parseFloat(mC[1]), 0, 0.4);
          state.H = ((parseFloat(mH[1]) % 360) + 360) % 360;
          state.A = mA ? clamp(parseFloat(mA[1]), 0, 1) : 1;
          return true;
        }
        return false;
      }

      function pushHash() {
        history.replaceState(null, "", "#" + stateToHash());
      }

      // ── Status helper ────────────────────────────────────────────────────────
      function setStatus(msg, type) {
        statusBar.textContent = msg;
        statusBar.className = "status " + (type || "");
      }

      // ── Clipboard helper ──────────────────────────────────────────────────────
      function copyText(text, label) {
        navigator.clipboard.writeText(text).then(
          function () {
            setStatus("已复制 " + (label || ""), "success");
          },
          function () {
            setStatus("复制失败", "error");
          }
        );
      }

      // ── Slider / input wiring ─────────────────────────────────────────────────
      function wireSlider(slider, input, key, min, max) {
        slider.addEventListener("input", function () {
          state[key] = parseFloat(slider.value);
          updateAll();
          pushHash();
        });
        input.addEventListener("change", function () {
          var v = parseFloat(input.value);
          if (isNaN(v)) return;
          state[key] = clamp(v, min, max);
          updateAll();
          pushHash();
        });
      }

      wireSlider(sliderL, inputL, "L", 0, 1);
      wireSlider(sliderC, inputC, "C", 0, 0.4);
      wireSlider(sliderH, inputH, "H", 0, 360);
      wireSlider(sliderA, inputA, "A", 0, 1);

      inputHex.addEventListener("change", function () {
        var val = inputHex.value.trim();
        if (!val.startsWith("#")) val = "#" + val;
        var oklch = hexToOklch(val);
        if (!oklch) {
          setStatus("无效的 HEX 颜色", "error");
          return;
        }
        state.L = clamp(oklch.L, 0, 1);
        state.C = clamp(oklch.C, 0, 0.4);
        state.H = ((oklch.H % 360) + 360) % 360;
        state.A = clamp(oklch.alpha, 0, 1);
        updateAll();
        pushHash();
        setStatus("已从 HEX 导入", "success");
      });

      harmonySelect.addEventListener("change", function () {
        updateHarmony();
      });

      document.getElementById("copyOklch").addEventListener("click", function () {
        copyText(outOklch.textContent, "oklch()");
      });
      document.getElementById("copyP3").addEventListener("click", function () {
        copyText(outP3.textContent, "display-p3");
      });
      document.getElementById("copyRgb").addEventListener("click", function () {
        copyText(outRgb.textContent, "rgb()");
      });
      document.getElementById("copyHex").addEventListener("click", function () {
        copyText(outHex.textContent, "HEX");
      });
      document.getElementById("copyHsl").addEventListener("click", function () {
        copyText(outHsl.textContent, "hsl()");
      });

      document.getElementById("btnRandom").addEventListener("click", function () {
        var L = 0.4 + Math.random() * 0.4;
        var C = 0.05 + Math.random() * 0.3;
        var H = Math.random() * 360;
        setState(L, C, H, 1);
        pushHash();
        setStatus("随机颜色已生成", "success");
      });

      document.getElementById("btnCopyAll").addEventListener("click", function () {
        var all =
          outOklch.textContent +
          "\n" +
          outP3.textContent +
          "\n" +
          outRgb.textContent +
          "\n" +
          outHex.textContent +
          "\n" +
          outHsl.textContent;
        copyText(all, "全部代码");
      });

      document.getElementById("btnSavePalette").addEventListener("click", function () {
        addToPalette();
      });

      document.getElementById("btnClearPalette").addEventListener("click", function () {
        palette = [];
        savePalette();
        renderPalette();
        setStatus("调色板已清空", "");
      });

      // ── Init ──────────────────────────────────────────────────────────────────
      loadPalette();
      renderPalette();
      buildPresets();

      if (!loadFromHash()) loadState();
      updateAll();

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
    
