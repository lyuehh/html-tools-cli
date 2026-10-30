// @ts-nocheck
// Generated from tools/security/sitemap-generator.html
// Source SHA-256: 541831fa8625bac858c38c5826577523a907494e83649bfba9561f54601112e7
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        const themeToggle = document.querySelector(".theme-toggle");
        if (themeToggle) themeToggle.textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      const savedTheme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);
      const themeToggle = document.querySelector(".theme-toggle");
      if (themeToggle) themeToggle.textContent = savedTheme === "light" ? "🌙" : "☀️";

      // 状态
      const state = {
        urls: []
      };

      function addUrl(path = "/", freq = "", priority = "", lastmod = "") {
        const id = Date.now() + Math.random();
        state.urls.push({
          id,
          path,
          freq,
          priority,
          lastmod
        });
        renderUrls();
        generateOutput();
      }

      function removeUrl(id) {
        state.urls = state.urls.filter((u) => u.id !== id);
        renderUrls();
        generateOutput();
      }

      window.updatePriorityDisplay = function (input, displayId) {
        document.getElementById(displayId).textContent = input.value;
      };

      function renderUrls() {
        const container = document.getElementById("urlContainer");
        container.textContent = "";
        document.getElementById("urlCount").textContent = state.urls.length;

        state.urls.forEach((url, index) => {
          const entry = document.createElement("div");
          entry.className = "url-entry";

          // Header
          const header = document.createElement("div");
          header.className = "url-entry-header";

          const pathInput = document.createElement("input");
          pathInput.type = "text";
          pathInput.value = url.path;
          pathInput.placeholder = "/page-path";
          pathInput.oninput = function () {
            url.path = this.value;
            generateOutput();
          };

          const removeBtn = document.createElement("button");
          removeBtn.className = "secondary outline";
          removeBtn.textContent = "🗑️";
          removeBtn.onclick = function () {
            removeUrl(url.id);
          };

          header.appendChild(pathInput);
          header.appendChild(removeBtn);
          entry.appendChild(header);

          // Options
          const options = document.createElement("div");
          options.className = "url-options";

          // Lastmod
          const lastmodDiv = document.createElement("div");
          lastmodDiv.className = "url-option";
          const lastmodLabel = document.createElement("label");
          lastmodLabel.textContent = "最后修改日期";
          const lastmodInput = document.createElement("input");
          lastmodInput.type = "date";
          lastmodInput.value = url.lastmod;
          lastmodInput.onchange = function () {
            url.lastmod = this.value;
            generateOutput();
          };
          lastmodDiv.appendChild(lastmodLabel);
          lastmodDiv.appendChild(lastmodInput);
          options.appendChild(lastmodDiv);

          // Frequency
          const freqDiv = document.createElement("div");
          freqDiv.className = "url-option";
          const freqLabel = document.createElement("label");
          freqLabel.textContent = "更新频率";
          const freqSelect = document.createElement("select");
          const freqOptions = [
            { value: "", label: "使用默认" },
            { value: "always", label: "always (始终)" },
            { value: "hourly", label: "hourly (每小时)" },
            { value: "daily", label: "daily (每天)" },
            { value: "weekly", label: "weekly (每周)" },
            { value: "monthly", label: "monthly (每月)" },
            { value: "yearly", label: "yearly (每年)" },
            { value: "never", label: "never (从不)" }
          ];
          freqOptions.forEach((opt) => {
            const option = document.createElement("option");
            option.value = opt.value;
            option.textContent = opt.label;
            option.selected = opt.value === url.freq;
            freqSelect.appendChild(option);
          });
          freqSelect.onchange = function () {
            url.freq = this.value;
            generateOutput();
          };
          freqDiv.appendChild(freqLabel);
          freqDiv.appendChild(freqSelect);
          options.appendChild(freqDiv);

          // Priority
          const priorityDiv = document.createElement("div");
          priorityDiv.className = "url-option";
          const priorityLabel = document.createElement("label");
          priorityLabel.textContent = "优先级";
          const prioritySlider = document.createElement("div");
          prioritySlider.className = "priority-slider";
          const priorityInput = document.createElement("input");
          priorityInput.type = "range";
          priorityInput.min = "0";
          priorityInput.max = "1";
          priorityInput.step = "0.1";
          priorityInput.value = url.priority || "0.5";
          const priorityValue = document.createElement("span");
          priorityValue.className = "priority-value";
          priorityValue.textContent = url.priority || "默认";
          priorityInput.oninput = function () {
            url.priority = this.value;
            priorityValue.textContent = this.value;
            generateOutput();
          };
          prioritySlider.appendChild(priorityInput);
          prioritySlider.appendChild(priorityValue);
          priorityDiv.appendChild(priorityLabel);
          priorityDiv.appendChild(prioritySlider);
          options.appendChild(priorityDiv);

          entry.appendChild(options);
          container.appendChild(entry);
        });
      }

      function toggleBulkAdd() {
        const section = document.getElementById("bulkAddSection");
        section.style.display = section.style.display === "none" ? "block" : "none";
      }

      window.processBulkUrls = function () {
        const text = document.getElementById("bulkUrls").value;
        const lines = text
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l);

        lines.forEach((line) => {
          if (line.startsWith("/") || line.startsWith("http")) {
            const path = line.startsWith("http") ? new URL(line).pathname : line;
            if (!state.urls.some((u) => u.path === path)) {
              addUrl(path);
            }
          }
        });

        document.getElementById("bulkUrls").value = "";
        toggleBulkAdd();
      };

      window.addCommonPages = function () {
        const commonPages = [
          "/",
          "/about",
          "/contact",
          "/products",
          "/services",
          "/blog",
          "/faq",
          "/privacy",
          "/terms"
        ];
        commonPages.forEach((page) => {
          if (!state.urls.some((u) => u.path === page)) {
            addUrl(page);
          }
        });
      };

      function generateOutput() {
        const baseUrl = document.getElementById("baseUrl").value.trim().replace(/\/$/, "");
        const defaultFreq = document.getElementById("defaultFreq").value;
        const defaultPriority = document.getElementById("defaultPriority").value;

        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        state.urls.forEach((url) => {
          const fullUrl = baseUrl + (url.path.startsWith("/") ? url.path : "/" + url.path);
          const freq = url.freq || defaultFreq;
          const priority = url.priority || defaultPriority;

          xml += "  <url>\n";
          xml += "    <loc>" + escapeXml(fullUrl) + "</loc>\n";

          if (url.lastmod) {
            xml += "    <lastmod>" + url.lastmod + "</lastmod>\n";
          }

          xml += "    <changefreq>" + freq + "</changefreq>\n";
          xml += "    <priority>" + priority + "</priority>\n";
          xml += "  </url>\n";
        });

        xml += "</urlset>";

        document.getElementById("outputContent").textContent = xml;
      }

      function escapeXml(str) {
        return str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&apos;");
      }

      window.copyOutput = function () {
        const output = document.getElementById("outputContent").textContent;
        navigator.clipboard.writeText(output).then(function () {
          showToast("已复制到剪贴板");
        });
      };

      window.downloadOutput = function () {
        const output = document.getElementById("outputContent").textContent;
        const blob = new Blob([output], { type: "application/xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sitemap.xml";
        a.click();
        URL.revokeObjectURL(url);
      };

      window.validateOutput = function () {
        const output = document.getElementById("outputContent").textContent;
        const errors = [];

        if (output.indexOf("<?xml") !== 0) {
          errors.push("缺少 XML 声明");
        }

        if (output.indexOf("<urlset") === -1) {
          errors.push("缺少 urlset 根元素");
        }

        if (output.indexOf('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"') === -1) {
          errors.push("缺少正确的命名空间");
        }

        const urlCount = (output.match(/<url>/g) || []).length;
        if (urlCount === 0) {
          errors.push("没有任何 URL 条目");
        } else if (urlCount > 50000) {
          errors.push("URL 数量超过 50,000 限制");
        }

        // 检查标签配对
        const openTags = (output.match(/<url>/g) || []).length;
        const closeTags = (output.match(/<\/url>/g) || []).length;
        if (openTags !== closeTags) {
          errors.push("url 标签未正确闭合");
        }

        if (errors.length === 0) {
          showToast("✅ 格式验证通过！共 " + urlCount + " 个 URL");
        } else {
          alert("发现以下问题：\n\n" + errors.join("\n"));
        }
      };

      function showToast(message) {
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.style.cssText =
          "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#10b981;color:white;padding:0.75rem 1.5rem;border-radius:8px;z-index:1000;";
        document.body.appendChild(toast);
        setTimeout(function () {
          toast.remove();
        }, 2000);
      }

      // 初始化
      addUrl("/", "", "1.0", new Date().toISOString().split("T")[0]);
    
