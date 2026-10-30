// @ts-nocheck
// Generated from tools/text/homophone-checker.html
// Source SHA-256: 9bd4e2c7c7e1269f4be4e9976bce2f66282b0f105a2b5d47d4af89875c243f21
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 常见易混淆同音字对照表
      const commonConfusions = [
        { chars: "的地得", pinyin: "de", meaning: "的(定语)、地(状语)、得(补语)" },
        { chars: "做作", pinyin: "zuò", meaning: "做(动作)、作(创作/作为)" },
        { chars: "在再", pinyin: "zài", meaning: "在(存在/正在)、再(又/再次)" },
        { chars: "像象", pinyin: "xiàng", meaning: "像(相似)、象(大象/现象)" },
        { chars: "以已", pinyin: "yǐ", meaning: "以(用/凭借)、已(已经)" },
        { chars: "即既", pinyin: "jì", meaning: "即(就是)、既(既然/已经)" },
        { chars: "需须", pinyin: "xū", meaning: "需(需要)、须(必须)" },
        { chars: "带代", pinyin: "dài", meaning: "带(携带)、代(代替)" },
        { chars: "燥躁", pinyin: "zào", meaning: "燥(干燥)、躁(烦躁)" },
        { chars: "辨辩", pinyin: "biàn", meaning: "辨(辨别)、辩(辩论)" },
        { chars: "查察", pinyin: "chá", meaning: "查(检查)、察(观察)" },
        { chars: "长常", pinyin: "cháng", meaning: "长(长度)、常(经常)" },
        { chars: "成城", pinyin: "chéng", meaning: "成(成功)、城(城市)" },
        { chars: "权劝", pinyin: "quán/quàn", meaning: "权(权力)、劝(劝说)" },
        { chars: "生声", pinyin: "shēng", meaning: "生(生命)、声(声音)" },
        { chars: "事是", pinyin: "shì", meaning: "事(事情)、是(是否)" }
      ];

      // 简化的拼音映射（常用字）
      const pinyinMap = {
        的: "de",
        地: "de/dì",
        得: "de/dé/děi",
        做: "zuò",
        作: "zuò/zuō",
        在: "zài",
        再: "zài",
        像: "xiàng",
        象: "xiàng",
        以: "yǐ",
        已: "yǐ",
        即: "jí",
        既: "jì",
        需: "xū",
        须: "xū",
        带: "dài",
        代: "dài",
        燥: "zào",
        躁: "zào",
        辨: "biàn",
        辩: "biàn",
        查: "chá",
        察: "chá",
        长: "cháng/zhǎng",
        常: "cháng",
        成: "chéng",
        城: "chéng",
        权: "quán",
        劝: "quàn",
        生: "shēng",
        声: "shēng",
        事: "shì",
        是: "shì",
        他: "tā",
        她: "tā",
        它: "tā",
        那: "nà/nǎ",
        哪: "nǎ/na",
        这: "zhè",
        着: "zhe/zháo/zhuó",
        了: "le/liǎo",
        料: "liào",
        和: "hé/hè/huó/huò",
        河: "hé",
        合: "hé",
        中: "zhōng/zhòng",
        终: "zhōng",
        钟: "zhōng",
        不: "bù",
        布: "bù",
        步: "bù",
        大: "dà",
        达: "dá",
        小: "xiǎo",
        晓: "xiǎo",
        人: "rén",
        仁: "rén",
        我: "wǒ",
        你: "nǐ",
        妮: "nī",
        来: "lái",
        莱: "lái",
        去: "qù",
        趣: "qù",
        也: "yě",
        野: "yě",
        就: "jiù",
        旧: "jiù",
        救: "jiù",
        说: "shuō/shuì",
        水: "shuǐ",
        道: "dào",
        到: "dào",
        倒: "dào/dǎo",
        能: "néng",
        会: "huì/kuài",
        回: "huí",
        汇: "huì",
        没: "méi/mò",
        每: "měi",
        美: "měi",
        什: "shén/shí",
        十: "shí",
        时: "shí",
        实: "shí",
        食: "shí",
        么: "me/mó/yāo",
        很: "hěn",
        恨: "hèn",
        好: "hǎo/hào",
        号: "hào/háo",
        还: "hái/huán",
        环: "huán",
        换: "huàn",
        看: "kàn/kān",
        砍: "kǎn",
        想: "xiǎng",
        响: "xiǎng",
        向: "xiàng",
        项: "xiàng",
        知: "zhī",
        之: "zhī",
        只: "zhī/zhǐ",
        织: "zhī",
        支: "zhī",
        过: "guò",
        国: "guó",
        果: "guǒ",
        后: "hòu",
        候: "hòu",
        厚: "hòu",
        年: "nián",
        念: "niàn",
        前: "qián",
        钱: "qián",
        浅: "qiǎn",
        间: "jiān/jiàn",
        见: "jiàn",
        件: "jiàn",
        建: "jiàn",
        心: "xīn",
        新: "xīn",
        信: "xìn",
        欣: "xīn",
        理: "lǐ",
        里: "lǐ",
        李: "lǐ",
        力: "lì",
        立: "lì",
        利: "lì",
        意: "yì",
        义: "yì",
        议: "yì",
        易: "yì",
        亿: "yì",
        工: "gōng",
        公: "gōng",
        功: "gōng",
        宫: "gōng",
        同: "tóng",
        通: "tōng",
        痛: "tòng",
        童: "tóng",
        铜: "tóng"
      };

      // 获取字的拼音（简化版本，只返回主要读音）
      function getPinyin(char) {
        if (pinyinMap[char]) {
          return pinyinMap[char].split("/")[0];
        }
        // 对于未收录的字，返回null
        return null;
      }

      // 检查同音字
      function checkHomophones() {
        const text = document.getElementById("inputText").value;
        if (!text.trim()) {
          alert("请输入要检查的文本");
          return;
        }

        // 提取所有汉字
        const chars = text.match(/[\u4e00-\u9fa5]/g) || [];

        if (chars.length === 0) {
          alert("未检测到中文字符");
          return;
        }

        // 统计每个字的出现次数和位置
        const charStats = {};
        const pinyinGroups = {};

        chars.forEach((char, index) => {
          if (!charStats[char]) {
            charStats[char] = { count: 0, positions: [] };
          }
          charStats[char].count++;
          charStats[char].positions.push(index);

          const pinyin = getPinyin(char);
          if (pinyin) {
            if (!pinyinGroups[pinyin]) {
              pinyinGroups[pinyin] = new Set();
            }
            pinyinGroups[pinyin].add(char);
          }
        });

        // 过滤出有多个不同字的同音组
        const homophoneGroups = {};
        let confusionCount = 0;

        for (const [pinyin, charSet] of Object.entries(pinyinGroups)) {
          const charsInText = Array.from(charSet).filter((c) => charStats[c]);
          if (charsInText.length > 1) {
            homophoneGroups[pinyin] = charsInText;
            confusionCount += charsInText.length;
          }
        }

        // 更新统计
        document.getElementById("totalChars").textContent = chars.length;
        document.getElementById("groupCount").textContent = Object.keys(homophoneGroups).length;
        document.getElementById("confusionCount").textContent = confusionCount;

        // 生成预览
        generatePreview(text, homophoneGroups, charStats);

        // 生成同音字组列表
        generateGroupsList(homophoneGroups, charStats);

        document.getElementById("resultsSection").style.display = "block";
      }

      // 生成预览
      function generatePreview(text, homophoneGroups, charStats) {
        const preview = document.getElementById("textPreview");
        const highlightConfusion = document.getElementById("highlightConfusion").checked;

        // 获取所有需要高亮的字
        const highlightChars = new Set();
        if (highlightConfusion) {
          for (const chars of Object.values(homophoneGroups)) {
            chars.forEach((c) => highlightChars.add(c));
          }
        }

        preview.replaceChildren();

        for (const char of text) {
          if (highlightChars.has(char)) {
            const span = document.createElement("span");
            span.className = "homophone-highlight";
            span.textContent = char;
            span.dataset.char = char;
            span.addEventListener("mouseenter", showTooltip);
            span.addEventListener("mouseleave", hideTooltip);
            preview.appendChild(span);
          } else {
            preview.appendChild(document.createTextNode(char));
          }
        }
      }

      // 生成同音字组列表
      function generateGroupsList(homophoneGroups, charStats) {
        const container = document.getElementById("homophoneGroups");
        container.replaceChildren();

        const showAll = document.getElementById("showAllGroups").checked;
        const entries = Object.entries(homophoneGroups);

        if (entries.length === 0) {
          const noResults = document.createElement("div");
          noResults.className = "no-results";
          noResults.textContent = "未发现同音字混淆情况";
          container.appendChild(noResults);
          return;
        }

        // 按字符数量排序
        entries.sort((a, b) => b[1].length - a[1].length);

        entries.forEach(([pinyin, chars]) => {
          const group = document.createElement("div");
          group.className = "homophone-group";

          const header = document.createElement("div");
          header.className = "group-header";

          const pinyinSpan = document.createElement("span");
          pinyinSpan.className = "group-pinyin";
          pinyinSpan.textContent = pinyin;

          const countSpan = document.createElement("span");
          countSpan.className = "group-count";
          countSpan.textContent = chars.length + "个同音字";

          header.appendChild(pinyinSpan);
          header.appendChild(countSpan);

          const charsDiv = document.createElement("div");
          charsDiv.className = "group-chars";

          chars.forEach((char) => {
            const item = document.createElement("span");
            item.className = "char-item";

            const charSpan = document.createElement("span");
            charSpan.textContent = char;

            const countSpan = document.createElement("span");
            countSpan.className = "char-count";
            countSpan.textContent = "×" + (charStats[char]?.count || 0);

            item.appendChild(charSpan);
            item.appendChild(countSpan);
            charsDiv.appendChild(item);
          });

          group.appendChild(header);
          group.appendChild(charsDiv);
          container.appendChild(group);
        });
      }

      // 显示提示
      function showTooltip(e) {
        const char = e.target.dataset.char;
        const pinyin = getPinyin(char);

        if (!pinyin) return;

        // 找到所有同音字
        const sameSound = [];
        for (const [c, p] of Object.entries(pinyinMap)) {
          if (p.split("/")[0] === pinyin && c !== char) {
            sameSound.push(c);
          }
        }

        const tooltip = document.getElementById("tooltip");
        tooltip.replaceChildren();

        const pinyinDiv = document.createElement("div");
        pinyinDiv.className = "tooltip-pinyin";
        pinyinDiv.textContent = char + " [" + pinyin + "]";
        tooltip.appendChild(pinyinDiv);

        if (sameSound.length > 0) {
          const altDiv = document.createElement("div");
          altDiv.className = "tooltip-alternatives";
          altDiv.textContent = "同音字: " + sameSound.slice(0, 10).join("、");
          if (sameSound.length > 10) {
            altDiv.textContent += "...";
          }
          tooltip.appendChild(altDiv);
        }

        tooltip.style.display = "block";
        tooltip.style.left = e.pageX + 10 + "px";
        tooltip.style.top = e.pageY + 10 + "px";
      }

      // 隐藏提示
      function hideTooltip() {
        document.getElementById("tooltip").style.display = "none";
      }

      // 初始化常见易混淆列表
      function initCommonList() {
        const container = document.getElementById("commonList");

        commonConfusions.forEach((item) => {
          const div = document.createElement("div");
          div.className = "common-item";
          div.addEventListener("click", function () {
            document.getElementById("inputText").value =
              "这是一个关于" + item.chars.split("").join("和") + "的测试文本。";
            checkHomophones();
          });

          const charsSpan = document.createElement("div");
          charsSpan.className = "common-chars";
          charsSpan.textContent = item.chars.split("").join(" / ") + " [" + item.pinyin + "]";

          const meaningSpan = document.createElement("div");
          meaningSpan.className = "common-meaning";
          meaningSpan.textContent = item.meaning;

          div.appendChild(charsSpan);
          div.appendChild(meaningSpan);
          container.appendChild(div);
        });
      }

      // 主题切换
      document.getElementById("themeToggle").addEventListener("click", function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      });

      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
      }

      // 事件绑定
      document.getElementById("checkBtn").addEventListener("click", checkHomophones);
      document.getElementById("clearBtn").addEventListener("click", function () {
        document.getElementById("inputText").value = "";
        document.getElementById("resultsSection").style.display = "none";
      });
      document.getElementById("sampleBtn").addEventListener("click", function () {
        document.getElementById("inputText").value =
          "他的工作做得很好，常常在公司加班到很晚。她已经以最快的速度完成了任务，既然如此，我们就不需要再催促了。这座城市的发展很快，城里的人们生活声音很热闹。我想向你说明这件事情是不是真实的，请你仔细辨别和分辩。";
        checkHomophones();
      });

      document.getElementById("showAllGroups").addEventListener("change", function () {
        const text = document.getElementById("inputText").value;
        if (text) checkHomophones();
      });

      document.getElementById("highlightConfusion").addEventListener("change", function () {
        const text = document.getElementById("inputText").value;
        if (text) checkHomophones();
      });

      // 初始化
      initCommonList();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }
    
