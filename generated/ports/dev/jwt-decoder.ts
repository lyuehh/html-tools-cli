// @ts-nocheck
// Generated from tools/dev/jwt-decoder.html
// Source SHA-256: 542200b08ae81ceee1a533cceb4b7ec1f5b7b2900453a8a60d610dbb7d4dc7bf
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // JWT Decoding
      // ============================================
      function decode() {
        const jwt = document.getElementById("jwt").value.trim();
        const statusEl = document.getElementById("status");

        if (!jwt) {
          ["header", "payload", "signature"].forEach(
            (id) => (document.getElementById(id).textContent = "-")
          );
          statusEl.textContent = "";
          statusEl.className = "status";
          return;
        }

        try {
          const parts = jwt.split(".");
          if (parts.length !== 3) {
            throw new Error("无效的 JWT: 必须包含 3 部分 (header.payload.signature)");
          }

          // Decode header
          const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));

          // Decode payload
          const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));

          // Display parts
          document.getElementById("header").textContent = JSON.stringify(header, null, 2);

          let payloadText = JSON.stringify(payload, null, 2);
          if (payload.exp) {
            const expDate = new Date(payload.exp * 1000);
            const now = new Date();
            const isExpired = expDate < now;
            payloadText += "\n\n过期时间: " + expDate.toLocaleString();
            payloadText += "\n状态: " + (isExpired ? "已过期" : "有效");
          }

          document.getElementById("payload").textContent = payloadText;
          document.getElementById("signature").textContent = parts[2].substring(0, 50) + "...";

          statusEl.textContent = "解析成功";
          statusEl.className = "status success";
        } catch (e) {
          document.getElementById("header").textContent = "解析错误";
          document.getElementById("payload").textContent = e.message;
          document.getElementById("signature").textContent = "-";

          statusEl.textContent = "错误: " + e.message;
          statusEl.className = "status error";
        }
      }

      // ============================================
      // Theme Management
      // ============================================
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // ============================================
      // Initialize
      // ============================================
      initTheme();
    
