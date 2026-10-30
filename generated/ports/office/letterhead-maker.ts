// @ts-nocheck
// Generated from tools/office/letterhead-maker.html
// Source SHA-256: 751c0c4e0bf7e6b83d2956f17c48a13d9211d788da8604b23f6b5383d97d9d4c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "letterhead_maker_v1";
      let logoDataUrl = null;

      const fields = ["companyName", "address", "phone", "fax", "email", "website", "themeColor"];

      function getFormData() {
        const data = {};
        fields.forEach(function (id) {
          data[id] = document.getElementById(id).value;
        });
        data.logo = logoDataUrl;
        return data;
      }

      function setFormData(data) {
        fields.forEach(function (id) {
          if (data[id]) document.getElementById(id).value = data[id];
        });
        if (data.logo) {
          logoDataUrl = data.logo;
          var img = document.getElementById("logoPreviewSmall");
          img.src = data.logo;
          img.style.display = "block";
          document.getElementById("logoText").style.display = "none";
        }
      }

      function saveToStorage() {
        localStorage.setItem(LS_KEY, JSON.stringify(getFormData()));
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            setFormData(JSON.parse(saved));
          } catch (e) {
            // ignore
          }
        }
      }

      function updatePreview() {
        const data = getFormData();

        // Update company name
        document.getElementById("previewCompanyName").textContent =
          data.companyName || "\u516C\u53F8\u540D\u79F0";

        // Update company info
        var infoLines = [];
        if (data.address) infoLines.push(data.address);
        if (data.phone) infoLines.push("\u7535\u8BDD: " + data.phone);
        if (data.fax) infoLines.push("\u4F20\u771F: " + data.fax);
        if (data.email) infoLines.push("\u90AE\u7BB1: " + data.email);
        if (data.website) infoLines.push("\u7F51\u7AD9: " + data.website);

        var infoEl = document.getElementById("previewCompanyInfo");
        infoEl.textContent = "";
        infoLines.forEach(function (line, index) {
          if (index > 0) {
            infoEl.appendChild(document.createElement("br"));
          }
          infoEl.appendChild(document.createTextNode(line));
        });

        // Update logo
        var logoContainer = document.getElementById("logoContainer");
        logoContainer.textContent = "";
        if (logoDataUrl) {
          var img = document.createElement("img");
          img.className = "letterhead-logo";
          img.src = logoDataUrl;
          img.alt = "Logo";
          logoContainer.appendChild(img);
        } else {
          var placeholder = document.createElement("div");
          placeholder.className = "letterhead-logo-placeholder";
          placeholder.textContent = "Logo";
          logoContainer.appendChild(placeholder);
        }

        // Update theme color
        var header = document.getElementById("letterheadHeader");
        header.style.borderBottomColor = data.themeColor;
        document.getElementById("previewCompanyName").style.color = data.themeColor;
      }

      // Logo upload handler
      document.getElementById("logoInput").addEventListener("change", function (e) {
        var file = e.target.files[0];
        if (file) {
          var reader = new FileReader();
          reader.onload = function (event) {
            logoDataUrl = event.target.result;
            var img = document.getElementById("logoPreviewSmall");
            img.src = logoDataUrl;
            img.style.display = "block";
            document.getElementById("logoText").style.display = "none";
            saveToStorage();
            updatePreview();
          };
          reader.readAsDataURL(file);
        }
      });

      // Event listeners
      fields.forEach(function (id) {
        document.getElementById(id).addEventListener("input", function () {
          saveToStorage();
          updatePreview();
        });
      });

      document.getElementById("btnPrint").onclick = function () {
        window.print();
      };

      document.getElementById("btnClear").onclick = function () {
        fields.forEach(function (id) {
          if (id === "themeColor") {
            document.getElementById(id).value = "#333333";
          } else {
            document.getElementById(id).value = "";
          }
        });
        logoDataUrl = null;
        document.getElementById("logoPreviewSmall").style.display = "none";
        document.getElementById("logoText").style.display = "block";
        localStorage.removeItem(LS_KEY);
        updatePreview();
      };

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }

      // Initialize
      initTheme();
      loadFromStorage();
      updatePreview();
    
