// @ts-nocheck
// Generated from tools/dev/media-query-builder.html
// Source SHA-256: 973bbbfc7bc1cfbb5717b95657e3760b0c3cc14b5f4acc235ca3f861bffdf0fc
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var COND_TYPES = [
        { value: "min-width", label: "最小宽度 (min-width)", unit: "px", hasValue: true },
        { value: "max-width", label: "最大宽度 (max-width)", unit: "px", hasValue: true },
        { value: "min-height", label: "最小高度 (min-height)", unit: "px", hasValue: true },
        { value: "max-height", label: "最大高度 (max-height)", unit: "px", hasValue: true },
        {
          value: "orientation-portrait",
          label: "方向: 竖屏 (portrait)",
          unit: "",
          hasValue: false
        },
        {
          value: "orientation-landscape",
          label: "方向: 横屏 (landscape)",
          unit: "",
          hasValue: false
        },
        { value: "min-resolution", label: "最低分辨率 (dppx)", unit: "dppx", hasValue: true },
        { value: "max-resolution", label: "最高分辨率 (dppx)", unit: "dppx", hasValue: true },
        { value: "prefers-color-scheme-dark", label: "深色模式偏好", unit: "", hasValue: false },
        {
          value: "prefers-color-scheme-light",
          label: "浅色模式偏好",
          unit: "",
          hasValue: false
        },
        { value: "prefers-reduced-motion", label: "减少动效偏好", unit: "", hasValue: false },
        { value: "hover", label: "支持 hover", unit: "", hasValue: false },
        { value: "pointer-fine", label: "精确指针 (mouse)", unit: "", hasValue: false },
        { value: "pointer-coarse", label: "粗略指针 (touch)", unit: "", hasValue: false },
        { value: "display-mode-standalone", label: "PWA 独立模式", unit: "", hasValue: false },
        { value: "aspect-ratio", label: "宽高比 (aspect-ratio)", unit: "", hasValue: true }
      ];

      var PRESETS = [
        {
          label: "手机 (<=767px)",
          conditions: [{ type: "max-width", value: "767", unit: "px" }]
        },
        {
          label: "平板 (768~1023px)",
          conditions: [
            { type: "min-width", value: "768", unit: "px" },
            { type: "max-width", value: "1023", unit: "px" }
          ],
          logic: "and"
        },
        {
          label: "桌面 (>=1024px)",
          conditions: [{ type: "min-width", value: "1024", unit: "px" }]
        },
        {
          label: "大屏 (>=1280px)",
          conditions: [{ type: "min-width", value: "1280", unit: "px" }]
        },
        {
          label: "深色模式",
          conditions: [{ type: "prefers-color-scheme-dark", value: "", unit: "" }]
        },
        {
          label: "高分屏 (2x)",
          conditions: [{ type: "min-resolution", value: "2", unit: "dppx" }]
        },
        {
          label: "横屏",
          conditions: [{ type: "orientation-landscape", value: "", unit: "" }]
        },
        {
          label: "减少动效",
          conditions: [{ type: "prefers-reduced-motion", value: "", unit: "" }]
        },
        {
          label: "触屏设备",
          conditions: [{ type: "pointer-coarse", value: "", unit: "" }]
        }
      ];

      var conditions = [];
      var condIdCounter = 0;

      function getCondType(typeValue) {
        for (var i = 0; i < COND_TYPES.length; i++) {
          if (COND_TYPES[i].value === typeValue) return COND_TYPES[i];
        }
        return null;
      }

      function buildConditionExpr(cond) {
        var t = cond.type;
        if (t === "orientation-portrait") return "(orientation: portrait)";
        if (t === "orientation-landscape") return "(orientation: landscape)";
        if (t === "prefers-color-scheme-dark") return "(prefers-color-scheme: dark)";
        if (t === "prefers-color-scheme-light") return "(prefers-color-scheme: light)";
        if (t === "prefers-reduced-motion") return "(prefers-reduced-motion: reduce)";
        if (t === "hover") return "(hover: hover)";
        if (t === "pointer-fine") return "(pointer: fine)";
        if (t === "pointer-coarse") return "(pointer: coarse)";
        if (t === "display-mode-standalone") return "(display-mode: standalone)";
        if (t === "aspect-ratio") return "(aspect-ratio: " + (cond.value || "16/9") + ")";
        if (t === "min-resolution" || t === "max-resolution") {
          var dpi = parseFloat(cond.value || "1") * 96;
          return (
            "(" + t + ": " + (cond.value || "1") + "dppx), (" + t + ": " + dpi.toFixed(0) + "dpi)"
          );
        }
        var val = cond.value || "0";
        var unit = cond.unit || "px";
        return "(" + t + ": " + val + unit + ")";
      }

      function buildQuery() {
        var mediaType = document.getElementById("mediaType").value;
        var logicOp = document.getElementById("logicOp").value;
        var includeBody = document.getElementById("includeBody").checked;

        if (conditions.length === 0) return "";

        var exprs = conditions.map(function (c) {
          return buildConditionExpr(c);
        });

        var mediaQuery;
        if (logicOp === "or") {
          if (mediaType === "all") {
            mediaQuery = "@media " + exprs.join(",\n       ");
          } else {
            var parts = exprs.map(function (e) {
              return mediaType + " and " + e;
            });
            mediaQuery = "@media " + parts.join(",\n       ");
          }
        } else {
          if (mediaType === "all") {
            mediaQuery = "@media " + exprs.join(" and ");
          } else {
            mediaQuery = "@media " + mediaType + " and " + exprs.join(" and ");
          }
        }

        if (includeBody) {
          return mediaQuery + " {\n  /* your styles here */\n}";
        }
        return mediaQuery;
      }

      function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }

      function buildHighlightedQuery() {
        var mediaType = document.getElementById("mediaType").value;
        var logicOp = document.getElementById("logicOp").value;
        var includeBody = document.getElementById("includeBody").checked;

        if (conditions.length === 0) {
          return '<span class="code-comment">/* 添加条件后自动生成代码 */</span>';
        }

        var exprs = conditions.map(function (c) {
          return buildConditionExpr(c);
        });

        function highlightExpr(e) {
          var safe = escapeHtml(e);
          return safe.replace(/(\([^:)]+:)\s*([^)]+)\)/g, function (match, prop, val) {
            return (
              '<span class="code-cond">' +
              prop +
              ' <span class="code-val">' +
              escapeHtml(val.trim()) +
              "</span>)</span>"
            );
          });
        }

        var highlighted = exprs.map(highlightExpr);
        var kwAnd = '<span class="code-kw"> and </span>';
        var result = '<span class="code-kw">@media</span> ';
        var mtSpan = mediaType !== "all" ? '<span class="code-kw">' + mediaType + "</span>" : "";

        if (logicOp === "or") {
          if (mediaType === "all") {
            result += highlighted.join(",\n       ");
          } else {
            var parts = highlighted.map(function (h) {
              return mtSpan + kwAnd + h;
            });
            result += parts.join(",\n       ");
          }
        } else {
          if (mediaType === "all") {
            result += highlighted.join(kwAnd);
          } else {
            result += mtSpan + kwAnd + highlighted.join(kwAnd);
          }
        }

        if (includeBody) {
          result +=
            ' {\n  <span class="code-comment">/* your styles here */</span>\n<span class="code-body">}</span>';
        }

        return result;
      }

      function renderOutput() {
        var outputEl = document.getElementById("outputCode");
        var statusEl = document.getElementById("status");

        if (conditions.length === 0) {
          outputEl.innerHTML = '<span class="code-comment">/* 添加条件后自动生成代码 */</span>';
          outputEl.classList.remove("has-content");
          statusEl.textContent = "准备就绪 — 添加条件后自动生成代码";
          statusEl.className = "status";
          return;
        }

        outputEl.innerHTML = buildHighlightedQuery();
        outputEl.classList.add("has-content");

        var raw = buildQuery();
        var lineCount = raw.split("\n").length;
        statusEl.textContent = "已生成 · " + lineCount + " 行 · " + conditions.length + " 个条件";
        statusEl.className = "status success";
      }

      function createConditionRow(cond) {
        var row = document.createElement("div");
        row.className = "condition-row";
        row.dataset.id = String(cond.id);

        var typeSelect = document.createElement("select");
        typeSelect.setAttribute("aria-label", "条件类型");
        COND_TYPES.forEach(function (ct) {
          var opt = document.createElement("option");
          opt.value = ct.value;
          opt.textContent = ct.label;
          if (ct.value === cond.type) opt.selected = true;
          typeSelect.appendChild(opt);
        });

        var eqLabel = document.createElement("span");
        eqLabel.className = "condition-label";
        eqLabel.textContent = ":";

        var valueInput = document.createElement("input");
        valueInput.setAttribute("aria-label", "条件值");
        if (cond.type === "aspect-ratio") {
          valueInput.type = "text";
          valueInput.placeholder = "16/9";
        } else {
          valueInput.type = "number";
          valueInput.min = "0";
          valueInput.step = "1";
          valueInput.placeholder = "数值";
        }
        valueInput.value = cond.value || "";

        var unitSelect = document.createElement("select");
        unitSelect.setAttribute("aria-label", "单位");

        function populateUnitSelect(currentType) {
          unitSelect.innerHTML = "";
          var ct = getCondType(currentType);
          if (!ct || !ct.unit) return;
          if (ct.unit === "px") {
            ["px", "rem", "em"].forEach(function (u) {
              var o = document.createElement("option");
              o.value = u;
              o.textContent = u;
              if (u === (cond.unit || "px")) o.selected = true;
              unitSelect.appendChild(o);
            });
          } else {
            var o = document.createElement("option");
            o.value = ct.unit;
            o.textContent = ct.unit;
            unitSelect.appendChild(o);
          }
        }

        populateUnitSelect(cond.type);

        var removeBtn = document.createElement("button");
        removeBtn.className = "btn-remove-condition";
        removeBtn.setAttribute("aria-label", "删除条件");
        removeBtn.textContent = "x";

        function updateRowVisibility() {
          var ct = getCondType(typeSelect.value);
          if (!ct) return;
          if (ct.hasValue) {
            eqLabel.style.display = "";
            valueInput.style.display = "";
            unitSelect.style.display = ct.unit ? "" : "none";
            row.style.gridTemplateColumns = "1fr auto 1fr auto auto";
          } else {
            eqLabel.style.display = "none";
            valueInput.style.display = "none";
            unitSelect.style.display = "none";
            row.style.gridTemplateColumns = "1fr auto";
          }
        }

        typeSelect.addEventListener("change", function () {
          var id = parseInt(row.dataset.id, 10);
          var idx = -1;
          for (var i = 0; i < conditions.length; i++) {
            if (conditions[i].id === id) {
              idx = i;
              break;
            }
          }
          if (idx === -1) return;
          conditions[idx].type = typeSelect.value;
          var ct = getCondType(typeSelect.value);
          conditions[idx].unit = ct && ct.unit ? ct.unit : "";
          conditions[idx].value = "";
          valueInput.value = "";
          if (typeSelect.value === "aspect-ratio") {
            valueInput.type = "text";
            valueInput.placeholder = "16/9";
          } else {
            valueInput.type = "number";
            valueInput.placeholder = "数值";
          }
          populateUnitSelect(typeSelect.value);
          updateRowVisibility();
          renderOutput();
        });

        valueInput.addEventListener("input", function () {
          var id = parseInt(row.dataset.id, 10);
          for (var i = 0; i < conditions.length; i++) {
            if (conditions[i].id === id) {
              conditions[i].value = valueInput.value;
              break;
            }
          }
          renderOutput();
        });

        unitSelect.addEventListener("change", function () {
          var id = parseInt(row.dataset.id, 10);
          for (var i = 0; i < conditions.length; i++) {
            if (conditions[i].id === id) {
              conditions[i].unit = unitSelect.value;
              break;
            }
          }
          renderOutput();
        });

        removeBtn.addEventListener("click", function () {
          var id = parseInt(row.dataset.id, 10);
          conditions = conditions.filter(function (c) {
            return c.id !== id;
          });
          renderConditions();
          renderOutput();
        });

        row.appendChild(typeSelect);
        row.appendChild(eqLabel);
        row.appendChild(valueInput);
        row.appendChild(unitSelect);
        row.appendChild(removeBtn);

        updateRowVisibility();
        return row;
      }

      function renderConditions() {
        var list = document.getElementById("conditionsList");
        list.innerHTML = "";

        if (conditions.length === 0) {
          var empty = document.createElement("div");
          empty.className = "empty-conditions";
          empty.textContent = "暂无条件 — 点击「添加条件」或选择上方预设";
          list.appendChild(empty);
          return;
        }

        var logicOp = document.getElementById("logicOp").value;
        conditions.forEach(function (cond, idx) {
          if (idx > 0) {
            var connector = document.createElement("div");
            connector.className = "logic-connector";
            connector.textContent = logicOp === "and" ? "AND" : "OR";
            list.appendChild(connector);
          }
          list.appendChild(createConditionRow(cond));
        });
      }

      function addCondition(type, value, unit) {
        var ct = getCondType(type || "min-width");
        condIdCounter += 1;
        conditions.push({
          id: condIdCounter,
          type: type || "min-width",
          value: value !== undefined ? String(value) : "",
          unit: unit || (ct && ct.unit ? ct.unit : "px")
        });
        renderConditions();
        renderOutput();
      }

      function buildPresetButtons() {
        var container = document.getElementById("presetsContainer");
        PRESETS.forEach(function (preset) {
          var btn = document.createElement("button");
          btn.className = "btn-preset";
          btn.textContent = preset.label;
          btn.addEventListener("click", function () {
            conditions = [];
            condIdCounter = 0;
            document.getElementById("logicOp").value = preset.logic || "and";
            preset.conditions.forEach(function (c) {
              var ct = getCondType(c.type);
              condIdCounter += 1;
              conditions.push({
                id: condIdCounter,
                type: c.type,
                value: c.value !== undefined ? String(c.value) : "",
                unit: c.unit || (ct && ct.unit ? ct.unit : "")
              });
            });
            renderConditions();
            renderOutput();
          });
          container.appendChild(btn);
        });
      }

      document.getElementById("btnAddCondition").addEventListener("click", function () {
        addCondition("min-width", "", "px");
      });

      document.getElementById("btnCopyCode").addEventListener("click", function () {
        var raw = buildQuery();
        var statusEl = document.getElementById("status");
        if (!raw) {
          statusEl.textContent = "没有可复制的内容";
          statusEl.className = "status error";
          return;
        }
        navigator.clipboard.writeText(raw).then(
          function () {
            statusEl.textContent = "已复制到剪贴板";
            statusEl.className = "status success";
          },
          function () {
            statusEl.textContent = "复制失败，请手动选择代码";
            statusEl.className = "status error";
          }
        );
      });

      document.getElementById("btnReset").addEventListener("click", function () {
        conditions = [];
        condIdCounter = 0;
        document.getElementById("mediaType").value = "screen";
        document.getElementById("logicOp").value = "and";
        document.getElementById("includeBody").checked = true;
        renderConditions();
        renderOutput();
      });

      document.getElementById("mediaType").addEventListener("change", renderOutput);
      document.getElementById("logicOp").addEventListener("change", function () {
        renderConditions();
        renderOutput();
      });
      document.getElementById("includeBody").addEventListener("change", renderOutput);

      buildPresetButtons();
      renderConditions();
      renderOutput();

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
    
