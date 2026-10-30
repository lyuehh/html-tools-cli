// @ts-nocheck
// Generated from tools/network/http-client.html
// Source SHA-256: f0631704980e533bfb14ba05e3b192808dc81884408c4e57a8154290bd12044a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      class HTTPClient {
        constructor() {
          this.history = JSON.parse(localStorage.getItem("httpClientHistory") || "[]");
          this.bodyType = "json";
          this.init();
        }

        init() {
          this.methodSelect = document.getElementById("methodSelect");
          this.urlInput = document.getElementById("urlInput");
          this.sendBtn = document.getElementById("sendBtn");
          this.bodyTextarea = document.getElementById("bodyTextarea");
          this.responseContainer = document.getElementById("responseContainer");
          this.responseHeadersContainer = document.getElementById("responseHeadersContainer");
          this.historyPanel = document.getElementById("historyPanel");
          this.historyList = document.getElementById("historyList");

          this.bindEvents();
          this.renderHistory();
          this.loadFromHash();
        }

        bindEvents() {
          // Send request
          this.sendBtn.addEventListener("click", () => this.sendRequest());
          this.urlInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") this.sendRequest();
          });

          // Tabs
          document.querySelectorAll(".tabs").forEach((tabsContainer) => {
            tabsContainer.querySelectorAll(".tab").forEach((tab) => {
              tab.addEventListener("click", () => {
                const panel = tabsContainer.closest(".panel");
                panel.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
                tab.classList.add("active");

                const tabId = tab.dataset.tab;
                panel.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
                panel.querySelector(`#tab-${tabId}`)?.classList.add("active");
              });
            });
          });

          // Body type selector
          document.querySelectorAll(".body-type-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
              document
                .querySelectorAll(".body-type-btn")
                .forEach((b) => b.classList.remove("active"));
              btn.classList.add("active");
              this.bodyType = btn.dataset.type;
              this.updateContentType();
            });
          });

          // Method color
          this.methodSelect.addEventListener("change", () => this.updateMethodColor());
          this.updateMethodColor();
        }

        updateMethodColor() {
          const method = this.methodSelect.value;
          const colors = {
            GET: "var(--accent-green)",
            POST: "var(--accent-blue)",
            PUT: "var(--accent-yellow)",
            PATCH: "var(--color-accent-purple)",
            DELETE: "var(--accent-red)",
            HEAD: "var(--color-accent-cyan)",
            OPTIONS: "var(--color-text-secondary)"
          };
          this.methodSelect.style.color = colors[method] || "var(--color-text-primary)";
        }

        updateContentType() {
          const typeMap = {
            json: "application/json",
            text: "text/plain",
            xml: "application/xml",
            form: "application/x-www-form-urlencoded"
          };
          const headerRows = document.querySelectorAll("#headersList .kv-row");
          headerRows.forEach((row) => {
            const keyInput = row.querySelector(".header-key");
            if (keyInput.value.toLowerCase() === "content-type") {
              row.querySelector(".header-value").value = typeMap[this.bodyType];
            }
          });
        }

        addParamRow() {
          const list = document.getElementById("paramsList");
          const row = document.createElement("div");
          row.className = "kv-row";
          row.innerHTML = `
          <input type="text" placeholder="参数名" class="param-key">
          <input type="text" placeholder="参数值" class="param-value">
          <button class="remove-btn" onclick="client.removeRow(this)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        `;
          list.appendChild(row);
        }

        addHeaderRow() {
          const list = document.getElementById("headersList");
          const row = document.createElement("div");
          row.className = "kv-row";
          row.innerHTML = `
          <input type="text" placeholder="Header名" class="header-key">
          <input type="text" placeholder="Header值" class="header-value">
          <button class="remove-btn" onclick="client.removeRow(this)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        `;
          list.appendChild(row);
        }

        removeRow(btn) {
          btn.closest(".kv-row").remove();
        }

        getParams() {
          const params = {};
          document.querySelectorAll("#paramsList .kv-row").forEach((row) => {
            const key = row.querySelector(".param-key").value.trim();
            const value = row.querySelector(".param-value").value;
            if (key) params[key] = value;
          });
          return params;
        }

        getHeaders() {
          const headers = {};
          document.querySelectorAll("#headersList .kv-row").forEach((row) => {
            const key = row.querySelector(".header-key").value.trim();
            const value = row.querySelector(".header-value").value;
            if (key) headers[key] = value;
          });
          return headers;
        }

        async sendRequest() {
          let url = this.urlInput.value.trim();
          if (!url) {
            this.showError("请输入URL");
            return;
          }

          // Add protocol if missing
          if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
          }

          const method = this.methodSelect.value;
          const params = this.getParams();
          const headers = this.getHeaders();
          const body = this.bodyTextarea.value;

          // Build URL with params
          const urlObj = new URL(url);
          Object.entries(params).forEach(([key, value]) => {
            if (key) urlObj.searchParams.append(key, value);
          });

          this.sendBtn.classList.add("loading");
          this.sendBtn.disabled = true;

          const startTime = performance.now();

          try {
            const fetchOptions = {
              method,
              headers,
              mode: "cors"
            };

            if (["POST", "PUT", "PATCH"].includes(method) && body) {
              fetchOptions.body = body;
            }

            const response = await fetch(urlObj.toString(), fetchOptions);
            const endTime = performance.now();
            const duration = Math.round(endTime - startTime);

            // Get response headers
            const responseHeaders = {};
            response.headers.forEach((value, key) => {
              responseHeaders[key] = value;
            });

            // Get response body
            const contentType = response.headers.get("content-type") || "";
            let responseBody;
            if (contentType.includes("application/json")) {
              responseBody = await response.json();
            } else {
              responseBody = await response.text();
            }

            this.displayResponse({
              status: response.status,
              statusText: response.statusText,
              headers: responseHeaders,
              body: responseBody,
              duration,
              size: JSON.stringify(responseBody).length
            });

            // Save to history
            this.addToHistory({
              method,
              url: urlObj.toString(),
              timestamp: Date.now()
            });
          } catch (error) {
            this.showError(error.message, "CORS或网络错误，请确保目标服务器允许跨域请求");
          } finally {
            this.sendBtn.classList.remove("loading");
            this.sendBtn.disabled = false;
          }
        }

        displayResponse(res) {
          // Status badge class
          let statusClass = "success";
          if (res.status >= 300 && res.status < 400) statusClass = "redirect";
          else if (res.status >= 400 && res.status < 500) statusClass = "client-error";
          else if (res.status >= 500) statusClass = "server-error";

          // Format body
          let bodyHtml;
          if (typeof res.body === "object") {
            bodyHtml = this.syntaxHighlight(JSON.stringify(res.body, null, 2));
          } else {
            bodyHtml = this.escapeHtml(res.body);
          }

          this.responseContainer.innerHTML = `
          <div class="response-meta">
            <span class="response-badge status ${statusClass}">${res.status} ${res.statusText}</span>
            <span class="response-badge">⏱️ ${res.duration}ms</span>
            <span class="response-badge">📦 ${this.formatSize(res.size)}</span>
          </div>
          <div class="response-body json">${bodyHtml}</div>
        `;

          // Headers
          const headersHtml = Object.entries(res.headers)
            .map(
              ([key, value]) =>
                `<div><span class="header-name">${this.escapeHtml(key)}:</span> <span class="header-value">${this.escapeHtml(value)}</span></div>`
            )
            .join("");

          this.responseHeadersContainer.innerHTML = `
          <div class="response-headers">${headersHtml || '<span style="color:var(--text-muted)">无响应头</span>'}</div>
        `;
        }

        showError(message, details = "") {
          this.responseContainer.innerHTML = `
          <div class="error-state">
            <div class="icon">❌</div>
            <div class="message">${message}</div>
            ${details ? `<div class="details">${details}</div>` : ""}
          </div>
        `;
        }

        syntaxHighlight(json) {
          json = this.escapeHtml(json);
          return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            (match) => {
              let cls = "json-number";
              if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                  cls = "json-key";
                } else {
                  cls = "json-string";
                }
              } else if (/true|false/.test(match)) {
                cls = "json-boolean";
              } else if (/null/.test(match)) {
                cls = "json-null";
              }
              return `<span class="${cls}">${match}</span>`;
            }
          );
        }

        escapeHtml(str) {
          const div = document.createElement("div");
          div.textContent = str;
          return div.innerHTML;
        }

        formatSize(bytes) {
          if (bytes < 1024) return bytes + " B";
          if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
          return (bytes / 1024 / 1024).toFixed(2) + " MB";
        }

        addToHistory(item) {
          this.history.unshift(item);
          if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
          }
          localStorage.setItem("httpClientHistory", JSON.stringify(this.history));
          this.renderHistory();
        }

        renderHistory() {
          if (!this.historyList) return;
          if (this.history.length === 0) {
            this.historyList.innerHTML = `
            <div class="empty-state" style="padding: 40px 20px;">
              <div class="icon">📜</div>
              <p>暂无请求历史</p>
            </div>
          `;
            return;
          }

          this.historyList.innerHTML = this.history
            .map(
              (item, index) => `
          <div class="history-item" onclick="client.loadFromHistory(${index})">
            <span class="history-method ${this.escapeHtml(item.method)}">${this.escapeHtml(item.method)}</span>
            <span class="history-url" title="${this.escapeHtml(item.url)}">${this.escapeHtml(item.url)}</span>
          </div>
        `
            )
            .join("");
        }

        loadFromHistory(index) {
          const item = this.history[index];
          if (!item) return;

          const urlObj = new URL(item.url);
          this.methodSelect.value = item.method;
          this.urlInput.value = urlObj.origin + urlObj.pathname;
          this.updateMethodColor();

          // Load params
          const paramsList = document.getElementById("paramsList");
          paramsList.innerHTML = "";
          urlObj.searchParams.forEach((value, key) => {
            this.addParamRow();
            const lastRow = paramsList.lastElementChild;
            lastRow.querySelector(".param-key").value = key;
            lastRow.querySelector(".param-value").value = value;
          });
          if (paramsList.children.length === 0) {
            this.addParamRow();
          }

          this.toggleHistory();
        }

        toggleHistory() {
          this.historyPanel.classList.toggle("open");
        }

        loadFromHash() {
          try {
            const hash = window.location.hash.slice(1);
            if (hash) {
              const data = JSON.parse(decodeURIComponent(hash));
              if (data.url) {
                this.urlInput.value = data.url;
                this.methodSelect.value = data.method || "GET";
                this.updateMethodColor();
              }
            }
          } catch (e) {
            // Ignore hash parse errors
          }
        }
      }

      const client = new HTTPClient();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
