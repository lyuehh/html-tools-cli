// @ts-nocheck
// Generated from tools/network/ip-tools.html
// Source SHA-256: 2362712ef25875d3fb4bfae7d080c4715adc69bddaa826f363fb45cc76c9ae3d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const conversionTypeEl = document.getElementById("conversionType");
      const subnetBitsEl = document.getElementById("subnetBits");
      const outputFormatEl = document.getElementById("outputFormat");
      const resultsGridEl = document.getElementById("resultsGrid");
      const subnetInfoEl = document.getElementById("subnetInfo");
      const subnetDetailsEl = document.getElementById("subnetDetails");
      const binaryViewEl = document.getElementById("binaryView");
      const binaryContentEl = document.getElementById("binaryContent");
      const statusEl = document.getElementById("status");
      const LS_KEY = "ip_tools_input_v1";

      function isValidIPv4(ip) {
        const ipv4Regex =
          /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipv4Regex.test(ip);
      }

      function isValidIPv6(ip) {
        const ipv6Regex =
          /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
        return ipv6Regex.test(ip);
      }

      function isValidCIDR(cidr) {
        const cidrRegex =
          /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/([0-9]|[12][0-9]|3[0-2])$/;
        return cidrRegex.test(cidr);
      }

      function ipToDecimal(ip) {
        const parts = ip.split(".").map(Number);
        return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
      }

      function decimalToIP(decimal) {
        return [
          (decimal >> 24) & 0xff,
          (decimal >> 16) & 0xff,
          (decimal >> 8) & 0xff,
          decimal & 0xff
        ].join(".");
      }

      function ipToBinary(ip) {
        const parts = ip.split(".").map(Number);
        return parts.map((part) => part.toString(2).padStart(8, "0")).join(".");
      }

      function calculateSubnet(ip, bits) {
        const decimalIP = ipToDecimal(ip);
        const mask = (0xffffffff << (32 - bits)) >>> 0;
        const network = decimalIP & mask;
        const broadcast = network | (~mask >>> 0);
        const firstUsable = network + 1;
        const lastUsable = broadcast - 1;
        const totalHosts = Math.pow(2, 32 - bits);
        const usableHosts = Math.max(0, totalHosts - 2);

        return {
          network: decimalToIP(network),
          broadcast: decimalToIP(broadcast),
          firstUsable: decimalToIP(firstUsable),
          lastUsable: decimalToIP(lastUsable),
          mask: decimalToIP(mask),
          maskBits: bits,
          totalHosts: totalHosts,
          usableHosts: usableHosts
        };
      }

      function analyzeIP() {
        const input = inputEl.value.trim();
        if (!input) {
          showStatus("请输入 IP 地址", "error");
          return;
        }

        let ip = input;
        let cidrBits = 32;
        let isCIDR = false;

        if (isValidCIDR(input)) {
          const [ipPart, bits] = input.split("/");
          ip = ipPart;
          cidrBits = parseInt(bits);
          isCIDR = true;
        } else if (!isValidIPv4(ip) && !isValidIPv6(ip)) {
          showStatus("IP 地址格式无效", "error");
          return;
        }

        subnetBitsEl.value = cidrBits;

        const isIPv4 = isValidIPv4(ip);
        const isIPv6 = isValidIPv6(ip);
        const ipType = isIPv4 ? "IPv4" : isIPv6 ? "IPv6" : "未知";

        resultsGridEl.innerHTML = "";
        subnetInfoEl.style.display = "none";
        subnetDetailsEl.innerHTML = "";
        binaryViewEl.style.display = "none";

        const results = [];

        if (isIPv4) {
          const decimal = ipToDecimal(ip);
          const binary = ipToBinary(ip);
          const hex = decimal.toString(16).toUpperCase().padStart(8, "0");
          const hexFormatted = hex.match(/.{2}/g).join(":");

          results.push({ title: "IP 类型", value: ipType, className: "ipv4" });
          results.push({ title: "十进制", value: decimal.toLocaleString() });
          results.push({ title: "二进制", value: binary });
          results.push({ title: "十六进制", value: "0x" + hex });

          binaryViewEl.style.display = "block";
          binaryContentEl.textContent = binary;

          if (conversionTypeEl.value === "cidr" || isCIDR) {
            const subnet = calculateSubnet(ip, cidrBits);
            subnetInfoEl.style.display = "block";

            const subnetDetails = [
              { label: "网络地址", value: subnet.network },
              { label: "广播地址", value: subnet.broadcast },
              { label: "可用范围", value: `${subnet.firstUsable} - ${subnet.lastUsable}` },
              { label: "子网掩码", value: `${subnet.mask} (/${subnet.maskBits})` },
              { label: "总主机数", value: subnet.totalHosts.toLocaleString() },
              { label: "可用主机数", value: subnet.usableHosts.toLocaleString() }
            ];

            subnetDetailsEl.innerHTML = "";
            subnetDetails.forEach(function (detail) {
              const item = document.createElement("div");
              item.className = "subnet-item";
              item.innerHTML =
                '<div class="subnet-label">' +
                detail.label +
                "</div>" +
                '<div class="subnet-value">' +
                detail.value +
                "</div>";
              subnetDetailsEl.appendChild(item);
            });
          }
        } else if (isIPv6) {
          results.push({ title: "IP 类型", value: ipType, className: "ipv6" });
          results.push({ title: "压缩形式", value: ip });
          results.push({ title: "扩展形式", value: expandIPv6(ip) });
          results.push({ title: "备注", value: "IPv6 子网计算暂不支持" });
        }

        results.forEach(function (result) {
          const card = document.createElement("div");
          card.className = "result-card";
          card.innerHTML =
            '<div class="result-title">' +
            result.title +
            "</div>" +
            '<div class="result-value ' +
            (result.className || "") +
            '">' +
            result.value +
            "</div>";
          resultsGridEl.appendChild(card);
        });

        showStatus("分析完成", "success");
      }

      function expandIPv6(ip) {
        const parts = ip.split(":");
        const missingParts = 8 - parts.filter((p) => p !== "").length;
        const expanded = [];

        for (let i = 0; i < parts.length; i++) {
          if (parts[i] === "") {
            for (let j = 0; j < missingParts; j++) {
              expanded.push("0000");
            }
          } else {
            expanded.push(parts[i].padStart(4, "0"));
          }
        }

        return expanded.join(":");
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function randomIPv4() {
        const parts = [];
        for (let i = 0; i < 4; i++) {
          parts.push(Math.floor(Math.random() * 256));
        }
        inputEl.value = parts.join(".");
        analyzeIP();
      }

      function reset() {
        inputEl.value = "192.168.1.1";
        conversionTypeEl.value = "auto";
        subnetBitsEl.value = "24";
        outputFormatEl.value = "decimal";
        resultsGridEl.innerHTML = "";
        subnetInfoEl.style.display = "none";
        subnetDetailsEl.innerHTML = "";
        binaryViewEl.style.display = "none";
        binaryContentEl.textContent = "";
        statusEl.textContent = "";
        localStorage.removeItem(LS_KEY);
      }

      document.getElementById("btnAnalyze").onclick = analyzeIP;

      document.getElementById("btnCopy").onclick = async function () {
        const results = [];
        resultsGridEl.querySelectorAll(".result-card").forEach(function (card) {
          const title = card.querySelector(".result-title").textContent;
          const value = card.querySelector(".result-value").textContent;
          results.push(`${title}: ${value}`);
        });

        if (subnetInfoEl.style.display !== "none") {
          results.push("");
          results.push("子网信息:");
          subnetDetailsEl.querySelectorAll(".subnet-item").forEach(function (item) {
            const label = item.querySelector(".subnet-label").textContent;
            const value = item.querySelector(".subnet-value").textContent;
            results.push(`  ${label}: ${value}`);
          });
        }

        const output = results.join("\n");

        try {
          await navigator.clipboard.writeText(output);
          showStatus("已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnPaste").onclick = async function () {
        try {
          const text = await navigator.clipboard.readText();
          inputEl.value = text.trim();
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnRandom").onclick = randomIPv4;

      document.getElementById("btnClear").onclick = reset;

      inputEl.addEventListener("input", function () {
        localStorage.setItem(LS_KEY, this.value);
      });

      [conversionTypeEl, subnetBitsEl, outputFormatEl].forEach(function (el) {
        el.addEventListener("change", analyzeIP);
      });

      const saved = localStorage.getItem(LS_KEY);
      if (saved) inputEl.value = saved;

      analyzeIP();
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
    
