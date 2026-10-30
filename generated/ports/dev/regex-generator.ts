// @ts-nocheck
// Generated from tools/dev/regex-generator.html
// Source SHA-256: 08b2fb0eec7a257624c742bd1b4c639fb1158c4f1e941e4d2c6073ec76750d69
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme
      function initTheme() {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      }
      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };
      initTheme();

      // Templates
      const templates = [
        {
          name: "邮箱地址",
          desc: "email@example.com",
          pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"
        },
        { name: "手机号码", desc: "13800138000", pattern: "1[3-9]\\d{9}" },
        {
          name: "身份证号",
          desc: "18位身份证",
          pattern: "[1-9]\\d{5}(19|20)\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])\\d{3}[\\dXx]"
        },
        {
          name: "URL 地址",
          desc: "https://...",
          pattern: "https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[\\w\\-.,@?^=%&:/~+#]*"
        },
        {
          name: "IP 地址",
          desc: "IPv4 地址",
          pattern: "((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)"
        },
        {
          name: "日期格式",
          desc: "YYYY-MM-DD",
          pattern: "\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])"
        },
        { name: "时间格式", desc: "HH:MM:SS", pattern: "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d" },
        { name: "中文字符", desc: "匹配汉字", pattern: "[\\u4e00-\\u9fa5]+" },
        { name: "英文单词", desc: "纯英文", pattern: "[a-zA-Z]+" },
        { name: "数字", desc: "整数或小数", pattern: "-?\\d+(\\.\\d+)?" },
        { name: "正整数", desc: "大于0的整数", pattern: "[1-9]\\d*" },
        { name: "用户名", desc: "字母数字下划线", pattern: "[a-zA-Z][a-zA-Z0-9_]{3,15}" },
        {
          name: "密码强度",
          desc: "数字+字母+特殊字符",
          pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
        },
        { name: "十六进制颜色", desc: "#FFFFFF", pattern: "#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})" },
        { name: "邮政编码", desc: "6位数字", pattern: "[1-9]\\d{5}" },
        { name: "HTML 标签", desc: "<tag>...</tag>", pattern: "<([a-z]+)[^>]*>.*?<\\/\\1>" }
      ];

      // Builder blocks
      const builderBlocks = [
        { name: "任意字符", code: ".", desc: "匹配任意单个字符" },
        { name: "数字", code: "\\d", desc: "匹配数字 0-9" },
        { name: "非数字", code: "\\D", desc: "匹配非数字" },
        { name: "字母数字", code: "\\w", desc: "匹配字母数字下划线" },
        { name: "空白字符", code: "\\s", desc: "匹配空格/制表符" },
        { name: "开头", code: "^", desc: "匹配字符串开头" },
        { name: "结尾", code: "$", desc: "匹配字符串结尾" },
        { name: "0或多个", code: "*", desc: "前面的字符0次或多次" },
        { name: "1或多个", code: "+", desc: "前面的字符1次或多次" },
        { name: "0或1个", code: "?", desc: "前面的字符0次或1次" },
        { name: "分组", code: "()", desc: "捕获分组" },
        { name: "或", code: "|", desc: "匹配左边或右边" },
        { name: "字符集", code: "[]", desc: "匹配方括号内任一字符" },
        { name: "排除", code: "[^]", desc: "不匹配方括号内字符" },
        { name: "次数{n}", code: "{n}", desc: "精确匹配n次" },
        { name: "范围{n,m}", code: "{n,m}", desc: "匹配n到m次" }
      ];

      let currentPattern = "";

      function renderTemplates() {
        const grid = document.getElementById("templatesGrid");
        grid.innerHTML = templates
          .map(
            (t, i) => `
                <div class="template-card" onclick="selectTemplate(${i})">
                    <div class="template-name">${t.name}</div>
                    <div class="template-desc">${t.desc}</div>
                </div>
            `
          )
          .join("");
      }

      function renderBuilderBlocks() {
        const container = document.getElementById("builderBlocks");
        container.innerHTML = builderBlocks
          .map(
            (b) => `
                <div class="builder-btn" onclick="insertBlock('${b.code.replace(/'/g, "\\'")}')">
                    ${b.name}
                    <code>${b.code}</code>
                </div>
            `
          )
          .join("");
      }

      window.selectTemplate = function (index) {
        const template = templates[index];
        currentPattern = template.pattern;
        updateDisplay();

        // Update UI
        document.querySelectorAll(".template-card").forEach((card, i) => {
          card.classList.toggle("selected", i === index);
        });
      };

      window.insertBlock = function (code) {
        currentPattern += code;
        updateDisplay();
      };

      function getFlags() {
        let flags = "";
        if (document.getElementById("flagG").checked) flags += "g";
        if (document.getElementById("flagI").checked) flags += "i";
        if (document.getElementById("flagM").checked) flags += "m";
        if (document.getElementById("flagS").checked) flags += "s";
        return flags;
      }

      function updateDisplay() {
        const flags = getFlags();
        const display = `/${currentPattern}/${flags}`;
        document.getElementById("regexDisplay").textContent = display;
        testRegex();
      }

      window.copyRegex = function () {
        const flags = getFlags();
        const text = `/${currentPattern}/${flags}`;
        navigator.clipboard.writeText(text);
        alert("已复制正则表达式");
      };

      window.copyAsJs = function () {
        const flags = getFlags();
        const escaped = currentPattern.replace(/\\/g, "\\\\");
        const text = `new RegExp('${escaped}'${flags ? ", '" + flags + "'" : ""})`;
        navigator.clipboard.writeText(text);
        alert("已复制为 JavaScript 代码");
      };

      window.clearRegex = function () {
        currentPattern = "";
        updateDisplay();
        document.querySelectorAll(".template-card").forEach((card) => {
          card.classList.remove("selected");
        });
      };

      function testRegex() {
        const input = document.getElementById("testInput").value;
        const matchesList = document.getElementById("matchesList");

        if (!input || !currentPattern) {
          matchesList.innerHTML = '<span class="no-match">输入文本后自动显示匹配结果</span>';
          return;
        }

        try {
          const flags = getFlags() || "g";
          const regex = new RegExp(currentPattern, flags);
          const matches = input.match(regex);

          if (matches && matches.length > 0) {
            matchesList.innerHTML = matches
              .map((m) => `<span class="match-item success">${escapeHtml(m)}</span>`)
              .join("");
          } else {
            matchesList.innerHTML = '<span class="no-match">没有匹配项</span>';
          }
        } catch (e) {
          matchesList.innerHTML = `<span class="no-match">正则表达式错误: ${e.message}</span>`;
        }
      }

      window.escapeHtml = function (text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      // Event listeners
      ["flagG", "flagI", "flagM", "flagS"].forEach((id) => {
        document.getElementById(id).addEventListener("change", updateDisplay);
      });

      document.getElementById("testInput").addEventListener("input", testRegex);

      // Initialize
      renderTemplates();
      renderBuilderBlocks();
      updateDisplay();
    
