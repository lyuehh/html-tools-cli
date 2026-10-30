// @ts-nocheck
// Generated from tools/calculator/currency.html
// Source SHA-256: 99d41f49f677f5797ea0471d05d94edcff39637e843d0bc5e80cdd18e039fa62
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Static exchange rates (base: CNY = 1)
      // These are approximate rates for reference only
      const currencies = {
        CNY: { name: "人民币", symbol: "¥", flag: "🇨🇳", rate: 1 },
        USD: { name: "美元", symbol: "$", flag: "🇺🇸", rate: 0.1389 },
        EUR: { name: "欧元", symbol: "€", flag: "🇪🇺", rate: 0.1282 },
        GBP: { name: "英镑", symbol: "£", flag: "🇬🇧", rate: 0.1099 },
        JPY: { name: "日元", symbol: "¥", flag: "🇯🇵", rate: 21.53 },
        KRW: { name: "韩元", symbol: "₩", flag: "🇰🇷", rate: 193.5 },
        HKD: { name: "港币", symbol: "HK$", flag: "🇭🇰", rate: 1.0833 },
        TWD: { name: "新台币", symbol: "NT$", flag: "🇹🇼", rate: 4.51 },
        SGD: { name: "新加坡元", symbol: "S$", flag: "🇸🇬", rate: 0.1867 },
        AUD: { name: "澳元", symbol: "A$", flag: "🇦🇺", rate: 0.2139 },
        CAD: { name: "加元", symbol: "C$", flag: "🇨🇦", rate: 0.1944 },
        CHF: { name: "瑞士法郎", symbol: "Fr", flag: "🇨🇭", rate: 0.1222 },
        NZD: { name: "新西兰元", symbol: "NZ$", flag: "🇳🇿", rate: 0.2333 },
        THB: { name: "泰铢", symbol: "฿", flag: "🇹🇭", rate: 4.72 },
        MYR: { name: "马来西亚林吉特", symbol: "RM", flag: "🇲🇾", rate: 0.6167 },
        RUB: { name: "俄罗斯卢布", symbol: "₽", flag: "🇷🇺", rate: 12.64 },
        INR: { name: "印度卢比", symbol: "₹", flag: "🇮🇳", rate: 11.58 },
        VND: { name: "越南盾", symbol: "₫", flag: "🇻🇳", rate: 3472 },
        PHP: { name: "菲律宾比索", symbol: "₱", flag: "🇵🇭", rate: 7.78 },
        IDR: { name: "印尼盾", symbol: "Rp", flag: "🇮🇩", rate: 2194 }
      };

      let fromCurrency = "CNY";
      let toCurrency = "USD";

      function initCurrencySelects() {
        const fromSelect = document.getElementById("fromCurrency");
        const toSelect = document.getElementById("toCurrency");

        Object.keys(currencies).forEach(function (code) {
          const currency = currencies[code];

          const option1 = document.createElement("option");
          option1.value = code;
          option1.textContent = currency.flag + " " + code;
          option1.selected = code === "CNY";
          fromSelect.appendChild(option1);

          const option2 = document.createElement("option");
          option2.value = code;
          option2.textContent = currency.flag + " " + code;
          option2.selected = code === "USD";
          toSelect.appendChild(option2);
        });
      }

      function convert(direction) {
        fromCurrency = document.getElementById("fromCurrency").value;
        toCurrency = document.getElementById("toCurrency").value;

        const fromRate = currencies[fromCurrency].rate;
        const toRate = currencies[toCurrency].rate;
        const exchangeRate = toRate / fromRate;

        if (direction === "from") {
          const fromAmount = parseFloat(document.getElementById("fromAmount").value) || 0;
          const toAmount = fromAmount * exchangeRate;
          document.getElementById("toAmount").value = formatNumber(toAmount);
        } else {
          const toAmount = parseFloat(document.getElementById("toAmount").value) || 0;
          const fromAmount = toAmount / exchangeRate;
          document.getElementById("fromAmount").value = formatNumber(fromAmount);
        }

        updateRateDisplay();
      }

      function formatNumber(num) {
        if (num === 0) return "0";
        if (Math.abs(num) >= 1) {
          return num.toFixed(2);
        } else {
          return num.toPrecision(6);
        }
      }

      function updateRateDisplay() {
        const fromRate = currencies[fromCurrency].rate;
        const toRate = currencies[toCurrency].rate;
        const rate = toRate / fromRate;
        const reverseRate = fromRate / toRate;

        document.getElementById("rateDisplay").textContent =
          "1 " + fromCurrency + " = " + formatNumber(rate) + " " + toCurrency;
        document.getElementById("reverseRate").textContent =
          "1 " + toCurrency + " = " + formatNumber(reverseRate) + " " + fromCurrency;
      }

      window.swapCurrencies = function () {
        const fromSelect = document.getElementById("fromCurrency");
        const toSelect = document.getElementById("toCurrency");
        const temp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = temp;
        convert("from");
      };

      window.setAmount = function (amount) {
        document.getElementById("fromAmount").value = amount;
        convert("from");
      };

      function initRatesGrid() {
        const grid = document.getElementById("ratesGrid");

        Object.keys(currencies).forEach(function (code) {
          if (code === "CNY") return;

          const currency = currencies[code];
          const card = document.createElement("div");
          card.className = "rate-card";
          card.onclick = function () {
            document.getElementById("toCurrency").value = code;
            convert("from");
          };

          const currencyDiv = document.createElement("span");
          currencyDiv.className = "currency";
          currencyDiv.textContent = currency.flag + " " + code;

          const valueDiv = document.createElement("span");
          valueDiv.className = "value";
          valueDiv.textContent = formatNumber(currency.rate);

          card.appendChild(currencyDiv);
          card.appendChild(valueDiv);
          grid.appendChild(card);
        });
      }

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.getElementById("themeBtn");
        if (html.getAttribute("data-theme") === "light") {
          html.setAttribute("data-theme", "dark");
          btn.textContent = "☀️ 浅色";
        } else {
          html.setAttribute("data-theme", "light");
          btn.textContent = "🌙 深色";
        }
      };

      // Initialize
      initCurrencySelects();
      initRatesGrid();
      convert("from");
    
