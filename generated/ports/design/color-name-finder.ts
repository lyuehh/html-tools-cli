// @ts-nocheck
// Generated from tools/design/color-name-finder.html
// Source SHA-256: 7c2b5bb307818321c04a9eb62b977a561f000d991b4c5b8ca57fa71c1ca87293
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      /* ── 全部 148 个标准 CSS 命名颜色 ── */
      var CSS_COLORS = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
      };

      /* ── 工具函数 ── */
      function hexToRgb(hex) {
        var h = hex.replace(/^#/, "");
        if (h.length === 3) {
          h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
        }
        var n = parseInt(h, 16);
        return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
      }

      function rgbDist(a, b) {
        var dr = a.r - b.r,
          dg = a.g - b.g,
          db = a.b - b.b;
        return Math.sqrt(dr * dr + dg * dg + db * db);
      }

      function parseInputColor(raw) {
        var s = raw.trim().toLowerCase();
        /* 直接是命名色 */
        if (CSS_COLORS[s]) return CSS_COLORS[s];
        /* #rgb 或 #rrggbb */
        if (/^#[0-9a-f]{3}$/.test(s) || /^#[0-9a-f]{6}$/.test(s)) return s;
        /* rgb(r,g,b) 或 rgb(r, g, b) */
        var m = s.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
        if (m) {
          return (
            "#" +
            ("0" + parseInt(m[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(m[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(m[3], 10).toString(16)).slice(-2)
          );
        }
        /* 裸数字如 3af → #3af */
        if (/^[0-9a-f]{3}$/.test(s) || /^[0-9a-f]{6}$/.test(s)) return "#" + s;
        return null;
      }

      function findClosest(hex) {
        var target = hexToRgb(hex);
        var best = null,
          bestDist = Infinity;
        var names = Object.keys(CSS_COLORS);
        for (var i = 0; i < names.length; i++) {
          var name = names[i];
          var d = rgbDist(target, hexToRgb(CSS_COLORS[name]));
          if (d < bestDist) {
            bestDist = d;
            best = name;
          }
        }
        return { name: best, hex: CSS_COLORS[best], dist: bestDist };
      }

      /* ── DOM refs ── */
      var colorPicker = document.getElementById("colorPicker");
      var colorText = document.getElementById("colorText");
      var cnfResult = document.getElementById("cnfResult");
      var swatchInput = document.getElementById("swatchInput");
      var swatchMatch = document.getElementById("swatchMatch");
      var matchName = document.getElementById("matchName");
      var matchHex = document.getElementById("matchHex");
      var matchBadge = document.getElementById("matchBadge");
      var matchDist = document.getElementById("matchDist");
      var statusMsg = document.getElementById("statusMsg");
      var colorCount = document.getElementById("colorCount");
      var cnfGrid = document.getElementById("cnfGrid");
      var gridSearch = document.getElementById("gridSearch");

      function showStatus(msg, type) {
        statusMsg.textContent = msg;
        statusMsg.className = "status " + (type || "");
      }

      /* ── 查找逻辑 ── */
      function doFind(hexInput) {
        swatchInput.style.background = hexInput;
        var result = findClosest(hexInput);
        swatchMatch.style.background = result.hex;
        matchName.textContent = result.name;
        matchHex.textContent = result.hex;
        var exact = result.dist < 0.5;
        matchBadge.textContent = exact ? "精确匹配" : "最接近";
        matchBadge.className = "cnf-badge " + (exact ? "cnf-badge-exact" : "cnf-badge-near");
        matchDist.textContent = "RGB 欧氏距离: " + result.dist.toFixed(2);
        cnfResult.classList.add("show");
        showStatus("已匹配: " + result.name, "success");
      }

      function triggerFind() {
        var raw = colorText.value.trim();
        var hex = raw ? parseInputColor(raw) : colorPicker.value;
        if (!hex) {
          showStatus("无法识别的颜色格式", "error");
          return;
        }
        /* 将取色器同步 */
        if (/^#[0-9a-f]{6}$/i.test(hex)) {
          colorPicker.value = hex;
        } else if (/^#[0-9a-f]{3}$/i.test(hex)) {
          var h = hex.replace(/^#/, "");
          colorPicker.value = "#" + h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
        }
        doFind(hex);
      }

      document.getElementById("btnFind").onclick = triggerFind;

      document.getElementById("btnClearFind").onclick = function () {
        colorText.value = "";
        cnfResult.classList.remove("show");
        statusMsg.textContent = "";
        statusMsg.className = "status";
      };

      document.getElementById("btnCopyHex").onclick = function () {
        var hex = matchHex.textContent;
        if (!hex) return;
        navigator.clipboard.writeText(hex).then(
          function () {
            showStatus("已复制 " + hex, "success");
          },
          function () {
            showStatus("复制失败", "error");
          }
        );
      };

      matchHex.onclick = function () {
        document.getElementById("btnCopyHex").click();
      };

      /* 取色器变化 → 同步文本框并查找 */
      colorPicker.addEventListener("input", function () {
        colorText.value = colorPicker.value;
        doFind(colorPicker.value);
      });

      /* 文本框回车查找 */
      colorText.addEventListener("keydown", function (e) {
        if (e.key === "Enter") triggerFind();
      });

      /* ── 颜色网格 ── */
      function loadColorIntoFinder(name, hex) {
        colorText.value = hex;
        if (/^#[0-9a-f]{6}$/i.test(hex)) colorPicker.value = hex;
        doFind(hex);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      function renderGrid(filter) {
        cnfGrid.textContent = "";
        var names = Object.keys(CSS_COLORS);
        var q = filter ? filter.toLowerCase().trim() : "";
        var shown = 0;
        for (var i = 0; i < names.length; i++) {
          var name = names[i];
          var hex = CSS_COLORS[name];
          if (q && name.indexOf(q) === -1) continue;
          shown++;
          var cell = document.createElement("div");
          cell.className = "cnf-cell";
          cell.setAttribute("data-name", name);
          cell.setAttribute("data-hex", hex);
          cell.title = name + " " + hex;

          var sw = document.createElement("div");
          sw.className = "cnf-cell-swatch";
          sw.style.background = hex;

          var nm = document.createElement("div");
          nm.className = "cnf-cell-name";
          nm.textContent = name;

          var hx = document.createElement("div");
          hx.className = "cnf-cell-hex";
          hx.textContent = hex;

          cell.appendChild(sw);
          cell.appendChild(nm);
          cell.appendChild(hx);

          (function (n, h) {
            cell.onclick = function () {
              loadColorIntoFinder(n, h);
            };
          })(name, hex);

          cnfGrid.appendChild(cell);
        }
        if (shown === 0) {
          var empty = document.createElement("div");
          empty.className = "cnf-empty";
          empty.textContent = "没有匹配的颜色名称";
          cnfGrid.appendChild(empty);
        }
        colorCount.textContent = "共 " + shown + " / " + names.length + " 个命名色";
      }

      gridSearch.addEventListener("input", function () {
        renderGrid(gridSearch.value);
      });

      /* ── 初始化 ── */
      renderGrid("");
      doFind(colorPicker.value);

      /* ── 主题功能（原样保留） ── */
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
    
