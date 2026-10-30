// @ts-nocheck
// Generated from tools/privacy/idcard-parser.html
// Source SHA-256: f2e5de2c9a303e24ffcbf92fd78b299f4a209d2cded394afae97e604422c0631
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 地区码数据（部分省市）
      const regionData = {
        11: "北京市",
        12: "天津市",
        13: "河北省",
        14: "山西省",
        15: "内蒙古",
        21: "辽宁省",
        22: "吉林省",
        23: "黑龙江",
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
        45: "广西",
        46: "海南省",
        50: "重庆市",
        51: "四川省",
        52: "贵州省",
        53: "云南省",
        54: "西藏",
        61: "陕西省",
        62: "甘肃省",
        63: "青海省",
        64: "宁夏",
        65: "新疆",
        71: "台湾省",
        81: "香港",
        82: "澳门",
        // 常见城市代码
        1101: "北京市",
        1201: "天津市",
        3101: "上海市",
        5001: "重庆市",
        4401: "广州市",
        4403: "深圳市",
        3301: "杭州市",
        3201: "南京市",
        4201: "武汉市",
        5101: "成都市",
        6101: "西安市",
        1301: "石家庄市"
      };

      // 生肖
      const zodiacAnimals = [
        "鼠",
        "牛",
        "虎",
        "兔",
        "龙",
        "蛇",
        "马",
        "羊",
        "猴",
        "鸡",
        "狗",
        "猪"
      ];
      const zodiacIcons = ["🐭", "🐮", "🐯", "🐰", "🐲", "🐍", "🐴", "🐑", "🐵", "🐔", "🐶", "🐷"];

      // 星座
      const constellations = [
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

      let lastResult = null;

      window.parseIdCard = function () {
        const input = document.getElementById("idInput");
        const value = input.value.trim().toUpperCase();
        const statusEl = document.getElementById("validationStatus");
        const structureEl = document.getElementById("idStructure");
        const resultCard = document.getElementById("resultCard");

        // Reset
        input.classList.remove("valid", "invalid");

        if (!value) {
          statusEl.innerHTML = "";
          structureEl.innerHTML = "";
          resultCard.style.display = "none";
          return;
        }

        // Show structure
        if (value.length > 0) {
          renderStructure(value);
        }

        // Validate length
        if (value.length !== 18) {
          statusEl.innerHTML = `<span class="status-invalid">⚠️ 请输入18位身份证号码 (当前 ${value.length} 位)</span>`;
          input.classList.add("invalid");
          resultCard.style.display = "none";
          return;
        }

        // Validate format
        if (!/^\d{17}[\dX]$/.test(value)) {
          statusEl.innerHTML =
            '<span class="status-invalid">❌ 格式错误：前17位应为数字，第18位可为数字或X</span>';
          input.classList.add("invalid");
          resultCard.style.display = "none";
          return;
        }

        // Validate checksum
        if (!validateChecksum(value)) {
          statusEl.innerHTML = '<span class="status-invalid">❌ 校验码错误：身份证号码无效</span>';
          input.classList.add("invalid");
          resultCard.style.display = "none";
          return;
        }

        // Validate date
        const birthDate = parseBirthDate(value);
        if (!birthDate) {
          statusEl.innerHTML = '<span class="status-invalid">❌ 出生日期无效</span>';
          input.classList.add("invalid");
          resultCard.style.display = "none";
          return;
        }

        // Valid
        input.classList.add("valid");
        statusEl.innerHTML = '<span class="status-valid">✅ 身份证号码有效</span>';

        // Parse and display result
        const result = {
          region: getRegion(value),
          birthDate: birthDate,
          gender: getGender(value),
          age: getAge(birthDate),
          zodiac: getZodiac(birthDate.year),
          constellation: getConstellation(birthDate.month, birthDate.day)
        };
        lastResult = result;
        renderResult(result);
        resultCard.style.display = "block";
      };

      function renderStructure(value) {
        const el = document.getElementById("idStructure");
        const padded = value.padEnd(18, "_");

        el.innerHTML = `
        <div class="id-segment segment-region">
          ${padded.slice(0, 6)}
          <span class="segment-label">地区码</span>
        </div>
        <div class="id-segment segment-birth">
          ${padded.slice(6, 14)}
          <span class="segment-label">出生日期</span>
        </div>
        <div class="id-segment segment-seq">
          ${padded.slice(14, 17)}
          <span class="segment-label">顺序码</span>
        </div>
        <div class="id-segment segment-check">
          ${padded.slice(17, 18)}
          <span class="segment-label">校验码</span>
        </div>
      `;
      }

      function validateChecksum(id) {
        const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        const checkCodes = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

        let sum = 0;
        for (let i = 0; i < 17; i++) {
          sum += parseInt(id[i]) * weights[i];
        }

        return checkCodes[sum % 11] === id[17];
      }

      function parseBirthDate(id) {
        const year = parseInt(id.slice(6, 10));
        const month = parseInt(id.slice(10, 12));
        const day = parseInt(id.slice(12, 14));

        const date = new Date(year, month - 1, day);
        if (
          date.getFullYear() !== year ||
          date.getMonth() !== month - 1 ||
          date.getDate() !== day
        ) {
          return null;
        }

        if (date > new Date()) {
          return null;
        }

        return { year, month, day, date };
      }

      function getRegion(id) {
        const code6 = id.slice(0, 6);
        const code4 = id.slice(0, 4);
        const code2 = id.slice(0, 2);

        // Try to find the most specific match
        return regionData[code6] || regionData[code4] || regionData[code2] || "未知地区";
      }

      function getGender(id) {
        const genderCode = parseInt(id[16]);
        return genderCode % 2 === 1 ? "male" : "female";
      }

      function getAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.year;

        if (
          today.getMonth() < birthDate.month - 1 ||
          (today.getMonth() === birthDate.month - 1 && today.getDate() < birthDate.day)
        ) {
          age--;
        }

        return age;
      }

      function getZodiac(year) {
        const index = (year - 1900) % 12;
        return {
          name: zodiacAnimals[index],
          icon: zodiacIcons[index]
        };
      }

      function getConstellation(month, day) {
        for (const c of constellations) {
          const [startM, startD] = c.start;
          const [endM, endD] = c.end;

          if ((month === startM && day >= startD) || (month === endM && day <= endD)) {
            return { name: c.name, icon: c.icon };
          }
        }
        return { name: "未知", icon: "?" };
      }

      function renderResult(result) {
        const grid = document.getElementById("resultGrid");
        const birthStr = `${result.birthDate.year}年${result.birthDate.month}月${result.birthDate.day}日`;

        grid.innerHTML = `
        <div class="result-item">
          <div class="result-label">所在地区</div>
          <div class="result-value">${result.region}</div>
        </div>
        <div class="result-item">
          <div class="result-label">出生日期</div>
          <div class="result-value highlight">${birthStr}</div>
        </div>
        <div class="result-item">
          <div class="result-label">性别</div>
          <div class="result-value ${result.gender === "male" ? "gender-male" : "gender-female"}">
            ${result.gender === "male" ? "♂ 男" : "♀ 女"}
          </div>
        </div>
        <div class="result-item">
          <div class="result-label">年龄</div>
          <div class="result-value highlight">${result.age} 周岁</div>
        </div>
        <div class="result-item">
          <div class="result-label">生肖</div>
          <div class="result-value">
            <span class="zodiac-icon">${result.zodiac.icon}</span> ${result.zodiac.name}
          </div>
        </div>
        <div class="result-item">
          <div class="result-label">星座</div>
          <div class="result-value">
            ${result.constellation.icon} ${result.constellation.name}
          </div>
        </div>
      `;
      }

      window.copyResult = function () {
        if (!lastResult) return;

        const birthStr = `${lastResult.birthDate.year}年${lastResult.birthDate.month}月${lastResult.birthDate.day}日`;
        const text = `地区：${lastResult.region}
出生日期：${birthStr}
性别：${lastResult.gender === "male" ? "男" : "女"}
年龄：${lastResult.age}周岁
生肖：${lastResult.zodiac.name}
星座：${lastResult.constellation.name}`;

        navigator.clipboard.writeText(text).then(() => {
          showToast("已复制到剪贴板");
        });
      };

      window.clearInput = function () {
        document.getElementById("idInput").value = "";
        document.getElementById("idInput").classList.remove("valid", "invalid");
        document.getElementById("validationStatus").innerHTML = "";
        document.getElementById("idStructure").innerHTML = "";
        document.getElementById("resultCard").style.display = "none";
        lastResult = null;
      };

      function showToast(msg) {
        const toast = document.createElement("div");
        toast.textContent = msg;
        toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.75rem 1.5rem;
        background: var(--accent-green);
        color: white;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
      `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
      }

      window.toggleTheme = function () {
        const html = document.documentElement;
        const isDark = html.getAttribute("data-theme") !== "light";
        html.setAttribute("data-theme", isDark ? "light" : "dark");
        document.querySelector(".theme-toggle").textContent = isDark ? "☀️" : "🌙";
        localStorage.setItem("theme", isDark ? "light" : "dark");
      };

      function loadTheme() {
        const saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.documentElement.setAttribute("data-theme", "light");
          document.querySelector(".theme-toggle").textContent = "☀️";
        }
      }

      // Add CSS animation
      const style = document.createElement("style");
      style.textContent = `
      @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
        20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    `;
      document.head.appendChild(style);

      loadTheme();
    
