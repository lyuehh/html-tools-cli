// @ts-nocheck
// Generated from tools/dev/sse-test.html
// Source SHA-256: eb23039144c3f9aaf5e054ccd419b42e3ed31e24e03645f2b3d65d2b1543b59f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 主题切换
      const themeToggle = document.getElementById("themeToggle");
      const html = document.documentElement;

      const savedTheme = localStorage.getItem("theme") || "light";
      html.setAttribute("data-theme", savedTheme);

      themeToggle.addEventListener("click", () => {
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      });

      // SSE相关
      let eventSource = null;
      let customEventTypes = new Set();
      let lastEventId = null;
      let stats = {
        total: 0,
        message: 0,
        custom: 0,
        error: 0,
        reconnect: 0
      };

      const sseUrl = document.getElementById("sseUrl");
      const withCredentials = document.getElementById("withCredentials");
      const connectBtn = document.getElementById("connectBtn");
      const disconnectBtn = document.getElementById("disconnectBtn");
      const statusIndicator = document.getElementById("statusIndicator");
      const statusText = document.getElementById("statusText");
      const reconnectInfo = document.getElementById("reconnectInfo");
      const eventLog = document.getElementById("eventLog");
      const clearLog = document.getElementById("clearLog");
      const customEventInput = document.getElementById("customEventInput");
      const addEventBtn = document.getElementById("addEventBtn");
      const eventListeners = document.getElementById("eventListeners");

      // 筛选器
      const filters = {
        message: document.getElementById("filterMessage"),
        custom: document.getElementById("filterCustom"),
        system: document.getElementById("filterSystem"),
        error: document.getElementById("filterError")
      };

      // 获取当前时间
      function getTime() {
        return new Date().toLocaleTimeString("zh-CN", { hour12: false });
      }

      // 更新统计
      function updateStats() {
        document.getElementById("totalEvents").textContent = stats.total;
        document.getElementById("messageEvents").textContent = stats.message;
        document.getElementById("customEventsCount").textContent = stats.custom;
        document.getElementById("errorCount").textContent = stats.error;
        document.getElementById("reconnectCount").textContent = stats.reconnect;
      }

      // 更新状态
      function updateStatus(status) {
        statusIndicator.className = "status-indicator status-" + status;
        const statusMap = {
          closed: "未连接",
          connecting: "连接中...",
          open: "已连接"
        };
        statusText.textContent = statusMap[status] || status;
      }

      // 添加日志
      function addLog(type, eventType, data, eventId) {
        const item = document.createElement("div");
        item.className = "event-item event-" + type;
        item.dataset.type = type;

        const typeLabel = {
          message: "MESSAGE",
          custom: eventType.toUpperCase(),
          system: "系统",
          error: "错误",
          default: eventType.toUpperCase()
        };

        const header = document.createElement("div");
        header.className = "event-header";

        const typeSpan = document.createElement("span");
        typeSpan.className = "event-type";
        typeSpan.textContent = typeLabel[type] || typeLabel.default;

        const timeSpan = document.createElement("span");
        timeSpan.textContent = getTime() + (eventId ? " | ID: " + eventId : "");

        header.appendChild(typeSpan);
        header.appendChild(timeSpan);

        const dataDiv = document.createElement("div");
        dataDiv.className = "event-data";
        dataDiv.textContent = data;

        item.appendChild(header);
        item.appendChild(dataDiv);

        eventLog.appendChild(item);
        eventLog.scrollTop = eventLog.scrollHeight;
        applyFilters();
      }

      // 应用筛选
      function applyFilters() {
        const items = eventLog.querySelectorAll(".event-item");
        items.forEach((item) => {
          const type = item.dataset.type;
          if (type === "message") {
            item.style.display = filters.message.checked ? "" : "none";
          } else if (type === "custom") {
            item.style.display = filters.custom.checked ? "" : "none";
          } else if (type === "system") {
            item.style.display = filters.system.checked ? "" : "none";
          } else if (type === "error") {
            item.style.display = filters.error.checked ? "" : "none";
          }
        });
      }

      // 设置控件状态
      function setControlsEnabled(connected) {
        connectBtn.disabled = connected;
        disconnectBtn.disabled = !connected;
        sseUrl.disabled = connected;
        withCredentials.disabled = connected;
      }

      // 添加自定义事件监听标签
      function addEventTag(eventType) {
        const tag = document.createElement("span");
        tag.className = "event-tag";
        tag.dataset.event = eventType;

        const nameSpan = document.createElement("span");
        nameSpan.textContent = eventType;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "\u00D7";
        removeBtn.addEventListener("click", () => {
          removeCustomEvent(eventType);
        });

        tag.appendChild(nameSpan);
        tag.appendChild(removeBtn);
        eventListeners.appendChild(tag);
      }

      // 添加自定义事件监听
      function addCustomEventListener(eventType) {
        if (!eventType || customEventTypes.has(eventType)) return;

        customEventTypes.add(eventType);
        addEventTag(eventType);

        if (eventSource && eventSource.readyState === EventSource.OPEN) {
          attachCustomListener(eventType);
        }
      }

      // 移除自定义事件监听
      function removeCustomEvent(eventType) {
        customEventTypes.delete(eventType);
        const tag = eventListeners.querySelector('[data-event="' + eventType + '"]');
        if (tag) tag.remove();
      }

      // 附加自定义监听器
      function attachCustomListener(eventType) {
        if (!eventSource) return;
        eventSource.addEventListener(eventType, (e) => {
          stats.total++;
          stats.custom++;
          updateStats();

          let data = e.data;
          try {
            const json = JSON.parse(e.data);
            data = JSON.stringify(json, null, 2);
          } catch (err) {}

          addLog("custom", eventType, data, e.lastEventId);
          if (e.lastEventId) lastEventId = e.lastEventId;
        });
      }

      // 连接SSE
      function connect() {
        const url = sseUrl.value.trim();
        if (!url) {
          addLog("error", "error", "请输入SSE端点URL", null);
          return;
        }

        updateStatus("connecting");
        addLog("system", "system", "正在连接到 " + url + "...", null);

        try {
          eventSource = new EventSource(url, {
            withCredentials: withCredentials.checked
          });

          eventSource.onopen = () => {
            updateStatus("open");
            setControlsEnabled(true);
            addLog("system", "system", "连接成功！", null);

            // 附加所有自定义监听器
            customEventTypes.forEach((type) => attachCustomListener(type));
          };

          eventSource.onmessage = (e) => {
            stats.total++;
            stats.message++;
            updateStats();

            let data = e.data;
            try {
              const json = JSON.parse(e.data);
              data = JSON.stringify(json, null, 2);
            } catch (err) {}

            addLog("message", "message", data, e.lastEventId);
            if (e.lastEventId) lastEventId = e.lastEventId;
          };

          eventSource.onerror = (e) => {
            stats.error++;
            updateStats();

            if (eventSource.readyState === EventSource.CONNECTING) {
              stats.reconnect++;
              updateStats();
              updateStatus("connecting");
              addLog("system", "system", "连接断开，正在尝试重连...", null);
              reconnectInfo.textContent = "重连次数: " + stats.reconnect;
            } else if (eventSource.readyState === EventSource.CLOSED) {
              updateStatus("closed");
              setControlsEnabled(false);
              addLog("error", "error", "连接已关闭", null);
            }
          };
        } catch (error) {
          updateStatus("closed");
          addLog("error", "error", "连接失败: " + error.message, null);
        }
      }

      // 断开连接
      function disconnect() {
        if (eventSource) {
          eventSource.close();
          eventSource = null;
          updateStatus("closed");
          setControlsEnabled(false);
          addLog("system", "system", "已手动断开连接", null);
          reconnectInfo.textContent = "";
        }
      }

      // 事件绑定
      connectBtn.addEventListener("click", connect);
      disconnectBtn.addEventListener("click", disconnect);

      clearLog.addEventListener("click", () => {
        eventLog.textContent = "";
        addLog("system", "system", "日志已清空", null);
      });

      addEventBtn.addEventListener("click", () => {
        const eventType = customEventInput.value.trim();
        if (eventType) {
          addCustomEventListener(eventType);
          customEventInput.value = "";
        }
      });

      customEventInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          addEventBtn.click();
        }
      });

      sseUrl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          connect();
        }
      });

      // 筛选器事件
      Object.values(filters).forEach((checkbox) => {
        checkbox.addEventListener("change", applyFilters);
      });

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }
    
