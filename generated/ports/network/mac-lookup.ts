// @ts-nocheck
// Generated from tools/network/mac-lookup.html
// Source SHA-256: d45d3b0271784958bd2b366b7338c8c7a7e3df3ba527c486189f6d0f89441eb1
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const vendors = {
        "00:00:0C": "Cisco",
        "00:1A:2B": "Ayecom",
        "00:50:56": "VMware",
        "00:0C:29": "VMware",
        "00:15:5D": "Microsoft Hyper-V",
        "00:1C:42": "Parallels",
        "08:00:27": "VirtualBox",
        "00:03:FF": "Microsoft",
        "00:1B:21": "Intel",
        "00:1E:67": "Intel",
        "00:24:D7": "Intel",
        "00:26:C6": "Intel",
        "3C:D9:2B": "Hewlett Packard",
        "00:21:5A": "Hewlett Packard",
        "00:1E:68": "Quanta",
        "00:22:68": "Hon Hai (Foxconn)",
        "00:26:22": "Compal",
        "28:D2:44": "LCFC (Lenovo)",
        "F0:DE:F1": "Wistron",
        "00:23:AE": "Dell",
        "14:FE:B5": "Dell",
        "D4:BE:D9": "Dell",
        "00:1A:A0": "Dell",
        "00:21:9B": "Dell",
        "00:25:64": "Dell",
        "A4:BA:DB": "Dell",
        "F8:DB:88": "Dell",
        "00:14:22": "Dell",
        "00:25:00": "Apple",
        "00:1E:C2": "Apple",
        "00:26:B0": "Apple",
        "00:26:BB": "Apple",
        "28:CF:DA": "Apple",
        "3C:07:54": "Apple",
        "60:C5:47": "Apple",
        "70:DE:E2": "Apple",
        "98:01:A7": "Apple",
        "AC:BC:32": "Apple",
        "D8:30:62": "Apple",
        "00:1D:D8": "Microsoft",
        "00:0D:3A": "Microsoft",
        "00:12:5A": "Microsoft",
        "00:03:47": "Intel",
        "00:0E:35": "Intel",
        "00:13:02": "Intel",
        "00:16:EA": "Intel",
        "00:18:DE": "Intel",
        "00:19:D1": "Intel",
        "00:1B:77": "Intel",
        "00:1C:BF": "Intel",
        "00:1D:E0": "Intel",
        "00:1F:3B": "Intel",
        "00:21:5D": "Intel",
        "00:21:6A": "Intel",
        "AC:22:0B": "ASUSTek",
        "00:1A:92": "ASUSTek",
        "00:1D:60": "ASUSTek",
        "00:22:15": "ASUSTek",
        "00:24:8C": "ASUSTek",
        "00:26:18": "ASUSTek",
        "14:DA:E9": "ASUSTek",
        "1C:87:2C": "ASUSTek",
        "20:CF:30": "ASUSTek",
        "00:E0:4C": "Realtek",
        "00:40:F4": "Realtek",
        "52:54:00": "QEMU",
        "AA:BB:CC": "测试地址",
        "00:00:00": "未知设备"
      };
      window.lookup = function () {
        let mac = document.getElementById("input").value.trim().toUpperCase();
        mac = mac.replace(/[^A-F0-9]/g, "");
        if (mac.length < 6) {
          alert("请输入有效MAC地址");
          return;
        }
        const oui = mac.slice(0, 6).match(/.{2}/g).join(":");
        const fullMac = mac.slice(0, 12).padEnd(12, "0").match(/.{2}/g).join(":");
        const vendor = vendors[oui] || "未知厂商";
        document.getElementById("icon").textContent = vendor === "未知厂商" ? "❓" : "🏭";
        document.getElementById("vendor").textContent = vendor;
        document.getElementById("vendor").className =
          vendor === "未知厂商" ? "vendor not-found" : "vendor";
        document.getElementById("oui").textContent = "OUI: " + oui;
        document.getElementById("mac").textContent = "完整: " + fullMac;
        document.getElementById("result").classList.add("show");
      };
      document.getElementById("input").addEventListener("keypress", (e) => {
        if (e.key === "Enter") lookup();
      });
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
    
