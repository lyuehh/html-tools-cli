// @ts-nocheck
// Generated from tools/dev/access-log-analyzer.html
// Source SHA-256: 4647274f67e80d338ae475af373549b63b701715fe6d0b56dc60e68bff0486c6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var logInputEl = document.getElementById("logInput");
      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");
      var resultsSectionEl = document.getElementById("resultsSection");
      var parseErrorBoxEl = document.getElementById("parseErrorBox");
      var lineCountEl = document.getElementById("lineCount");

      // ——— Log format patterns ———
      // Nginx/Apache Combined: IP - user [date] "METHOD path proto" status bytes "referer" "ua"
      var COMBINED_RE =
        /^(\S+)\s+\S+\s+\S+\s+\[([^\]]+)\]\s+"([A-Z-]+)\s+(\S+)\s+\S+"\s+(\d{3})\s+(\d+|-)\s+"[^"]*"\s+"([^"]*)"/;
      // Common log (no referer/ua): IP - user [date] "METHOD path proto" status bytes
      var COMMON_RE =
        /^(\S+)\s+\S+\s+\S+\s+\[([^\]]+)\]\s+"([A-Z-]+)\s+(\S+)\s+\S+"\s+(\d{3})\s+(\d+|-)/;

      var BOT_PATTERNS = [
        "googlebot",
        "bingbot",
        "baiduspider",
        "yandexbot",
        "duckduckbot",
        "slurp",
        "sogou",
        "semrushbot",
        "ahrefsbot",
        "mj12bot",
        "dotbot",
        "rogerbot",
        "facebookexternalhit",
        "twitterbot",
        "linkedinbot",
        "applebot",
        "petalbot",
        "bytespider",
        "amazonbot",
        "anthropic",
        "gptbot"
      ];

      var STATUS_DESC = {
        100: "Continue",
        200: "OK",
        201: "Created",
        204: "No Content",
        206: "Partial Content",
        301: "Moved Permanently",
        302: "Found",
        304: "Not Modified",
        307: "Temp Redirect",
        308: "Perm Redirect",
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        429: "Too Many Requests",
        499: "Client Closed",
        500: "Internal Error",
        502: "Bad Gateway",
        503: "Service Unavail",
        504: "Gateway Timeout"
      };

      var SAMPLE_LOG = [
        '192.168.1.10 - - [10/May/2025:08:00:01 +0000] "GET /index.html HTTP/1.1" 200 4523 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"',
        '192.168.1.20 - - [10/May/2025:08:01:15 +0000] "GET /api/users HTTP/1.1" 200 1234 "https://example.com/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"',
        '10.0.0.5 - - [10/May/2025:08:02:33 +0000] "POST /api/login HTTP/1.1" 401 234 "-" "curl/7.68.0"',
        '192.168.1.10 - - [10/May/2025:08:03:44 +0000] "GET /static/app.js HTTP/1.1" 200 89234 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"',
        '172.16.0.1 - - [10/May/2025:09:10:05 +0000] "GET /admin HTTP/1.1" 403 512 "-" "python-requests/2.28.0"',
        '192.168.1.30 - - [10/May/2025:09:15:22 +0000] "GET /favicon.ico HTTP/1.1" 404 0 "-" "Mozilla/5.0"',
        '192.168.1.10 - - [10/May/2025:09:20:11 +0000] "GET /api/data HTTP/1.1" 200 5678 "-" "Mozilla/5.0 (Windows NT 10.0)"',
        '10.0.0.5 - - [10/May/2025:09:25:30 +0000] "GET /index.html HTTP/1.1" 200 4523 "-" "Googlebot/2.1 (+http://www.google.com/bot.html)"',
        '192.168.1.20 - - [10/May/2025:10:00:01 +0000] "GET /blog/post-1 HTTP/1.1" 301 0 "-" "Mozilla/5.0"',
        '192.168.1.50 - - [10/May/2025:10:05:10 +0000] "GET /blog/post-1/ HTTP/1.1" 200 12345 "https://google.com/" "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0)"',
        '192.168.1.10 - - [10/May/2025:10:10:55 +0000] "DELETE /api/item/42 HTTP/1.1" 204 0 "-" "Mozilla/5.0"',
        '10.0.0.1 - - [10/May/2025:10:30:01 +0000] "GET /api/users HTTP/1.1" 500 234 "-" "Mozilla/5.0"',
        '192.168.1.30 - - [10/May/2025:11:00:05 +0000] "GET /static/style.css HTTP/1.1" 304 0 "https://example.com/" "Mozilla/5.0"',
        '172.16.0.2 - - [10/May/2025:11:05:30 +0000] "GET /api/health HTTP/1.1" 200 28 "-" "kube-probe/1.27"',
        '192.168.1.10 - - [10/May/2025:11:15:44 +0000] "GET /index.html HTTP/1.1" 200 4523 "-" "Mozilla/5.0 (X11; Linux x86_64)"',
        '192.168.1.20 - - [10/May/2025:12:00:01 +0000] "PUT /api/profile HTTP/1.1" 200 890 "-" "Mozilla/5.0"',
        '10.0.0.5 - - [10/May/2025:12:10:10 +0000] "GET /sitemap.xml HTTP/1.1" 200 34567 "-" "Bingbot/2.0"',
        '192.168.1.60 - - [10/May/2025:13:00:00 +0000] "GET /api/data HTTP/1.1" 429 88 "-" "python-requests/2.28.0"',
        '192.168.1.10 - - [10/May/2025:14:05:15 +0000] "GET /blog/post-2 HTTP/1.1" 200 9870 "https://twitter.com/" "Mozilla/5.0"',
        '172.16.0.3 - - [10/May/2025:15:30:20 +0000] "GET /index.html HTTP/1.1" 502 0 "-" "Mozilla/5.0"'
      ].join("\n");

      function parseLine(line, filterBots) {
        line = line.trim();
        if (!line) return null;

        var m = COMBINED_RE.exec(line);
        var hasCombined = !!m;
        if (!m) {
          m = COMMON_RE.exec(line);
        }
        if (!m) return null;

        var ip = m[1];
        var dateStr = m[2];
        var path = m[4];
        var status = parseInt(m[5], 10);
        var bytes = m[6] === "-" ? 0 : parseInt(m[6], 10);
        var ua = hasCombined ? m[7] : "";

        if (filterBots && ua) {
          var uaLower = ua.toLowerCase();
          for (var bi = 0; bi < BOT_PATTERNS.length; bi++) {
            if (uaLower.indexOf(BOT_PATTERNS[bi]) !== -1) return null;
          }
        }

        // Parse hour from date like "10/May/2025:08:00:01 +0000"
        var hour = -1;
        var hourMatch = /\d{2}\/\w+\/\d{4}:(\d{2})/.exec(dateStr);
        if (hourMatch) hour = parseInt(hourMatch[1], 10);

        return {
          ip: ip,
          dateStr: dateStr,
          hour: hour,
          path: path,
          status: status,
          bytes: bytes,
          ua: ua
        };
      }

      function formatBytes(b) {
        if (b < 1024) return b + " B";
        if (b < 1024 * 1024) return (b / 1024).toFixed(1) + " KB";
        if (b < 1024 * 1024 * 1024) return (b / 1024 / 1024).toFixed(2) + " MB";
        return (b / 1024 / 1024 / 1024).toFixed(2) + " GB";
      }

      function topNEntries(map, n) {
        var arr = [];
        map.forEach(function (val, key) {
          arr.push([key, val]);
        });
        arr.sort(function (a, b) {
          return b[1] - a[1];
        });
        return arr.slice(0, n);
      }

      function pct(count, total) {
        if (total === 0) return "0%";
        return ((count / total) * 100).toFixed(1) + "%";
      }

      function statusClass(code) {
        if (code >= 500) return "status-5xx";
        if (code >= 400) return "status-4xx";
        if (code >= 300) return "status-3xx";
        if (code >= 200) return "status-2xx";
        return "status-other";
      }

      function makeBarCell(count, maxVal) {
        var td = document.createElement("td");
        td.className = "bar-cell";
        var bg = document.createElement("div");
        bg.className = "bar-bg";
        bg.style.width = maxVal > 0 ? Math.max(4, (count / maxVal) * 100) + "%" : "0%";
        var txt = document.createElement("span");
        txt.className = "bar-text";
        txt.textContent = pct(count, maxVal);
        td.appendChild(bg);
        td.appendChild(txt);
        return td;
      }

      function renderTable(tbodyId, rows, total, renderKey) {
        var tbody = document.getElementById(tbodyId);
        tbody.textContent = "";
        var maxCount = rows.length > 0 ? rows[0][1] : 0;

        rows.forEach(function (rowData, i) {
          var key = rowData[0];
          var count = rowData[1];
          var tr = document.createElement("tr");

          if (tbodyId === "tableStatus") {
            var tdCode = document.createElement("td");
            var badge = document.createElement("span");
            badge.className = "status-badge " + statusClass(parseInt(key, 10));
            badge.textContent = key;
            tdCode.appendChild(badge);
            tr.appendChild(tdCode);

            var tdDesc = document.createElement("td");
            tdDesc.textContent = STATUS_DESC[parseInt(key, 10)] || "";
            tr.appendChild(tdDesc);

            var tdCount = document.createElement("td");
            tdCount.textContent = count.toLocaleString();
            tr.appendChild(tdCount);

            tr.appendChild(makeBarCell(count, total));
          } else {
            var tdRank = document.createElement("td");
            tdRank.style.color = "var(--text-muted)";
            tdRank.textContent = i + 1;
            tr.appendChild(tdRank);

            var tdKey = document.createElement("td");
            var displayKey = renderKey ? renderKey(key) : key;
            var span = document.createElement("span");
            span.className = "path-truncate";
            span.title = key;
            span.textContent = typeof displayKey === "string" ? displayKey : key;
            tdKey.appendChild(span);
            tr.appendChild(tdKey);

            var tdCountR = document.createElement("td");
            tdCountR.textContent = count.toLocaleString();
            tr.appendChild(tdCountR);

            tr.appendChild(makeBarCell(count, maxCount));
          }

          tbody.appendChild(tr);
        });
      }

      function renderTimeline(hourMap) {
        var barsEl = document.getElementById("timelineBars");
        var labelsEl = document.getElementById("timelineLabels");
        barsEl.textContent = "";
        labelsEl.textContent = "";

        var maxCount = 1;
        for (var h = 0; h < 24; h++) {
          var c = hourMap.get(h) || 0;
          if (c > maxCount) maxCount = c;
        }

        for (var hi = 0; hi < 24; hi++) {
          var cnt = hourMap.get(hi) || 0;
          var col = document.createElement("div");
          col.className = "timeline-bar-col";
          col.title = hi + ":00 — " + cnt + " 请求";

          var fill = document.createElement("div");
          fill.className = "timeline-bar-fill";
          fill.style.height = Math.max(2, (cnt / maxCount) * 100) + "%";

          col.appendChild(fill);
          barsEl.appendChild(col);
        }

        // Label at 0, 6, 12, 18, 23
        var labelPositions = [0, 6, 12, 18, 23];
        labelsEl.style.display = "flex";
        labelsEl.style.justifyContent = "space-between";
        labelPositions.forEach(function (lh) {
          var span = document.createElement("span");
          span.textContent = lh + ":00";
          labelsEl.appendChild(span);
        });
      }

      function analyze() {
        var raw = logInputEl.value;
        var lines = raw.split("\n");
        var filterBots = document.getElementById("filterBots").checked;
        var n = parseInt(document.getElementById("topN").value, 10);

        var ipMap = new Map();
        var pathMap = new Map();
        var statusMap = new Map();
        var uaMap = new Map();
        var hourMap = new Map();

        var totalReqs = 0;
        var totalBytes = 0;
        var errorReqs = 0;
        var parsedLines = 0;
        var failedLines = 0;

        lines.forEach(function (line) {
          var entry = parseLine(line, filterBots);
          if (!entry) {
            if (line.trim()) failedLines++;
            return;
          }
          parsedLines++;
          totalReqs++;
          totalBytes += entry.bytes;
          if (entry.status >= 400) errorReqs++;

          ipMap.set(entry.ip, (ipMap.get(entry.ip) || 0) + 1);
          pathMap.set(entry.path, (pathMap.get(entry.path) || 0) + 1);

          var sc = String(entry.status);
          statusMap.set(sc, (statusMap.get(sc) || 0) + 1);

          if (entry.ua) {
            var uaKey = entry.ua.slice(0, 80);
            uaMap.set(uaKey, (uaMap.get(uaKey) || 0) + 1);
          }

          if (entry.hour >= 0) {
            hourMap.set(entry.hour, (hourMap.get(entry.hour) || 0) + 1);
          }
        });

        if (parsedLines === 0) {
          showStatus("无法解析日志，请检查格式", "error");
          resultsSectionEl.classList.remove("show");
          statsEl.classList.remove("show");
          if (failedLines > 0) {
            parseErrorBoxEl.textContent =
              "共 " +
              lines.filter(function (l) {
                return l.trim();
              }).length +
              " 行，全部解析失败。请确认日志为 Nginx/Apache Combined 或 Common 格式。";
            parseErrorBoxEl.classList.add("show");
          }
          return;
        }

        parseErrorBoxEl.classList.remove("show");

        // Summary cards
        document.getElementById("sumTotalReqs").textContent = totalReqs.toLocaleString();
        document.getElementById("sumUniqueIPs").textContent = ipMap.size.toLocaleString();
        document.getElementById("sumBandwidth").textContent = formatBytes(totalBytes);
        document.getElementById("sumErrorRate").textContent =
          totalReqs > 0 ? ((errorReqs / totalReqs) * 100).toFixed(1) + "%" : "0%";
        document.getElementById("sumAvgSize").textContent =
          totalReqs > 0 ? formatBytes(Math.round(totalBytes / totalReqs)) : "0 B";
        document.getElementById("sumParsed").textContent =
          parsedLines.toLocaleString() + (failedLines > 0 ? " (" + failedLines + " 行跳过)" : "");

        // Tables
        renderTable("tableIPs", topNEntries(ipMap, n), totalReqs, null);
        renderTable("tablePaths", topNEntries(pathMap, n), totalReqs, null);

        var statusRows = [];
        statusMap.forEach(function (val, key) {
          statusRows.push([key, val]);
        });
        statusRows.sort(function (a, b) {
          return parseInt(a[0]) - parseInt(b[0]);
        });
        renderTable("tableStatus", statusRows, totalReqs, null);

        renderTable("tableUAs", topNEntries(uaMap, n), totalReqs, function (ua) {
          return ua.length > 60 ? ua.slice(0, 57) + "..." : ua;
        });

        renderTimeline(hourMap);

        // Bottom stats
        document.getElementById("statReqs").textContent = totalReqs.toLocaleString();
        document.getElementById("statIPs").textContent = ipMap.size.toLocaleString();
        document.getElementById("statBw").textContent = formatBytes(totalBytes);
        statsEl.classList.add("show");

        resultsSectionEl.classList.add("show");
        showStatus("分析完成 · " + parsedLines + " 条记录", "success");
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function buildTextReport() {
        var lines = [];
        lines.push("=== Nginx / Apache 访问日志分析报告 ===");
        lines.push("总请求数: " + document.getElementById("sumTotalReqs").textContent);
        lines.push("唯一 IP: " + document.getElementById("sumUniqueIPs").textContent);
        lines.push("总流量: " + document.getElementById("sumBandwidth").textContent);
        lines.push("错误率: " + document.getElementById("sumErrorRate").textContent);
        lines.push("平均响应大小: " + document.getElementById("sumAvgSize").textContent);
        lines.push("解析成功行: " + document.getElementById("sumParsed").textContent);
        lines.push("");

        function tableToText(tbodyId, title) {
          var tbody = document.getElementById(tbodyId);
          if (!tbody) return;
          lines.push("--- " + title + " ---");
          Array.from(tbody.querySelectorAll("tr")).forEach(function (tr) {
            var cells = Array.from(tr.querySelectorAll("td")).map(function (td) {
              var pt = td.querySelector(".path-truncate");
              return (pt || td).textContent.trim();
            });
            lines.push(cells.join(" | "));
          });
          lines.push("");
        }

        tableToText("tableIPs", "Top IP 地址");
        tableToText("tablePaths", "Top 请求路径");
        tableToText("tableStatus", "状态码分布");
        tableToText("tableUAs", "Top User-Agent");

        return lines.join("\n");
      }

      logInputEl.addEventListener("input", function () {
        var lc = logInputEl.value.split("\n").filter(function (l) {
          return l.trim();
        }).length;
        lineCountEl.textContent = lc > 0 ? lc + " 行" : "";
        lineCountEl.className = "status";
      });

      document.getElementById("btnAnalyze").onclick = analyze;

      document.getElementById("btnPaste").onclick = async function () {
        try {
          var text = await navigator.clipboard.readText();
          logInputEl.value = text;
          logInputEl.dispatchEvent(new Event("input"));
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnSample").onclick = function () {
        logInputEl.value = SAMPLE_LOG;
        logInputEl.dispatchEvent(new Event("input"));
        showStatus("已加载示例数据", "success");
      };

      document.getElementById("btnClear").onclick = function () {
        logInputEl.value = "";
        lineCountEl.textContent = "";
        lineCountEl.className = "status";
        resultsSectionEl.classList.remove("show");
        statsEl.classList.remove("show");
        parseErrorBoxEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
      };

      document.getElementById("btnCopyReport").onclick = async function () {
        if (!resultsSectionEl.classList.contains("show")) {
          showStatus("请先分析日志", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(buildTextReport());
          showStatus("报告已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          analyze();
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
    
