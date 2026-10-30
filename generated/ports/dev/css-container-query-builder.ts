// @ts-nocheck
// Generated from tools/dev/css-container-query-builder.html
// Source SHA-256: 3f804cf7d701c5413ca2ec7d0d830698b648ce794538b80d8aba7078c2f0b17e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ===== State =====
      var conditions = [];
      var conditionIdCounter = 0;
      var currentLogic = "and";

      var FEATURES = [
        { value: "width", label: "width（宽度）" },
        { value: "height", label: "height（高度）" },
        { value: "inline-size", label: "inline-size（行内尺寸）" },
        { value: "block-size", label: "block-size（块尺寸）" },
        { value: "aspect-ratio", label: "aspect-ratio（宽高比）" },
        { value: "orientation", label: "orientation（方向）" }
      ];

      var OPERATORS = [
        { value: "min", label: ">=" },
        { value: "max", label: "<=" },
        { value: "exact", label: "=" }
      ];

      var ORIENTATION_VALUES = ["landscape", "portrait"];

      // ===== DOM refs =====
      var conditionListEl = document.getElementById("conditionList");
      var outputCodeEl = document.getElementById("outputCode");
      var statusEl = document.getElementById("status");
      var previewContainer = document.getElementById("previewContainer");
      var previewChild = document.getElementById("previewChild");
      var previewStatus = document.getElementById("previewStatus");
      var previewWidthInput = document.getElementById("previewWidth");
      var previewWidthVal = document.getElementById("previewWidthVal");

      // ===== Condition management =====
      function addCondition(feature, operator, value) {
        var id = ++conditionIdCounter;
        conditions.push({
          id: id,
          feature: feature || "width",
          operator: operator || "min",
          value: value !== undefined ? value : "600"
        });
        renderConditions();
        generate();
      }

      function removeCondition(id) {
        conditions = conditions.filter(function (c) {
          return c.id !== id;
        });
        renderConditions();
        generate();
      }

      function updateCondition(id, key, val) {
        var cond = conditions.find(function (c) {
          return c.id === id;
        });
        if (!cond) return;
        cond[key] = val;
        if (key === "feature" && val === "orientation") {
          cond.value = "landscape";
        } else if (key === "feature" && (cond.value === "landscape" || cond.value === "portrait")) {
          cond.value = "600";
        }
        renderConditions();
        generate();
      }

      function renderConditions() {
        conditionListEl.innerHTML = "";
        conditions.forEach(function (cond) {
          var row = document.createElement("div");
          row.className = "condition-row";

          // Feature select
          var featSel = document.createElement("select");
          FEATURES.forEach(function (f) {
            var opt = document.createElement("option");
            opt.value = f.value;
            opt.textContent = f.label;
            if (f.value === cond.feature) opt.selected = true;
            featSel.appendChild(opt);
          });
          (function (capturedId) {
            featSel.addEventListener("change", function () {
              updateCondition(capturedId, "feature", featSel.value);
            });
          })(cond.id);

          // Operator select
          var opSel = document.createElement("select");
          OPERATORS.forEach(function (o) {
            var opt = document.createElement("option");
            opt.value = o.value;
            opt.textContent = o.label;
            if (o.value === cond.operator) opt.selected = true;
            opSel.appendChild(opt);
          });
          (function (capturedId) {
            opSel.addEventListener("change", function () {
              updateCondition(capturedId, "operator", opSel.value);
            });
          })(cond.id);

          // Value input or select
          var valEl;
          if (cond.feature === "orientation") {
            valEl = document.createElement("select");
            ORIENTATION_VALUES.forEach(function (v) {
              var opt = document.createElement("option");
              opt.value = v;
              opt.textContent = v;
              if (v === cond.value) opt.selected = true;
              valEl.appendChild(opt);
            });
            (function (capturedId) {
              valEl.addEventListener("change", function () {
                updateCondition(capturedId, "value", valEl.value);
              });
            })(cond.id);
          } else if (cond.feature === "aspect-ratio") {
            valEl = document.createElement("input");
            valEl.type = "text";
            valEl.placeholder = "16/9";
            valEl.value = cond.value;
            (function (capturedId) {
              valEl.addEventListener("input", function () {
                updateCondition(capturedId, "value", valEl.value);
              });
            })(cond.id);
          } else {
            valEl = document.createElement("input");
            valEl.type = "number";
            valEl.min = "0";
            valEl.placeholder = "px";
            valEl.value = cond.value;
            (function (capturedId) {
              valEl.addEventListener("input", function () {
                updateCondition(capturedId, "value", valEl.value);
              });
            })(cond.id);
          }

          // Remove button
          var removeBtn = document.createElement("button");
          removeBtn.className = "btn-remove-cond";
          removeBtn.textContent = "×";
          removeBtn.title = "删除此条件";
          (function (capturedId) {
            removeBtn.addEventListener("click", function () {
              removeCondition(capturedId);
            });
          })(cond.id);

          row.appendChild(featSel);
          row.appendChild(opSel);
          row.appendChild(valEl);
          row.appendChild(removeBtn);
          conditionListEl.appendChild(row);
        });
      }

      // ===== Code generation =====
      function buildConditionStr(cond) {
        var feature = cond.feature;
        var op = cond.operator;
        var val = cond.value;
        var unit = "";

        if (feature !== "orientation" && feature !== "aspect-ratio") {
          unit = "px";
        }

        if (op === "min") {
          return "(min-" + feature + ": " + val + unit + ")";
        }
        if (op === "max") {
          return "(max-" + feature + ": " + val + unit + ")";
        }
        return "(" + feature + ": " + val + unit + ")";
      }

      function buildQueryCondition() {
        if (conditions.length === 0) return "/* 请添加查询条件 */";
        var glue = currentLogic === "and" ? " and " : " or ";
        return conditions.map(buildConditionStr).join(glue);
      }

      function generate() {
        var containerName = document.getElementById("containerName").value.trim();
        var containerType = document.getElementById("containerType").value;
        var containerSelector = document.getElementById("containerSelector").value.trim();
        var innerSelector = document.getElementById("innerSelector").value.trim() || ".element";
        var cssRulesRaw = document.getElementById("cssRules").value;
        var includeContainerDecl = document.getElementById("includeContainerDecl").checked;
        var includeComments = document.getElementById("includeComments").checked;
        var includeFallback = document.getElementById("includeFallback").checked;

        var cssLines = cssRulesRaw
          .split("\n")
          .map(function (l) {
            return l.trim();
          })
          .filter(function (l) {
            return l.length > 0;
          })
          .map(function (l) {
            return l.endsWith(";") ? l : l + ";";
          });

        var indent = "  ";
        var lines = [];
        var queryCondition = buildQueryCondition();
        var containerAtName = containerName ? " " + containerName : "";
        var containerRef = containerName ? containerName : "最近容器";

        if (includeComments) {
          lines.push("/* CSS Container Queries — 容器查询 */");
          lines.push("/* 浏览器支持: Chrome 105+, Firefox 110+, Safari 16+ */");
          lines.push("");
        }

        if (includeContainerDecl && containerSelector) {
          if (includeComments) {
            lines.push("/* 1. 在父元素上声明容器 */");
          }
          lines.push(containerSelector + " {");
          if (containerName) {
            lines.push(indent + "container-name: " + containerName + ";");
          }
          lines.push(indent + "container-type: " + containerType + ";");
          lines.push("}");
          lines.push("");
        }

        if (includeComments) {
          lines.push("/* 2. 当" + containerRef + "满足条件时应用样式 */");
        }

        lines.push("@container" + containerAtName + " " + queryCondition + " {");
        lines.push(indent + innerSelector + " {");
        if (cssLines.length > 0) {
          cssLines.forEach(function (rule) {
            lines.push(indent + indent + rule);
          });
        } else {
          lines.push(indent + indent + "/* 在左侧填写 CSS 规则 */");
        }
        lines.push(indent + "}");
        lines.push("}");

        if (includeFallback) {
          lines.push("");
          if (includeComments) {
            lines.push("/* 3. 不支持容器查询的降级处理 */");
          }
          lines.push("@supports not (container-type: inline-size) {");
          lines.push(indent + "/* 这里放媒体查询或默认样式 */");
          lines.push(indent + innerSelector + " {");
          cssLines.forEach(function (rule) {
            lines.push(indent + indent + rule);
          });
          lines.push(indent + "}");
          lines.push("}");
        }

        outputCodeEl.textContent = lines.join("\n");
        updatePreview();
        showStatus("代码已更新", "success");
      }

      // ===== Live preview =====
      function updatePreview() {
        var containerType = document.getElementById("containerType").value;
        previewContainer.style.containerType = containerType;

        var width = parseInt(previewWidthInput.value, 10);
        var satisfied = checkConditions(width);

        if (satisfied) {
          previewChild.style.background = "var(--color-success)";
          previewChild.textContent = "✓ 条件满足 — 样式已应用";
          previewStatus.textContent = "当前宽度 " + width + "px，查询条件满足";
        } else {
          previewChild.style.background = "var(--color-accent-primary)";
          previewChild.textContent = "预览元素";
          previewStatus.textContent = "当前宽度 " + width + "px，查询条件未满足";
        }
      }

      function checkConditions(width) {
        if (conditions.length === 0) return false;

        var results = conditions.map(function (cond) {
          var feature = cond.feature;
          var op = cond.operator;
          var val = parseFloat(cond.value);

          if (feature === "orientation") {
            var isLandscape = width > 300;
            return cond.value === "landscape" ? isLandscape : !isLandscape;
          }
          if (feature === "aspect-ratio") return true;

          if (op === "min") return width >= val;
          if (op === "max") return width <= val;
          if (op === "exact") return width === val;
          return false;
        });

        if (currentLogic === "and") return results.every(Boolean);
        return results.some(Boolean);
      }

      // ===== Status helper =====
      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // ===== Copy helpers =====
      async function copyText(text, label) {
        try {
          await navigator.clipboard.writeText(text);
          showStatus(label || "已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      }

      function getQueryOnlyCode() {
        var containerName = document.getElementById("containerName").value.trim();
        var containerAtName = containerName ? " " + containerName : "";
        return "@container" + containerAtName + " " + buildQueryCondition() + " { ... }";
      }

      // ===== Event listeners =====
      document.getElementById("btnGenerate").onclick = generate;

      document.getElementById("btnReset").onclick = function () {
        document.getElementById("containerName").value = "";
        document.getElementById("containerType").value = "inline-size";
        document.getElementById("containerSelector").value = ".card-wrapper";
        document.getElementById("innerSelector").value = ".card";
        document.getElementById("cssRules").value =
          "flex-direction: column;\nfont-size: 0.875rem;\ngap: 8px;";
        document.getElementById("includeContainerDecl").checked = true;
        document.getElementById("includeComments").checked = true;
        document.getElementById("includeFallback").checked = false;
        conditions = [];
        currentLogic = "and";
        document.getElementById("logicAnd").classList.add("active");
        document.getElementById("logicOr").classList.remove("active");
        addCondition("width", "max", "600");
        showStatus("已重置", "success");
      };

      document.getElementById("btnCopyAll").onclick = function () {
        copyText(outputCodeEl.textContent, "全部代码已复制");
      };

      document.getElementById("btnCopyQuery").onclick = function () {
        copyText(getQueryOnlyCode(), "@container 规则已复制");
      };

      document.getElementById("btnCopyCode").onclick = function () {
        copyText(outputCodeEl.textContent, "已复制");
      };

      document.getElementById("btnAddCondition").onclick = function () {
        addCondition("width", "min", "600");
      };

      document.getElementById("logicAnd").onclick = function () {
        currentLogic = "and";
        document.getElementById("logicAnd").classList.add("active");
        document.getElementById("logicOr").classList.remove("active");
        generate();
      };

      document.getElementById("logicOr").onclick = function () {
        currentLogic = "or";
        document.getElementById("logicOr").classList.add("active");
        document.getElementById("logicAnd").classList.remove("active");
        generate();
      };

      // Live re-generate on any config change
      var liveInputIds = [
        "containerName",
        "containerType",
        "containerSelector",
        "innerSelector",
        "cssRules",
        "includeContainerDecl",
        "includeComments",
        "includeFallback"
      ];
      liveInputIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        var evtType = el.type === "checkbox" ? "change" : "input";
        el.addEventListener(evtType, generate);
      });

      // Preview width slider
      previewWidthInput.addEventListener("input", function () {
        var w = previewWidthInput.value;
        previewWidthVal.textContent = w + "px";
        previewContainer.style.width = w + "px";
        updatePreview();
      });

      // ===== Theme =====
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      // ===== Init =====
      initTheme();
      addCondition("width", "max", "600");
    
