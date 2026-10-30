// @ts-nocheck
// Generated from tools/generator/mock-data.html
// Source SHA-256: de88f85c894711a45c8922ca434a97d0be9bed7ab11bcfda4019510b56b14580
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const dataTypeEl = document.getElementById("dataType");
      const countEl = document.getElementById("count");
      const formatEl = document.getElementById("format");
      const customFieldsEl = document.getElementById("customFields");
      const fieldListEl = document.getElementById("fieldList");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");

      const mockGenerators = {
        uuid: function () {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          });
        },
        number: function () {
          return Math.floor(Math.random() * 1000) + 1;
        },
        name: function () {
          const firstNames = ["张", "李", "王", "刘", "陈", "杨", "赵", "黄", "周", "吴"];
          const lastNames = ["伟", "芳", "娜", "秀英", "敏", "静", "磊", "强", "军", "洋"];
          return (
            firstNames[Math.floor(Math.random() * firstNames.length)] +
            lastNames[Math.floor(Math.random() * lastNames.length)]
          );
        },
        email: function () {
          const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "example.com"];
          const name = Math.random().toString(36).substring(2, 8);
          const domain = domains[Math.floor(Math.random() * domains.length)];
          return name + "@" + domain;
        },
        date: function () {
          const start = new Date(2020, 0, 1);
          const end = new Date();
          const date = new Date(
            start.getTime() + Math.random() * (end.getTime() - start.getTime())
          );
          return date.toISOString().split("T")[0];
        },
        boolean: function () {
          return Math.random() > 0.5;
        },
        text: function () {
          const words = [
            "这是",
            "一段",
            "随机",
            "文本",
            "内容",
            "用于",
            "测试",
            "数据",
            "生成",
            "功能"
          ];
          const length = Math.floor(Math.random() * 5) + 3;
          let result = "";
          for (let i = 0; i < length; i++) {
            result += words[Math.floor(Math.random() * words.length)];
            if (i < length - 1) result += " ";
          }
          return result;
        }
      };

      const predefinedSchemas = {
        users: [
          { name: "id", type: "uuid" },
          { name: "name", type: "name" },
          { name: "email", type: "email" },
          { name: "age", type: "number" },
          { name: "active", type: "boolean" },
          { name: "createdAt", type: "date" }
        ],
        products: [
          { name: "id", type: "uuid" },
          { name: "name", type: "text" },
          { name: "price", type: "number" },
          { name: "category", type: "text" },
          { name: "inStock", type: "boolean" },
          { name: "rating", type: "number" }
        ],
        orders: [
          { name: "id", type: "uuid" },
          { name: "userId", type: "uuid" },
          { name: "productId", type: "uuid" },
          { name: "quantity", type: "number" },
          { name: "total", type: "number" },
          { name: "status", type: "text" },
          { name: "orderDate", type: "date" }
        ]
      };

      function generateData() {
        const dataType = dataTypeEl.value;
        const count = parseInt(countEl.value) || 10;
        const format = formatEl.value;
        let schema;

        if (dataType === "custom") {
          schema = [];
          fieldListEl.querySelectorAll(".field-item").forEach(function (item) {
            const nameInput = item.querySelector('input[type="text"]');
            const typeSelect = item.querySelector("select");
            if (nameInput && nameInput.value && typeSelect && typeSelect.value) {
              schema.push({
                name: nameInput.value,
                type: typeSelect.value
              });
            }
          });
        } else {
          schema = predefinedSchemas[dataType] || predefinedSchemas.users;
        }

        if (schema.length === 0) {
          showStatus("请至少定义一个字段", "error");
          return;
        }

        const data = [];
        for (let i = 0; i < count; i++) {
          const item = {};
          schema.forEach(function (field) {
            if (mockGenerators[field.type]) {
              item[field.name] = mockGenerators[field.type]();
            } else {
              item[field.name] = "";
            }
          });
          data.push(item);
        }

        let output;
        if (format === "json") {
          output = JSON.stringify(data, null, 2);
        } else {
          // CSV format
          const headers = schema.map((f) => f.name);
          const rows = data.map((item) => headers.map((h) => item[h]).join(","));
          output = headers.join(",") + "\n" + rows.join("\n");
        }

        outputEl.value = output;
        showStatus("已生成 " + count + " 条数据", "success");
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function updateFieldVisibility() {
        customFieldsEl.style.display = dataTypeEl.value === "custom" ? "block" : "none";
      }

      dataTypeEl.addEventListener("change", updateFieldVisibility);

      document.getElementById("btnAddField").onclick = function () {
        const fieldItem = document.createElement("div");
        fieldItem.className = "field-item";
        fieldItem.innerHTML =
          '<input type="text" placeholder="字段名" value="field' +
          (fieldListEl.children.length + 1) +
          '" aria-label="文本输入框">' +
          "<select>" +
          '  <option value="uuid">UUID</option>' +
          '  <option value="number">数字</option>' +
          '  <option value="name">姓名</option>' +
          '  <option value="email">邮箱</option>' +
          '  <option value="date">日期</option>' +
          '  <option value="boolean">布尔值</option>' +
          '  <option value="text" selected>文本</option>' +
          "</select>" +
          '<button class="remove-btn">×</button>';
        fieldListEl.appendChild(fieldItem);

        fieldItem.querySelector(".remove-btn").addEventListener("click", function () {
          if (fieldListEl.children.length > 1) {
            fieldItem.remove();
          }
        });
      };

      document.querySelectorAll(".remove-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (fieldListEl.children.length > 1) {
            btn.closest(".field-item").remove();
          }
        });
      });

      document.getElementById("btnGenerate").onclick = generateData;

      document.getElementById("btnCopy").onclick = async function () {
        if (!outputEl.value) {
          showStatus("没有内容", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(outputEl.value);
          showStatus("已复制", "success");
        } catch (e) {
          showStatus("复制失败");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        outputEl.value = "";
        statusEl.textContent = "";
      };

      // Initial generation
      updateFieldVisibility();
      generateData();

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
    
