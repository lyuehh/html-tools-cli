// @ts-nocheck
// Generated from tools/language/pinyin-converter.html
// Source SHA-256: 37c2cfb2aa17b74df1e9216e6afcd9a6e7ac743534fcf2c38008b98ea8f028dd
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Simple pinyin dictionary for common characters
      const pinyinDict = {
        你: "nǐ",
        好: "hǎo",
        我: "wǒ",
        是: "shì",
        的: "de",
        了: "le",
        不: "bù",
        在: "zài",
        他: "tā",
        她: "tā",
        们: "men",
        这: "zhè",
        那: "nà",
        有: "yǒu",
        人: "rén",
        个: "gè",
        大: "dà",
        小: "xiǎo",
        中: "zhōng",
        国: "guó",
        来: "lái",
        去: "qù",
        上: "shàng",
        下: "xià",
        说: "shuō",
        看: "kàn",
        听: "tīng",
        做: "zuò",
        想: "xiǎng",
        要: "yào",
        能: "néng",
        会: "huì",
        时: "shí",
        间: "jiān",
        年: "nián",
        月: "yuè",
        日: "rì",
        天: "tiān",
        地: "dì",
        水: "shuǐ",
        火: "huǒ",
        风: "fēng",
        雨: "yǔ",
        山: "shān",
        海: "hǎi",
        花: "huā",
        草: "cǎo",
        树: "shù",
        学: "xué",
        习: "xí",
        工: "gōng",
        作: "zuò",
        生: "shēng",
        活: "huó",
        爱: "ài",
        心: "xīn",
        快: "kuài",
        乐: "lè",
        高: "gāo",
        兴: "xìng",
        美: "měi",
        丽: "lì",
        好: "hǎo",
        棒: "bàng",
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
        东: "dōng",
        西: "xī",
        南: "nán",
        北: "běi",
        前: "qián",
        后: "hòu",
        左: "zuǒ",
        右: "yòu",
        里: "lǐ",
        外: "wài",
        多: "duō",
        少: "shǎo",
        长: "cháng",
        短: "duǎn",
        新: "xīn",
        旧: "jiù",
        白: "bái",
        黑: "hēi",
        红: "hóng",
        绿: "lǜ",
        蓝: "lán",
        黄: "huáng",
        金: "jīn",
        银: "yín",
        明: "míng",
        暗: "àn",
        早: "zǎo",
        晚: "wǎn",
        今: "jīn",
        昨: "zuó",
        明: "míng",
        后: "hòu",
        家: "jiā",
        门: "mén",
        窗: "chuāng",
        床: "chuáng",
        桌: "zhuō",
        椅: "yǐ",
        书: "shū",
        笔: "bǐ",
        车: "chē",
        路: "lù",
        船: "chuán",
        飞: "fēi",
        机: "jī",
        电: "diàn",
        话: "huà",
        脑: "nǎo",
        吃: "chī",
        喝: "hē",
        睡: "shuì",
        走: "zǒu",
        跑: "pǎo",
        跳: "tiào",
        站: "zhàn",
        坐: "zuò",
        开: "kāi",
        关: "guān",
        进: "jìn",
        出: "chū",
        回: "huí",
        问: "wèn",
        答: "dá",
        知: "zhī",
        道: "dào",
        对: "duì",
        错: "cuò",
        真: "zhēn",
        假: "jiǎ",
        难: "nán",
        易: "yì",
        贵: "guì",
        便: "biàn",
        宜: "yí",
        冷: "lěng",
        热: "rè",
        暖: "nuǎn",
        凉: "liáng",
        干: "gān",
        湿: "shī",
        朋: "péng",
        友: "yǒu",
        同: "tóng",
        事: "shì",
        老: "lǎo",
        师: "shī",
        父: "fù",
        母: "mǔ",
        儿: "ér",
        子: "zǐ",
        女: "nǚ",
        男: "nán",
        先: "xiān",
        后: "hòu",
        头: "tóu",
        手: "shǒu",
        脚: "jiǎo",
        眼: "yǎn",
        睛: "jīng",
        耳: "ěr",
        朵: "duǒ",
        口: "kǒu",
        鼻: "bí",
        牙: "yá",
        欢: "huān",
        迎: "yíng",
        谢: "xiè",
        请: "qǐng",
        再: "zài",
        见: "jiàn",
        晚: "wǎn",
        安: "ān"
      };

      // Tone mark to number conversion
      const toneMarks = {
        ā: "a1",
        á: "a2",
        ǎ: "a3",
        à: "a4",
        ē: "e1",
        é: "e2",
        ě: "e3",
        è: "e4",
        ī: "i1",
        í: "i2",
        ǐ: "i3",
        ì: "i4",
        ō: "o1",
        ó: "o2",
        ǒ: "o3",
        ò: "o4",
        ū: "u1",
        ú: "u2",
        ǔ: "u3",
        ù: "u4",
        ǖ: "ü1",
        ǘ: "ü2",
        ǚ: "ü3",
        ǜ: "ü4"
      };

      let options = {
        tone: "mark",
        format: "ruby"
      };

      function setOption(key, value, btn) {
        options[key] = value;
        document
          .querySelectorAll(`[data-option="${key}"]`)
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Re-convert if there's text
        if (document.getElementById("inputText").value.trim()) {
          convert();
        }
      }

      function getPinyin(char) {
        let pinyin = pinyinDict[char];
        if (!pinyin) return null;

        if (options.tone === "number") {
          // Convert tone marks to numbers
          let result = pinyin;
          let toneNum = "";
          for (const [mark, num] of Object.entries(toneMarks)) {
            if (pinyin.includes(mark)) {
              result = pinyin.replace(mark, num[0]);
              toneNum = num[1];
              break;
            }
          }
          return result + toneNum;
        } else if (options.tone === "none") {
          // Remove tone marks
          let result = pinyin;
          for (const [mark, num] of Object.entries(toneMarks)) {
            result = result.replace(mark, num[0]);
          }
          return result;
        }
        return pinyin;
      }

      function convert() {
        const input = document.getElementById("inputText").value;
        if (!input.trim()) {
          document.getElementById("resultCard").style.display = "none";
          return;
        }

        const result = [];
        let hanziCount = 0;

        for (const char of input) {
          const pinyin = getPinyin(char);
          if (pinyin) {
            hanziCount++;
            if (options.format === "ruby") {
              result.push(
                `<span class="pinyin-group"><span class="pinyin">${pinyin}</span><span class="hanzi">${char}</span></span>`
              );
            } else if (options.format === "inline") {
              result.push(`${char}(${pinyin})`);
            } else {
              result.push(pinyin);
            }
          } else if (/[\u4e00-\u9fff]/.test(char)) {
            // Unknown Chinese character
            hanziCount++;
            if (options.format === "ruby") {
              result.push(
                `<span class="pinyin-group"><span class="pinyin">?</span><span class="hanzi">${char}</span></span>`
              );
            } else if (options.format === "inline") {
              result.push(`${char}(?)`);
            } else {
              result.push("?");
            }
          } else {
            result.push(char);
          }
        }

        document.getElementById("resultText").innerHTML = result.join(
          options.format === "pinyin" ? " " : ""
        );
        document.getElementById("hanziCount").textContent = hanziCount;
        document.getElementById("charCount").textContent = input.length;
        document.getElementById("resultCard").style.display = "block";
      }

      function clearText() {
        document.getElementById("inputText").value = "";
        document.getElementById("resultCard").style.display = "none";
      }

      function loadSample() {
        document.getElementById("inputText").value =
          "你好，世界！欢迎使用汉字转拼音工具。中国是一个美丽的国家，有着悠久的历史和灿烂的文化。";
        convert();
      }

      function copyResult() {
        const resultEl = document.getElementById("resultText");
        let text = resultEl.innerText;

        navigator.clipboard.writeText(text).then(() => {
          const btn = document.querySelector(".copy-btn");
          btn.innerHTML = "✅ 已复制";
          setTimeout(() => {
            btn.innerHTML = "📋 复制结果";
          }, 2000);
        });
      }

      // Auto-convert on input
      document.getElementById("inputText").addEventListener("input", () => {
        if (document.getElementById("inputText").value.trim()) {
          convert();
        } else {
          document.getElementById("resultCard").style.display = "none";
        }
      });

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
