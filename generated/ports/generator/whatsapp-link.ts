// @ts-nocheck
// Generated from tools/generator/whatsapp-link.html
// Source SHA-256: 81c4b1fa205b5be7fa78cee3209d3be080de642ed30511c8ecedc59bc755ace5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      (function () {
        "use strict";

        const countryCode = document.getElementById("countryCode");
        const phoneNumber = document.getElementById("phoneNumber");
        const message = document.getElementById("message");
        const outputUrl = document.getElementById("outputUrl");
        const previewPhone = document.getElementById("previewPhone");
        const previewMessage = document.getElementById("previewMessage");

        function formatPhoneDisplay(code, number) {
          const cleaned = number.replace(/\D/g, "");
          if (!cleaned) return `+${code}`;

          // 简单格式化显示
          let formatted = cleaned;
          if (cleaned.length > 7) {
            formatted = cleaned.slice(0, 3) + " " + cleaned.slice(3, 7) + " " + cleaned.slice(7);
          } else if (cleaned.length > 3) {
            formatted = cleaned.slice(0, 3) + " " + cleaned.slice(3);
          }
          return `+${code} ${formatted}`;
        }

        function generateUrl() {
          const code = countryCode.value;
          const number = phoneNumber.value.replace(/\D/g, "");
          const msg = message.value.trim();

          // 更新预览
          previewPhone.textContent = formatPhoneDisplay(code, number);

          if (msg) {
            previewMessage.textContent = msg;
            previewMessage.classList.remove("empty");
          } else {
            previewMessage.textContent = "(无预设消息)";
            previewMessage.classList.add("empty");
          }

          // 生成链接
          if (!number) {
            outputUrl.value = "";
            return;
          }

          let url = `https://wa.me/${code}${number}`;
          if (msg) {
            url += `?text=${encodeURIComponent(msg)}`;
          }
          outputUrl.value = url;
        }

        function openWhatsApp() {
          const url = outputUrl.value;
          if (!url) {
            alert("请先输入手机号码");
            return;
          }
          window.open(url, "_blank");
        }

        function copyUrl() {
          const url = outputUrl.value;
          if (!url) {
            alert("请先输入手机号码");
            return;
          }

          navigator.clipboard.writeText(url).then(() => {
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = "已复制!";
            setTimeout(() => {
              btn.textContent = originalText;
            }, 1500);
          });
        }

        // 绑定事件
        countryCode.addEventListener("change", generateUrl);
        phoneNumber.addEventListener("input", generateUrl);
        message.addEventListener("input", generateUrl);

        // 暴露全局函数
        window.openWhatsApp = openWhatsApp;
        window.copyUrl = copyUrl;

        // 初始化
        generateUrl();
      })();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
