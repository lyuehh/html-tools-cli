// @ts-nocheck
// Generated from tools/text/shuangpin-trainer.html
// Source SHA-256: 9468df616fbb8a41c62c74c86106dee184d83df59b01b3e6ebe4c783893b030f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 双拼方案定义
      const schemes = {
        xiaohe: {
          name: "小鹤双拼",
          shengmu: {
            q: "q",
            w: "w",
            e: "",
            r: "r",
            t: "t",
            y: "y",
            u: "sh",
            i: "ch",
            o: "",
            p: "p",
            a: "",
            s: "s",
            d: "d",
            f: "f",
            g: "g",
            h: "h",
            j: "j",
            k: "k",
            l: "l",
            z: "z",
            x: "x",
            c: "c",
            v: "zh",
            b: "b",
            n: "n",
            m: "m"
          },
          yunmu: {
            q: "iu",
            w: "ei",
            e: "e",
            r: "uan",
            t: "ue",
            y: "un",
            u: "u",
            i: "i",
            o: "uo",
            p: "ie",
            a: "a",
            s: "ong",
            d: "ai",
            f: "en",
            g: "eng",
            h: "ang",
            j: "an",
            k: "ao",
            l: "ou",
            z: "ou",
            x: "ia",
            c: "ao",
            v: "ui",
            b: "in",
            n: "iao",
            m: "ian"
          },
          special: {
            a: "aa",
            ai: "ad",
            an: "aj",
            ang: "ah",
            ao: "ak",
            e: "ee",
            ei: "ew",
            en: "ef",
            eng: "eg",
            er: "er",
            o: "oo",
            ou: "ol"
          }
        },
        ziranma: {
          name: "自然码",
          shengmu: {
            q: "q",
            w: "w",
            e: "",
            r: "r",
            t: "t",
            y: "y",
            u: "sh",
            i: "ch",
            o: "",
            p: "p",
            a: "",
            s: "s",
            d: "d",
            f: "f",
            g: "g",
            h: "h",
            j: "j",
            k: "k",
            l: "l",
            z: "z",
            x: "x",
            c: "c",
            v: "zh",
            b: "b",
            n: "n",
            m: "m"
          },
          yunmu: {
            q: "iu",
            w: "ia",
            e: "e",
            r: "uan",
            t: "ue",
            y: "ing",
            u: "u",
            i: "i",
            o: "uo",
            p: "un",
            a: "a",
            s: "ong",
            d: "uang",
            f: "en",
            g: "eng",
            h: "ang",
            j: "an",
            k: "ao",
            l: "ai",
            z: "ei",
            x: "ie",
            c: "iao",
            v: "ui",
            b: "ou",
            n: "in",
            m: "ian"
          },
          special: {
            a: "aa",
            ai: "al",
            an: "aj",
            ang: "ah",
            ao: "ak",
            e: "ee",
            ei: "ez",
            en: "ef",
            eng: "eg",
            er: "er",
            o: "oo",
            ou: "ob"
          }
        },
        sogou: {
          name: "搜狗双拼",
          shengmu: {
            q: "q",
            w: "w",
            e: "",
            r: "r",
            t: "t",
            y: "y",
            u: "sh",
            i: "ch",
            o: "",
            p: "p",
            a: "",
            s: "s",
            d: "d",
            f: "f",
            g: "g",
            h: "h",
            j: "j",
            k: "k",
            l: "l",
            z: "z",
            x: "x",
            c: "c",
            v: "zh",
            b: "b",
            n: "n",
            m: "m"
          },
          yunmu: {
            q: "iu",
            w: "ia",
            e: "e",
            r: "uan",
            t: "ue",
            y: "uai",
            u: "u",
            i: "i",
            o: "uo",
            p: "un",
            a: "a",
            s: "ong",
            d: "uang",
            f: "en",
            g: "eng",
            h: "ang",
            j: "an",
            k: "ao",
            l: "ai",
            z: "ei",
            x: "ie",
            c: "iao",
            v: "ui",
            b: "ou",
            n: "in",
            m: "ian",
            ";": "ing"
          },
          special: {
            a: "oa",
            ai: "ol",
            an: "oj",
            ang: "oh",
            ao: "ok",
            e: "oe",
            ei: "oz",
            en: "of",
            eng: "og",
            er: "or",
            o: "oo",
            ou: "ob"
          }
        },
        microsoft: {
          name: "微软双拼",
          shengmu: {
            q: "q",
            w: "w",
            e: "",
            r: "r",
            t: "t",
            y: "y",
            u: "sh",
            i: "ch",
            o: "",
            p: "p",
            a: "",
            s: "s",
            d: "d",
            f: "f",
            g: "g",
            h: "h",
            j: "j",
            k: "k",
            l: "l",
            z: "z",
            x: "x",
            c: "c",
            v: "zh",
            b: "b",
            n: "n",
            m: "m"
          },
          yunmu: {
            q: "iu",
            w: "ia",
            e: "e",
            r: "uan",
            t: "ue",
            y: "uai",
            u: "u",
            i: "i",
            o: "uo",
            p: "un",
            a: "a",
            s: "ong",
            d: "uang",
            f: "en",
            g: "eng",
            h: "ang",
            j: "an",
            k: "ao",
            l: "ai",
            z: "ei",
            x: "ie",
            c: "iao",
            v: "ui",
            b: "ou",
            n: "in",
            m: "ian",
            ";": "ing"
          },
          special: {
            a: "oa",
            ai: "ol",
            an: "oj",
            ang: "oh",
            ao: "ok",
            e: "oe",
            ei: "oz",
            en: "of",
            eng: "og",
            er: "or",
            o: "oo",
            ou: "ob"
          }
        }
      };

      // 常用汉字及其拼音
      const chars = [
        { char: "中", pinyin: "zhong" },
        { char: "国", pinyin: "guo" },
        { char: "人", pinyin: "ren" },
        { char: "的", pinyin: "de" },
        { char: "是", pinyin: "shi" },
        { char: "不", pinyin: "bu" },
        { char: "了", pinyin: "le" },
        { char: "在", pinyin: "zai" },
        { char: "有", pinyin: "you" },
        { char: "我", pinyin: "wo" },
        { char: "他", pinyin: "ta" },
        { char: "这", pinyin: "zhe" },
        { char: "个", pinyin: "ge" },
        { char: "们", pinyin: "men" },
        { char: "来", pinyin: "lai" },
        { char: "到", pinyin: "dao" },
        { char: "时", pinyin: "shi" },
        { char: "大", pinyin: "da" },
        { char: "地", pinyin: "di" },
        { char: "为", pinyin: "wei" },
        { char: "子", pinyin: "zi" },
        { char: "说", pinyin: "shuo" },
        { char: "出", pinyin: "chu" },
        { char: "也", pinyin: "ye" },
        { char: "和", pinyin: "he" },
        { char: "那", pinyin: "na" },
        { char: "要", pinyin: "yao" },
        { char: "下", pinyin: "xia" },
        { char: "以", pinyin: "yi" },
        { char: "生", pinyin: "sheng" },
        { char: "会", pinyin: "hui" },
        { char: "自", pinyin: "zi" },
        { char: "着", pinyin: "zhe" },
        { char: "去", pinyin: "qu" },
        { char: "之", pinyin: "zhi" },
        { char: "过", pinyin: "guo" },
        { char: "家", pinyin: "jia" },
        { char: "学", pinyin: "xue" },
        { char: "对", pinyin: "dui" },
        { char: "可", pinyin: "ke" },
        { char: "她", pinyin: "ta" },
        { char: "里", pinyin: "li" },
        { char: "后", pinyin: "hou" },
        { char: "小", pinyin: "xiao" },
        { char: "么", pinyin: "me" },
        { char: "心", pinyin: "xin" },
        { char: "多", pinyin: "duo" },
        { char: "天", pinyin: "tian" },
        { char: "而", pinyin: "er" },
        { char: "能", pinyin: "neng" },
        { char: "好", pinyin: "hao" },
        { char: "都", pinyin: "dou" },
        { char: "然", pinyin: "ran" },
        { char: "没", pinyin: "mei" },
        { char: "日", pinyin: "ri" },
        { char: "于", pinyin: "yu" },
        { char: "起", pinyin: "qi" },
        { char: "还", pinyin: "hai" },
        { char: "发", pinyin: "fa" },
        { char: "成", pinyin: "cheng" },
        { char: "事", pinyin: "shi" },
        { char: "只", pinyin: "zhi" },
        { char: "作", pinyin: "zuo" },
        { char: "当", pinyin: "dang" },
        { char: "想", pinyin: "xiang" },
        { char: "看", pinyin: "kan" },
        { char: "文", pinyin: "wen" },
        { char: "无", pinyin: "wu" },
        { char: "开", pinyin: "kai" },
        { char: "手", pinyin: "shou" },
        { char: "十", pinyin: "shi" },
        { char: "用", pinyin: "yong" },
        { char: "主", pinyin: "zhu" },
        { char: "行", pinyin: "xing" },
        { char: "方", pinyin: "fang" },
        { char: "又", pinyin: "you" },
        { char: "如", pinyin: "ru" },
        { char: "前", pinyin: "qian" },
        { char: "所", pinyin: "suo" },
        { char: "本", pinyin: "ben" },
        { char: "见", pinyin: "jian" },
        { char: "经", pinyin: "jing" },
        { char: "头", pinyin: "tou" },
        { char: "面", pinyin: "mian" },
        { char: "公", pinyin: "gong" },
        { char: "同", pinyin: "tong" },
        { char: "三", pinyin: "san" },
        { char: "已", pinyin: "yi" },
        { char: "老", pinyin: "lao" },
        { char: "从", pinyin: "cong" },
        { char: "动", pinyin: "dong" },
        { char: "两", pinyin: "liang" },
        { char: "长", pinyin: "chang" },
        { char: "知", pinyin: "zhi" },
        { char: "民", pinyin: "min" },
        { char: "样", pinyin: "yang" }
      ];

      let currentScheme = "xiaohe";
      let currentChar = null;
      let stats = { total: 0, correct: 0, streak: 0 };
      let history = [];

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        document.querySelector(".theme-toggle").textContent = newTheme === "light" ? "🌙" : "☀️";
      };

      function initTheme() {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.querySelector(".theme-toggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      // 拼音转双拼
      function pinyinToShuangpin(pinyin, scheme) {
        const s = schemes[scheme];
        pinyin = pinyin.toLowerCase();

        // 处理特殊韵母（零声母）
        if (s.special[pinyin]) {
          return s.special[pinyin];
        }

        // 分离声母和韵母
        let shengmu = "";
        let yunmu = pinyin;

        const shengmuList = [
          "zh",
          "ch",
          "sh",
          "b",
          "p",
          "m",
          "f",
          "d",
          "t",
          "n",
          "l",
          "g",
          "k",
          "h",
          "j",
          "q",
          "x",
          "r",
          "z",
          "c",
          "s",
          "y",
          "w"
        ];

        for (const sm of shengmuList) {
          if (pinyin.startsWith(sm)) {
            shengmu = sm;
            yunmu = pinyin.slice(sm.length);
            break;
          }
        }

        // 查找声母键位
        let shengKey = "";
        if (shengmu) {
          for (const [key, val] of Object.entries(s.shengmu)) {
            if (val === shengmu) {
              shengKey = key;
              break;
            }
          }
          if (!shengKey && shengmu.length === 1) {
            shengKey = shengmu;
          }
        }

        // 查找韵母键位
        let yunKey = "";
        // 处理特殊情况
        if (yunmu === "v" || yunmu === "ü") yunmu = "u";
        if (yunmu === "ve" || yunmu === "üe") yunmu = "ue";

        // 直接匹配韵母
        for (const [key, val] of Object.entries(s.yunmu)) {
          if (val === yunmu) {
            yunKey = key;
            break;
          }
        }

        // 单韵母直接使用
        if (!yunKey && yunmu.length === 1 && "aeiou".includes(yunmu)) {
          yunKey = yunmu;
        }

        // 零声母处理
        if (!shengmu) {
          if (s.special[yunmu]) {
            return s.special[yunmu];
          }
          // 零声母 + 韵母
          if (yunmu.startsWith("i")) shengKey = "i";
          else if (yunmu.startsWith("u")) shengKey = "u";
          else if (yunmu.startsWith("ü")) shengKey = "v";
          else shengKey = yunmu[0];
        }

        return shengKey + yunKey;
      }

      // 生成键盘
      function renderKeyboard() {
        const keyboard = document.getElementById("keyboard");
        keyboard.textContent = "";

        const s = schemes[currentScheme];
        const rows = [
          ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
          ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
          ["z", "x", "c", "v", "b", "n", "m"]
        ];

        rows.forEach((row) => {
          const rowDiv = document.createElement("div");
          rowDiv.className = "keyboard-row";

          row.forEach((key) => {
            const keyDiv = document.createElement("div");
            keyDiv.className = "key";
            keyDiv.dataset.key = key;

            const letterSpan = document.createElement("span");
            letterSpan.className = "letter";
            letterSpan.textContent = key.toUpperCase();

            const shengSpan = document.createElement("span");
            shengSpan.className = "sheng";
            shengSpan.textContent = s.shengmu[key] || "";

            const yunSpan = document.createElement("span");
            yunSpan.className = "yun";
            yunSpan.textContent = s.yunmu[key] || "";

            keyDiv.appendChild(letterSpan);
            keyDiv.appendChild(shengSpan);
            keyDiv.appendChild(yunSpan);

            keyDiv.onclick = () => {
              const input = document.getElementById("userInput");
              if (input.value.length < 2) {
                input.value += key;
                input.focus();
              }
            };

            rowDiv.appendChild(keyDiv);
          });

          keyboard.appendChild(rowDiv);
        });
      }

      // 生成方案对照表
      function renderSchemeTable() {
        const container = document.getElementById("schemeTableContainer");
        container.textContent = "";

        const s = schemes[currentScheme];
        const table = document.createElement("table");

        // 声母表头
        const theadSheng = document.createElement("thead");
        const trShengHead = document.createElement("tr");
        const thSheng = document.createElement("th");
        thSheng.colSpan = 5;
        thSheng.textContent = "声母";
        trShengHead.appendChild(thSheng);
        theadSheng.appendChild(trShengHead);
        table.appendChild(theadSheng);

        // 声母内容
        const tbodySheng = document.createElement("tbody");
        const shengmuEntries = Object.entries(s.shengmu).filter(([k, v]) => v);
        for (let i = 0; i < shengmuEntries.length; i += 5) {
          const tr = document.createElement("tr");
          for (let j = 0; j < 5 && i + j < shengmuEntries.length; j++) {
            const [key, val] = shengmuEntries[i + j];
            const td = document.createElement("td");
            td.textContent = key.toUpperCase() + " → " + val;
            tr.appendChild(td);
          }
          tbodySheng.appendChild(tr);
        }
        table.appendChild(tbodySheng);

        // 韵母表头
        const theadYun = document.createElement("thead");
        const trYunHead = document.createElement("tr");
        const thYun = document.createElement("th");
        thYun.colSpan = 5;
        thYun.textContent = "韵母";
        trYunHead.appendChild(thYun);
        theadYun.appendChild(trYunHead);
        table.appendChild(theadYun);

        // 韵母内容
        const tbodyYun = document.createElement("tbody");
        const yunmuEntries = Object.entries(s.yunmu).filter(([k, v]) => v);
        for (let i = 0; i < yunmuEntries.length; i += 5) {
          const tr = document.createElement("tr");
          for (let j = 0; j < 5 && i + j < yunmuEntries.length; j++) {
            const [key, val] = yunmuEntries[i + j];
            const td = document.createElement("td");
            td.textContent = key.toUpperCase() + " → " + val;
            tr.appendChild(td);
          }
          tbodyYun.appendChild(tr);
        }
        table.appendChild(tbodyYun);

        container.appendChild(table);
      }

      // 下一个字
      function nextChar() {
        const idx = Math.floor(Math.random() * chars.length);
        currentChar = chars[idx];
        updateDisplay();
        document.getElementById("userInput").value = "";
        document.getElementById("feedback").textContent = "";
        document.getElementById("feedback").className = "feedback";
        document.getElementById("userInput").focus();

        // 清除键盘高亮
        document.querySelectorAll(".key").forEach((k) => k.classList.remove("highlight"));
      }

      // 更新显示
      function updateDisplay() {
        if (!currentChar) return;
        document.getElementById("currentChar").textContent = currentChar.char;
        const showHint = document.getElementById("showHint").checked;
        document.getElementById("pinyinHint").textContent = showHint ? currentChar.pinyin : "";
      }

      // 检查答案
      function checkAnswer() {
        if (!currentChar) return;

        const userInput = document.getElementById("userInput").value.toLowerCase();
        const correctAnswer = pinyinToShuangpin(currentChar.pinyin, currentScheme);
        const isCorrect = userInput === correctAnswer;

        stats.total++;
        if (isCorrect) {
          stats.correct++;
          stats.streak++;
          document.getElementById("feedback").textContent = "✓ 正确！";
          document.getElementById("feedback").className = "feedback correct";
        } else {
          stats.streak = 0;
          document.getElementById("feedback").textContent = "✗ 错误，正确答案是：" + correctAnswer;
          document.getElementById("feedback").className = "feedback wrong";
        }

        // 高亮正确按键
        highlightKeys(correctAnswer);

        // 添加历史
        addHistory(currentChar.char, currentChar.pinyin, userInput, correctAnswer, isCorrect);

        updateStats();

        // 自动下一个
        setTimeout(
          () => {
            nextChar();
          },
          isCorrect ? 800 : 2000
        );
      }

      // 高亮按键
      function highlightKeys(answer) {
        document.querySelectorAll(".key").forEach((k) => k.classList.remove("highlight"));
        if (answer.length >= 1) {
          const key1 = document.querySelector('.key[data-key="' + answer[0] + '"]');
          if (key1) key1.classList.add("highlight");
        }
        if (answer.length >= 2) {
          const key2 = document.querySelector('.key[data-key="' + answer[1] + '"]');
          if (key2) key2.classList.add("highlight");
        }
      }

      // 跳过
      window.skipChar = function () {
        const correctAnswer = pinyinToShuangpin(currentChar.pinyin, currentScheme);
        document.getElementById("feedback").textContent = "跳过，答案是：" + correctAnswer;
        document.getElementById("feedback").className = "feedback";
        highlightKeys(correctAnswer);
        setTimeout(nextChar, 1500);
      };

      // 更新统计
      function updateStats() {
        document.getElementById("totalCount").textContent = stats.total;
        document.getElementById("correctCount").textContent = stats.correct;
        document.getElementById("accuracy").textContent =
          stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) + "%" : "0%";
        document.getElementById("streak").textContent = stats.streak;

        localStorage.setItem("shuangpin-stats-" + currentScheme, JSON.stringify(stats));
      }

      // 重置统计
      window.resetStats = function () {
        stats = { total: 0, correct: 0, streak: 0 };
        updateStats();
      };

      // 历史记录
      function addHistory(char, pinyin, input, answer, correct) {
        history.unshift({
          char,
          pinyin,
          input,
          answer,
          correct,
          time: new Date().toLocaleTimeString()
        });
        if (history.length > 50) history.pop();
        renderHistory();
      }

      function renderHistory() {
        const list = document.getElementById("historyList");
        list.textContent = "";

        history.forEach((item) => {
          const div = document.createElement("div");
          div.className = "history-item " + (item.correct ? "correct" : "wrong");

          const infoSpan = document.createElement("span");
          infoSpan.textContent =
            item.char +
            " (" +
            item.pinyin +
            ") → " +
            item.input +
            (item.correct ? " ✓" : " ✗ 应为 " + item.answer);

          const timeSpan = document.createElement("span");
          timeSpan.textContent = item.time;
          timeSpan.style.color = "var(--pico-muted-color)";

          div.appendChild(infoSpan);
          div.appendChild(timeSpan);
          list.appendChild(div);
        });
      }

      window.clearHistory = function () {
        history = [];
        renderHistory();
      };

      // 切换方案
      window.changeScheme = function () {
        currentScheme = document.getElementById("schemeSelect").value;
        const saved = localStorage.getItem("shuangpin-stats-" + currentScheme);
        stats = saved ? JSON.parse(saved) : { total: 0, correct: 0, streak: 0 };
        updateStats();
        renderKeyboard();
        renderSchemeTable();
        nextChar();
      };

      // 切换键盘显示
      window.toggleKeyboard = function () {
        const show = document.getElementById("showKeyboard").checked;
        document.getElementById("keyboardSection").style.display = show ? "block" : "none";
      };

      // 初始化
      document.addEventListener("DOMContentLoaded", () => {
        initTheme();

        // 加载保存的统计
        const saved = localStorage.getItem("shuangpin-stats-" + currentScheme);
        if (saved) stats = JSON.parse(saved);

        renderKeyboard();
        renderSchemeTable();
        updateStats();
        nextChar();

        // 回车确认
        document.getElementById("userInput").addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            checkAnswer();
          }
        });

        // 自动提交（输入两个字符后）
        document.getElementById("userInput").addEventListener("input", (e) => {
          if (e.target.value.length === 2) {
            setTimeout(checkAnswer, 100);
          }
        });
      });
    
