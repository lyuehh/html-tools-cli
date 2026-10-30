// @ts-nocheck
// Generated from tools/dev/openapi-viewer.html
// Source SHA-256: 52407548f91432f9480b681b18fad5ab9d15a35eb279eef3c53d1766f2a1bebb
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      const petStoreExample = {
        openapi: "3.0.0",
        info: {
          title: "Petstore API",
          description: "一个宠物商店的示例API",
          version: "1.0.0"
        },
        servers: [{ url: "https://api.petstore.com/v1" }],
        paths: {
          "/pets": {
            get: {
              summary: "获取所有宠物",
              tags: ["pets"],
              parameters: [
                {
                  name: "limit",
                  in: "query",
                  schema: { type: "integer" },
                  description: "返回数量限制"
                },
                {
                  name: "status",
                  in: "query",
                  schema: { type: "string", enum: ["available", "sold"] },
                  description: "宠物状态"
                }
              ],
              responses: {
                200: { description: "成功返回宠物列表" }
              }
            },
            post: {
              summary: "创建新宠物",
              tags: ["pets"],
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        status: { type: "string" }
                      }
                    }
                  }
                }
              },
              responses: {
                201: { description: "创建成功" },
                400: { description: "参数错误" }
              }
            }
          },
          "/pets/{petId}": {
            get: {
              summary: "获取单个宠物",
              tags: ["pets"],
              parameters: [
                {
                  name: "petId",
                  in: "path",
                  required: true,
                  schema: { type: "string" },
                  description: "宠物ID"
                }
              ],
              responses: {
                200: { description: "成功" },
                404: { description: "宠物不存在" }
              }
            },
            put: {
              summary: "更新宠物",
              tags: ["pets"],
              parameters: [
                { name: "petId", in: "path", required: true, schema: { type: "string" } }
              ],
              responses: {
                200: { description: "更新成功" }
              }
            },
            delete: {
              summary: "删除宠物",
              tags: ["pets"],
              parameters: [
                { name: "petId", in: "path", required: true, schema: { type: "string" } }
              ],
              responses: {
                204: { description: "删除成功" }
              }
            }
          },
          "/stores": {
            get: {
              summary: "获取店铺列表",
              tags: ["stores"],
              responses: {
                200: { description: "成功" }
              }
            }
          }
        }
      };

      window.loadExample = function (name) {
        if (name === "petstore") {
          document.getElementById("specInput").value = JSON.stringify(petStoreExample, null, 2);
          parseSpec();
        }
      };

      window.loadFromUrl = async function () {
        const url = document.getElementById("urlInput").value.trim();
        if (!url) {
          alert("请输入URL");
          return;
        }
        try {
          const response = await fetch(url);
          const text = await response.text();
          document.getElementById("specInput").value = text;
          parseSpec();
        } catch (e) {
          alert("加载失败: " + e.message);
        }
      };

      function parseYAML(str) {
        // Simple YAML to JSON (basic support)
        try {
          return JSON.parse(str);
        } catch {
          // Very basic YAML parsing for common cases
          const lines = str.split("\n");
          const result = {};
          let current = result;
          let stack = [{ obj: result, indent: -1 }];

          for (let line of lines) {
            if (!line.trim() || line.trim().startsWith("#")) continue;
            const indent = line.search(/\S/);
            const content = line.trim();

            while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
              stack.pop();
            }
            current = stack[stack.length - 1].obj;

            if (content.includes(":")) {
              const [key, ...valueParts] = content.split(":");
              const value = valueParts.join(":").trim();
              if (value) {
                current[key.trim()] = value.replace(/^["']|["']$/g, "");
              } else {
                current[key.trim()] = {};
                stack.push({ obj: current[key.trim()], indent });
              }
            }
          }
          return result;
        }
      }

      function parseSpec() {
        const input = document.getElementById("specInput").value.trim();
        if (!input) {
          alert("请输入OpenAPI文档");
          return;
        }

        let spec;
        try {
          spec = parseYAML(input);
        } catch (e) {
          alert("解析失败: " + e.message);
          return;
        }

        renderSpec(spec);
      }

      function renderSpec(spec) {
        document.getElementById("emptyState").style.display = "none";
        document.getElementById("apiDoc").style.display = "block";

        // Render info
        const info = spec.info || {};
        const servers =
          spec.servers || spec.host
            ? [{ url: (spec.schemes?.[0] || "https") + "://" + spec.host + (spec.basePath || "") }]
            : [];

        document.getElementById("apiInfo").innerHTML = `
                <h2 class="api-title">${info.title || "API文档"}</h2>
                <span class="api-version">v${info.version || "1.0"}</span>
                ${info.description ? `<p class="api-description">${info.description}</p>` : ""}
                ${
                  servers.length
                    ? `
                    <div class="servers">
                        <div class="servers-title">服务器</div>
                        ${servers.map((s) => `<div class="server-url">${s.url}</div>`).join("")}
                    </div>
                `
                    : ""
                }
            `;

        // Group endpoints by tags
        const paths = spec.paths || {};
        const grouped = {};

        for (const [path, methods] of Object.entries(paths)) {
          for (const [method, operation] of Object.entries(methods)) {
            if (["get", "post", "put", "patch", "delete"].includes(method)) {
              const tags = operation.tags || ["default"];
              for (const tag of tags) {
                if (!grouped[tag]) grouped[tag] = [];
                grouped[tag].push({ path, method, operation });
              }
            }
          }
        }

        // Render endpoints
        let endpointsHtml = "";
        for (const [tag, endpoints] of Object.entries(grouped)) {
          endpointsHtml += `
                    <div class="tag-group">
                        <div class="tag-header" onclick="this.nextElementSibling.classList.toggle('collapsed')">
                            <span>${tag}</span>
                            <span>${endpoints.length} 个接口</span>
                        </div>
                        <div class="tag-endpoints">
                            ${endpoints.map((ep, i) => renderEndpoint(ep, tag + "-" + i)).join("")}
                        </div>
                    </div>
                `;
        }

        document.getElementById("endpoints").innerHTML = endpointsHtml;
      }

      function renderEndpoint({ path, method, operation }, id) {
        const params = operation.parameters || [];
        const responses = operation.responses || {};
        const requestBody = operation.requestBody;

        return `
                <div class="endpoint">
                    <div class="endpoint-header" onclick="toggleEndpoint('${id}')">
                        <span class="method method-${method}">${method.toUpperCase()}</span>
                        <span class="endpoint-path">${path}</span>
                        <span class="endpoint-summary">${operation.summary || ""}</span>
                    </div>
                    <div class="endpoint-details" id="details-${id}">
                        ${operation.description ? `<p style="margin-bottom: 1rem; color: var(--color-text-secondary);">${operation.description}</p>` : ""}
                        
                        ${
                          params.length
                            ? `
                            <div class="detail-section">
                                <div class="detail-title">参数</div>
                                <table class="param-table">
                                    <tr>
                                        <th>名称</th>
                                        <th>位置</th>
                                        <th>类型</th>
                                        <th>描述</th>
                                    </tr>
                                    ${params
                                      .map(
                                        (p) => `
                                        <tr>
                                            <td>
                                                <span class="param-name">${p.name}</span>
                                                ${p.required ? '<span class="param-required">*必填</span>' : ""}
                                            </td>
                                            <td>${p.in}</td>
                                            <td><span class="param-type">${p.schema?.type || p.type || "any"}</span></td>
                                            <td>${p.description || "-"}</td>
                                        </tr>
                                    `
                                      )
                                      .join("")}
                                </table>
                            </div>
                        `
                            : ""
                        }
                        
                        ${
                          requestBody
                            ? `
                            <div class="detail-section">
                                <div class="detail-title">请求体</div>
                                <div class="schema-block">${JSON.stringify(requestBody, null, 2)}</div>
                            </div>
                        `
                            : ""
                        }
                        
                        <div class="detail-section">
                            <div class="detail-title">响应</div>
                            ${Object.entries(responses)
                              .map(
                                ([code, resp]) => `
                                <div style="margin-bottom: 0.5rem;">
                                    <span class="response-code response-${code.startsWith("2") ? "2xx" : code.startsWith("4") ? "4xx" : "5xx"}">${code}</span>
                                    ${resp.description || ""}
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
            `;
      }

      window.toggleEndpoint = function (id) {
        document.getElementById("details-" + id).classList.toggle("expanded");
      };

      window.clearAll = function () {
        document.getElementById("specInput").value = "";
        document.getElementById("urlInput").value = "";
        document.getElementById("apiDoc").style.display = "none";
        document.getElementById("emptyState").style.display = "block";
      };
    
