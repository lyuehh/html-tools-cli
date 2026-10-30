// @ts-nocheck
// Generated from tools/dev/html-entity.html
// Source SHA-256: c0f0f8ec85dd584de1c70488653d0bc93998150e24dbbea76df1d69bfb47195b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const entityTable = document.getElementById("entityTable");

      const COMMON_ENTITIES = [
        ["<", "&lt;"],
        [">", "&gt;"],
        ["&", "&amp;"],
        ['"', "&quot;"],
        ["'", "&apos;"],
        [" ", "&nbsp;"],
        ["©", "&copy;"],
        ["®", "&reg;"],
        ["™", "&trade;"],
        ["€", "&euro;"],
        ["£", "&pound;"],
        ["¥", "&yen;"],
        ["°", "&deg;"],
        ["±", "&plusmn;"],
        ["×", "&times;"],
        ["÷", "&divide;"],
        ["←", "&larr;"],
        ["→", "&rarr;"],
        ["↑", "&uarr;"],
        ["↓", "&darr;"],
        ["♠", "&spades;"],
        ["♣", "&clubs;"],
        ["♥", "&hearts;"],
        ["♦", "&diams;"]
      ];

      function encodeHTML(str) {
        return str.replace(/[<>&"'\u00A0-\u9999]/g, (char) => {
          const code = char.charCodeAt(0);
          switch (char) {
            case "<":
              return "&lt;";
            case ">":
              return "&gt;";
            case "&":
              return "&amp;";
            case '"':
              return "&quot;";
            case "'":
              return "&apos;";
            default:
              return "&#" + code + ";";
          }
        });
      }

      function decodeHTML(str) {
        // 使用 DOMParser 安全解码
        const doc = new DOMParser().parseFromString(str, "text/html");
        return doc.documentElement.textContent;
      }

      function encode() {
        const text = inputEl.value;
        if (!text) {
          showStatus("请输入内容", "error");
          return;
        }
        outputEl.value = encodeHTML(text);
        showStatus("编码成功", "success");
      }

      window.decode = function () {
        const text = inputEl.value;
        if (!text) {
          showStatus("请输入内容", "error");
          return;
        }
        outputEl.value = decodeHTML(text);
        showStatus("解码成功", "success");
      };

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // 渲染常用实体表
      COMMON_ENTITIES.forEach(([char, entity]) => {
        const item = document.createElement("div");
        item.className = "entity-item";
        item.onclick = async () => {
          try {
            await navigator.clipboard.writeText(entity);
            showStatus("已复制: " + entity, "success");
          } catch (e) {
            showStatus("复制失败", "error");
          }
        };

        const charSpan = document.createElement("span");
        charSpan.className = "entity-char";
        charSpan.textContent = char;

        const codeSpan = document.createElement("span");
        codeSpan.className = "entity-code";
        codeSpan.textContent = entity;

        item.appendChild(charSpan);
        item.appendChild(codeSpan);
        entityTable.appendChild(item);
      });

      // 事件绑定
      document.getElementById("btnPaste").onclick = async () => {
        try {
          const text = await navigator.clipboard.readText();
          inputEl.value = text;
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnEncode").onclick = encode;
      document.getElementById("btnDecode").onclick = decode;

      document.getElementById("btnCopy").onclick = async () => {
        if (!outputEl.value) {
          showStatus("没有可复制的内容", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(outputEl.value);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = () => {
        inputEl.value = "";
        outputEl.value = "";
        showStatus("已清空", "success");
      };

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "dark" ? "" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next || "light");
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
          document.documentElement.setAttribute("data-theme", "dark");
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = "🌙";
        }
      })();
    
