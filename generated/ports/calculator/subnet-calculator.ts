// @ts-nocheck
// Generated from tools/calculator/subnet-calculator.html
// Source SHA-256: fe054f4e17b9a40d03baa6309dfe6ed58bde1c9a82757a27d82d70650e6bdcbb
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function ipToLong(ip) {
        return ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct), 0) >>> 0;
      }
      function longToIp(long) {
        return [(long >>> 24) & 255, (long >>> 16) & 255, (long >>> 8) & 255, long & 255].join(".");
      }
      function toBinary(ip) {
        return ip
          .split(".")
          .map((n) => parseInt(n).toString(2).padStart(8, "0"))
          .join(".");
      }
      function calculate() {
        const ip = document.getElementById("ip").value.trim();
        const cidr = parseInt(document.getElementById("cidr").value);
        if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) {
          document.getElementById("results").innerHTML =
            '<p style="color:red">请输入有效的IP地址</p>';
          return;
        }
        const ipLong = ipToLong(ip);
        const mask = (0xffffffff << (32 - cidr)) >>> 0;
        const network = (ipLong & mask) >>> 0;
        const broadcast = (network | (~mask >>> 0)) >>> 0;
        const firstHost = network + 1;
        const lastHost = broadcast - 1;
        const totalHosts = Math.pow(2, 32 - cidr);
        const usableHosts = totalHosts - 2;
        const wildcardMask = ~mask >>> 0;
        document.getElementById("results").innerHTML = `
                <div class="result-item"><span class="result-label">IP地址</span><span class="result-value">${ip}<br><span class="binary">${toBinary(ip)}</span></span></div>
                <div class="result-item"><span class="result-label">子网掩码</span><span class="result-value">${longToIp(mask)}<br><span class="binary">${toBinary(longToIp(mask))}</span></span></div>
                <div class="result-item"><span class="result-label">通配符掩码</span><span class="result-value">${longToIp(wildcardMask)}</span></div>
                <div class="result-item"><span class="result-label">网络地址</span><span class="result-value">${longToIp(network)}</span></div>
                <div class="result-item"><span class="result-label">广播地址</span><span class="result-value">${longToIp(broadcast)}</span></div>
                <div class="result-item"><span class="result-label">第一个可用IP</span><span class="result-value">${longToIp(firstHost)}</span></div>
                <div class="result-item"><span class="result-label">最后一个可用IP</span><span class="result-value">${longToIp(lastHost)}</span></div>
                <div class="result-item"><span class="result-label">可用主机数</span><span class="result-value">${usableHosts.toLocaleString()}</span></div>
                <div class="result-item"><span class="result-label">CIDR表示</span><span class="result-value">${longToIp(network)}/${cidr}</span></div>
            `;
      }
      document.getElementById("ip").addEventListener("input", calculate);
      document.getElementById("cidr").addEventListener("change", calculate);
      calculate();

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
    
