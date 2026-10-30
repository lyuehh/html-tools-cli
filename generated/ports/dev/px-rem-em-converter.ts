// @ts-nocheck
// Generated from tools/dev/px-rem-em-converter.html
// Source SHA-256: 2a7ec0cbc66a406d1b82b59a0411b7cf5b890e6edacc688798c7dd0e3ce82ef2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var inputPx = document.getElementById("inputPx");
      var inputRem = document.getElementById("inputRem");
      var inputEm = document.getElementById("inputEm");
      var inputPt = document.getElementById("inputPt");
      var rootFontSizeEl = document.getElementById("rootFontSize");
      var parentFontSizeEl = document.getElementById("parentFontSize");
      var decimalPlacesEl = document.getElementById("decimalPlaces");
      var statusEl = document.getElementById("statusEl");

      // pt conversion: 1 inch = 72pt, 1 inch = 96px → 1px = 72/96 pt
      var PT_PER_PX = 72 / 96;

      function getRootPx() {
        return parseFloat(rootFontSizeEl.value) || 16;
      }
      function getParentPx() {
        return parseFloat(parentFontSizeEl.value) || 16;
      }
      function getDecimals() {
        return parseInt(decimalPlacesEl.value, 10) || 2;
      }
      function fmt(n) {
        var d = getDecimals();
        var s = parseFloat(n.toFixed(d));
        return String(s);
      }

      var activeSource = null;

      function clearHighlight() {
        ["blockPx", "blockRem", "blockEm", "blockPt"].forEach(function (id) {
          document.getElementById(id).classList.remove("active-source");
        });
      }

      function convertFrom(source, value) {
        var px;
        if (value === "" || value === null || isNaN(parseFloat(value))) {
          inputPx.value = "";
          inputRem.value = "";
          inputEm.value = "";
          inputPt.value = "";
          return;
        }
        var v = parseFloat(value);
        var root = getRootPx();
        var parent = getParentPx();

        if (source === "px") {
          px = v;
        } else if (source === "rem") {
          px = v * root;
        } else if (source === "em") {
          px = v * parent;
        } else if (source === "pt") {
          px = v / PT_PER_PX;
        }

        clearHighlight();
        document
          .getElementById("block" + source.charAt(0).toUpperCase() + source.slice(1))
          .classList.add("active-source");

        if (source !== "px") inputPx.value = fmt(px);
        if (source !== "rem") inputRem.value = fmt(px / root);
        if (source !== "em") inputEm.value = fmt(px / parent);
        if (source !== "pt") inputPt.value = fmt(px * PT_PER_PX);
      }

      inputPx.addEventListener("input", function () {
        activeSource = "px";
        convertFrom("px", inputPx.value);
      });
      inputRem.addEventListener("input", function () {
        activeSource = "rem";
        convertFrom("rem", inputRem.value);
      });
      inputEm.addEventListener("input", function () {
        activeSource = "em";
        convertFrom("em", inputEm.value);
      });
      inputPt.addEventListener("input", function () {
        activeSource = "pt";
        convertFrom("pt", inputPt.value);
      });

      // Re-convert when settings change
      function reConvert() {
        if (activeSource) {
          var el = document.getElementById(
            "input" + activeSource.charAt(0).toUpperCase() + activeSource.slice(1)
          );
          convertFrom(activeSource, el.value);
        }
        buildRefTable();
      }
      rootFontSizeEl.addEventListener("input", reConvert);
      parentFontSizeEl.addEventListener("input", reConvert);
      decimalPlacesEl.addEventListener("change", function () {
        reConvert();
      });

      // Copy CSS button
      document.getElementById("btnCopy").onclick = function () {
        var px = inputPx.value;
        var rem = inputRem.value;
        var em = inputEm.value;
        var pt = inputPt.value;
        if (!px && !rem && !em && !pt) {
          showStatus("请先输入一个值", "error");
          return;
        }
        var lines = [];
        if (px) lines.push("/* " + px + "px */");
        if (rem) lines.push("font-size: " + rem + "rem;");
        if (em) lines.push("font-size: " + em + "em;");
        if (pt) lines.push("/* " + pt + "pt */");
        var text = lines.join("\n");
        navigator.clipboard
          .writeText(text)
          .then(function () {
            showStatus("已复制 CSS 片段", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      };

      // Reset button
      document.getElementById("btnReset").onclick = function () {
        inputPx.value = "";
        inputRem.value = "";
        inputEm.value = "";
        inputPt.value = "";
        activeSource = null;
        clearHighlight();
        statusEl.textContent = "";
        statusEl.className = "status";
      };

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // Reference table
      var REF_SIZES = [
        { label: "1px 边框", px: 1 },
        { label: "xs (10px)", px: 10 },
        { label: "sm (12px)", px: 12 },
        { label: "base (14px)", px: 14 },
        { label: "base (16px)", px: 16 },
        { label: "lg (18px)", px: 18 },
        { label: "xl (20px)", px: 20 },
        { label: "2xl (24px)", px: 24 },
        { label: "3xl (30px)", px: 30 },
        { label: "4xl (36px)", px: 36 },
        { label: "5xl (48px)", px: 48 },
        { label: "6xl (60px)", px: 60 },
        { label: "7xl (72px)", px: 72 },
        { label: "icon-sm (16px)", px: 16 },
        { label: "icon-md (24px)", px: 24 },
        { label: "icon-lg (32px)", px: 32 },
        { label: "spacing-4 (16px)", px: 16 },
        { label: "spacing-8 (32px)", px: 32 },
        { label: "spacing-16 (64px)", px: 64 },
        { label: "spacing-32 (128px)", px: 128 }
      ];

      function buildRefTable() {
        var root = getRootPx();
        var parent = getParentPx();
        var tbody = document.getElementById("refTableBody");
        tbody.innerHTML = "";
        REF_SIZES.forEach(function (row) {
          var tr = document.createElement("tr");
          var pxVal = row.px;
          var remVal = fmt(pxVal / root);
          var emVal = fmt(pxVal / parent);
          var ptVal = fmt(pxVal * PT_PER_PX);
          var tdLabel = document.createElement("td");
          tdLabel.textContent = row.label;
          var tdPx = document.createElement("td");
          tdPx.className = "val-px";
          tdPx.textContent = pxVal + "px";
          var tdRem = document.createElement("td");
          tdRem.className = "val-rem";
          tdRem.textContent = remVal + "rem";
          var tdEm = document.createElement("td");
          tdEm.className = "val-em";
          tdEm.textContent = emVal + "em";
          var tdPt = document.createElement("td");
          tdPt.className = "val-pt";
          tdPt.textContent = ptVal + "pt";
          tr.appendChild(tdLabel);
          tr.appendChild(tdPx);
          tr.appendChild(tdRem);
          tr.appendChild(tdEm);
          tr.appendChild(tdPt);

          tr.addEventListener("click", function () {
            inputPx.value = String(pxVal);
            activeSource = "px";
            convertFrom("px", pxVal);
            showStatus("已填入 " + pxVal + "px", "success");
          });

          tbody.appendChild(tr);
        });
      }

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
      buildRefTable();
    
