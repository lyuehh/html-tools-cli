// @ts-nocheck
// Generated from tools/time/chinese-calendar.html
// Source SHA-256: aa30d29268322af4f6e13cab28ddd8abf85f2a88e9085a0c3a8fda87c799aa19
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LUNAR_INFO = [
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
        0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
      ];
      const LUNAR_MONTH = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
      const LUNAR_DAY = [
        "初一",
        "初二",
        "初三",
        "初四",
        "初五",
        "初六",
        "初七",
        "初八",
        "初九",
        "初十",
        "十一",
        "十二",
        "十三",
        "十四",
        "十五",
        "十六",
        "十七",
        "十八",
        "十九",
        "二十",
        "廿一",
        "廿二",
        "廿三",
        "廿四",
        "廿五",
        "廿六",
        "廿七",
        "廿八",
        "廿九",
        "三十"
      ];
      const ANIMALS = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
      const GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
      const ZHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
      const FESTIVALS = {
        "1-1": "春节",
        "1-15": "元宵节",
        "5-5": "端午节",
        "7-7": "七夕",
        "8-15": "中秋节",
        "9-9": "重阳节",
        "12-30": "除夕"
      };
      const SOLAR_FESTIVALS = {
        "1-1": "元旦",
        "2-14": "情人节",
        "3-8": "妇女节",
        "4-1": "愚人节",
        "5-1": "劳动节",
        "6-1": "儿童节",
        "10-1": "国庆节",
        "12-25": "圣诞节"
      };

      let currentYear, currentMonth, selectedDate;

      document.addEventListener("DOMContentLoaded", () => {
        initTheme();
        const today = new Date();
        currentYear = today.getFullYear();
        currentMonth = today.getMonth();
        selectedDate = today;
        render();
      });

      function initTheme() {
        const s = localStorage.getItem("theme");
        if (s) document.documentElement.setAttribute("data-theme", s);
      }
      window.toggleTheme = function () {
        const c = document.documentElement.getAttribute("data-theme");
        const n = c === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", n);
        localStorage.setItem("theme", n);
      };

      function lYear(y) {
        let sum = 348;
        const info = LUNAR_INFO[y - 1900];
        for (let bit = 0x8000; bit > 0x8; bit >>= 1) {
          if (info & bit) sum++;
        }
        return sum + leapDays(y);
      }
      function leapMonth(y) {
        return LUNAR_INFO[y - 1900] & 0xf;
      }
      function leapDays(y) {
        return leapMonth(y) ? (LUNAR_INFO[y - 1900] & 0x10000 ? 30 : 29) : 0;
      }
      function monthDays(y, m) {
        return LUNAR_INFO[y - 1900] & (0x10000 >> m) ? 30 : 29;
      }

      function toLunar(date) {
        let y = date.getFullYear(),
          m = date.getMonth() + 1,
          d = date.getDate();
        let offset = Math.floor((Date.UTC(y, m - 1, d) - Date.UTC(1900, 0, 31)) / 86400000);
        let ly = 1900,
          lm = 1,
          ld,
          leap = 0,
          isLeap = false;

        for (; ly < 2101 && offset > 0; ly++) offset -= lYear(ly);
        if (offset < 0) {
          offset += lYear(ly);
          ly--;
        }

        leap = leapMonth(ly);
        for (lm = 1; lm < 13 && offset > 0; lm++) {
          if (leap > 0 && lm === leap + 1 && !isLeap) {
            lm--;
            isLeap = true;
          } else if (isLeap && lm === leap + 1) isLeap = false;
          offset -= isLeap ? leapDays(ly) : monthDays(ly, lm);
        }
        if (offset === 0 && leap > 0 && lm === leap + 1) {
          if (isLeap) isLeap = false;
          else {
            isLeap = true;
            lm--;
          }
        }
        if (offset < 0) {
          offset += isLeap ? leapDays(ly) : monthDays(ly, lm);
          lm--;
        }
        ld = offset + 1;

        if (lm < 1 || lm > 12 || ld < 1 || ld > 30) {
          return { year: y, month: 1, day: 1, isLeap: false };
        }

        return { year: ly, month: lm, day: ld, isLeap: isLeap };
      }

      function getGanZhi(y) {
        return GAN[(y - 4) % 10] + ZHI[(y - 4) % 12];
      }
      function getAnimal(y) {
        return ANIMALS[(y - 4) % 12];
      }

      function render() {
        document.getElementById("currentMonth").textContent =
          currentYear + "年" + (currentMonth + 1) + "月";

        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startDay = firstDay.getDay();
        const daysInMonth = lastDay.getDate();
        const today = new Date();

        let html = "";
        const prevMonth = new Date(currentYear, currentMonth, 0);
        for (let i = startDay - 1; i >= 0; i--) {
          const d = new Date(currentYear, currentMonth - 1, prevMonth.getDate() - i);
          html += renderDay(d, true, today);
        }
        for (let i = 1; i <= daysInMonth; i++) {
          const d = new Date(currentYear, currentMonth, i);
          html += renderDay(d, false, today);
        }
        const remaining = 42 - (startDay + daysInMonth);
        for (let i = 1; i <= remaining; i++) {
          const d = new Date(currentYear, currentMonth + 1, i);
          html += renderDay(d, true, today);
        }

        document.getElementById("daysGrid").innerHTML = html;
        showDetail(selectedDate);
      }

      function renderDay(date, isOther, today) {
        const lunar = toLunar(date);
        const monthName = LUNAR_MONTH[lunar.month - 1] || "正";
        const dayName = LUNAR_DAY[lunar.day - 1] || "初一";
        const lunarText = lunar.day === 1 ? (lunar.isLeap ? "闰" : "") + monthName + "月" : dayName;
        const festival =
          FESTIVALS[lunar.month + "-" + lunar.day] ||
          SOLAR_FESTIVALS[date.getMonth() + 1 + "-" + date.getDate()];
        const isToday = date.toDateString() === today.toDateString();
        const isSelected = date.toDateString() === selectedDate.toDateString();

        let cls = "day";
        if (isOther) cls += " other-month";
        if (isToday) cls += " today";
        if (isSelected) cls += " selected";
        if (festival) cls += " festival";

        return (
          '<div class="' +
          cls +
          '" onclick="selectDate(' +
          date.getFullYear() +
          "," +
          date.getMonth() +
          "," +
          date.getDate() +
          ')">' +
          "<span>" +
          date.getDate() +
          "</span>" +
          '<span class="lunar">' +
          (festival || lunarText) +
          "</span>" +
          "</div>"
        );
      }

      window.selectDate = function (y, m, d) {
        selectedDate = new Date(y, m, d);
        render();
      };

      function showDetail(date) {
        const lunar = toLunar(date);
        const monthName = LUNAR_MONTH[lunar.month - 1] || "正";
        const dayName = LUNAR_DAY[lunar.day - 1] || "初一";
        const festival =
          FESTIVALS[lunar.month + "-" + lunar.day] ||
          SOLAR_FESTIVALS[date.getMonth() + 1 + "-" + date.getDate()];

        document.getElementById("detail").innerHTML =
          "<h3>" +
          date.getFullYear() +
          "年" +
          (date.getMonth() + 1) +
          "月" +
          date.getDate() +
          "日</h3>" +
          '<div class="detail-grid">' +
          '<span class="label">农历</span><span>' +
          (lunar.isLeap ? "闰" : "") +
          monthName +
          "月" +
          dayName +
          "</span>" +
          '<span class="label">干支年</span><span>' +
          getGanZhi(lunar.year) +
          "年 (" +
          getAnimal(lunar.year) +
          ")</span>" +
          '<span class="label">节日</span><span>' +
          (festival || "-") +
          "</span>" +
          '<span class="label">星期</span><span>星期' +
          "日一二三四五六"[date.getDay()] +
          "</span>" +
          "</div>";
      }

      window.changeMonth = function (delta) {
        currentMonth += delta;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
        render();
      };
    
