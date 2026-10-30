// @ts-nocheck
// Generated from tools/chinese/idcard-generator.html
// Source SHA-256: 48857e500686dec945d89d5054fadd9b0967eba8d630bd82e82f430fbd2e5565
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 地区码数据（省份-城市映射）
      const regionData = {
        11: { name: "北京市", cities: { 1101: "北京市" } },
        12: { name: "天津市", cities: { 1201: "天津市" } },
        13: {
          name: "河北省",
          cities: {
            1301: "石家庄市",
            1302: "唐山市",
            1303: "秦皇岛市",
            1304: "邯郸市",
            1305: "邢台市",
            1306: "保定市"
          }
        },
        14: {
          name: "山西省",
          cities: { 1401: "太原市", 1402: "大同市", 1403: "阳泉市", 1404: "长治市", 1405: "晋城市" }
        },
        15: {
          name: "内蒙古",
          cities: { 1501: "呼和浩特市", 1502: "包头市", 1503: "乌海市", 1504: "赤峰市" }
        },
        21: {
          name: "辽宁省",
          cities: { 2101: "沈阳市", 2102: "大连市", 2103: "鞍山市", 2104: "抚顺市", 2105: "本溪市" }
        },
        22: {
          name: "吉林省",
          cities: { 2201: "长春市", 2202: "吉林市", 2203: "四平市", 2204: "辽源市" }
        },
        23: {
          name: "黑龙江省",
          cities: { 2301: "哈尔滨市", 2302: "齐齐哈尔市", 2303: "鸡西市", 2304: "鹤岗市" }
        },
        31: { name: "上海市", cities: { 3101: "上海市" } },
        32: {
          name: "江苏省",
          cities: { 3201: "南京市", 3202: "无锡市", 3203: "徐州市", 3204: "常州市", 3205: "苏州市" }
        },
        33: {
          name: "浙江省",
          cities: { 3301: "杭州市", 3302: "宁波市", 3303: "温州市", 3304: "嘉兴市", 3305: "湖州市" }
        },
        34: {
          name: "安徽省",
          cities: {
            3401: "合肥市",
            3402: "芜湖市",
            3403: "蚌埠市",
            3404: "淮南市",
            3405: "马鞍山市"
          }
        },
        35: {
          name: "福建省",
          cities: { 3501: "福州市", 3502: "厦门市", 3503: "莆田市", 3504: "三明市", 3505: "泉州市" }
        },
        36: {
          name: "江西省",
          cities: { 3601: "南昌市", 3602: "景德镇市", 3603: "萍乡市", 3604: "九江市" }
        },
        37: {
          name: "山东省",
          cities: { 3701: "济南市", 3702: "青岛市", 3703: "淄博市", 3704: "枣庄市", 3705: "东营市" }
        },
        41: {
          name: "河南省",
          cities: { 4101: "郑州市", 4102: "开封市", 4103: "洛阳市", 4104: "平顶山市" }
        },
        42: {
          name: "湖北省",
          cities: { 4201: "武汉市", 4202: "黄石市", 4203: "十堰市", 4205: "宜昌市" }
        },
        43: {
          name: "湖南省",
          cities: { 4301: "长沙市", 4302: "株洲市", 4303: "湘潭市", 4304: "衡阳市" }
        },
        44: {
          name: "广东省",
          cities: { 4401: "广州市", 4402: "韶关市", 4403: "深圳市", 4404: "珠海市", 4406: "佛山市" }
        },
        45: {
          name: "广西",
          cities: { 4501: "南宁市", 4502: "柳州市", 4503: "桂林市", 4504: "梧州市" }
        },
        46: { name: "海南省", cities: { 4601: "海口市", 4602: "三亚市" } },
        50: { name: "重庆市", cities: { 5001: "重庆市" } },
        51: {
          name: "四川省",
          cities: { 5101: "成都市", 5103: "自贡市", 5104: "攀枝花市", 5105: "泸州市" }
        },
        52: { name: "贵州省", cities: { 5201: "贵阳市", 5202: "六盘水市", 5203: "遵义市" } },
        53: { name: "云南省", cities: { 5301: "昆明市", 5303: "曲靖市", 5304: "玉溪市" } },
        54: { name: "西藏", cities: { 5401: "拉萨市" } },
        61: {
          name: "陕西省",
          cities: { 6101: "西安市", 6102: "铜川市", 6103: "宝鸡市", 6104: "咸阳市" }
        },
        62: { name: "甘肃省", cities: { 6201: "兰州市", 6202: "嘉峪关市", 6203: "金昌市" } },
        63: { name: "青海省", cities: { 6301: "西宁市" } },
        64: { name: "宁夏", cities: { 6401: "银川市", 6402: "石嘴山市" } },
        65: { name: "新疆", cities: { 6501: "乌鲁木齐市", 6502: "克拉玛依市" } }
      };

      let count = 5;
      let selectedGender = "random";
      let generatedIds = [];

      // 初始化省份下拉框
      function initProvinces() {
        const select = document.getElementById("province");
        Object.keys(regionData).forEach((code) => {
          const option = document.createElement("option");
          option.value = code;
          option.textContent = regionData[code].name;
          select.appendChild(option);
        });
      }

      // 更新城市下拉框
      function updateCities() {
        const provinceCode = document.getElementById("province").value;
        const citySelect = document.getElementById("city");
        citySelect.textContent = "";

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "随机城市";
        citySelect.appendChild(defaultOption);

        if (provinceCode && regionData[provinceCode]) {
          const cities = regionData[provinceCode].cities;
          Object.keys(cities).forEach((code) => {
            const option = document.createElement("option");
            option.value = code;
            option.textContent = cities[code];
            citySelect.appendChild(option);
          });
        }
      }

      // 选择性别
      function selectGender(el) {
        document.querySelectorAll(".gender-option").forEach((e) => e.classList.remove("active"));
        el.classList.add("active");
        selectedGender = el.dataset.gender;
      }

      // 修改数量
      function changeCount(delta) {
        count = Math.max(1, Math.min(20, count + delta));
        document.getElementById("countDisplay").textContent = count;
      }

      // 生成随机数
      function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      // 计算校验码
      function calcCheckCode(id17) {
        const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        const checkCodes = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
        let sum = 0;
        for (let i = 0; i < 17; i++) {
          sum += parseInt(id17[i]) * weights[i];
        }
        return checkCodes[sum % 11];
      }

      // 生成单个身份证号
      function generateOne() {
        const provinceCode = document.getElementById("province").value;
        const cityCode = document.getElementById("city").value;
        const yearStart = parseInt(document.getElementById("yearStart").value) || 1970;
        const yearEnd = parseInt(document.getElementById("yearEnd").value) || 2005;

        // 地区码
        let areaCode;
        if (cityCode) {
          areaCode = cityCode + String(random(0, 9)).padStart(2, "0");
        } else if (provinceCode) {
          const cities = Object.keys(regionData[provinceCode].cities);
          const randomCity = cities[random(0, cities.length - 1)];
          areaCode = randomCity + String(random(0, 9)).padStart(2, "0");
        } else {
          const provinces = Object.keys(regionData);
          const randomProvince = provinces[random(0, provinces.length - 1)];
          const cities = Object.keys(regionData[randomProvince].cities);
          const randomCity = cities[random(0, cities.length - 1)];
          areaCode = randomCity + String(random(0, 9)).padStart(2, "0");
        }

        // 出生日期
        const year = random(yearStart, yearEnd);
        const month = random(1, 12);
        const maxDay = new Date(year, month, 0).getDate();
        const day = random(1, maxDay);
        const birthDate = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;

        // 顺序码
        let seqCode;
        if (selectedGender === "male") {
          seqCode = random(0, 49) * 2 + 1; // 奇数
        } else if (selectedGender === "female") {
          seqCode = random(0, 49) * 2; // 偶数
        } else {
          seqCode = random(0, 999);
        }
        seqCode = String(seqCode).padStart(3, "0");

        // 组合前17位并计算校验码
        const id17 = areaCode + birthDate + seqCode;
        const checkCode = calcCheckCode(id17);

        return id17 + checkCode;
      }

      // 生成身份证号码
      function generate() {
        generatedIds = [];
        for (let i = 0; i < count; i++) {
          generatedIds.push(generateOne());
        }
        renderResults();
      }

      // 渲染结果
      function renderResults() {
        const box = document.getElementById("resultBox");
        box.textContent = "";

        if (generatedIds.length === 0) {
          const empty = document.createElement("div");
          empty.style.cssText = "text-align: center; color: var(--text-secondary); padding: 20px;";
          empty.textContent = '点击"生成身份证号码"按钮开始生成';
          box.appendChild(empty);
          return;
        }

        generatedIds.forEach((id, index) => {
          const item = document.createElement("div");
          item.className = "result-item";

          const idSpan = document.createElement("span");
          idSpan.textContent = id;

          const copyBtn = document.createElement("button");
          copyBtn.className = "copy-btn";
          copyBtn.textContent = "复制";
          copyBtn.onclick = () => copyOne(id, copyBtn);

          item.appendChild(idSpan);
          item.appendChild(copyBtn);
          box.appendChild(item);
        });
      }

      // 复制单个
      function copyOne(id, btn) {
        navigator.clipboard.writeText(id).then(() => {
          btn.textContent = "已复制";
          btn.classList.add("copied");
          setTimeout(() => {
            btn.textContent = "复制";
            btn.classList.remove("copied");
          }, 1500);
        });
      }

      // 复制全部
      function copyAll() {
        if (generatedIds.length === 0) return;
        navigator.clipboard.writeText(generatedIds.join("\n")).then(() => {
          alert("已复制 " + generatedIds.length + " 个身份证号码");
        });
      }

      // 清空结果
      function clearResults() {
        generatedIds = [];
        renderResults();
      }

      // 初始化
      initProvinces();

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
    
