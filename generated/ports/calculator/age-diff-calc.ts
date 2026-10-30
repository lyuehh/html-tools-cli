// @ts-nocheck
// Generated from tools/calculator/age-diff-calc.html
// Source SHA-256: b86ed6ab911263b2b407226bea1951795e07492db606c10c921ec2f475b465db
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // 加载保存的主题
      (function () {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      // 计算周岁
      function calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        return age;
      }

      // 获取生肖
      function getZodiac(year) {
        const zodiacs = [
          "🐀鼠",
          "🐂牛",
          "🐅虎",
          "🐇兔",
          "🐉龙",
          "🐍蛇",
          "🐴马",
          "🐑羊",
          "🐵猴",
          "🐔鸡",
          "🐕狗",
          "🐷猪"
        ];
        return zodiacs[(year - 4) % 12];
      }

      // 获取星座
      function getConstellation(month, day) {
        const constellations = [
          { name: "♑摩羯", start: [1, 1], end: [1, 19] },
          { name: "♒水瓶", start: [1, 20], end: [2, 18] },
          { name: "♓双鱼", start: [2, 19], end: [3, 20] },
          { name: "♈白羊", start: [3, 21], end: [4, 19] },
          { name: "♉金牛", start: [4, 20], end: [5, 20] },
          { name: "♊双子", start: [5, 21], end: [6, 21] },
          { name: "♋巨蟹", start: [6, 22], end: [7, 22] },
          { name: "♌狮子", start: [7, 23], end: [8, 22] },
          { name: "♍处女", start: [8, 23], end: [9, 22] },
          { name: "♎天秤", start: [9, 23], end: [10, 23] },
          { name: "♏天蝎", start: [10, 24], end: [11, 22] },
          { name: "♐射手", start: [11, 23], end: [12, 21] },
          { name: "♑摩羯", start: [12, 22], end: [12, 31] }
        ];

        for (const c of constellations) {
          if (
            (month === c.start[0] && day >= c.start[1]) ||
            (month === c.end[0] && day <= c.end[1])
          ) {
            return c.name;
          }
        }
        return "♑摩羯";
      }

      // 计算年月日差
      function getDateDiff(date1, date2) {
        const earlier = date1 < date2 ? date1 : date2;
        const later = date1 < date2 ? date2 : date1;

        let years = later.getFullYear() - earlier.getFullYear();
        let months = later.getMonth() - earlier.getMonth();
        let days = later.getDate() - earlier.getDate();

        if (days < 0) {
          months--;
          const prevMonth = new Date(later.getFullYear(), later.getMonth(), 0);
          days += prevMonth.getDate();
        }

        if (months < 0) {
          years--;
          months += 12;
        }

        return { years, months, days };
      }

      // 计算
      window.calculate = function () {
        const date1Input = document.getElementById("date1").value;
        const date2Input = document.getElementById("date2").value;

        if (date1Input) {
          const birthDate1 = new Date(date1Input);
          const age1 = calculateAge(birthDate1);
          document.getElementById("age1").textContent = age1;
          document.getElementById("zodiac1").textContent = getZodiac(birthDate1.getFullYear());
          document.getElementById("constellation1").textContent = getConstellation(
            birthDate1.getMonth() + 1,
            birthDate1.getDate()
          );
        }

        if (date2Input) {
          const birthDate2 = new Date(date2Input);
          const age2 = calculateAge(birthDate2);
          document.getElementById("age2").textContent = age2;
          document.getElementById("zodiac2").textContent = getZodiac(birthDate2.getFullYear());
          document.getElementById("constellation2").textContent = getConstellation(
            birthDate2.getMonth() + 1,
            birthDate2.getDate()
          );
        }

        if (date1Input && date2Input) {
          const birthDate1 = new Date(date1Input);
          const birthDate2 = new Date(date2Input);

          const diff = getDateDiff(birthDate1, birthDate2);
          const totalDays = Math.abs(Math.floor((birthDate2 - birthDate1) / (1000 * 60 * 60 * 24)));
          const totalMonths = diff.years * 12 + diff.months;
          const totalWeeks = Math.floor(totalDays / 7);

          document.getElementById("diffYears").textContent = diff.years + "岁";
          document.getElementById("diffDetail").textContent =
            `${diff.years}年${diff.months}个月${diff.days}天`;
          document.getElementById("diffMonths").textContent = totalMonths + "个月";
          document.getElementById("diffDays").textContent = totalDays + "天";
          document.getElementById("diffWeeks").textContent = totalWeeks + "周";

          if (birthDate1 < birthDate2) {
            document.getElementById("whoOlder").textContent = "第一个人更年长";
          } else if (birthDate1 > birthDate2) {
            document.getElementById("whoOlder").textContent = "第二个人更年长";
          } else {
            document.getElementById("whoOlder").textContent = "同一天出生！";
          }
        }
      };
    
