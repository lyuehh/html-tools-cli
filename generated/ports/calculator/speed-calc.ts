// @ts-nocheck
// Generated from tools/calculator/speed-calc.html
// Source SHA-256: c1c03f4332e0760349a1f7e1ad107f652b6d0aa022b1c4bcc9f426115ce3e966
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("themeToggle").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      function loadTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.getElementById("themeToggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      window.showTab = function (tabId) {
        document.querySelectorAll(".tab-content").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".tabs button").forEach((b) => b.classList.remove("active"));
        document.getElementById(tabId).classList.add("active");
        event.target.classList.add("active");
      };

      function format(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
        if (num >= 1000) return (num / 1000).toFixed(2) + "K";
        if (num < 0.001) return num.toExponential(2);
        return num.toFixed(4);
      }

      function convertSpeed() {
        const value = parseFloat(document.getElementById("speedValue").value) || 0;
        const unit = document.getElementById("speedUnit").value;

        // Convert to bps first
        let bps;
        switch (unit) {
          case "Gbps":
            bps = value * 1e9;
            break;
          case "Mbps":
            bps = value * 1e6;
            break;
          case "Kbps":
            bps = value * 1e3;
            break;
          case "GBps":
            bps = value * 8 * 1e9;
            break;
          case "MBps":
            bps = value * 8 * 1e6;
            break;
          case "KBps":
            bps = value * 8 * 1e3;
            break;
          default:
            bps = value * 1e6;
        }

        document.getElementById("resGbps").textContent = format(bps / 1e9);
        document.getElementById("resMbps").textContent = format(bps / 1e6);
        document.getElementById("resKbps").textContent = format(bps / 1e3);
        document.getElementById("resGBps").textContent = format(bps / 8 / 1e9);
        document.getElementById("resMBps").textContent = format(bps / 8 / 1e6);
        document.getElementById("resKBps").textContent = format(bps / 8 / 1e3);
      }

      window.calcDownloadTime = function () {
        const fileSize = parseFloat(document.getElementById("fileSize").value) || 0;
        const sizeUnit = document.getElementById("sizeUnit").value;
        const speed = parseFloat(document.getElementById("downloadSpeed").value) || 0;
        const speedUnit = document.getElementById("downloadSpeedUnit").value;

        // Convert file size to bytes
        let sizeBytes;
        switch (sizeUnit) {
          case "TB":
            sizeBytes = fileSize * 1024 * 1024 * 1024 * 1024;
            break;
          case "GB":
            sizeBytes = fileSize * 1024 * 1024 * 1024;
            break;
          case "MB":
            sizeBytes = fileSize * 1024 * 1024;
            break;
          case "KB":
            sizeBytes = fileSize * 1024;
            break;
          default:
            sizeBytes = fileSize * 1024 * 1024 * 1024;
        }

        // Convert speed to bytes per second
        let bytesPerSec;
        switch (speedUnit) {
          case "Mbps":
            bytesPerSec = (speed * 1e6) / 8;
            break;
          case "Kbps":
            bytesPerSec = (speed * 1e3) / 8;
            break;
          case "MBps":
            bytesPerSec = speed * 1024 * 1024;
            break;
          case "KBps":
            bytesPerSec = speed * 1024;
            break;
          default:
            bytesPerSec = (speed * 1e6) / 8;
        }

        const seconds = sizeBytes / bytesPerSec;
        const minutes = seconds / 60;
        const hours = minutes / 60;

        let displayTime;
        if (hours >= 1) {
          displayTime = hours.toFixed(2) + " 小时";
        } else if (minutes >= 1) {
          displayTime = minutes.toFixed(2) + " 分钟";
        } else {
          displayTime = seconds.toFixed(2) + " 秒";
        }

        document.getElementById("downloadTime").textContent = displayTime;
        document.getElementById("timeSec").textContent = seconds.toFixed(1);
        document.getElementById("timeMin").textContent = minutes.toFixed(2);
        document.getElementById("timeHour").textContent = hours.toFixed(3);
        document.getElementById("actualSpeed").textContent =
          (bytesPerSec / 1024 / 1024).toFixed(2) + " MB/s";
      };

      window.calcBandwidth = function () {
        const devices = parseInt(document.getElementById("deviceCount").value) || 1;
        const usage = document.getElementById("mainUsage").value;

        const usageRates = {
          browse: 2,
          video720: 5,
          video1080: 10,
          video4k: 25,
          gaming: 5,
          videocall: 8
        };

        const ratePerDevice = usageRates[usage] || 10;
        const baseBandwidth = devices * ratePerDevice;
        const recommended = Math.ceil(baseBandwidth * 1.5);
        const perDevice = recommended / devices;

        document.getElementById("recommendedBandwidth").textContent = recommended + " Mbps";
        document.getElementById("baseBandwidth").textContent = baseBandwidth + " Mbps";
        document.getElementById("bufferBandwidth").textContent = recommended + " Mbps";
        document.getElementById("perDeviceBandwidth").textContent = perDevice.toFixed(1) + " Mbps";
      };

      loadTheme();
      convertSpeed();
    
