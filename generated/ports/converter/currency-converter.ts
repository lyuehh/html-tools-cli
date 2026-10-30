// @ts-nocheck
// Generated from tools/converter/currency-converter.html
// Source SHA-256: cc34e6850efcb1184b26f9f7216c0f7c303f8c3a3945021616ed9c30296f65bb
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const currencies = [
        { code: "CNY", name: "人民币", flag: "🇨🇳", rate: 1 },
        { code: "USD", name: "美元", flag: "🇺🇸", rate: 0.1389 },
        { code: "EUR", name: "欧元", flag: "🇪🇺", rate: 0.1278 },
        { code: "GBP", name: "英镑", flag: "🇬🇧", rate: 0.1096 },
        { code: "JPY", name: "日元", flag: "🇯🇵", rate: 20.83 },
        { code: "KRW", name: "韩元", flag: "🇰🇷", rate: 184.5 },
        { code: "HKD", name: "港币", flag: "🇭🇰", rate: 1.086 },
        { code: "TWD", name: "台币", flag: "🇹🇼", rate: 4.48 },
        { code: "SGD", name: "新加坡元", flag: "🇸🇬", rate: 0.186 },
        { code: "AUD", name: "澳元", flag: "🇦🇺", rate: 0.212 },
        { code: "CAD", name: "加元", flag: "🇨🇦", rate: 0.189 },
        { code: "CHF", name: "瑞士法郎", flag: "🇨🇭", rate: 0.122 },
        { code: "THB", name: "泰铢", flag: "🇹🇭", rate: 4.86 },
        { code: "MYR", name: "马来西亚林吉特", flag: "🇲🇾", rate: 0.655 },
        { code: "RUB", name: "俄罗斯卢布", flag: "🇷🇺", rate: 12.6 },
        { code: "INR", name: "印度卢比", flag: "🇮🇳", rate: 11.56 }
      ];

      let fromCurrency = currencies[0];
      let toCurrency = currencies[1];

      function renderDropdown(type) {
        const dropdown = document.getElementById(type + "Dropdown");
        dropdown.innerHTML = `
                <div class="dropdown-search">
                    <input type="search" placeholder="搜索货币..." oninput="filterCurrencies('${type}', this.value)">
                </div>
                <div class="dropdown-list" id="${type}List">
                    ${currencies
                      .map(
                        (c) => `
                        <div class="dropdown-item" onclick="selectCurrency('${type}', '${c.code}')">
                            <span style="font-size: 24px;">${c.flag}</span>
                            <div>
                                <div style="font-weight: 600;">${c.code}</div>
                                <div style="font-size: 12px; color: #666;">${c.name}</div>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `;
      }

      function showDropdown(type) {
        const dropdown = document.getElementById(type + "Dropdown");
        document.querySelectorAll(".dropdown").forEach((d) => d.classList.remove("show"));
        dropdown.classList.toggle("show");
      }

      function filterCurrencies(type, query) {
        const list = document.getElementById(type + "List");
        const filtered = currencies.filter(
          (c) => c.code.toLowerCase().includes(query.toLowerCase()) || c.name.includes(query)
        );
        list.innerHTML = filtered
          .map(
            (c) => `
                <div class="dropdown-item" onclick="selectCurrency('${type}', '${c.code}')">
                    <span style="font-size: 24px;">${c.flag}</span>
                    <div>
                        <div style="font-weight: 600;">${c.code}</div>
                        <div style="font-size: 12px; color: #666;">${c.name}</div>
                    </div>
                </div>
            `
          )
          .join("");
      }

      function selectCurrency(type, code) {
        const currency = currencies.find((c) => c.code === code);
        if (type === "from") {
          fromCurrency = currency;
          document.getElementById("fromFlag").textContent = currency.flag;
          document.getElementById("fromCode").textContent = currency.code;
        } else {
          toCurrency = currency;
          document.getElementById("toFlag").textContent = currency.flag;
          document.getElementById("toCode").textContent = currency.code;
        }
        document.querySelectorAll(".dropdown").forEach((d) => d.classList.remove("show"));
        convert("from");
      }

      function convert(from) {
        const amount = parseFloat(document.getElementById("fromAmount").value) || 0;
        // Convert through CNY as base
        const inCNY = amount / fromCurrency.rate;
        const result = inCNY * toCurrency.rate;

        document.getElementById("toAmount").value = result.toFixed(2);

        const rate = (toCurrency.rate / fromCurrency.rate).toFixed(4);
        document.getElementById("rateInfo").textContent =
          `1 ${fromCurrency.code} = ${rate} ${toCurrency.code}`;
      }

      function swapCurrencies() {
        const temp = fromCurrency;
        fromCurrency = toCurrency;
        toCurrency = temp;

        document.getElementById("fromFlag").textContent = fromCurrency.flag;
        document.getElementById("fromCode").textContent = fromCurrency.code;
        document.getElementById("toFlag").textContent = toCurrency.flag;
        document.getElementById("toCode").textContent = toCurrency.code;

        const tempVal = document.getElementById("fromAmount").value;
        document.getElementById("fromAmount").value = document.getElementById("toAmount").value;
        convert("from");
      }

      function setQuick(code) {
        selectCurrency("to", code);
      }

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".currency-select") && !e.target.closest(".dropdown")) {
          document.querySelectorAll(".dropdown").forEach((d) => d.classList.remove("show"));
        }
      });

      renderDropdown("from");
      renderDropdown("to");
      convert("from");
    
