// @ts-nocheck
// Generated from tools/dev/json-schema-generator.html
// Source SHA-256: 3450d0749e3c5cfb29330641141fb68258df57e88e597788e0cea7989f45c977
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme management
      function initTheme() {
        var savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        updateThemeIcon(savedTheme);
      }

      window.toggleTheme = function () {
        var currentTheme = document.documentElement.getAttribute("data-theme");
        var newTheme = currentTheme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
      };

      function updateThemeIcon(theme) {
        document.getElementById("theme-icon").textContent =
          theme === "light" ? "\u{1F319}" : "\u2600";
      }

      window.loadExample = function (type) {
        var examples = {
          user: {
            id: 1,
            name: "张三",
            email: "zhangsan@example.com",
            age: 28,
            active: true,
            roles: ["admin", "user"],
            profile: {
              avatar: "https://example.com/avatar.jpg",
              bio: "软件工程师"
            },
            createdAt: "2024-01-15T10:30:00Z"
          },
          product: {
            productId: "P001",
            name: "智能手机",
            price: 2999.0,
            stock: 100,
            category: "电子产品",
            tags: ["手机", "智能", "热销"],
            specs: {
              screen: "6.5英寸",
              memory: "8GB",
              storage: "128GB"
            },
            inStock: true
          },
          order: {
            orderId: "ORD20240115001",
            userId: 1001,
            items: [
              {
                productId: "P001",
                quantity: 2,
                price: 2999.0
              }
            ],
            total: 5998.0,
            status: "pending",
            shippingAddress: {
              province: "广东省",
              city: "深圳市",
              detail: "南山区科技园"
            },
            createdAt: "2024-01-15T10:30:00Z"
          },
          api: {
            code: 200,
            message: "success",
            data: {
              list: [
                { id: 1, title: "文章1" },
                { id: 2, title: "文章2" }
              ],
              pagination: {
                page: 1,
                pageSize: 10,
                total: 100
              }
            },
            timestamp: 1705304400000
          }
        };

        if (examples[type]) {
          document.getElementById("json-input").value = JSON.stringify(examples[type], null, 2);
          generateSchema();
        }
      };

      window.formatJson = function () {
        var input = document.getElementById("json-input");
        var errorDiv = document.getElementById("input-error");

        try {
          var json = JSON.parse(input.value);
          input.value = JSON.stringify(json, null, 2);
          errorDiv.textContent = "";
        } catch (e) {
          errorDiv.innerHTML = '<div class="error-message">JSON 格式错误: ' + e.message + "</div>";
        }
      };

      window.clearInput = function () {
        document.getElementById("json-input").value = "";
        document.getElementById("schema-output").value = "";
        document.getElementById("input-error").textContent = "";
        document.getElementById("field-count").textContent = "0";
        document.getElementById("depth-count").textContent = "0";
      };

      window.generateSchema = function () {
        var input = document.getElementById("json-input").value;
        var output = document.getElementById("schema-output");
        var errorDiv = document.getElementById("input-error");

        if (!input.trim()) {
          output.value = "";
          errorDiv.textContent = "";
          return;
        }

        try {
          var json = JSON.parse(input);
          errorDiv.textContent = "";

          var options = {
            required: document.getElementById("opt-required").checked,
            additionalProperties: document.getElementById("opt-additional").checked,
            examples: document.getElementById("opt-examples").checked,
            description: document.getElementById("opt-description").checked,
            nullable: document.getElementById("opt-nullable").checked,
            minmax: document.getElementById("opt-minmax").checked
          };

          var stats = { fieldCount: 0, maxDepth: 0 };
          var schema = jsonToSchema(json, options, 0, stats);

          // Add schema metadata
          schema["$schema"] = "https://json-schema.org/draft/2020-12/schema";
          schema["$id"] = "https://example.com/schema.json";

          output.value = JSON.stringify(schema, null, 2);

          document.getElementById("field-count").textContent = stats.fieldCount;
          document.getElementById("depth-count").textContent = stats.maxDepth;
        } catch (e) {
          errorDiv.innerHTML = '<div class="error-message">JSON 格式错误: ' + e.message + "</div>";
          output.value = "";
        }
      };

      function jsonToSchema(value, options, depth, stats) {
        stats.maxDepth = Math.max(stats.maxDepth, depth);

        var type = getType(value);
        var schema = {};

        if (type === "null") {
          schema.type = "null";
        } else if (type === "boolean") {
          schema.type = "boolean";
          if (options.examples) schema.examples = [value];
        } else if (type === "integer") {
          schema.type = "integer";
          if (options.examples) schema.examples = [value];
          if (options.minmax) {
            schema.minimum = 0;
          }
        } else if (type === "number") {
          schema.type = "number";
          if (options.examples) schema.examples = [value];
        } else if (type === "string") {
          schema.type = "string";
          if (options.examples) schema.examples = [value];

          // Detect string formats
          if (isDateTimeString(value)) {
            schema.format = "date-time";
          } else if (isDateString(value)) {
            schema.format = "date";
          } else if (isEmailString(value)) {
            schema.format = "email";
          } else if (isUriString(value)) {
            schema.format = "uri";
          }
        } else if (type === "array") {
          schema.type = "array";
          if (value.length > 0) {
            // Analyze array items
            var itemSchemas = value.map(function (item) {
              return jsonToSchema(item, options, depth + 1, stats);
            });

            // Check if all items have the same schema
            if (areSchemasSimilar(itemSchemas)) {
              schema.items = itemSchemas[0];
            } else {
              schema.items = { anyOf: uniqueSchemas(itemSchemas) };
            }
          } else {
            schema.items = {};
          }
          if (options.examples && value.length > 0) {
            schema.examples = [value];
          }
        } else if (type === "object") {
          schema.type = "object";
          schema.properties = {};

          var keys = Object.keys(value);
          stats.fieldCount += keys.length;

          keys.forEach(function (key) {
            schema.properties[key] = jsonToSchema(value[key], options, depth + 1, stats);
            if (options.description) {
              schema.properties[key].description = key + " 字段";
            }
          });

          if (options.required && keys.length > 0) {
            schema.required = keys;
          }

          if (!options.additionalProperties) {
            schema.additionalProperties = false;
          }
        }

        if (options.nullable && type !== "null") {
          if (Array.isArray(schema.type)) {
            schema.type.push("null");
          } else {
            schema.type = [schema.type, "null"];
          }
        }

        return schema;
      }

      function getType(value) {
        if (value === null) return "null";
        if (Array.isArray(value)) return "array";
        if (typeof value === "boolean") return "boolean";
        if (typeof value === "number") {
          return Number.isInteger(value) ? "integer" : "number";
        }
        if (typeof value === "string") return "string";
        if (typeof value === "object") return "object";
        return "unknown";
      }

      function isDateTimeString(str) {
        return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str);
      }

      function isDateString(str) {
        return /^\d{4}-\d{2}-\d{2}$/.test(str);
      }

      function isEmailString(str) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
      }

      function isUriString(str) {
        return /^https?:\/\//.test(str);
      }

      function areSchemasSimilar(schemas) {
        if (schemas.length <= 1) return true;
        var first = JSON.stringify(schemas[0]);
        return schemas.every(function (s) {
          return JSON.stringify(s) === first;
        });
      }

      function uniqueSchemas(schemas) {
        var seen = {};
        return schemas.filter(function (s) {
          var key = JSON.stringify(s);
          if (seen[key]) return false;
          seen[key] = true;
          return true;
        });
      }

      window.copySchema = function () {
        var output = document.getElementById("schema-output");

        navigator.clipboard.writeText(output.value).then(function () {
          var btn = document.querySelector(".copy-btn");
          btn.textContent = "已复制!";
          btn.classList.add("copied");
          setTimeout(function () {
            btn.textContent = "复制";
            btn.classList.remove("copied");
          }, 2000);
        });
      };

      window.downloadSchema = function () {
        var output = document.getElementById("schema-output").value;
        if (!output) return;

        var blob = new Blob([output], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "schema.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };

      // Initialize
      initTheme();
      generateSchema();
    
