// @ts-nocheck
// Generated from tools/dev/websocket-test.html
// Source SHA-256: 4b7c98a549208825b3e815939955fe274ec87ebb62e0868722297a5aa64e004d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 状态
      let ws = null;
      let protocol = "ws";
      let stats = {
        sent: 0,
        received: 0,
        sentBytes: 0,
        receivedBytes: 0
      };
      let savedMessages = JSON.parse(localStorage.getItem("wsSavedMessages") || "[]");
      let connectionHistory = JSON.parse(localStorage.getItem("wsConnectionHistory") || "[]");

      // 初始化
      function init() {
        renderSavedMessages();
        renderConnectionHistory();
        bindEvents();
      }

      // 主题切换
      document.getElementById("themeToggle").addEventListener("click", function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      });

      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
      }

      // 绑定事件
      function bindEvents() {
        // 协议切换
        document.getElementById("wsBtn").addEventListener("click", function () {
          protocol = "ws";
          this.classList.add("active");
          document.getElementById("wssBtn").classList.remove("active");
        });

        document.getElementById("wssBtn").addEventListener("click", function () {
          protocol = "wss";
          this.classList.add("active");
          document.getElementById("wsBtn").classList.remove("active");
        });

        // 连接
        document.getElementById("connectBtn").addEventListener("click", connect);
        document.getElementById("disconnectBtn").addEventListener("click", disconnect);

        // 发送消息
        document.getElementById("sendBtn").addEventListener("click", sendMessage);
        document.getElementById("messageInput").addEventListener("keydown", function (e) {
          if (e.key === "Enter" && e.ctrlKey) {
            sendMessage();
          }
        });

        // 保存消息
        document.getElementById("saveMessageBtn").addEventListener("click", saveCurrentMessage);

        // 清空消息
        document.getElementById("clearMessagesBtn").addEventListener("click", function () {
          document.getElementById("messagesList").replaceChildren();
        });

        // 回车连接
        document.getElementById("wsUrl").addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            connect();
          }
        });
      }

      // 连接WebSocket
      function connect() {
        const urlInput = document.getElementById("wsUrl").value.trim();
        if (!urlInput) {
          addSystemMessage("请输入服务器地址");
          return;
        }

        const url = protocol + "://" + urlInput;

        updateStatus("connecting", "连接中...");

        try {
          ws = new WebSocket(url);

          ws.onopen = function () {
            updateStatus("connected", "已连接");
            document.getElementById("connectBtn").disabled = true;
            document.getElementById("disconnectBtn").disabled = false;
            document.getElementById("messageInput").disabled = false;
            document.getElementById("sendBtn").disabled = false;
            document.getElementById("connectionInfo").textContent =
              "连接时间: " + new Date().toLocaleTimeString();

            addSystemMessage("已连接到 " + url);

            // 保存到历史
            addToHistory(urlInput);
          };

          ws.onmessage = function (event) {
            stats.received++;
            stats.receivedBytes += event.data.length;
            updateStats();

            let content = event.data;
            const prettyJson = document.getElementById("prettyJson").checked;

            if (prettyJson) {
              try {
                const parsed = JSON.parse(event.data);
                content = JSON.stringify(parsed, null, 2);
              } catch (e) {
                // 不是JSON，保持原样
              }
            }

            addMessage("received", content);
          };

          ws.onerror = function (error) {
            updateStatus("error", "连接错误");
            addSystemMessage("连接发生错误", "error");
          };

          ws.onclose = function (event) {
            updateStatus("disconnected", "未连接");
            document.getElementById("connectBtn").disabled = false;
            document.getElementById("disconnectBtn").disabled = true;
            document.getElementById("messageInput").disabled = true;
            document.getElementById("sendBtn").disabled = true;

            let reason = event.reason || "连接关闭";
            addSystemMessage("连接已关闭: " + reason + " (代码: " + event.code + ")");

            ws = null;
          };
        } catch (error) {
          updateStatus("error", "连接失败");
          addSystemMessage("无法创建WebSocket连接: " + error.message, "error");
        }
      }

      // 断开连接
      function disconnect() {
        if (ws) {
          ws.close();
        }
      }

      // 发送消息
      function sendMessage() {
        if (!ws || ws.readyState !== WebSocket.OPEN) {
          addSystemMessage("未连接到服务器", "error");
          return;
        }

        const input = document.getElementById("messageInput");
        let message = input.value.trim();

        if (!message) return;

        const format = document.querySelector('input[name="msgFormat"]:checked').value;

        if (format === "json") {
          try {
            JSON.parse(message);
          } catch (e) {
            addSystemMessage("JSON格式错误: " + e.message, "error");
            return;
          }
        }

        ws.send(message);
        stats.sent++;
        stats.sentBytes += message.length;
        updateStats();

        addMessage("sent", message);
        input.value = "";
      }

      // 添加消息到列表
      function addMessage(type, content) {
        const list = document.getElementById("messagesList");
        const item = document.createElement("div");
        item.className = "message-item " + type;

        const meta = document.createElement("div");
        meta.className = "message-meta";
        meta.textContent =
          (type === "sent" ? "发送" : "接收") + " - " + new Date().toLocaleTimeString();

        const contentDiv = document.createElement("div");
        contentDiv.className = "message-content";
        contentDiv.textContent = content;

        item.appendChild(meta);
        item.appendChild(contentDiv);
        list.appendChild(item);

        list.scrollTop = list.scrollHeight;
      }

      // 添加系统消息
      function addSystemMessage(text, type) {
        const list = document.getElementById("messagesList");
        const item = document.createElement("div");
        item.className = "message-item " + (type || "system");
        item.textContent = text;
        list.appendChild(item);
        list.scrollTop = list.scrollHeight;
      }

      // 更新状态
      function updateStatus(state, text) {
        const dot = document.getElementById("statusDot");
        const statusText = document.getElementById("statusText");

        dot.className = "status-dot";
        if (state === "connected") {
          dot.classList.add("connected");
        } else if (state === "connecting") {
          dot.classList.add("connecting");
        } else if (state === "error") {
          dot.classList.add("error");
        }

        statusText.textContent = text;
      }

      // 更新统计
      function updateStats() {
        document.getElementById("sentCount").textContent = stats.sent;
        document.getElementById("receivedCount").textContent = stats.received;
        document.getElementById("sentBytes").textContent = formatBytes(stats.sentBytes);
        document.getElementById("receivedBytes").textContent = formatBytes(stats.receivedBytes);
      }

      // 格式化字节
      function formatBytes(bytes) {
        if (bytes < 1024) return bytes + "B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + "K";
        return (bytes / (1024 * 1024)).toFixed(1) + "M";
      }

      // 保存当前消息
      function saveCurrentMessage() {
        const message = document.getElementById("messageInput").value.trim();
        if (!message) {
          alert("请先输入要保存的消息");
          return;
        }

        if (savedMessages.length >= 10) {
          savedMessages.shift();
        }

        savedMessages.push({
          content: message,
          time: new Date().toLocaleString()
        });

        localStorage.setItem("wsSavedMessages", JSON.stringify(savedMessages));
        renderSavedMessages();
        alert("消息已保存");
      }

      // 渲染保存的消息
      function renderSavedMessages() {
        const container = document.getElementById("savedMessages");
        container.replaceChildren();

        if (savedMessages.length === 0) {
          const p = document.createElement("p");
          p.style.cssText =
            "color: var(--pico-muted-color); font-size: 0.85rem; text-align: center;";
          p.textContent = "暂无保存的消息";
          container.appendChild(p);
          return;
        }

        savedMessages.forEach(function (msg, index) {
          const item = document.createElement("div");
          item.className = "saved-message";

          const text = document.createElement("span");
          text.className = "saved-message-text";
          text.textContent = msg.content;
          text.addEventListener("click", function () {
            document.getElementById("messageInput").value = msg.content;
          });

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "outline";
          deleteBtn.style.cssText = "padding: 0.1rem 0.3rem; font-size: 0.7rem;";
          deleteBtn.textContent = "×";
          deleteBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            savedMessages.splice(index, 1);
            localStorage.setItem("wsSavedMessages", JSON.stringify(savedMessages));
            renderSavedMessages();
          });

          item.appendChild(text);
          item.appendChild(deleteBtn);
          container.appendChild(item);
        });
      }

      // 添加到连接历史
      function addToHistory(url) {
        connectionHistory = connectionHistory.filter(function (h) {
          return h !== url;
        });
        connectionHistory.unshift(url);
        if (connectionHistory.length > 5) {
          connectionHistory.pop();
        }
        localStorage.setItem("wsConnectionHistory", JSON.stringify(connectionHistory));
        renderConnectionHistory();
      }

      // 渲染连接历史
      function renderConnectionHistory() {
        const container = document.getElementById("connectionHistory");
        container.replaceChildren();

        if (connectionHistory.length === 0) {
          const p = document.createElement("p");
          p.style.cssText =
            "color: var(--pico-muted-color); font-size: 0.85rem; text-align: center;";
          p.textContent = "暂无历史记录";
          container.appendChild(p);
          return;
        }

        connectionHistory.forEach(function (url) {
          const item = document.createElement("div");
          item.className = "history-item";
          item.textContent = url;
          item.addEventListener("click", function () {
            document.getElementById("wsUrl").value = url;
          });
          container.appendChild(item);
        });
      }

      // 启动
      init();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }
    
