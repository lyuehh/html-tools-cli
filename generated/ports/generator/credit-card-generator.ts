// @ts-nocheck
// Generated from tools/generator/credit-card-generator.html
// Source SHA-256: 5f627d9446dba7fcf74c1edf823baececaae5b26f4ef04fe23bb2af138da11b6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const cardPrefixes = {
        visa: { prefixes: ["4"], length: 16 },
        mastercard: { prefixes: ["51", "52", "53", "54", "55"], length: 16 },
        amex: { prefixes: ["34", "37"], length: 15 },
        discover: {
          prefixes: ["6011", "644", "645", "646", "647", "648", "649", "65"],
          length: 16
        },
        jcb: { prefixes: ["3528", "3529", "353", "354", "355", "356", "357", "358"], length: 16 },
        unionpay: { prefixes: ["62"], length: 16 }
      };

      function luhnChecksum(num) {
        let sum = 0;
        let isEven = false;

        for (let i = num.length - 1; i >= 0; i--) {
          let digit = parseInt(num[i]);

          if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
          }

          sum += digit;
          isEven = !isEven;
        }

        return (10 - (sum % 10)) % 10;
      }

      function generateCardNumber(type) {
        const config = cardPrefixes[type];
        const prefix = config.prefixes[Math.floor(Math.random() * config.prefixes.length)];
        const length = config.length;

        let number = prefix;
        while (number.length < length - 1) {
          number += Math.floor(Math.random() * 10);
        }

        number += luhnChecksum(number);
        return number;
      }

      function formatCardNumber(number) {
        if (number.length === 15) {
          return number.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3");
        }
        return number.replace(/(\d{4})/g, "$1 ").trim();
      }

      function generateExpiry() {
        const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
        const year = String(new Date().getFullYear() + Math.floor(Math.random() * 5) + 1).slice(-2);
        return `${month}/${year}`;
      }

      function generateCVV(length = 3) {
        return String(Math.floor(Math.random() * Math.pow(10, length))).padStart(length, "0");
      }

      function generate() {
        const type = document.getElementById("cardType").value;
        const count = parseInt(document.getElementById("count").value) || 5;

        const results = [];
        for (let i = 0; i < count; i++) {
          const number = generateCardNumber(type);
          const expiry = generateExpiry();
          const cvvLength = type === "amex" ? 4 : 3;
          const cvv = generateCVV(cvvLength);
          results.push({ number, expiry, cvv });
        }

        // Update preview
        const first = results[0];
        document.getElementById("previewType").textContent = type.toUpperCase();
        document.getElementById("previewNumber").textContent = formatCardNumber(first.number);
        document.getElementById("previewExpiry").textContent = first.expiry;
        document.getElementById("previewCvv").textContent = first.cvv;

        // Update card gradient based on type
        const gradients = {
          visa: "linear-gradient(135deg, #1a1f71 0%, #004d40 100%)",
          mastercard: "linear-gradient(135deg, #eb001b 0%, #f79e1b 100%)",
          amex: "linear-gradient(135deg, #006fcf 0%, #00175a 100%)",
          discover: "linear-gradient(135deg, #ff6000 0%, #86b817 100%)",
          jcb: "linear-gradient(135deg, #0f4c81 0%, #00a94f 100%)",
          unionpay: "linear-gradient(135deg, #e21836 0%, #00447c 100%)"
        };
        document.getElementById("cardPreview").style.background = gradients[type];

        // Display list
        document.getElementById("resultList").innerHTML = results
          .map(
            (r, i) => `
        <div class="result-item">
          <span class="number">${formatCardNumber(r.number)} | ${r.expiry} | ${r.cvv}</span>
          <button class="copy-btn" onclick="copyCard('${r.number}', '${r.expiry}', '${r.cvv}')" aria-label="复制">复制</button>
        </div>
      `
          )
          .join("");
      }

      function copyCard(number, expiry, cvv) {
        const text = `卡号: ${formatCardNumber(number)}\n有效期: ${expiry}\nCVV: ${cvv}`;
        navigator.clipboard.writeText(text);
      }

      generate();

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
