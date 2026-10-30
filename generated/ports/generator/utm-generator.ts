// @ts-nocheck
// Generated from tools/generator/utm-generator.html
// Source SHA-256: 3efa4ff325c9c60590243bdf395c771cb1f99d8257ce450ddf396ca07315c0c2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      (function () {
        "use strict";

        const fields = [
          "websiteUrl",
          "utmSource",
          "utmMedium",
          "utmCampaign",
          "utmTerm",
          "utmContent"
        ];
        const outputUrl = document.getElementById("outputUrl");
        const paramsList = document.getElementById("paramsList");

        function generateUrl() {
          const url = document.getElementById("websiteUrl").value.trim();
          const source = document.getElementById("utmSource").value.trim();
          const medium = document.getElementById("utmMedium").value.trim();
          const campaign = document.getElementById("utmCampaign").value.trim();
          const term = document.getElementById("utmTerm").value.trim();
          const content = document.getElementById("utmContent").value.trim();

          if (!url) {
            outputUrl.value = "";
            paramsList.innerHTML = '<div style="color: var(--text-muted)">请输入网站 URL</div>';
            return;
          }

          // 构建 UTM 参数
          const params = new URLSearchParams();
          const paramsDisplay = [];

          if (source) {
            params.set("utm_source", source);
            paramsDisplay.push({ key: "utm_source", value: source });
          }
          if (medium) {
            params.set("utm_medium", medium);
            paramsDisplay.push({ key: "utm_medium", value: medium });
          }
          if (campaign) {
            params.set("utm_campaign", campaign);
            paramsDisplay.push({ key: "utm_campaign", value: campaign });
          }
          if (term) {
            params.set("utm_term", term);
            paramsDisplay.push({ key: "utm_term", value: term });
          }
          if (content) {
            params.set("utm_content", content);
            paramsDisplay.push({ key: "utm_content", value: content });
          }

          // 生成完整 URL
          try {
            const urlObj = new URL(url);
            // 合并现有参数
            params.forEach((value, key) => {
              urlObj.searchParams.set(key, value);
            });
            outputUrl.value = urlObj.toString();
          } catch (e) {
            // 如果 URL 无效，简单拼接
            const separator = url.includes("?") ? "&" : "?";
            const paramStr = params.toString();
            outputUrl.value = paramStr ? url + separator + paramStr : url;
          }

          // 更新参数预览
          if (paramsDisplay.length > 0) {
            paramsList.innerHTML = paramsDisplay
              .map(
                (p) =>
                  `<div class="param-item"><span class="param-key">${escapeHtml(p.key)}:</span><span class="param-value">${escapeHtml(p.value)}</span></div>`
              )
              .join("");
          } else {
            paramsList.innerHTML = '<div style="color: var(--text-muted)">未设置 UTM 参数</div>';
          }
        }

        function escapeHtml(str) {
          return String(str).replace(
            /[&<>"']/g,
            (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
          );
        }

        function setPreset(fieldId, value) {
          document.getElementById(fieldId).value = value;
          generateUrl();
        }

        function clearForm() {
          fields.forEach((id) => {
            document.getElementById(id).value = "";
          });
          generateUrl();
        }

        function copyUrl() {
          const url = outputUrl.value;
          if (!url) return;

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
        fields.forEach((id) => {
          document.getElementById(id).addEventListener("input", generateUrl);
        });

        // 暴露全局函数
        window.setPreset = setPreset;
        window.clearForm = clearForm;
        window.copyUrl = copyUrl;
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
    
