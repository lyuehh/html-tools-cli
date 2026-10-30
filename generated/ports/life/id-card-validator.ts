// @ts-nocheck
// Generated from tools/life/id-card-validator.html
// Source SHA-256: f795eb55b2275bce5859a6510d172f7d91ae9377d0444f308760c4fefd72b0cb
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 地区码映射（省级）
      const REGION_MAP = {
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

      // 部分城市码映射
      const CITY_MAP = {
        1101: "北京市",
        1201: "天津市",
        3101: "上海市",
        5001: "重庆市",
        4401: "广州市",
        4403: "深圳市",
        4406: "佛山市",
        4419: "东莞市",
        3301: "杭州市",
        3302: "宁波市",
        3201: "南京市",
        3205: "苏州市",
        5101: "成都市",
        4201: "武汉市",
        4301: "长沙市",
        3701: "济南市",
        3702: "青岛市",
        2101: "沈阳市",
        2102: "大连市",
        6101: "西安市"
      };

      // 校验码加权因子
      const WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 校验码对应值
      const CHECK_CODES = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

      // 生肖
      const ZODIAC = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
      const ZODIAC_ICONS = ["🐀", "🐂", "🐅", "🐇", "🐉", "🐍", "🐴", "🐑", "🐵", "🐔", "🐕", "🐖"];

      // 星座
      const CONSTELLATIONS = [
        { name: "摩羯座", icon: "♑", start: [1, 1], end: [1, 19] },
        { name: "水瓶座", icon: "♒", start: [1, 20], end: [2, 18] },
        { name: "双鱼座", icon: "♓", start: [2, 19], end: [3, 20] },
        { name: "白羊座", icon: "♈", start: [3, 21], end: [4, 19] },
        { name: "金牛座", icon: "♉", start: [4, 20], end: [5, 20] },
        { name: "双子座", icon: "♊", start: [5, 21], end: [6, 21] },
        { name: "巨蟹座", icon: "♋", start: [6, 22], end: [7, 22] },
        { name: "狮子座", icon: "♌", start: [7, 23], end: [8, 22] },
        { name: "处女座", icon: "♍", start: [8, 23], end: [9, 22] },
        { name: "天秤座", icon: "♎", start: [9, 23], end: [10, 23] },
        { name: "天蝎座", icon: "♏", start: [10, 24], end: [11, 22] },
        { name: "射手座", icon: "♐", start: [11, 23], end: [12, 21] },
        { name: "摩羯座", icon: "♑", start: [12, 22], end: [12, 31] }
      ];

      /**
       * 计算校验码
       */
      function calculateCheckCode(id17) {
        let sum = 0;
        for (let i = 0; i < 17; i++) {
          sum += parseInt(id17[i], 10) * WEIGHTS[i];
        }
        return CHECK_CODES[sum % 11];
      }

      /**
       * 验证身份证号
       */
      function validateIdCard(id) {
        // 基本格式检查
        if (!/^\d{17}[\dXx]$/.test(id)) {
          return { valid: false, error: "格式错误：需要18位数字（最后一位可为X）" };
        }

        // 地区码检查
        const provinceCode = id.substring(0, 2);
        if (!REGION_MAP[provinceCode]) {
          return { valid: false, error: "地区码无效：不存在该省份代码" };
        }

        // 出生日期检查
        const year = parseInt(id.substring(6, 10), 10);
        const month = parseInt(id.substring(10, 12), 10);
        const day = parseInt(id.substring(12, 14), 10);

        const birthDate = new Date(year, month - 1, day);
        const now = new Date();

        if (
          birthDate.getFullYear() !== year ||
          birthDate.getMonth() !== month - 1 ||
          birthDate.getDate() !== day
        ) {
          return { valid: false, error: "出生日期无效：日期不存在" };
        }

        if (birthDate > now) {
          return { valid: false, error: "出生日期无效：不能大于当前日期" };
        }

        if (year < 1900) {
          return { valid: false, error: "出生日期无效：年份不能小于1900" };
        }

        // 校验码检查
        const expectedCheckCode = calculateCheckCode(id.substring(0, 17));
        const actualCheckCode = id[17].toUpperCase();

        if (expectedCheckCode !== actualCheckCode) {
          return {
            valid: false,
            error: `校验码错误：期望 ${expectedCheckCode}，实际 ${actualCheckCode}`
          };
        }

        return { valid: true };
      }

      /**
       * 解析身份证信息
       */
      function parseIdCard(id) {
        const provinceCode = id.substring(0, 2);
        const cityCode = id.substring(0, 4);
        const year = parseInt(id.substring(6, 10), 10);
        const month = parseInt(id.substring(10, 12), 10);
        const day = parseInt(id.substring(12, 14), 10);
        const seqCode = parseInt(id.substring(14, 17), 10);

        // 地区
        let region = REGION_MAP[provinceCode] || "未知";
        if (CITY_MAP[cityCode]) {
          region = CITY_MAP[cityCode];
        }

        // 性别（第17位奇数为男，偶数为女）
        const gender = seqCode % 2 === 1 ? "男" : "女";
        const genderIcon = seqCode % 2 === 1 ? "👨" : "👩";

        // 年龄
        const today = new Date();
        let age = today.getFullYear() - year;
        const birthThisYear = new Date(today.getFullYear(), month - 1, day);
        if (today < birthThisYear) {
          age--;
        }

        // 生肖
        const zodiacIndex = (year - 1900) % 12;
        const zodiac = ZODIAC_ICONS[zodiacIndex] + " " + ZODIAC[zodiacIndex];

        // 星座
        let constellation = "未知";
        for (const c of CONSTELLATIONS) {
          if (
            (month === c.start[0] && day >= c.start[1]) ||
            (month === c.end[0] && day <= c.end[1])
          ) {
            constellation = c.icon + " " + c.name;
            break;
          }
        }

        return {
          region,
          birth: `${year}年${month}月${day}日`,
          gender: genderIcon + " " + gender,
          age: age + "岁",
          zodiac,
          constellation
        };
      }

      /**
       * 显示格式化的身份证号
       */
      function displayFormat(id) {
        const formatRow = document.getElementById("formatRow");
        formatRow.innerHTML = "";

        for (let i = 0; i < id.length; i++) {
          const char = document.createElement("span");
          char.className = "format-char";
          char.textContent = id[i].toUpperCase();

          if (i < 6) {
            char.classList.add("region");
          } else if (i < 14) {
            char.classList.add("birth");
          } else if (i < 17) {
            char.classList.add("seq");
          } else {
            char.classList.add("check");
          }

          formatRow.appendChild(char);
        }

        document.getElementById("formatDisplay").style.display = "block";
      }

      /**
       * 验证并显示结果
       */
      window.validate = function () {
        const id = document.getElementById("idInput").value.trim().toUpperCase();
        const statusBox = document.getElementById("statusBox");
        const statusIcon = document.getElementById("statusIcon");
        const statusText = document.getElementById("statusText");
        const infoGrid = document.getElementById("infoGrid");
        const formatDisplay = document.getElementById("formatDisplay");

        if (!id) {
          statusBox.className = "status-box pending";
          statusIcon.textContent = "🔐";
          statusText.className = "status-text pending";
          statusText.textContent = "请输入身份证号码进行校验";
          infoGrid.style.display = "none";
          formatDisplay.style.display = "none";
          return;
        }

        if (id.length < 18) {
          statusBox.className = "status-box pending";
          statusIcon.textContent = "⏳";
          statusText.className = "status-text pending";
          statusText.textContent = `已输入 ${id.length} 位，还需 ${18 - id.length} 位`;
          infoGrid.style.display = "none";
          formatDisplay.style.display = "none";
          return;
        }

        const result = validateIdCard(id);

        if (result.valid) {
          statusBox.className = "status-box valid";
          statusIcon.textContent = "✅";
          statusText.className = "status-text valid";
          statusText.textContent = "校验通过 - 身份证号码有效";

          // 显示解析信息
          const info = parseIdCard(id);
          document.getElementById("infoRegion").textContent = info.region;
          document.getElementById("infoBirth").textContent = info.birth;
          document.getElementById("infoGender").textContent = info.gender;
          document.getElementById("infoAge").textContent = info.age;
          document.getElementById("infoZodiac").textContent = info.zodiac;
          document.getElementById("infoConstellation").textContent = info.constellation;
          infoGrid.style.display = "grid";

          // 显示格式解析
          displayFormat(id);
        } else {
          statusBox.className = "status-box invalid";
          statusIcon.textContent = "❌";
          statusText.className = "status-text invalid";
          statusText.textContent = result.error;
          infoGrid.style.display = "none";
          formatDisplay.style.display = "none";
        }
      };

      /**
       * 设置示例
       */
      window.setExample = function (id) {
        document.getElementById("idInput").value = id;
        validate();
      };

      /**
       * 主题切换
       */
      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };

      // 初始化主题
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      // 限制输入
      document.getElementById("idInput").addEventListener("input", function (e) {
        // 只允许数字和X
        this.value = this.value.replace(/[^0-9Xx]/g, "").toUpperCase();
      });
    
