// @ts-nocheck
// Generated from tools/network/email-header-analyzer.html
// Source SHA-256: 699dc8c03c77013482d2d938f561f46a8aaca049ceb3d7b8ca4b824f5ab022f5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var headerInputEl = document.getElementById("headerInput");
      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");
      var resultContainer = document.getElementById("resultContainer");

      var SAMPLE_HEADER =
        "Delivered-To: user@example.com\n" +
        "Received: by 2002:a05:6602:2c4e:0:0:0:0 with SMTP id l14csp123456iol;\n" +
        "        Fri, 3 May 2024 08:12:34 -0700 (PDT)\n" +
        "Received: from mail-wr1-f42.google.com (mail-wr1-f42.google.com [209.85.221.42])\n" +
        "        by mx.example.com with ESMTPS id h4-20020adfc184000000b003567890abcdef\n" +
        "        for <user@example.com>; Fri, 3 May 2024 08:12:33 -0700 (PDT)\n" +
        "Received: from sender.mail.example.org (sender.mail.example.org [198.51.100.10])\n" +
        "        by mail-wr1-f42.google.com with ESMTPSA id d9si1234567wrx.78.2024.05.03.08.12.32\n" +
        "        for <user@example.com>; Fri, 3 May 2024 08:12:32 -0700 (PDT)\n" +
        "Authentication-Results: mx.google.com;\n" +
        "       dkim=pass header.i=@example.org header.s=selector1 header.b=AbCdEfGh;\n" +
        "       spf=pass (google.com: domain of sender@example.org designates 198.51.100.10 as permitted sender) smtp.mailfrom=sender@example.org;\n" +
        "       dmarc=pass (p=QUARANTINE sp=QUARANTINE dis=NONE) header.from=example.org\n" +
        "DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;\n" +
        "        d=example.org; s=selector1;\n" +
        "        h=from:to:subject:date:message-id;\n" +
        "        bh=AbCdEfGhIjKlMnOpQrStUvWxYz0123456789==;\n" +
        "        b=AbCdEfGhIjKlMnOpQrStUvWxYz0123456789AbCdEfGhIj==\n" +
        "X-Spam-Status: No, score=-2.1 required=5.0\n" +
        "Return-Path: <sender@example.org>\n" +
        "From: Alice Sender <sender@example.org>\n" +
        "To: user@example.com\n" +
        "Subject: Hello from WebUtils\n" +
        "Date: Fri, 3 May 2024 15:12:28 +0000\n" +
        "Message-ID: <20240503151228.1234.1@example.org>\n" +
        "MIME-Version: 1.0\n" +
        "Content-Type: text/plain; charset=UTF-8\n";

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function parseHeaders(raw) {
        var lines = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
        var headers = [];
        var current = null;
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          if (line === "") {
            if (current) {
              headers.push(current);
              current = null;
            }
            continue;
          }
          if (/^[ \t]/.test(line)) {
            if (current) {
              current.value += " " + line.trim();
            }
          } else {
            if (current) headers.push(current);
            var colon = line.indexOf(":");
            if (colon > 0) {
              current = {
                name: line.slice(0, colon).trim(),
                value: line.slice(colon + 1).trim()
              };
            } else {
              current = null;
            }
          }
        }
        if (current) headers.push(current);
        return headers;
      }

      function parseReceivedHeader(val) {
        var result = { from: "", by: "", via: "", with: "", for: "", time: null };
        var fromMatch = val.match(/from\s+([^\s(]+(?:\s+\([^)]+\))?)/i);
        if (fromMatch) result.from = fromMatch[1].trim();
        var byMatch = val.match(/by\s+([^\s(]+(?:\s+\([^)]+\))?)/i);
        if (byMatch) result.by = byMatch[1].trim();
        var viaMatch = val.match(/via\s+(\S+)/i);
        if (viaMatch) result.via = viaMatch[1];
        var withMatch = val.match(/with\s+(\S+)/i);
        if (withMatch) result.with = withMatch[1];
        var forMatch = val.match(/for\s+(<[^>]+>|[^\s;]+)/i);
        if (forMatch) result.for = forMatch[1];
        var semicolonIdx = val.lastIndexOf(";");
        if (semicolonIdx !== -1) {
          var dateStr = val.slice(semicolonIdx + 1).trim();
          var parsed = new Date(dateStr);
          if (!isNaN(parsed.getTime())) result.time = parsed;
        }
        return result;
      }

      function parseAuthResults(val) {
        var results = [];
        var protocols = ["dkim", "spf", "dmarc", "arc", "bimi"];
        protocols.forEach(function (proto) {
          var rx = new RegExp(proto + "\\s*=\\s*(\\S+)", "gi");
          var match = rx.exec(val);
          if (match) {
            var status = match[1].replace(/;$/, "").toLowerCase();
            var detail = "";
            var detailRx = new RegExp(
              proto + "[^;]*(?:header\\.i|smtp\\.mailfrom|header\\.from|problem|reason)=([^\\s;]+)",
              "i"
            );
            var dm = val.match(detailRx);
            if (dm) detail = dm[1];
            results.push({ protocol: proto.toUpperCase(), status: status, detail: detail });
          }
        });
        return results;
      }

      function parseDkimSignature(val) {
        var fields = {};
        val.split(/;\s*/).forEach(function (part) {
          var eq = part.indexOf("=");
          if (eq > 0) {
            var k = part.slice(0, eq).trim();
            var v = part.slice(eq + 1).trim();
            fields[k] = v;
          }
        });
        return fields;
      }

      function formatDelay(ms) {
        if (ms < 0) return "未知";
        if (ms < 1000) return ms + " ms";
        if (ms < 60000) return (ms / 1000).toFixed(1) + " s";
        if (ms < 3600000) return (ms / 60000).toFixed(1) + " min";
        return (ms / 3600000).toFixed(1) + " h";
      }

      function escapeHtml(str) {
        return String(str)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      }

      function buildSummarySection(headers) {
        var keyFields = [
          "From",
          "To",
          "Cc",
          "Subject",
          "Date",
          "Message-ID",
          "Return-Path",
          "Reply-To",
          "X-Mailer",
          "User-Agent",
          "X-Originating-IP",
          "X-Spam-Status",
          "X-Spam-Score"
        ];
        var items = [];
        keyFields.forEach(function (name) {
          var found = headers.find(function (h) {
            return h.name.toLowerCase() === name.toLowerCase();
          });
          if (found) {
            items.push({ label: name, value: found.value });
          }
        });
        if (!items.length) return "";
        var html =
          '<div class="result-section"><div class="result-section-title">📋 摘要</div>' +
          '<div class="result-section-body"><div class="summary-grid">';
        items.forEach(function (item) {
          html +=
            '<div class="summary-item"><div class="summary-item-label">' +
            escapeHtml(item.label) +
            '</div><div class="summary-item-value">' +
            escapeHtml(item.value) +
            "</div></div>";
        });
        html += "</div></div></div>";
        return html;
      }

      function buildReceivedSection(receivedHeaders) {
        if (!receivedHeaders.length) return "";
        var hops = receivedHeaders
          .map(function (h) {
            return parseReceivedHeader(h.value);
          })
          .reverse();
        var html =
          '<div class="result-section"><div class="result-section-title">🛤️ Received 路由链路</div>' +
          '<div class="result-section-body"><div class="received-chain">';
        hops.forEach(function (hop, idx) {
          var delayClass = "";
          var delayStr = "";
          if (idx > 0 && hops[idx - 1].time && hop.time) {
            var ms = hop.time - hops[idx - 1].time;
            delayStr = formatDelay(ms);
            delayClass = ms < 5000 ? "fast" : ms > 30000 ? "slow" : "";
          }
          html += '<div class="received-hop">';
          html += '<div class="hop-number">' + (idx + 1) + "</div>";
          html += '<div class="hop-details">';
          if (hop.from)
            html += '<div class="hop-from"><span>from</span>' + escapeHtml(hop.from) + "</div>";
          if (hop.by) html += '<div class="hop-by"><span>by</span>' + escapeHtml(hop.by) + "</div>";
          if (hop.with)
            html += '<div class="hop-from"><span>with</span>' + escapeHtml(hop.with) + "</div>";
          if (hop.time)
            html +=
              '<div class="hop-time"><span>时间</span>' +
              escapeHtml(hop.time.toUTCString()) +
              "</div>";
          if (delayStr)
            html +=
              '<div class="hop-delay ' +
              delayClass +
              '"><span>延迟</span>' +
              escapeHtml(delayStr) +
              "</div>";
          html += "</div></div>";
        });
        html += "</div></div></div>";
        return html;
      }

      function buildAuthSection(headers) {
        var authHeaders = headers.filter(function (h) {
          return (
            h.name.toLowerCase() === "authentication-results" ||
            h.name.toLowerCase() === "arc-authentication-results"
          );
        });
        if (!authHeaders.length) return "";
        var allResults = [];
        authHeaders.forEach(function (h) {
          var results = parseAuthResults(h.value);
          results.forEach(function (r) {
            var exists = allResults.some(function (e) {
              return e.protocol === r.protocol;
            });
            if (!exists) {
              allResults.push(r);
            }
          });
        });
        if (!allResults.length) return "";
        var html =
          '<div class="result-section"><div class="result-section-title">🔐 认证结果（SPF / DKIM / DMARC）</div>' +
          '<div class="result-section-body">';
        var validStatuses = ["pass", "fail", "none", "neutral", "softfail"];
        allResults.forEach(function (r) {
          var badgeClass = validStatuses.includes(r.status) ? r.status : "neutral";
          html +=
            '<div class="auth-result"><span class="auth-name">' +
            escapeHtml(r.protocol) +
            '</span><span class="auth-badge ' +
            badgeClass +
            '">' +
            escapeHtml(r.status) +
            "</span>";
          if (r.detail) html += '<span class="auth-detail">' + escapeHtml(r.detail) + "</span>";
          html += "</div>";
        });
        html += "</div></div>";
        return html;
      }

      function buildDkimSection(headers) {
        var dkimHeaders = headers.filter(function (h) {
          return h.name.toLowerCase() === "dkim-signature";
        });
        if (!dkimHeaders.length) return "";
        var html =
          '<div class="result-section"><div class="result-section-title">✍️ DKIM 签名</div>' +
          '<div class="result-section-body">';
        dkimHeaders.forEach(function (h) {
          var fields = parseDkimSignature(h.value);
          html += '<table class="header-table">';
          var show = [
            ["d", "签名域名"],
            ["s", "选择器"],
            ["a", "算法"],
            ["c", "规范化"],
            ["h", "签名字段"],
            ["bh", "正文哈希（前20字符）"]
          ];
          show.forEach(function (pair) {
            if (fields[pair[0]]) {
              var v = fields[pair[0]];
              if (pair[0] === "bh") v = v.slice(0, 20) + "…";
              html += "<tr><td>" + escapeHtml(pair[1]) + "</td><td>" + escapeHtml(v) + "</td></tr>";
            }
          });
          html += "</table>";
        });
        html += "</div></div>";
        return html;
      }

      function buildAllHeadersSection(headers) {
        var html =
          '<div class="result-section"><div class="result-section-title">📄 全部字段</div>' +
          '<div class="result-section-body"><table class="header-table">';
        headers.forEach(function (h) {
          html +=
            "<tr><td>" + escapeHtml(h.name) + "</td><td>" + escapeHtml(h.value) + "</td></tr>";
        });
        html += "</table></div></div>";
        return html;
      }

      function analyze() {
        var raw = headerInputEl.value.trim();
        if (!raw) {
          showStatus("请粘贴邮件头内容", "error");
          return;
        }
        var headers = parseHeaders(raw);
        if (!headers.length) {
          showStatus("未能识别有效的邮件头", "error");
          resultContainer.innerHTML =
            '<div class="empty-state"><div class="empty-icon">⚠️</div>' +
            "<div>无法解析邮件头，请检查格式</div></div>";
          return;
        }

        var receivedHeaders = headers.filter(function (h) {
          return h.name.toLowerCase() === "received";
        });

        var hops = receivedHeaders
          .map(function (h) {
            return parseReceivedHeader(h.value);
          })
          .reverse();

        var totalDelay = "-";
        if (hops.length >= 2 && hops[0].time && hops[hops.length - 1].time) {
          var ms = hops[hops.length - 1].time - hops[0].time;
          if (ms >= 0) totalDelay = formatDelay(ms);
        }

        document.getElementById("statHops").textContent = receivedHeaders.length;
        document.getElementById("statHeaders").textContent = headers.length;
        document.getElementById("statDelay").textContent = totalDelay;
        statsEl.classList.add("show");

        var html =
          '<div class="result-sections">' +
          buildSummarySection(headers) +
          buildAuthSection(headers) +
          buildReceivedSection(receivedHeaders) +
          buildDkimSection(headers) +
          buildAllHeadersSection(headers) +
          "</div>";

        resultContainer.innerHTML = html;
        showStatus(
          "分析完成：" + headers.length + " 个字段，" + receivedHeaders.length + " 跳路由",
          "success"
        );
      }

      document.getElementById("btnPaste").onclick = async function () {
        try {
          var text = await navigator.clipboard.readText();
          headerInputEl.value = text;
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板，请手动粘贴", "error");
        }
      };

      document.getElementById("btnAnalyze").onclick = analyze;

      document.getElementById("btnClear").onclick = function () {
        headerInputEl.value = "";
        resultContainer.innerHTML =
          '<div class="empty-state"><div class="empty-icon">📬</div>' +
          "<div>粘贴邮件头后点击「分析」</div></div>";
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
      };

      document.getElementById("btnSample").onclick = function () {
        headerInputEl.value = SAMPLE_HEADER;
        showStatus("已加载示例邮件头", "success");
        analyze();
      };

      document.getElementById("btnCopyResult").onclick = async function () {
        var tables = resultContainer.querySelectorAll(".header-table");
        if (!tables.length) {
          showStatus("没有可复制的结果", "error");
          return;
        }
        var lines = [];
        tables.forEach(function (table) {
          var rows = table.querySelectorAll("tr");
          rows.forEach(function (row) {
            var cells = row.querySelectorAll("td");
            if (cells.length === 2) {
              lines.push(cells[0].textContent.trim() + ": " + cells[1].textContent.trim());
            }
          });
          lines.push("");
        });
        try {
          await navigator.clipboard.writeText(lines.join("\n"));
          showStatus("结果已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      headerInputEl.addEventListener("keydown", function (e) {
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
    
