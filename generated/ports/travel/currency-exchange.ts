// @ts-nocheck
// Generated from tools/travel/currency-exchange.html
// Source SHA-256: 707e61505c0545313be7988e5389fde03d5eb821b27336b01c1a33956eacf1d4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Placeholder exchange rates (relative to USD)
      var CURRENCIES = {
        USD: { name: "美元", symbol: "$", rate: 1 },
        CNY: { name: "人民币", symbol: "¥", rate: 7.24 },
        EUR: { name: "欧元", symbol: "€", rate: 0.92 },
        GBP: { name: "英镑", symbol: "£", rate: 0.79 },
        JPY: { name: "日元", symbol: "¥", rate: 149.5 },
        KRW: { name: "韩元", symbol: "₩", rate: 1320 },
        HKD: { name: "港币", symbol: "HK$", rate: 7.82 },
        TWD: { name: "新台币", symbol: "NT$", rate: 31.5 },
        SGD: { name: "新加坡元", symbol: "S$", rate: 1.34 },
        AUD: { name: "澳元", symbol: "A$", rate: 1.53 },
        CAD: { name: "加元", symbol: "C$", rate: 1.36 },
        CHF: { name: "瑞士法郎", symbol: "Fr", rate: 0.88 },
        THB: { name: "泰铢", symbol: "฿", rate: 35.5 },
        MYR: { name: "马来西亚林吉特", symbol: "RM", rate: 4.47 },
        INR: { name: "印度卢比", symbol: "₹", rate: 83.1 },
        RUB: { name: "俄罗斯卢布", symbol: "₽", rate: 92.5 },
        BRL: { name: "巴西雷亚尔", symbol: "R$", rate: 4.97 },
        MXN: { name: "墨西哥比索", symbol: "$", rate: 17.1 },
        AED: { name: "阿联酋迪拉姆", symbol: "د.إ", rate: 3.67 },
        NZD: { name: "新西兰元", symbol: "NZ$", rate: 1.64 }
      };

      var POPULAR = ["CNY", "USD", "EUR", "JPY", "GBP", "HKD", "KRW", "SGD"];

      var fromSelect = document.getElementById("fromCurrency");
      var toSelect = document.getElementById("toCurrency");
      var fromAmount = document.getElementById("fromAmount");

      function init() {
        initTheme();
        populateCurrencies();
        renderPopularCurrencies();
        convert();

        fromSelect.addEventListener("change", convert);
        toSelect.addEventListener("change", convert);
        fromAmount.addEventListener("input", convert);
      }

      function populateCurrencies() {
        Object.keys(CURRENCIES).forEach(function (code) {
          var currency = CURRENCIES[code];

          var opt1 = document.createElement("option");
          opt1.value = code;
          opt1.textContent = code + " - " + currency.name;
          fromSelect.appendChild(opt1);

          var opt2 = document.createElement("option");
          opt2.value = code;
          opt2.textContent = code + " - " + currency.name;
          toSelect.appendChild(opt2);
        });

        fromSelect.value = "CNY";
        toSelect.value = "USD";
      }

      function renderPopularCurrencies() {
        var container = document.getElementById("popularCurrencies");
        container.textContent = "";

        POPULAR.forEach(function (code) {
          var chip = document.createElement("button");
          chip.className = "currency-chip";
          chip.textContent = code;
          chip.onclick = function () {
            selectPopular(code);
          };
          container.appendChild(chip);
        });
      }

      function selectPopular(code) {
        if (fromSelect.value === code) {
          toSelect.value = code;
        } else {
          fromSelect.value = code;
        }
        convert();
      }

      function convert() {
        var from = fromSelect.value;
        var to = toSelect.value;
        var amount = parseFloat(fromAmount.value) || 0;

        var fromRate = CURRENCIES[from].rate;
        var toRate = CURRENCIES[to].rate;

        // Convert through USD
        var usdAmount = amount / fromRate;
        var result = usdAmount * toRate;

        var resultEl = document.getElementById("resultAmount");
        resultEl.textContent = CURRENCIES[to].symbol + " " + formatNumber(result);

        var rateEl = document.getElementById("rateInfo");
        var exchangeRate = toRate / fromRate;
        rateEl.textContent = "1 " + from + " = " + exchangeRate.toFixed(4) + " " + to;
      }

      function formatNumber(num) {
        if (num >= 1000) {
          return num.toLocaleString("zh-CN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        }
        return num.toFixed(2);
      }

      function swapCurrencies() {
        var temp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = temp;
        convert();
      }

      function toggleTheme() {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }

      init();
    
