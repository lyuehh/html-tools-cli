// @ts-nocheck
// Generated from tools/generator/iban-generator.html
// Source SHA-256: de22bc2d218bcf47b06ae26337ab6f35ddfd1989dd47a5f100a6d9bfa7c16452
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const ibanFormats = {
        DE: { length: 22, bban: 18, format: "DEkk bbbb bbbb cccc cccc cc", name: "德国" },
        FR: { length: 27, bban: 23, format: "FRkk bbbb bggg ggcc cccc cccc cxx", name: "法国" },
        GB: { length: 22, bban: 18, format: "GBkk bbbb cccc cccc cccc cc", name: "英国" },
        ES: { length: 24, bban: 20, format: "ESkk bbbb gggg xxcc cccc cccc", name: "西班牙" },
        IT: { length: 27, bban: 23, format: "ITkk xbbb bbgg gggc cccc cccc ccc", name: "意大利" },
        NL: { length: 18, bban: 14, format: "NLkk bbbb cccc cccc cc", name: "荷兰" },
        BE: { length: 16, bban: 12, format: "BEkk bbbc cccc ccxx", name: "比利时" },
        CH: { length: 21, bban: 17, format: "CHkk bbbb bccc cccc cccc c", name: "瑞士" },
        AT: { length: 20, bban: 16, format: "ATkk bbbb bccc cccc cccc", name: "奥地利" },
        PL: { length: 28, bban: 24, format: "PLkk bbbs sssx cccc cccc cccc cccc", name: "波兰" }
      };

      let history = [];

      function randomDigits(n) {
        let result = "";
        for (let i = 0; i < n; i++) {
          result += Math.floor(Math.random() * 10);
        }
        return result;
      }

      function randomUpperChar() {
        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }

      function mod97(value) {
        let remainder = 0;
        for (const character of String(value).toUpperCase()) {
          const code = character.charCodeAt(0);
          const numericValue =
            code >= 65 && code <= 90 ? code - 55 : code >= 48 && code <= 57 ? code - 48 : -1;

          if (numericValue < 0) {
            throw new Error("IBAN contains an invalid character");
          }

          for (const digit of String(numericValue)) {
            remainder = (remainder * 10 + Number(digit)) % 97;
          }
        }
        return remainder;
      }

      function clampCount(value) {
        const parsed = Math.trunc(Number(value));
        if (!Number.isFinite(parsed)) {
          return 1;
        }
        return Math.min(10, Math.max(1, parsed));
      }

      function calculateCheckDigits(country, bban) {
        // Convert country code to digits (A=10, B=11, etc.)
        const countryDigits = country
          .split("")
          .map((c) => c.charCodeAt(0) - 55)
          .join("");
        // Rearrange: BBAN + country digits + "00"
        const checkStr = bban + countryDigits + "00";
        // Calculate check digits
        const remainder = mod97(checkStr);
        const checkDigits = (98 - remainder).toString().padStart(2, "0");
        return checkDigits;
      }

      function generateIBAN(country) {
        const format = ibanFormats[country];
        const bbanLength = format.bban;

        // Generate random BBAN
        let bban = "";
        if (country === "GB") {
          // Sort code (4 chars) + Account number
          bban = randomUpperChar() + randomUpperChar() + randomUpperChar() + randomUpperChar();
          bban += randomDigits(14);
        } else {
          bban = randomDigits(bbanLength);
        }

        const checkDigits = calculateCheckDigits(country, bban);
        return country + checkDigits + bban;
      }

      function formatIBAN(iban) {
        return iban.match(/.{1,4}/g).join(" ");
      }

      function generate() {
        const country = document.getElementById("country").value;
        const countInput = document.getElementById("count");
        const count = clampCount(countInput.value);
        countInput.value = String(count);

        const ibans = [];
        for (let i = 0; i < count; i++) {
          ibans.push(generateIBAN(country));
        }

        const mainIban = ibans[0];
        document.getElementById("ibanResult").textContent = mainIban;
        document.getElementById("ibanFormatted").textContent = formatIBAN(mainIban);

        // Show details
        const format = ibanFormats[country];
        document.getElementById("details").innerHTML = `
        <div class="detail-item">
          <span class="label">国家</span>
          <span class="value">${format.name} (${country})</span>
        </div>
        <div class="detail-item">
          <span class="label">校验码</span>
          <span class="value">${mainIban.slice(2, 4)}</span>
        </div>
        <div class="detail-item">
          <span class="label">BBAN</span>
          <span class="value">${mainIban.slice(4)}</span>
        </div>
        <div class="detail-item">
          <span class="label">总长度</span>
          <span class="value">${mainIban.length} 字符</span>
        </div>
      `;

        // Add to history
        ibans.forEach((iban) => {
          if (!history.includes(iban)) {
            history.unshift(iban);
          }
        });
        history = history.slice(0, 10);
        renderHistory();
      }

      function renderHistory() {
        const container = document.getElementById("historyList");
        if (history.length === 0) {
          container.innerHTML = '<p class="history-empty">暂无历史</p>';
          return;
        }

        container.innerHTML = history
          .map(
            (iban) =>
              `<button class="history-item" type="button" data-iban="${iban}" aria-label="复制历史 IBAN ${formatIBAN(iban)}" onclick="copyText(this.dataset.iban, this)">${formatIBAN(iban)}</button>`
          )
          .join("");
      }

      const copyTimers = new WeakMap();
      const copyRequests = new WeakMap();

      function setCopyStatus(message, state = "") {
        const status = document.getElementById("copy-status");
        if (!status) {
          return;
        }
        status.textContent = message;
        status.className = `copy-status${state ? ` ${state}` : ""}`;
      }

      async function copyToClipboard(text, button, label = "IBAN") {
        if (!text || text === "-" || !button) {
          return;
        }

        const originalLabel = button.dataset.originalLabel || button.textContent.trim();
        button.dataset.originalLabel = originalLabel;
        const requestId = (copyRequests.get(button) || 0) + 1;
        copyRequests.set(button, requestId);
        const previousTimer = copyTimers.get(button);
        if (previousTimer) {
          clearTimeout(previousTimer);
        }

        try {
          await navigator.clipboard.writeText(text);
          if (copyRequests.get(button) !== requestId) {
            return;
          }
          button.textContent = "已复制";
          button.classList.add("is-copied");
          button.classList.remove("copy-error");
          setCopyStatus(`${label}已复制`, "success");
        } catch {
          if (copyRequests.get(button) !== requestId) {
            return;
          }
          button.textContent = "重试";
          button.classList.remove("is-copied");
          button.classList.add("copy-error");
          setCopyStatus(`${label}复制失败，请重试`, "error");
        }

        copyTimers.set(
          button,
          setTimeout(() => {
            if (copyRequests.get(button) !== requestId) {
              return;
            }
            button.textContent = originalLabel;
            button.classList.remove("is-copied", "copy-error");
          }, 2000)
        );
      }

      function copyIban() {
        const iban = document.getElementById("ibanResult").textContent;
        copyToClipboard(iban, document.getElementById("copy-iban"));
      }

      function copyText(text, button) {
        copyToClipboard(text, button);
      }

      function updateFormat() {
        // Just trigger a new generation
      }

      // Initialize
      generate();

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        const themeIcon = document.querySelector("[data-theme-icon]");
        if (themeIcon) {
          themeIcon.textContent = next === "dark" ? "🌙" : "☀️";
        }
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const themeIcon = document.querySelector("[data-theme-icon]");
          if (themeIcon) {
            themeIcon.textContent = saved === "dark" ? "🌙" : "☀️";
          }
        }
      })();

      // Keep browser chrome in sync with the shared theme toggle.
      (function () {
        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (!themeColor) {
          return;
        }
        const syncThemeColor = () => {
          themeColor.content =
            document.documentElement.getAttribute("data-theme") === "light" ? "#fafafa" : "#0a0a0f";
        };
        syncThemeColor();
        new MutationObserver(syncThemeColor).observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-theme"]
        });
      })();
    
