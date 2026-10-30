// @ts-nocheck
// Generated from tools/design/button-generator.html
// Source SHA-256: 8f43bca82c2863777a994057dd49af4445f4b7f6e33d44354084b451cc1e54fc
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 主题切换
      function toggleTheme() {
        const body = document.body;
        const isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      // 加载主题
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      // 更新预览
      function updatePreview() {
        const color1 = document.getElementById("color1").value;
        const color2 = document.getElementById("color2").value;
        const size = document.getElementById("size").value;
        const radius = document.getElementById("radius").value;

        document.getElementById("sizeValue").textContent = size + "px";
        document.getElementById("radiusValue").textContent = radius + "px";

        const preview = document.getElementById("preview");
        preview.style.width = size + "px";
        preview.style.height = size + "px";
        preview.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
        preview.style.borderRadius = radius + "px";

        updateCode();
      }

      // 更新代码
      function updateCode() {
        const color1 = document.getElementById("color1").value;
        const color2 = document.getElementById("color2").value;
        const size = document.getElementById("size").value;
        const radius = document.getElementById("radius").value;

        const css = `.element {
    width: ${size}px;
    height: ${size}px;
    background: linear-gradient(135deg, ${color1}, ${color2});
    border-radius: ${radius}px;
  }`;

        document.getElementById("codeOutput").textContent = css;
      }

      // 复制代码
      function copyCode() {
        const code = document.getElementById("codeOutput").textContent;
        navigator.clipboard.writeText(code).then(() => {
          showToast("已复制到剪贴板");
        });
      }

      // 显示提示
      function showToast(msg) {
        const toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // 重置
      function resetAll() {
        document.getElementById("color1").value = "#a855f7";
        document.getElementById("color2").value = "#00f5d4";
        document.getElementById("size").value = 200;
        document.getElementById("radius").value = 8;
        updatePreview();
      }

      // 初始化
      updatePreview();
    
