// @ts-nocheck
// Generated from tools/data/data-exporter.html
// Source SHA-256: 18c87fd647c93fbfdc48c1921f0dbcca2c1222fcc6a7c6ad17654b7645f8b10a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "data-exporter-data";
      var currentOutputFormat = "csv";
      var parsedData = null;

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

      function detectFormat() {
        var format = document.getElementById("inputFormat").value;
        var hint = document.getElementById("formatHint");
        if (format === "auto") {
          hint.textContent = "自动检测输入格式";
        } else if (format === "json") {
          hint.textContent = "输入 JSON 数组格式数据";
        } else {
          hint.textContent = "输入 CSV 格式数据（第一行为表头）";
        }
      }

      function parseInput(text) {
        var format = document.getElementById("inputFormat").value;
        text = text.trim();

        if (!text) return null;

        if (format === "auto") {
          if (text.charAt(0) === "[" || text.charAt(0) === "{") {
            format = "json";
          } else {
            format = "csv";
          }
        }

        if (format === "json") {
          try {
            var data = JSON.parse(text);
            if (!Array.isArray(data)) {
              data = [data];
            }
            return data;
          } catch (e) {
            showToast("JSON 解析失败: " + e.message, "error");
            return null;
          }
        } else {
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

          return rows;
        }
      }

      function selectFormat(format) {
        currentOutputFormat = format;

        document.querySelectorAll(".format-tab").forEach(function (tab) {
          tab.classList.remove("active");
          if (tab.getAttribute("data-format") === format) {
            tab.classList.add("active");
          }
        });

        document.getElementById("currentFormat").textContent = format.toUpperCase();

        if (parsedData) {
          renderOutput();
        }
      }

      function convert() {
        var input = document.getElementById("inputData").value;
        parsedData = parseInput(input);

        if (!parsedData || parsedData.length === 0) {
          showToast("无法解析输入数据", "error");
          return;
        }

        renderOutput();
        saveToStorage();
        showToast("转换成功");
      }

      function renderOutput() {
        if (!parsedData || parsedData.length === 0) {
          document.getElementById("outputData").value = "";
          return;
        }

        var output = "";
        var headers = Object.keys(parsedData[0]);

        switch (currentOutputFormat) {
          case "csv":
            output = toCSV(parsedData, headers, ",");
            break;
          case "tsv":
            output = toCSV(parsedData, headers, "\t");
            break;
          case "json":
            output = JSON.stringify(parsedData, null, 2);
            break;
          case "html":
            output = toHTML(parsedData, headers);
            break;
          case "markdown":
            output = toMarkdown(parsedData, headers);
            break;
        }

        document.getElementById("outputData").value = output;
      }

      function toCSV(data, headers, delimiter) {
        var lines = [headers.join(delimiter)];
        data.forEach(function (row) {
          var values = headers.map(function (h) {
            var val = String(row[h] || "");
            if (
              val.indexOf(delimiter) !== -1 ||
              val.indexOf('"') !== -1 ||
              val.indexOf("\n") !== -1
            ) {
              val = '"' + val.replace(/"/g, '""') + '"';
            }
            return val;
          });
          lines.push(values.join(delimiter));
        });
        return lines.join("\n");
      }

      function toHTML(data, headers) {
        var lines = ['<table border="1" cellpadding="8" cellspacing="0">'];
        lines.push("  <thead>");
        lines.push("    <tr>");
        headers.forEach(function (h) {
          lines.push("      <th>" + escapeHtml(h) + "</th>");
        });
        lines.push("    </tr>");
        lines.push("  </thead>");
        lines.push("  <tbody>");
        data.forEach(function (row) {
          lines.push("    <tr>");
          headers.forEach(function (h) {
            lines.push("      <td>" + escapeHtml(String(row[h] || "")) + "</td>");
          });
          lines.push("    </tr>");
        });
        lines.push("  </tbody>");
        lines.push("</table>");
        return lines.join("\n");
      }

      function toMarkdown(data, headers) {
        var lines = [];
        lines.push("| " + headers.join(" | ") + " |");
        lines.push(
          "| " +
            headers
              .map(function () {
                return "---";
              })
              .join(" | ") +
            " |"
        );
        data.forEach(function (row) {
          var values = headers.map(function (h) {
            return String(row[h] || "").replace(/\|/g, "\\|");
          });
          lines.push("| " + values.join(" | ") + " |");
        });
        return lines.join("\n");
      }

      function escapeHtml(text) {
        var div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      }

      function copyOutput() {
        var output = document.getElementById("outputData").value;
        if (!output) {
          showToast("无内容可复制", "error");
          return;
        }
        navigator.clipboard
          .writeText(output)
          .then(function () {
            showToast("已复制");
          })
          .catch(function () {
            showToast("复制失败", "error");
          });
      }

      function downloadOutput() {
        var output = document.getElementById("outputData").value;
        if (!output) {
          showToast("无内容可下载", "error");
          return;
        }

        var ext = {
          csv: "csv",
          tsv: "tsv",
          json: "json",
          html: "html",
          markdown: "md"
        }[currentOutputFormat];

        var mime = {
          csv: "text/csv",
          tsv: "text/tab-separated-values",
          json: "application/json",
          html: "text/html",
          markdown: "text/markdown"
        }[currentOutputFormat];

        var blob = new Blob([output], { type: mime + ";charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "data." + ext;
        a.click();
        URL.revokeObjectURL(url);

        showToast("已下载");
      }

      function loadSampleJSON() {
        document.getElementById("inputData").value =
          '[\n  {"name": "Alice", "age": 30, "city": "Beijing"},\n  {"name": "Bob", "age": 25, "city": "Shanghai"},\n  {"name": "Charlie", "age": 35, "city": "Shenzhen"}\n]';
        document.getElementById("inputFormat").value = "json";
        detectFormat();
        convert();
      }

      function loadSampleCSV() {
        document.getElementById("inputData").value =
          "name,age,city\nAlice,30,Beijing\nBob,25,Shanghai\nCharlie,35,Shenzhen";
        document.getElementById("inputFormat").value = "csv";
        detectFormat();
        convert();
      }

      function clearAll() {
        document.getElementById("inputData").value = "";
        document.getElementById("outputData").value = "";
        document.getElementById("inputFormat").value = "auto";
        parsedData = null;
        detectFormat();
        localStorage.removeItem(LS_KEY);
        showToast("已清空");
      }

      function saveToStorage() {
        var data = {
          input: document.getElementById("inputData").value,
          format: document.getElementById("inputFormat").value,
          outputFormat: currentOutputFormat
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (!saved) return;

        try {
          var data = JSON.parse(saved);
          if (data.input) document.getElementById("inputData").value = data.input;
          if (data.format) document.getElementById("inputFormat").value = data.format;
          if (data.outputFormat) selectFormat(data.outputFormat);
          detectFormat();
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
        document.getElementById("inputFormat").addEventListener("change", saveToStorage);
      });
    
