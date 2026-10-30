// @ts-nocheck
// Generated from tools/dev/responsive-preview.html
// Source SHA-256: 9ce5375bfa7dc3217caa45296c2c256de3d70c3de14855ab634c1d8521f2f34f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme
      function initTheme() {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      }
      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };
      initTheme();

      // Devices
      const devices = [
        { name: "iPhone SE", icon: "📱", width: 375, height: 667, type: "phone" },
        { name: "iPhone 14", icon: "📱", width: 390, height: 844, type: "phone" },
        { name: "iPhone 14 Pro Max", icon: "📱", width: 430, height: 932, type: "phone" },
        { name: "Pixel 7", icon: "📱", width: 412, height: 915, type: "phone" },
        { name: "iPad Mini", icon: "📋", width: 768, height: 1024, type: "tablet" },
        { name: "iPad Pro", icon: "📋", width: 1024, height: 1366, type: "tablet" },
        { name: "Laptop", icon: "💻", width: 1366, height: 768, type: "desktop" },
        { name: "Desktop", icon: "🖥️", width: 1920, height: 1080, type: "desktop" }
      ];

      let currentDevice = devices[0];
      let isLandscape = false;
      let zoom = 1;

      function renderDeviceButtons() {
        const container = document.getElementById("deviceButtons");
        container.innerHTML = devices
          .map(
            (d, i) => `
                <button class="device-btn ${i === 0 ? "active" : ""}" onclick="selectDevice(${i})">
                    <span class="icon">${d.icon}</span>
                    <span>${d.name}</span>
                </button>
            `
          )
          .join("");
      }

      window.selectDevice = function (index) {
        currentDevice = devices[index];
        isLandscape = false;
        updatePreview();

        document.querySelectorAll(".device-btn").forEach((btn, i) => {
          btn.classList.toggle("active", i === index);
        });
      };

      window.toggleOrientation = function () {
        isLandscape = !isLandscape;
        updatePreview();
      };

      window.updatePreview = function () {
        const frame = document.getElementById("deviceFrame");
        const screen = document.getElementById("screen");
        const sizeDisplay = document.getElementById("sizeDisplay");

        let width = isLandscape ? currentDevice.height : currentDevice.width;
        let height = isLandscape ? currentDevice.width : currentDevice.height;

        // Apply zoom
        const scaledWidth = width * zoom;
        const scaledHeight = height * zoom;

        screen.style.width = scaledWidth + "px";
        screen.style.height = scaledHeight + "px";

        // Update iframe size (actual viewport)
        const iframe = document.getElementById("previewIframe");
        iframe.style.width = width + "px";
        iframe.style.height = height + "px";
        iframe.style.transform = `scale(${zoom})`;
        iframe.style.transformOrigin = "top left";

        // Update frame class
        frame.className = "device-frame " + currentDevice.type;

        // Update size display
        sizeDisplay.textContent = `${width} × ${height}`;
      };

      window.zoomIn = function () {
        zoom = Math.min(zoom + 0.1, 1.5);
        updateZoom();
      };

      window.zoomOut = function () {
        zoom = Math.max(zoom - 0.1, 0.3);
        updateZoom();
      };

      window.resetZoom = function () {
        zoom = 1;
        updateZoom();
      };

      function updateZoom() {
        document.getElementById("zoomValue").textContent = Math.round(zoom * 100) + "%";
        updatePreview();
      }

      function loadUrl() {
        let url = document.getElementById("urlInput").value.trim();
        if (!url) {
          alert("请输入网址");
          return;
        }

        // Add protocol if missing
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
          url = "https://" + url;
          document.getElementById("urlInput").value = url;
        }

        const iframe = document.getElementById("previewIframe");
        const noUrl = document.getElementById("noUrl");
        const browserUrl = document.getElementById("browserUrl");

        iframe.src = url;
        iframe.style.display = "block";
        noUrl.style.display = "none";
        browserUrl.textContent = url;
      }

      window.loadExample = function (url) {
        document.getElementById("urlInput").value = url;
        loadUrl();
      };

      // Handle Enter key
      document.getElementById("urlInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          loadUrl();
        }
      });

      // Initialize
      renderDeviceButtons();
      updatePreview();

      // Auto-fit zoom based on screen size
      function autoFitZoom() {
        const previewArea = document.getElementById("previewArea");
        const availableWidth = previewArea.clientWidth - 100;
        const availableHeight = previewArea.clientHeight - 100;

        const deviceWidth = isLandscape ? currentDevice.height : currentDevice.width;
        const deviceHeight = isLandscape ? currentDevice.width : currentDevice.height;

        const scaleX = availableWidth / (deviceWidth + 60);
        const scaleY = availableHeight / (deviceHeight + 80);

        zoom = Math.min(scaleX, scaleY, 1);
        zoom = Math.max(zoom, 0.3);

        updateZoom();
      }

      // Auto-fit on resize
      window.addEventListener("resize", autoFitZoom);
      setTimeout(autoFitZoom, 100);
    
