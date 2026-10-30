// @ts-nocheck
// Generated from tools/travel/driving-side.html
// Source SHA-256: 4cc04f8a0a081d7b59bfe43278e7a5b7824c9b2a00c9f6af25d56ee2bcb75471
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Country data - "left" means drives on left side
      var COUNTRIES = {
        // Right-hand traffic (most countries)
        US: { name: "美国", flag: "🇺🇸", side: "right" },
        CA: { name: "加拿大", flag: "🇨🇦", side: "right" },
        MX: { name: "墨西哥", flag: "🇲🇽", side: "right" },
        BR: { name: "巴西", flag: "🇧🇷", side: "right" },
        AR: { name: "阿根廷", flag: "🇦🇷", side: "right" },
        CL: { name: "智利", flag: "🇨🇱", side: "right" },
        PE: { name: "秘鲁", flag: "🇵🇪", side: "right" },
        CO: { name: "哥伦比亚", flag: "🇨🇴", side: "right" },
        VE: { name: "委内瑞拉", flag: "🇻🇪", side: "right" },
        EC: { name: "厄瓜多尔", flag: "🇪🇨", side: "right" },
        DE: { name: "德国", flag: "🇩🇪", side: "right" },
        FR: { name: "法国", flag: "🇫🇷", side: "right" },
        IT: { name: "意大利", flag: "🇮🇹", side: "right" },
        ES: { name: "西班牙", flag: "🇪🇸", side: "right" },
        PT: { name: "葡萄牙", flag: "🇵🇹", side: "right" },
        NL: { name: "荷兰", flag: "🇳🇱", side: "right" },
        BE: { name: "比利时", flag: "🇧🇪", side: "right" },
        CH: { name: "瑞士", flag: "🇨🇭", side: "right" },
        AT: { name: "奥地利", flag: "🇦🇹", side: "right" },
        SE: { name: "瑞典", flag: "🇸🇪", side: "right" },
        NO: { name: "挪威", flag: "🇳🇴", side: "right" },
        DK: { name: "丹麦", flag: "🇩🇰", side: "right" },
        FI: { name: "芬兰", flag: "🇫🇮", side: "right" },
        IS: { name: "冰岛", flag: "🇮🇸", side: "right" },
        GR: { name: "希腊", flag: "🇬🇷", side: "right" },
        PL: { name: "波兰", flag: "🇵🇱", side: "right" },
        CZ: { name: "捷克", flag: "🇨🇿", side: "right" },
        HU: { name: "匈牙利", flag: "🇭🇺", side: "right" },
        RO: { name: "罗马尼亚", flag: "🇷🇴", side: "right" },
        BG: { name: "保加利亚", flag: "🇧🇬", side: "right" },
        HR: { name: "克罗地亚", flag: "🇭🇷", side: "right" },
        RS: { name: "塞尔维亚", flag: "🇷🇸", side: "right" },
        SK: { name: "斯洛伐克", flag: "🇸🇰", side: "right" },
        SI: { name: "斯洛文尼亚", flag: "🇸🇮", side: "right" },
        EE: { name: "爱沙尼亚", flag: "🇪🇪", side: "right" },
        LV: { name: "拉脱维亚", flag: "🇱🇻", side: "right" },
        LT: { name: "立陶宛", flag: "🇱🇹", side: "right" },
        RU: { name: "俄罗斯", flag: "🇷🇺", side: "right" },
        UA: { name: "乌克兰", flag: "🇺🇦", side: "right" },
        BY: { name: "白俄罗斯", flag: "🇧🇾", side: "right" },
        TR: { name: "土耳其", flag: "🇹🇷", side: "right" },
        CN: { name: "中国", flag: "🇨🇳", side: "right" },
        TW: { name: "中国台湾", flag: "🇹🇼", side: "right" },
        KR: { name: "韩国", flag: "🇰🇷", side: "right" },
        KP: { name: "朝鲜", flag: "🇰🇵", side: "right" },
        MN: { name: "蒙古", flag: "🇲🇳", side: "right" },
        VN: { name: "越南", flag: "🇻🇳", side: "right" },
        PH: { name: "菲律宾", flag: "🇵🇭", side: "right" },
        KH: { name: "柬埔寨", flag: "🇰🇭", side: "right" },
        LA: { name: "老挝", flag: "🇱🇦", side: "right" },
        MM: { name: "缅甸", flag: "🇲🇲", side: "right" },
        AE: { name: "阿联酋", flag: "🇦🇪", side: "right" },
        SA: { name: "沙特阿拉伯", flag: "🇸🇦", side: "right" },
        QA: { name: "卡塔尔", flag: "🇶🇦", side: "right" },
        KW: { name: "科威特", flag: "🇰🇼", side: "right" },
        BH: { name: "巴林", flag: "🇧🇭", side: "right" },
        OM: { name: "阿曼", flag: "🇴🇲", side: "right" },
        JO: { name: "约旦", flag: "🇯🇴", side: "right" },
        LB: { name: "黎巴嫩", flag: "🇱🇧", side: "right" },
        EG: { name: "埃及", flag: "🇪🇬", side: "right" },
        MA: { name: "摩洛哥", flag: "🇲🇦", side: "right" },
        TN: { name: "突尼斯", flag: "🇹🇳", side: "right" },
        DZ: { name: "阿尔及利亚", flag: "🇩🇿", side: "right" },
        IL: { name: "以色列", flag: "🇮🇱", side: "right" },
        IR: { name: "伊朗", flag: "🇮🇷", side: "right" },
        IQ: { name: "伊拉克", flag: "🇮🇶", side: "right" },
        AF: { name: "阿富汗", flag: "🇦🇫", side: "right" },
        NG: { name: "尼日利亚", flag: "🇳🇬", side: "right" },
        GH: { name: "加纳", flag: "🇬🇭", side: "right" },
        ET: { name: "埃塞俄比亚", flag: "🇪🇹", side: "right" },
        SN: { name: "塞内加尔", flag: "🇸🇳", side: "right" },
        CI: { name: "科特迪瓦", flag: "🇨🇮", side: "right" },
        CM: { name: "喀麦隆", flag: "🇨🇲", side: "right" },
        AO: { name: "安哥拉", flag: "🇦🇴", side: "right" },
        SD: { name: "苏丹", flag: "🇸🇩", side: "right" },
        LY: { name: "利比亚", flag: "🇱🇾", side: "right" },
        CU: { name: "古巴", flag: "🇨🇺", side: "right" },
        DO: { name: "多米尼加", flag: "🇩🇴", side: "right" },
        HT: { name: "海地", flag: "🇭🇹", side: "right" },
        PA: { name: "巴拿马", flag: "🇵🇦", side: "right" },
        CR: { name: "哥斯达黎加", flag: "🇨🇷", side: "right" },
        GT: { name: "危地马拉", flag: "🇬🇹", side: "right" },
        HN: { name: "洪都拉斯", flag: "🇭🇳", side: "right" },
        NI: { name: "尼加拉瓜", flag: "🇳🇮", side: "right" },
        SV: { name: "萨尔瓦多", flag: "🇸🇻", side: "right" },
        PY: { name: "巴拉圭", flag: "🇵🇾", side: "right" },
        UY: { name: "乌拉圭", flag: "🇺🇾", side: "right" },
        BO: { name: "玻利维亚", flag: "🇧🇴", side: "right" },
        // Left-hand traffic
        GB: { name: "英国", flag: "🇬🇧", side: "left" },
        IE: { name: "爱尔兰", flag: "🇮🇪", side: "left" },
        JP: { name: "日本", flag: "🇯🇵", side: "left" },
        AU: { name: "澳大利亚", flag: "🇦🇺", side: "left" },
        NZ: { name: "新西兰", flag: "🇳🇿", side: "left" },
        HK: { name: "中国香港", flag: "🇭🇰", side: "left" },
        MO: { name: "中国澳门", flag: "🇲🇴", side: "left" },
        SG: { name: "新加坡", flag: "🇸🇬", side: "left" },
        MY: { name: "马来西亚", flag: "🇲🇾", side: "left" },
        TH: { name: "泰国", flag: "🇹🇭", side: "left" },
        ID: { name: "印度尼西亚", flag: "🇮🇩", side: "left" },
        IN: { name: "印度", flag: "🇮🇳", side: "left" },
        PK: { name: "巴基斯坦", flag: "🇵🇰", side: "left" },
        BD: { name: "孟加拉国", flag: "🇧🇩", side: "left" },
        LK: { name: "斯里兰卡", flag: "🇱🇰", side: "left" },
        NP: { name: "尼泊尔", flag: "🇳🇵", side: "left" },
        BT: { name: "不丹", flag: "🇧🇹", side: "left" },
        MV: { name: "马尔代夫", flag: "🇲🇻", side: "left" },
        ZA: { name: "南非", flag: "🇿🇦", side: "left" },
        KE: { name: "肯尼亚", flag: "🇰🇪", side: "left" },
        TZ: { name: "坦桑尼亚", flag: "🇹🇿", side: "left" },
        UG: { name: "乌干达", flag: "🇺🇬", side: "left" },
        ZW: { name: "津巴布韦", flag: "🇿🇼", side: "left" },
        BW: { name: "博茨瓦纳", flag: "🇧🇼", side: "left" },
        NA: { name: "纳米比亚", flag: "🇳🇦", side: "left" },
        MU: { name: "毛里求斯", flag: "🇲🇺", side: "left" },
        SC: { name: "塞舌尔", flag: "🇸🇨", side: "left" },
        CY: { name: "塞浦路斯", flag: "🇨🇾", side: "left" },
        MT: { name: "马耳他", flag: "🇲🇹", side: "left" },
        JM: { name: "牙买加", flag: "🇯🇲", side: "left" },
        TT: { name: "特立尼达和多巴哥", flag: "🇹🇹", side: "left" },
        BB: { name: "巴巴多斯", flag: "🇧🇧", side: "left" },
        BS: { name: "巴哈马", flag: "🇧🇸", side: "left" },
        AG: { name: "安提瓜和巴布达", flag: "🇦🇬", side: "left" },
        LC: { name: "圣卢西亚", flag: "🇱🇨", side: "left" },
        VC: { name: "圣文森特和格林纳丁斯", flag: "🇻🇨", side: "left" },
        GD: { name: "格林纳达", flag: "🇬🇩", side: "left" },
        KN: { name: "圣基茨和尼维斯", flag: "🇰🇳", side: "left" },
        FJ: { name: "斐济", flag: "🇫🇯", side: "left" },
        TO: { name: "汤加", flag: "🇹🇴", side: "left" },
        WS: { name: "萨摩亚", flag: "🇼🇸", side: "left" },
        KI: { name: "基里巴斯", flag: "🇰🇮", side: "left" },
        NR: { name: "瑙鲁", flag: "🇳🇷", side: "left" },
        PG: { name: "巴布亚新几内亚", flag: "🇵🇬", side: "left" },
        SB: { name: "所罗门群岛", flag: "🇸🇧", side: "left" },
        BN: { name: "文莱", flag: "🇧🇳", side: "left" },
        TL: { name: "东帝汶", flag: "🇹🇱", side: "left" },
        SZ: { name: "斯威士兰", flag: "🇸🇿", side: "left" },
        LS: { name: "莱索托", flag: "🇱🇸", side: "left" },
        MZ: { name: "莫桑比克", flag: "🇲🇿", side: "left" },
        MW: { name: "马拉维", flag: "🇲🇼", side: "left" },
        ZM: { name: "赞比亚", flag: "🇿🇲", side: "left" },
        GY: { name: "圭亚那", flag: "🇬🇾", side: "left" },
        SR: { name: "苏里南", flag: "🇸🇷", side: "left" }
      };

      var currentFilter = "all";
      var searchTerm = "";

      // Theme toggle
      function toggleTheme() {
        var isDark = document.body.getAttribute("data-theme") !== "light";
        document.body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      // Load theme
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      // Toast
      function showToast(msg) {
        var toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      // Update statistics
      function updateStats() {
        var leftCount = 0;
        var rightCount = 0;
        Object.keys(COUNTRIES).forEach(function (code) {
          if (COUNTRIES[code].side === "left") {
            leftCount++;
          } else {
            rightCount++;
          }
        });
        document.getElementById("leftCount").textContent = leftCount;
        document.getElementById("rightCount").textContent = rightCount;
      }

      // Initialize country select
      function initCountrySelect() {
        var select = document.getElementById("countrySelect");
        select.innerHTML = '<option value="">-- 请选择国家 --</option>';

        var countries = Object.keys(COUNTRIES).map(function (code) {
          return { code: code, data: COUNTRIES[code] };
        });
        countries.sort(function (a, b) {
          return a.data.name.localeCompare(b.data.name, "zh-CN");
        });

        countries.forEach(function (item) {
          var option = document.createElement("option");
          option.value = item.code;
          option.textContent = item.data.flag + " " + item.data.name;
          select.appendChild(option);
        });
      }

      // Filter and render country list
      function renderCountryList() {
        var list = document.getElementById("countryList");
        list.innerHTML = "";

        var countries = Object.keys(COUNTRIES).map(function (code) {
          return { code: code, data: COUNTRIES[code] };
        });

        // Filter by side
        if (currentFilter !== "all") {
          countries = countries.filter(function (item) {
            return item.data.side === currentFilter;
          });
        }

        // Filter by search term
        if (searchTerm) {
          var term = searchTerm.toLowerCase();
          countries = countries.filter(function (item) {
            return (
              item.data.name.toLowerCase().indexOf(term) !== -1 ||
              item.code.toLowerCase().indexOf(term) !== -1
            );
          });
        }

        countries.sort(function (a, b) {
          return a.data.name.localeCompare(b.data.name, "zh-CN");
        });

        if (countries.length === 0) {
          list.innerHTML = '<div class="no-results">未找到匹配的国家</div>';
          return;
        }

        countries.forEach(function (item) {
          var tag = document.createElement("span");
          tag.className = "country-tag " + item.data.side + "-side";
          tag.textContent = item.data.flag + " " + item.data.name;
          tag.onclick = function () {
            document.getElementById("countrySelect").value = item.code;
            updateResult();
            document
              .getElementById("resultCard")
              .scrollIntoView({ behavior: "smooth", block: "center" });
          };
          list.appendChild(tag);
        });
      }

      // Select country
      function selectCountry(code) {
        document.getElementById("countrySelect").value = code;
        updateResult();
      }

      // Update result
      function updateResult() {
        var code = document.getElementById("countrySelect").value;
        var resultCard = document.getElementById("resultCard");

        if (!code || !COUNTRIES[code]) {
          resultCard.style.display = "none";
          return;
        }

        var country = COUNTRIES[code];
        resultCard.style.display = "block";

        document.getElementById("countryFlag").textContent = country.flag;
        document.getElementById("countryName").textContent = country.name;

        var indicator = document.getElementById("sideIndicator");
        var icon = document.getElementById("sideIcon");
        var text = document.getElementById("sideText");
        var steering = document.getElementById("steeringPosition");
        var carIcon = document.getElementById("carIcon");
        var laneLabel = document.getElementById("laneLabel");

        if (country.side === "left") {
          indicator.className = "side-indicator side-left";
          icon.textContent = "⬅️";
          text.textContent = "靠左行驶";
          steering.textContent = "右舵车 (方向盘在右侧)";
          carIcon.className = "car-icon left-side";
          laneLabel.textContent = "← 行驶方向";
        } else {
          indicator.className = "side-indicator side-right";
          icon.textContent = "➡️";
          text.textContent = "靠右行驶";
          steering.textContent = "左舵车 (方向盘在左侧)";
          carIcon.className = "car-icon";
          laneLabel.textContent = "行驶方向 →";
        }

        // Save to localStorage and URL
        localStorage.setItem("driving_side_country", code);
        history.replaceState(null, "", "#" + code);
      }

      // Search input handler
      document.getElementById("searchInput").addEventListener("input", function (e) {
        searchTerm = e.target.value;
        renderCountryList();

        // Also filter the select dropdown
        var select = document.getElementById("countrySelect");
        var options = select.querySelectorAll("option");
        var term = searchTerm.toLowerCase();

        options.forEach(function (opt) {
          if (opt.value === "") return;
          var country = COUNTRIES[opt.value];
          if (country) {
            var match =
              country.name.toLowerCase().indexOf(term) !== -1 ||
              opt.value.toLowerCase().indexOf(term) !== -1;
            opt.style.display = match || !searchTerm ? "" : "none";
          }
        });
      });

      // Filter tabs
      document.querySelectorAll(".filter-tab").forEach(function (tab) {
        tab.addEventListener("click", function () {
          document.querySelectorAll(".filter-tab").forEach(function (t) {
            t.classList.remove("active");
          });
          this.classList.add("active");
          currentFilter = this.getAttribute("data-filter");
          renderCountryList();
        });
      });

      // Load from URL hash
      function loadFromHash() {
        var hash = window.location.hash.slice(1);
        if (hash && COUNTRIES[hash]) {
          selectCountry(hash);
        }
      }

      // Initialize
      (function () {
        updateStats();
        initCountrySelect();
        renderCountryList();

        // Load from URL hash first, then localStorage
        var hash = window.location.hash.slice(1);
        if (hash && COUNTRIES[hash]) {
          selectCountry(hash);
        } else {
          var saved = localStorage.getItem("driving_side_country");
          if (saved && COUNTRIES[saved]) {
            selectCountry(saved);
          }
        }
      })();

      // Listen for hash changes
      window.addEventListener("hashchange", loadFromHash);
    
