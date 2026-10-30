// @ts-nocheck
// Generated from tools/dev/meta-viewport.html
// Source SHA-256: 1e55fb24a1e4e28119b2dc581e2e000b0ac036db53422e1cca610b6f5ea23980
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const t =
          document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      document.getElementById("width").addEventListener("change", function () {
        document.getElementById("customWidthRow").style.display =
          this.value === "custom" ? "flex" : "none";
        generate();
      });

      window.applyPreset = function (preset) {
        const presets = {
          responsive: {
            width: "device-width",
            initialScale: 1,
            minimumScale: 1,
            maximumScale: 5,
            userScalable: true,
            viewportFit: "",
            height: ""
          },
          fixed: {
            width: "custom",
            customWidth: 1024,
            initialScale: 1,
            minimumScale: 1,
            maximumScale: 1,
            userScalable: false,
            viewportFit: "",
            height: ""
          },
          nozoom: {
            width: "device-width",
            initialScale: 1,
            minimumScale: 1,
            maximumScale: 1,
            userScalable: false,
            viewportFit: "",
            height: ""
          },
          pwa: {
            width: "device-width",
            initialScale: 1,
            minimumScale: 1,
            maximumScale: 5,
            userScalable: true,
            viewportFit: "cover",
            height: ""
          }
        };
        const p = presets[preset];
        document.getElementById("width").value = p.width;
        document.getElementById("customWidthRow").style.display =
          p.width === "custom" ? "flex" : "none";
        if (p.customWidth) document.getElementById("customWidth").value = p.customWidth;
        document.getElementById("initialScale").value = p.initialScale;
        document.getElementById("minimumScale").value = p.minimumScale;
        document.getElementById("maximumScale").value = p.maximumScale;
        document.getElementById("userScalable").checked = p.userScalable;
        document.getElementById("viewportFit").value = p.viewportFit;
        document.getElementById("height").value = p.height;
        generate();
      };

      window.generate = function () {
        const parts = [];
        const width = document.getElementById("width").value;
        if (width === "custom") {
          parts.push("width=" + document.getElementById("customWidth").value);
        } else {
          parts.push("width=" + width);
        }

        const height = document.getElementById("height").value;
        if (height) parts.push("height=" + height);

        parts.push("initial-scale=" + document.getElementById("initialScale").value);
        parts.push("minimum-scale=" + document.getElementById("minimumScale").value);
        parts.push("maximum-scale=" + document.getElementById("maximumScale").value);
        parts.push(
          "user-scalable=" + (document.getElementById("userScalable").checked ? "yes" : "no")
        );

        const viewportFit = document.getElementById("viewportFit").value;
        if (viewportFit) parts.push("viewport-fit=" + viewportFit);

        const meta = `<meta name="viewport" content="${parts.join(", ")}">`;
        document.getElementById("output").textContent = meta;
      };

      window.copyCode = function () {
        navigator.clipboard.writeText(document.getElementById("output").textContent);
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      };

      generate();
    
