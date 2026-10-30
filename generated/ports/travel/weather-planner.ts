// @ts-nocheck
// Generated from tools/travel/weather-planner.html
// Source SHA-256: bbca5fd3f11153826b73fcd12c4d97c9467ba5fedfda4847fbd8097ce6f48582
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var monthNames = [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ];

      var destinations = {
        tokyo: {
          name: "东京",
          country: "日本",
          climate: "温带季风气候",
          bestMonths: [2, 3, 4, 9, 10],
          goodMonths: [5, 8, 11],
          weather: [
            { high: 10, low: 2, rain: 52, condition: "晴冷" },
            { high: 11, low: 2, rain: 56, condition: "晴冷" },
            { high: 14, low: 5, rain: 117, condition: "多云" },
            { high: 19, low: 10, rain: 125, condition: "温暖" },
            { high: 23, low: 15, rain: 138, condition: "舒适" },
            { high: 26, low: 19, rain: 168, condition: "梅雨" },
            { high: 30, low: 23, rain: 154, condition: "炎热" },
            { high: 31, low: 24, rain: 168, condition: "炎热" },
            { high: 27, low: 21, rain: 210, condition: "多雨" },
            { high: 22, low: 15, rain: 198, condition: "舒适" },
            { high: 17, low: 10, rain: 93, condition: "凉爽" },
            { high: 12, low: 4, rain: 51, condition: "晴冷" }
          ],
          tips: "春季赏樱(3-4月)、秋季赏枫(11月)是最佳时间",
          packing: ["雨伞", "轻便外套", "舒适步行鞋"]
        },
        bangkok: {
          name: "曼谷",
          country: "泰国",
          climate: "热带季风气候",
          bestMonths: [10, 11, 0, 1, 2],
          goodMonths: [3, 9],
          weather: [
            { high: 32, low: 21, rain: 9, condition: "晴热" },
            { high: 33, low: 23, rain: 30, condition: "晴热" },
            { high: 34, low: 25, rain: 29, condition: "酷热" },
            { high: 35, low: 26, rain: 65, condition: "酷热" },
            { high: 34, low: 26, rain: 220, condition: "雨季" },
            { high: 33, low: 25, rain: 152, condition: "雨季" },
            { high: 32, low: 25, rain: 155, condition: "雨季" },
            { high: 32, low: 25, rain: 197, condition: "雨季" },
            { high: 32, low: 24, rain: 344, condition: "多雨" },
            { high: 32, low: 24, rain: 242, condition: "多雨" },
            { high: 32, low: 23, rain: 48, condition: "凉季" },
            { high: 31, low: 21, rain: 10, condition: "凉季" }
          ],
          tips: "11月至2月是凉季，天气最舒适；4-5月最热；6-10月为雨季",
          packing: ["防晒霜", "太阳镜", "雨具", "轻薄衣物"]
        },
        paris: {
          name: "巴黎",
          country: "法国",
          climate: "温带海洋性气候",
          bestMonths: [4, 5, 8, 9],
          goodMonths: [3, 6, 10],
          weather: [
            { high: 7, low: 2, rain: 51, condition: "阴冷" },
            { high: 8, low: 2, rain: 41, condition: "阴冷" },
            { high: 12, low: 4, rain: 48, condition: "多云" },
            { high: 16, low: 7, rain: 52, condition: "温和" },
            { high: 20, low: 10, rain: 63, condition: "舒适" },
            { high: 23, low: 14, rain: 50, condition: "温暖" },
            { high: 25, low: 15, rain: 63, condition: "温暖" },
            { high: 25, low: 15, rain: 43, condition: "温暖" },
            { high: 21, low: 12, rain: 55, condition: "舒适" },
            { high: 16, low: 9, rain: 62, condition: "凉爽" },
            { high: 11, low: 5, rain: 51, condition: "阴冷" },
            { high: 8, low: 3, rain: 58, condition: "阴冷" }
          ],
          tips: "5-6月和9-10月天气最好，游客也相对较少",
          packing: ["风衣", "围巾", "舒适步行鞋", "雨伞"]
        },
        new_york: {
          name: "纽约",
          country: "美国",
          climate: "温带大陆性气候",
          bestMonths: [4, 5, 8, 9],
          goodMonths: [3, 6, 10],
          weather: [
            { high: 4, low: -3, rain: 94, condition: "严寒" },
            { high: 5, low: -2, rain: 79, condition: "严寒" },
            { high: 10, low: 2, rain: 107, condition: "凉爽" },
            { high: 17, low: 7, rain: 114, condition: "温和" },
            { high: 22, low: 12, rain: 106, condition: "舒适" },
            { high: 27, low: 18, rain: 112, condition: "温暖" },
            { high: 30, low: 21, rain: 117, condition: "炎热" },
            { high: 29, low: 20, rain: 107, condition: "炎热" },
            { high: 25, low: 16, rain: 109, condition: "舒适" },
            { high: 18, low: 10, rain: 112, condition: "凉爽" },
            { high: 12, low: 5, rain: 102, condition: "凉爽" },
            { high: 6, low: 0, rain: 102, condition: "寒冷" }
          ],
          tips: "4-6月春季和9-11月秋季最适合旅游，冬季可看雪景和节日氛围",
          packing: ["分层穿搭", "舒适步行鞋", "防寒外套(冬季)"]
        },
        sydney: {
          name: "悉尼",
          country: "澳大利亚",
          climate: "温带海洋性气候(南半球)",
          bestMonths: [2, 3, 9, 10, 11],
          goodMonths: [0, 1, 4, 8],
          weather: [
            { high: 26, low: 19, rain: 102, condition: "夏季" },
            { high: 26, low: 19, rain: 118, condition: "夏季" },
            { high: 25, low: 18, rain: 131, condition: "秋季" },
            { high: 22, low: 15, rain: 127, condition: "秋季" },
            { high: 19, low: 12, rain: 123, condition: "秋季" },
            { high: 17, low: 9, rain: 132, condition: "冬季" },
            { high: 16, low: 8, rain: 97, condition: "冬季" },
            { high: 18, low: 9, rain: 80, condition: "冬季" },
            { high: 20, low: 11, rain: 69, condition: "春季" },
            { high: 22, low: 14, rain: 77, condition: "春季" },
            { high: 24, low: 16, rain: 83, condition: "春季" },
            { high: 25, low: 18, rain: 78, condition: "夏季" }
          ],
          tips: "南半球季节与北半球相反，9-11月(春季)和3-5月(秋季)最舒适",
          packing: ["防晒霜", "泳衣", "轻便衣物", "太阳镜"]
        },
        dubai: {
          name: "迪拜",
          country: "阿联酋",
          climate: "热带沙漠气候",
          bestMonths: [10, 11, 0, 1, 2],
          goodMonths: [3, 9],
          weather: [
            { high: 24, low: 14, rain: 11, condition: "温暖" },
            { high: 25, low: 15, rain: 36, condition: "温暖" },
            { high: 29, low: 18, rain: 22, condition: "热" },
            { high: 33, low: 21, rain: 8, condition: "炎热" },
            { high: 38, low: 25, rain: 1, condition: "酷热" },
            { high: 40, low: 28, rain: 0, condition: "酷热" },
            { high: 41, low: 30, rain: 0, condition: "酷热" },
            { high: 41, low: 30, rain: 0, condition: "酷热" },
            { high: 39, low: 27, rain: 0, condition: "酷热" },
            { high: 35, low: 23, rain: 1, condition: "热" },
            { high: 30, low: 19, rain: 3, condition: "温暖" },
            { high: 26, low: 16, rain: 16, condition: "温暖" }
          ],
          tips: "11月至3月是最佳旅行时间，夏季(6-9月)极其炎热，不建议户外活动",
          packing: ["防晒霜", "太阳镜", "轻薄长袖", "帽子"]
        },
        london: {
          name: "伦敦",
          country: "英国",
          climate: "温带海洋性气候",
          bestMonths: [5, 6, 7, 8],
          goodMonths: [4, 9],
          weather: [
            { high: 8, low: 2, rain: 55, condition: "阴冷" },
            { high: 8, low: 2, rain: 40, condition: "阴冷" },
            { high: 11, low: 4, rain: 42, condition: "多云" },
            { high: 14, low: 6, rain: 43, condition: "多云" },
            { high: 18, low: 9, rain: 49, condition: "温和" },
            { high: 21, low: 12, rain: 45, condition: "温暖" },
            { high: 24, low: 14, rain: 45, condition: "温暖" },
            { high: 23, low: 14, rain: 50, condition: "温暖" },
            { high: 20, low: 11, rain: 49, condition: "舒适" },
            { high: 15, low: 8, rain: 69, condition: "凉爽" },
            { high: 11, low: 5, rain: 59, condition: "阴冷" },
            { high: 8, low: 3, rain: 55, condition: "阴冷" }
          ],
          tips: "6-8月是夏季最温暖的时候，但随时可能下雨，记得带伞",
          packing: ["雨伞", "防水外套", "分层穿搭", "舒适步行鞋"]
        },
        singapore: {
          name: "新加坡",
          country: "新加坡",
          climate: "热带雨林气候",
          bestMonths: [1, 2, 6, 7, 8],
          goodMonths: [3, 4, 5, 9],
          weather: [
            { high: 30, low: 24, rain: 243, condition: "多雨" },
            { high: 31, low: 24, rain: 162, condition: "较少雨" },
            { high: 32, low: 25, rain: 185, condition: "多雨" },
            { high: 32, low: 25, rain: 178, condition: "多雨" },
            { high: 32, low: 25, rain: 171, condition: "多雨" },
            { high: 31, low: 25, rain: 162, condition: "较少雨" },
            { high: 31, low: 25, rain: 159, condition: "较少雨" },
            { high: 31, low: 25, rain: 176, condition: "较少雨" },
            { high: 31, low: 24, rain: 178, condition: "多雨" },
            { high: 31, low: 24, rain: 193, condition: "多雨" },
            { high: 31, low: 24, rain: 256, condition: "多雨" },
            { high: 30, low: 24, rain: 269, condition: "多雨" }
          ],
          tips: "全年高温多雨，2月和6-8月相对干燥，下午常有雷阵雨",
          packing: ["防晒霜", "雨伞", "轻薄透气衣物", "太阳镜"]
        },
        bali: {
          name: "巴厘岛",
          country: "印度尼西亚",
          climate: "热带季风气候",
          bestMonths: [3, 4, 5, 6, 7, 8, 9],
          goodMonths: [2, 10],
          weather: [
            { high: 30, low: 24, rain: 345, condition: "雨季" },
            { high: 30, low: 24, rain: 274, condition: "雨季" },
            { high: 30, low: 24, rain: 234, condition: "过渡" },
            { high: 31, low: 24, rain: 88, condition: "旱季" },
            { high: 30, low: 24, rain: 93, condition: "旱季" },
            { high: 29, low: 23, rain: 53, condition: "旱季" },
            { high: 28, low: 23, rain: 55, condition: "旱季" },
            { high: 29, low: 23, rain: 25, condition: "旱季" },
            { high: 29, low: 23, rain: 47, condition: "旱季" },
            { high: 30, low: 24, rain: 63, condition: "过渡" },
            { high: 30, low: 24, rain: 179, condition: "雨季" },
            { high: 30, low: 24, rain: 276, condition: "雨季" }
          ],
          tips: "4-10月是旱季，天气晴朗适合海滩和户外活动",
          packing: ["防晒霜", "泳衣", "轻便衣物", "驱蚊液"]
        },
        rome: {
          name: "罗马",
          country: "意大利",
          climate: "地中海气候",
          bestMonths: [3, 4, 5, 9, 10],
          goodMonths: [6, 8, 11],
          weather: [
            { high: 12, low: 3, rain: 67, condition: "阴冷" },
            { high: 13, low: 4, rain: 73, condition: "阴冷" },
            { high: 16, low: 6, rain: 68, condition: "温和" },
            { high: 19, low: 9, rain: 65, condition: "舒适" },
            { high: 24, low: 13, rain: 48, condition: "舒适" },
            { high: 28, low: 17, rain: 34, condition: "温暖" },
            { high: 31, low: 19, rain: 19, condition: "炎热" },
            { high: 31, low: 19, rain: 36, condition: "炎热" },
            { high: 27, low: 16, rain: 73, condition: "舒适" },
            { high: 22, low: 12, rain: 98, condition: "凉爽" },
            { high: 16, low: 8, rain: 115, condition: "多雨" },
            { high: 13, low: 5, rain: 93, condition: "阴冷" }
          ],
          tips: "4-5月和9-10月天气宜人，游客较少；7-8月炎热且拥挤",
          packing: ["太阳镜", "舒适步行鞋", "轻便外套", "遮阳帽"]
        },
        maldives: {
          name: "马尔代夫",
          country: "马尔代夫",
          climate: "热带季风气候",
          bestMonths: [0, 1, 2, 3],
          goodMonths: [4, 11],
          weather: [
            { high: 30, low: 26, rain: 114, condition: "旱季" },
            { high: 31, low: 26, rain: 38, condition: "旱季" },
            { high: 31, low: 27, rain: 74, condition: "旱季" },
            { high: 32, low: 27, rain: 123, condition: "过渡" },
            { high: 31, low: 27, rain: 219, condition: "雨季" },
            { high: 31, low: 26, rain: 167, condition: "雨季" },
            { high: 30, low: 26, rain: 150, condition: "雨季" },
            { high: 30, low: 26, rain: 176, condition: "雨季" },
            { high: 30, low: 26, rain: 199, condition: "雨季" },
            { high: 30, low: 26, rain: 194, condition: "雨季" },
            { high: 30, low: 26, rain: 231, condition: "雨季" },
            { high: 30, low: 26, rain: 217, condition: "过渡" }
          ],
          tips: "12月至4月是旱季，海水清澈适合浮潜和潜水",
          packing: ["防晒霜", "泳衣", "浮潜装备", "轻薄衣物"]
        }
      };

      var selectedMonth = new Date().getMonth();

      function init() {
        var select = document.getElementById("destination");
        select.textContent = "";

        var defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "请选择目的地...";
        select.appendChild(defaultOption);

        Object.keys(destinations).forEach(function (key) {
          var dest = destinations[key];
          var option = document.createElement("option");
          option.value = key;
          option.textContent = dest.name + " - " + dest.country;
          select.appendChild(option);
        });

        document.getElementById("month").value = selectedMonth;
        loadState();
      }

      function showWeather() {
        var destId = document.getElementById("destination").value;
        selectedMonth = parseInt(document.getElementById("month").value);

        if (!destId) {
          document.getElementById("weatherDisplay").classList.remove("active");
          return;
        }

        var dest = destinations[destId];
        var monthData = dest.weather[selectedMonth];

        document.getElementById("weatherTitle").textContent =
          "🌤️ " + dest.name + " - " + monthNames[selectedMonth] + "天气";

        renderWeatherSummary(dest, monthData);
        renderMonthGrid(dest);
        renderRecommendation(dest, selectedMonth);

        document.getElementById("weatherDisplay").classList.add("active");
        saveState();
      }

      function renderWeatherSummary(dest, monthData) {
        var container = document.getElementById("weatherSummary");
        container.textContent = "";

        var stats = [
          { icon: "🌡️", value: monthData.high + "°C", label: "最高温度" },
          { icon: "❄️", value: monthData.low + "°C", label: "最低温度" },
          { icon: "🌧️", value: monthData.rain + "mm", label: "月降水量" },
          {
            icon: getWeatherIcon(monthData.condition),
            value: monthData.condition,
            label: "天气状况"
          }
        ];

        stats.forEach(function (stat) {
          var div = document.createElement("div");
          div.className = "weather-stat";

          var icon = document.createElement("div");
          icon.className = "weather-stat-icon";
          icon.textContent = stat.icon;

          var value = document.createElement("div");
          value.className = "weather-stat-value";
          value.textContent = stat.value;

          var label = document.createElement("div");
          label.className = "weather-stat-label";
          label.textContent = stat.label;

          div.appendChild(icon);
          div.appendChild(value);
          div.appendChild(label);
          container.appendChild(div);
        });
      }

      function renderMonthGrid(dest) {
        var container = document.getElementById("monthGrid");
        container.textContent = "";

        for (var i = 0; i < 12; i++) {
          var monthData = dest.weather[i];
          var isBest = dest.bestMonths.indexOf(i) !== -1;
          var isGood = dest.goodMonths.indexOf(i) !== -1;
          var isSelected = i === selectedMonth;

          var card = document.createElement("div");
          card.className = "month-card";
          if (isBest) card.className += " best";
          else if (isGood) card.className += " good";
          if (isSelected) card.className += " selected";
          card.onclick = (function (month) {
            return function () {
              document.getElementById("month").value = month;
              showWeather();
            };
          })(i);

          var icon = document.createElement("div");
          icon.className = "month-icon";
          icon.textContent = getWeatherIcon(monthData.condition);

          var name = document.createElement("div");
          name.className = "month-name";
          name.textContent = monthNames[i].substring(0, 2);

          var temp = document.createElement("div");
          temp.className = "month-temp";
          temp.textContent = monthData.low + "~" + monthData.high + "°";

          var rain = document.createElement("div");
          rain.className = "month-rain";
          rain.textContent = monthData.rain + "mm";

          card.appendChild(icon);
          card.appendChild(name);
          card.appendChild(temp);
          card.appendChild(rain);
          container.appendChild(card);
        }
      }

      function renderRecommendation(dest, month) {
        var container = document.getElementById("recommendation");
        container.textContent = "";

        var isBest = dest.bestMonths.indexOf(month) !== -1;
        var isGood = dest.goodMonths.indexOf(month) !== -1;

        var title = document.createElement("div");
        title.className = "recommendation-title";
        if (isBest) {
          title.textContent = "✨ 最佳旅行时间！";
        } else if (isGood) {
          title.textContent = "👍 适合旅行";
        } else {
          title.textContent = "⚠️ 非最佳时段";
        }

        var content = document.createElement("div");
        content.className = "recommendation-content";

        var bestMonthsText = dest.bestMonths
          .map(function (m) {
            return monthNames[m];
          })
          .join("、");

        content.textContent = dest.tips + "\n\n最佳旅行月份：" + bestMonthsText;

        var packingDiv = document.createElement("div");
        packingDiv.className = "packing-tips";

        var packingLabel = document.createElement("span");
        packingLabel.style.cssText =
          "font-weight: 600; color: var(--color-text-primary); margin-right: var(--space-2);";
        packingLabel.textContent = "建议携带：";
        packingDiv.appendChild(packingLabel);

        dest.packing.forEach(function (item) {
          var span = document.createElement("span");
          span.className = "packing-item";
          span.textContent = item;
          packingDiv.appendChild(span);
        });

        container.appendChild(title);
        container.appendChild(content);
        container.appendChild(packingDiv);
      }

      function getWeatherIcon(condition) {
        var icons = {
          晴热: "☀️",
          晴冷: "🌤️",
          酷热: "🔥",
          炎热: "☀️",
          温暖: "🌤️",
          舒适: "😊",
          凉爽: "🍂",
          温和: "🌸",
          多云: "⛅",
          阴冷: "🌥️",
          寒冷: "❄️",
          严寒: "🥶",
          雨季: "🌧️",
          多雨: "🌧️",
          较少雨: "🌤️",
          过渡: "⛅",
          梅雨: "🌧️",
          凉季: "😊",
          夏季: "☀️",
          冬季: "❄️",
          春季: "🌸",
          秋季: "🍂",
          旱季: "☀️",
          热: "🌡️"
        };
        return icons[condition] || "🌤️";
      }

      async function copyWeatherInfo() {
        var destId = document.getElementById("destination").value;
        if (!destId) return;

        var dest = destinations[destId];
        var monthData = dest.weather[selectedMonth];

        var text = dest.name + " - " + monthNames[selectedMonth] + "天气\n";
        text += "========================\n\n";
        text += "气候类型：" + dest.climate + "\n";
        text += "温度范围：" + monthData.low + "°C ~ " + monthData.high + "°C\n";
        text += "月降水量：" + monthData.rain + "mm\n";
        text += "天气状况：" + monthData.condition + "\n\n";

        var bestMonthsText = dest.bestMonths
          .map(function (m) {
            return monthNames[m];
          })
          .join("、");
        text += "最佳旅行月份：" + bestMonthsText + "\n\n";
        text += "旅行提示：" + dest.tips + "\n\n";
        text += "建议携带：" + dest.packing.join("、");

        try {
          await navigator.clipboard.writeText(text);
          showToast("已复制到剪贴板", "success");
        } catch (e) {
          showToast("复制失败");
        }
      }

      function saveState() {
        var state = {
          destination: document.getElementById("destination").value,
          month: document.getElementById("month").value
        };
        localStorage.setItem("weather-planner-state", JSON.stringify(state));
      }

      function loadState() {
        var saved = localStorage.getItem("weather-planner-state");
        if (saved) {
          try {
            var state = JSON.parse(saved);
            if (state.destination) {
              document.getElementById("destination").value = state.destination;
            }
            if (state.month !== undefined) {
              document.getElementById("month").value = state.month;
              selectedMonth = parseInt(state.month);
            }
            showWeather();
          } catch (e) {
            // ignore
          }
        }
      }

      function showToast(message, type) {
        var toast = document.getElementById("toast");
        toast.textContent = message;
        toast.className = "toast show " + (type || "");
        setTimeout(function () {
          toast.className = "toast";
        }, 2000);
      }

      function toggleTheme() {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }

      initTheme();
      init();
    
