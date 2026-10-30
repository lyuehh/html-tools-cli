// @ts-nocheck
// Generated from tools/dev/string-builder.html
// Source SHA-256: b53b1896981866184a945e27b44e2b1c459ad58aed15666ac54d25afd760e834
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let parts = [];
      const $ = (id) => document.getElementById(id);
      function render() {
        $("partCount").textContent = parts.length + " 个";
        $("partsList").innerHTML = parts
          .map(
            (p, i) =>
              '<div class="part-item" draggable="true" data-index="' +
              i +
              '">' +
              '<span class="drag-handle">☰</span>' +
              '<input type="text" value="' +
              escapeHtml(p) +
              '" onchange="updatePart(' +
              i +
              ', this.value)">' +
              '<button class="remove-btn" onclick="removePart(' +
              i +
              ')">×</button>' +
              "</div>"
          )
          .join("");
        updateOutput();
        setupDragDrop();
      }
      function updateOutput() {
        const delimiter = $("delimiter").value;
        const perLine = parseInt($("perLine").value) || 0;
        const addQuotes = $("addQuotes").checked;
        let result = parts.map((p) => (addQuotes ? '"' + p + '"' : p));
        if (perLine > 0) {
          const lines = [];
          for (let i = 0; i < result.length; i += perLine) {
            lines.push(result.slice(i, i + perLine).join(delimiter));
          }
          $("outputArea").textContent = lines.join("\n");
        } else {
          $("outputArea").textContent = result.join(delimiter);
        }
      }
      function addPart(value) {
        const v = value || $("newPartInput").value.trim();
        if (v) {
          parts.push(v);
          $("newPartInput").value = "";
          render();
        }
      }
      window.updatePart = function (i, v) {
        parts[i] = v;
        updateOutput();
      };
      window.removePart = function (i) {
        parts.splice(i, 1);
        render();
      };
      window.addPreset = function (type) {
        switch (type) {
          case "prefix":
            parts.unshift("PREFIX_");
            break;
          case "suffix":
            parts.push("_SUFFIX");
            break;
          case "quote":
            parts.unshift('"');
            parts.push('"');
            break;
          case "bracket":
            parts.unshift("(");
            parts.push(")");
            break;
          case "newline":
            parts.push("\\n");
            break;
          case "tab":
            parts.push("\\t");
            break;
        }
        render();
      };
      window.copyOutput = function () {
        navigator.clipboard.writeText($("outputArea").textContent);
        alert("已复制");
      };
      window.clearAll = function () {
        if (confirm("确定清空?")) {
          parts = [];
          render();
        }
      };
      window.downloadOutput = function () {
        const blob = new Blob([$("outputArea").textContent], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "string-output.txt";
        a.click();
      };
      function setupDragDrop() {
        const items = document.querySelectorAll(".part-item");
        items.forEach((item) => {
          item.ondragstart = (e) => {
            e.dataTransfer.setData("text/plain", item.dataset.index);
            item.style.opacity = "0.5";
          };
          item.ondragend = () => {
            item.style.opacity = "1";
          };
          item.ondragover = (e) => e.preventDefault();
          item.ondrop = (e) => {
            e.preventDefault();
            const from = parseInt(e.dataTransfer.getData("text/plain"));
            const to = parseInt(item.dataset.index);
            if (from !== to) {
              const [moved] = parts.splice(from, 1);
              parts.splice(to, 0, moved);
              render();
            }
          };
        });
      }
      window.escapeHtml = function (t) {
        return t
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      };
      $("delimiter").oninput = updateOutput;
      $("perLine").oninput = updateOutput;
      $("addQuotes").onchange = updateOutput;
      $("newPartInput").onkeypress = (e) => {
        if (e.key === "Enter") addPart();
      };
      function loadTheme() {
        const t = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", t);
        $("themeToggle").textContent = t === "dark" ? "☀️" : "🌙";
      }
      window.toggleTheme = function () {
        const c = document.documentElement.getAttribute("data-theme");
        const n = c === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", n);
        localStorage.setItem("theme", n);
        $("themeToggle").textContent = n === "dark" ? "☀️" : "🌙";
      };
      $("themeToggle").onclick = toggleTheme;
      loadTheme();
      render();
    
