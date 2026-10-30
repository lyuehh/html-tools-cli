// @ts-nocheck
// Generated from tools/dev/api-mock.html
// Source SHA-256: a670b003f857689f8246341ca08e808b886cc70b5e8f0861d43239a9e4d825ef
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let mocks = [];

      const templates = {
        user: {
          id: 1,
          name: "张三",
          email: "zhangsan@example.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
          role: "user",
          createdAt: "{{date}}"
        },
        list: {
          data: [
            { id: 1, name: "项目A", status: "active" },
            { id: 2, name: "项目B", status: "pending" },
            { id: 3, name: "项目C", status: "completed" }
          ],
          total: 3
        },
        pagination: {
          data: [],
          pagination: {
            page: 1,
            pageSize: 10,
            total: 100,
            totalPages: 10
          }
        },
        error: {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "请求参数错误",
            details: []
          }
        },
        success: {
          success: true,
          message: "操作成功",
          data: null
        }
      };

      window.switchTab = function (tab) {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document.querySelector(`[data-tab="${tab}"]`).classList.add("active");
        document.getElementById("bodyTab").style.display = tab === "body" ? "block" : "none";
        document.getElementById("headersTab").style.display = tab === "headers" ? "block" : "none";
      };

      window.useTemplate = function (name) {
        const template = templates[name];
        document.getElementById("responseBody").value = JSON.stringify(template, null, 2);
      };

      window.formatJson = function () {
        try {
          const body = document.getElementById("responseBody").value;
          const parsed = JSON.parse(body);
          document.getElementById("responseBody").value = JSON.stringify(parsed, null, 2);
        } catch (e) {
          alert("JSON格式错误: " + e.message);
        }
      };

      window.addMock = function () {
        const method = document.getElementById("method").value;
        const path = document.getElementById("path").value.trim();
        const status = parseInt(document.getElementById("status").value) || 200;
        const body = document.getElementById("responseBody").value;
        const headers = document.getElementById("responseHeaders").value;

        if (!path) {
          alert("请输入接口路径");
          return;
        }

        try {
          JSON.parse(body);
        } catch (e) {
          alert("响应体不是有效的JSON: " + e.message);
          return;
        }

        mocks.push({ method, path, status, body, headers, id: Date.now() });
        renderMockList();
        showToast("Mock接口已添加");
      };

      function renderMockList() {
        const list = document.getElementById("mockList");

        if (mocks.length === 0) {
          list.innerHTML =
            '<p style="color: var(--color-text-secondary); text-align: center; padding: 2rem;">暂无Mock接口，请添加</p>';
          return;
        }

        list.innerHTML = mocks
          .map(
            (mock) => `
                <div class="mock-item">
                    <span class="method method-${mock.method}">${mock.method}</span>
                    <span class="path">${mock.path}</span>
                    <span class="status">${mock.status}</span>
                    <button class="btn btn-secondary" style="padding: 0.25rem 0.5rem;" onclick="editMock(${mock.id})">编辑</button>
                    <button class="btn btn-danger" style="padding: 0.25rem 0.5rem;" onclick="deleteMock(${mock.id})">删除</button>
                </div>
            `
          )
          .join("");
      }

      window.editMock = function (id) {
        const mock = mocks.find((m) => m.id === id);
        if (!mock) return;

        document.getElementById("method").value = mock.method;
        document.getElementById("path").value = mock.path;
        document.getElementById("status").value = mock.status;
        document.getElementById("responseBody").value = mock.body;
        document.getElementById("responseHeaders").value = mock.headers;

        deleteMock(id);
      };

      function deleteMock(id) {
        mocks = mocks.filter((m) => m.id !== id);
        renderMockList();
      }

      window.exportConfig = function (format) {
        if (mocks.length === 0) {
          alert("没有可导出的Mock接口");
          return;
        }

        let content, filename;

        if (format === "json") {
          content = JSON.stringify(mocks, null, 2);
          filename = "mock-config.json";
        } else if (format === "postman") {
          const collection = {
            info: {
              name: "Mock API Collection",
              schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
            },
            item: mocks.map((mock) => ({
              name: `${mock.method} ${mock.path}`,
              request: {
                method: mock.method,
                url: { raw: "{{baseUrl}}" + mock.path },
                header: []
              },
              response: [
                {
                  name: "Mock Response",
                  status: mock.status === 200 ? "OK" : "Error",
                  code: mock.status,
                  body: mock.body
                }
              ]
            }))
          };
          content = JSON.stringify(collection, null, 2);
          filename = "postman-collection.json";
        }

        const blob = new Blob([content], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      };

      window.importConfig = function () {
        document.getElementById("importFile").click();
      };

      window.handleImport = function (file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const imported = JSON.parse(e.target.result);
            if (Array.isArray(imported)) {
              mocks = [
                ...mocks,
                ...imported.map((m) => ({ ...m, id: Date.now() + Math.random() }))
              ];
              renderMockList();
              showToast("导入成功");
            } else {
              alert("无效的配置文件格式");
            }
          } catch (e) {
            alert("解析文件失败: " + e.message);
          }
        };
        reader.readAsText(file);
      };

      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
