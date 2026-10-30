// @ts-nocheck
// Generated from tools/chinese/pinyin-tone.html
// Source SHA-256: 3082048e81bb3da0dce9b6100bae10b067e1cc43faf8f10b1d086856fbe715c0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 汉字拼音映射（部分常用字）
      const pinyinMap = {
        中: "zhōng",
        华: "huá",
        人: "rén",
        民: "mín",
        共: "gòng",
        和: "hé",
        国: "guó",
        你: "nǐ",
        好: "hǎo",
        我: "wǒ",
        他: "tā",
        她: "tā",
        它: "tā",
        是: "shì",
        的: "de",
        了: "le",
        在: "zài",
        有: "yǒu",
        个: "gè",
        上: "shàng",
        下: "xià",
        左: "zuǒ",
        右: "yòu",
        前: "qián",
        后: "hòu",
        大: "dà",
        小: "xiǎo",
        多: "duō",
        少: "shǎo",
        长: "cháng",
        短: "duǎn",
        学: "xué",
        习: "xí",
        生: "shēng",
        老: "lǎo",
        师: "shī",
        书: "shū",
        一: "yī",
        二: "èr",
        三: "sān",
        四: "sì",
        五: "wǔ",
        六: "liù",
        七: "qī",
        八: "bā",
        九: "jiǔ",
        十: "shí",
        百: "bǎi",
        千: "qiān",
        万: "wàn",
        亿: "yì",
        天: "tiān",
        地: "dì",
        日: "rì",
        月: "yuè",
        年: "nián",
        时: "shí",
        山: "shān",
        水: "shuǐ",
        火: "huǒ",
        木: "mù",
        金: "jīn",
        土: "tǔ",
        东: "dōng",
        西: "xī",
        南: "nán",
        北: "běi",
        春: "chūn",
        夏: "xià",
        秋: "qiū",
        冬: "dōng",
        爱: "ài",
        心: "xīn",
        情: "qíng",
        意: "yì",
        床: "chuáng",
        明: "míng",
        光: "guāng",
        疑: "yí",
        霜: "shuāng",
        举: "jǔ",
        头: "tóu",
        望: "wàng",
        低: "dī",
        思: "sī",
        故: "gù",
        乡: "xiāng",
        而: "ér",
        之: "zhī",
        不: "bù",
        亦: "yì",
        乐: "lè",
        乎: "hū",
        拼: "pīn",
        音: "yīn",
        声: "shēng",
        调: "diào"
      };

      // 数字声调到带声调字母的映射
      const toneMarks = {
        a: ["ā", "á", "ǎ", "à", "a"],
        o: ["ō", "ó", "ǒ", "ò", "o"],
        e: ["ē", "é", "ě", "è", "e"],
        i: ["ī", "í", "ǐ", "ì", "i"],
        u: ["ū", "ú", "ǔ", "ù", "u"],
        v: ["ǖ", "ǘ", "ǚ", "ǜ", "ü"],
        ü: ["ǖ", "ǘ", "ǚ", "ǜ", "ü"]
      };

      let currentMode = "text";
      let keyboardOutput = "";

      function setMode(mode) {
        currentMode = mode;
        document.querySelectorAll(".mode-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.mode === mode);
        });
        document.getElementById("textMode").style.display = mode === "text" ? "block" : "none";
        document.getElementById("numberMode").style.display = mode === "number" ? "block" : "none";
        document.getElementById("keyboardMode").style.display =
          mode === "keyboard" ? "block" : "none";
      }

      function setExample(text) {
        document.getElementById("textInput").value = text;
        convertText();
      }

      function setNumberExample(text) {
        document.getElementById("numberInput").value = text;
        convertNumber();
      }

      function convertText() {
        const text = document.getElementById("textInput").value;
        const resultPinyin = document.getElementById("resultPinyin");

        if (!text.trim()) {
          resultPinyin.textContent = "请输入汉字";
          return;
        }

        resultPinyin.textContent = "";

        for (let char of text) {
          if (pinyinMap[char]) {
            const ruby = document.createElement("ruby");
            ruby.textContent = char;
            const rt = document.createElement("rt");
            rt.textContent = pinyinMap[char];
            ruby.appendChild(rt);
            resultPinyin.appendChild(ruby);
          } else if (/[\u4e00-\u9fa5]/.test(char)) {
            // 未知汉字
            const ruby = document.createElement("ruby");
            ruby.textContent = char;
            const rt = document.createElement("rt");
            rt.textContent = "?";
            rt.style.color = "#f43f5e";
            ruby.appendChild(rt);
            resultPinyin.appendChild(ruby);
          } else {
            resultPinyin.appendChild(document.createTextNode(char));
          }
        }
      }

      function convertNumber() {
        const input = document.getElementById("numberInput").value;
        const resultPinyin = document.getElementById("resultPinyin");

        if (!input.trim()) {
          resultPinyin.textContent = "请输入数字声调拼音";
          return;
        }

        // 将数字声调转换为带声调字母
        let result = input.replace(/([aoeiu]|ü|v)([1-4])/gi, (match, vowel, tone) => {
          const toneIndex = parseInt(tone) - 1;
          const v = vowel.toLowerCase();
          if (toneMarks[v]) {
            return toneMarks[v][toneIndex];
          }
          return match;
        });

        // 处理轻声（5或无声调）
        result = result.replace(/([aoeiu]|ü|v)5/gi, (match, vowel) => {
          const v = vowel.toLowerCase();
          if (toneMarks[v]) {
            return toneMarks[v][4];
          }
          return vowel;
        });

        resultPinyin.textContent = result;
      }

      function insertVowel(char) {
        keyboardOutput += char;
        document.getElementById("pinyinOutput").textContent = keyboardOutput;
      }

      function backspace() {
        keyboardOutput = keyboardOutput.slice(0, -1);
        document.getElementById("pinyinOutput").textContent = keyboardOutput;
      }

      function clearKeyboard() {
        keyboardOutput = "";
        document.getElementById("pinyinOutput").textContent = "";
      }

      function copyResult() {
        const text = document.getElementById("resultPinyin").textContent;
        if (text && text !== "请输入汉字" && text !== "转换结果将显示在这里") {
          navigator.clipboard.writeText(text);
          showCopyNotice();
        }
      }

      function copyNumberResult() {
        const text = document.getElementById("resultPinyin").textContent;
        if (text && text !== "请输入数字声调拼音") {
          navigator.clipboard.writeText(text);
          showCopyNotice();
        }
      }

      function copyKeyboardResult() {
        if (keyboardOutput) {
          navigator.clipboard.writeText(keyboardOutput);
          showCopyNotice();
        }
      }

      function showCopyNotice() {
        const notice = document.getElementById("copyNotice");
        notice.classList.add("show");
        setTimeout(() => notice.classList.remove("show"), 2000);
      }

      function clearInput() {
        document.getElementById("textInput").value = "";
        document.getElementById("resultPinyin").textContent = "转换结果将显示在这里";
      }

      // 输入时实时转换
      document.getElementById("textInput").addEventListener("input", convertText);
      document.getElementById("numberInput").addEventListener("input", convertNumber);

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
    
