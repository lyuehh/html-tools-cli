// @ts-nocheck
// Generated from tools/dev/api-tester.html
// Source SHA-256: 1387244d0024a0a8679d344ff078db5aef4a6d5f440970dda3d916c3f5ff5e50
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function switchTab(tab) {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach((t) => t.classList.remove("active"));
        document.querySelector(`.tab-content#${tab}-tab`).classList.add("active");
        event.target.classList.add("active");
      }
      function addHeader() {
        const html = `<div class="header-row"><input type="text" placeholder="键"><input type="text" placeholder="值"><button onclick="this.parentElement.remove()">删除</button></div>`;
        document.getElementById("headers-list").insertAdjacentHTML("beforeend", html);
      }
      function addParam() {
        const html = `<div class="header-row"><input type="text" placeholder="键"><input type="text" placeholder="值"><button onclick="this.parentElement.remove()">删除</button></div>`;
        document.getElementById("params-list").insertAdjacentHTML("beforeend", html);
      }
      async function sendRequest() {
        const method = document.getElementById("method").value;
        let url = document.getElementById("url").value;
        const headers = {};
        document.querySelectorAll("#headers-list .header-row").forEach((row) => {
          const inputs = row.querySelectorAll("input");
          if (inputs[0].value && inputs[1].value) headers[inputs[0].value] = inputs[1].value;
        });
        const params = new URLSearchParams();
        document.querySelectorAll("#params-list .header-row").forEach((row) => {
          const inputs = row.querySelectorAll("input");
          if (inputs[0].value) params.append(inputs[0].value, inputs[1].value);
        });
        if (params.toString()) url += "?" + params.toString();
        const options = { method, headers };
        if (["POST", "PUT", "PATCH"].includes(method)) {
          options.body = document.getElementById("requestBody").value;
        }
        const startTime = Date.now();
        try {
          const response = await fetch(url, options);
          const endTime = Date.now();
          const statusEl = document.getElementById("status");
          statusEl.textContent = `${response.status} ${response.statusText}`;
          statusEl.className = "status " + (response.ok ? "success" : "error");
          document.getElementById("responseTime").textContent = `${endTime - startTime}ms`;
          const text = await response.text();
          try {
            const json = JSON.parse(text);
            document.getElementById("responseBody").textContent = JSON.stringify(json, null, 2);
          } catch {
            document.getElementById("responseBody").textContent = text;
          }
          document.getElementById("response").style.display = "block";
        } catch (error) {
          document.getElementById("status").textContent = "Error";
          document.getElementById("status").className = "status error";
          document.getElementById("responseBody").textContent = error.message;
          document.getElementById("response").style.display = "block";
        }
      }
    
