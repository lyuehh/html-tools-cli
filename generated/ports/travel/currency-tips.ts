// @ts-nocheck
// Generated from tools/travel/currency-tips.html
// Source SHA-256: 67cab1379de1ecefbc8544e89dcaccb716fcd49ca8c255faa5a1256a115c4583
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const countries = [
        {
          flag: "🇺🇸",
          name: "美国",
          currency: "USD 美元",
          symbol: "$",
          exchange: "银行换汇或当地ATM取现，汇率较好",
          payment: ["信用卡", "Apple Pay", "现金"],
          tip: "餐厅15-20%，酒店行李员$1-2/件，出租车10-15%",
          notes: "信用卡非常普及，建议带芯片卡。部分商店可能要求ID证件。",
          prepareAmount: "建议准备$200-500现金零用"
        },
        {
          flag: "🇯🇵",
          name: "日本",
          currency: "JPY 日元",
          symbol: "¥",
          exchange: "机场或市内银行换汇，7-11便利店ATM支持银联",
          payment: ["现金为主", "IC卡(Suica/Pasmo)", "信用卡"],
          tip: "不需要小费，给小费可能被视为不礼貌",
          notes: "日本仍以现金为主，很多小店不收卡。建议多准备现金。",
          prepareAmount: "建议准备¥30,000-50,000现金"
        },
        {
          flag: "🇰🇷",
          name: "韩国",
          currency: "KRW 韩元",
          symbol: "₩",
          exchange: "明洞换汇所汇率最好，银行其次",
          payment: ["信用卡", "T-money卡", "支付宝/微信"],
          tip: "一般不需要小费",
          notes: "信用卡接受度高，支付宝在大型商场可用。",
          prepareAmount: "建议准备₩200,000-300,000现金"
        },
        {
          flag: "🇹🇭",
          name: "泰国",
          currency: "THB 泰铢",
          symbol: "฿",
          exchange: "Super Rich等换汇店汇率最好，避免机场换汇",
          payment: ["现金", "支付宝/微信", "信用卡"],
          tip: "高档餐厅5-10%，按摩50-100泰铢",
          notes: "现金仍是主流，小摊小店只收现金。",
          prepareAmount: "建议准备฿5,000-10,000现金"
        },
        {
          flag: "🇸🇬",
          name: "新加坡",
          currency: "SGD 新加坡元",
          symbol: "S$",
          exchange: "牛车水换汇店汇率较好",
          payment: ["信用卡", "GrabPay", "NETS", "现金"],
          tip: "账单通常已含10%服务费，不需额外小费",
          notes: "电子支付非常发达，大部分地方支持无现金。",
          prepareAmount: "建议准备S$100-200现金"
        },
        {
          flag: "🇬🇧",
          name: "英国",
          currency: "GBP 英镑",
          symbol: "£",
          exchange: "银行或正规换汇店，避免机场",
          payment: ["信用卡", "Apple Pay", "现金"],
          tip: "餐厅10-15%（常已含服务费），出租车10%",
          notes: "接受度高的是芯片卡和非接触支付。",
          prepareAmount: "建议准备£100-200现金"
        },
        {
          flag: "🇫🇷",
          name: "法国",
          currency: "EUR 欧元",
          symbol: "€",
          exchange: "银行或ATM取现，避免街头换汇店",
          payment: ["信用卡", "现金"],
          tip: "账单已含服务费，可留零头表示满意",
          notes: "大部分商户接受信用卡，但小店可能只收现金。",
          prepareAmount: "建议准备€100-300现金"
        },
        {
          flag: "🇦🇺",
          name: "澳大利亚",
          currency: "AUD 澳元",
          symbol: "A$",
          exchange: "机场换少量，市区换汇店更划算",
          payment: ["信用卡", "Apple Pay", "现金"],
          tip: "不是必须，满意可给10%",
          notes: "非接触支付非常普及，很多地方甚至不收现金。",
          prepareAmount: "建议准备A$100-200现金"
        },
        {
          flag: "🇻🇳",
          name: "越南",
          currency: "VND 越南盾",
          symbol: "₫",
          exchange: "金店换汇汇率最好，银行其次",
          payment: ["现金为主", "大城市支持支付宝"],
          tip: "高档场所$1-2美元小费",
          notes: "现金为王，准备足够现金。美元也广泛接受。",
          prepareAmount: "建议准备2,000,000-5,000,000₫"
        },
        {
          flag: "🇲🇾",
          name: "马来西亚",
          currency: "MYR 林吉特",
          symbol: "RM",
          exchange: "换汇店汇率好于银行",
          payment: ["现金", "GrabPay", "信用卡"],
          tip: "已含服务费，不需额外小费",
          notes: "现金仍是主流，尤其是小店和夜市。",
          prepareAmount: "建议准备RM300-500现金"
        }
      ];

      function renderCountries(filter = "") {
        const list = document.getElementById("countryList");
        const filtered = filter
          ? countries.filter(
              (c) =>
                c.name.includes(filter) || c.currency.toLowerCase().includes(filter.toLowerCase())
            )
          : countries;

        list.innerHTML = filtered
          .map(
            (c, i) => `
        <div class="country-card" data-index="${i}">
          <div class="country-header" onclick="toggleCard(${i})">
            <span class="country-flag">${c.flag}</span>
            <div class="country-info">
              <div class="country-name">${c.name}</div>
              <div class="country-currency">${c.currency} (${c.symbol})</div>
            </div>
            <span class="expand-icon">▼</span>
          </div>
          <div class="country-details">
            <div class="detail-section">
              <div class="detail-title">💱 换汇建议</div>
              <div class="detail-content">${c.exchange}</div>
            </div>

            <div class="detail-section">
              <div class="detail-title">💳 支付方式</div>
              <div class="detail-content">
                ${c.payment.map((p) => `<span class="tag tag-blue">${p}</span>`).join("")}
              </div>
            </div>

            <div class="detail-section">
              <div class="detail-title">💰 小费习惯</div>
              <div class="detail-content">${c.tip}</div>
            </div>

            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-label">建议携带现金</div>
                <div class="detail-value">${c.prepareAmount}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">货币符号</div>
                <div class="detail-value">${c.symbol}</div>
              </div>
            </div>

            <div class="tips-box">
              <div class="tips-title">📝 注意事项</div>
              <div class="tips-content">${c.notes}</div>
            </div>
          </div>
        </div>
      `
          )
          .join("");
      }

      function toggleCard(index) {
        const cards = document.querySelectorAll(".country-card");
        cards[index].classList.toggle("expanded");
      }

      function filterCountries() {
        const query = document.getElementById("searchInput").value.trim();
        renderCountries(query);
      }

      // Initialize
      renderCountries();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
