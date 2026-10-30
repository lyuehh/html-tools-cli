// @ts-nocheck
// Generated from tools/converter/phone-number-formatter.html
// Source SHA-256: 7f61467bd4ba72b19fc3b1e15a6b65864f2ae47294a4f5f474fc9ac0a0e3362a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ── 国家数据库（区号 + 格式规则） ──────────────────────────────────────
      const COUNTRIES = [
        {
          code: "CN",
          dialCode: "86",
          name: "中国",
          flag: "🇨🇳",
          localFmt: function (n) {
            return n.slice(0, 3) + " " + n.slice(3, 7) + " " + n.slice(7);
          }
        },
        {
          code: "US",
          dialCode: "1",
          name: "美国",
          flag: "🇺🇸",
          localFmt: function (n) {
            return "(" + n.slice(0, 3) + ") " + n.slice(3, 6) + "-" + n.slice(6);
          }
        },
        {
          code: "CA",
          dialCode: "1",
          name: "加拿大",
          flag: "🇨🇦",
          localFmt: function (n) {
            return "(" + n.slice(0, 3) + ") " + n.slice(3, 6) + "-" + n.slice(6);
          }
        },
        {
          code: "GB",
          dialCode: "44",
          name: "英国",
          flag: "🇬🇧",
          localFmt: function (n) {
            return n.length === 10
              ? n.slice(0, 4) + " " + n.slice(4, 7) + " " + n.slice(7)
              : n.slice(0, 3) + " " + n.slice(3, 7) + " " + n.slice(7);
          }
        },
        {
          code: "JP",
          dialCode: "81",
          name: "日本",
          flag: "🇯🇵",
          localFmt: function (n) {
            return "0" + n.slice(0, 2) + "-" + n.slice(2, 6) + "-" + n.slice(6);
          }
        },
        {
          code: "KR",
          dialCode: "82",
          name: "韩国",
          flag: "🇰🇷",
          localFmt: function (n) {
            return "0" + n.slice(0, 2) + "-" + n.slice(2, 6) + "-" + n.slice(6);
          }
        },
        {
          code: "DE",
          dialCode: "49",
          name: "德国",
          flag: "🇩🇪",
          localFmt: function (n) {
            return "0" + n.slice(0, 3) + " " + n.slice(3);
          }
        },
        {
          code: "FR",
          dialCode: "33",
          name: "法国",
          flag: "🇫🇷",
          localFmt: function (n) {
            var d = "0" + n;
            var parts = [];
            for (var i = 0; i < d.length; i += 2) {
              parts.push(d.slice(i, i + 2));
            }
            return parts.join(" ");
          }
        },
        {
          code: "AU",
          dialCode: "61",
          name: "澳大利亚",
          flag: "🇦🇺",
          localFmt: function (n) {
            return n.startsWith("4")
              ? "04" + n.slice(1, 4) + " " + n.slice(4, 7) + " " + n.slice(7)
              : "(0" + n[0] + ") " + n.slice(1, 5) + " " + n.slice(5);
          }
        },
        {
          code: "IN",
          dialCode: "91",
          name: "印度",
          flag: "🇮🇳",
          localFmt: function (n) {
            return n.slice(0, 5) + " " + n.slice(5);
          }
        },
        {
          code: "BR",
          dialCode: "55",
          name: "巴西",
          flag: "🇧🇷",
          localFmt: function (n) {
            return n.length === 11
              ? "(" + n.slice(0, 2) + ") " + n.slice(2, 7) + "-" + n.slice(7)
              : "(" + n.slice(0, 2) + ") " + n.slice(2, 6) + "-" + n.slice(6);
          }
        },
        {
          code: "RU",
          dialCode: "7",
          name: "俄罗斯",
          flag: "🇷🇺",
          localFmt: function (n) {
            return (
              "8 (" + n.slice(0, 3) + ") " + n.slice(3, 6) + "-" + n.slice(6, 8) + "-" + n.slice(8)
            );
          }
        },
        {
          code: "SG",
          dialCode: "65",
          name: "新加坡",
          flag: "🇸🇬",
          localFmt: function (n) {
            return n.slice(0, 4) + " " + n.slice(4);
          }
        },
        {
          code: "HK",
          dialCode: "852",
          name: "香港",
          flag: "🇭🇰",
          localFmt: function (n) {
            return n.slice(0, 4) + " " + n.slice(4);
          }
        },
        {
          code: "TW",
          dialCode: "886",
          name: "台湾",
          flag: "🇹🇼",
          localFmt: function (n) {
            return n.slice(0, 4) + "-" + n.slice(4);
          }
        },
        {
          code: "MX",
          dialCode: "52",
          name: "墨西哥",
          flag: "🇲🇽",
          localFmt: function (n) {
            return n.slice(0, 3) + " " + n.slice(3, 6) + " " + n.slice(6);
          }
        },
        {
          code: "IT",
          dialCode: "39",
          name: "意大利",
          flag: "🇮🇹",
          localFmt: function (n) {
            return n.slice(0, 3) + " " + n.slice(3);
          }
        },
        {
          code: "ES",
          dialCode: "34",
          name: "西班牙",
          flag: "🇪🇸",
          localFmt: function (n) {
            return n.slice(0, 3) + " " + n.slice(3, 6) + " " + n.slice(6);
          }
        },
        {
          code: "NL",
          dialCode: "31",
          name: "荷兰",
          flag: "🇳🇱",
          localFmt: function (n) {
            return "0" + n.slice(0, 2) + " " + n.slice(2, 6) + " " + n.slice(6);
          }
        },
        {
          code: "SE",
          dialCode: "46",
          name: "瑞典",
          flag: "🇸🇪",
          localFmt: function (n) {
            return "0" + n.slice(0, 2) + "-" + n.slice(2);
          }
        },
        {
          code: "NO",
          dialCode: "47",
          name: "挪威",
          flag: "🇳🇴",
          localFmt: function (n) {
            return n.slice(0, 3) + " " + n.slice(3, 5) + " " + n.slice(5);
          }
        },
        {
          code: "CH",
          dialCode: "41",
          name: "瑞士",
          flag: "🇨🇭",
          localFmt: function (n) {
            return "0" + n.slice(0, 2) + " " + n.slice(2, 5) + " " + n.slice(5);
          }
        },
        {
          code: "PL",
          dialCode: "48",
          name: "波兰",
          flag: "🇵🇱",
          localFmt: function (n) {
            return n.slice(0, 3) + " " + n.slice(3, 6) + " " + n.slice(6);
          }
        },
        {
          code: "TR",
          dialCode: "90",
          name: "土耳其",
          flag: "🇹🇷",
          localFmt: function (n) {
            return "0" + n.slice(0, 3) + " " + n.slice(3, 6) + " " + n.slice(6);
          }
        },
        {
          code: "ZA",
          dialCode: "27",
          name: "南非",
          flag: "🇿🇦",
          localFmt: function (n) {
            return "0" + n.slice(0, 2) + " " + n.slice(2, 5) + " " + n.slice(5);
          }
        },
        {
          code: "AE",
          dialCode: "971",
          name: "阿联酋",
          flag: "🇦🇪",
          localFmt: function (n) {
            return "05" + n.slice(1, 3) + "-" + n.slice(3, 6) + "-" + n.slice(6);
          }
        },
        {
          code: "SA",
          dialCode: "966",
          name: "沙特阿拉伯",
          flag: "🇸🇦",
          localFmt: function (n) {
            return "05" + n.slice(1, 3) + "-" + n.slice(3, 6) + "-" + n.slice(6);
          }
        },
        {
          code: "MY",
          dialCode: "60",
          name: "马来西亚",
          flag: "🇲🇾",
          localFmt: function (n) {
            return "0" + n.slice(0, 2) + "-" + n.slice(2);
          }
        },
        {
          code: "PH",
          dialCode: "63",
          name: "菲律宾",
          flag: "🇵🇭",
          localFmt: function (n) {
            return "0" + n.slice(0, 3) + " " + n.slice(3, 7) + " " + n.slice(7);
          }
        },
        {
          code: "TH",
          dialCode: "66",
          name: "泰国",
          flag: "🇹🇭",
          localFmt: function (n) {
            return "0" + n.slice(0, 2) + "-" + n.slice(2, 5) + "-" + n.slice(5);
          }
        },
        {
          code: "VN",
          dialCode: "84",
          name: "越南",
          flag: "🇻🇳",
          localFmt: function (n) {
            return "0" + n.slice(0, 2) + " " + n.slice(2, 5) + " " + n.slice(5);
          }
        },
        {
          code: "ID",
          dialCode: "62",
          name: "印度尼西亚",
          flag: "🇮🇩",
          localFmt: function (n) {
            return "0" + n.slice(0, 3) + "-" + n.slice(3);
          }
        },
        {
          code: "NG",
          dialCode: "234",
          name: "尼日利亚",
          flag: "🇳🇬",
          localFmt: function (n) {
            return "0" + n.slice(0, 3) + " " + n.slice(3, 6) + " " + n.slice(6);
          }
        },
        {
          code: "EG",
          dialCode: "20",
          name: "埃及",
          flag: "🇪🇬",
          localFmt: function (n) {
            return "0" + n.slice(0, 2) + " " + n.slice(2, 6) + " " + n.slice(6);
          }
        },
        {
          code: "AR",
          dialCode: "54",
          name: "阿根廷",
          flag: "🇦🇷",
          localFmt: function (n) {
            return "0" + n.slice(0, 2) + " " + n.slice(2);
          }
        },
        {
          code: "CO",
          dialCode: "57",
          name: "哥伦比亚",
          flag: "🇨🇴",
          localFmt: function (n) {
            return n.slice(0, 3) + " " + n.slice(3, 6) + " " + n.slice(6);
          }
        }
      ];

      // 按区号长度降序排列（优先匹配更长的区号，如 852 > 86）
      var COUNTRIES_SORTED = COUNTRIES.slice().sort(function (a, b) {
        return b.dialCode.length - a.dialCode.length || a.dialCode.localeCompare(b.dialCode);
      });

      // 区号 → 国家映射
      var DIAL_MAP = {};
      for (var _i = 0; _i < COUNTRIES_SORTED.length; _i++) {
        var _c = COUNTRIES_SORTED[_i];
        if (!DIAL_MAP[_c.dialCode]) DIAL_MAP[_c.dialCode] = _c;
      }
      // 确保 +1 优先 US
      DIAL_MAP["1"] = COUNTRIES.find(function (c) {
        return c.code === "US";
      });

      var COUNTRY_MAP = {};
      for (var _j = 0; _j < COUNTRIES.length; _j++) {
        COUNTRY_MAP[COUNTRIES[_j].code] = COUNTRIES[_j];
      }

      // ── 解析核心逻辑 ──────────────────────────────────────────────────────
      function stripToDigitsAndPlus(s) {
        return s.replace(/[^\d+]/g, "");
      }

      /**
       * 解析单个电话号码
       */
      function parsePhone(raw, defaultCountryCode) {
        var trimmed = raw.trim();
        if (!trimmed) {
          return { valid: false, raw: raw, e164: "", intl: "", local: "", country: null };
        }
        var cleaned = stripToDigitsAndPlus(trimmed);
        if (!cleaned) {
          return { valid: false, raw: raw, e164: "", intl: "", local: "", country: null };
        }

        var national = "";
        var country = null;

        if (cleaned.charAt(0) === "+") {
          // 有 + 前缀 → 解析区号
          var digits = cleaned.slice(1);
          for (var i = 0; i < COUNTRIES_SORTED.length; i++) {
            var cEntry = COUNTRIES_SORTED[i];
            if (digits.startsWith(cEntry.dialCode)) {
              var preferred = DIAL_MAP[cEntry.dialCode] || cEntry;
              country = preferred;
              national = digits.slice(cEntry.dialCode.length);
              // 去掉本地前缀 0
              if (national.charAt(0) === "0") national = national.slice(1);
              break;
            }
          }
          if (!country) {
            return { valid: false, raw: raw, e164: "", intl: "", local: "", country: null };
          }
        } else {
          // 无 + 前缀 → 使用默认国家
          country = COUNTRY_MAP[defaultCountryCode] || COUNTRY_MAP["CN"];
          // 去掉本地拨号前缀 0
          national = cleaned.charAt(0) === "0" ? cleaned.slice(1) : cleaned;
        }

        if (national.length < 6 || national.length > 13 || !/^\d+$/.test(national)) {
          return { valid: false, raw: raw, e164: "", intl: "", local: "", country: country };
        }

        var e164 = "+" + country.dialCode + national;
        var intl = "+" + country.dialCode + " " + national;
        var local = national;
        try {
          local = country.localFmt(national);
        } catch (_err) {
          local = national;
        }

        return {
          valid: true,
          raw: raw,
          e164: e164,
          intl: intl,
          local: local,
          country: country,
          national: national
        };
      }

      // ── UI 帮助函数 ───────────────────────────────────────────────────────
      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function makeCopyButton(getValue) {
        var btn = document.createElement("button");
        btn.className = "copy-mini-btn";
        btn.title = "复制";
        btn.setAttribute("aria-label", "复制");
        btn.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        btn.addEventListener("click", function () {
          var text = getValue();
          navigator.clipboard.writeText(text).then(
            function () {
              showStatus("已复制", "success");
            },
            function () {
              showStatus("复制失败", "error");
            }
          );
        });
        return btn;
      }

      function renderSingleResult(result) {
        var singleResult = document.getElementById("singleResult");
        var countryFlag = document.getElementById("countryFlag");
        var countryName = document.getElementById("countryName");
        var resultCards = document.getElementById("resultCards");

        if (!result.valid) {
          singleResult.style.display = "none";
          return;
        }

        singleResult.style.display = "block";
        countryFlag.textContent = result.country ? result.country.flag : "🌐";
        countryName.textContent = result.country
          ? result.country.name + " (+" + result.country.dialCode + ")"
          : "未知";

        var formats = [
          { label: "E.164（标准）", value: result.e164 },
          { label: "国际格式", value: result.intl },
          { label: "本地格式", value: result.local },
          { label: "纯数字", value: result.e164.slice(1) }
        ];

        resultCards.innerHTML = "";
        for (var fi = 0; fi < formats.length; fi++) {
          (function (fmt) {
            var card = document.createElement("div");
            card.className = "result-card valid";

            var label = document.createElement("div");
            label.className = "result-card-label";
            label.textContent = fmt.label;

            var valueRow = document.createElement("div");
            valueRow.className = "result-card-value";

            var span = document.createElement("span");
            span.textContent = fmt.value;

            var copyBtn = makeCopyButton(function () {
              return fmt.value;
            });

            valueRow.appendChild(span);
            valueRow.appendChild(copyBtn);
            card.appendChild(label);
            card.appendChild(valueRow);
            resultCards.appendChild(card);
          })(formats[fi]);
        }
      }

      function formatSingle() {
        var raw = document.getElementById("singleInput").value.trim();
        if (!raw) {
          showStatus("请输入电话号码", "error");
          document.getElementById("singleResult").style.display = "none";
          return;
        }
        var defaultCC = document.getElementById("defaultCountry").value;
        var result = parsePhone(raw, defaultCC);
        renderSingleResult(result);
        if (result.valid) {
          showStatus("格式化成功", "success");
        } else {
          showStatus("无法识别的号码格式", "error");
        }
      }

      function formatBatch() {
        var text = document.getElementById("batchInput").value;
        var lines = text.split("\n").filter(function (l) {
          return l.trim();
        });
        var defaultCC = document.getElementById("defaultCountry").value;
        var output = document.getElementById("batchOutput");
        var statsEl = document.getElementById("stats");

        if (!lines.length) {
          output.innerHTML = '<div class="empty-msg">在左侧输入号码后点击「批量格式化」</div>';
          statsEl.classList.remove("show");
          showStatus("没有输入内容", "error");
          return;
        }

        var validCount = 0;
        var invalidCount = 0;
        output.innerHTML = "";

        for (var li = 0; li < lines.length; li++) {
          (function (line, idx) {
            var result = parsePhone(line, defaultCC);
            var row = document.createElement("div");
            row.className = "batch-row " + (result.valid ? "batch-valid" : "batch-invalid");

            var numSpan = document.createElement("span");
            numSpan.className = "batch-row-num";
            numSpan.textContent = idx + 1;

            var rawSpan = document.createElement("span");
            rawSpan.className = "batch-row-raw";
            var lineText = line.trim();
            rawSpan.textContent = lineText.slice(0, 20) + (lineText.length > 20 ? "…" : "");
            rawSpan.title = lineText;

            var e164Span = document.createElement("span");
            e164Span.className = "batch-row-e164";

            var intlSpan = document.createElement("span");
            intlSpan.className = "batch-row-intl";

            var countrySpan = document.createElement("span");
            countrySpan.className = "batch-row-country";

            if (result.valid) {
              e164Span.textContent = result.e164;
              intlSpan.textContent = result.local;
              countrySpan.textContent = result.country
                ? result.country.flag + " " + result.country.name
                : "";
              validCount++;
            } else {
              e164Span.textContent = "无效";
              intlSpan.textContent = "";
              countrySpan.textContent = result.country ? result.country.flag : "";
              invalidCount++;
            }

            row.appendChild(numSpan);
            row.appendChild(rawSpan);
            row.appendChild(e164Span);
            row.appendChild(intlSpan);
            row.appendChild(countrySpan);
            output.appendChild(row);
          })(lines[li], li);
        }

        document.getElementById("statTotal").textContent = lines.length;
        document.getElementById("statValid").textContent = validCount;
        document.getElementById("statInvalid").textContent = invalidCount;
        statsEl.classList.add("show");
        showStatus(
          "批量格式化完成：" + validCount + " 个有效，" + invalidCount + " 个无效",
          validCount > 0 ? "success" : "error"
        );
      }

      // ── 事件绑定 ─────────────────────────────────────────────────────────
      document.getElementById("btnFormat").onclick = formatSingle;
      document.getElementById("btnBatchFormat").onclick = formatBatch;

      document.getElementById("btnBatchCopyE164").onclick = function () {
        var rows = document.querySelectorAll(".batch-row.batch-valid .batch-row-e164");
        if (!rows.length) {
          showStatus("没有有效号码可复制", "error");
          return;
        }
        var list = [];
        for (var ri = 0; ri < rows.length; ri++) {
          list.push(rows[ri].textContent);
        }
        navigator.clipboard.writeText(list.join("\n")).then(
          function () {
            showStatus("已复制 " + rows.length + " 个 E.164 号码", "success");
          },
          function () {
            showStatus("复制失败", "error");
          }
        );
      };

      document.getElementById("btnBatchClear").onclick = function () {
        document.getElementById("batchInput").value = "";
        document.getElementById("batchOutput").innerHTML =
          '<div class="empty-msg">在左侧输入号码后点击「批量格式化」</div>';
        document.getElementById("stats").classList.remove("show");
        document.getElementById("status").textContent = "";
        document.getElementById("status").className = "status";
      };

      document.getElementById("singleInput").addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          formatSingle();
        }
      });

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          formatBatch();
        }
      });

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
    
