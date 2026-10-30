// @ts-nocheck
// Generated from tools/productivity/ics-calendar-generator.html
// Source SHA-256: ebb426cb5e9f67cbde2711a21afe64effbbe36871d85ce715e3d1284ad92cce0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ───────────── 元素引用 ─────────────
      var evtTitle = document.getElementById("evtTitle");
      var evtStart = document.getElementById("evtStart");
      var evtEnd = document.getElementById("evtEnd");
      var evtLocation = document.getElementById("evtLocation");
      var evtUrl = document.getElementById("evtUrl");
      var evtDesc = document.getElementById("evtDesc");
      var evtOrganizer = document.getElementById("evtOrganizer");
      var evtAttendees = document.getElementById("evtAttendees");
      var alarmEnabled = document.getElementById("alarmEnabled");
      var alarmOptions = document.getElementById("alarmOptions");
      var alarmMinutes = document.getElementById("alarmMinutes");
      var alarmUnit = document.getElementById("alarmUnit");
      var recurFreq = document.getElementById("recurFreq");
      var recurIntervalGroup = document.getElementById("recurIntervalGroup");
      var recurInterval = document.getElementById("recurInterval");
      var weekdaySection = document.getElementById("weekdaySection");
      var weekdayPicker = document.getElementById("weekdayPicker");
      var recurEndGroup = document.getElementById("recurEndGroup");
      var recurEndType = document.getElementById("recurEndType");
      var recurCountGroup = document.getElementById("recurCountGroup");
      var recurCount = document.getElementById("recurCount");
      var recurUntilGroup = document.getElementById("recurUntilGroup");
      var recurUntil = document.getElementById("recurUntil");
      var icsPreview = document.getElementById("icsPreview");
      var statusMsg = document.getElementById("statusMsg");

      var generatedIcs = "";

      // ───────────── 初始化默认时间 ─────────────
      function initDefaultTimes() {
        var now = new Date();
        now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15, 0, 0);
        var end = new Date(now.getTime() + 60 * 60 * 1000);
        evtStart.value = toLocalInputValue(now);
        evtEnd.value = toLocalInputValue(end);
      }

      function toLocalInputValue(d) {
        var year = d.getFullYear();
        var month = String(d.getMonth() + 1).padStart(2, "0");
        var day = String(d.getDate()).padStart(2, "0");
        var hours = String(d.getHours()).padStart(2, "0");
        var minutes = String(d.getMinutes()).padStart(2, "0");
        return year + "-" + month + "-" + day + "T" + hours + ":" + minutes;
      }

      // ───────────── ICS 工具函数 ─────────────
      function toIcsDate(dateStr) {
        return dateStr.replace(/[-:]/g, "").replace("T", "T") + "00";
      }

      function escapeIcsText(str) {
        return str
          .replace(/\\/g, "\\\\")
          .replace(/;/g, "\\;")
          .replace(/,/g, "\\,")
          .replace(/\n/g, "\\n");
      }

      // RFC 5545: fold lines longer than 75 octets
      function foldLine(line) {
        if (line.length <= 75) return line;
        var result = "";
        while (line.length > 75) {
          result += line.slice(0, 75) + "\r\n ";
          line = line.slice(75);
        }
        result += line;
        return result;
      }

      function generateUid() {
        var rand = Math.random().toString(36).slice(2, 10).toUpperCase();
        var ts = Date.now();
        return ts + "-" + rand + "@webutils";
      }

      function generateDtstamp() {
        var now = new Date();
        return (
          now.getUTCFullYear() +
          String(now.getUTCMonth() + 1).padStart(2, "0") +
          String(now.getUTCDate()).padStart(2, "0") +
          "T" +
          String(now.getUTCHours()).padStart(2, "0") +
          String(now.getUTCMinutes()).padStart(2, "0") +
          String(now.getUTCSeconds()).padStart(2, "0") +
          "Z"
        );
      }

      // ───────────── 生成 ICS ─────────────
      function buildIcs() {
        var title = evtTitle.value.trim();
        if (!title) {
          showStatus("请填写事件标题", "error");
          evtTitle.classList.add("error");
          return null;
        }
        evtTitle.classList.remove("error");

        if (!evtStart.value) {
          showStatus("请选择开始时间", "error");
          evtStart.classList.add("error");
          return null;
        }
        evtStart.classList.remove("error");

        if (!evtEnd.value) {
          showStatus("请选择结束时间", "error");
          evtEnd.classList.add("error");
          return null;
        }
        evtEnd.classList.remove("error");

        if (evtEnd.value <= evtStart.value) {
          showStatus("结束时间必须晚于开始时间", "error");
          evtEnd.classList.add("error");
          return null;
        }
        evtEnd.classList.remove("error");

        var lines = [];
        lines.push("BEGIN:VCALENDAR");
        lines.push("VERSION:2.0");
        lines.push("PRODID:-//WebUtils//ICS Calendar Generator//ZH");
        lines.push("CALSCALE:GREGORIAN");
        lines.push("METHOD:PUBLISH");
        lines.push("BEGIN:VEVENT");
        lines.push("UID:" + generateUid());
        lines.push("DTSTAMP:" + generateDtstamp());
        lines.push("DTSTART:" + toIcsDate(evtStart.value));
        lines.push("DTEND:" + toIcsDate(evtEnd.value));
        lines.push(foldLine("SUMMARY:" + escapeIcsText(title)));

        if (evtDesc.value.trim()) {
          lines.push(foldLine("DESCRIPTION:" + escapeIcsText(evtDesc.value.trim())));
        }
        if (evtLocation.value.trim()) {
          lines.push(foldLine("LOCATION:" + escapeIcsText(evtLocation.value.trim())));
        }
        if (evtUrl.value.trim()) {
          lines.push(foldLine("URL:" + evtUrl.value.trim()));
        }
        var organizer = evtOrganizer.value.trim();
        if (organizer) {
          lines.push(foldLine("ORGANIZER;CN=" + organizer + ":MAILTO:" + organizer));
        }

        var attendeeRaw = evtAttendees.value.trim();
        if (attendeeRaw) {
          attendeeRaw.split(",").forEach(function (email) {
            var addr = email.trim();
            if (addr) {
              lines.push(
                foldLine(
                  "ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;" +
                    "RSVP=TRUE;CN=" +
                    addr +
                    ":MAILTO:" +
                    addr
                )
              );
            }
          });
        }

        // 重复规则
        var freq = recurFreq.value;
        if (freq) {
          var rrule = "RRULE:FREQ=" + freq;
          var interval = parseInt(recurInterval.value, 10) || 1;
          if (interval > 1) {
            rrule += ";INTERVAL=" + interval;
          }
          if (freq === "WEEKLY") {
            var selectedDays = [];
            weekdayPicker.querySelectorAll(".weekday-btn.active").forEach(function (btn) {
              selectedDays.push(btn.getAttribute("data-day"));
            });
            if (selectedDays.length > 0) {
              rrule += ";BYDAY=" + selectedDays.join(",");
            }
          }
          var endType = recurEndType.value;
          if (endType === "count") {
            var count = parseInt(recurCount.value, 10) || 10;
            rrule += ";COUNT=" + count;
          } else if (endType === "until" && recurUntil.value) {
            rrule += ";UNTIL=" + recurUntil.value.replace(/-/g, "") + "T235959Z";
          }
          lines.push(foldLine(rrule));
        }

        // 提醒
        if (alarmEnabled.checked) {
          var mins = parseInt(alarmMinutes.value, 10) || 15;
          var unit = parseInt(alarmUnit.value, 10) || 1;
          var totalMins = mins * unit;
          lines.push("BEGIN:VALARM");
          lines.push("TRIGGER:-PT" + totalMins + "M");
          lines.push("ACTION:DISPLAY");
          lines.push(foldLine("DESCRIPTION:提醒：" + escapeIcsText(title)));
          lines.push("END:VALARM");
        }

        lines.push("STATUS:CONFIRMED");
        lines.push("END:VEVENT");
        lines.push("END:VCALENDAR");

        return lines.join("\r\n");
      }

      function showStatus(msg, type) {
        statusMsg.textContent = msg;
        statusMsg.className = "status " + (type || "");
      }

      function renderPreview(icsContent) {
        icsPreview.classList.remove("empty");
        var escaped = icsContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var highlighted = escaped.replace(/^([A-Z][A-Z0-9;=-]+):/gm, function (match, key) {
          return '<span class="ics-line-key">' + key + "</span>:";
        });
        icsPreview.innerHTML = highlighted;
      }

      // ───────────── 事件绑定 ─────────────
      document.getElementById("btnGenerate").onclick = function () {
        var ics = buildIcs();
        if (ics) {
          generatedIcs = ics;
          renderPreview(ics);
          showStatus("生成成功，共 " + ics.split("\r\n").length + " 行", "success");
        }
      };

      document.getElementById("btnDownload").onclick = function () {
        var ics = buildIcs();
        if (!ics) return;
        generatedIcs = ics;
        renderPreview(ics);
        var blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        var titleSlug = (evtTitle.value.trim() || "event").slice(0, 40).replace(/\s+/g, "-");
        a.href = url;
        a.download = titleSlug + ".ics";
        a.click();
        URL.revokeObjectURL(url);
        showStatus("文件已下载", "success");
      };

      document.getElementById("btnCopyIcs").onclick = async function () {
        if (!generatedIcs) {
          showStatus("请先生成 ICS", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(generatedIcs);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败，请手动选择", "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        evtTitle.value = "";
        evtLocation.value = "";
        evtUrl.value = "";
        evtDesc.value = "";
        evtOrganizer.value = "";
        evtAttendees.value = "";
        alarmEnabled.checked = false;
        alarmOptions.style.display = "none";
        recurFreq.value = "";
        recurIntervalGroup.style.display = "none";
        weekdaySection.classList.remove("visible");
        recurEndGroup.style.display = "none";
        recurCountGroup.style.display = "none";
        recurUntilGroup.style.display = "none";
        weekdayPicker.querySelectorAll(".weekday-btn").forEach(function (btn) {
          btn.classList.remove("active");
        });
        generatedIcs = "";
        icsPreview.innerHTML = "点击「生成 ICS」查看内容预览...";
        icsPreview.classList.add("empty");
        showStatus("", "");
        initDefaultTimes();
      };

      alarmEnabled.addEventListener("change", function () {
        alarmOptions.style.display = alarmEnabled.checked ? "flex" : "none";
      });

      recurFreq.addEventListener("change", function () {
        var freq = recurFreq.value;
        var hasFreq = freq !== "";
        recurIntervalGroup.style.display = hasFreq ? "" : "none";
        weekdaySection.classList.toggle("visible", freq === "WEEKLY");
        recurEndGroup.style.display = hasFreq ? "" : "none";
        if (!hasFreq) {
          recurCountGroup.style.display = "none";
          recurUntilGroup.style.display = "none";
        }
      });

      recurEndType.addEventListener("change", function () {
        var type = recurEndType.value;
        recurCountGroup.style.display = type === "count" ? "" : "none";
        recurUntilGroup.style.display = type === "until" ? "" : "none";
      });

      weekdayPicker.querySelectorAll(".weekday-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          btn.classList.toggle("active");
        });
      });

      // ───────────── 初始化 ─────────────
      initDefaultTimes();

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
    
