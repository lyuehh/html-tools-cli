// @ts-nocheck
// Generated from tools/dev/slug-generator.html
// Source SHA-256: 00858c66bf3c851a30d4b5a8504ed16a44f9434220238bb6761542538e41d3c8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const charCountEl = document.getElementById("charCount");
      const statusEl = document.getElementById("status");
      const separatorEl = document.getElementById("separator");
      const lowercaseEl = document.getElementById("lowercase");
      const transliterateEl = document.getElementById("transliterate");
      const maxLengthEl = document.getElementById("maxLength");

      // Simple Chinese to Pinyin mapping (common characters)
      const pinyinMap = {
        你: "ni",
        好: "hao",
        世: "shi",
        界: "jie",
        中: "zhong",
        国: "guo",
        我: "wo",
        是: "shi",
        的: "de",
        在: "zai",
        有: "you",
        不: "bu",
        了: "le",
        人: "ren",
        这: "zhe",
        他: "ta",
        她: "ta",
        它: "ta",
        们: "men",
        来: "lai",
        去: "qu",
        也: "ye",
        就: "jiu",
        说: "shuo",
        要: "yao",
        会: "hui",
        可: "ke",
        以: "yi",
        能: "neng",
        和: "he",
        大: "da",
        小: "xiao",
        多: "duo",
        少: "shao",
        上: "shang",
        下: "xia",
        前: "qian",
        后: "hou",
        左: "zuo",
        右: "you",
        东: "dong",
        西: "xi",
        南: "nan",
        北: "bei",
        年: "nian",
        月: "yue",
        日: "ri",
        时: "shi",
        分: "fen",
        秒: "miao",
        今: "jin",
        天: "tian",
        明: "ming",
        昨: "zuo",
        新: "xin",
        旧: "jiu",
        老: "lao",
        少: "shao",
        高: "gao",
        低: "di",
        长: "chang",
        短: "duan",
        快: "kuai",
        慢: "man",
        早: "zao",
        晚: "wan",
        开: "kai",
        关: "guan",
        始: "shi",
        终: "zhong",
        头: "tou",
        尾: "wei",
        首: "shou",
        末: "mo",
        页: "ye",
        网: "wang",
        站: "zhan",
        文: "wen",
        章: "zhang",
        字: "zi",
        词: "ci",
        句: "ju",
        段: "duan",
        篇: "pian",
        书: "shu",
        本: "ben",
        名: "ming",
        数: "shu",
        据: "ju",
        库: "ku",
        表: "biao",
        单: "dan",
        列: "lie",
        行: "hang",
        列: "lie",
        格: "ge",
        一: "yi",
        二: "er",
        三: "san",
        四: "si",
        五: "wu",
        六: "liu",
        七: "qi",
        八: "ba",
        九: "jiu",
        十: "shi",
        百: "bai",
        千: "qian",
        万: "wan",
        亿: "yi",
        零: "ling",
        第: "di",
        等: "deng",
        级: "ji",
        用: "yong",
        户: "hu",
        系: "xi",
        统: "tong",
        工: "gong",
        具: "ju",
        程: "cheng",
        序: "xu",
        代: "dai",
        码: "ma",
        编: "bian",
        写: "xie",
        测: "ce",
        试: "shi",
        运: "yun",
        行: "xing",
        部: "bu",
        署: "shu",
        发: "fa",
        布: "bu",
        更: "geng",
        改: "gai",
        删: "shan",
        除: "chu",
        添: "tian",
        加: "jia",
        创: "chuang",
        建: "jian",
        修: "xiu",
        复: "fu",
        查: "cha",
        找: "zhao",
        搜: "sou",
        索: "suo",
        结: "jie",
        果: "guo",
        成: "cheng",
        功: "gong",
        失: "shi",
        败: "bai",
        错: "cuo",
        误: "wu",
        正: "zheng",
        确: "que",
        对: "dui",
        错: "cuo",
        真: "zhen",
        假: "jia",
        简: "jian",
        繁: "fan",
        难: "nan",
        易: "yi",
        静: "jing",
        动: "dong",
        安: "an",
        全: "quan",
        危: "wei",
        险: "xian",
        保: "bao",
        护: "hu",
        配: "pei",
        置: "zhi",
        设: "she",
        定: "ding",
        选: "xuan",
        择: "ze",
        项: "xiang",
        目: "mu",
        标: "biao",
        题: "ti",
        内: "nei",
        容: "rong",
        描: "miao",
        述: "shu",
        说: "shuo",
        明: "ming",
        注: "zhu",
        释: "shi",
        备: "bei",
        案: "an",
        例: "li",
        子: "zi",
        样: "yang",
        式: "shi",
        模: "mo",
        板: "ban",
        型: "xing",
        态: "tai",
        状: "zhuang",
        况: "kuang",
        情: "qing",
        形: "xing",
        色: "se",
        红: "hong",
        绿: "lv",
        蓝: "lan",
        黄: "huang",
        白: "bai",
        黑: "hei",
        灰: "hui",
        紫: "zi",
        橙: "cheng",
        粉: "fen",
        棕: "zong",
        青: "qing",
        深: "shen",
        浅: "qian",
        亮: "liang",
        暗: "an",
        图: "tu",
        片: "pian",
        像: "xiang",
        视: "shi",
        频: "pin",
        音: "yin",
        乐: "yue",
        声: "sheng",
        画: "hua",
        面: "mian",
        屏: "ping",
        幕: "mu",
        窗: "chuang",
        口: "kou",
        栏: "lan",
        条: "tiao",
        框: "kuang",
        按: "an",
        钮: "niu",
        键: "jian",
        盘: "pan",
        鼠: "shu",
        标: "biao",
        点: "dian",
        击: "ji",
        双: "shuang",
        拖: "tuo",
        拽: "zhuai",
        放: "fang",
        缩: "suo",
        放: "fang",
        旋: "xuan",
        转: "zhuan",
        滚: "gun",
        动: "dong",
        导: "dao",
        航: "hang",
        菜: "cai",
        单: "dan",
        链: "lian",
        接: "jie",
        跳: "tiao",
        转: "zhuan",
        返: "fan",
        回: "hui",
        刷: "shua",
        载: "zai",
        入: "ru",
        出: "chu",
        登: "deng",
        录: "lu",
        退: "tui",
        注: "zhu",
        册: "ce",
        忘: "wang",
        记: "ji",
        密: "mi",
        账: "zhang",
        号: "hao",
        权: "quan",
        限: "xian",
        管: "guan",
        理: "li",
        员: "yuan",
        客: "ke",
        服: "fu",
        务: "wu",
        支: "zhi",
        持: "chi",
        帮: "bang",
        助: "zhu"
      };

      function toPinyin(str) {
        return str
          .split("")
          .map(function (char) {
            return pinyinMap[char] || char;
          })
          .join("");
      }

      function generateSlug(text) {
        const separator = separatorEl.value;
        const lowercase = lowercaseEl.checked;
        const transliterate = transliterateEl.checked;
        const maxLength = parseInt(maxLengthEl.value);

        var slug = text;

        // Transliterate Chinese to Pinyin
        if (transliterate) {
          slug = toPinyin(slug);
        }

        // Convert to lowercase
        if (lowercase) {
          slug = slug.toLowerCase();
        }

        // Replace spaces and special chars with separator
        slug = slug
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
          .replace(/[^\w\s\u4e00-\u9fff-]/g, "") // Keep alphanumeric, spaces, Chinese, hyphens
          .replace(/[\s_-]+/g, separator) // Replace spaces/underscores with separator
          .replace(new RegExp("^" + separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "+"), "") // Trim start
          .replace(new RegExp(separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "+$"), ""); // Trim end

        // Truncate if needed
        if (maxLength > 0 && slug.length > maxLength) {
          slug = slug.substring(0, maxLength);
          // Remove trailing separator
          slug = slug.replace(
            new RegExp(separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "+$"),
            ""
          );
        }

        return slug;
      }

      function update() {
        const text = inputEl.value;
        const slug = generateSlug(text);
        outputEl.textContent = slug || "-";
        charCountEl.textContent = slug ? slug.length + " 字符" : "";
      }

      inputEl.addEventListener("input", update);
      separatorEl.addEventListener("change", update);
      lowercaseEl.addEventListener("change", update);
      transliterateEl.addEventListener("change", update);
      maxLengthEl.addEventListener("change", update);

      document.getElementById("btnPaste").onclick = async function () {
        try {
          inputEl.value = await navigator.clipboard.readText();
          update();
        } catch (e) {}
      };

      document.getElementById("btnCopy").onclick = async function () {
        const slug = outputEl.textContent;
        if (!slug || slug === "-") return;
        try {
          await navigator.clipboard.writeText(slug);
          statusEl.textContent = "已复制!";
          setTimeout(function () {
            statusEl.textContent = "";
          }, 2000);
        } catch (e) {}
      };

      document.getElementById("btnClear").onclick = function () {
        inputEl.value = "";
        outputEl.textContent = "-";
        charCountEl.textContent = "";
        statusEl.textContent = "";
      };

      // Example
      inputEl.value = "Hello World 你好世界";
      update();

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
    
