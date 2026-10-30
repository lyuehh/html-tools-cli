// @ts-nocheck
// Generated from tools/network/sse-client.html
// Source SHA-256: 92a6d87adb201bd9dd386ee895b88fd8faf6555326b2a10c7d592ea2a6bb27e3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var eventSource = null;
      var events = [];
      var eventCount = 0;
      var connectTime = null;
      var durationTimer = null;

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
      })();

      window.setUrl = function (url) {
        document.getElementById("sseUrl").value = url;
      };

      window.toggleConnection = function () {
        if (eventSource) {
          disconnect();
        } else {
          connect();
        }
      };

      function connect() {
        var url = document.getElementById("sseUrl").value.trim();
        if (!url) {
          alert("请输入 SSE URL");
          return;
        }

        updateStatus("connecting");
        addEvent("open", "正在连接...", null);

        try {
          eventSource = new EventSource(url);
          connectTime = Date.now();
          startDurationTimer();

          eventSource.onopen = function () {
            updateStatus("connected");
            updateReadyState();
            addEvent("open", "连接已建立", null);
          };

          eventSource.onmessage = function (e) {
            eventCount++;
            document.getElementById("eventCount").textContent = eventCount;
            if (e.lastEventId) document.getElementById("lastEventId").textContent = e.lastEventId;
            addEvent("message", e.data, e.lastEventId);
          };

          eventSource.onerror = function () {
            updateReadyState();
            if (eventSource.readyState === EventSource.CLOSED) {
              addEvent("error", "连接已关闭", null);
              disconnect();
            } else {
              addEvent("error", "连接错误，正在重连...", null);
            }
          };
        } catch (err) {
          addEvent("error", "创建连接失败: " + err.message, null);
          updateStatus("disconnected");
        }
      }

      function disconnect() {
        if (eventSource) {
          eventSource.close();
          eventSource = null;
        }
        updateStatus("disconnected");
        updateReadyState();
        stopDurationTimer();
        addEvent("open", "连接已断开", null);
      }

      function updateStatus(status) {
        var dot = document.getElementById("statusDot");
        var text = document.getElementById("statusText");
        var btn = document.getElementById("connectBtn");

        dot.className = "status-dot " + status;

        if (status === "connected") {
          text.textContent = "已连接";
          btn.textContent = "断开";
          btn.className = "connect-btn disconnect";
        } else if (status === "connecting") {
          text.textContent = "连接中...";
        } else {
          text.textContent = "未连接";
          btn.textContent = "连接";
          btn.className = "connect-btn connect";
        }
      }

      function updateReadyState() {
        var states = ["CONNECTING", "OPEN", "CLOSED"];
        var state = eventSource ? states[eventSource.readyState] : "CLOSED";
        document.getElementById("readyState").textContent = state;
      }

      function startDurationTimer() {
        durationTimer = setInterval(function () {
          if (connectTime) {
            var seconds = Math.floor((Date.now() - connectTime) / 1000);
            var mins = Math.floor(seconds / 60);
            var secs = seconds % 60;
            document.getElementById("duration").textContent =
              mins + ":" + (secs < 10 ? "0" : "") + secs;
          }
        }, 1000);
      }

      function stopDurationTimer() {
        if (durationTimer) {
          clearInterval(durationTimer);
          durationTimer = null;
        }
        document.getElementById("duration").textContent = "-";
        connectTime = null;
      }

      function addEvent(type, data, id) {
        events.push({ type: type, data: data, id: id, time: new Date() });
        renderEvents();
        if (document.getElementById("autoScroll").checked) scrollToBottom();
      }

      function renderEvents() {
        var container = document.getElementById("eventsContainer");
        var filter = document.getElementById("eventFilter").value.toLowerCase();
        var filtered = events.filter(function (e) {
          return !filter || e.type.toLowerCase().includes(filter);
        });

        if (!filtered.length) {
          container.innerHTML = '<div class="empty-state">暂无事件</div>';
          return;
        }

        container.innerHTML = filtered
          .map(function (e) {
            var formatted = e.data;
            try {
              formatted = JSON.stringify(JSON.parse(e.data), null, 2);
            } catch (err) {}

            return (
              '<div class="event event-' +
              e.type +
              '">' +
              '<div class="event-header">' +
              '<span class="event-type ' +
              e.type +
              '">' +
              e.type.toUpperCase() +
              "</span>" +
              "<span>" +
              formatTime(e.time) +
              (e.id ? ' <span class="event-id">ID: ' + e.id + "</span>" : "") +
              "</span>" +
              "</div>" +
              '<div class="event-data">' +
              escapeHtml(formatted) +
              "</div></div>"
            );
          })
          .join("");
      }

      function scrollToBottom() {
        var container = document.getElementById("eventsContainer");
        container.scrollTop = container.scrollHeight;
      }

      window.clearEvents = function () {
        events = [];
        eventCount = 0;
        document.getElementById("eventCount").textContent = "0";
        document.getElementById("lastEventId").textContent = "-";
        renderEvents();
      };

      function formatTime(date) {
        return date.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          fractionalSecondDigits: 3
        });
      }

      window.escapeHtml = function (str) {
        return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      };

      document.getElementById("eventFilter").addEventListener("input", renderEvents);

      window.addEventListener("beforeunload", function () {
        if (eventSource) eventSource.close();
      });
    
