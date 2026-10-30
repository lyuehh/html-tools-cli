// @ts-nocheck
// Generated from tools/network/rest-client.html
// Source SHA-256: ce84b6571d0cf8f75b33279779a7af26e5adb3e1c555daeb195d1845ffc3bd8b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var requestHistory = JSON.parse(localStorage.getItem("restClientHistory") || "[]");
      if (!Array.isArray(requestHistory)) requestHistory = [];

      window.toggleTheme = function () {
        var html = document.documentElement;
        var newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        document.querySelector(".theme-icon").textContent = newTheme === "light" ? "🌙" : "☀️";
      };
      (function () {
        var savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.querySelector(".theme-icon").textContent = savedTheme === "light" ? "🌙" : "☀️";
        addKVRow("paramsEditor");
        addKVRow("headersEditor");
        renderHistory();
      })();

      window.switchTab = function (btn, tabId) {
        btn.parentElement.querySelectorAll(".tab").forEach(function (t) {
          t.classList.remove("active");
        });
        btn.classList.add("active");
        btn
          .closest(".panel")
          .querySelectorAll(".tab-content")
          .forEach(function (c) {
            c.classList.remove("active");
          });
        document.getElementById(tabId + "Tab").classList.add("active");
      };

      function addKVRow(editorId, key, value) {
        var editor = document.getElementById(editorId);
        var row = document.createElement("div");
        row.className = "kv-row";
        row.innerHTML =
          '<input type="text" placeholder="键" value="' +
          (key || "") +
          '">' +
          '<input type="text" placeholder="值" value="' +
          (value || "") +
          '">' +
          '<button class="kv-remove" onclick="this.parentElement.remove()">×</button>';
        editor.appendChild(row);
      }

      function getKVPairs(editorId) {
        var pairs = {};
        document.querySelectorAll("#" + editorId + " .kv-row").forEach(function (row) {
          var inputs = row.querySelectorAll("input");
          var key = inputs[0].value.trim();
          var val = inputs[1].value;
          if (key) pairs[key] = val;
        });
        return pairs;
      }

      window.toggleAuthFields = function () {
        var authType = document.getElementById("authType").value;
        document.getElementById("basicAuthFields").style.display =
          authType === "basic" ? "block" : "none";
        document.getElementById("bearerField").style.display =
          authType === "bearer" ? "block" : "none";
      };

      window.sendRequest = async function () {
        var method = document.getElementById("method").value;
        var url = document.getElementById("url").value.trim();
        if (!url) {
          alert("请输入 URL");
          return;
        }

        var btn = document.getElementById("sendBtn");
        btn.disabled = true;
        btn.innerHTML = '<span class="loading"></span> 发送中...';

        var params = getKVPairs("paramsEditor");
        if (Object.keys(params).length) {
          var urlObj = new URL(url);
          Object.keys(params).forEach(function (k) {
            urlObj.searchParams.append(k, params[k]);
          });
          url = urlObj.toString();
        }

        var headers = getKVPairs("headersEditor");
        var authType = document.getElementById("authType").value;
        if (authType === "basic") {
          var user = document.getElementById("authUser").value;
          var pass = document.getElementById("authPass").value;
          headers["Authorization"] = "Basic " + btoa(user + ":" + pass);
        } else if (authType === "bearer") {
          headers["Authorization"] = "Bearer " + document.getElementById("bearerToken").value;
        }

        var options = { method: method, headers: headers };

        if (["POST", "PUT", "PATCH"].includes(method)) {
          var bodyType = document.getElementById("bodyType").value;
          var body = document.getElementById("requestBody").value;
          if (body) {
            if (bodyType === "json") {
              headers["Content-Type"] = "application/json";
              options.body = body;
            } else if (bodyType === "form") {
              headers["Content-Type"] = "application/x-www-form-urlencoded";
              options.body = body;
            } else {
              headers["Content-Type"] = "text/plain";
              options.body = body;
            }
          }
        }

        var startTime = Date.now();
        try {
          var response = await fetch(url, options);
          var duration = Date.now() - startTime;
          var contentType = response.headers.get("content-type") || "";
          var responseText = await response.text();
          var size = new Blob([responseText]).size;

          displayResponse(
            response.status,
            response.statusText,
            duration,
            size,
            responseText,
            contentType,
            Object.fromEntries(response.headers)
          );
          addToHistory(method, url, response.status);
        } catch (err) {
          displayError(err.message);
        }

        btn.disabled = false;
        btn.textContent = "发送请求";
      };

      function displayResponse(status, statusText, duration, size, body, contentType, headers) {
        var statusClass =
          status >= 500
            ? "status-5xx"
            : status >= 400
              ? "status-4xx"
              : status >= 300
                ? "status-3xx"
                : "status-2xx";
        document.getElementById("responseStatus").innerHTML =
          '<span class="status-badge ' +
          statusClass +
          '">' +
          status +
          " " +
          statusText +
          "</span>" +
          '<span class="response-meta">时间: ' +
          duration +
          "ms | 大小: " +
          formatSize(size) +
          "</span>" +
          '<button class="copy-btn" onclick="copyResponse()">复制响应</button>';

        var formatted = body;
        if (contentType.includes("json")) {
          try {
            formatted = JSON.stringify(JSON.parse(body), null, 2);
          } catch (e) {}
        }

        var headersHtml =
          '<details style="margin-top:1rem;"><summary style="cursor:pointer;font-weight:600;">响应头 (' +
          Object.keys(headers).length +
          ')</summary><pre style="margin-top:0.5rem;">' +
          Object.entries(headers)
            .map(function (e) {
              return e[0] + ": " + e[1];
            })
            .join("\n") +
          "</pre></details>";

        document.getElementById("responseContent").innerHTML =
          '<div class="response-body"><pre id="responseBody">' +
          escapeHtml(formatted) +
          "</pre></div>" +
          headersHtml;
      }

      function displayError(message) {
        document.getElementById("responseStatus").innerHTML =
          '<span class="status-badge status-5xx">错误</span>';
        document.getElementById("responseContent").innerHTML =
          '<div class="empty-state" style="color:var(--pico-del-color);">请求失败: ' +
          escapeHtml(message) +
          "</div>";
      }

      window.copyResponse = function () {
        var body = document.getElementById("responseBody");
        if (body) navigator.clipboard.writeText(body.textContent);
      };

      function addToHistory(method, url, status) {
        requestHistory.unshift({ method: method, url: url, status: status, time: Date.now() });
        if (requestHistory.length > 50) requestHistory.pop();
        localStorage.setItem("restClientHistory", JSON.stringify(requestHistory));
        renderHistory();
      }

      function renderHistory() {
        var panel = document.getElementById("historyPanel");
        if (!requestHistory.length) {
          panel.innerHTML = '<div class="empty-state" style="padding:1rem;">暂无历史记录</div>';
          return;
        }
        panel.innerHTML = requestHistory
          .map(function (item, idx) {
            return (
              '<div class="history-item" onclick="loadHistory(' +
              idx +
              ')">' +
              '<span class="history-method ' +
              item.method +
              '">' +
              item.method +
              "</span>" +
              '<span class="history-url">' +
              escapeHtml(item.url) +
              "</span>" +
              '<span class="status-badge status-' +
              (item.status >= 400 ? "4xx" : "2xx") +
              '" style="font-size:0.7rem;">' +
              item.status +
              "</span></div>"
            );
          })
          .join("");
      }

      window.loadHistory = function (idx) {
        var item = requestHistory[idx];
        document.getElementById("method").value = item.method;
        document.getElementById("url").value = item.url;
      };

      window.clearHistory = function () {
        requestHistory = [];
        localStorage.removeItem("restClientHistory");
        renderHistory();
      };

      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        return (bytes / 1024).toFixed(1) + " KB";
      }

      window.escapeHtml = function (str) {
        return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      };
    
