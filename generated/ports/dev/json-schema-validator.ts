// @ts-nocheck
// Generated from tools/dev/json-schema-validator.html
// Source SHA-256: 6735816071dfda745472e0f476e84b21ee113e71bdece0df596529bcd2cd6cf5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      class JSONSchemaValidator {
        constructor(schema) {
          this.schema = schema;
          this.errors = [];
        }
        validate(data) {
          this.errors = [];
          this.validateNode(this.schema, data, "#");
          return { valid: this.errors.length === 0, errors: this.errors };
        }
        validateNode(schema, data, path) {
          if (schema === true) return;
          if (schema === false) {
            this.addError(path, "Schema 禁止任何值");
            return;
          }
          if (schema.type && !this.validateType(schema.type, data, path)) return;
          if (schema.enum && !schema.enum.some((v) => JSON.stringify(v) === JSON.stringify(data))) {
            this.addError(
              path,
              "值必须是以下之一: " + schema.enum.map((v) => JSON.stringify(v)).join(", ")
            );
          }
          if (schema.const !== undefined && JSON.stringify(data) !== JSON.stringify(schema.const)) {
            this.addError(path, "值必须等于 " + JSON.stringify(schema.const));
          }
          const type = this.getType(data);
          if (type === "string") this.validateString(schema, data, path);
          else if (type === "number" || type === "integer") this.validateNumber(schema, data, path);
          else if (type === "array") this.validateArray(schema, data, path);
          else if (type === "object") this.validateObject(schema, data, path);
          if (schema.allOf) schema.allOf.forEach((s) => this.validateNode(s, data, path));
          if (schema.anyOf) {
            const results = schema.anyOf.map((s) => new JSONSchemaValidator(s).validate(data));
            if (!results.some((r) => r.valid)) this.addError(path, "值不满足任何 anyOf 条件");
          }
          if (schema.oneOf) {
            const results = schema.oneOf.map((s) => new JSONSchemaValidator(s).validate(data));
            const validCount = results.filter((r) => r.valid).length;
            if (validCount !== 1)
              this.addError(path, "值必须恰好满足一个 oneOf 条件，当前满足 " + validCount + " 个");
          }
        }
        validateType(types, data, path) {
          const typeArray = Array.isArray(types) ? types : [types];
          const actualType = this.getType(data);
          for (const type of typeArray) {
            if (type === actualType) return true;
            if (type === "integer" && actualType === "number" && Number.isInteger(data))
              return true;
            if (type === "number" && actualType === "integer") return true;
          }
          this.addError(
            path,
            "类型错误: 期望 " + typeArray.join(" 或 ") + ", 实际是 " + actualType
          );
          return false;
        }
        validateString(schema, data, path) {
          if (typeof data !== "string") return;
          if (schema.minLength !== undefined && data.length < schema.minLength)
            this.addError(path, "字符串长度至少为 " + schema.minLength + "，当前为 " + data.length);
          if (schema.maxLength !== undefined && data.length > schema.maxLength)
            this.addError(path, "字符串长度最多为 " + schema.maxLength + "，当前为 " + data.length);
          if (schema.pattern && !new RegExp(schema.pattern).test(data))
            this.addError(path, "字符串不匹配正则: " + schema.pattern);
          if (schema.format) this.validateFormat(schema.format, data, path);
        }
        validateFormat(format, data, path) {
          const formats = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            uri: /^https?:\/\/.+/,
            uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
            date: /^\d{4}-\d{2}-\d{2}$/,
            "date-time": /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
            ipv4: /^(\d{1,3}\.){3}\d{1,3}$/
          };
          if (formats[format] && !formats[format].test(data))
            this.addError(path, '字符串格式不符合 "' + format + '" 规范');
        }
        validateNumber(schema, data, path) {
          if (typeof data !== "number") return;
          if (schema.minimum !== undefined && data < schema.minimum)
            this.addError(path, "数值不能小于 " + schema.minimum);
          if (schema.maximum !== undefined && data > schema.maximum)
            this.addError(path, "数值不能大于 " + schema.maximum);
          if (schema.exclusiveMinimum !== undefined && data <= schema.exclusiveMinimum)
            this.addError(path, "数值必须大于 " + schema.exclusiveMinimum);
          if (schema.exclusiveMaximum !== undefined && data >= schema.exclusiveMaximum)
            this.addError(path, "数值必须小于 " + schema.exclusiveMaximum);
          if (schema.multipleOf !== undefined && data % schema.multipleOf !== 0)
            this.addError(path, "数值必须是 " + schema.multipleOf + " 的倍数");
        }
        validateArray(schema, data, path) {
          if (!Array.isArray(data)) return;
          if (schema.minItems !== undefined && data.length < schema.minItems)
            this.addError(
              path,
              "数组至少需要 " + schema.minItems + " 项，当前有 " + data.length + " 项"
            );
          if (schema.maxItems !== undefined && data.length > schema.maxItems)
            this.addError(
              path,
              "数组最多只能有 " + schema.maxItems + " 项，当前有 " + data.length + " 项"
            );
          if (schema.uniqueItems) {
            const seen = new Set();
            data.forEach((item, i) => {
              const str = JSON.stringify(item);
              if (seen.has(str)) this.addError(path + "[" + i + "]", "数组项必须唯一");
              seen.add(str);
            });
          }
          if (schema.items && !Array.isArray(schema.items)) {
            data.forEach((item, i) => this.validateNode(schema.items, item, path + "[" + i + "]"));
          }
        }
        validateObject(schema, data, path) {
          if (typeof data !== "object" || data === null || Array.isArray(data)) return;
          const keys = Object.keys(data);
          if (schema.required) {
            schema.required.forEach((key) => {
              if (!(key in data)) this.addError(path, "缺少必需属性: " + key);
            });
          }
          if (schema.minProperties !== undefined && keys.length < schema.minProperties)
            this.addError(
              path,
              "对象至少需要 " + schema.minProperties + " 个属性，当前有 " + keys.length + " 个"
            );
          if (schema.maxProperties !== undefined && keys.length > schema.maxProperties)
            this.addError(
              path,
              "对象最多只能有 " + schema.maxProperties + " 个属性，当前有 " + keys.length + " 个"
            );
          if (schema.properties) {
            Object.keys(schema.properties).forEach((key) => {
              if (key in data)
                this.validateNode(schema.properties[key], data[key], path + "/" + key);
            });
          }
          if (schema.additionalProperties === false) {
            const definedKeys = new Set(Object.keys(schema.properties || {}));
            keys.forEach((key) => {
              if (!definedKeys.has(key)) this.addError(path, "不允许额外属性: " + key);
            });
          }
        }
        getType(value) {
          if (value === null) return "null";
          if (Array.isArray(value)) return "array";
          if (typeof value === "number") return Number.isInteger(value) ? "integer" : "number";
          return typeof value;
        }
        addError(path, message) {
          this.errors.push({ path, message });
        }
      }
      const templates = {
        user: {
          schema: {
            $schema: "http://json-schema.org/draft-07/schema#",
            type: "object",
            properties: {
              id: { type: "integer", minimum: 1 },
              username: { type: "string", minLength: 3, maxLength: 20 },
              email: { type: "string", format: "email" },
              age: { type: "integer", minimum: 0, maximum: 150 },
              role: { type: "string", enum: ["admin", "user", "guest"] }
            },
            required: ["id", "username", "email"]
          },
          data: { id: 1, username: "john_doe", email: "john@example.com", age: 28, role: "user" }
        },
        product: {
          schema: {
            $schema: "http://json-schema.org/draft-07/schema#",
            type: "object",
            properties: {
              sku: { type: "string", pattern: "^[A-Z]{3}-\\d{4}$" },
              name: { type: "string", minLength: 1 },
              price: { type: "number", minimum: 0 },
              stock: { type: "integer", minimum: 0 },
              tags: { type: "array", items: { type: "string" }, uniqueItems: true }
            },
            required: ["sku", "name", "price"]
          },
          data: {
            sku: "ABC-1234",
            name: "智能手表",
            price: 299.99,
            stock: 100,
            tags: ["电子产品", "智能穿戴"]
          }
        },
        api: {
          schema: {
            $schema: "http://json-schema.org/draft-07/schema#",
            type: "object",
            properties: {
              code: { type: "integer" },
              message: { type: "string" },
              data: { type: ["object", "array", "null"] },
              timestamp: { type: "string", format: "date-time" },
              requestId: { type: "string", format: "uuid" }
            },
            required: ["code", "message"]
          },
          data: {
            code: 200,
            message: "success",
            data: { items: [] },
            timestamp: "2024-01-15T10:30:00Z",
            requestId: "550e8400-e29b-41d4-a716-446655440000"
          }
        },
        config: {
          schema: {
            $schema: "http://json-schema.org/draft-07/schema#",
            type: "object",
            properties: {
              server: {
                type: "object",
                properties: {
                  host: { type: "string" },
                  port: { type: "integer", minimum: 1, maximum: 65535 }
                },
                required: ["host", "port"]
              },
              database: {
                type: "object",
                properties: {
                  url: { type: "string", format: "uri" },
                  poolSize: { type: "integer", minimum: 1 }
                },
                required: ["url"]
              }
            },
            required: ["server"]
          },
          data: {
            server: { host: "localhost", port: 8080 },
            database: { url: "https://db.example.com", poolSize: 10 }
          }
        }
      };
      window.loadTemplate = function (name) {
        const t = templates[name];
        if (t) {
          document.getElementById("schemaInput").value = JSON.stringify(t.schema, null, 2);
          document.getElementById("dataInput").value = JSON.stringify(t.data, null, 2);
          updateStats();
        }
      };
      window.formatSchema = function () {
        try {
          const s = JSON.parse(document.getElementById("schemaInput").value);
          document.getElementById("schemaInput").value = JSON.stringify(s, null, 2);
        } catch (e) {
          alert("Schema JSON 格式错误: " + e.message);
        }
      };
      window.formatData = function () {
        try {
          const d = JSON.parse(document.getElementById("dataInput").value);
          document.getElementById("dataInput").value = JSON.stringify(d, null, 2);
        } catch (e) {
          alert("数据 JSON 格式错误: " + e.message);
        }
      };
      window.clearSchema = function () {
        document.getElementById("schemaInput").value = "";
        updateStats();
      };
      window.clearData = function () {
        document.getElementById("dataInput").value = "";
        updateStats();
      };
      window.validate = function () {
        const schemaInput = document.getElementById("schemaInput").value.trim();
        const dataInput = document.getElementById("dataInput").value.trim();
        const resultPanel = document.getElementById("result");
        if (!schemaInput || !dataInput) {
          resultPanel.style.display = "block";
          resultPanel.className = "result-panel invalid";
          resultPanel.textContent = "⚠️ 请输入 JSON Schema 和要验证的数据";
          return;
        }
        let schema, data;
        try {
          schema = JSON.parse(schemaInput);
        } catch (e) {
          resultPanel.style.display = "block";
          resultPanel.className = "result-panel invalid";
          resultPanel.textContent = "❌ Schema 解析错误: " + e.message;
          return;
        }
        try {
          data = JSON.parse(dataInput);
        } catch (e) {
          resultPanel.style.display = "block";
          resultPanel.className = "result-panel invalid";
          resultPanel.textContent = "❌ 数据解析错误: " + e.message;
          return;
        }
        const validator = new JSONSchemaValidator(schema);
        const result = validator.validate(data);
        resultPanel.style.display = "block";
        if (result.valid) {
          resultPanel.className = "result-panel valid";
          resultPanel.textContent = "✅ 验证通过 - 数据完全符合 Schema 定义";
        } else {
          resultPanel.className = "result-panel invalid";
          const errorDiv = document.createElement("div");
          const header = document.createElement("div");
          header.className = "result-header invalid";
          header.textContent = "❌ 验证失败 (" + result.errors.length + " 个错误)";
          errorDiv.appendChild(header);
          const list = document.createElement("ul");
          list.className = "error-list";
          result.errors.forEach((err) => {
            const li = document.createElement("li");
            li.className = "error-item";
            const pathDiv = document.createElement("div");
            pathDiv.className = "error-path";
            pathDiv.textContent = err.path;
            const msgDiv = document.createElement("div");
            msgDiv.className = "error-message";
            msgDiv.textContent = err.message;
            li.appendChild(pathDiv);
            li.appendChild(msgDiv);
            list.appendChild(li);
          });
          errorDiv.appendChild(list);
          resultPanel.textContent = "";
          resultPanel.appendChild(errorDiv);
        }
      };
      function updateStats() {
        try {
          const s = JSON.parse(document.getElementById("schemaInput").value);
          const propCount = s.properties ? Object.keys(s.properties).length : 0;
          const reqCount = s.required ? s.required.length : 0;
          document.getElementById("schemaStats").textContent =
            propCount + " 个属性, " + reqCount + " 个必需";
        } catch {
          document.getElementById("schemaStats").textContent = "";
        }
        try {
          const d = JSON.parse(document.getElementById("dataInput").value);
          const keyCount = typeof d === "object" && d !== null ? Object.keys(d).length : 0;
          document.getElementById("dataStats").textContent = keyCount + " 个字段";
        } catch {
          document.getElementById("dataStats").textContent = "";
        }
      }
      const themeToggle = document.getElementById("themeToggle");
      const html = document.documentElement;
      const savedTheme = localStorage.getItem("theme") || "light";
      html.setAttribute("data-theme", savedTheme);
      themeToggle.addEventListener("click", () => {
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      });
      document.getElementById("schemaInput").addEventListener("input", updateStats);
      document.getElementById("dataInput").addEventListener("input", updateStats);
      updateStats();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }
    
