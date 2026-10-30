// @ts-nocheck
// Generated from tools/data/data-importer.html
// Source SHA-256: c789cebed2f7a7f76e237c707dadccc2e1a454652e9cdee26fe6bdbf6c68e3f6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "data-importer-data";
      var parsedData = null;
      var detectedFormat = null;

      function toggleTheme() {
        var body = document.body;
        var isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      (function () {
        var saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      function detectAndParse(text) {
        text = text.trim();
        if (!text) return null;

        if (text.charAt(0) === "[" || text.charAt(0) === "{") {
          try {
            var data = JSON.parse(text);
            if (!Array.isArray(data)) {
              data = [data];
            }
            detectedFormat = "json";
            return data;
          } catch (e) {
            // Not valid JSON, try CSV
          }
        }

        var lines = text.split("\n").filter(function (l) {
          return l.trim();
        });
        if (lines.length < 1) return null;

        var headers = lines[0].split(",").map(function (h) {
          return h.trim();
        });
        var rows = [];

        for (var i = 1; i < lines.length; i++) {
          var values = lines[i].split(",").map(function (v) {
            return v.trim();
          });
          var row = {};
          for (var j = 0; j < headers.length; j++) {
            row[headers[j]] = values[j] || "";
          }
          rows.push(row);
        }

        if (rows.length > 0) {
          detectedFormat = "csv";
          return rows;
        }

        return null;
      }

      function parseData() {
        var input = document.getElementById("inputData").value;
        parsedData = detectAndParse(input);

        var badge = document.getElementById("formatBadge");

        if (!parsedData || parsedData.length === 0) {
          badge.textContent = "解析失败";
          badge.className = "format-badge unknown";
          showToast("无法解析数据", "error");
          return;
        }

        badge.textContent = detectedFormat.toUpperCase();
        badge.className = "format-badge " + detectedFormat;

        var headers = Object.keys(parsedData[0]);

        document.getElementById("rowCount").textContent = parsedData.length;
        document.getElementById("colCount").textContent = headers.length;
        document.getElementById("fieldNames").textContent =
          headers.slice(0, 5).join(", ") + (headers.length > 5 ? "..." : "");
        document.getElementById("infoBar").style.display = "flex";

        renderTable(parsedData, headers);
        saveToStorage();
        showToast("解析成功，检测到 " + detectedFormat.toUpperCase() + " 格式");
      }

      function renderTable(data, headers) {
        var wrapper = document.getElementById("tableWrapper");
        wrapper.textContent = "";

        if (data.length === 0) {
          var emptyDiv = document.createElement("div");
          emptyDiv.className = "empty-state";
          emptyDiv.textContent = "无数据";
          wrapper.appendChild(emptyDiv);
          return;
        }

        var table = document.createElement("table");
        table.className = "data-table";

        var thead = document.createElement("thead");
        var headerRow = document.createElement("tr");
        headers.forEach(function (h) {
          var th = document.createElement("th");
          th.textContent = h;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");
        data.forEach(function (row) {
          var tr = document.createElement("tr");
          headers.forEach(function (h) {
            var td = document.createElement("td");
            td.textContent = String(row[h] || "");
            td.title = String(row[h] || "");
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        wrapper.appendChild(table);
      }

      function convertToFormat(data, format) {
        if (!data || data.length === 0) return "";

        var headers = Object.keys(data[0]);

        if (format === "json") {
          return JSON.stringify(data, null, 2);
        } else {
          var lines = [headers.join(",")];
          data.forEach(function (row) {
            var values = headers.map(function (h) {
              var val = String(row[h] || "");
              if (val.indexOf(",") !== -1 || val.indexOf('"') !== -1 || val.indexOf("\n") !== -1) {
                val = '"' + val.replace(/"/g, '""') + '"';
              }
              return val;
            });
            lines.push(values.join(","));
          });
          return lines.join("\n");
        }
      }

      function convertAndCopy() {
        if (!parsedData || parsedData.length === 0) {
          showToast("请先解析数据", "error");
          return;
        }

        var format = document.getElementById("convertFormat").value;
        var output = convertToFormat(parsedData, format);

        navigator.clipboard
          .writeText(output)
          .then(function () {
            showToast("已复制 " + format.toUpperCase() + " 格式");
          })
          .catch(function () {
            showToast("复制失败", "error");
          });
      }

      function downloadConverted() {
        if (!parsedData || parsedData.length === 0) {
          showToast("请先解析数据", "error");
          return;
        }

        var format = document.getElementById("convertFormat").value;
        var output = convertToFormat(parsedData, format);

        var ext = format === "json" ? "json" : "csv";
        var mime = format === "json" ? "application/json" : "text/csv";

        var blob = new Blob([output], { type: mime + ";charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "data." + ext;
        a.click();
        URL.revokeObjectURL(url);

        showToast("已下载");
      }

      function pasteFromClipboard() {
        navigator.clipboard
          .readText()
          .then(function (text) {
            document.getElementById("inputData").value = text;
            parseData();
          })
          .catch(function () {
            showToast("无法访问剪贴板", "error");
          });
      }

      function loadSample() {
        document.getElementById("inputData").value =
          '[\n  {"id": 1, "name": "Alice", "email": "alice@example.com", "age": 30},\n  {"id": 2, "name": "Bob", "email": "bob@example.com", "age": 25},\n  {"id": 3, "name": "Charlie", "email": "charlie@example.com", "age": 35},\n  {"id": 4, "name": "Diana", "email": "diana@example.com", "age": 28}\n]';
        parseData();
      }

      function clearAll() {
        document.getElementById("inputData").value = "";
        var wrapper = document.getElementById("tableWrapper");
        wrapper.textContent = "";
        var emptyDiv = document.createElement("div");
        emptyDiv.className = "empty-state";
        emptyDiv.textContent = "粘贴数据后点击解析";
        wrapper.appendChild(emptyDiv);

        document.getElementById("infoBar").style.display = "none";
        var badge = document.getElementById("formatBadge");
        badge.textContent = "未检测";
        badge.className = "format-badge unknown";

        parsedData = null;
        detectedFormat = null;
        localStorage.removeItem(LS_KEY);
        showToast("已清空");
      }

      function saveToStorage() {
        var data = {
          input: document.getElementById("inputData").value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (!saved) return;

        try {
          var data = JSON.parse(saved);
          if (data.input) {
            document.getElementById("inputData").value = data.input;
          }
        } catch (e) {
          // ignore
        }
      }

      function showToast(msg, type) {
        type = type || "success";
        var toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.className = "toast" + (type === "error" ? " error" : "");
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      document.addEventListener("DOMContentLoaded", function () {
        loadFromStorage();

        document.getElementById("inputData").addEventListener("input", saveToStorage);
      });
    
