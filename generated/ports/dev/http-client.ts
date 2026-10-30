// @ts-nocheck
// Generated from tools/dev/http-client.html
// Source SHA-256: 489056eb5ce30b2cde1678f823dd447a2aa54e48a934c5b2cb844c8d46867f8d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme handling
      function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
      }

      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const newTheme = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Tab handling
      document.querySelectorAll(".tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          const tabGroup = tab.closest(".container").querySelectorAll(".tab");
          const contentGroup = tab.closest(".container").querySelectorAll(".tab-content");

          // Find parent container
          const parent = tab.parentElement;
          const tabs = parent.querySelectorAll(".tab");
          const tabId = tab.dataset.tab;

          tabs.forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");

          // Find corresponding content
          const contents = parent.nextElementSibling?.classList.contains("tab-content")
            ? [parent.nextElementSibling, parent.nextElementSibling.nextElementSibling].filter(
                Boolean
              )
            : document.querySelectorAll(`#${tabId}-tab`);

          document.querySelectorAll(".tab-content").forEach((c) => {
            if (c.id === tabId + "-tab") {
              c.classList.add("active");
            } else if (
              tabs[0].parentElement.nextElementSibling === c ||
              tabs[0].parentElement.nextElementSibling?.nextElementSibling === c
            ) {
              c.classList.remove("active");
            }
          });

          document.getElementById(tabId + "-tab")?.classList.add("active");

          // Handle tab groups
          if (["params", "headers", "body"].includes(tabId)) {
            ["params", "headers", "body"].forEach((id) => {
              document.getElementById(id + "-tab").classList.toggle("active", id === tabId);
            });
          }
          if (["response-body", "response-headers"].includes(tabId)) {
            ["response-body", "response-headers"].forEach((id) => {
              document.getElementById(id + "-tab").classList.toggle("active", id === tabId);
            });
          }
        });
      });

      // Update method color
      window.updateMethodColor = function () {
        const select = document.getElementById("method");
        select.className = "method-select " + select.value.toLowerCase();
      };

      // Add parameter row
      window.addParam = function (tableId) {
        const table = document.getElementById(tableId);
        const row = document.createElement("div");
        row.className = "param-row";
        row.innerHTML = `
                <input type="text" placeholder="${tableId === "headersTable" ? "Header 名" : "参数名"}">
                <input type="text" placeholder="${tableId === "headersTable" ? "Header 值" : "参数值"}">
                <button onclick="removeParam(this)">×</button>
            `;
        table.appendChild(row);
      };

      // Remove parameter row
      window.removeParam = function (btn) {
        btn.parentElement.remove();
      };

      // Get params from table
      function getParamsFromTable(tableId) {
        const params = {};
        const rows = document.getElementById(tableId).querySelectorAll(".param-row");
        rows.forEach((row) => {
          const inputs = row.querySelectorAll("input");
          const key = inputs[0].value.trim();
          const value = inputs[1].value.trim();
          if (key) params[key] = value;
        });
        return params;
      }

      // Format size
      function formatSize(bytes) {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
      }

      // Send request
      window.sendRequest = async function () {
        const method = document.getElementById("method").value;
        let url = document.getElementById("url").value;
        const sendBtn = document.getElementById("sendBtn");

        if (!url) {
          alert("请输入 URL");
          return;
        }

        // Add query params for GET
        const queryParams = getParamsFromTable("paramsTable");
        if (Object.keys(queryParams).length > 0) {
          const params = new URLSearchParams(queryParams);
          url += (url.includes("?") ? "&" : "?") + params.toString();
        }

        // Get headers
        const headers = getParamsFromTable("headersTable");

        // Get body
        const body = document.getElementById("requestBody").value;

        // Show loading
        sendBtn.disabled = true;
        sendBtn.textContent = "发送中...";
        document.getElementById("emptyState").style.display = "none";
        document.getElementById("responseSection").style.display = "block";
        document.getElementById("responseBody").innerHTML =
          '<div class="loading">正在请求...</div>';

        const startTime = Date.now();

        try {
          const options = {
            method,
            headers,
            mode: "cors"
          };

          if (["POST", "PUT", "PATCH"].includes(method) && body) {
            options.body = body;
          }

          const response = await fetch(url, options);
          const endTime = Date.now();

          // Get response text
          const responseText = await response.text();

          // Try to parse as JSON
          let formattedResponse;
          try {
            const json = JSON.parse(responseText);
            formattedResponse = JSON.stringify(json, null, 2);
          } catch {
            formattedResponse = responseText;
          }

          // Update UI
          const statusEl = document.getElementById("statusCode");
          statusEl.textContent = `${response.status} ${response.statusText}`;
          statusEl.className = "status " + (response.ok ? "success" : "error");

          document.getElementById("responseTime").textContent = endTime - startTime + "ms";
          document.getElementById("responseSize").textContent = formatSize(
            new Blob([responseText]).size
          );
          document.getElementById("responseBody").textContent = formattedResponse;

          // Response headers
          let headersText = "";
          response.headers.forEach((value, key) => {
            headersText += `${key}: ${value}\n`;
          });
          document.getElementById("responseHeaders").textContent =
            headersText || "无法读取响应头 (CORS 限制)";
        } catch (error) {
          document.getElementById("statusCode").textContent = "Error";
          document.getElementById("statusCode").className = "status error";
          document.getElementById("responseBody").textContent =
            `请求失败: ${error.message}\n\n可能原因:\n- URL 不正确\n- CORS 策略限制\n- 网络错误`;
        }

        sendBtn.disabled = false;
        sendBtn.textContent = "发送请求";
      };

      // Keyboard shortcut
      document.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
          sendRequest();
        }
      });

      // Initialize
      initTheme();
    
