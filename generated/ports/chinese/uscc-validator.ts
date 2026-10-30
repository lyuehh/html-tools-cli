// @ts-nocheck
// Generated from tools/chinese/uscc-validator.html
// Source SHA-256: 4603b7f3f491e238518506384a02685f3e4335b8d1d359d476df919c21d2ccc1
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 登记管理部门代码
      const regDepts = {
        1: "机构编制",
        2: "外交",
        3: "司法行政",
        4: "文化",
        5: "民政",
        6: "旅游",
        7: "宗教",
        8: "工会",
        9: "工商",
        A: "中央军委改革和编制办公室",
        N: "农业",
        Y: "其他"
      };

      // 机构类别代码
      const orgTypes = {
        1: { dept: "1", name: "机关" },
        2: { dept: "1", name: "事业单位" },
        3: { dept: "1", name: "中央编办直接管理机构编制的群众团体" },
        9: { dept: "1", name: "其他" },
        1: { dept: "2", name: "外国常驻新闻机构" },
        1: { dept: "3", name: "律师执业机构" },
        2: { dept: "3", name: "公证处" },
        3: { dept: "3", name: "基层法律服务所" },
        4: { dept: "3", name: "司法鉴定机构" },
        5: { dept: "3", name: "仲裁委员会" },
        9: { dept: "3", name: "其他" },
        1: { dept: "5", name: "社会团体" },
        2: { dept: "5", name: "民办非企业单位" },
        3: { dept: "5", name: "基金会" },
        9: { dept: "5", name: "其他" },
        1: { dept: "9", name: "企业" },
        2: { dept: "9", name: "个体工商户" },
        3: { dept: "9", name: "农民专业合作社" }
      };

      // 省份代码
      const provinces = {
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
        65: "新疆维吾尔自治区"
      };

      // 校验码字符集
      const CHARS = "0123456789ABCDEFGHJKLMNPQRTUWXY";
      const WEIGHTS = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];

      function formatInput() {
        const input = document.getElementById("codeInput");
        input.value = input.value.toUpperCase().replace(/[^0-9A-Z]/g, "");
      }

      async function pasteFromClipboard() {
        try {
          const text = await navigator.clipboard.readText();
          document.getElementById("codeInput").value = text.trim().toUpperCase();
          formatInput();
        } catch (e) {
          console.error("无法访问剪贴板");
        }
      }

      // 计算校验码
      function calcCheckCode(code17) {
        let sum = 0;
        for (let i = 0; i < 17; i++) {
          const charIndex = CHARS.indexOf(code17[i]);
          if (charIndex === -1) return null;
          sum += charIndex * WEIGHTS[i];
        }
        const remainder = sum % 31;
        const checkIndex = (31 - remainder) % 31;
        return CHARS[checkIndex];
      }

      function validate() {
        const code = document.getElementById("codeInput").value.trim().toUpperCase();
        const resultSection = document.getElementById("resultSection");
        const resultHero = document.getElementById("resultHero");
        const infoCard = document.getElementById("infoCard");

        // 基本格式验证
        if (code.length !== 18) {
          showResult(false, "请输入18位统一社会信用代码");
          return;
        }

        // 字符验证
        const validChars = /^[0-9A-HJ-NP-RTUW-Y]{18}$/;
        if (!validChars.test(code)) {
          showResult(false, "代码包含无效字符");
          return;
        }

        // 登记管理部门验证
        const regCode = code[0];
        if (!regDepts[regCode]) {
          showResult(false, "登记管理部门代码无效");
          return;
        }

        // 行政区划验证
        const provinceCode = code.substring(2, 4);
        if (!provinces[provinceCode]) {
          showResult(false, "行政区划代码无效");
          return;
        }

        // 校验码验证
        const expectedCheck = calcCheckCode(code.substring(0, 17));
        if (code[17] !== expectedCheck) {
          showResult(false, "校验码错误");
          return;
        }

        // 验证通过
        showResult(true, "统一社会信用代码有效");
        showParsedInfo(code);
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

      function showParsedInfo(code) {
        // 登记管理部门
        const regCode = code[0];
        document.getElementById("regDept").textContent = regDepts[regCode] || "未知";

        // 机构类别
        const typeCode = code[1];
        let orgTypeName = "未知";
        if (regCode === "9") {
          if (typeCode === "1") orgTypeName = "企业";
          else if (typeCode === "2") orgTypeName = "个体工商户";
          else if (typeCode === "3") orgTypeName = "农民专业合作社";
        } else if (regCode === "5") {
          if (typeCode === "1") orgTypeName = "社会团体";
          else if (typeCode === "2") orgTypeName = "民办非企业单位";
          else if (typeCode === "3") orgTypeName = "基金会";
        } else if (regCode === "1") {
          if (typeCode === "1") orgTypeName = "机关";
          else if (typeCode === "2") orgTypeName = "事业单位";
          else if (typeCode === "3") orgTypeName = "群众团体";
        }
        document.getElementById("orgType").textContent = orgTypeName;

        // 行政区划
        const provinceCode = code.substring(2, 4);
        document.getElementById("areaCode").textContent =
          provinces[provinceCode] + " (" + code.substring(2, 8) + ")";

        // 校验码
        document.getElementById("checkCode").textContent = code[17];

        // 代码结构解析
        const partsContainer = document.getElementById("codeParts");
        partsContainer.textContent = "";

        const parts = [
          { text: code[0], class: "reg", title: "登记管理部门" },
          { text: code[1], class: "type", title: "机构类别" },
          { text: code.substring(2, 8), class: "area", title: "行政区划" },
          { text: code.substring(8, 17), class: "org", title: "组织机构代码" },
          { text: code[17], class: "check", title: "校验码" }
        ];

        parts.forEach((part) => {
          const span = document.createElement("span");
          span.className = "code-part " + part.class;
          span.textContent = part.text;
          span.title = part.title;
          partsContainer.appendChild(span);
        });
      }

      // 回车键触发验证
      document.getElementById("codeInput").addEventListener("keypress", (e) => {
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
    
