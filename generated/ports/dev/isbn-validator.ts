// @ts-nocheck
// Generated from tools/dev/isbn-validator.html
// Source SHA-256: d02800f3f89f9289152cf2b98a497a62ca65be9e22672e618343254c7907255d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ISBN group ranges data (simplified common prefixes)
      var ISBN_GROUPS = {
        0: "英语区",
        1: "英语区",
        2: "法语区",
        3: "德语区",
        4: "日本",
        5: "俄语区",
        7: "中国",
        80: "捷克 / 斯洛伐克",
        81: "印度",
        82: "挪威",
        83: "波兰",
        84: "西班牙",
        85: "巴西",
        86: "前南斯拉夫地区",
        87: "丹麦",
        88: "意大利",
        89: "韩国",
        90: "荷兰 / 比利时（荷语）",
        91: "瑞典",
        92: "国际组织",
        93: "印度",
        94: "荷兰",
        950: "阿根廷",
        951: "芬兰",
        952: "芬兰",
        953: "克罗地亚",
        954: "保加利亚",
        955: "斯里兰卡",
        956: "智利",
        957: "台湾",
        958: "哥伦比亚",
        959: "古巴",
        960: "希腊",
        961: "斯洛文尼亚",
        962: "香港",
        963: "匈牙利",
        964: "伊朗",
        965: "以色列",
        966: "乌克兰",
        967: "马来西亚",
        968: "墨西哥",
        969: "巴基斯坦",
        970: "墨西哥",
        971: "菲律宾",
        972: "葡萄牙",
        973: "罗马尼亚",
        974: "泰国",
        975: "土耳其",
        976: "加勒比社区",
        977: "埃及",
        978: "尼日利亚",
        979: "印度尼西亚",
        980: "委内瑞拉",
        981: "新加坡",
        982: "太平洋南部",
        983: "马来西亚",
        984: "孟加拉国",
        985: "白俄罗斯",
        986: "台湾",
        987: "阿根廷",
        988: "香港",
        989: "葡萄牙",
        9953: "黎巴嫩",
        9954: "摩洛哥",
        9955: "立陶宛",
        9956: "喀麦隆",
        9957: "约旦",
        9958: "波斯尼亚和黑塞哥维那",
        9959: "利比亚",
        9960: "沙特阿拉伯",
        9961: "阿尔及利亚",
        9962: "巴拿马",
        9963: "塞浦路斯",
        9964: "加纳",
        9965: "哈萨克斯坦",
        9966: "肯尼亚",
        9967: "吉尔吉斯斯坦",
        9968: "哥斯达黎加",
        9970: "乌干达",
        9971: "新加坡",
        9972: "秘鲁",
        9973: "突尼斯",
        9974: "乌拉圭",
        9975: "摩尔多瓦",
        9976: "坦桑尼亚",
        9977: "哥斯达黎加",
        9978: "厄瓜多尔",
        9979: "冰岛",
        9980: "巴布亚新几内亚",
        9981: "摩洛哥",
        9982: "赞比亚",
        9983: "冈比亚",
        9984: "拉脱维亚",
        9985: "爱沙尼亚",
        9986: "立陶宛",
        9987: "坦桑尼亚",
        9988: "加纳",
        9989: "北马其顿",
        99901: "巴林",
        99902: "加蓬",
        99903: "毛里求斯",
        99904: "科威特",
        99905: "马里",
        99906: "吉布提",
        99907: "阿曼",
        99908: "布基纳法索",
        99909: "马达加斯加",
        99910: "塞拉利昂",
        99911: "莱索托",
        99912: "博茨瓦纳",
        99913: "安道尔",
        99914: "苏里南",
        99915: "马尔代夫",
        99916: "纳米比亚",
        99917: "马恩岛",
        99918: "法罗群岛",
        99919: "斐济",
        99920: "圣马力诺",
        99921: "卡塔尔",
        99922: "危地马拉",
        99923: "尼加拉瓜",
        99924: "多米尼加共和国",
        99925: "特立尼达和多巴哥",
        99926: "厄立特里亚",
        99927: "斯威士兰",
        99928: "蒙古",
        99929: "拉脱维亚",
        99930: "赤道几内亚",
        99931: "卢森堡",
        99932: "马耳他",
        99933: "阿富汗",
        99934: "布隆迪",
        99935: "圣马力诺",
        99936: "不丹",
        99937: "澳门",
        99938: "斯洛伐克",
        99939: "土库曼斯坦",
        99940: "科摩罗",
        99941: "西班牙（加泰罗尼亚）",
        99942: "埃塞俄比亚",
        99943: "阿塞拜疆",
        99944: "科威特",
        99945: "纳米比亚",
        99946: "尼泊尔",
        99947: "塔吉克斯坦",
        99948: "厄立特里亚",
        99949: "毛里塔尼亚",
        99950: "亚美尼亚",
        99951: "科索沃",
        99952: "马来西亚",
        99953: "巴拉圭",
        99954: "玻利维亚",
        99955: "苏里南",
        99956: "阿拉伯联合酋长国",
        99957: "中非共和国",
        99958: "巴林",
        99959: "利比里亚",
        99960: "赤道几内亚",
        99961: "菲律宾",
        99962: "海地",
        99963: "津巴布韦",
        99964: "越南",
        99965: "贝宁",
        99966: "科威特",
        99967: "巴拉圭",
        99968: "博茨瓦纳",
        99969: "巴林",
        99970: "海地",
        99971: "委内瑞拉",
        99972: "阿富汗",
        99973: "加纳",
        99974: "也门",
        99975: "科摩罗"
      };

      // Normalize: remove dashes, spaces, lowercase X
      function normalize(isbn) {
        return isbn.replace(/[-\s]/g, "").toUpperCase();
      }

      function validateIsbn10(isbn) {
        if (isbn.length !== 10) return false;
        if (!/^\d{9}[\dX]$/.test(isbn)) return false;
        var sum = 0;
        for (var i = 0; i < 9; i++) {
          sum += parseInt(isbn[i], 10) * (10 - i);
        }
        var check = isbn[9] === "X" ? 10 : parseInt(isbn[9], 10);
        sum += check;
        return sum % 11 === 0;
      }

      function validateIsbn13(isbn) {
        if (isbn.length !== 13) return false;
        if (!/^\d{13}$/.test(isbn)) return false;
        var sum = 0;
        for (var i = 0; i < 12; i++) {
          sum += parseInt(isbn[i], 10) * (i % 2 === 0 ? 1 : 3);
        }
        var check = (10 - (sum % 10)) % 10;
        return check === parseInt(isbn[12], 10);
      }

      function isbn10ToIsbn13(isbn10) {
        var base = "978" + isbn10.slice(0, 9);
        var sum = 0;
        for (var i = 0; i < 12; i++) {
          sum += parseInt(base[i], 10) * (i % 2 === 0 ? 1 : 3);
        }
        var check = (10 - (sum % 10)) % 10;
        return base + check;
      }

      function isbn13ToIsbn10(isbn13) {
        // Only valid for 978-prefix
        if (!isbn13.startsWith("978")) return null;
        var base = isbn13.slice(3, 12);
        var sum = 0;
        for (var i = 0; i < 9; i++) {
          sum += parseInt(base[i], 10) * (10 - i);
        }
        var check = (11 - (sum % 11)) % 11;
        return base + (check === 10 ? "X" : String(check));
      }

      function formatIsbn10(isbn) {
        // group-publisher-title-check — approximate formatting
        return (
          isbn.slice(0, 1) + "-" + isbn.slice(1, 4) + "-" + isbn.slice(4, 9) + "-" + isbn.slice(9)
        );
      }

      function formatIsbn13(isbn) {
        // prefix-group-publisher-title-check — approximate
        return (
          isbn.slice(0, 3) +
          "-" +
          isbn.slice(3, 4) +
          "-" +
          isbn.slice(4, 7) +
          "-" +
          isbn.slice(7, 12) +
          "-" +
          isbn.slice(12)
        );
      }

      function getGroupInfo(isbn) {
        // isbn here is the raw group digits (no 978/979 prefix)
        // try longest match first (up to 5 digits)
        for (var len = 5; len >= 1; len--) {
          var prefix = isbn.slice(0, len);
          if (ISBN_GROUPS[prefix]) {
            return { prefix: prefix, region: ISBN_GROUPS[prefix] };
          }
        }
        return null;
      }

      function getIsbn13PrefixLabel(isbn13) {
        var prefix = isbn13.slice(0, 3);
        if (prefix === "978") return "978（Bookland EAN，传统国际书号）";
        if (prefix === "979") return "979（扩展空间，部分分配给国际乐谱局 ISMN）";
        return prefix;
      }

      function calcExpectedCheck10(isbn9) {
        var sum = 0;
        for (var i = 0; i < 9; i++) {
          sum += parseInt(isbn9[i], 10) * (10 - i);
        }
        var c = (11 - (sum % 11)) % 11;
        return c === 10 ? "X" : String(c);
      }

      function calcExpectedCheck13(isbn12) {
        var sum = 0;
        for (var i = 0; i < 12; i++) {
          sum += parseInt(isbn12[i], 10) * (i % 2 === 0 ? 1 : 3);
        }
        return String((10 - (sum % 10)) % 10);
      }

      function showStatus(msg, type) {
        var statusEl = document.getElementById("status");
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function doValidate() {
        var raw = document.getElementById("isbnInput").value.trim();
        if (!raw) {
          showStatus("请输入 ISBN", "error");
          return;
        }
        var isbn = normalize(raw);
        var inputEl = document.getElementById("isbnInput");
        var resultCard = document.getElementById("resultCard");
        var resultBadge = document.getElementById("resultBadge");
        var infoGrid = document.getElementById("infoGrid");
        var convArea = document.getElementById("conversionArea");

        var isIsbn10 = isbn.length === 10;
        var isIsbn13 = isbn.length === 13;

        if (!isIsbn10 && !isIsbn13) {
          inputEl.className = "isbn-input invalid";
          resultCard.className = "result-card show result-invalid";
          resultBadge.textContent =
            "格式错误：长度应为 10 位（ISBN-10）或 13 位（ISBN-13），当前 " + isbn.length + " 位";
          resultBadge.className = "result-badge invalid";
          infoGrid.innerHTML = "";
          convArea.className = "conversion-area";
          showStatus("ISBN 长度不正确", "error");
          return;
        }

        var valid = isIsbn10 ? validateIsbn10(isbn) : validateIsbn13(isbn);

        inputEl.className = "isbn-input " + (valid ? "valid" : "invalid");
        resultCard.className = "result-card show " + (valid ? "result-valid" : "result-invalid");
        resultBadge.textContent = valid
          ? "✓ 有效 ISBN-" + (isIsbn10 ? "10" : "13")
          : "✗ 无效 ISBN-" + (isIsbn10 ? "10" : "13") + "（校验位错误）";
        resultBadge.className = "result-badge " + (valid ? "valid" : "invalid");

        // Build info grid
        var items = [];

        if (isIsbn10) {
          var expectedCheck10 = calcExpectedCheck10(isbn.slice(0, 9));
          items.push({ label: "类型", value: "ISBN-10", accent: false });
          items.push({ label: "规范化", value: isbn, accent: true });
          items.push({ label: "带连字符", value: formatIsbn10(isbn), accent: false });
          items.push({
            label: "校验位",
            value: isbn[9] + "（期望 " + expectedCheck10 + "）",
            accent: false
          });
          var g10 = getGroupInfo(isbn);
          if (g10) {
            items.push({
              label: "登记组（语言/国家）",
              value: g10.prefix + " — " + g10.region,
              accent: false
            });
          }
          items.push({ label: "出版商前缀", value: isbn.slice(0, 7), accent: false });
        } else {
          var prefix3 = isbn.slice(0, 3);
          var groupPart = isbn.slice(3);
          var expectedCheck13 = calcExpectedCheck13(isbn.slice(0, 12));
          items.push({ label: "类型", value: "ISBN-13 / EAN-13", accent: false });
          items.push({ label: "规范化", value: isbn, accent: true });
          items.push({ label: "带连字符", value: formatIsbn13(isbn), accent: false });
          items.push({ label: "EAN 前缀", value: getIsbn13PrefixLabel(isbn), accent: false });
          items.push({
            label: "校验位",
            value: isbn[12] + "（期望 " + expectedCheck13 + "）",
            accent: false
          });
          var g13 = getGroupInfo(groupPart);
          if (g13) {
            items.push({
              label: "登记组（语言/国家）",
              value: g13.prefix + " — " + g13.region,
              accent: false
            });
          }
          items.push({
            label: "出版商前缀",
            value: prefix3 + "-" + isbn.slice(3, 10),
            accent: false
          });
        }

        infoGrid.innerHTML = items
          .map(function (item) {
            return (
              '<div class="info-item">' +
              '<div class="info-label">' +
              item.label +
              "</div>" +
              '<div class="info-value' +
              (item.accent ? " accent" : "") +
              '">' +
              item.value +
              "</div>" +
              "</div>"
            );
          })
          .join("");

        // Conversion
        if (valid) {
          convArea.className = "conversion-area show";
          if (isIsbn10) {
            document.getElementById("convIsbn10").textContent = isbn;
            document.getElementById("convIsbn13").textContent = isbn10ToIsbn13(isbn);
          } else {
            var isbn10result = isbn13ToIsbn10(isbn);
            document.getElementById("convIsbn10").textContent = isbn10result || "仅适用于 978 前缀";
            document.getElementById("convIsbn13").textContent = isbn;
          }
        } else {
          convArea.className = "conversion-area";
        }

        showStatus(valid ? "验证通过" : "校验位不匹配", valid ? "success" : "error");
      }

      function doBatchValidate() {
        var raw = document.getElementById("batchInput").value;
        var lines = raw
          .split("\n")
          .map(function (l) {
            return l.trim();
          })
          .filter(function (l) {
            return l.length > 0;
          });
        var outputEl = document.getElementById("batchOutput");

        if (lines.length === 0) {
          showStatus("请在批量输入框输入 ISBN", "error");
          return;
        }

        var html = "";
        var validCount = 0;
        var invalidCount = 0;

        lines.forEach(function (line) {
          var isbn = normalize(line);
          var isIsbn10 = isbn.length === 10;
          var isIsbn13 = isbn.length === 13;
          var valid = false;
          var msg = "";

          if (!isIsbn10 && !isIsbn13) {
            msg = "长度错误（" + isbn.length + " 位）";
          } else if (isIsbn10) {
            valid = validateIsbn10(isbn);
            msg = valid ? "ISBN-10 有效" : "ISBN-10 校验位错误";
          } else {
            valid = validateIsbn13(isbn);
            msg = valid ? "ISBN-13 有效" : "ISBN-13 校验位错误";
          }

          if (valid) {
            validCount++;
          } else {
            invalidCount++;
          }

          html +=
            '<div class="batch-result-item ' +
            (valid ? "batch-valid" : "batch-invalid") +
            '">' +
            '<span class="batch-icon">' +
            (valid ? "✓" : "✗") +
            "</span>" +
            '<span class="batch-isbn">' +
            line +
            "</span>" +
            '<span class="batch-msg">' +
            msg +
            "</span>" +
            "</div>";
        });

        outputEl.innerHTML = html;
        showStatus(
          "共 " + lines.length + " 个：有效 " + validCount + " 个，无效 " + invalidCount + " 个",
          invalidCount === 0 ? "success" : "error"
        );
      }

      function doCopyResult() {
        var items = document.querySelectorAll(".batch-result-item");
        if (items.length === 0) {
          showStatus("没有可复制的结果", "error");
          return;
        }
        var lines = [];
        items.forEach(function (item) {
          var icon = item.querySelector(".batch-icon").textContent;
          var isbn = item.querySelector(".batch-isbn").textContent;
          var msg = item.querySelector(".batch-msg").textContent;
          lines.push(icon + " " + isbn + " — " + msg);
        });
        navigator.clipboard
          .writeText(lines.join("\n"))
          .then(function () {
            showStatus("结果已复制", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      }

      document.getElementById("btnValidate").onclick = doValidate;

      document.getElementById("btnPaste").onclick = function () {
        navigator.clipboard
          .readText()
          .then(function (text) {
            document.getElementById("isbnInput").value = text.trim();
            showStatus("已粘贴", "success");
          })
          .catch(function () {
            showStatus("无法访问剪贴板", "error");
          });
      };

      document.getElementById("btnClear").onclick = function () {
        document.getElementById("isbnInput").value = "";
        document.getElementById("isbnInput").className = "isbn-input";
        document.getElementById("resultCard").className = "result-card";
        document.getElementById("conversionArea").className = "conversion-area";
        document.getElementById("status").textContent = "";
        document.getElementById("status").className = "status";
      };

      document.getElementById("btnBatchValidate").onclick = doBatchValidate;
      document.getElementById("btnCopyResult").onclick = doCopyResult;

      document.getElementById("isbnInput").addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          doValidate();
        }
      });

      document.getElementById("isbnInput").addEventListener("input", function () {
        this.className = "isbn-input";
        document.getElementById("resultCard").className = "result-card";
        document.getElementById("conversionArea").className = "conversion-area";
      });

      // Load from URL hash
      (function () {
        var hash = location.hash.slice(1);
        if (hash) {
          try {
            document.getElementById("isbnInput").value = decodeURIComponent(hash);
          } catch (e) {}
        }
      })();

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
    
