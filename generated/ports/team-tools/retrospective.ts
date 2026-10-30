// @ts-nocheck
// Generated from tools/team-tools/retrospective.html
// Source SHA-256: ecc0922ef13221a80e092f254918fa596fb707399d10552711569792ac7af354
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "retrospective-data";

      const TEMPLATES = {
        "mad-sad-glad": {
          name: "Mad Sad Glad",
          columns: [
            { id: "mad", icon: "😤", title: "Mad (愤怒)", type: "improve", color: "danger" },
            { id: "sad", icon: "😢", title: "Sad (难过)", type: "improve", color: "warning" },
            { id: "glad", icon: "😊", title: "Glad (高兴)", type: "good", color: "success" }
          ]
        },
        "start-stop-continue": {
          name: "Start Stop Continue",
          columns: [
            { id: "start", icon: "🚀", title: "Start (开始做)", type: "action", color: "success" },
            { id: "stop", icon: "🛑", title: "Stop (停止做)", type: "improve", color: "danger" },
            { id: "continue", icon: "✅", title: "Continue (继续做)", type: "good", color: "info" }
          ]
        },
        "4ls": {
          name: "4Ls",
          columns: [
            { id: "liked", icon: "❤️", title: "Liked (喜欢的)", type: "good", color: "success" },
            { id: "learned", icon: "📚", title: "Learned (学到的)", type: "good", color: "info" },
            {
              id: "lacked",
              icon: "❌",
              title: "Lacked (缺少的)",
              type: "improve",
              color: "warning"
            },
            {
              id: "longed",
              icon: "🌟",
              title: "Longed For (期望的)",
              type: "action",
              color: "danger"
            }
          ]
        },
        "went-well": {
          name: "Went Well / To Improve",
          columns: [
            { id: "well", icon: "👍", title: "做得好的", type: "good", color: "success" },
            { id: "improve", icon: "📈", title: "待改进的", type: "improve", color: "warning" },
            { id: "actions", icon: "🎯", title: "行动计划", type: "action", color: "info" }
          ]
        },
        sailboat: {
          name: "Sailboat 帆船",
          columns: [
            { id: "wind", icon: "💨", title: "Wind (推动力)", type: "good", color: "success" },
            { id: "anchor", icon: "⚓", title: "Anchor (阻力)", type: "improve", color: "danger" },
            { id: "rocks", icon: "🪨", title: "Rocks (风险)", type: "question", color: "warning" },
            { id: "island", icon: "🏝️", title: "Island (目标)", type: "action", color: "info" }
          ]
        }
      };

      let currentTemplate = "went-well";
      let items = {};

      function init() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
          document.body.setAttribute("data-theme", "light");
        }

        document.getElementById("retroDate").value = new Date().toISOString().split("T")[0];

        renderTemplateSelect();
        loadFromStorage();
        loadFromUrl();
        renderGrid();

        document.querySelectorAll(".sprint-info input").forEach((input) => {
          input.addEventListener("input", saveToStorage);
        });
      }

      function renderTemplateSelect() {
        const container = document.getElementById("templateSelect");
        Object.keys(TEMPLATES).forEach((key) => {
          const btn = document.createElement("button");
          btn.className = "template-btn" + (key === currentTemplate ? " active" : "");
          btn.textContent = TEMPLATES[key].name;
          btn.addEventListener("click", () => selectTemplate(key));
          container.appendChild(btn);
        });
      }

      function selectTemplate(key) {
        currentTemplate = key;
        document.querySelectorAll(".template-btn").forEach((btn, i) => {
          btn.classList.toggle("active", Object.keys(TEMPLATES)[i] === key);
        });
        renderGrid();
        saveToStorage();
      }

      function renderGrid() {
        const grid = document.getElementById("retroGrid");
        grid.textContent = "";

        const template = TEMPLATES[currentTemplate];
        template.columns.forEach((col) => {
          const column = document.createElement("div");
          column.className = "retro-column column-" + col.type;

          const header = document.createElement("div");
          header.className = "column-header";

          const icon = document.createElement("span");
          icon.className = "column-icon";
          icon.textContent = col.icon;

          const title = document.createElement("span");
          title.className = "column-title";
          title.textContent = col.title;

          const count = document.createElement("span");
          count.className = "column-count";
          count.id = "count-" + col.id;
          count.textContent = (items[col.id] || []).length;

          header.appendChild(icon);
          header.appendChild(title);
          header.appendChild(count);

          const list = document.createElement("div");
          list.className = "item-list";
          list.id = "list-" + col.id;

          renderItems(col.id, list);

          const form = document.createElement("div");
          form.className = "add-item-form";

          const textarea = document.createElement("textarea");
          textarea.className = "add-item-input";
          textarea.placeholder = "添加新条目...";
          textarea.rows = 2;

          const addBtn = document.createElement("button");
          addBtn.className = "add-item-btn";
          addBtn.textContent = "+ 添加";
          addBtn.addEventListener("click", () => {
            if (textarea.value.trim()) {
              addItem(col.id, textarea.value.trim());
              textarea.value = "";
            }
          });

          textarea.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (textarea.value.trim()) {
                addItem(col.id, textarea.value.trim());
                textarea.value = "";
              }
            }
          });

          form.appendChild(textarea);
          form.appendChild(addBtn);

          column.appendChild(header);
          column.appendChild(list);
          column.appendChild(form);

          grid.appendChild(column);
        });

        updateStats();
      }

      function renderItems(columnId, container) {
        container.textContent = "";
        const columnItems = items[columnId] || [];

        columnItems.sort((a, b) => b.votes - a.votes);

        columnItems.forEach((item) => {
          const div = document.createElement("div");
          div.className = "retro-item";

          const content = document.createElement("div");
          content.className = "retro-item-content";
          content.textContent = item.text;

          const footer = document.createElement("div");
          footer.className = "retro-item-footer";

          const voteBtn = document.createElement("button");
          voteBtn.className = "vote-btn";
          voteBtn.textContent = "👍 " + item.votes;
          voteBtn.addEventListener("click", () => voteItem(columnId, item.id));

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "delete-item";
          deleteBtn.textContent = "×";
          deleteBtn.addEventListener("click", () => deleteItem(columnId, item.id));

          footer.appendChild(voteBtn);
          footer.appendChild(deleteBtn);

          div.appendChild(content);
          div.appendChild(footer);

          container.appendChild(div);
        });
      }

      function addItem(columnId, text) {
        if (!items[columnId]) {
          items[columnId] = [];
        }
        items[columnId].push({
          id: Date.now(),
          text: text,
          votes: 0
        });

        const list = document.getElementById("list-" + columnId);
        renderItems(columnId, list);
        document.getElementById("count-" + columnId).textContent = items[columnId].length;
        updateStats();
        saveToStorage();
      }

      function voteItem(columnId, itemId) {
        const item = (items[columnId] || []).find((i) => i.id === itemId);
        if (item) {
          item.votes++;
          const list = document.getElementById("list-" + columnId);
          renderItems(columnId, list);
          updateStats();
          saveToStorage();
        }
      }

      function deleteItem(columnId, itemId) {
        items[columnId] = (items[columnId] || []).filter((i) => i.id !== itemId);
        const list = document.getElementById("list-" + columnId);
        renderItems(columnId, list);
        document.getElementById("count-" + columnId).textContent = items[columnId].length;
        updateStats();
        saveToStorage();
      }

      function updateStats() {
        let totalItems = 0;
        let totalVotes = 0;
        let actionItems = 0;

        const template = TEMPLATES[currentTemplate];
        template.columns.forEach((col) => {
          const colItems = items[col.id] || [];
          totalItems += colItems.length;
          totalVotes += colItems.reduce((sum, i) => sum + i.votes, 0);
          if (col.type === "action") {
            actionItems += colItems.length;
          }
        });

        document.getElementById("totalItems").textContent = totalItems;
        document.getElementById("totalVotes").textContent = totalVotes;
        document.getElementById("actionItems").textContent = actionItems;
      }

      function exportRetro() {
        const sprintName = document.getElementById("sprintName").value || "回顾会议";
        const retroDate = document.getElementById("retroDate").value;
        const facilitator = document.getElementById("facilitator").value;

        let text = "═══════════════════════════════════════\n";
        text += "        " + sprintName + " 回顾会议\n";
        text += "═══════════════════════════════════════\n\n";

        text += "📅 日期: " + retroDate + "\n";
        if (facilitator) text += "👤 主持人: " + facilitator + "\n";
        text += "📋 模板: " + TEMPLATES[currentTemplate].name + "\n\n";

        const template = TEMPLATES[currentTemplate];
        template.columns.forEach((col) => {
          text += "───────────────────────────────────────\n";
          text += col.icon + " " + col.title + "\n";
          text += "───────────────────────────────────────\n";

          const colItems = (items[col.id] || []).sort((a, b) => b.votes - a.votes);
          if (colItems.length === 0) {
            text += "(无内容)\n";
          } else {
            colItems.forEach((item, i) => {
              text += i + 1 + ". " + item.text;
              if (item.votes > 0) {
                text += " [" + item.votes + " 票]";
              }
              text += "\n";
            });
          }
          text += "\n";
        });

        text += "═══════════════════════════════════════\n";

        navigator.clipboard.writeText(text).then(() => {
          showToast("报告已复制到剪贴板");
        });
      }

      function shareRetro() {
        const data = {
          template: currentTemplate,
          sprintName: document.getElementById("sprintName").value,
          retroDate: document.getElementById("retroDate").value,
          facilitator: document.getElementById("facilitator").value,
          items: items
        };
        const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
        const url = window.location.href.split("#")[0] + "#" + encoded;
        navigator.clipboard.writeText(url).then(() => {
          showToast("分享链接已复制");
        });
      }

      function loadFromUrl() {
        const hash = window.location.hash.slice(1);
        if (hash) {
          try {
            const data = JSON.parse(decodeURIComponent(atob(hash)));
            if (data.template) {
              currentTemplate = data.template;
              document.querySelectorAll(".template-btn").forEach((btn, i) => {
                btn.classList.toggle("active", Object.keys(TEMPLATES)[i] === currentTemplate);
              });
            }
            if (data.sprintName) document.getElementById("sprintName").value = data.sprintName;
            if (data.retroDate) document.getElementById("retroDate").value = data.retroDate;
            if (data.facilitator) document.getElementById("facilitator").value = data.facilitator;
            if (data.items) items = data.items;
            renderGrid();
          } catch (e) {
            console.error("Failed to load from URL:", e);
          }
        }
      }

      function saveToStorage() {
        const data = {
          template: currentTemplate,
          sprintName: document.getElementById("sprintName").value,
          retroDate: document.getElementById("retroDate").value,
          facilitator: document.getElementById("facilitator").value,
          items: items
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            const data = JSON.parse(saved);
            if (data.template) {
              currentTemplate = data.template;
              document.querySelectorAll(".template-btn").forEach((btn, i) => {
                btn.classList.toggle("active", Object.keys(TEMPLATES)[i] === currentTemplate);
              });
            }
            if (data.sprintName) document.getElementById("sprintName").value = data.sprintName;
            if (data.retroDate) document.getElementById("retroDate").value = data.retroDate;
            if (data.facilitator) document.getElementById("facilitator").value = data.facilitator;
            if (data.items) items = data.items;
          } catch (e) {
            console.error("Failed to load from storage:", e);
          }
        }
      }

      function clearAll() {
        if (confirm("确定要清空所有内容吗？")) {
          items = {};
          document.getElementById("sprintName").value = "";
          document.getElementById("facilitator").value = "";
          renderGrid();
          localStorage.removeItem(LS_KEY);
          window.location.hash = "";
        }
      }

      function showToast(message) {
        const toast = document.createElement("div");
        toast.style.cssText =
          "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--accent-color);color:#000;padding:12px 24px;border-radius:8px;z-index:1000;font-size:14px;";
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
      }

      window.toggleTheme = function () {
        const body = document.body;
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      init();
    
