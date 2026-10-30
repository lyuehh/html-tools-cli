// @ts-nocheck
// Generated from tools/design/color-temperature.html
// Source SHA-256: 8046ab2af88020d573f4142cf1556c342243dbfc42a76e2a637a8a76744ca47e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      /* ── Tanner Helland Kelvin→RGB 算法 ──────────────────────────────────── */
      function kelvinToRgb(kelvin) {
        var temp = Math.max(1000, Math.min(40000, kelvin)) / 100;
        var r, g, b;

        // Red
        if (temp <= 66) {
          r = 255;
        } else {
          r = temp - 60;
          r = 329.698727446 * Math.pow(r, -0.1332047592);
          r = Math.max(0, Math.min(255, r));
        }

        // Green
        if (temp <= 66) {
          g = temp;
          g = 99.4708025861 * Math.log(g) - 161.1195681661;
          g = Math.max(0, Math.min(255, g));
        } else {
          g = temp - 60;
          g = 288.1221695283 * Math.pow(g, -0.0755148492);
          g = Math.max(0, Math.min(255, g));
        }

        // Blue
        if (temp >= 66) {
          b = 255;
        } else if (temp <= 19) {
          b = 0;
        } else {
          b = temp - 10;
          b = 138.5177312231 * Math.log(b) - 305.0447927307;
          b = Math.max(0, Math.min(255, b));
        }

        return {
          r: Math.round(r),
          g: Math.round(g),
          b: Math.round(b)
        };
      }

      function toHex(val) {
        return val.toString(16).padStart(2, "0");
      }

      function rgbToHex(rgb) {
        return "#" + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b);
      }

      /* ── 参考点 ───────────────────────────────────────────────────────────── */
      var REFS = [
        { k: 1900, name: "烛光" },
        { k: 2700, name: "白炽灯" },
        { k: 3200, name: "卤素灯" },
        { k: 4000, name: "日出日落" },
        { k: 5500, name: "正午日光" },
        { k: 6500, name: "中性白" },
        { k: 7000, name: "阴天" },
        { k: 10000, name: "蓝天阴影" }
      ];

      var K_MIN = 1000;
      var K_MAX = 12000;
      var LS_KEY = "ct_kelvin_v1";

      /* ── DOM refs ─────────────────────────────────────────────────────────── */
      var sliderEl = document.getElementById("ctSlider");
      var numberEl = document.getElementById("ctNumber");
      var swatchEl = document.getElementById("ctSwatch");
      var swatchLabelEl = document.getElementById("ctSwatchLabel");
      var hexEl = document.getElementById("ctHex");
      var rgbEl = document.getElementById("ctRgb");
      var barREl = document.getElementById("barR");
      var barGEl = document.getElementById("barG");
      var barBEl = document.getElementById("barB");
      var numREl = document.getElementById("numR");
      var numGEl = document.getElementById("numG");
      var numBEl = document.getElementById("numB");
      var indicatorEl = document.getElementById("ctIndicator");
      var statusEl = document.getElementById("ctStatus");
      var gradientBarEl = document.getElementById("ctGradientBar");

      /* ── 更新 UI ──────────────────────────────────────────────────────────── */
      function update(kelvin) {
        var k = Math.max(K_MIN, Math.min(K_MAX, Math.round(kelvin / 50) * 50));
        sliderEl.value = k;
        numberEl.value = k;

        var rgb = kelvinToRgb(k);
        var hex = rgbToHex(rgb);
        var rgbStr = "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";

        swatchEl.style.backgroundColor = hex;
        swatchLabelEl.textContent = k + " K";
        hexEl.textContent = hex;
        rgbEl.textContent = rgbStr;

        barREl.style.width = (rgb.r / 255) * 100 + "%";
        barGEl.style.width = (rgb.g / 255) * 100 + "%";
        barBEl.style.width = (rgb.b / 255) * 100 + "%";
        numREl.textContent = rgb.r;
        numGEl.textContent = rgb.g;
        numBEl.textContent = rgb.b;

        // indicator position
        var pct = ((k - K_MIN) / (K_MAX - K_MIN)) * 100;
        indicatorEl.style.left = pct + "%";

        // persist
        try {
          localStorage.setItem(LS_KEY, String(k));
        } catch (e) {
          // ignore
        }
      }

      /* ── 参考刻度渲染 ─────────────────────────────────────────────────────── */
      function buildRefs() {
        var container = document.getElementById("ctRefs");
        REFS.forEach(function (ref) {
          var rgb = kelvinToRgb(ref.k);
          var hex = rgbToHex(rgb);
          var chip = document.createElement("button");
          chip.className = "ct-ref-chip";
          chip.setAttribute("aria-label", ref.name + " " + ref.k + "K");
          chip.setAttribute("type", "button");

          var dot = document.createElement("div");
          dot.className = "ct-ref-chip-dot";
          dot.style.backgroundColor = hex;

          var nameEl = document.createElement("span");
          nameEl.className = "ct-ref-chip-name";
          nameEl.textContent = ref.name;

          var kEl = document.createElement("span");
          kEl.className = "ct-ref-chip-k";
          kEl.textContent = ref.k + "K";

          chip.appendChild(dot);
          chip.appendChild(nameEl);
          chip.appendChild(kEl);

          chip.addEventListener("click", function () {
            update(ref.k);
            showStatus("已跳转至 " + ref.name + " (" + ref.k + " K)", "success");
          });

          container.appendChild(chip);
        });
      }

      /* ── 状态提示 ─────────────────────────────────────────────────────────── */
      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      /* ── 事件绑定 ─────────────────────────────────────────────────────────── */
      sliderEl.addEventListener("input", function () {
        update(parseInt(sliderEl.value, 10));
      });

      numberEl.addEventListener("input", function () {
        var v = parseInt(numberEl.value, 10);
        if (!isNaN(v) && v >= K_MIN && v <= K_MAX) {
          update(v);
        }
      });

      numberEl.addEventListener("change", function () {
        var v = parseInt(numberEl.value, 10);
        if (isNaN(v) || v < K_MIN || v > K_MAX) {
          var clamped = isNaN(v) ? 6500 : Math.max(K_MIN, Math.min(K_MAX, v));
          update(clamped);
          showStatus("色温已限制在 " + K_MIN + "–" + K_MAX + " K 范围内", "");
        }
      });

      // 点击渐变条跳转
      gradientBarEl.addEventListener("click", function (e) {
        var rect = gradientBarEl.getBoundingClientRect();
        var pct = (e.clientX - rect.left) / rect.width;
        pct = Math.max(0, Math.min(1, pct));
        var k = Math.round((K_MIN + pct * (K_MAX - K_MIN)) / 50) * 50;
        update(k);
      });

      document.getElementById("btnCopyHex").addEventListener("click", function () {
        var text = hexEl.textContent;
        navigator.clipboard
          .writeText(text)
          .then(function () {
            showStatus("已复制 " + text, "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      });

      document.getElementById("btnCopyRgb").addEventListener("click", function () {
        var text = rgbEl.textContent;
        navigator.clipboard
          .writeText(text)
          .then(function () {
            showStatus("已复制 " + text, "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      });

      /* ── 初始化 ───────────────────────────────────────────────────────────── */
      buildRefs();

      var initK = 6500;
      try {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          var parsed = parseInt(saved, 10);
          if (!isNaN(parsed) && parsed >= K_MIN && parsed <= K_MAX) {
            initK = parsed;
          }
        }
      } catch (e) {
        // ignore
      }
      update(initK);

      /* ── 主题切换（模板原样保留） ─────────────────────────────────────────── */
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
    
