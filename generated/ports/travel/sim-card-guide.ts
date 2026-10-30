// @ts-nocheck
// Generated from tools/travel/sim-card-guide.html
// Source SHA-256: bcef992129cae4eb7c2a32d0e80aefd13df939bab5c92d9b57a1964fe34576ba
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var countries = [
        {
          name: "日本",
          nameEn: "Japan",
          flag: "🇯🇵",
          providers: "Docomo, SoftBank, AU",
          options: [
            { type: "旅游SIM卡", details: "7天无限流量（限速后）", price: "约¥60-100" },
            { type: "WiFi租赁", details: "机场取还，多人共享", price: "约¥25-40/天" },
            { type: "eSIM", details: "即买即用，推荐Ubigi/Airalo", price: "约¥50-80/7天" }
          ],
          purchase: "机场、电器店、便利店均可购买"
        },
        {
          name: "韩国",
          nameEn: "South Korea",
          flag: "🇰🇷",
          providers: "SK Telecom, KT, LG U+",
          options: [
            { type: "旅游SIM卡", details: "5天无限流量4G", price: "约¥50-80" },
            { type: "WiFi蛋", details: "机场取还", price: "约¥20-35/天" },
            { type: "eSIM", details: "KT或SK的eSIM套餐", price: "约¥40-70/5天" }
          ],
          purchase: "仁川机场、明洞便利店、淘宝提前购买"
        },
        {
          name: "泰国",
          nameEn: "Thailand",
          flag: "🇹🇭",
          providers: "AIS, DTAC, TrueMove",
          options: [
            { type: "旅游SIM卡", details: "8天15GB+通话", price: "约¥30-50" },
            { type: "无限流量", details: "7天真无限流量", price: "约¥60-100" },
            { type: "eSIM", details: "AIS提供eSIM服务", price: "约¥40-60/7天" }
          ],
          purchase: "机场7-11、AIS/DTAC门店、提前网购"
        },
        {
          name: "新加坡",
          nameEn: "Singapore",
          flag: "🇸🇬",
          providers: "Singtel, StarHub, M1",
          options: [
            { type: "旅游SIM卡", details: "7天100GB", price: "约¥80-120" },
            { type: "预付费卡", details: "hi!Tourist SIM", price: "约¥100-150/15天" },
            { type: "eSIM", details: "Singtel eSIM", price: "约¥60-90/7天" }
          ],
          purchase: "樟宜机场、便利店、运营商门店"
        },
        {
          name: "马来西亚",
          nameEn: "Malaysia",
          flag: "🇲🇾",
          providers: "Maxis, Digi, Celcom, U Mobile",
          options: [
            { type: "旅游SIM卡", details: "7天10GB", price: "约¥20-40" },
            { type: "Hotlink", details: "30天30GB", price: "约¥50-80" },
            { type: "eSIM", details: "Digi eSIM套餐", price: "约¥30-50/7天" }
          ],
          purchase: "机场、购物中心、便利店"
        },
        {
          name: "越南",
          nameEn: "Vietnam",
          flag: "🇻🇳",
          providers: "Viettel, Mobifone, Vinaphone",
          options: [
            { type: "旅游SIM卡", details: "30天60GB", price: "约¥30-50" },
            { type: "无限流量", details: "7天无限流量", price: "约¥40-60" },
            { type: "eSIM", details: "支持部分运营商", price: "约¥25-40/7天" }
          ],
          purchase: "机场柜台、手机店、街边摊位"
        },
        {
          name: "美国",
          nameEn: "United States",
          flag: "🇺🇸",
          providers: "AT&T, Verizon, T-Mobile",
          options: [
            { type: "预付费卡", details: "T-Mobile Tourist Plan 21天", price: "约¥200-300" },
            { type: "eSIM", details: "Airalo/Holafly等", price: "约¥100-200/7天" },
            { type: "WiFi租赁", details: "不限流量", price: "约¥50-80/天" }
          ],
          purchase: "机场、Best Buy、Target、网上预购"
        },
        {
          name: "英国",
          nameEn: "United Kingdom",
          flag: "🇬🇧",
          providers: "EE, Vodafone, Three, O2",
          options: [
            { type: "预付费SIM", details: "Three的Go Roam包含欧洲漫游", price: "约¥100-150/30天" },
            { type: "giffgaff", details: "可邮寄到中国", price: "约¥80-120/月" },
            { type: "eSIM", details: "Three/EE eSIM", price: "约¥60-100/7天" }
          ],
          purchase: "机场、超市、运营商门店"
        },
        {
          name: "欧盟",
          nameEn: "European Union",
          flag: "🇪🇺",
          providers: "各国本地运营商",
          options: [
            { type: "欧洲通用SIM", details: "Orange Holiday 20GB 14天", price: "约¥150-200" },
            { type: "Three UK", details: "可在欧洲71国漫游", price: "约¥100-150" },
            { type: "eSIM", details: "Airalo Europe套餐", price: "约¥80-150/7天" }
          ],
          purchase: "提前网购或落地后在当地运营商购买"
        },
        {
          name: "澳大利亚",
          nameEn: "Australia",
          flag: "🇦🇺",
          providers: "Telstra, Optus, Vodafone",
          options: [
            { type: "预付费SIM", details: "Optus 28天50GB", price: "约¥150-200" },
            { type: "Telstra", details: "覆盖最广但较贵", price: "约¥200-300" },
            { type: "eSIM", details: "三大运营商均支持", price: "约¥100-150/7天" }
          ],
          purchase: "机场、超市、便利店"
        },
        {
          name: "香港",
          nameEn: "Hong Kong",
          flag: "🇭🇰",
          providers: "中国移动香港, CSL, 3HK, SmarTone",
          options: [
            { type: "旅游SIM", details: "8天无限流量", price: "约¥50-80" },
            { type: "中国移动", details: "大湾区套餐含内地流量", price: "约¥80-120" },
            { type: "eSIM", details: "各运营商均支持", price: "约¥40-60/7天" }
          ],
          purchase: "机场、便利店、关口、淘宝"
        },
        {
          name: "台湾",
          nameEn: "Taiwan",
          flag: "🇹🇼",
          providers: "中华电信, 台湾大哥大, 远传, 台湾之星",
          options: [
            { type: "吃到饱SIM", details: "5天无限流量", price: "约¥50-80" },
            { type: "WiFi分享器", details: "多人使用", price: "约¥20-30/天" },
            { type: "eSIM", details: "中华电信eSIM", price: "约¥40-70/5天" }
          ],
          purchase: "机场柜台、便利店、淘宝预购"
        }
      ];

      function toggleTheme() {
        var body = document.body;
        var isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      (function () {
        var saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      function filterCountries() {
        var search = document.getElementById("searchInput").value.toLowerCase();
        var filtered = countries.filter(function (c) {
          return c.name.toLowerCase().includes(search) || c.nameEn.toLowerCase().includes(search);
        });
        renderCountries(filtered);
      }

      function renderCountries(list) {
        var container = document.getElementById("countryList");
        container.textContent = "";

        list.forEach(function (country) {
          var card = document.createElement("div");
          card.className = "country-card";

          var header = document.createElement("div");
          header.className = "country-header";
          var flag = document.createElement("div");
          flag.className = "country-flag";
          flag.textContent = country.flag;
          var nameDiv = document.createElement("div");
          var name = document.createElement("div");
          name.className = "country-name";
          name.textContent = country.name;
          var nameEn = document.createElement("div");
          nameEn.className = "country-name-en";
          nameEn.textContent = country.nameEn;
          nameDiv.appendChild(name);
          nameDiv.appendChild(nameEn);
          header.appendChild(flag);
          header.appendChild(nameDiv);

          var options = document.createElement("div");
          options.className = "sim-options";
          country.options.forEach(function (opt) {
            var optEl = document.createElement("div");
            optEl.className = "sim-option";
            var typeEl = document.createElement("div");
            typeEl.className = "option-type";
            typeEl.textContent = opt.type;
            var detailsDiv = document.createElement("div");
            var detailsEl = document.createElement("div");
            detailsEl.className = "option-details";
            detailsEl.textContent = opt.details;
            var priceEl = document.createElement("div");
            priceEl.className = "option-price";
            priceEl.textContent = opt.price;
            detailsDiv.appendChild(detailsEl);
            detailsDiv.appendChild(priceEl);
            optEl.appendChild(typeEl);
            optEl.appendChild(detailsDiv);
            options.appendChild(optEl);
          });

          var providers = document.createElement("div");
          providers.className = "providers";
          var providersTitle = document.createElement("div");
          providersTitle.className = "providers-title";
          providersTitle.textContent = "主要运营商";
          var providersList = document.createElement("div");
          providersList.className = "providers-list";
          providersList.textContent = country.providers;
          providers.appendChild(providersTitle);
          providers.appendChild(providersList);

          var purchase = document.createElement("div");
          purchase.className = "purchase-info";
          purchase.textContent = "📍 购买地点: " + country.purchase;

          card.appendChild(header);
          card.appendChild(options);
          card.appendChild(providers);
          card.appendChild(purchase);
          container.appendChild(card);
        });
      }

      function showToast(msg) {
        var toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      // Initialize
      filterCountries();
    
