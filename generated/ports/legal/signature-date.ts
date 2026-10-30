// @ts-nocheck
// Generated from tools/legal/signature-date.html
// Source SHA-256: cd0125eb59baf4a04422ac1403e290ae70841f20a421043f86c0aaa5f31c5b10
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "signature_date_v1";

      var chineseNumbers = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二"
      ];
      var chineseDigits = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

      function init() {
        loadFromStorage();
        if (!document.getElementById("selectedDate").value) {
          document.getElementById("selectedDate").value = new Date().toISOString().split("T")[0];
        }
        generateFormats();
      }

      function setDate(type) {
        var date = new Date();

        switch (type) {
          case "today":
            break;
          case "tomorrow":
            date.setDate(date.getDate() + 1);
            break;
          case "nextWeek":
            var daysUntilMonday = (8 - date.getDay()) % 7 || 7;
            date.setDate(date.getDate() + daysUntilMonday);
            break;
          case "nextMonth":
            date.setMonth(date.getMonth() + 1);
            date.setDate(1);
            break;
          case "endOfMonth":
            date.setMonth(date.getMonth() + 1);
            date.setDate(0);
            break;
          case "endOfYear":
            date.setMonth(11);
            date.setDate(31);
            break;
        }

        document.getElementById("selectedDate").value = date.toISOString().split("T")[0];
        generateFormats();
      }

      function generateFormats() {
        var dateStr = document.getElementById("selectedDate").value;
        var location = document.getElementById("location").value.trim();

        if (!dateStr) {
          return;
        }

        var date = new Date(dateStr);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var formats = [
          {
            label: "中文标准格式",
            value: year + "年" + month + "月" + day + "日"
          },
          {
            label: "中文大写格式",
            value:
              toChineseYear(year) + "年" + toChineseMonth(month) + "月" + toChineseDay(day) + "日"
          },
          {
            label: "中文法律格式",
            value:
              "二〇" +
              toChineseDigit(Math.floor(year / 10) % 10) +
              toChineseDigit(year % 10) +
              "年" +
              toChineseMonth(month) +
              "月" +
              toChineseDay(day) +
              "日"
          },
          {
            label: "ISO 格式",
            value: dateStr
          },
          {
            label: "斜杠格式 (年/月/日)",
            value: year + "/" + padZero(month) + "/" + padZero(day)
          },
          {
            label: "斜杠格式 (月/日/年)",
            value: padZero(month) + "/" + padZero(day) + "/" + year
          },
          {
            label: "点分隔格式",
            value: year + "." + padZero(month) + "." + padZero(day)
          },
          {
            label: "英文完整格式",
            value: getEnglishMonth(month) + " " + day + ", " + year
          },
          {
            label: "英文缩写格式",
            value: getEnglishMonthShort(month) + " " + day + ", " + year
          },
          {
            label: "英文日序数格式",
            value: "the " + getOrdinal(day) + " day of " + getEnglishMonth(month) + ", " + year
          },
          {
            label: "英文法律格式",
            value: "this " + getOrdinal(day) + " day of " + getEnglishMonth(month) + ", " + year
          },
          {
            label: "日期 + 星期",
            value: year + "年" + month + "月" + day + "日 " + getChineseWeekday(date.getDay())
          }
        ];

        renderFormats(formats);
        renderSignatureBlock(date, location);
        saveToStorage();
      }

      function renderFormats(formats) {
        var container = document.getElementById("formatGrid");
        container.textContent = "";

        formats.forEach(function (format) {
          var item = document.createElement("div");
          item.className = "format-item";

          var left = document.createElement("div");
          left.className = "format-item-left";

          var label = document.createElement("div");
          label.className = "format-label";
          label.textContent = format.label;

          var value = document.createElement("div");
          value.className = "format-value";
          value.textContent = format.value;

          left.appendChild(label);
          left.appendChild(value);

          var copyBtn = document.createElement("button");
          copyBtn.className = "format-copy";
          copyBtn.textContent = "复制";
          copyBtn.onclick = function () {
            copyText(format.value);
          };

          item.appendChild(left);
          item.appendChild(copyBtn);
          container.appendChild(item);
        });
      }

      function renderSignatureBlock(date, location) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var chineseDate = year + "年" + month + "月" + day + "日";
        var locationText = location ? "签署地点：" + location + "\n" : "";

        var block =
          "甲方（签章）：_________________________\n\n" +
          "法定代表人/授权代表：_________________________\n\n" +
          "签署日期：" +
          chineseDate +
          "\n" +
          locationText +
          "\n\n" +
          "乙方（签章）：_________________________\n\n" +
          "法定代表人/授权代表：_________________________\n\n" +
          "签署日期：" +
          chineseDate +
          "\n" +
          locationText;

        document.getElementById("signaturePreview").textContent = block;
      }

      function toChineseYear(year) {
        return String(year)
          .split("")
          .map(function (d) {
            return chineseDigits[parseInt(d, 10)];
          })
          .join("");
      }

      function toChineseMonth(month) {
        if (month <= 10) {
          return chineseNumbers[month];
        } else {
          return "十" + (month === 10 ? "" : chineseNumbers[month - 10]);
        }
      }

      function toChineseDay(day) {
        if (day <= 10) {
          return day === 10 ? "十" : chineseNumbers[day];
        } else if (day < 20) {
          return "十" + chineseNumbers[day - 10];
        } else if (day === 20) {
          return "二十";
        } else if (day < 30) {
          return "二十" + chineseNumbers[day - 20];
        } else if (day === 30) {
          return "三十";
        } else {
          return "三十" + chineseNumbers[day - 30];
        }
      }

      function toChineseDigit(num) {
        return chineseDigits[num];
      }

      function padZero(num) {
        return num < 10 ? "0" + num : String(num);
      }

      function getEnglishMonth(month) {
        var months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        return months[month - 1];
      }

      function getEnglishMonthShort(month) {
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        return months[month - 1];
      }

      function getOrdinal(num) {
        var suffixes = ["th", "st", "nd", "rd"];
        var v = num % 100;
        return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
      }

      function getChineseWeekday(day) {
        var weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        return weekdays[day];
      }

      function copyText(text) {
        navigator.clipboard
          .writeText(text)
          .then(function () {
            showStatus("已复制: " + text, "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      }

      function copySignatureBlock() {
        var block = document.getElementById("signaturePreview").textContent;
        navigator.clipboard
          .writeText(block)
          .then(function () {
            showStatus("签署栏已复制", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      }

      function copyAllFormats() {
        var formats = [];
        var items = document.querySelectorAll(".format-item");
        items.forEach(function (item) {
          var label = item.querySelector(".format-label").textContent;
          var value = item.querySelector(".format-value").textContent;
          formats.push(label + ": " + value);
        });

        var text = formats.join("\n");
        navigator.clipboard
          .writeText(text)
          .then(function () {
            showStatus("所有格式已复制", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      }

      function saveToStorage() {
        try {
          var data = {
            date: document.getElementById("selectedDate").value,
            location: document.getElementById("location").value
          };
          localStorage.setItem(LS_KEY, JSON.stringify(data));
        } catch (e) {}
      }

      function loadFromStorage() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            var data = JSON.parse(saved);
            if (data.date) document.getElementById("selectedDate").value = data.date;
            if (data.location) document.getElementById("location").value = data.location;
          }
        } catch (e) {}
      }

      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function toggleTheme() {
        var html = document.documentElement;
        var btn = document.querySelector(".theme-toggle");
        var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }

      (function () {
        var savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          document.documentElement.setAttribute("data-theme", savedTheme);
          var btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = savedTheme === "dark" ? "🌙" : "☀️";
        }
        init();
      })();
    
