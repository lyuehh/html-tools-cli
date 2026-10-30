// @ts-nocheck
// Generated from tools/dev/contrast-checker.html
// Source SHA-256: d57e37b6504ba68501e5e5660b1e536acbe2fe9ce121bb22f9954314f63bda13
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ==================== ColorUtils Module ====================
      const ColorUtils = {
        // Parse HEX to RGB
        hexToRgb: function (hex) {
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          if (!result) return null;
          return {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          };
        },

        // RGB to HEX
        rgbToHex: function (r, g, b) {
          return (
            "#" +
            [r, g, b]
              .map(function (x) {
                var hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
                return hex.length === 1 ? "0" + hex : hex;
              })
              .join("")
              .toUpperCase()
          );
        },

        // RGB to HSL
        rgbToHsl: function (r, g, b) {
          r /= 255;
          g /= 255;
          b /= 255;
          var max = Math.max(r, g, b);
          var min = Math.min(r, g, b);
          var h = 0;
          var s = 0;
          var l = (max + min) / 2;

          if (max !== min) {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
              case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
              case g:
                h = ((b - r) / d + 2) / 6;
                break;
              case b:
                h = ((r - g) / d + 4) / 6;
                break;
            }
          }

          return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
          };
        },

        // HSL to RGB
        hslToRgb: function (h, s, l) {
          h /= 360;
          s /= 100;
          l /= 100;

          var r, g, b;

          if (s === 0) {
            r = g = b = l;
          } else {
            var hue2rgb = function (p, q, t) {
              if (t < 0) t += 1;
              if (t > 1) t -= 1;
              if (t < 1 / 6) return p + (q - p) * 6 * t;
              if (t < 1 / 2) return q;
              if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
              return p;
            };

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
          }

          return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
          };
        },

        // Validate HEX color
        isValidHex: function (hex) {
          return /^#?([a-f\d]{6}|[a-f\d]{3})$/i.test(hex);
        },

        // Normalize HEX (add # and expand 3-digit)
        normalizeHex: function (hex) {
          hex = hex.replace(/^#/, "");
          if (hex.length === 3) {
            hex = hex
              .split("")
              .map(function (c) {
                return c + c;
              })
              .join("");
          }
          return "#" + hex.toUpperCase();
        },

        // Generate random color
        randomColor: function () {
          return (
            "#" +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0")
              .toUpperCase()
          );
        }
      };

      // ==================== ContrastCalculator Module ====================
      var ContrastCalculator = {
        // Get relative luminance using WCAG 2.1 formula
        // Uses 2.4 exponent (NOT 2.2)
        getLuminance: function (r, g, b) {
          var vals = [r, g, b].map(function (c) {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * vals[0] + 0.7152 * vals[1] + 0.0722 * vals[2];
        },

        // Get contrast ratio between two luminance values
        getContrastRatio: function (l1, l2) {
          var lighter = Math.max(l1, l2);
          var darker = Math.min(l1, l2);
          return (lighter + 0.05) / (darker + 0.05);
        },

        // Calculate contrast ratio between two RGB colors
        calculateContrast: function (fg, bg) {
          var l1 = this.getLuminance(fg.r, fg.g, fg.b);
          var l2 = this.getLuminance(bg.r, bg.g, bg.b);
          return this.getContrastRatio(l1, l2);
        }
      };

      // ==================== WCAGChecker Module ====================
      var WCAGChecker = {
        // WCAG 2.1 thresholds
        thresholds: {
          AANormal: 4.5,
          AALarge: 3,
          AAANormal: 7,
          AAALarge: 4.5,
          AAUI: 3
        },

        // Check all WCAG criteria
        checkAll: function (ratio) {
          return {
            AANormal: {
              pass: ratio >= this.thresholds.AANormal,
              min: this.thresholds.AANormal,
              level: "AA",
              desc: "普通文本"
            },
            AALarge: {
              pass: ratio >= this.thresholds.AALarge,
              min: this.thresholds.AALarge,
              level: "AA",
              desc: "大号文本"
            },
            AAANormal: {
              pass: ratio >= this.thresholds.AAANormal,
              min: this.thresholds.AAANormal,
              level: "AAA",
              desc: "普通文本"
            },
            AAALarge: {
              pass: ratio >= this.thresholds.AAALarge,
              min: this.thresholds.AAALarge,
              level: "AAA",
              desc: "大号文本"
            },
            AAUI: {
              pass: ratio >= this.thresholds.AAUI,
              min: this.thresholds.AAUI,
              level: "AA",
              desc: "UI 组件 / 图形"
            }
          };
        },

        // Get overall pass status
        getOverallStatus: function (ratio) {
          if (ratio >= this.thresholds.AAANormal) return "excellent";
          if (ratio >= this.thresholds.AANormal) return "good";
          if (ratio >= this.thresholds.AAUI) return "warning";
          return "fail";
        }
      };

      // ==================== ColorSuggester Module ====================
      var ColorSuggester = {
        // Find a color that meets contrast requirement using binary search
        findContrastingColor: function (fixedColor, targetRatio) {
          var fixedRgb = ColorUtils.hexToRgb(fixedColor);
          var fixedHsl = ColorUtils.rgbToHsl(fixedRgb.r, fixedRgb.g, fixedRgb.b);
          var fixedLum = ContrastCalculator.getLuminance(fixedRgb.r, fixedRgb.g, fixedRgb.b);

          var suggestions = [];

          // Try adjusting lightness (binary search)
          var tryLightness = function (startL, endL) {
            var low = startL;
            var high = endL;
            var bestL = null;
            var bestRatio = 0;

            for (var i = 0; i < 20; i++) {
              var mid = (low + high) / 2;
              var testRgb = ColorUtils.hslToRgb(fixedHsl.h, fixedHsl.s, mid);
              var testLum = ContrastCalculator.getLuminance(testRgb.r, testRgb.g, testRgb.b);
              var ratio = ContrastCalculator.getContrastRatio(fixedLum, testLum);

              if (ratio >= targetRatio) {
                bestL = mid;
                bestRatio = ratio;
                // Try to find closer to target
                if (startL < endL) {
                  high = mid;
                } else {
                  low = mid;
                }
              } else {
                if (startL < endL) {
                  low = mid;
                } else {
                  high = mid;
                }
              }
            }

            if (bestL !== null) {
              var rgb = ColorUtils.hslToRgb(fixedHsl.h, fixedHsl.s, bestL);
              return {
                hex: ColorUtils.rgbToHex(rgb.r, rgb.g, rgb.b),
                ratio: bestRatio
              };
            }
            return null;
          };

          // Try lighter version
          var lighter = tryLightness(fixedHsl.l, 100);
          if (lighter)
            suggestions.push({ hex: lighter.hex, ratio: lighter.ratio, type: "lighter" });

          // Try darker version
          var darker = tryLightness(fixedHsl.l, 0);
          if (darker) suggestions.push({ hex: darker.hex, ratio: darker.ratio, type: "darker" });

          // Try pure black and white
          var blackRatio = ContrastCalculator.getContrastRatio(fixedLum, 0);
          var whiteRatio = ContrastCalculator.getContrastRatio(fixedLum, 1);

          if (blackRatio >= targetRatio) {
            suggestions.push({ hex: "#000000", ratio: blackRatio, type: "black" });
          }
          if (whiteRatio >= targetRatio) {
            suggestions.push({ hex: "#FFFFFF", ratio: whiteRatio, type: "white" });
          }

          // Sort by ratio (closest to target first)
          suggestions.sort(function (a, b) {
            return Math.abs(a.ratio - targetRatio) - Math.abs(b.ratio - targetRatio);
          });

          // Remove duplicates
          var seen = {};
          return suggestions
            .filter(function (s) {
              if (seen[s.hex]) return false;
              seen[s.hex] = true;
              return true;
            })
            .slice(0, 4);
        },

        // Generate suggestions for both foreground and background
        getSuggestions: function (fg, bg, targetRatio) {
          var fgSuggestions = this.findContrastingColor(bg, targetRatio);
          var bgSuggestions = this.findContrastingColor(fg, targetRatio);

          return {
            foreground: fgSuggestions.map(function (s) {
              return {
                hex: s.hex,
                ratio: s.ratio,
                type: s.type,
                label: "调整前景色",
                newFg: s.hex,
                newBg: bg
              };
            }),
            background: bgSuggestions.map(function (s) {
              return {
                hex: s.hex,
                ratio: s.ratio,
                type: s.type,
                label: "调整背景色",
                newFg: fg,
                newBg: s.hex
              };
            })
          };
        }
      };

      // ==================== StateManager Module ====================
      var StateManager = {
        LS_KEY: "contrast_checker_v1",

        save: function (state) {
          try {
            localStorage.setItem(this.LS_KEY, JSON.stringify(state));
          } catch (e) {
            console.warn("Failed to save state:", e);
          }
        },

        load: function () {
          try {
            var saved = localStorage.getItem(this.LS_KEY);
            return saved ? JSON.parse(saved) : null;
          } catch (e) {
            console.warn("Failed to load state:", e);
            return null;
          }
        },

        clear: function () {
          try {
            localStorage.removeItem(this.LS_KEY);
          } catch (e) {
            console.warn("Failed to clear state:", e);
          }
        },

        saveToUrl: function (fg, bg) {
          try {
            var data = btoa(encodeURIComponent(JSON.stringify({ fg: fg, bg: bg })));
            if (data.length < 2000) {
              history.replaceState(null, "", "#" + data);
            }
          } catch (e) {
            console.warn("Failed to save to URL:", e);
          }
        },

        loadFromUrl: function () {
          var hash = location.hash.slice(1);
          if (!hash) return null;
          try {
            return JSON.parse(decodeURIComponent(atob(hash)));
          } catch (e) {
            return null;
          }
        }
      };

      // ==================== DOM Elements ====================
      var fgColorPicker = document.getElementById("fgColorPicker");
      var fgHexInput = document.getElementById("fgHexInput");
      var fgRgbEl = document.getElementById("fgRgb");
      var fgHslEl = document.getElementById("fgHsl");
      var bgColorPicker = document.getElementById("bgColorPicker");
      var bgHexInput = document.getElementById("bgHexInput");
      var bgRgbEl = document.getElementById("bgRgb");
      var bgHslEl = document.getElementById("bgHsl");
      var previewNormal = document.getElementById("previewNormal");
      var previewLarge = document.getElementById("previewLarge");
      var previewUI = document.getElementById("previewUI");
      var previewIcon = document.getElementById("previewIcon");
      var ratioValue = document.getElementById("ratioValue");
      var ratioScaleFill = document.getElementById("ratioScaleFill");
      var wcagGrid = document.getElementById("wcagGrid");
      var suggestionsGrid = document.getElementById("suggestionsGrid");

      // ==================== App State ====================
      var currentFg = "#000000";
      var currentBg = "#FFFFFF";

      // ==================== Update Functions ====================
      function updateColorDisplay(hex, type) {
        var rgb = ColorUtils.hexToRgb(hex);
        if (!rgb) return;

        var hsl = ColorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);

        if (type === "fg") {
          fgRgbEl.textContent = rgb.r + ", " + rgb.g + ", " + rgb.b;
          fgHslEl.textContent = hsl.h + "°, " + hsl.s + "%, " + hsl.l + "%";
        } else {
          bgRgbEl.textContent = rgb.r + ", " + rgb.g + ", " + rgb.b;
          bgHslEl.textContent = hsl.h + "°, " + hsl.s + "%, " + hsl.l + "%";
        }
      }

      window.updatePreview = function () {
        var previewCards = [previewNormal, previewLarge, previewUI];
        previewCards.forEach(function (card) {
          card.style.backgroundColor = currentBg;
          card.style.color = currentFg;
        });
        previewIcon.style.borderColor = currentFg;
      };

      function updateRatioDisplay(ratio) {
        ratioValue.textContent = ratio.toFixed(2) + ":1";

        // Update status color
        var status = WCAGChecker.getOverallStatus(ratio);
        ratioValue.className = "ratio-value";
        if (status === "excellent" || status === "good") {
          ratioValue.classList.add("pass");
        } else if (status === "warning") {
          ratioValue.classList.add("warn");
        } else {
          ratioValue.classList.add("fail");
        }

        // Update scale bar (max ratio shown is 21:1)
        var percentage = Math.min((ratio / 21) * 100, 100);
        ratioScaleFill.style.width = percentage + "%";

        if (ratio >= 7) {
          ratioScaleFill.style.background = "linear-gradient(90deg, var(--accent-green), #34d399)";
        } else if (ratio >= 4.5) {
          ratioScaleFill.style.background =
            "linear-gradient(90deg, var(--accent-green), var(--accent-yellow))";
        } else if (ratio >= 3) {
          ratioScaleFill.style.background =
            "linear-gradient(90deg, var(--accent-orange), var(--accent-yellow))";
        } else {
          ratioScaleFill.style.background =
            "linear-gradient(90deg, var(--accent-red), var(--accent-orange))";
        }
      }

      function updateWCAGGrid(results) {
        var html = "";
        var keys = ["AANormal", "AALarge", "AAANormal", "AAALarge", "AAUI"];
        keys.forEach(function (key) {
          var result = results[key];
          html +=
            '<div class="wcag-card ' +
            (result.pass ? "pass" : "fail") +
            '">' +
            '<div class="wcag-card-header">' +
            '<span class="wcag-level">' +
            result.level +
            "</span>" +
            '<span class="wcag-status">' +
            (result.pass ? "PASS" : "FAIL") +
            "</span>" +
            "</div>" +
            '<div class="wcag-desc">' +
            result.desc +
            "</div>" +
            '<div class="wcag-min">最低要求: ' +
            result.min +
            ":1</div>" +
            "</div>";
        });
        wcagGrid.innerHTML = html;
      }

      function updateSuggestions(ratio) {
        var results = WCAGChecker.checkAll(ratio);

        // If all pass AAA, show success message
        if (results.AAANormal.pass && results.AAALarge.pass) {
          suggestionsGrid.innerHTML =
            '<div class="no-suggestions all-pass">' +
            "✓ 当前颜色组合已符合所有 WCAG AAA 标准，无需调整" +
            "</div>";
          return;
        }

        // Determine target ratio (aim for AA normal at minimum)
        var targetRatio = results.AANormal.pass ? 7 : 4.5;

        var suggestions = ColorSuggester.getSuggestions(currentFg, currentBg, targetRatio);
        var allSuggestions = suggestions.foreground
          .slice(0, 2)
          .concat(suggestions.background.slice(0, 2));
        allSuggestions = allSuggestions.filter(function (s) {
          return s.hex !== currentFg && s.hex !== currentBg;
        });

        if (allSuggestions.length === 0) {
          suggestionsGrid.innerHTML =
            '<div class="no-suggestions">' + "无法生成改进建议，请尝试更换颜色" + "</div>";
          return;
        }

        var html = "";
        allSuggestions.forEach(function (s) {
          html +=
            '<div class="suggestion-card" data-fg="' +
            s.newFg +
            '" data-bg="' +
            s.newBg +
            '">' +
            '<div class="suggestion-preview" style="background-color: ' +
            s.newBg +
            "; color: " +
            s.newFg +
            ';">' +
            "示例文本 Sample" +
            "</div>" +
            '<div class="suggestion-info">' +
            '<span class="suggestion-color">' +
            s.label +
            ": " +
            s.hex +
            "</span>" +
            '<span class="suggestion-ratio">' +
            s.ratio.toFixed(2) +
            ":1</span>" +
            "</div>" +
            "</div>";
        });
        suggestionsGrid.innerHTML = html;

        // Add click handlers
        document.querySelectorAll(".suggestion-card").forEach(function (card) {
          card.addEventListener("click", function () {
            setColors(card.dataset.fg, card.dataset.bg);
          });
        });
      }

      function setColors(fg, bg) {
        currentFg = ColorUtils.normalizeHex(fg);
        currentBg = ColorUtils.normalizeHex(bg);

        // Update inputs
        fgColorPicker.value = currentFg.toLowerCase();
        fgHexInput.value = currentFg;
        bgColorPicker.value = currentBg.toLowerCase();
        bgHexInput.value = currentBg;

        updateAll();
      }

      function updateAll() {
        updateColorDisplay(currentFg, "fg");
        updateColorDisplay(currentBg, "bg");
        updatePreview();

        var fgRgb = ColorUtils.hexToRgb(currentFg);
        var bgRgb = ColorUtils.hexToRgb(currentBg);

        if (fgRgb && bgRgb) {
          var ratio = ContrastCalculator.calculateContrast(fgRgb, bgRgb);
          updateRatioDisplay(ratio);
          var results = WCAGChecker.checkAll(ratio);
          updateWCAGGrid(results);
          updateSuggestions(ratio);
        }

        // Save state
        StateManager.save({ fg: currentFg, bg: currentBg });
        StateManager.saveToUrl(currentFg, currentBg);
      }

      // ==================== Event Handlers ====================
      function handleFgColorChange(e) {
        var value = e.target.value;
        if (e.target.type === "color") {
          currentFg = value.toUpperCase();
          fgHexInput.value = currentFg;
        } else {
          if (ColorUtils.isValidHex(value)) {
            currentFg = ColorUtils.normalizeHex(value);
            fgColorPicker.value = currentFg.toLowerCase();
          }
        }
        updateAll();
      }

      function handleBgColorChange(e) {
        var value = e.target.value;
        if (e.target.type === "color") {
          currentBg = value.toUpperCase();
          bgHexInput.value = currentBg;
        } else {
          if (ColorUtils.isValidHex(value)) {
            currentBg = ColorUtils.normalizeHex(value);
            bgColorPicker.value = currentBg.toLowerCase();
          }
        }
        updateAll();
      }

      fgColorPicker.addEventListener("input", handleFgColorChange);
      fgHexInput.addEventListener("input", handleFgColorChange);
      fgHexInput.addEventListener("blur", function () {
        fgHexInput.value = currentFg;
      });

      bgColorPicker.addEventListener("input", handleBgColorChange);
      bgHexInput.addEventListener("input", handleBgColorChange);
      bgHexInput.addEventListener("blur", function () {
        bgHexInput.value = currentBg;
      });

      // Swap colors
      document.getElementById("btnSwap").addEventListener("click", function () {
        var temp = currentFg;
        currentFg = currentBg;
        currentBg = temp;
        setColors(currentFg, currentBg);
      });

      // Paste foreground color
      document.getElementById("btnPaste").addEventListener("click", async function () {
        try {
          var text = await navigator.clipboard.readText();
          var cleaned = text.trim();
          if (ColorUtils.isValidHex(cleaned)) {
            currentFg = ColorUtils.normalizeHex(cleaned);
            setColors(currentFg, currentBg);
          }
        } catch (e) {
          console.warn("Failed to read clipboard:", e);
        }
      });

      // Random colors
      document.getElementById("btnRandom").addEventListener("click", function () {
        setColors(ColorUtils.randomColor(), ColorUtils.randomColor());
      });

      // Copy result
      document.getElementById("btnCopy").addEventListener("click", async function () {
        var fgRgb = ColorUtils.hexToRgb(currentFg);
        var bgRgb = ColorUtils.hexToRgb(currentBg);
        var ratio = ContrastCalculator.calculateContrast(fgRgb, bgRgb);
        var results = WCAGChecker.checkAll(ratio);

        var text =
          "颜色对比度检查结果\n" +
          "━━━━━━━━━━━━━━━━━━\n" +
          "前景色: " +
          currentFg +
          "\n" +
          "背景色: " +
          currentBg +
          "\n" +
          "对比度: " +
          ratio.toFixed(2) +
          ":1\n\n" +
          "WCAG 2.1 检查结果:\n" +
          "AA 普通文本 (≥4.5:1): " +
          (results.AANormal.pass ? "✓ PASS" : "✗ FAIL") +
          "\n" +
          "AA 大号文本 (≥3:1): " +
          (results.AALarge.pass ? "✓ PASS" : "✗ FAIL") +
          "\n" +
          "AAA 普通文本 (≥7:1): " +
          (results.AAANormal.pass ? "✓ PASS" : "✗ FAIL") +
          "\n" +
          "AAA 大号文本 (≥4.5:1): " +
          (results.AAALarge.pass ? "✓ PASS" : "✗ FAIL") +
          "\n" +
          "AA UI组件 (≥3:1): " +
          (results.AAUI.pass ? "✓ PASS" : "✗ FAIL") +
          "\n" +
          "━━━━━━━━━━━━━━━━━━\n" +
          "来自 WebUtils 颜色对比度检查器";

        try {
          await navigator.clipboard.writeText(text);
        } catch (e) {
          console.warn("Failed to copy:", e);
        }
      });

      // Share
      document.getElementById("btnShare").addEventListener("click", async function () {
        StateManager.saveToUrl(currentFg, currentBg);
        try {
          await navigator.clipboard.writeText(location.href);
        } catch (e) {
          console.warn("Failed to copy URL:", e);
        }
      });

      // Clear/Reset
      document.getElementById("btnClear").addEventListener("click", function () {
        setColors("#000000", "#FFFFFF");
        StateManager.clear();
        history.replaceState(null, "", location.pathname);
      });

      // ==================== Initialization ====================
      function init() {
        // Try loading from URL first
        var urlState = StateManager.loadFromUrl();
        if (urlState && urlState.fg && urlState.bg) {
          setColors(urlState.fg, urlState.bg);
          return;
        }

        // Then try localStorage
        var savedState = StateManager.load();
        if (savedState && savedState.fg && savedState.bg) {
          setColors(savedState.fg, savedState.bg);
          return;
        }

        // Default colors
        setColors("#000000", "#FFFFFF");
      }

      init();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
