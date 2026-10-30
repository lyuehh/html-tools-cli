// @ts-nocheck
// Generated from tools/dev/i18n-key-generator.html
// Source SHA-256: f4adb7ca3464fc912ce67dfbc92bb3f291257f95df7caddab6a35abff96c8687
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputGridEl = document.getElementById("outputGrid");
      const prefixEl = document.getElementById("prefix");
      const separatorEl = document.getElementById("separator");
      const formatEl = document.getElementById("format");
      const statusEl = document.getElementById("status");

      // Simple Chinese to Pinyin mapping
      const pinyinMap = {
        的: "de",
        一: "yi",
        是: "shi",
        不: "bu",
        了: "le",
        在: "zai",
        人: "ren",
        有: "you",
        我: "wo",
        他: "ta",
        这: "zhe",
        个: "ge",
        们: "men",
        中: "zhong",
        来: "lai",
        上: "shang",
        大: "da",
        为: "wei",
        和: "he",
        国: "guo",
        地: "di",
        到: "dao",
        以: "yi",
        说: "shuo",
        时: "shi",
        要: "yao",
        就: "jiu",
        出: "chu",
        会: "hui",
        可: "ke",
        也: "ye",
        你: "ni",
        对: "dui",
        生: "sheng",
        能: "neng",
        而: "er",
        子: "zi",
        那: "na",
        得: "de",
        于: "yu",
        着: "zhe",
        下: "xia",
        自: "zi",
        之: "zhi",
        年: "nian",
        过: "guo",
        发: "fa",
        后: "hou",
        作: "zuo",
        里: "li",
        用: "yong",
        道: "dao",
        行: "xing",
        所: "suo",
        然: "ran",
        家: "jia",
        种: "zhong",
        事: "shi",
        成: "cheng",
        方: "fang",
        多: "duo",
        经: "jing",
        么: "me",
        去: "qu",
        法: "fa",
        学: "xue",
        如: "ru",
        都: "dou",
        同: "tong",
        现: "xian",
        当: "dang",
        没: "mei",
        动: "dong",
        面: "mian",
        起: "qi",
        看: "kan",
        定: "ding",
        天: "tian",
        分: "fen",
        还: "hai",
        进: "jin",
        好: "hao",
        小: "xiao",
        部: "bu",
        其: "qi",
        些: "xie",
        主: "zhu",
        样: "yang",
        理: "li",
        心: "xin",
        她: "ta",
        本: "ben",
        前: "qian",
        开: "kai",
        但: "dan",
        因: "yin",
        只: "zhi",
        从: "cong",
        想: "xiang",
        实: "shi",
        日: "ri",
        军: "jun",
        者: "zhe",
        意: "yi",
        无: "wu",
        力: "li",
        它: "ta",
        与: "yu",
        长: "chang",
        把: "ba",
        机: "ji",
        十: "shi",
        民: "min",
        第: "di",
        公: "gong",
        此: "ci",
        已: "yi",
        工: "gong",
        使: "shi",
        情: "qing",
        明: "ming",
        性: "xing",
        知: "zhi",
        全: "quan",
        三: "san",
        又: "you",
        关: "guan",
        点: "dian",
        正: "zheng",
        业: "ye",
        外: "wai",
        将: "jiang",
        两: "liang",
        高: "gao",
        间: "jian",
        由: "you",
        问: "wen",
        很: "hen",
        最: "zui",
        重: "zhong",
        并: "bing",
        物: "wu",
        手: "shou",
        应: "ying",
        战: "zhan",
        向: "xiang",
        头: "tou",
        文: "wen",
        体: "ti",
        政: "zheng",
        美: "mei",
        相: "xiang",
        见: "jian",
        被: "bei",
        利: "li",
        什: "shen",
        二: "er",
        等: "deng",
        产: "chan",
        或: "huo",
        新: "xin",
        己: "ji",
        制: "zhi",
        身: "shen",
        果: "guo",
        加: "jia",
        西: "xi",
        斯: "si",
        月: "yue",
        话: "hua",
        合: "he",
        回: "hui",
        特: "te",
        代: "dai",
        内: "nei",
        信: "xin",
        表: "biao",
        化: "hua",
        老: "lao",
        给: "gei",
        世: "shi",
        位: "wei",
        次: "ci",
        度: "du",
        门: "men",
        任: "ren",
        常: "chang",
        先: "xian",
        海: "hai",
        通: "tong",
        教: "jiao",
        儿: "er",
        原: "yuan",
        东: "dong",
        声: "sheng",
        提: "ti",
        立: "li",
        及: "ji",
        比: "bi",
        员: "yuan",
        解: "jie",
        水: "shui",
        名: "ming",
        真: "zhen",
        论: "lun",
        处: "chu",
        走: "zou",
        义: "yi",
        各: "ge",
        入: "ru",
        几: "ji",
        口: "kou",
        认: "ren",
        条: "tiao",
        平: "ping",
        系: "xi",
        气: "qi",
        题: "ti",
        活: "huo",
        尔: "er",
        更: "geng",
        别: "bie",
        打: "da",
        女: "nv",
        变: "bian",
        四: "si",
        神: "shen",
        总: "zong",
        何: "he",
        电: "dian",
        数: "shu",
        安: "an",
        少: "shao",
        报: "bao",
        才: "cai",
        结: "jie",
        反: "fan",
        受: "shou",
        目: "mu",
        太: "tai",
        量: "liang",
        再: "zai",
        感: "gan",
        建: "jian",
        务: "wu",
        做: "zuo",
        接: "jie",
        必: "bi",
        场: "chang",
        件: "jian",
        计: "ji",
        管: "guan",
        期: "qi",
        市: "shi",
        直: "zhi",
        德: "de",
        资: "zi",
        命: "ming",
        山: "shan",
        金: "jin",
        指: "zhi",
        克: "ke",
        许: "xu",
        统: "tong",
        区: "qu",
        保: "bao",
        至: "zhi",
        队: "dui",
        形: "xing",
        社: "she",
        便: "bian",
        空: "kong",
        决: "jue",
        治: "zhi",
        展: "zhan",
        马: "ma",
        科: "ke",
        司: "si",
        五: "wu",
        基: "ji",
        眼: "yan",
        书: "shu",
        非: "fei",
        则: "ze",
        听: "ting",
        白: "bai",
        却: "que",
        界: "jie",
        达: "da",
        光: "guang",
        放: "fang",
        强: "qiang",
        即: "ji",
        像: "xiang",
        难: "nan",
        且: "qie",
        权: "quan",
        思: "si",
        王: "wang",
        象: "xiang",
        完: "wan",
        设: "she",
        式: "shi",
        色: "se",
        路: "lu",
        记: "ji",
        南: "nan",
        品: "pin",
        住: "zhu",
        告: "gao",
        类: "lei",
        求: "qiu",
        据: "ju",
        程: "cheng",
        北: "bei",
        边: "bian",
        死: "si",
        张: "zhang",
        该: "gai",
        交: "jiao",
        规: "gui",
        万: "wan",
        取: "qu",
        拉: "la",
        格: "ge",
        望: "wang",
        觉: "jue",
        术: "shu",
        领: "ling",
        共: "gong",
        确: "que",
        传: "chuan",
        师: "shi",
        观: "guan",
        清: "qing",
        今: "jin",
        切: "qie",
        院: "yuan",
        让: "rang",
        识: "shi",
        候: "hou",
        带: "dai",
        导: "dao",
        争: "zheng",
        运: "yun",
        笑: "xiao",
        飞: "fei",
        风: "feng",
        步: "bu",
        改: "gai",
        收: "shou",
        根: "gen",
        干: "gan",
        造: "zao",
        言: "yan",
        联: "lian",
        持: "chi",
        组: "zu",
        每: "mei",
        济: "ji",
        车: "che",
        亲: "qin",
        极: "ji",
        林: "lin",
        服: "fu",
        快: "kuai",
        办: "ban",
        议: "yi",
        往: "wang",
        元: "yuan",
        英: "ying",
        士: "shi",
        证: "zheng",
        近: "jin",
        失: "shi",
        转: "zhuan",
        夫: "fu",
        令: "ling",
        准: "zhun",
        布: "bu",
        始: "shi",
        怎: "zen",
        存: "cun",
        候: "hou",
        存: "cun",
        候: "hou",
        查: "cha",
        找: "zhao",
        删: "shan",
        除: "chu",
        添: "tian",
        修: "xiu",
        改: "gai",
        保: "bao",
        存: "cun",
        取: "qu",
        消: "xiao",
        确: "que",
        认: "ren",
        返: "fan",
        回: "hui",
        关: "guan",
        闭: "bi",
        退: "tui",
        出: "chu",
        登: "deng",
        录: "lu",
        注: "zhu",
        册: "ce",
        提: "ti",
        交: "jiao",
        编: "bian",
        辑: "ji",
        预: "yu",
        览: "lan",
        复: "fu",
        制: "zhi",
        粘: "zhan",
        贴: "tie",
        剪: "jian",
        切: "qie",
        撤: "che",
        销: "xiao",
        重: "chong",
        试: "shi",
        搜: "sou",
        索: "suo",
        筛: "shai",
        选: "xuan",
        排: "pai",
        序: "xu",
        刷: "shua",
        新: "xin",
        导: "dao",
        入: "ru",
        出: "chu",
        口: "kou",
        上: "shang",
        传: "chuan",
        下: "xia",
        载: "zai",
        暂: "zan",
        停: "ting",
        继: "ji",
        续: "xu",
        跳: "tiao",
        过: "guo",
        执: "zhi",
        行: "xing",
        停: "ting",
        止: "zhi",
        启: "qi",
        动: "dong",
        重: "zhong",
        启: "qi",
        成: "cheng",
        功: "gong",
        失: "shi",
        败: "bai",
        错: "cuo",
        误: "wu",
        警: "jing",
        告: "gao",
        提: "ti",
        示: "shi",
        消: "xiao",
        息: "xi",
        通: "tong",
        知: "zhi",
        标: "biao",
        题: "ti",
        描: "miao",
        述: "shu",
        内: "nei",
        容: "rong",
        状: "zhuang",
        态: "tai",
        类: "lei",
        型: "xing",
        级: "ji",
        别: "bie",
        权: "quan",
        限: "xian",
        角: "jue",
        色: "se",
        用: "yong",
        户: "hu",
        账: "zhang",
        号: "hao",
        密: "mi",
        码: "ma",
        邮: "you",
        箱: "xiang",
        手: "shou",
        机: "ji",
        号: "hao",
        码: "ma",
        地: "di",
        址: "zhi",
        配: "pei",
        置: "zhi",
        设: "she",
        置: "zhi",
        参: "can",
        数: "shu",
        选: "xuan",
        项: "xiang",
        必: "bi",
        填: "tian",
        为: "wei",
        空: "kong",
        格: "ge",
        式: "shi",
        正: "zheng",
        确: "que",
        无: "wu",
        效: "xiao",
        有: "you",
        效: "xiao",
        启: "qi",
        用: "yong",
        禁: "jin",
        用: "yong",
        显: "xian",
        示: "shi",
        隐: "yin",
        藏: "cang",
        展: "zhan",
        开: "kai",
        折: "zhe",
        叠: "die",
        全: "quan",
        部: "bu",
        列: "lie",
        表: "biao",
        详: "xiang",
        情: "qing",
        摘: "zhai",
        要: "yao",
        默: "mo",
        认: "ren",
        值: "zhi",
        最: "zui",
        大: "da",
        小: "xiao",
        长: "chang",
        短: "duan",
        宽: "kuan",
        高: "gao",
        范: "fan",
        围: "wei",
        日: "ri",
        期: "qi",
        时: "shi",
        间: "jian",
        年: "nian",
        月: "yue",
        日: "ri",
        周: "zhou",
        今: "jin",
        昨: "zuo",
        明: "ming",
        后: "hou",
        起: "qi",
        止: "zhi",
        创: "chuang",
        建: "jian",
        更: "geng",
        新: "xin",
        版: "ban",
        本: "ben",
        备: "bei",
        注: "zhu",
        操: "cao",
        作: "zuo"
      };

      function toPinyin(text) {
        return text
          .split("")
          .map(function (char) {
            return pinyinMap[char] || char;
          })
          .join("");
      }

      function toSnakeCase(str) {
        return str
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "_")
          .replace(/^_+|_+$/g, "");
      }

      function toCamelCase(str) {
        const snake = toSnakeCase(str);
        return snake.replace(/_([a-z])/g, function (m, c) {
          return c.toUpperCase();
        });
      }

      function toKebabCase(str) {
        return str
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }

      function toScreamingSnake(str) {
        return toSnakeCase(str).toUpperCase();
      }

      window.generateKey = function (text, format) {
        // Convert Chinese to pinyin
        let processed = toPinyin(text);

        // Remove special chars and normalize
        processed = processed.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        switch (format) {
          case "camelCase":
            return toCamelCase(processed);
          case "kebab-case":
            return toKebabCase(processed);
          case "SCREAMING_SNAKE":
            return toScreamingSnake(processed);
          default:
            return toSnakeCase(processed);
        }
      };

      function update() {
        const text = inputEl.value.trim();
        const lines = text.split("\n").filter(function (l) {
          return l.trim();
        });
        const prefix = prefixEl.value.trim();
        const separator = separatorEl.value;
        const format = formatEl.value;

        outputGridEl.textContent = "";

        if (lines.length === 0) return;

        lines.forEach(function (line) {
          const key = generateKey(line.trim(), format);
          const fullKey = prefix ? prefix + separator + key : key;

          const item = document.createElement("div");
          item.className = "output-item";

          const label = document.createElement("div");
          label.className = "output-label";

          const labelText = document.createElement("span");
          labelText.textContent = line.trim();

          const copyBtn = document.createElement("button");
          copyBtn.className = "copy-btn";
          copyBtn.textContent = "复制";
          copyBtn.onclick = function () {
            copyToClipboard(fullKey, copyBtn);
          };

          label.appendChild(labelText);
          label.appendChild(copyBtn);

          const value = document.createElement("div");
          value.className = "output-value";
          value.textContent = fullKey;
          value.onclick = function () {
            copyToClipboard(fullKey, copyBtn);
          };

          item.appendChild(label);
          item.appendChild(value);
          outputGridEl.appendChild(item);
        });
      }

      window.copyToClipboard = async function (text, btn) {
        try {
          await navigator.clipboard.writeText(text);
          const originalText = btn.textContent;
          btn.textContent = "已复制";
          statusEl.textContent = "已复制: " + text;
          setTimeout(function () {
            btn.textContent = originalText;
            statusEl.textContent = "";
          }, 1500);
        } catch (e) {}
      };

      inputEl.addEventListener("input", update);
      prefixEl.addEventListener("input", update);
      separatorEl.addEventListener("change", update);
      formatEl.addEventListener("change", update);

      // Example
      inputEl.value = "保存\n取消\n确认删除\n用户名不能为空";
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
    
