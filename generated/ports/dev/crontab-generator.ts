// @ts-nocheck
// Generated from tools/dev/crontab-generator.html
// Source SHA-256: 84a6e92de0f3e8dfa1fa2875937ea26ebb00893e0c11148813fefddfc6faa226
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Initialize theme
      (function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      window.setTemplate = function (cron) {
        const parts = cron.split(" ");
        document.getElementById("minute").value = parts[0] || "*";
        document.getElementById("hour").value = parts[1] || "*";
        document.getElementById("day").value = parts[2] || "*";
        document.getElementById("month").value = parts[3] || "*";
        document.getElementById("weekday").value = parts[4] || "*";
        updateCron();
      };

      function updateCron() {
        const minute = document.getElementById("minute").value || "*";
        const hour = document.getElementById("hour").value || "*";
        const day = document.getElementById("day").value || "*";
        const month = document.getElementById("month").value || "*";
        const weekday = document.getElementById("weekday").value || "*";

        const cron = `${minute} ${hour} ${day} ${month} ${weekday}`;
        document.getElementById("cronValue").textContent = cron;
        document.getElementById("cronDesc").textContent = describeCron(
          minute,
          hour,
          day,
          month,
          weekday
        );

        calculateNextRuns(minute, hour, day, month, weekday);
      }

      function describeCron(minute, hour, day, month, weekday) {
        const parts = [];

        // Minute
        if (minute === "*") {
          parts.push("每分钟");
        } else if (minute.includes("/")) {
          parts.push(`每${minute.split("/")[1]}分钟`);
        } else if (minute.includes(",")) {
          parts.push(`在第${minute}分钟`);
        } else if (minute.includes("-")) {
          parts.push(`在${minute}分钟`);
        } else {
          parts.push(`在第${minute}分钟`);
        }

        // Hour
        if (hour !== "*") {
          if (hour.includes("/")) {
            parts.push(`每${hour.split("/")[1]}小时`);
          } else if (hour.includes(",")) {
            parts.push(`在${hour}点`);
          } else if (hour.includes("-")) {
            parts.push(`在${hour}点`);
          } else {
            parts.push(`在${hour}点`);
          }
        }

        // Day
        if (day !== "*") {
          if (day.includes("/")) {
            parts.push(`每${day.split("/")[1]}天`);
          } else {
            parts.push(`每月${day}号`);
          }
        }

        // Month
        if (month !== "*") {
          const monthNames = [
            "",
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
          if (month.includes(",")) {
            parts.push(`在${month}月`);
          } else if (!month.includes("/") && !month.includes("-")) {
            parts.push(`在${monthNames[parseInt(month)] || month + "月"}`);
          }
        }

        // Weekday
        if (weekday !== "*") {
          const dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
          if (weekday === "1-5") {
            parts.push("工作日");
          } else if (weekday === "0,6") {
            parts.push("周末");
          } else if (weekday.includes(",")) {
            const days = weekday
              .split(",")
              .map((d) => dayNames[parseInt(d)])
              .join("、");
            parts.push(days);
          } else if (!weekday.includes("/") && !weekday.includes("-")) {
            parts.push(dayNames[parseInt(weekday)] || `星期${weekday}`);
          }
        }

        // Simplify common patterns
        if (minute === "*" && hour === "*" && day === "*" && month === "*" && weekday === "*") {
          return "每分钟执行";
        }
        if (minute === "0" && hour === "*" && day === "*" && month === "*" && weekday === "*") {
          return "每小时整点执行";
        }
        if (minute === "0" && hour === "0" && day === "*" && month === "*" && weekday === "*") {
          return "每天午夜执行";
        }

        return parts.join(" ") + "执行";
      }

      function calculateNextRuns(minute, hour, day, month, weekday) {
        const runs = [];
        let date = new Date();
        date.setSeconds(0);
        date.setMilliseconds(0);

        for (let i = 0; i < 1000 && runs.length < 5; i++) {
          date.setMinutes(date.getMinutes() + 1);

          if (matchesCron(date, minute, hour, day, month, weekday)) {
            runs.push(formatDate(date));
          }
        }

        const list = document.getElementById("nextRuns");
        if (runs.length > 0) {
          list.innerHTML = runs.map((r) => `<li>${r}</li>`).join("");
        } else {
          list.innerHTML = "<li>无法计算下次执行时间</li>";
        }
      }

      function matchesCron(date, minute, hour, day, month, weekday) {
        return (
          matchField(date.getMinutes(), minute, 0, 59) &&
          matchField(date.getHours(), hour, 0, 23) &&
          matchField(date.getDate(), day, 1, 31) &&
          matchField(date.getMonth() + 1, month, 1, 12) &&
          matchField(date.getDay(), weekday, 0, 6)
        );
      }

      function matchField(value, field, min, max) {
        if (field === "*") return true;

        // Handle step values
        if (field.includes("/")) {
          const [range, step] = field.split("/");
          const stepNum = parseInt(step);
          if (range === "*") {
            return value % stepNum === 0;
          }
        }

        // Handle ranges
        if (field.includes("-") && !field.includes(",")) {
          const [start, end] = field.split("-").map(Number);
          return value >= start && value <= end;
        }

        // Handle lists
        if (field.includes(",")) {
          const values = field
            .split(",")
            .map((v) => {
              if (v.includes("-")) {
                const [start, end] = v.split("-").map(Number);
                const range = [];
                for (let i = start; i <= end; i++) range.push(i);
                return range;
              }
              return [parseInt(v)];
            })
            .flat();
          return values.includes(value);
        }

        // Single value
        return parseInt(field) === value;
      }

      function formatDate(date) {
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          weekday: "short"
        };
        return date.toLocaleString("zh-CN", options);
      }

      window.copyCron = function () {
        const cron = document.getElementById("cronValue").textContent;
        navigator.clipboard.writeText(cron).then(() => {
          showToast("已复制: " + cron);
        });
      };

      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Initialize
      updateCron();
    
