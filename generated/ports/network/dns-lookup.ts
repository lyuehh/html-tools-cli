// @ts-nocheck
// Generated from tools/network/dns-lookup.html
// Source SHA-256: 9818471299352dd4df03ac0aa5c39dcd3f9943295afeb1c5e46c80483fbf590e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Toggle record type selection
      document.querySelectorAll(".type-btn").forEach((btn) => {
        btn.onclick = () => btn.classList.toggle("active");
      });

      async function lookupDNS() {
        const domain = document.getElementById("domainInput").value.trim();
        if (!domain) {
          alert("请输入域名");
          return;
        }

        // Remove protocol if present
        const cleanDomain = domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "");

        const types = Array.from(document.querySelectorAll(".type-btn.active")).map(
          (btn) => btn.dataset.type
        );

        if (types.length === 0) {
          alert("请至少选择一种记录类型");
          return;
        }

        document.getElementById("results").innerHTML = '<div class="loading">🔄 正在查询...</div>';

        const results = {};

        // Use Cloudflare DNS over HTTPS API
        for (const type of types) {
          try {
            const response = await fetch(
              `https://cloudflare-dns.com/dns-query?name=${cleanDomain}&type=${type}`,
              {
                headers: {
                  Accept: "application/dns-json"
                }
              }
            );
            const data = await response.json();

            if (data.Answer && data.Answer.length > 0) {
              results[type] = data.Answer;
            }
          } catch (e) {
            console.error(`Error fetching ${type}:`, e);
          }
        }

        displayResults(results, cleanDomain);
      }

      function displayResults(results, domain) {
        if (Object.keys(results).length === 0) {
          document.getElementById("results").innerHTML = `
                    <div class="error">
                        未找到 ${domain} 的DNS记录，或查询失败。请检查域名是否正确。
                    </div>
                `;
          return;
        }

        const typeNames = {
          1: "A",
          28: "AAAA",
          5: "CNAME",
          15: "MX",
          2: "NS",
          16: "TXT",
          6: "SOA"
        };

        const typeEmojis = {
          A: "🔢",
          AAAA: "🌐",
          CNAME: "🔗",
          MX: "📧",
          NS: "🖥️",
          TXT: "📝",
          SOA: "📋"
        };

        let html = `<div style="margin-bottom: 16px; color: #666;">查询域名: <strong>${domain}</strong></div>`;

        for (const [type, records] of Object.entries(results)) {
          html += `
                    <div class="result-section">
                        <h3>${typeEmojis[type] || "📄"} ${type} 记录 (${records.length}条)</h3>
                `;

          records.forEach((record) => {
            const recordType = typeNames[record.type] || type;
            html += `
                        <div class="record">
                            <span class="record-type">${recordType}</span>
                            <span class="record-value">${formatRecordData(record.data, type)}</span>
                            <div class="record-ttl">TTL: ${record.TTL}秒 (${formatTTL(record.TTL)})</div>
                        </div>
                    `;
          });

          html += "</div>";
        }

        document.getElementById("results").innerHTML = html;
      }

      function formatRecordData(data, type) {
        // Clean up the data
        if (typeof data === "string") {
          // Remove surrounding quotes from TXT records
          if (data.startsWith('"') && data.endsWith('"')) {
            data = data.slice(1, -1);
          }
        }
        return data;
      }

      function formatTTL(seconds) {
        if (seconds < 60) return `${seconds}秒`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}小时`;
        return `${Math.floor(seconds / 86400)}天`;
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
    
