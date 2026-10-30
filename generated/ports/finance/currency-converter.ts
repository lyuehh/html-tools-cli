// @ts-nocheck
// Generated from tools/finance/currency-converter.html
// Source SHA-256: 78cc434658ff5c87d2a36c82ec663e5027101806042886a9c7d89c9466bc5e48
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const rates = {
        CNY: 1,
        USD: 0.1389,
        EUR: 0.128,
        GBP: 0.1098,
        JPY: 20.85,
        HKD: 1.0856,
        KRW: 185.5,
        SGD: 0.1869,
        AUD: 0.2136,
        CAD: 0.1905
      };

      const currencyNames = {
        CNY: "人民币",
        USD: "美元",
        EUR: "欧元",
        GBP: "英镑",
        JPY: "日元",
        HKD: "港币",
        KRW: "韩元",
        SGD: "新加坡元",
        AUD: "澳元",
        CAD: "加元"
      };

      const flags = {
        CNY: "🇨🇳",
        USD: "🇺🇸",
        EUR: "🇪🇺",
        GBP: "🇬🇧",
        JPY: "🇯🇵",
        HKD: "🇭🇰",
        KRW: "🇰🇷",
        SGD: "🇸🇬",
        AUD: "🇦🇺",
        CAD: "🇨🇦"
      };

      function convert() {
        const fromCurrency = document.getElementById("fromCurrency").value;
        const toCurrency = document.getElementById("toCurrency").value;
        const fromAmount = parseFloat(document.getElementById("fromAmount").value) || 0;

        const amountInCNY = fromAmount / rates[fromCurrency];
        const toAmount = amountInCNY * rates[toCurrency];

        document.getElementById("toAmount").value = toAmount.toFixed(2);

        const rate = rates[toCurrency] / rates[fromCurrency];
        document.getElementById("rateDisplay").textContent =
          "1 " + fromCurrency + " = " + rate.toFixed(4) + " " + toCurrency;
      }

      function swapCurrencies() {
        const fromSelect = document.getElementById("fromCurrency");
        const toSelect = document.getElementById("toCurrency");
        const temp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = temp;
        convert();
      }

      function setAmount(amount) {
        document.getElementById("fromAmount").value = amount;
        convert();
      }

      function renderPopularRates() {
        const container = document.getElementById("popularRates");
        const popular = ["USD", "EUR", "GBP", "JPY", "HKD", "KRW"];

        popular.forEach((currency) => {
          const div = document.createElement("div");
          div.className = "rate-item";

          const nameSpan = document.createElement("span");
          nameSpan.textContent =
            flags[currency] + " " + currencyNames[currency] + " (" + currency + ")";

          const rateSpan = document.createElement("span");
          rateSpan.textContent = rates[currency].toFixed(4);

          div.appendChild(nameSpan);
          div.appendChild(rateSpan);
          container.appendChild(div);
        });
      }

      convert();
      renderPopularRates();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
