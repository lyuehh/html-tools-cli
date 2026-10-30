// @ts-nocheck
// Generated from tools/network/subnet-calculator.html
// Source SHA-256: 573f4c48b0042a8e34aebadf6af123fa0e566a6efe3e479ae60dec838d79eb65
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function ipToInt(ip) {
        const parts = ip.split(".").map(Number);
        return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
      }
      function intToIp(int) {
        return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join(".");
      }
      function intToBinary(int) {
        return int.toString(2).padStart(32, "0");
      }
      function formatBinary(binary) {
        return binary.match(/.{8}/g).join(".");
      }
      function isValidIp(ip) {
        const parts = ip.split(".");
        if (parts.length !== 4) return false;
        return parts.every((p) => {
          const n = parseInt(p, 10);
          return !isNaN(n) && n >= 0 && n <= 255 && String(n) === p;
        });
      }
      function isPrivateIp(ip) {
        const parts = ip.split(".").map(Number);
        if (parts[0] === 10) return true;
        if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
        if (parts[0] === 192 && parts[1] === 168) return true;
        return false;
      }
      function colorBinary(binary, cidr) {
        let html = "";
        for (let i = 0; i < 32; i++) {
          if (i > 0 && i % 8 === 0) html += ".";
          html +=
            '<span class="' +
            (i < cidr ? "network-bit" : "host-bit") +
            '">' +
            binary[i] +
            "</span>";
        }
        return html;
      }
      window.calculate = function () {
        const ip = document.getElementById("ipInput").value.trim();
        const cidr = parseInt(document.getElementById("cidrInput").value, 10);
        if (!isValidIp(ip)) {
          alert("无效的 IP 地址");
          return;
        }
        const ipInt = ipToInt(ip);
        const maskInt = (0xffffffff << (32 - cidr)) >>> 0;
        const wildcardInt = ~maskInt >>> 0;
        const networkInt = (ipInt & maskInt) >>> 0;
        const broadcastInt = (networkInt | wildcardInt) >>> 0;
        const totalAddresses = Math.pow(2, 32 - cidr);
        const usableHosts = cidr >= 31 ? totalAddresses : totalAddresses - 2;
        const firstHostInt = cidr >= 31 ? networkInt : networkInt + 1;
        const lastHostInt = cidr >= 31 ? broadcastInt : broadcastInt - 1;
        document.getElementById("networkAddr").textContent = intToIp(networkInt);
        document.getElementById("broadcastAddr").textContent = intToIp(broadcastInt);
        document.getElementById("subnetMask").textContent = intToIp(maskInt);
        document.getElementById("wildcardMask").textContent = intToIp(wildcardInt);
        document.getElementById("hostCount").textContent = usableHosts.toLocaleString();
        document.getElementById("firstHost").textContent = intToIp(firstHostInt);
        document.getElementById("lastHost").textContent = intToIp(lastHostInt);
        document.getElementById("ipClass").textContent = isPrivateIp(ip) ? "私有地址" : "公有地址";
        document.getElementById("binaryIp").innerHTML = colorBinary(intToBinary(ipInt), cidr);
        document.getElementById("binaryMask").textContent = formatBinary(intToBinary(maskInt));
        document.getElementById("results").classList.add("show");
      };
      document.getElementById("ipInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") calculate();
      });
      calculate();
      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
