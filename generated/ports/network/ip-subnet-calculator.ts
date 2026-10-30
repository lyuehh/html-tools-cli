// @ts-nocheck
// Generated from tools/network/ip-subnet-calculator.html
// Source SHA-256: 436eeaecae3776ded78593671d87480779723dc34635347c4902e4b532536fd0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function getIpValue() {
        return [
          parseInt(document.getElementById("ip1").value) || 0,
          parseInt(document.getElementById("ip2").value) || 0,
          parseInt(document.getElementById("ip3").value) || 0,
          parseInt(document.getElementById("ip4").value) || 0
        ];
      }

      function ipToInt(ip) {
        return (ip[0] << 24) + (ip[1] << 16) + (ip[2] << 8) + ip[3];
      }

      function intToIp(int) {
        return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255];
      }

      function ipToString(ip) {
        return ip.join(".");
      }

      function ipToBinary(ip) {
        return ip.map((octet) => octet.toString(2).padStart(8, "0"));
      }

      function setCidr(value) {
        document.getElementById("cidr").value = value;
        calculate();
      }

      function calculate() {
        const ip = getIpValue();
        const cidr = parseInt(document.getElementById("cidr").value) || 24;

        // Validate
        if (ip.some((o) => o < 0 || o > 255) || cidr < 0 || cidr > 32) {
          document.getElementById("results").innerHTML =
            '<div class="result-item"><div class="value" style="color: #dc3545;">输入无效</div></div>';
          return;
        }

        const ipInt = ipToInt(ip);
        const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
        const wildcard = ~mask >>> 0;

        const networkInt = (ipInt & mask) >>> 0;
        const broadcastInt = (networkInt | wildcard) >>> 0;
        const firstHostInt = networkInt + 1;
        const lastHostInt = broadcastInt - 1;

        const networkIp = intToIp(networkInt);
        const broadcastIp = intToIp(broadcastInt);
        const maskIp = intToIp(mask);
        const wildcardIp = intToIp(wildcard);
        const firstHostIp = intToIp(firstHostInt);
        const lastHostIp = intToIp(lastHostInt);

        const totalHosts = Math.pow(2, 32 - cidr);
        const usableHosts = totalHosts > 2 ? totalHosts - 2 : 0;

        // Determine IP class
        let ipClass = "A";
        if (ip[0] >= 128 && ip[0] <= 191) ipClass = "B";
        else if (ip[0] >= 192 && ip[0] <= 223) ipClass = "C";
        else if (ip[0] >= 224 && ip[0] <= 239) ipClass = "D (多播)";
        else if (ip[0] >= 240) ipClass = "E (保留)";

        // Check if private
        let isPrivate = false;
        if (ip[0] === 10) isPrivate = true;
        else if (ip[0] === 172 && ip[1] >= 16 && ip[1] <= 31) isPrivate = true;
        else if (ip[0] === 192 && ip[1] === 168) isPrivate = true;

        document.getElementById("results").innerHTML = `
        <div class="result-item highlight">
          <div class="label">网络地址</div>
          <div class="value">${ipToString(networkIp)}</div>
        </div>
        <div class="result-item highlight">
          <div class="label">广播地址</div>
          <div class="value">${ipToString(broadcastIp)}</div>
        </div>
        <div class="result-item">
          <div class="label">子网掩码</div>
          <div class="value">${ipToString(maskIp)}</div>
        </div>
        <div class="result-item">
          <div class="label">通配符掩码</div>
          <div class="value">${ipToString(wildcardIp)}</div>
        </div>
        <div class="result-item">
          <div class="label">可用主机范围</div>
          <div class="value">${cidr < 31 ? `${ipToString(firstHostIp)} - ${ipToString(lastHostIp)}` : "N/A"}</div>
        </div>
        <div class="result-item">
          <div class="label">可用主机数</div>
          <div class="value">${usableHosts.toLocaleString()}</div>
        </div>
        <div class="result-item">
          <div class="label">IP 总数</div>
          <div class="value">${totalHosts.toLocaleString()}</div>
        </div>
        <div class="result-item">
          <div class="label">IP 类别</div>
          <div class="value">${ipClass}${isPrivate ? " (私有)" : " (公网)"}</div>
        </div>
        <div class="result-item">
          <div class="label">CIDR 表示</div>
          <div class="value">${ipToString(networkIp)}/${cidr}</div>
        </div>
      `;

        // Binary view
        const ipBinary = ipToBinary(ip);
        const maskBinary = ipToBinary(maskIp);
        const networkBinary = ipToBinary(networkIp);

        document.getElementById("binaryView").innerHTML = `
        <h4>二进制视图</h4>
        <div class="binary-row">
          <span class="label">IP 地址:</span>
          <div class="value">${ipBinary.map((b, i) => `<span class="octet ${i < Math.floor(cidr / 8) ? "network" : i === Math.floor(cidr / 8) ? "" : "host"}">${b}</span>`).join("")}</div>
        </div>
        <div class="binary-row">
          <span class="label">子网掩码:</span>
          <div class="value">${maskBinary.map((b) => `<span class="octet">${b}</span>`).join("")}</div>
        </div>
        <div class="binary-row">
          <span class="label">网络地址:</span>
          <div class="value">${networkBinary.map((b, i) => `<span class="octet ${i < Math.floor(cidr / 8) ? "network" : "host"}">${b}</span>`).join("")}</div>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 12px;">
          <span style="color: var(--accent-cyan);">■</span> 网络位 (${cidr} 位) &nbsp;
          <span style="color: var(--accent-green);">■</span> 主机位 (${32 - cidr} 位)
        </p>
      `;
      }

      calculate();

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
    
