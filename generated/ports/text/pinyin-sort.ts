// @ts-nocheck
// Generated from tools/text/pinyin-sort.html
// Source SHA-256: b2d1ddb895017131b55981de9ac47ef627e702ff20af4569b61adae58ff07839
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 示例数据
      const sampleData = {
        names:
          "张三\n李四\n王五\n赵六\n钱七\n孙八\n周九\n吴十\n郑十一\n陈十二\n林小明\n黄大伟\n刘建国\n杨丽华\n朱志强",
        cities:
          "北京\n上海\n广州\n深圳\n杭州\n南京\n武汉\n成都\n重庆\n西安\n天津\n苏州\n厦门\n青岛\n大连\n哈尔滨\n长沙\n郑州\n沈阳\n济南",
        words:
          "学习\n工作\n生活\n健康\n幸福\n快乐\n成功\n努力\n坚持\n梦想\n希望\n未来\n朋友\n家人\n爱情\n友谊\n责任\n担当\n勇气\n智慧",
        food: "米饭\n面条\n饺子\n包子\n馒头\n油条\n豆浆\n粥\n火锅\n烧烤\n炒菜\n凉菜\n汤\n粉丝\n豆腐\n鸡蛋\n牛肉\n猪肉\n鱼\n虾"
      };

      // 状态
      let sortedItems = [];
      let isDescending = false;

      // 获取拼音（使用 localeCompare 的拼音排序）
      window.getPinyinForSort = function (str) {
        // 提取第一个汉字用于排序
        const firstChar = str.match(/[\u4e00-\u9fa5]/)?.[0] || str[0] || "";
        return firstChar;
      };

      // 获取首字母（A-Z）
      function getInitial(str) {
        const firstChar = str.match(/[\u4e00-\u9fa5]/)?.[0];
        if (!firstChar) {
          const first = str[0]?.toUpperCase();
          return /[A-Z]/.test(first) ? first : "#";
        }

        // 使用 localeCompare 来判断首字母
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < letters.length; i++) {
          const letter = letters[i];
          const nextLetter = letters[i + 1] || "Z" + "Z";
          if (
            firstChar.localeCompare(letter, "zh-CN") >= 0 &&
            firstChar.localeCompare(nextLetter, "zh-CN") < 0
          ) {
            return letter;
          }
        }
        return "#";
      }

      // 简易拼音映射（用于显示）
      const simplePinyinMap = {
        张: "zhāng",
        李: "lǐ",
        王: "wáng",
        赵: "zhào",
        钱: "qián",
        孙: "sūn",
        周: "zhōu",
        吴: "wú",
        郑: "zhèng",
        陈: "chén",
        林: "lín",
        黄: "huáng",
        刘: "liú",
        杨: "yáng",
        朱: "zhū",
        北: "běi",
        上: "shàng",
        广: "guǎng",
        深: "shēn",
        杭: "háng",
        南: "nán",
        武: "wǔ",
        成: "chéng",
        重: "chóng",
        西: "xī",
        天: "tiān",
        苏: "sū",
        厦: "xià",
        青: "qīng",
        大: "dà",
        哈: "hā",
        长: "cháng",
        沈: "shěn",
        济: "jǐ",
        学: "xué",
        工: "gōng",
        生: "shēng",
        健: "jiàn",
        幸: "xìng",
        快: "kuài",
        努: "nǔ",
        坚: "jiān",
        梦: "mèng",
        希: "xī",
        未: "wèi",
        朋: "péng",
        家: "jiā",
        爱: "ài",
        友: "yǒu",
        责: "zé",
        担: "dān",
        勇: "yǒng",
        智: "zhì",
        米: "mǐ",
        面: "miàn",
        饺: "jiǎo",
        包: "bāo",
        馒: "mán",
        油: "yóu",
        豆: "dòu",
        粥: "zhōu",
        火: "huǒ",
        烧: "shāo",
        炒: "chǎo",
        凉: "liáng",
        汤: "tāng",
        粉: "fěn",
        腐: "fǔ",
        鸡: "jī",
        牛: "niú",
        猪: "zhū",
        鱼: "yú",
        虾: "xiā"
      };

      function getDisplayPinyin(str) {
        let result = "";
        for (const char of str) {
          if (simplePinyinMap[char]) {
            result += simplePinyinMap[char] + " ";
          } else if (/[\u4e00-\u9fa5]/.test(char)) {
            result += "? ";
          }
        }
        return result.trim() || "-";
      }

      // 解析输入
      function parseInput() {
        const text = document.getElementById("inputText").value;
        const delimiterType = document.getElementById("delimiter").value;

        let delimiter;
        switch (delimiterType) {
          case "newline":
            delimiter = /\n/;
            break;
          case "comma":
            delimiter = /[,，]/;
            break;
          case "space":
            delimiter = /\s+/;
            break;
          case "semicolon":
            delimiter = /[;；]/;
            break;
          case "custom":
            const custom = document.getElementById("customDelimiter").value;
            delimiter = custom ? new RegExp(custom.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) : /\n/;
            break;
          default:
            delimiter = /\n/;
        }

        const items = text
          .split(delimiter)
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        return items;
      }

      // 排序
      function sortItems() {
        let items = parseInput();

        if (items.length === 0) {
          alert("请输入要排序的内容");
          return;
        }

        // 去重
        if (document.getElementById("removeDuplicates").checked) {
          items = [...new Set(items)];
        }

        // 使用中文拼音排序
        items.sort((a, b) => a.localeCompare(b, "zh-CN"));

        if (isDescending) {
          items.reverse();
        }

        sortedItems = items;
        renderResults();
      }

      // 渲染结果
      function renderResults() {
        const container = document.getElementById("previewList");
        container.replaceChildren();

        const showPinyin = document.getElementById("showPinyin").checked;
        const groupByInitial = document.getElementById("groupByInitial").checked;

        if (sortedItems.length === 0) {
          const p = document.createElement("p");
          p.style.color = "var(--pico-muted-color)";
          p.style.textAlign = "center";
          p.textContent = "暂无排序结果";
          container.appendChild(p);
          return;
        }

        if (groupByInitial) {
          // 按首字母分组
          const groups = {};
          sortedItems.forEach((item) => {
            const initial = getInitial(item);
            if (!groups[initial]) {
              groups[initial] = [];
            }
            groups[initial].push(item);
          });

          const sortedKeys = Object.keys(groups).sort();

          sortedKeys.forEach((key) => {
            const section = document.createElement("div");
            section.className = "group-section";

            const header = document.createElement("div");
            header.className = "group-header";
            header.textContent = key + " (" + groups[key].length + ")";
            section.appendChild(header);

            const itemsDiv = document.createElement("div");
            itemsDiv.className = "group-items";

            groups[key].forEach((item) => {
              const itemDiv = document.createElement("div");
              itemDiv.className = "result-item";

              const textSpan = document.createElement("span");
              textSpan.className = "result-text";
              textSpan.textContent = item;
              itemDiv.appendChild(textSpan);

              if (showPinyin) {
                const pinyinSpan = document.createElement("span");
                pinyinSpan.className = "result-pinyin";
                pinyinSpan.textContent = getDisplayPinyin(item);
                itemDiv.appendChild(pinyinSpan);
              }

              itemsDiv.appendChild(itemDiv);
            });

            section.appendChild(itemsDiv);
            container.appendChild(section);
          });
        } else {
          // 普通列表
          sortedItems.forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "result-item";

            const textSpan = document.createElement("span");
            textSpan.className = "result-text";
            textSpan.textContent = item;
            itemDiv.appendChild(textSpan);

            if (showPinyin) {
              const pinyinSpan = document.createElement("span");
              pinyinSpan.className = "result-pinyin";
              pinyinSpan.textContent = getDisplayPinyin(item);
              itemDiv.appendChild(pinyinSpan);
            }

            container.appendChild(itemDiv);
          });
        }
      }

      // 获取输出文本
      function getOutputText() {
        const format = document.querySelector('input[name="outputFormat"]:checked').value;

        switch (format) {
          case "comma":
            return sortedItems.join(", ");
          case "numbered":
            return sortedItems.map((item, i) => i + 1 + ". " + item).join("\n");
          default:
            return sortedItems.join("\n");
        }
      }

      // 更新统计
      function updateStats() {
        const items = parseInput();
        document.getElementById("itemCount").textContent = items.length;
        document.getElementById("charCount").textContent = items.join("").length;
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
      document.getElementById("sortBtn").addEventListener("click", function () {
        isDescending = false;
        sortItems();
      });

      document.getElementById("reverseBtn").addEventListener("click", function () {
        isDescending = true;
        sortItems();
      });

      document.getElementById("clearBtn").addEventListener("click", function () {
        document.getElementById("inputText").value = "";
        sortedItems = [];
        renderResults();
        updateStats();
      });

      document.getElementById("inputText").addEventListener("input", updateStats);

      document.getElementById("delimiter").addEventListener("change", function () {
        const customLabel = document.getElementById("customDelimiterLabel");
        customLabel.style.display = this.value === "custom" ? "flex" : "none";
        updateStats();
      });

      document.getElementById("showPinyin").addEventListener("change", renderResults);
      document.getElementById("groupByInitial").addEventListener("change", renderResults);
      document.getElementById("removeDuplicates").addEventListener("change", sortItems);

      document.querySelectorAll('input[name="outputFormat"]').forEach(function (radio) {
        radio.addEventListener("change", renderResults);
      });

      document.getElementById("copyBtn").addEventListener("click", function () {
        if (sortedItems.length === 0) {
          alert("没有可复制的内容");
          return;
        }
        navigator.clipboard.writeText(getOutputText()).then(function () {
          alert("已复制到剪贴板");
        });
      });

      document.getElementById("downloadBtn").addEventListener("click", function () {
        if (sortedItems.length === 0) {
          alert("没有可下载的内容");
          return;
        }
        const blob = new Blob([getOutputText()], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sorted-list.txt";
        a.click();
        URL.revokeObjectURL(url);
      });

      // 示例按钮
      document.querySelectorAll("[data-sample]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const sample = this.dataset.sample;
          if (sampleData[sample]) {
            document.getElementById("inputText").value = sampleData[sample];
            document.getElementById("delimiter").value = "newline";
            document.getElementById("customDelimiterLabel").style.display = "none";
            updateStats();
            sortItems();
          }
        });
      });

      // 初始化
      updateStats();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }
    
