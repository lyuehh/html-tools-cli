// @ts-nocheck
// Generated from tools/life/clipboard-history.html
// Source SHA-256: d1fd6dcde2c174159f9d53fd25fdbc6724dad7af2fe1595465ba13da45c3909f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let history = [];
      const MAX_ITEMS = 100;

      document.addEventListener("DOMContentLoaded", () => {
        initTheme();
        loadHistory();
        renderHistory();
      });

      function initTheme() {
        const s = localStorage.getItem("theme");
        if (s) document.documentElement.setAttribute("data-theme", s);
      }
      window.toggleTheme = function () {
        const c = document.documentElement.getAttribute("data-theme");
        const n = c === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", n);
        localStorage.setItem("theme", n);
      };

      window.loadHistory = function () {
        const s = localStorage.getItem("clipboardHistory");
        if (s)
          try {
            history = JSON.parse(s);
          } catch (e) {
            history = [];
          }
      };
      function saveHistory() {
        localStorage.setItem("clipboardHistory", JSON.stringify(history.slice(0, MAX_ITEMS)));
      }

      function addToHistory(text) {
        if (!text || !text.trim()) return;
        text = text.trim();
        const existing = history.findIndex((h) => h.content === text);
        if (existing !== -1) history.splice(existing, 1);
        history.unshift({ content: text, timestamp: Date.now(), tags: detectTags(text) });
        if (history.length > MAX_ITEMS) history = history.slice(0, MAX_ITEMS);
        saveHistory();
        renderHistory();
      }

      function detectTags(text) {
        const tags = [];
        if (/https?:\/\//.test(text)) tags.push("url");
        if (/[\w.-]+@[\w.-]+\.\w+/.test(text)) tags.push("email");
        if (/^[\s]*[\{\[]/.test(text))
          try {
            JSON.parse(text);
            tags.push("json");
          } catch (e) {}
        if (/function|const |let |var |=>|import |export /.test(text)) tags.push("code");
        return tags;
      }

      function renderHistory() {
        const search = document.getElementById("searchInput").value.toLowerCase();
        const filtered = history.filter((h) => h.content.toLowerCase().includes(search));
        const list = document.getElementById("historyList");

        document.getElementById("totalCount").textContent = history.length;
        document.getElementById("totalSize").textContent =
          (new Blob([JSON.stringify(history)]).size / 1024).toFixed(1) + " KB";

        if (filtered.length === 0) {
          list.innerHTML =
            '<div class="empty-state"><div style="font-size: 3rem; margin-bottom: 0.5rem;">📭</div><p>暂无剪贴板历史</p></div>';
          return;
        }

        list.innerHTML = filtered
          .map((item, i) => {
            const tagsHtml = item.tags
              ? item.tags.map((t) => '<span class="tag tag-' + t + '">' + t + "</span>").join("")
              : "";
            const time = new Date(item.timestamp).toLocaleString();
            const preview =
              item.content.length > 200 ? item.content.slice(0, 200) + "..." : item.content;
            return (
              '<div class="history-item" data-index="' +
              i +
              '">' +
              '<div class="content">' +
              escapeHtml(preview) +
              "</div>" +
              '<div class="meta">' +
              "<span>" +
              tagsHtml +
              time +
              "</span>" +
              '<div class="actions">' +
              '<button onclick="copyItem(' +
              i +
              ')">📋 复制</button>' +
              '<button onclick="deleteItem(' +
              i +
              ')">🗑️</button>' +
              "</div>" +
              "</div>" +
              "</div>"
            );
          })
          .join("");
      }

      window.addFromInput = function () {
        const t = document.getElementById("inputText").value;
        addToHistory(t);
        document.getElementById("inputText").value = "";
        showToast("已添加");
      };
      window.pasteFromClipboard = async function () {
        try {
          const t = await navigator.clipboard.readText();
          document.getElementById("inputText").value = t;
          addToHistory(t);
          showToast("已粘贴并添加");
        } catch (e) {
          showToast("无法读取剪贴板");
        }
      };
      window.copyItem = async function (i) {
        await navigator.clipboard.writeText(history[i].content);
        showToast("已复制");
      };
      window.deleteItem = function (i) {
        history.splice(i, 1);
        saveHistory();
        renderHistory();
      };
      window.clearHistory = function () {
        if (confirm("确定清空所有历史记录？")) {
          history = [];
          saveHistory();
          renderHistory();
        }
      };
      function exportHistory() {
        const b = new Blob([JSON.stringify(history, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.download = "clipboard-history.json";
        a.click();
      }
      window.escapeHtml = function (t) {
        const d = document.createElement("div");
        d.textContent = t;
        return d.innerHTML;
      };
      function showToast(m) {
        const t = document.createElement("div");
        t.className = "toast";
        t.textContent = m;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 2000);
      }
    
