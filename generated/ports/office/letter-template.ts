// @ts-nocheck
// Generated from tools/office/letter-template.html
// Source SHA-256: 1243fe4272d15aaa93a6201842da3bca6fd1f32904f10b8de20b17f140c32e49
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "letter_template_v1";

      const fields = [
        "senderName",
        "senderTitle",
        "senderAddress",
        "senderPhone",
        "senderEmail",
        "recipientName",
        "recipientTitle",
        "recipientAddress",
        "letterDate",
        "greeting",
        "subject",
        "body",
        "closing"
      ];

      function getFormData() {
        const data = {};
        fields.forEach(function (id) {
          data[id] = document.getElementById(id).value;
        });
        return data;
      }

      function setFormData(data) {
        fields.forEach(function (id) {
          if (data[id]) document.getElementById(id).value = data[id];
        });
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

      function formatDate(dateStr) {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return d.getFullYear() + "\u5E74" + (d.getMonth() + 1) + "\u6708" + d.getDate() + "\u65E5";
      }

      function escapeHtml(str) {
        if (!str) return "";
        const div = document.createElement("div");
        div.textContent = str;
        return div.textContent;
      }

      function updatePreview() {
        const data = getFormData();
        const preview = document.getElementById("preview");

        // Clear preview
        preview.textContent = "";

        // Sender section
        const senderDiv = document.createElement("div");
        senderDiv.className = "letter-sender";
        if (data.senderName) {
          const strong = document.createElement("strong");
          strong.textContent = data.senderName;
          senderDiv.appendChild(strong);
          senderDiv.appendChild(document.createElement("br"));
        }
        if (data.senderTitle) {
          senderDiv.appendChild(document.createTextNode(data.senderTitle));
          senderDiv.appendChild(document.createElement("br"));
        }
        if (data.senderAddress) {
          senderDiv.appendChild(document.createTextNode(data.senderAddress));
          senderDiv.appendChild(document.createElement("br"));
        }
        if (data.senderPhone) {
          senderDiv.appendChild(document.createTextNode("\u7535\u8BDD: " + data.senderPhone));
          senderDiv.appendChild(document.createElement("br"));
        }
        if (data.senderEmail) {
          senderDiv.appendChild(document.createTextNode("\u90AE\u7BB1: " + data.senderEmail));
        }
        preview.appendChild(senderDiv);

        // Date section
        const dateDiv = document.createElement("div");
        dateDiv.className = "letter-date";
        dateDiv.textContent = formatDate(data.letterDate);
        preview.appendChild(dateDiv);

        // Recipient section
        const recipientDiv = document.createElement("div");
        recipientDiv.className = "letter-recipient";
        if (data.recipientName) {
          const strong = document.createElement("strong");
          strong.textContent = data.recipientName;
          recipientDiv.appendChild(strong);
          if (data.recipientTitle) {
            recipientDiv.appendChild(document.createTextNode(" " + data.recipientTitle));
          }
          recipientDiv.appendChild(document.createElement("br"));
        }
        if (data.recipientAddress) {
          recipientDiv.appendChild(document.createTextNode(data.recipientAddress));
        }
        preview.appendChild(recipientDiv);

        // Subject
        if (data.subject) {
          const subjectDiv = document.createElement("div");
          subjectDiv.className = "letter-subject";
          subjectDiv.textContent = "\u4E3B\u9898: " + data.subject;
          preview.appendChild(subjectDiv);
        }

        // Greeting
        const greetingDiv = document.createElement("div");
        greetingDiv.className = "letter-greeting";
        if (data.greeting && data.recipientName) {
          const name = data.recipientName
            .replace(/\u516C\u53F8$/, "")
            .replace(/\u5148\u751F$|\u5973\u58EB$/, "");
          greetingDiv.textContent = data.greeting + " " + name + ":";
        }
        preview.appendChild(greetingDiv);

        // Body
        const bodyDiv = document.createElement("div");
        bodyDiv.className = "letter-body";
        bodyDiv.textContent = data.body;
        preview.appendChild(bodyDiv);

        // Closing
        const closingDiv = document.createElement("div");
        closingDiv.className = "letter-closing";
        closingDiv.textContent = data.closing;
        preview.appendChild(closingDiv);

        // Signature
        const signatureDiv = document.createElement("div");
        signatureDiv.className = "letter-signature";
        signatureDiv.textContent = data.senderName;
        preview.appendChild(signatureDiv);
      }

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
          document.getElementById(id).value = "";
        });
        document.getElementById("letterDate").value = new Date().toISOString().split("T")[0];
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
      document.getElementById("letterDate").value = new Date().toISOString().split("T")[0];
      loadFromStorage();
      updatePreview();
    
