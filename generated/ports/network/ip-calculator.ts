// @ts-nocheck
// Generated from tools/network/ip-calculator.html
// Source SHA-256: 29007d1d21d5d0d5ab107c7120af36e9f0440a626c66de6fe7e6212a6aba0996
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const $ = (id) => document.getElementById(id);
      function ipToInt(ip) {
        return ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct), 0) >>> 0;
      }
      function intToIp(int) {
        return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join(".");
      }
      function ipToBinary(ip) {
        return ip
          .split(".")
          .map((o) => parseInt(o).toString(2).padStart(8, "0"))
          .join(".");
      }
      function cidrToMask(cidr) {
        return (~0 << (32 - cidr)) >>> 0;
      }
      function maskToCidr(mask) {
        return (mask.toString(2).match(/1/g) || []).length;
      }
      function parseMask(input) {
        input = input.trim();
        if (input.startsWith("/")) return parseInt(input.slice(1));
        if (input.includes(".")) return maskToCidr(ipToInt(input));
        return parseInt(input);
      }
      window.setMask = function (m) {
        $("maskInput").value = m;
        calculate();
      };
      window.calculate = function () {
        const ipStr = $("ipInput").value.trim();
        const maskStr = $("maskInput").value.trim();
        if (!ipStr || !maskStr) return;
        const ipParts = ipStr.split(".");
        if (ipParts.length !== 4 || ipParts.some((p) => isNaN(p) || p < 0 || p > 255)) {
          $("results").innerHTML =
            '<div class="result-card"><h3>错误</h3><p>无效的 IP 地址格式</p></div>';
          return;
        }
        const ip = ipToInt(ipStr);
        const cidr = parseMask(maskStr);
        if (isNaN(cidr) || cidr < 0 || cidr > 32) {
          $("results").innerHTML =
            '<div class="result-card"><h3>错误</h3><p>无效的子网掩码</p></div>';
          return;
        }
        const mask = cidrToMask(cidr);
        const network = (ip & mask) >>> 0;
        const broadcast = (network | ~mask) >>> 0;
        const firstHost = network + 1;
        const lastHost = broadcast - 1;
        const totalHosts = Math.pow(2, 32 - cidr);
        const usableHosts = cidr < 31 ? totalHosts - 2 : cidr === 31 ? 2 : 1;
        const wildcard = ~mask >>> 0;
        // Determine class
        const firstOctet = (ip >>> 24) & 255;
        let ipClass = "E";
        if (firstOctet < 128) ipClass = "A";
        else if (firstOctet < 192) ipClass = "B";
        else if (firstOctet < 224) ipClass = "C";
        else if (firstOctet < 240) ipClass = "D (组播)";
        // Check private
        let isPrivate = false;
        if (firstOctet === 10) isPrivate = true;
        else if (firstOctet === 172 && ((ip >>> 16) & 255) >= 16 && ((ip >>> 16) & 255) <= 31)
          isPrivate = true;
        else if (firstOctet === 192 && ((ip >>> 16) & 255) === 168) isPrivate = true;
        // Binary display
        const ipBin = ipToBinary(ipStr);
        const maskBin = ipToBinary(intToIp(mask));
        $("results").innerHTML = `
                <div class="result-card">
                    <h3>📍 基本信息</h3>
                    <div class="result-item"><span class="label">IP 地址</span><span class="value">${ipStr}</span></div>
                    <div class="result-item"><span class="label">子网掩码</span><span class="value">${intToIp(mask)}</span></div>
                    <div class="result-item"><span class="label">CIDR 表示</span><span class="value">/${cidr}</span></div>
                    <div class="result-item"><span class="label">通配符掩码</span><span class="value">${intToIp(wildcard)}</span></div>
                    <div class="result-item"><span class="label">IP 类型</span><span class="value">Class ${ipClass}${isPrivate ? " (私有)" : " (公网)"}</span></div>
                </div>
                <div class="result-card">
                    <h3>📊 网络范围</h3>
                    <div class="result-item"><span class="label">网络地址</span><span class="value">${intToIp(network)}</span></div>
                    <div class="result-item"><span class="label">广播地址</span><span class="value">${intToIp(broadcast)}</span></div>
                    <div class="result-item"><span class="label">第一个可用</span><span class="value">${cidr < 31 ? intToIp(firstHost) : "N/A"}</span></div>
                    <div class="result-item"><span class="label">最后可用</span><span class="value">${cidr < 31 ? intToIp(lastHost) : "N/A"}</span></div>
                    <div class="result-item"><span class="label">可用主机数</span><span class="value">${usableHosts.toLocaleString()}</span></div>
                    <div class="result-item"><span class="label">总 IP 数</span><span class="value">${totalHosts.toLocaleString()}</span></div>
                    <div class="ip-range">${intToIp(network)}/${cidr} → ${cidr < 31 ? intToIp(firstHost) + " - " + intToIp(lastHost) : cidr === 31 ? intToIp(network) + " - " + intToIp(broadcast) : intToIp(network) + " (单个主机)"}</div>
                </div>
                <div class="result-card" style="grid-column: 1 / -1;">
                    <h3>🔢 二进制表示</h3>
                    <div class="result-item"><span class="label">IP 二进制</span></div>
                    <div class="binary-display">${ipBin
                      .split(".")
                      .map((oct, i) => {
                        const bits = cidr - i * 8;
                        if (bits >= 8)
                          return (
                            '<span class="octet"><span class="network">' + oct + "</span></span>"
                          );
                        if (bits <= 0)
                          return '<span class="octet"><span class="host">' + oct + "</span></span>";
                        return (
                          '<span class="octet"><span class="network">' +
                          oct.slice(0, bits) +
                          '</span><span class="host">' +
                          oct.slice(bits) +
                          "</span></span>"
                        );
                      })
                      .join(".")}</div>
                    <div class="result-item" style="margin-top:0.5rem;"><span class="label">掩码二进制</span></div>
                    <div class="binary-display">${maskBin}</div>
                    <div style="font-size:0.75rem;color:var(--pico-muted-color);margin-top:0.5rem;"><span class="network" style="color:var(--accent-cyan);">■</span> 网络位 <span class="host" style="color:#22c55e;">■</span> 主机位</div>
                </div>
            `;
      };
      function loadTheme() {
        const t = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", t);
        $("themeToggle").textContent = t === "dark" ? "☀️" : "🌙";
      }
      window.toggleTheme = function () {
        const c = document.documentElement.getAttribute("data-theme");
        const n = c === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", n);
        localStorage.setItem("theme", n);
        $("themeToggle").textContent = n === "dark" ? "☀️" : "🌙";
      };
      $("themeToggle").onclick = toggleTheme;
      $("ipInput").onkeypress = $("maskInput").onkeypress = (e) => {
        if (e.key === "Enter") calculate();
      };
      loadTheme();
      calculate();
    
