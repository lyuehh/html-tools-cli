// @ts-nocheck
// Generated from tools/dev/basic-auth-generator.html
// Source SHA-256: 349b09db7361fc4ff10aa744c3d519d64d96459966ec7dff8731f62f9de7f46b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const usernameEl = document.getElementById("username");
      const passwordEl = document.getElementById("password");
      const resultsEl = document.getElementById("results");
      const base64ValueEl = document.getElementById("base64Value");
      const authHeaderEl = document.getElementById("authHeader");
      const curlCmdEl = document.getElementById("curlCmd");
      const fetchExampleEl = document.getElementById("fetchExample");

      window.generate = function () {
        const username = usernameEl.value;
        const password = passwordEl.value;

        if (!username) {
          resultsEl.style.display = "none";
          return;
        }

        const credentials = username + ":" + password;
        const base64 = btoa(credentials);
        const authValue = "Basic " + base64;

        base64ValueEl.textContent = base64;
        authHeaderEl.textContent = authValue;
        curlCmdEl.textContent =
          'curl -H "Authorization: ' + authValue + '" https://api.example.com';
        fetchExampleEl.textContent =
          'fetch(url, { headers: { "Authorization": "' + authValue + '" } })';

        resultsEl.style.display = "block";
      };

      document.getElementById("btnGenerate").addEventListener("click", generate);

      usernameEl.addEventListener("input", generate);
      passwordEl.addEventListener("input", generate);

      usernameEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          passwordEl.focus();
        }
      });
      passwordEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          generate();
        }
      });

      document.getElementById("btnClear").addEventListener("click", function () {
        usernameEl.value = "";
        passwordEl.value = "";
        resultsEl.style.display = "none";
        usernameEl.focus();
      });

      document.querySelectorAll(".copy-btn").forEach(function (btn) {
        btn.addEventListener("click", async function () {
          const targetId = btn.getAttribute("data-target");
          const text = document.getElementById(targetId).textContent;
          try {
            await navigator.clipboard.writeText(text);
            const original = btn.textContent;
            btn.textContent = "✓";
            setTimeout(function () {
              btn.textContent = original;
            }, 1000);
          } catch (e) {}
        });
      });

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
    
