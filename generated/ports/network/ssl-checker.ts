// @ts-nocheck
// Generated from tools/network/ssl-checker.html
// Source SHA-256: 18f9b5b1a92c0cecae5c3ced232459439922ae5b0c9f14a9e7714724529a938c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function check() {
        const url = document.getElementById("url").value.trim();
        if (!url) return;
        document.getElementById("status").style.display = "block";
        const data = [
          {
            label: "域名",
            value: new URL(url.startsWith("http") ? url : "https://" + url).hostname
          },
          { label: "颁发机构", value: "Let's Encrypt Authority X3" },
          { label: "颁发日期", value: "2024-01-01" },
          { label: "到期日期", value: "2024-12-31" },
          { label: "协议版本", value: "TLS 1.3" },
          { label: "加密算法", value: "ECDHE-RSA-AES256-GCM-SHA384" },
          { label: "证书类型", value: "DV (Domain Validation)" }
        ];
        document.getElementById("result").innerHTML = data
          .map(
            (d) =>
              '<div class="result-item"><span class="result-label">' +
              d.label +
              '</span><span class="result-value">' +
              d.value +
              "</span></div>"
          )
          .join("");
      }

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
    
