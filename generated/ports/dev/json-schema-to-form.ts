// @ts-nocheck
// Generated from tools/dev/json-schema-to-form.html
// Source SHA-256: 2dc6114d3b62b2a1a65f14ea71b021efc3aed8b063abb6fa08814a836ad27333
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var schemaInputEl = document.getElementById("schemaInput");
      var formPreviewEl = document.getElementById("formPreview");
      var outputJsonEl = document.getElementById("outputJson");
      var statusEl = document.getElementById("status");
      var errorDetailEl = document.getElementById("errorDetail");
      var validationBadgeEl = document.getElementById("validationBadge");

      var LS_KEY = "json_schema_to_form_v1";
      var currentSchema = null;

      var EXAMPLE_SCHEMA = JSON.stringify(
        {
          title: "用户注册",
          description: "请填写以下信息完成注册",
          type: "object",
          required: ["username", "email", "age", "role"],
          properties: {
            username: {
              type: "string",
              title: "用户名",
              minLength: 3,
              maxLength: 20,
              description: "3~20 个字符"
            },
            email: {
              type: "string",
              title: "邮箱",
              format: "email"
            },
            age: {
              type: "integer",
              title: "年龄",
              minimum: 1,
              maximum: 120
            },
            role: {
              type: "string",
              title: "角色",
              enum: ["admin", "editor", "viewer"]
            },
            bio: {
              type: "string",
              title: "个人简介",
              maxLength: 200
            },
            newsletter: {
              type: "boolean",
              title: "订阅新闻邮件"
            },
            tags: {
              type: "array",
              title: "标签",
              items: {
                type: "string",
                title: "标签"
              }
            },
            address: {
              type: "object",
              title: "地址",
              properties: {
                city: { type: "string", title: "城市" },
                zip: { type: "string", title: "邮编", pattern: "^[0-9]{6}$" }
              }
            }
          }
        },
        null,
        2
      );

      /* ── Utility ── */
      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function showError(msg) {
        errorDetailEl.textContent = msg;
        errorDetailEl.classList.add("show");
      }

      function hideError() {
        errorDetailEl.classList.remove("show");
        errorDetailEl.textContent = "";
      }

      /* ── Schema → Form renderer ── */
      var fieldIdCounter = 0;

      function nextId(prefix) {
        fieldIdCounter++;
        return (prefix || "sf") + "_" + fieldIdCounter;
      }

      function getRequired(schema) {
        return Array.isArray(schema.required) ? schema.required : [];
      }

      function buildField(schema, fieldName, required, depth) {
        depth = depth || 0;
        var container = document.createElement("div");
        container.className = "sf-field";

        var title = schema.title || fieldName || "";
        var type = schema.type || "string";

        /* Resolve enum → select regardless of type */
        if (Array.isArray(schema.enum)) {
          return buildSelectField(schema, fieldName, required, title);
        }

        if (type === "object") {
          return buildObjectField(schema, fieldName, required, title, depth);
        }
        if (type === "array") {
          return buildArrayField(schema, fieldName, required, title, depth);
        }
        if (type === "boolean") {
          return buildBooleanField(schema, fieldName, required, title);
        }
        if (type === "integer" || type === "number") {
          return buildNumberField(schema, fieldName, required, title, type);
        }
        /* default: string */
        return buildStringField(schema, fieldName, required, title);
      }

      function makeLabel(title, type, required) {
        var label = document.createElement("label");
        label.className = "sf-label";
        label.textContent = title || "（无标题）";
        if (required) {
          var req = document.createElement("span");
          req.className = "sf-required";
          req.textContent = "*";
          label.appendChild(req);
        }
        var badge = document.createElement("span");
        badge.className = "sf-type-badge";
        badge.textContent = type;
        label.appendChild(badge);
        return label;
      }

      function makeHint(schema) {
        var parts = [];
        if (schema.description) parts.push(schema.description);
        if (schema.minLength !== undefined) parts.push("最少 " + schema.minLength + " 字符");
        if (schema.maxLength !== undefined) parts.push("最多 " + schema.maxLength + " 字符");
        if (schema.minimum !== undefined) parts.push("≥ " + schema.minimum);
        if (schema.maximum !== undefined) parts.push("≤ " + schema.maximum);
        if (schema.pattern) parts.push("格式: " + schema.pattern);
        if (schema.format) parts.push("格式: " + schema.format);
        if (!parts.length) return null;
        var hint = document.createElement("div");
        hint.className = "sf-field-hint";
        hint.textContent = parts.join(" · ");
        return hint;
      }

      function makeErrorDiv() {
        var div = document.createElement("div");
        div.className = "sf-field-error";
        return div;
      }

      function attachValidation(inputEl, schema, required, errorDiv) {
        function validate() {
          var val = inputEl.type === "checkbox" ? inputEl.checked : inputEl.value;
          var errors = validateValue(val, schema, required);
          if (errors.length) {
            inputEl.classList.add("invalid");
            inputEl.classList.remove("valid");
            errorDiv.textContent = errors[0];
            errorDiv.classList.add("show");
          } else {
            inputEl.classList.remove("invalid");
            if (String(val).length > 0 || inputEl.type === "checkbox") {
              inputEl.classList.add("valid");
            }
            errorDiv.classList.remove("show");
          }
          syncOutputJson();
        }
        inputEl.addEventListener("input", validate);
        inputEl.addEventListener("change", validate);
      }

      function buildStringField(schema, fieldName, required, title) {
        var container = document.createElement("div");
        container.className = "sf-field";
        var id = nextId("str");
        var label = makeLabel(title, schema.format || "string", required);
        label.htmlFor = id;
        container.appendChild(label);

        var input;
        var isMultiline =
          schema.maxLength > 100 ||
          (schema.description && schema.description.length > 30 && !schema.format);
        if (isMultiline) {
          input = document.createElement("textarea");
          input.className = "sf-textarea";
          input.rows = 3;
        } else {
          input = document.createElement("input");
          input.className = "sf-input";
          input.type =
            schema.format === "email" ? "email" : schema.format === "uri" ? "url" : "text";
        }
        input.id = id;
        input.name = fieldName || id;
        if (schema.minLength !== undefined) input.minLength = schema.minLength;
        if (schema.maxLength !== undefined) input.maxLength = schema.maxLength;
        if (schema.pattern) input.pattern = schema.pattern;
        if (required) input.required = true;
        if (schema.placeholder) input.placeholder = schema.placeholder;
        container.appendChild(input);

        var hint = makeHint(schema);
        if (hint) container.appendChild(hint);

        var errDiv = makeErrorDiv();
        container.appendChild(errDiv);
        attachValidation(input, schema, required, errDiv);
        return container;
      }

      function buildNumberField(schema, fieldName, required, title, type) {
        var container = document.createElement("div");
        container.className = "sf-field";
        var id = nextId("num");
        var label = makeLabel(title, type, required);
        label.htmlFor = id;
        container.appendChild(label);

        var input = document.createElement("input");
        input.className = "sf-input";
        input.type = "number";
        input.id = id;
        input.name = fieldName || id;
        if (schema.minimum !== undefined) input.min = schema.minimum;
        if (schema.maximum !== undefined) input.max = schema.maximum;
        if (type === "integer") input.step = 1;
        if (required) input.required = true;
        container.appendChild(input);

        var hint = makeHint(schema);
        if (hint) container.appendChild(hint);

        var errDiv = makeErrorDiv();
        container.appendChild(errDiv);
        attachValidation(input, schema, required, errDiv);
        return container;
      }

      function buildBooleanField(schema, fieldName, required, title) {
        var container = document.createElement("div");
        container.className = "sf-field";
        var id = nextId("bool");
        var group = document.createElement("div");
        group.className = "sf-checkbox-group";

        var input = document.createElement("input");
        input.type = "checkbox";
        input.id = id;
        input.name = fieldName || id;
        group.appendChild(input);

        var label = document.createElement("label");
        label.htmlFor = id;
        label.className = "sf-label";
        label.textContent = title || fieldName || "（布尔值）";
        var badge = document.createElement("span");
        badge.className = "sf-type-badge";
        badge.textContent = "boolean";
        label.appendChild(badge);
        group.appendChild(label);

        container.appendChild(group);

        var hint = makeHint(schema);
        if (hint) container.appendChild(hint);

        var errDiv = makeErrorDiv();
        container.appendChild(errDiv);
        input.addEventListener("change", syncOutputJson);
        return container;
      }

      function buildSelectField(schema, fieldName, required, title) {
        var container = document.createElement("div");
        container.className = "sf-field";
        var id = nextId("sel");
        var label = makeLabel(title, "enum", required);
        label.htmlFor = id;
        container.appendChild(label);

        var select = document.createElement("select");
        select.className = "sf-select";
        select.id = id;
        select.name = fieldName || id;
        if (required) select.required = true;

        var placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "— 请选择 —";
        placeholder.disabled = true;
        placeholder.selected = true;
        select.appendChild(placeholder);

        schema.enum.forEach(function (val) {
          var opt = document.createElement("option");
          opt.value = String(val);
          opt.textContent = String(val);
          select.appendChild(opt);
        });
        container.appendChild(select);

        var hint = makeHint(schema);
        if (hint) container.appendChild(hint);

        var errDiv = makeErrorDiv();
        container.appendChild(errDiv);
        attachValidation(select, schema, required, errDiv);
        return container;
      }

      function buildObjectField(schema, fieldName, required, title, depth) {
        var container = document.createElement("div");
        container.className = "sf-field";

        if (title && depth > 0) {
          var legend = document.createElement("div");
          legend.className = "sf-object-legend";
          legend.textContent = title + " (object)";
          container.appendChild(legend);
        }

        var group = document.createElement("div");
        group.className = "sf-object-group";
        container.appendChild(group);

        var props = schema.properties || {};
        var req = getRequired(schema);
        Object.keys(props).forEach(function (key) {
          var child = buildField(props[key], key, req.indexOf(key) !== -1, depth + 1);
          group.appendChild(child);
        });

        if (!Object.keys(props).length) {
          var empty = document.createElement("div");
          empty.className = "sf-field-hint";
          empty.textContent = "（此对象无定义的属性）";
          group.appendChild(empty);
        }

        return container;
      }

      function buildArrayField(schema, fieldName, required, title, depth) {
        var container = document.createElement("div");
        container.className = "sf-field";

        var legend = document.createElement("div");
        legend.className = "sf-array-legend";
        legend.textContent = (title || fieldName || "数组") + " (array)";
        container.appendChild(legend);

        var itemsWrapper = document.createElement("div");
        itemsWrapper.className = "sf-array-group";
        container.appendChild(itemsWrapper);

        var itemSchema = schema.items || { type: "string" };
        var itemsContainer = document.createElement("div");
        itemsContainer.dataset.arrayField = "1";
        itemsWrapper.appendChild(itemsContainer);

        var addBtn = document.createElement("button");
        addBtn.type = "button";
        addBtn.className = "sf-array-add";
        addBtn.textContent = "+ 添加项";
        itemsWrapper.appendChild(addBtn);

        function addItem() {
          var row = document.createElement("div");
          row.className = "sf-array-item";

          var fieldEl = buildField(itemSchema, null, false, depth + 1);
          row.appendChild(fieldEl);

          var removeBtn = document.createElement("button");
          removeBtn.type = "button";
          removeBtn.className = "sf-array-remove";
          removeBtn.title = "删除";
          removeBtn.textContent = "×";
          removeBtn.onclick = function () {
            row.remove();
            syncOutputJson();
          };
          row.appendChild(removeBtn);
          itemsContainer.appendChild(row);
          syncOutputJson();
        }

        addBtn.onclick = addItem;
        /* Start with one empty item */
        addItem();

        return container;
      }

      /* ── Value collection ── */
      function collectFieldValue(fieldEl, schema) {
        if (!schema) return undefined;
        var type = schema.type;

        if (Array.isArray(schema.enum)) {
          var sel = fieldEl.querySelector("select.sf-select");
          return sel ? sel.value || null : null;
        }
        if (type === "boolean") {
          var cb = fieldEl.querySelector("input[type='checkbox']");
          return cb ? cb.checked : false;
        }
        if (type === "integer" || type === "number") {
          var numInput = fieldEl.querySelector("input[type='number']");
          if (!numInput || numInput.value === "") return null;
          return type === "integer" ? parseInt(numInput.value, 10) : parseFloat(numInput.value);
        }
        if (type === "object") {
          var props = schema.properties || {};
          var result = {};
          var keys = Object.keys(props);
          var children = fieldEl.querySelectorAll(":scope > .sf-object-group > .sf-field");
          keys.forEach(function (key, i) {
            var child = children[i];
            if (child) result[key] = collectFieldValue(child, props[key]);
          });
          return result;
        }
        if (type === "array") {
          var itemSchema = schema.items || { type: "string" };
          var rows = fieldEl.querySelectorAll(":scope .sf-array-item");
          var arr = [];
          rows.forEach(function (row) {
            var childField = row.querySelector(".sf-field");
            if (childField) arr.push(collectFieldValue(childField, itemSchema));
          });
          return arr;
        }
        /* string default */
        var strInput = fieldEl.querySelector("input.sf-input, textarea.sf-textarea");
        return strInput ? strInput.value : "";
      }

      function collectFormValues(schema) {
        if (!currentSchema || !schema) return {};
        if (schema.type !== "object") {
          /* Top-level non-object: collect root field */
          var rootField = formPreviewEl.querySelector(".sf-form > .sf-field");
          if (rootField) return collectFieldValue(rootField, schema);
          return null;
        }
        var props = schema.properties || {};
        var result = {};
        var keys = Object.keys(props);
        var topFields = formPreviewEl.querySelectorAll(".sf-form > .sf-field");
        /* Skip title/desc divs — they're not .sf-field */
        keys.forEach(function (key, i) {
          var child = topFields[i];
          if (child) result[key] = collectFieldValue(child, props[key]);
        });
        return result;
      }

      function syncOutputJson() {
        if (!currentSchema) return;
        try {
          var vals = collectFormValues(currentSchema);
          outputJsonEl.value = JSON.stringify(vals, null, 2);
          updateValidationBadge(vals, currentSchema);
        } catch (e) {
          outputJsonEl.value = "";
        }
      }

      /* ── Simple validation ── */
      function validateValue(val, schema, required) {
        var errors = [];
        var strVal = String(val === null || val === undefined ? "" : val);
        if (required && (val === null || val === undefined || strVal === "")) {
          errors.push("此字段必填");
          return errors;
        }
        if (!strVal && !required) return errors;

        var type = schema.type;
        if (type === "integer") {
          if (!/^-?\d+$/.test(strVal)) errors.push("请输入整数");
          else {
            var n = parseInt(strVal, 10);
            if (schema.minimum !== undefined && n < schema.minimum)
              errors.push("最小值为 " + schema.minimum);
            if (schema.maximum !== undefined && n > schema.maximum)
              errors.push("最大值为 " + schema.maximum);
          }
        } else if (type === "number") {
          if (isNaN(parseFloat(strVal))) errors.push("请输入数字");
          else {
            var nf = parseFloat(strVal);
            if (schema.minimum !== undefined && nf < schema.minimum)
              errors.push("最小值为 " + schema.minimum);
            if (schema.maximum !== undefined && nf > schema.maximum)
              errors.push("最大值为 " + schema.maximum);
          }
        } else if (type === "string" || !type) {
          if (schema.minLength !== undefined && strVal.length < schema.minLength)
            errors.push("最少 " + schema.minLength + " 个字符");
          if (schema.maxLength !== undefined && strVal.length > schema.maxLength)
            errors.push("最多 " + schema.maxLength + " 个字符");
          if (schema.pattern) {
            try {
              if (!new RegExp(schema.pattern).test(strVal))
                errors.push("格式不符: " + schema.pattern);
            } catch (_e) {}
          }
          if (schema.format === "email" && strVal) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(strVal)) errors.push("邮箱格式不正确");
          }
        }
        return errors;
      }

      function updateValidationBadge(vals, schema) {
        if (!schema || schema.type !== "object") {
          validationBadgeEl.textContent = "";
          return;
        }
        var req = getRequired(schema);
        var props = schema.properties || {};
        var allOk = true;
        req.forEach(function (key) {
          var v = vals[key];
          if (v === null || v === undefined || v === "") allOk = false;
        });
        Object.keys(props).forEach(function (key) {
          var isReq = req.indexOf(key) !== -1;
          var v = vals[key];
          var errs = validateValue(v, props[key], isReq);
          if (errs.length) allOk = false;
        });
        validationBadgeEl.textContent = allOk ? "✓ 验证通过" : "⚠ 存在错误";
        validationBadgeEl.style.color = allOk ? "var(--color-success)" : "var(--color-warning)";
      }

      /* ── Generate ── */
      function generateForm() {
        hideError();
        var raw = schemaInputEl.value.trim();
        if (!raw) {
          showStatus("请输入 JSON Schema", "error");
          return;
        }
        var schema;
        try {
          schema = JSON.parse(raw);
        } catch (e) {
          schemaInputEl.classList.add("error");
          showError("JSON 解析失败: " + e.message);
          showStatus("Schema 解析失败", "error");
          return;
        }
        schemaInputEl.classList.remove("error");
        currentSchema = schema;
        fieldIdCounter = 0;

        /* Clear form */
        formPreviewEl.innerHTML = "";
        formPreviewEl.classList.add("has-content");

        var form = document.createElement("div");
        form.className = "sf-form";

        if (schema.title) {
          var h = document.createElement("div");
          h.className = "sf-title";
          h.textContent = schema.title;
          form.appendChild(h);
        }
        if (schema.description) {
          var d = document.createElement("div");
          d.className = "sf-desc";
          d.textContent = schema.description;
          form.appendChild(d);
        }

        if (schema.type === "object") {
          var props = schema.properties || {};
          var req = getRequired(schema);
          Object.keys(props).forEach(function (key) {
            var child = buildField(props[key], key, req.indexOf(key) !== -1, 0);
            form.appendChild(child);
          });
        } else {
          form.appendChild(buildField(schema, "value", false, 0));
        }

        /* Submit / Reset row */
        var submitRow = document.createElement("div");
        submitRow.className = "sf-submit-row";

        var submitBtn = document.createElement("button");
        submitBtn.type = "button";
        submitBtn.className = "sf-submit";
        submitBtn.textContent = "提交（收集值）";
        submitBtn.onclick = function () {
          syncOutputJson();
          showStatus("表单值已收集到下方 JSON", "success");
        };
        submitRow.appendChild(submitBtn);

        var resetBtn = document.createElement("button");
        resetBtn.type = "button";
        resetBtn.className = "sf-reset";
        resetBtn.textContent = "重置";
        resetBtn.onclick = function () {
          generateForm();
        };
        submitRow.appendChild(resetBtn);
        form.appendChild(submitRow);

        formPreviewEl.appendChild(form);
        syncOutputJson();
        showStatus(
          "表单已生成 · " + Object.keys(schema.properties || {}).length + " 个字段",
          "success"
        );
        localStorage.setItem(LS_KEY, raw);
      }

      /* ── Button wiring ── */
      document.getElementById("btnGenerate").onclick = generateForm;

      document.getElementById("btnExample").onclick = function () {
        schemaInputEl.value = EXAMPLE_SCHEMA;
        schemaInputEl.classList.remove("error");
        generateForm();
      };

      document.getElementById("btnClear").onclick = function () {
        schemaInputEl.value = "";
        schemaInputEl.classList.remove("error");
        formPreviewEl.innerHTML = '<p class="empty-hint">← 输入 Schema 后点击「生成表单」</p>';
        formPreviewEl.classList.remove("has-content");
        outputJsonEl.value = "";
        validationBadgeEl.textContent = "";
        currentSchema = null;
        hideError();
        statusEl.textContent = "";
        statusEl.className = "status";
        localStorage.removeItem(LS_KEY);
      };

      document.getElementById("btnCopyJson").onclick = async function () {
        if (!outputJsonEl.value) {
          showStatus("没有内容可复制", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(outputJsonEl.value);
          showStatus("JSON 已复制", "success");
        } catch (_e) {
          showStatus("复制失败", "error");
        }
      };

      /* Ctrl/Cmd+Enter to generate */
      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          generateForm();
        }
      });

      /* Restore from localStorage */
      (function () {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          schemaInputEl.value = saved;
        }
      })();

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
    
