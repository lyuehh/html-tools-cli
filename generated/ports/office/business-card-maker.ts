// @ts-nocheck
// Generated from tools/office/business-card-maker.html
// Source SHA-256: 1ef5c9cce98296507123affbdf431acf32a52e057532f97766fd4aa939106a41
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "business_card_maker_v1";
      const cardPreview = document.getElementById("cardPreview");
      const statusEl = document.getElementById("status");

      const inputs = {
        name: document.getElementById("inputName"),
        title: document.getElementById("inputTitle"),
        company: document.getElementById("inputCompany"),
        phone: document.getElementById("inputPhone"),
        email: document.getElementById("inputEmail"),
        website: document.getElementById("inputWebsite"),
        address: document.getElementById("inputAddress"),
        bgColor: document.getElementById("inputBgColor"),
        textColor: document.getElementById("inputTextColor"),
        accentColor: document.getElementById("inputAccentColor")
      };

      let currentStyle = "modern";

      function getCardData() {
        return {
          name: inputs.name.value || "姓名",
          title: inputs.title.value,
          company: inputs.company.value,
          phone: inputs.phone.value,
          email: inputs.email.value,
          website: inputs.website.value,
          address: inputs.address.value,
          bgColor: inputs.bgColor.value,
          textColor: inputs.textColor.value,
          accentColor: inputs.accentColor.value,
          style: currentStyle
        };
      }

      function renderCard(data) {
        const {
          name,
          title,
          company,
          phone,
          email,
          website,
          address,
          bgColor,
          textColor,
          accentColor,
          style
        } = data;

        cardPreview.className = "business-card card-" + style;
        cardPreview.style.backgroundColor = bgColor;
        cardPreview.style.color = textColor;
        cardPreview.innerHTML = "";

        if (style === "modern") {
          const accentBar = document.createElement("div");
          accentBar.className = "accent-bar";
          accentBar.style.background = accentColor;
          cardPreview.appendChild(accentBar);

          const nameEl = document.createElement("div");
          nameEl.className = "card-name";
          nameEl.textContent = name;
          cardPreview.appendChild(nameEl);

          if (title) {
            const titleEl = document.createElement("div");
            titleEl.className = "card-title";
            titleEl.textContent = title;
            cardPreview.appendChild(titleEl);
          }

          if (company) {
            const companyEl = document.createElement("div");
            companyEl.className = "card-company";
            companyEl.textContent = company;
            cardPreview.appendChild(companyEl);
          }

          const infoEl = document.createElement("div");
          infoEl.className = "card-info";
          if (phone) {
            const div = document.createElement("div");
            div.textContent = phone;
            infoEl.appendChild(div);
          }
          if (email) {
            const div = document.createElement("div");
            div.textContent = email;
            infoEl.appendChild(div);
          }
          if (website) {
            const div = document.createElement("div");
            div.textContent = website;
            infoEl.appendChild(div);
          }
          if (address) {
            const div = document.createElement("div");
            div.textContent = address;
            infoEl.appendChild(div);
          }
          cardPreview.appendChild(infoEl);
        } else if (style === "classic") {
          if (company) {
            const companyEl = document.createElement("div");
            companyEl.className = "card-company";
            companyEl.textContent = company;
            cardPreview.appendChild(companyEl);
          }

          const divider = document.createElement("div");
          divider.className = "divider";
          divider.style.background = accentColor;
          cardPreview.appendChild(divider);

          const nameEl = document.createElement("div");
          nameEl.className = "card-name";
          nameEl.textContent = name;
          cardPreview.appendChild(nameEl);

          if (title) {
            const titleEl = document.createElement("div");
            titleEl.className = "card-title";
            titleEl.textContent = title;
            cardPreview.appendChild(titleEl);
          }

          const infoEl = document.createElement("div");
          infoEl.className = "card-info";
          if (phone) {
            const div = document.createElement("div");
            div.textContent = phone;
            infoEl.appendChild(div);
          }
          if (email) {
            const div = document.createElement("div");
            div.textContent = email;
            infoEl.appendChild(div);
          }
          if (website) {
            const div = document.createElement("div");
            div.textContent = website;
            infoEl.appendChild(div);
          }
          if (address) {
            const div = document.createElement("div");
            div.textContent = address;
            infoEl.appendChild(div);
          }
          cardPreview.appendChild(infoEl);
        } else if (style === "minimal") {
          const leftEl = document.createElement("div");
          leftEl.className = "card-left";

          const nameEl = document.createElement("div");
          nameEl.className = "card-name";
          nameEl.textContent = name;
          leftEl.appendChild(nameEl);

          if (title) {
            const titleEl = document.createElement("div");
            titleEl.className = "card-title";
            titleEl.textContent = title;
            leftEl.appendChild(titleEl);
          }

          const infoEl = document.createElement("div");
          infoEl.className = "card-info";
          if (phone) {
            const div = document.createElement("div");
            div.textContent = phone;
            infoEl.appendChild(div);
          }
          if (email) {
            const div = document.createElement("div");
            div.textContent = email;
            infoEl.appendChild(div);
          }
          if (website) {
            const div = document.createElement("div");
            div.textContent = website;
            infoEl.appendChild(div);
          }
          if (address) {
            const div = document.createElement("div");
            div.textContent = address;
            infoEl.appendChild(div);
          }
          leftEl.appendChild(infoEl);
          cardPreview.appendChild(leftEl);

          const rightEl = document.createElement("div");
          rightEl.className = "card-right";
          if (company) {
            const companyBg = document.createElement("div");
            companyBg.className = "card-company-bg";
            companyBg.textContent = company;
            rightEl.appendChild(companyBg);
          }
          cardPreview.appendChild(rightEl);
        }
      }

      function updatePreview() {
        const data = getCardData();
        renderCard(data);
        saveToStorage();
      }

      function saveToStorage() {
        const data = getCardData();
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            const data = JSON.parse(saved);
            inputs.name.value = data.name || "";
            inputs.title.value = data.title || "";
            inputs.company.value = data.company || "";
            inputs.phone.value = data.phone || "";
            inputs.email.value = data.email || "";
            inputs.website.value = data.website || "";
            inputs.address.value = data.address || "";
            inputs.bgColor.value = data.bgColor || "#1a1a2e";
            inputs.textColor.value = data.textColor || "#ffffff";
            inputs.accentColor.value = data.accentColor || "#00d4aa";
            if (data.style) {
              currentStyle = data.style;
              document.querySelectorAll(".style-btn").forEach(function (btn) {
                btn.classList.toggle("active", btn.dataset.style === currentStyle);
              });
            }
            return true;
          } catch (e) {
            return false;
          }
        }
        return false;
      }

      function loadFromUrl() {
        const hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          const data = JSON.parse(decodeURIComponent(atob(hash)));
          inputs.name.value = data.name || "";
          inputs.title.value = data.title || "";
          inputs.company.value = data.company || "";
          inputs.phone.value = data.phone || "";
          inputs.email.value = data.email || "";
          inputs.website.value = data.website || "";
          inputs.address.value = data.address || "";
          inputs.bgColor.value = data.bgColor || "#1a1a2e";
          inputs.textColor.value = data.textColor || "#ffffff";
          inputs.accentColor.value = data.accentColor || "#00d4aa";
          if (data.style) {
            currentStyle = data.style;
            document.querySelectorAll(".style-btn").forEach(function (btn) {
              btn.classList.toggle("active", btn.dataset.style === currentStyle);
            });
          }
          return true;
        } catch (e) {
          return false;
        }
      }

      function saveToUrl() {
        try {
          const data = getCardData();
          const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
          if (encoded.length < 2000) {
            history.replaceState(null, "", "#" + encoded);
          }
        } catch (e) {}
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function generateCardHtml(data) {
        const {
          name,
          title,
          company,
          phone,
          email,
          website,
          address,
          bgColor,
          textColor,
          accentColor,
          style
        } = data;
        let html = "";
        const cardStyle =
          "width:85mm;height:55mm;background:" +
          bgColor +
          ";color:" +
          textColor +
          ";border-radius:2mm;overflow:hidden;position:relative;border:0.5pt solid #ccc;";

        if (style === "modern") {
          html =
            '<div class="business-card card-modern" style="' +
            cardStyle +
            'display:flex;flex-direction:column;justify-content:center;padding:5mm;">';
          html +=
            '<div class="accent-bar" style="position:absolute;left:0;top:0;bottom:0;width:1.5mm;background:' +
            accentColor +
            '"></div>';
          html +=
            '<div class="card-name" style="font-size:5mm;font-weight:700;margin-bottom:1mm;">' +
            escapeHtml(name) +
            "</div>";
          if (title)
            html +=
              '<div class="card-title" style="font-size:2.5mm;opacity:0.8;margin-bottom:3mm;">' +
              escapeHtml(title) +
              "</div>";
          if (company)
            html +=
              '<div class="card-company" style="font-size:3mm;font-weight:600;margin-bottom:3mm;">' +
              escapeHtml(company) +
              "</div>";
          html += '<div class="card-info" style="font-size:2.2mm;line-height:1.6;opacity:0.9;">';
          if (phone) html += "<div>" + escapeHtml(phone) + "</div>";
          if (email) html += "<div>" + escapeHtml(email) + "</div>";
          if (website) html += "<div>" + escapeHtml(website) + "</div>";
          if (address) html += "<div>" + escapeHtml(address) + "</div>";
          html += "</div></div>";
        } else if (style === "classic") {
          html =
            '<div class="business-card card-classic" style="' +
            cardStyle +
            'display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:5mm;">';
          if (company)
            html +=
              '<div class="card-company" style="font-size:3.5mm;font-weight:700;letter-spacing:0.3mm;text-transform:uppercase;margin-bottom:3mm;">' +
              escapeHtml(company) +
              "</div>";
          html +=
            '<div class="divider" style="width:15mm;height:0.5mm;margin-bottom:3mm;background:' +
            accentColor +
            '"></div>';
          html +=
            '<div class="card-name" style="font-size:4mm;font-weight:600;margin-bottom:1mm;">' +
            escapeHtml(name) +
            "</div>";
          if (title)
            html +=
              '<div class="card-title" style="font-size:2.5mm;opacity:0.8;margin-bottom:3mm;">' +
              escapeHtml(title) +
              "</div>";
          html += '<div class="card-info" style="font-size:2.2mm;line-height:1.8;opacity:0.9;">';
          if (phone) html += "<div>" + escapeHtml(phone) + "</div>";
          if (email) html += "<div>" + escapeHtml(email) + "</div>";
          if (website) html += "<div>" + escapeHtml(website) + "</div>";
          if (address) html += "<div>" + escapeHtml(address) + "</div>";
          html += "</div></div>";
        } else if (style === "minimal") {
          html =
            '<div class="business-card card-minimal" style="' +
            cardStyle +
            'display:grid;grid-template-columns:1fr 1fr;height:55mm;">';
          html +=
            '<div class="card-left" style="display:flex;flex-direction:column;justify-content:center;padding:5mm;">';
          html +=
            '<div class="card-name" style="font-size:4mm;font-weight:700;margin-bottom:1mm;">' +
            escapeHtml(name) +
            "</div>";
          if (title)
            html +=
              '<div class="card-title" style="font-size:2mm;opacity:0.7;margin-bottom:4mm;">' +
              escapeHtml(title) +
              "</div>";
          html += '<div class="card-info" style="font-size:2mm;line-height:1.8;opacity:0.9;">';
          if (phone) html += "<div>" + escapeHtml(phone) + "</div>";
          if (email) html += "<div>" + escapeHtml(email) + "</div>";
          if (website) html += "<div>" + escapeHtml(website) + "</div>";
          if (address) html += "<div>" + escapeHtml(address) + "</div>";
          html += "</div></div>";
          html +=
            '<div class="card-right" style="display:flex;flex-direction:column;justify-content:center;padding:5mm;opacity:0.15;">';
          if (company)
            html +=
              '<div class="card-company-bg" style="font-size:8mm;font-weight:900;line-height:1;word-break:break-all;">' +
              escapeHtml(company) +
              "</div>";
          html += "</div></div>";
        }

        return html;
      }

      function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      }

      function printCards() {
        const data = getCardData();
        const cardHtml = generateCardHtml(data);

        const printContent =
          '<!DOCTYPE html><html><head><meta charset="utf-8"><title>打印名片</title><style>' +
          "@page{size:A4;margin:10mm}" +
          "*{margin:0;padding:0;box-sizing:border-box}" +
          'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}' +
          ".print-grid{display:grid;grid-template-columns:1fr 1fr;gap:10mm;padding:10mm}" +
          "</style></head><body>" +
          '<div class="print-grid">' +
          cardHtml +
          cardHtml +
          cardHtml +
          cardHtml +
          "</div>" +
          "</body></html>";

        const printWindow = window.open("", "_blank");
        if (printWindow) {
          printWindow.document.open();
          printWindow.document.write(printContent);
          printWindow.document.close();
          printWindow.onload = function () {
            printWindow.print();
          };
        }
        showStatus("打印窗口已打开", "success");
      }

      Object.values(inputs).forEach(function (input) {
        input.addEventListener("input", updatePreview);
      });

      document.querySelectorAll(".style-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          document.querySelectorAll(".style-btn").forEach(function (b) {
            b.classList.remove("active");
          });
          btn.classList.add("active");
          currentStyle = btn.dataset.style;
          updatePreview();
        });
      });

      document.getElementById("btnPrint").onclick = printCards;

      document.getElementById("btnShare").onclick = async function () {
        saveToUrl();
        try {
          await navigator.clipboard.writeText(location.href);
          showStatus("链接已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        Object.values(inputs).forEach(function (input) {
          if (input.type === "color") {
            if (input.id === "inputBgColor") input.value = "#1a1a2e";
            else if (input.id === "inputTextColor") input.value = "#ffffff";
            else if (input.id === "inputAccentColor") input.value = "#00d4aa";
          } else {
            input.value = "";
          }
        });
        currentStyle = "modern";
        document.querySelectorAll(".style-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.style === "modern");
        });
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
        updatePreview();
        showStatus("已清空", "success");
      };

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

      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
      if (!loadFromUrl()) loadFromStorage();
      updatePreview();
    
