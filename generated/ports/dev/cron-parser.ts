// @ts-nocheck
// Generated from tools/dev/cron-parser.html
// Source SHA-256: 8996da500b7cc4f0eb7edf08067ae3be58cd3a5094321cdb81243dde77e6ecc2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
      const months = [
        "",
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ];
      function parseField(field, min, max) {
        if (field === "*") return Array.from({ length: max - min + 1 }, (_, i) => i + min);
        if (field.includes("/")) {
          const [range, step] = field.split("/");
          const values = parseField(range === "*" ? `${min}-${max}` : range, min, max);
          return values.filter((_, i) => i % parseInt(step) === 0);
        }
        if (field.includes(",")) return field.split(",").flatMap((f) => parseField(f, min, max));
        if (field.includes("-")) {
          const [start, end] = field.split("-").map(Number);
          return Array.from({ length: end - start + 1 }, (_, i) => i + start);
        }
        return [parseInt(field)];
      }
      function describeCron(minute, hour, day, month, weekday) {
        let desc = "";
        if (minute === "*" && hour === "*") desc = "每分钟";
        else if (minute.includes("/")) desc = `每${minute.split("/")[1]}分钟`;
        else if (hour === "*") desc = `每小时的第${minute}分钟`;
        else if (day === "*" && month === "*" && weekday === "*")
          desc = `每天 ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
        else if (weekday !== "*")
          desc = `每周${weekday
            .split(",")
            .map((w) => weekdays[w])
            .join("、")} ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
        else if (day !== "*")
          desc = `每月${day}号 ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
        else desc = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")} 执行`;
        return desc + " 执行";
      }
      function getNextRuns(cron, count = 5) {
        const [minute, hour, day, month, weekday] = cron.split(" ");
        const minutes = parseField(minute, 0, 59);
        const hours = parseField(hour, 0, 23);
        const days = parseField(day, 1, 31);
        const monthsArr = parseField(month, 1, 12);
        const weekdaysArr = parseField(weekday, 0, 6);
        const runs = [];
        let date = new Date();
        date.setSeconds(0);
        date.setMilliseconds(0);
        while (runs.length < count) {
          date.setMinutes(date.getMinutes() + 1);
          if (
            minutes.includes(date.getMinutes()) &&
            hours.includes(date.getHours()) &&
            (day === "*" || days.includes(date.getDate())) &&
            (month === "*" || monthsArr.includes(date.getMonth() + 1)) &&
            (weekday === "*" || weekdaysArr.includes(date.getDay()))
          ) {
            runs.push(new Date(date));
          }
          if (date.getFullYear() > new Date().getFullYear() + 1) break;
        }
        return runs;
      }
      function update() {
        const cron = document.getElementById("fullCron").value.trim();
        const parts = cron.split(" ");
        if (parts.length === 5) {
          document.getElementById("minute").value = parts[0];
          document.getElementById("hour").value = parts[1];
          document.getElementById("day").value = parts[2];
          document.getElementById("month").value = parts[3];
          document.getElementById("weekday").value = parts[4];
          document.getElementById("description").textContent = describeCron(...parts);
          const runs = getNextRuns(cron);
          document.getElementById("nextRuns").innerHTML = runs
            .map(
              (r, i) =>
                `<div class="run-item"><span>#${i + 1}</span><span class="run-time">${r.toLocaleString("zh-CN")}</span></div>`
            )
            .join("");
        }
      }
      function updateFromFields() {
        const cron = ["minute", "hour", "day", "month", "weekday"]
          .map((f) => document.getElementById(f).value)
          .join(" ");
        document.getElementById("fullCron").value = cron;
        update();
      }
      function setPreset(cron) {
        document.getElementById("fullCron").value = cron;
        update();
      }
      document.getElementById("fullCron").addEventListener("input", update);
      ["minute", "hour", "day", "month", "weekday"].forEach((f) =>
        document.getElementById(f).addEventListener("input", updateFromFields)
      );
      update();
    
