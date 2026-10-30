// @ts-nocheck
// Generated from tools/dev/url-parser.html
// Source SHA-256: 7928b208f345bf84a7e192481696c344223d2a4d178967f24ef52c090d528a79
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const examples = [
        "https://www.example.com/path/to/page",
        "https://api.example.com/v1/users?page=1&limit=10&sort=name",
        "https://user:password@secure.example.com:8443/admin",
        "https://search.example.com/results?q=%E4%B8%AD%E6%96%87&category=all&tags[]=js&tags[]=html#top",
        "http://[2001:db8::1]:8080/ipv6/test?enabled=true"
      ];

      let currentUrl = null;

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      (function () {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      window.setExample = function (index) {
        document.getElementById("urlInput").value = examples[index];
        parseUrl();
      };

      window.clearAll = function () {
        document.getElementById("urlInput").value = "";
        document.getElementById("result").style.display = "none";
        currentUrl = null;
      };

      function parseUrl() {
        const input = document.getElementById("urlInput").value.trim();
        if (!input) {
          showToast("请输入 URL", "error");
          return;
        }

        try {
          currentUrl = new URL(input);
          displayResult();
          document.getElementById("result").style.display = "block";
        } catch (e) {
          showToast("无效的 URL 格式", "error");
        }
      }

      function displayResult() {
        if (!currentUrl) return;

        // Structure visual
        let structure = "";
        structure += `<span class="protocol">${currentUrl.protocol.replace(":", "")}</span>`;
        structure += '<span class="sep">://</span>';
        if (currentUrl.username) {
          structure += `<span class="protocol">${currentUrl.username}</span>`;
          if (currentUrl.password) {
            structure += `<span class="sep">:</span><span class="protocol">${currentUrl.password}</span>`;
          }
          structure += '<span class="sep">@</span>';
        }
        structure += `<span class="host">${currentUrl.hostname}</span>`;
        if (currentUrl.port) {
          structure += `<span class="sep">:</span><span class="port">${currentUrl.port}</span>`;
        }
        if (currentUrl.pathname !== "/") {
          structure += `<span class="path">${currentUrl.pathname}</span>`;
        }
        if (currentUrl.search) {
          structure += `<span class="query">${currentUrl.search}</span>`;
        }
        if (currentUrl.hash) {
          structure += `<span class="hash">${currentUrl.hash}</span>`;
        }
        document.getElementById("structureVisual").innerHTML = structure;

        // Parts
        const parts = [
          "href",
          "protocol",
          "host",
          "hostname",
          "port",
          "origin",
          "pathname",
          "search",
          "hash",
          "username",
          "password"
        ];
        parts.forEach((part) => {
          const elem = document.getElementById(
            "part" + part.charAt(0).toUpperCase() + part.slice(1)
          );
          const value = currentUrl[part] || "";
          elem.textContent = value || "(空)";
          elem.className = value ? "part-value" : "part-value empty";
          elem.closest(".part-card").classList.toggle("highlight", !!value && value !== "/");
        });

        // Query params
        const params = currentUrl.searchParams;
        const paramsBody = document.getElementById("paramsBody");
        paramsBody.innerHTML = "";

        if ([...params].length > 0) {
          document.getElementById("paramsSection").style.display = "block";
          params.forEach((value, key) => {
            const tr = document.createElement("tr");
            const decoded = decodeURIComponent(value);
            tr.innerHTML = `
                        <td class="key">${escapeHtml(key)}</td>
                        <td class="value">${escapeHtml(value)}</td>
                        <td class="decoded">${value !== decoded ? escapeHtml(decoded) : "-"}</td>
                    `;
            paramsBody.appendChild(tr);
          });
        } else {
          document.getElementById("paramsSection").style.display = "none";
        }

        // Fill builder
        document.getElementById("buildProtocol").value = currentUrl.protocol.replace(":", "");
        document.getElementById("buildUsername").value = currentUrl.username;
        document.getElementById("buildPassword").value = currentUrl.password;
        document.getElementById("buildHostname").value = currentUrl.hostname;
        document.getElementById("buildPort").value = currentUrl.port;
        document.getElementById("buildPathname").value = currentUrl.pathname;
        document.getElementById("buildHash").value = currentUrl.hash.replace("#", "");

        const paramsArr = [];
        params.forEach((value, key) => paramsArr.push(`${key}=${value}`));
        document.getElementById("buildParams").value = paramsArr.join("\n");

        buildUrl();
      }

      window.switchTab = function (tab) {
        document.querySelectorAll(".tabs button").forEach((btn) => btn.classList.remove("active"));
        document
          .querySelector(`.tabs button[onclick="switchTab('${tab}')"]`)
          .classList.add("active");
        document.getElementById("parseTab").style.display = tab === "parse" ? "block" : "none";
        document.getElementById("buildTab").style.display = tab === "build" ? "block" : "none";
      };

      function buildUrl() {
        const protocol = document.getElementById("buildProtocol").value || "https";
        const username = document.getElementById("buildUsername").value;
        const password = document.getElementById("buildPassword").value;
        const hostname = document.getElementById("buildHostname").value || "example.com";
        const port = document.getElementById("buildPort").value;
        const pathname = document.getElementById("buildPathname").value || "/";
        const paramsText = document.getElementById("buildParams").value;
        const hash = document.getElementById("buildHash").value;

        let url = `${protocol}://`;
        if (username) {
          url += username;
          if (password) url += `:${password}`;
          url += "@";
        }
        url += hostname;
        if (port) url += `:${port}`;
        url += pathname.startsWith("/") ? pathname : `/${pathname}`;

        if (paramsText.trim()) {
          const params = paramsText
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.includes("="))
            .join("&");
          if (params) url += `?${params}`;
        }

        if (hash) url += `#${hash}`;

        document.getElementById("builtUrl").textContent = url;
      }

      window.copyBuiltUrl = function () {
        const url = document.getElementById("builtUrl").textContent;
        navigator.clipboard.writeText(url);
        showToast("URL 已复制");
      };

      window.useBuiltUrl = function () {
        document.getElementById("urlInput").value = document.getElementById("builtUrl").textContent;
        switchTab("parse");
        parseUrl();
      };

      window.copyPart = function (part) {
        const elem = document.getElementById("part" + part.charAt(0).toUpperCase() + part.slice(1));
        const value = elem.textContent;
        if (value && value !== "(空)") {
          navigator.clipboard.writeText(value);
          showToast("已复制");
        }
      };

      window.escapeHtml = function (text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      function showToast(message, type = "success") {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.style.background = type === "error" ? "#ef4444" : "#10b981";
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Auto parse on input
      document.getElementById("urlInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") parseUrl();
      });

      // Init with example
      setExample(1);
    
