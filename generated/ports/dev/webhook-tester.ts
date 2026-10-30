// @ts-nocheck
// Generated from tools/dev/webhook-tester.html
// Source SHA-256: 6a482d43cdb26a991ecd824d99a6f09235ae46f3729986138d144e2cc73576e1
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      let currentMethod = "GET";
      let history = JSON.parse(localStorage.getItem("webhook_history") || "[]");

      window.setMethod = function (method) {
        currentMethod = method;
        document.querySelectorAll(".method-btn").forEach((btn) => btn.classList.remove("active"));
        document.querySelector(`.method-${method.toLowerCase()}`).classList.add("active");

        // Show/hide body for GET
        document.getElementById("bodyGroup").style.display = method === "GET" ? "none" : "block";
      };

      function addHeader() {
        const list = document.getElementById("headersList");
        const row = document.createElement("div");
        row.className = "header-row";
        row.innerHTML = `
                <input type="text" placeholder="Header名称">
                <input type="text" placeholder="Header值">
                <button class="remove-btn" onclick="removeHeader(this)">✕</button>
            `;
        list.appendChild(row);
      }

      window.removeHeader = function (btn) {
        btn.parentElement.remove();
      };

      function getHeaders() {
        const headers = {};
        document.querySelectorAll(".header-row").forEach((row) => {
          const inputs = row.querySelectorAll("input");
          const name = inputs[0].value.trim();
          const value = inputs[1].value.trim();
          if (name) headers[name] = value;
        });
        return headers;
      }

      window.sendRequest = async function () {
        const url = document.getElementById("urlInput").value.trim();
        if (!url) {
          alert("请输入URL");
          return;
        }

        const sendBtn = document.getElementById("sendBtn");
        const sendText = document.getElementById("sendText");
        const sendLoading = document.getElementById("sendLoading");

        sendBtn.disabled = true;
        sendText.style.display = "none";
        sendLoading.style.display = "inline-block";

        const headers = getHeaders();
        const body =
          currentMethod !== "GET" ? document.getElementById("bodyInput").value : undefined;

        const startTime = performance.now();

        try {
          const response = await fetch(url, {
            method: currentMethod,
            headers,
            body
          });

          const endTime = performance.now();
          const responseTime = Math.round(endTime - startTime);

          // Get response text
          const responseText = await response.text();
          const responseSize = new Blob([responseText]).size;

          // Try to parse as JSON
          let formattedBody;
          try {
            const json = JSON.parse(responseText);
            formattedBody = JSON.stringify(json, null, 2);
          } catch {
            formattedBody = responseText;
          }

          // Get response headers
          const responseHeaders = {};
          response.headers.forEach((value, name) => {
            responseHeaders[name] = value;
          });

          // Display response
          showResponse({
            status: response.status,
            statusText: response.statusText,
            time: responseTime,
            size: responseSize,
            body: formattedBody,
            headers: responseHeaders,
            raw: responseText
          });

          // Add to history
          addToHistory(url, currentMethod, response.status);
        } catch (error) {
          showResponse({
            status: 0,
            statusText: "Error",
            time: Math.round(performance.now() - startTime),
            size: 0,
            body: error.message,
            headers: {},
            raw: error.toString()
          });
        }

        sendBtn.disabled = false;
        sendText.style.display = "inline";
        sendLoading.style.display = "none";
      };

      function showResponse(data) {
        document.getElementById("responseSection").style.display = "block";

        // Status badge
        const badge = document.getElementById("statusBadge");
        badge.textContent = `${data.status} ${data.statusText}`;
        badge.className = "status-badge";
        if (data.status >= 200 && data.status < 300) badge.classList.add("status-2xx");
        else if (data.status >= 300 && data.status < 400) badge.classList.add("status-3xx");
        else if (data.status >= 400 && data.status < 500) badge.classList.add("status-4xx");
        else badge.classList.add("status-5xx");

        // Meta
        document.getElementById("responseTime").textContent = `响应时间: ${data.time}ms`;
        document.getElementById("responseSize").textContent = `大小: ${formatBytes(data.size)}`;

        // Tabs
        document.getElementById("responseBody").textContent = data.body;
        document.getElementById("responseHeaders").textContent = JSON.stringify(
          data.headers,
          null,
          2
        );
        document.getElementById("responseRaw").textContent = data.raw;
      }

      function formatBytes(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
      }

      window.switchTab = function (tab) {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
        document.querySelector(`.tab[onclick="switchTab('${tab}')"]`).classList.add("active");
        document.getElementById(tab + "Tab").classList.add("active");
      };

      function addToHistory(url, method, status) {
        history.unshift({
          url,
          method,
          status,
          time: new Date().toLocaleTimeString()
        });
        if (history.length > 20) history.pop();
        localStorage.setItem("webhook_history", JSON.stringify(history));
        renderHistory();
      }

      function renderHistory() {
        const list = document.getElementById("historyList");
        if (history.length === 0) {
          list.innerHTML =
            '<div style="padding: 1rem; text-align: center; color: var(--color-text-secondary);">暂无历史记录</div>';
          return;
        }

        list.innerHTML = history
          .map(
            (item, i) => `
                <div class="history-item" onclick="loadHistory(${i})">
                    <div>
                        <span class="history-method" style="background: ${getMethodColor(item.method)}">${item.method}</span>
                        <span class="history-url">${escapeHtml(item.url)}</span>
                    </div>
                    <span class="history-time">${item.status} - ${item.time}</span>
                </div>
            `
          )
          .join("");
      }

      window.loadHistory = function (index) {
        const item = history[index];
        document.getElementById("urlInput").value = item.url;
        setMethod(item.method);
      };

      function getMethodColor(method) {
        const colors = {
          GET: "rgba(34, 197, 94, 0.3)",
          POST: "rgba(59, 130, 246, 0.3)",
          PUT: "rgba(245, 158, 11, 0.3)",
          PATCH: "rgba(139, 92, 246, 0.3)",
          DELETE: "rgba(239, 68, 68, 0.3)"
        };
        return colors[method] || "rgba(100, 100, 100, 0.3)";
      }

      window.escapeHtml = function (str) {
        return str.replace(
          /[&<>"']/g,
          (m) =>
            ({
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;"
            })[m]
        );
      };

      window.clearAll = function () {
        document.getElementById("urlInput").value = "";
        document.getElementById("bodyInput").value = "";
        document.getElementById("headersList").innerHTML = `
                <div class="header-row">
                    <input type="text" placeholder="Header名称" value="Content-Type">
                    <input type="text" placeholder="Header值" value="application/json">
                    <button class="remove-btn" onclick="removeHeader(this)">✕</button>
                </div>
            `;
        document.getElementById("responseSection").style.display = "none";
        setMethod("GET");
      };

      window.clearHistory = function () {
        history = [];
        localStorage.removeItem("webhook_history");
        renderHistory();
      };

      window.loadPreset = function (type) {
        if (type === "json") {
          document.getElementById("headersList").innerHTML = `
                    <div class="header-row">
                        <input type="text" placeholder="Header名称" value="Content-Type">
                        <input type="text" placeholder="Header值" value="application/json">
                        <button class="remove-btn" onclick="removeHeader(this)">✕</button>
                    </div>
                    <div class="header-row">
                        <input type="text" placeholder="Header名称" value="Accept">
                        <input type="text" placeholder="Header值" value="application/json">
                        <button class="remove-btn" onclick="removeHeader(this)">✕</button>
                    </div>
                `;
          document.getElementById("bodyInput").value = JSON.stringify(
            { key: "value", data: { nested: true } },
            null,
            2
          );
        } else if (type === "form") {
          document.getElementById("headersList").innerHTML = `
                    <div class="header-row">
                        <input type="text" placeholder="Header名称" value="Content-Type">
                        <input type="text" placeholder="Header值" value="application/x-www-form-urlencoded">
                        <button class="remove-btn" onclick="removeHeader(this)">✕</button>
                    </div>
                `;
          document.getElementById("bodyInput").value = "key=value&data=test";
        } else if (type === "auth") {
          addHeader();
          const rows = document.querySelectorAll(".header-row");
          const lastRow = rows[rows.length - 1];
          lastRow.querySelector("input:first-child").value = "Authorization";
          lastRow.querySelector("input:nth-child(2)").value = "Bearer your-token-here";
        }
      };

      // Keyboard shortcut
      document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          sendRequest();
        }
      });

      renderHistory();
    
