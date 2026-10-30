// @ts-nocheck
// Generated from tools/dev/type-scale-calculator.html
// Source SHA-256: 2df93dfb6dc878fffbe4b0729f4895081656c0a449b8b76d549816d649a4755f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var statusEl = document.getElementById("status");
      var baseSizeEl = document.getElementById("baseSize");
      var rootSizeEl = document.getElementById("rootSize");
      var ratioPresetEl = document.getElementById("ratioPreset");
      var customRatioGroupEl = document.getElementById("customRatioGroup");
      var customRatioEl = document.getElementById("customRatio");
      var ratioDisplayEl = document.getElementById("ratioDisplay");
      var stepsUpEl = document.getElementById("stepsUp");
      var stepsDownEl = document.getElementById("stepsDown");
      var previewFontEl = document.getElementById("previewFont");
      var previewTextPresetEl = document.getElementById("previewTextPreset");
      var stepsListEl = document.getElementById("stepsList");
      var cssOutputEl = document.getElementById("cssOutput");
      var scaleInfoEl = document.getElementById("scaleInfo");

      var PREVIEW_TEXTS = {
        en: "The quick brown fox jumps over the lazy dog",
        zh: "震荡波动导致风险骤增，考验团队应对能力",
        mixed: "Design System 设计系统 — Type Scale v2.0"
      };

      var STEP_NAMES = [
        "xs",
        "sm",
        "base",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
        "8xl",
        "9xl"
      ];

      function getRatio() {
        var preset = ratioPresetEl.value;
        if (preset === "custom") {
          var v = parseFloat(customRatioEl.value);
          return isNaN(v) || v <= 1 ? 1.333 : v;
        }
        return parseFloat(preset);
      }

      function getStepName(index) {
        if (index >= 0 && index < STEP_NAMES.length) return STEP_NAMES[index];
        return "step-" + index;
      }

      function buildScale() {
        var base = parseFloat(baseSizeEl.value) || 16;
        var root = parseFloat(rootSizeEl.value) || 16;
        var ratio = getRatio();
        var up = Math.max(1, Math.min(10, parseInt(stepsUpEl.value, 10) || 5));
        var down = Math.max(0, Math.min(5, parseInt(stepsDownEl.value, 10) || 2));

        var steps = [];
        for (var i = -down; i <= up; i++) {
          var px = base * Math.pow(ratio, i);
          var rem = px / root;
          steps.push({ step: i, px: px, rem: rem });
        }
        return { steps: steps, base: base, root: root, ratio: ratio, up: up, down: down };
      }

      function round2(n) {
        return Math.round(n * 100) / 100;
      }

      function nameForStep(step, down) {
        var idx = step + down;
        return getStepName(idx);
      }

      function renderSteps(scale) {
        var font = previewFontEl.value;
        var previewTextKey = previewTextPresetEl.value;
        var previewText = PREVIEW_TEXTS[previewTextKey] || PREVIEW_TEXTS.en;

        stepsListEl.innerHTML = "";
        var reversed = scale.steps.slice().reverse();
        for (var k = 0; k < reversed.length; k++) {
          var s = reversed[k];
          var name = nameForStep(s.step, scale.down);
          var isBase = s.step === 0;

          var row = document.createElement("div");
          row.className = "ts-step" + (isBase ? " is-base" : "");

          var meta = document.createElement("div");
          meta.className = "ts-step-meta";

          var nameSpan = document.createElement("span");
          nameSpan.className = "ts-step-name";
          nameSpan.textContent = (isBase ? "● " : "") + name + (isBase ? "  (base)" : "");

          var pxSpan = document.createElement("span");
          pxSpan.className = "ts-step-px";
          pxSpan.textContent = round2(s.px) + " px";

          var remSpan = document.createElement("span");
          remSpan.className = "ts-step-rem";
          remSpan.textContent = round2(s.rem) + " rem";

          meta.appendChild(nameSpan);
          meta.appendChild(pxSpan);
          meta.appendChild(remSpan);

          var preview = document.createElement("div");
          preview.className = "ts-step-preview";
          preview.style.fontSize = round2(s.rem) + "rem";
          preview.style.fontFamily = font;
          preview.textContent = previewText;

          row.appendChild(meta);
          row.appendChild(preview);
          stepsListEl.appendChild(row);
        }

        scaleInfoEl.textContent = scale.steps.length + " 阶梯  ratio: " + round2(scale.ratio);
      }

      function buildCssVars(scale) {
        var lines = [":root {"];
        for (var i = 0; i < scale.steps.length; i++) {
          var s = scale.steps[i];
          var name = nameForStep(s.step, scale.down);
          lines.push(
            "  --text-" + name + ": " + round2(s.rem) + "rem; /* " + round2(s.px) + "px */"
          );
        }
        lines.push("}");
        return lines.join("\n");
      }

      function buildTailwindConfig(scale) {
        var lines = ["// tailwind.config.js  →  theme.fontSize"];
        lines.push("fontSize: {");
        for (var i = 0; i < scale.steps.length; i++) {
          var s = scale.steps[i];
          var name = nameForStep(s.step, scale.down);
          lines.push("  " + name + ": '" + round2(s.rem) + "rem',");
        }
        lines.push("},");
        return lines.join("\n");
      }

      function update() {
        var scale = buildScale();
        renderSteps(scale);
        cssOutputEl.value = buildCssVars(scale);
        showStatus("已更新 " + scale.steps.length + " 个字级", "success");
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      ratioPresetEl.addEventListener("change", function () {
        if (ratioPresetEl.value === "custom") {
          customRatioGroupEl.style.display = "";
          ratioDisplayEl.textContent = "ratio: " + round2(parseFloat(customRatioEl.value) || 1.333);
        } else {
          customRatioGroupEl.style.display = "none";
          ratioDisplayEl.textContent = "ratio: " + ratioPresetEl.value;
        }
        update();
      });

      customRatioEl.addEventListener("input", function () {
        var v = parseFloat(customRatioEl.value);
        if (!isNaN(v) && v > 1) {
          ratioDisplayEl.textContent = "ratio: " + round2(v);
        }
        update();
      });

      baseSizeEl.addEventListener("input", update);
      rootSizeEl.addEventListener("input", update);
      stepsUpEl.addEventListener("input", update);
      stepsDownEl.addEventListener("input", update);
      previewFontEl.addEventListener("change", update);
      previewTextPresetEl.addEventListener("change", update);

      document.getElementById("btnCopyCss").onclick = function () {
        var text = cssOutputEl.value;
        if (!text) {
          showStatus("没有内容可复制", "error");
          return;
        }
        navigator.clipboard.writeText(text).then(
          function () {
            showStatus("CSS 变量已复制", "success");
          },
          function () {
            showStatus("复制失败，请手动复制", "error");
          }
        );
      };

      document.getElementById("btnCopyTailwind").onclick = function () {
        var scale = buildScale();
        var tw = buildTailwindConfig(scale);
        navigator.clipboard.writeText(tw).then(
          function () {
            showStatus("Tailwind 配置已复制", "success");
          },
          function () {
            showStatus("复制失败，请手动复制", "error");
          }
        );
      };

      document.getElementById("btnReset").onclick = function () {
        baseSizeEl.value = "16";
        rootSizeEl.value = "16";
        ratioPresetEl.value = "1.250";
        customRatioGroupEl.style.display = "none";
        ratioDisplayEl.textContent = "ratio: 1.250";
        stepsUpEl.value = "5";
        stepsDownEl.value = "2";
        previewFontEl.value = "inherit";
        previewTextPresetEl.value = "en";
        update();
        showStatus("已重置为默认值", "success");
      };

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
      update();
    
