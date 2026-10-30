// @ts-nocheck
// Generated from tools/dev/ip-converter.html
// Source SHA-256: 61ded91a5adb4c7a256d522a86817760f380bf41ac6e1926c7162dc15726d85d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const statusEl = document.getElementById("status");
      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }
      function ipToInt(ip) {
        const parts = ip.split(".").map(Number);
        if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) return null;
        return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
      }
      function intToIp(n) {
        return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
      }
      function convert() {
        let input = inputEl.value.trim();
        if (!input) {
          showStatus("请输入 IP 地址", "error");
          return;
        }
        let num;
        if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(input)) {
          num = ipToInt(input);
          if (num === null) {
            showStatus("无效的 IP 地址", "error");
            return;
          }
        } else if (input.toLowerCase().startsWith("0x")) {
          num = parseInt(input, 16);
        } else if (/^[01]{32}$/.test(input)) {
          num = parseInt(input, 2);
        } else {
          num = parseInt(input, 10);
        }
        if (isNaN(num) || num < 0 || num > 0xffffffff) {
          showStatus("无效的输入", "error");
          return;
        }
        num = num >>> 0;
        document.getElementById("dotted").textContent = intToIp(num);
        document.getElementById("decimal").textContent = num;
        document.getElementById("hex").textContent =
          "0x" + num.toString(16).toUpperCase().padStart(8, "0");
        document.getElementById("binary").textContent = num.toString(2).padStart(32, "0");
        document.getElementById("octal").textContent = "0" + num.toString(8);
        const bin = num.toString(2).padStart(32, "0");
        document.getElementById("binaryGroup").textContent = [
          bin.slice(0, 8),
          bin.slice(8, 16),
          bin.slice(16, 24),
          bin.slice(24, 32)
        ].join(".");
        showStatus("转换成功", "success");
      }
      document.getElementById("btnPaste").onclick = async () => {
        try {
          inputEl.value = await navigator.clipboard.readText();
          convert();
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };
      document.getElementById("btnConvert").onclick = convert;
      document.getElementById("btnClear").onclick = () => {
        inputEl.value = "";
        ["dotted", "decimal", "hex", "binary", "octal", "binaryGroup"].forEach(
          (id) => (document.getElementById(id).textContent = "-")
        );
        showStatus("已清空", "success");
      };
      inputEl.addEventListener("input", convert);

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
    
