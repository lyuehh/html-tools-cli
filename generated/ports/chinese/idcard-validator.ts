// @ts-nocheck
// Generated from tools/chinese/idcard-validator.html
// Source SHA-256: d5ae1d11c14dc2df32620a2b082a869617af00881739c5a176296ecbca9b41c4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 地区码数据
      const regionData = {
        11: "北京市",
        12: "天津市",
        13: "河北省",
        14: "山西省",
        15: "内蒙古自治区",
        21: "辽宁省",
        22: "吉林省",
        23: "黑龙江省",
        31: "上海市",
        32: "江苏省",
        33: "浙江省",
        34: "安徽省",
        35: "福建省",
        36: "江西省",
        37: "山东省",
        41: "河南省",
        42: "湖北省",
        43: "湖南省",
        44: "广东省",
        45: "广西壮族自治区",
        46: "海南省",
        50: "重庆市",
        51: "四川省",
        52: "贵州省",
        53: "云南省",
        54: "西藏自治区",
        61: "陕西省",
        62: "甘肃省",
        63: "青海省",
        64: "宁夏回族自治区",
        65: "新疆维吾尔自治区",
        71: "台湾省",
        81: "香港特别行政区",
        82: "澳门特别行政区"
      };

      const cityData = {
        1101: "北京市",
        1201: "天津市",
        3101: "上海市",
        5001: "重庆市",
        1301: "石家庄市",
        1302: "唐山市",
        1303: "秦皇岛市",
        1304: "邯郸市",
        1401: "太原市",
        1402: "大同市",
        1501: "呼和浩特市",
        1502: "包头市",
        2101: "沈阳市",
        2102: "大连市",
        2201: "长春市",
        2301: "哈尔滨市",
        3201: "南京市",
        3202: "无锡市",
        3203: "徐州市",
        3204: "常州市",
        3205: "苏州市",
        3301: "杭州市",
        3302: "宁波市",
        3303: "温州市",
        3401: "合肥市",
        3501: "福州市",
        3502: "厦门市",
        3601: "南昌市",
        3701: "济南市",
        3702: "青岛市",
        4101: "郑州市",
        4102: "开封市",
        4103: "洛阳市",
        4201: "武汉市",
        4301: "长沙市",
        4401: "广州市",
        4403: "深圳市",
        4501: "南宁市",
        4601: "海口市",
        5101: "成都市",
        5201: "贵阳市",
        5301: "昆明市",
        5401: "拉萨市",
        6101: "西安市",
        6201: "兰州市",
        6301: "西宁市",
        6401: "银川市",
        6501: "乌鲁木齐市"
      };

      // 生肖
      const zodiacs = ["猴", "鸡", "狗", "猪", "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊"];

      // 星座
      function getConstellation(month, day) {
        const dates = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22];
        const names = [
          "水瓶座",
          "双鱼座",
          "白羊座",
          "金牛座",
          "双子座",
          "巨蟹座",
          "狮子座",
          "处女座",
          "天秤座",
          "天蝎座",
          "射手座",
          "摩羯座"
        ];
        return day < dates[month - 1] ? names[month - 1] : names[month % 12];
      }

      // 验证输入
      function validateInput() {
        const input = document.getElementById("idInput");
        input.value = input.value.toUpperCase().replace(/[^0-9X]/g, "");
      }

      // 从剪贴板粘贴
      async function pasteFromClipboard() {
        try {
          const text = await navigator.clipboard.readText();
          document.getElementById("idInput").value = text.trim().toUpperCase();
          validateInput();
        } catch (e) {
          console.error("无法访问剪贴板");
        }
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

      // 验证日期有效性
      function isValidDate(year, month, day) {
        const date = new Date(year, month - 1, day);
        return (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day &&
          date <= new Date()
        );
      }

      // 主验证函数
      function validate() {
        const id = document.getElementById("idInput").value.trim();
        const errorMsg = document.getElementById("errorMsg");
        const resultSection = document.getElementById("resultSection");
        const resultHero = document.getElementById("resultHero");
        const infoCard = document.getElementById("infoCard");

        errorMsg.classList.add("hidden");

        // 基本格式验证
        if (id.length !== 18) {
          showError("请输入18位身份证号码");
          return;
        }

        if (!/^\d{17}[\dX]$/.test(id)) {
          showError("身份证号码格式不正确");
          return;
        }

        // 地区码验证
        const provinceCode = id.substring(0, 2);
        if (!regionData[provinceCode]) {
          showResult(false, "地区码无效");
          return;
        }

        // 出生日期验证
        const year = parseInt(id.substring(6, 10));
        const month = parseInt(id.substring(10, 12));
        const day = parseInt(id.substring(12, 14));

        if (!isValidDate(year, month, day)) {
          showResult(false, "出生日期无效");
          return;
        }

        // 校验码验证
        const expectedCheck = calcCheckCode(id.substring(0, 17));
        if (id.charAt(17) !== expectedCheck) {
          showResult(false, "校验码错误");
          return;
        }

        // 验证通过，显示解析信息
        showResult(true, "身份证号码有效");
        showParsedInfo(id, year, month, day);
      }

      function showError(msg) {
        const errorMsg = document.getElementById("errorMsg");
        errorMsg.textContent = msg;
        errorMsg.classList.remove("hidden");
        document.getElementById("resultSection").classList.add("hidden");
      }

      function showResult(valid, message) {
        const resultSection = document.getElementById("resultSection");
        const resultHero = document.getElementById("resultHero");
        const infoCard = document.getElementById("infoCard");

        resultSection.classList.remove("hidden");
        resultHero.className = "result-hero " + (valid ? "valid" : "invalid");
        document.getElementById("resultIcon").textContent = valid ? "✓" : "✗";
        document.getElementById("resultStatus").textContent = message;

        if (!valid) {
          infoCard.classList.add("hidden");
        } else {
          infoCard.classList.remove("hidden");
        }
      }

      function showParsedInfo(id, year, month, day) {
        // 地区
        const provinceCode = id.substring(0, 2);
        const cityCode = id.substring(0, 4);
        let region = regionData[provinceCode];
        if (cityData[cityCode]) {
          region += " " + cityData[cityCode];
        }
        document.getElementById("region").textContent = region;

        // 出生日期
        document.getElementById("birthDate").textContent = `${year}年${month}月${day}日`;

        // 性别
        const genderCode = parseInt(id.charAt(16));
        document.getElementById("gender").textContent = genderCode % 2 === 1 ? "男" : "女";

        // 年龄
        const today = new Date();
        let age = today.getFullYear() - year;
        if (
          today.getMonth() + 1 < month ||
          (today.getMonth() + 1 === month && today.getDate() < day)
        ) {
          age--;
        }
        document.getElementById("age").textContent = age + "岁";

        // 生肖
        document.getElementById("zodiac").textContent = zodiacs[year % 12];

        // 星座
        document.getElementById("constellation").textContent = getConstellation(month, day);

        // 号码结构解析
        const partsContainer = document.getElementById("idParts");
        partsContainer.textContent = "";

        const parts = [
          { text: id.substring(0, 6), class: "region", title: "地区码" },
          { text: id.substring(6, 14), class: "birth", title: "出生日期" },
          { text: id.substring(14, 17), class: "seq", title: "顺序码" },
          { text: id.substring(17, 18), class: "check", title: "校验码" }
        ];

        parts.forEach((part) => {
          const span = document.createElement("span");
          span.className = "id-part " + part.class;
          span.textContent = part.text;
          span.title = part.title;
          partsContainer.appendChild(span);
        });
      }

      // 回车键触发验证
      document.getElementById("idInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") validate();
      });

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
    
