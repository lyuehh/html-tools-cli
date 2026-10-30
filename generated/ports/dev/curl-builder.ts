// @ts-nocheck
// Generated from tools/dev/curl-builder.html
// Source SHA-256: 6bfdb8624ed133e568adc7b80ad434ddeedfb26484236332c9282a4ebfb62c1b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function getHeaders() {
        const rows = document.querySelectorAll("#headersList .header-row");
        const headers = [];
        rows.forEach((row) => {
          const inputs = row.querySelectorAll("input");
          const name = inputs[0].value.trim();
          const value = inputs[1].value.trim();
          if (name && value) {
            headers.push({ name, value });
          }
        });
        return headers;
      }

      function addHeader() {
        const list = document.getElementById("headersList");
        const row = document.createElement("div");
        row.className = "header-row";
        row.innerHTML = `
        <input type="text" placeholder="Header 名称" oninput="buildCurl()" />
        <input type="text" placeholder="Header 值" oninput="buildCurl()" />
        <button class="delete-btn" onclick="removeHeader(this)">×</button>
      `;
        list.appendChild(row);
      }

      function removeHeader(btn) {
        btn.parentElement.remove();
        buildCurl();
      }

      function buildCurl() {
        const method = document.getElementById("method").value;
        const url = document.getElementById("url").value.trim();
        const body = document.getElementById("body").value.trim();
        const authType = document.getElementById("authType").value;
        const authValue = document.getElementById("authValue").value.trim();
        const headers = getHeaders();

        const verbose = document.getElementById("optVerbose").checked;
        const insecure = document.getElementById("optInsecure").checked;
        const location = document.getElementById("optLocation").checked;
        const silent = document.getElementById("optSilent").checked;
        const outputEnabled = document.getElementById("optOutput").checked;
        const outputFile = document.getElementById("outputFile").value.trim();
        const timeout = document.getElementById("timeout").value.trim();

        document.getElementById("outputFileGroup").style.display = outputEnabled ? "block" : "none";

        let parts = ["curl"];

        // Method (skip for GET)
        if (method !== "GET") {
          parts.push(`-X ${method}`);
        }

        // Options
        if (verbose) parts.push("-v");
        if (insecure) parts.push("-k");
        if (location) parts.push("-L");
        if (silent) parts.push("-s");

        // Timeout
        if (timeout) {
          parts.push(`--max-time ${timeout}`);
        }

        // Auth
        if (authType === "basic" && authValue) {
          parts.push(`-u "${authValue}"`);
        } else if (authType === "bearer" && authValue) {
          parts.push(`-H "Authorization: Bearer ${authValue}"`);
        }

        // Headers
        headers.forEach((h) => {
          parts.push(`-H "${h.name}: ${h.value}"`);
        });

        // Body
        if (body && ["POST", "PUT", "PATCH"].includes(method)) {
          const escapedBody = body.replace(/"/g, '\\"');
          parts.push(`-d "${escapedBody}"`);
        }

        // Output file
        if (outputEnabled && outputFile) {
          parts.push(`-o ${outputFile}`);
        }

        // URL
        parts.push(`"${url || "https://example.com"}"`);

        document.getElementById("command").textContent = parts.join(" \\\n  ");
      }

      function copyCommand() {
        const cmd = document.getElementById("command").textContent.replace(/\\\n\s+/g, " ");
        navigator.clipboard.writeText(cmd);
      }

      function resetForm() {
        document.getElementById("method").value = "GET";
        document.getElementById("url").value = "";
        document.getElementById("body").value = "";
        document.getElementById("authType").value = "none";
        document.getElementById("authValue").value = "";
        document.getElementById("headersList").innerHTML = `
        <div class="header-row">
          <input type="text" placeholder="Header 名称" oninput="buildCurl()" />
          <input type="text" placeholder="Header 值" oninput="buildCurl()" />
          <button class="delete-btn" onclick="removeHeader(this)">×</button>
        </div>
      `;
        document.querySelectorAll(".checkbox-group input").forEach((cb) => (cb.checked = false));
        document.getElementById("optLocation").checked = true;
        document.getElementById("timeout").value = "";
        buildCurl();
      }

      buildCurl();

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
