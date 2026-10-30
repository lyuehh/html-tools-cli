// @ts-nocheck
// Generated from tools/dev/har-viewer.html
// Source SHA-256: 38c0964c1e1d80739c289057a87c8f1bd86e883b3b34fe219e4b5c699893f48f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var harData = null;
      var allEntries = [];
      var filteredEntries = [];
      var selectedRow = null;
      var activeTypeFilter = "all";
      var totalTimelineMs = 0;

      var dropZone = document.getElementById("dropZone");
      var fileInput = document.getElementById("fileInput");
      var harContent = document.getElementById("harContent");
      var waterfallList = document.getElementById("waterfallList");
      var detailPanel = document.getElementById("detailPanel");
      var filterInput = document.getElementById("filterInput");
      var statusEl = document.getElementById("statusEl");
      var statsEl = document.getElementById("statsEl");

      dropZone.addEventListener("click", function () {
        fileInput.click();
      });
      dropZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropZone.classList.add("drag-over");
      });
      dropZone.addEventListener("dragleave", function () {
        dropZone.classList.remove("drag-over");
      });
      dropZone.addEventListener("drop", function (e) {
        e.preventDefault();
        dropZone.classList.remove("drag-over");
        var files = e.dataTransfer.files;
        if (files.length > 0) loadFile(files[0]);
      });
      fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) loadFile(fileInput.files[0]);
      });

      function loadFile(file) {
        var reader = new FileReader();
        reader.onload = function (e) {
          try {
            var parsed = JSON.parse(e.target.result);
            harData = parsed;
            processHar(parsed);
          } catch (err) {
            alert("无法解析 HAR 文件：" + err.message);
          }
        };
        reader.readAsText(file);
      }

      function processHar(har) {
        var log = har.log;
        if (!log || !log.entries) {
          alert("不是有效的 HAR 文件（缺少 log.entries）");
          return;
        }
        allEntries = log.entries;
        computeTimeline();
        updateSummary();
        dropZone.style.display = "none";
        harContent.classList.add("show");
        applyFilters();
      }

      function computeTimeline() {
        if (allEntries.length === 0) return;
        var startTimes = allEntries.map(function (e) {
          return new Date(e.startedDateTime).getTime();
        });
        var minStart = Math.min.apply(null, startTimes);
        var maxEnd = 0;
        allEntries.forEach(function (e) {
          var startMs = new Date(e.startedDateTime).getTime();
          var endMs = startMs + (e.time || 0);
          if (endMs > maxEnd) maxEnd = endMs;
          e._startOffset = startMs - minStart;
        });
        totalTimelineMs = maxEnd - minStart;
      }

      function formatSize(bytes) {
        if (!bytes || bytes < 0) return "—";
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
      }

      function formatTime(ms) {
        if (ms === undefined || ms === null || ms < 0) return "—";
        if (ms < 1000) return Math.round(ms) + "ms";
        return (ms / 1000).toFixed(2) + "s";
      }

      function updateSummary() {
        var totalTransfer = 0;
        var totalTime = 0;
        var errors = 0;
        var slow = 0;
        allEntries.forEach(function (e) {
          var body = (e.response && e.response.content && e.response.content.size) || 0;
          var hdr = (e.response && e.response.headersSize) || 0;
          totalTransfer += Math.max(body, 0) + Math.max(hdr, 0);
          totalTime += e.time || 0;
          var status = e.response && e.response.status;
          if (status >= 400 || status === 0) errors++;
          if ((e.time || 0) > 1000) slow++;
        });
        document.getElementById("sumRequests").textContent = allEntries.length;
        document.getElementById("sumDuration").textContent = formatTime(totalTimelineMs);
        document.getElementById("sumTransfer").textContent = formatSize(totalTransfer);
        document.getElementById("sumErrors").textContent = errors;
        document.getElementById("sumAvgTime").textContent =
          allEntries.length > 0 ? formatTime(totalTime / allEntries.length) : "—";
        document.getElementById("sumSlowReqs").textContent = slow;
      }

      function getEntryType(entry) {
        var mimeType =
          (entry.response && entry.response.content && entry.response.content.mimeType) || "";
        var resourceType = entry._resourceType || "";
        if (resourceType) {
          if (/xhr|fetch/.test(resourceType)) return "xhr";
          if (/document/.test(resourceType)) return "document";
          if (/script/.test(resourceType)) return "script";
          if (/stylesheet/.test(resourceType)) return "stylesheet";
          if (/image/.test(resourceType)) return "image";
          if (/font/.test(resourceType)) return "font";
        }
        if (/javascript/.test(mimeType)) return "script";
        if (/css/.test(mimeType)) return "stylesheet";
        if (/image/.test(mimeType)) return "image";
        if (/font/.test(mimeType)) return "font";
        if (/html/.test(mimeType)) return "document";
        if (/json|xml/.test(mimeType)) return "xhr";
        return "other";
      }

      function getHostname(url) {
        try {
          return new URL(url).hostname;
        } catch (e) {
          return url.split("/")[0] || url;
        }
      }

      function getPathname(url) {
        try {
          var u = new URL(url);
          return u.pathname + u.search;
        } catch (e) {
          return url;
        }
      }

      function applyFilters() {
        var query = filterInput.value.toLowerCase();
        filteredEntries = allEntries.filter(function (e) {
          var url = (e.request && e.request.url) || "";
          if (query && !url.toLowerCase().includes(query)) return false;
          if (activeTypeFilter !== "all" && getEntryType(e) !== activeTypeFilter) return false;
          return true;
        });
        renderWaterfall();
      }

      function renderWaterfall() {
        waterfallList.innerHTML = "";
        var frag = document.createDocumentFragment();
        filteredEntries.forEach(function (entry, idx) {
          var row = buildRow(entry, idx + 1);
          frag.appendChild(row);
        });
        waterfallList.appendChild(frag);
        document.getElementById("statVisible").textContent = filteredEntries.length;
        document.getElementById("statTotal").textContent = allEntries.length;
        statsEl.classList.add("show");
        showStatus(filteredEntries.length + " 条请求", "");
        selectedRow = null;
        detailPanel.classList.remove("show");
      }

      function buildRow(entry, num) {
        var url = (entry.request && entry.request.url) || "";
        var method = (entry.request && entry.request.method) || "GET";
        var status = (entry.response && entry.response.status) || 0;
        var size = (entry.response && entry.response.content && entry.response.content.size) || 0;
        var time = entry.time || 0;

        var row = document.createElement("div");
        row.className = "waterfall-row";

        var colNum = document.createElement("span");
        colNum.className = "wf-col";
        colNum.style.color = "var(--text-muted)";
        colNum.textContent = num;

        var colMethod = document.createElement("span");
        colMethod.className = "wf-col method " + getMethodClass(method);
        colMethod.textContent = method;

        var colHost = document.createElement("span");
        colHost.className = "wf-col";
        colHost.title = getHostname(url);
        colHost.textContent = getHostname(url);

        var colUrl = document.createElement("div");
        colUrl.className = "waterfall-bar-cell";
        colUrl.style.position = "relative";

        var urlText = document.createElement("span");
        urlText.className = "wf-col";
        urlText.style.cssText =
          "position:absolute;top:0;left:0;right:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:4px;font-size:0.75rem;";
        urlText.textContent = getPathname(url);
        urlText.title = url;

        var barWrapper = document.createElement("div");
        barWrapper.style.cssText =
          "position:absolute;bottom:0;left:0;right:0;height:8px;background:var(--color-bg-subtle);border-radius:4px;overflow:hidden;";

        if (totalTimelineMs > 0) {
          var bar = document.createElement("div");
          bar.className = "waterfall-bar" + (time > 3000 ? " slow" : time > 1000 ? " medium" : "");
          var leftPct = ((entry._startOffset || 0) / totalTimelineMs) * 100;
          var widthPct = (time / totalTimelineMs) * 100;
          bar.style.left = leftPct + "%";
          bar.style.width = Math.max(widthPct, 0.5) + "%";
          barWrapper.appendChild(bar);
        }

        colUrl.appendChild(urlText);
        colUrl.appendChild(barWrapper);

        var colStatus = document.createElement("span");
        colStatus.className = "wf-col status-badge " + getStatusClass(status);
        colStatus.textContent = status || "—";

        var colSize = document.createElement("span");
        colSize.className = "wf-col";
        colSize.textContent = formatSize(size);

        var colTime = document.createElement("span");
        colTime.className = "wf-col";
        colTime.style.color =
          time > 3000
            ? "var(--accent-red)"
            : time > 1000
              ? "var(--accent-yellow)"
              : "var(--color-text-secondary)";
        colTime.textContent = formatTime(time);

        row.appendChild(colNum);
        row.appendChild(colMethod);
        row.appendChild(colHost);
        row.appendChild(colUrl);
        row.appendChild(colStatus);
        row.appendChild(colSize);
        row.appendChild(colTime);

        row.addEventListener("click", function () {
          if (selectedRow) selectedRow.classList.remove("selected");
          row.classList.add("selected");
          selectedRow = row;
          showDetail(entry);
        });

        return row;
      }

      function getMethodClass(method) {
        var m = (method || "").toUpperCase();
        if (m === "GET") return "method-get";
        if (m === "POST") return "method-post";
        if (m === "PUT") return "method-put";
        if (m === "DELETE") return "method-delete";
        if (m === "PATCH") return "method-patch";
        return "method-other";
      }

      function getStatusClass(status) {
        if (status >= 200 && status < 300) return "status-2xx";
        if (status >= 300 && status < 400) return "status-3xx";
        if (status >= 400 && status < 500) return "status-4xx";
        if (status >= 500) return "status-5xx";
        return "status-other";
      }

      function showDetail(entry) {
        detailPanel.classList.add("show");

        var url = (entry.request && entry.request.url) || "";
        var method = (entry.request && entry.request.method) || "";
        var status = (entry.response && entry.response.status) || 0;
        var statusText = (entry.response && entry.response.statusText) || "";
        var size = (entry.response && entry.response.content && entry.response.content.size) || 0;
        var mimeType =
          (entry.response && entry.response.content && entry.response.content.mimeType) || "";

        var paneGeneral = document.getElementById("paneGeneral");
        paneGeneral.innerHTML = "";
        var generalGrid = document.createElement("div");
        generalGrid.className = "general-info";
        var generalItems = [
          ["URL", url],
          ["方法", method],
          ["状态", status + (statusText ? " " + statusText : "")],
          ["MIME 类型", mimeType || "—"],
          ["响应大小", formatSize(size)],
          ["耗时", formatTime(entry.time)],
          ["开始时间", entry.startedDateTime || "—"],
          ["启动偏移", formatTime(entry._startOffset)]
        ];
        generalItems.forEach(function (item) {
          var infoRow = document.createElement("div");
          infoRow.className = "info-row";
          var k = document.createElement("span");
          k.className = "info-key";
          k.textContent = item[0];
          var v = document.createElement("span");
          v.className = "info-val";
          v.textContent = item[1];
          infoRow.appendChild(k);
          infoRow.appendChild(v);
          generalGrid.appendChild(infoRow);
        });
        paneGeneral.appendChild(generalGrid);

        renderHeaderTable(
          document.getElementById("paneReqHeaders"),
          entry.request && entry.request.headers
        );
        renderHeaderTable(
          document.getElementById("paneResHeaders"),
          entry.response && entry.response.headers
        );
        renderTiming(document.getElementById("paneTiming"), entry.timings, entry.time);
        renderResponseBody(
          document.getElementById("paneResponse"),
          entry.response && entry.response.content
        );
      }

      function renderHeaderTable(container, headers) {
        container.innerHTML = "";
        if (!headers || headers.length === 0) {
          container.textContent = "无头信息";
          return;
        }
        var table = document.createElement("table");
        table.className = "header-table";
        headers.forEach(function (h) {
          var tr = document.createElement("tr");
          var td1 = document.createElement("td");
          td1.textContent = h.name;
          var td2 = document.createElement("td");
          td2.textContent = h.value;
          tr.appendChild(td1);
          tr.appendChild(td2);
          table.appendChild(tr);
        });
        container.appendChild(table);
      }

      function renderTiming(container, timings, total) {
        container.innerHTML = "";
        if (!timings) {
          container.textContent = "无耗时信息";
          return;
        }
        var timingColors = {
          blocked: "#8888a0",
          dns: "#4cc9f0",
          connect: "#fbbf24",
          ssl: "#f72585",
          send: "#10b981",
          wait: "#00f5d4",
          receive: "#7b2cbf"
        };
        var timingLabels = {
          blocked: "等待/阻塞",
          dns: "DNS 查询",
          connect: "TCP 连接",
          ssl: "TLS/SSL",
          send: "发送请求",
          wait: "等待响应 (TTFB)",
          receive: "接收数据"
        };
        var allTotal = total || 1;
        var barsDiv = document.createElement("div");
        barsDiv.className = "timing-bars";
        Object.keys(timingLabels).forEach(function (key) {
          var val = timings[key];
          if (val === undefined || val === null || val < 0) return;
          var rowDiv = document.createElement("div");
          rowDiv.className = "timing-row";
          var label = document.createElement("span");
          label.className = "timing-label";
          label.textContent = timingLabels[key];
          var track = document.createElement("div");
          track.className = "timing-track";
          var fill = document.createElement("div");
          fill.className = "timing-fill";
          fill.style.background = timingColors[key] || "#00f5d4";
          fill.style.width = Math.min((val / allTotal) * 100, 100) + "%";
          track.appendChild(fill);
          var valSpan = document.createElement("span");
          valSpan.className = "timing-value";
          valSpan.textContent = formatTime(val);
          rowDiv.appendChild(label);
          rowDiv.appendChild(track);
          rowDiv.appendChild(valSpan);
          barsDiv.appendChild(rowDiv);
        });
        container.appendChild(barsDiv);
      }

      function renderResponseBody(container, content) {
        container.innerHTML = "";
        if (!content) {
          container.textContent = "无响应体数据";
          return;
        }
        var text = content.text || "";
        if (!text) {
          var notice = document.createElement("div");
          notice.style.color = "var(--text-muted)";
          notice.style.fontFamily = "var(--font-mono)";
          notice.style.fontSize = "0.8125rem";
          notice.textContent = "响应体为空或未捕获（大小: " + formatSize(content.size) + "）";
          container.appendChild(notice);
          return;
        }
        var mimeType = content.mimeType || "";
        var displayText = text;
        if (/json/.test(mimeType)) {
          try {
            displayText = JSON.stringify(JSON.parse(text), null, 2);
          } catch (e) {
            displayText = text;
          }
        }
        var pre = document.createElement("div");
        pre.className = "response-body";
        pre.textContent = displayText.slice(0, 20000) + (displayText.length > 20000 ? "\n..." : "");
        container.appendChild(pre);
      }

      document.querySelectorAll(".detail-tab").forEach(function (tab) {
        tab.addEventListener("click", function () {
          document.querySelectorAll(".detail-tab").forEach(function (t) {
            t.classList.remove("active");
          });
          document.querySelectorAll(".detail-pane").forEach(function (p) {
            p.classList.remove("active");
          });
          tab.classList.add("active");
          var paneId = "pane" + tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1);
          var pane = document.getElementById(paneId);
          if (pane) pane.classList.add("active");
        });
      });

      document.querySelectorAll(".type-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          document.querySelectorAll(".type-btn").forEach(function (b) {
            b.classList.remove("active");
          });
          btn.classList.add("active");
          activeTypeFilter = btn.dataset.type;
          applyFilters();
        });
      });

      filterInput.addEventListener("input", function () {
        applyFilters();
      });

      document.getElementById("btnReset").addEventListener("click", function () {
        harData = null;
        allEntries = [];
        filteredEntries = [];
        selectedRow = null;
        totalTimelineMs = 0;
        harContent.classList.remove("show");
        detailPanel.classList.remove("show");
        dropZone.style.display = "";
        fileInput.value = "";
        filterInput.value = "";
        document.querySelectorAll(".type-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        document.querySelector('.type-btn[data-type="all"]').classList.add("active");
        activeTypeFilter = "all";
        statusEl.textContent = "";
        statusEl.className = "status";
        statsEl.classList.remove("show");
      });

      document.getElementById("btnExportFiltered").addEventListener("click", function () {
        if (filteredEntries.length === 0) {
          showStatus("没有可导出的数据", "error");
          return;
        }
        var exportHar = {
          log: {
            version: (harData && harData.log && harData.log.version) || "1.2",
            creator: { name: "HAR Viewer", version: "1.0" },
            entries: filteredEntries
          }
        };
        var blob = new Blob([JSON.stringify(exportHar, null, 2)], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "filtered-export.har";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showStatus("已导出 " + filteredEntries.length + " 条请求", "success");
      });

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

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
    
