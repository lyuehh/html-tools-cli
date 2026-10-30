// @ts-nocheck
// Generated from tools/generator/email-signature.html
// Source SHA-256: ac59e09337501398726aaba4e3ead0bc6e2629239ff877f8ca6a8b2023b5b597
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let template = "modern";

      window.toggleTheme = function () {
        const t =
          document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      window.setTemplate = function (t) {
        template = t;
        document.querySelectorAll(".template-btn").forEach((btn) => btn.classList.remove("active"));
        event.target.classList.add("active");
        updatePreview();
      };

      function getFormData() {
        return {
          name: document.getElementById("name").value,
          title: document.getElementById("title").value,
          company: document.getElementById("company").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value,
          website: document.getElementById("website").value,
          primaryColor: document.getElementById("primaryColor").value,
          textColor: document.getElementById("textColor").value
        };
      }

      function generateHTML(data) {
        const templates = {
          modern: `
                    <table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif;">
                        <tr>
                            <td style="border-left: 4px solid ${data.primaryColor}; padding-left: 15px;">
                                <p style="margin: 0 0 5px 0; font-size: 18px; font-weight: bold; color: ${data.textColor};">${data.name}</p>
                                <p style="margin: 0 0 10px 0; font-size: 14px; color: ${data.primaryColor};">${data.title} | ${data.company}</p>
                                <p style="margin: 0; font-size: 13px; color: #666;">
                                    📧 <a href="mailto:${data.email}" style="color: #666; text-decoration: none;">${data.email}</a><br>
                                    📱 ${data.phone}<br>
                                    🌐 <a href="${data.website}" style="color: ${data.primaryColor}; text-decoration: none;">${data.website}</a>
                                </p>
                            </td>
                        </tr>
                    </table>`,
          classic: `
                    <table cellpadding="0" cellspacing="0" style="font-family: Georgia, serif;">
                        <tr>
                            <td style="padding: 15px; border-top: 2px solid ${data.primaryColor}; border-bottom: 2px solid ${data.primaryColor};">
                                <p style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold; color: ${data.textColor};">${data.name}</p>
                                <p style="margin: 0 0 10px 0; font-size: 13px; color: #666; font-style: italic;">${data.title}, ${data.company}</p>
                                <p style="margin: 0; font-size: 12px; color: #666;">
                                    E: ${data.email} | T: ${data.phone}<br>
                                    W: <a href="${data.website}" style="color: ${data.primaryColor};">${data.website}</a>
                                </p>
                            </td>
                        </tr>
                    </table>`,
          minimal: `
                    <table cellpadding="0" cellspacing="0" style="font-family: -apple-system, sans-serif;">
                        <tr>
                            <td>
                                <p style="margin: 0; font-size: 14px; color: ${data.textColor};"><strong>${data.name}</strong> · ${data.title}</p>
                                <p style="margin: 5px 0 0 0; font-size: 12px; color: #888;">${data.company} · ${data.phone} · <a href="mailto:${data.email}" style="color: ${data.primaryColor};">${data.email}</a></p>
                            </td>
                        </tr>
                    </table>`
        };
        return templates[template];
      }

      window.updatePreview = function () {
        const data = getFormData();
        document.getElementById("preview").innerHTML = generateHTML(data);
      };

      window.copyHTML = function () {
        const data = getFormData();
        navigator.clipboard.writeText(generateHTML(data));
        showToast();
      };

      window.copyText = function () {
        const data = getFormData();
        const text = `${data.name}\n${data.title} | ${data.company}\n${data.email} | ${data.phone}\n${data.website}`;
        navigator.clipboard.writeText(text);
        showToast();
      };

      function showToast() {
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      updatePreview();
    
