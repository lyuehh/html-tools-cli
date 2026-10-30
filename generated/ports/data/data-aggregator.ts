// @ts-nocheck
// Generated from tools/data/data-aggregator.html
// Source SHA-256: 0f6b04e986b1deecc527f753c776ee6873ae61cd7f93e1cfffa556b65fe2b51c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "data-aggregator-data";
      var lastResult = null;
      var headers = [];

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

      function parseCSV(text) {
        var lines = text
          .trim()
          .split("\n")
          .filter(function (l) {
            return l.trim();
          });
        if (lines.length < 2) return null;

        var headerLine = lines[0];
        headers = headerLine.split(",").map(function (h) {
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

        return { headers: headers, rows: rows };
      }

      function updateColumnSelects() {
        var text = document.getElementById("csvInput").value;
        var parsed = parseCSV(text);

        var groupBySelect = document.getElementById("groupByCol");
        var valueSelect = document.getElementById("valueCol");

        groupBySelect.textContent = "";
        valueSelect.textContent = "";

        var defaultOpt1 = document.createElement("option");
        defaultOpt1.value = "";
        defaultOpt1.textContent = "-- 选择分组列 --";
        groupBySelect.appendChild(defaultOpt1);

        var defaultOpt2 = document.createElement("option");
        defaultOpt2.value = "";
        defaultOpt2.textContent = "-- 选择数值列 --";
        valueSelect.appendChild(defaultOpt2);

        if (parsed && parsed.headers.length > 0) {
          parsed.headers.forEach(function (h) {
            var opt1 = document.createElement("option");
            opt1.value = h;
            opt1.textContent = h;
            groupBySelect.appendChild(opt1);

            var opt2 = document.createElement("option");
            opt2.value = h;
            opt2.textContent = h;
            valueSelect.appendChild(opt2);
          });
        }
      }

      function aggregate() {
        var text = document.getElementById("csvInput").value;
        var groupByCol = document.getElementById("groupByCol").value;
        var valueCol = document.getElementById("valueCol").value;
        var aggFunc = document.getElementById("aggFunc").value;

        if (!text.trim()) {
          showToast("请输入 CSV 数据", "error");
          return;
        }

        var parsed = parseCSV(text);
        if (!parsed) {
          showToast("CSV 格式错误", "error");
          return;
        }

        if (!groupByCol) {
          showToast("请选择分组列", "error");
          return;
        }

        if (!valueCol && aggFunc !== "count") {
          showToast("请选择数值列", "error");
          return;
        }

        var groups = {};
        parsed.rows.forEach(function (row) {
          var key = row[groupByCol] || "(空)";
          if (!groups[key]) {
            groups[key] = [];
          }
          var val = parseFloat(row[valueCol]);
          if (!isNaN(val)) {
            groups[key].push(val);
          } else if (aggFunc === "count") {
            groups[key].push(1);
          }
        });

        var results = [];
        Object.keys(groups)
          .sort()
          .forEach(function (key) {
            var values = groups[key];
            var result = { group: key };

            switch (aggFunc) {
              case "count":
                result.value = values.length;
                break;
              case "sum":
                result.value = values.reduce(function (a, b) {
                  return a + b;
                }, 0);
                break;
              case "avg":
                result.value =
                  values.length > 0
                    ? values.reduce(function (a, b) {
                        return a + b;
                      }, 0) / values.length
                    : 0;
                break;
              case "min":
                result.value = values.length > 0 ? Math.min.apply(null, values) : 0;
                break;
              case "max":
                result.value = values.length > 0 ? Math.max.apply(null, values) : 0;
                break;
            }

            results.push(result);
          });

        lastResult = {
          groupByCol: groupByCol,
          valueCol: valueCol,
          aggFunc: aggFunc,
          results: results
        };

        renderResults(results, groupByCol, aggFunc);
        document.getElementById("groupCount").textContent = results.length;
        document.getElementById("rowCount").textContent = parsed.rows.length;
        document.getElementById("statsBar").style.display = "flex";

        saveToStorage();
        showToast("聚合完成");
      }

      function renderResults(results, groupByCol, aggFunc) {
        var wrapper = document.getElementById("resultWrapper");
        wrapper.textContent = "";

        if (results.length === 0) {
          var emptyDiv = document.createElement("div");
          emptyDiv.className = "empty-state";
          emptyDiv.textContent = "无数据";
          wrapper.appendChild(emptyDiv);
          return;
        }

        var funcName = {
          count: "COUNT",
          sum: "SUM",
          avg: "AVG",
          min: "MIN",
          max: "MAX"
        }[aggFunc];

        var table = document.createElement("table");
        table.className = "result-table";

        var thead = document.createElement("thead");
        var headerRow = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.textContent = groupByCol;
        var th2 = document.createElement("th");
        th2.textContent = funcName;
        headerRow.appendChild(th1);
        headerRow.appendChild(th2);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        var tbody = document.createElement("tbody");
        results.forEach(function (r) {
          var tr = document.createElement("tr");
          var td1 = document.createElement("td");
          td1.textContent = r.group;
          var td2 = document.createElement("td");
          td2.textContent = aggFunc === "avg" ? r.value.toFixed(2) : r.value;
          tr.appendChild(td1);
          tr.appendChild(td2);
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        wrapper.appendChild(table);
      }

      function copyResults() {
        if (!lastResult) {
          showToast("请先进行聚合", "error");
          return;
        }

        var funcName = lastResult.aggFunc.toUpperCase();
        var lines = [lastResult.groupByCol + "," + funcName];

        lastResult.results.forEach(function (r) {
          var val = lastResult.aggFunc === "avg" ? r.value.toFixed(2) : r.value;
          lines.push(r.group + "," + val);
        });

        navigator.clipboard
          .writeText(lines.join("\n"))
          .then(function () {
            showToast("结果已复制");
          })
          .catch(function () {
            showToast("复制失败", "error");
          });
      }

      function downloadCSV() {
        if (!lastResult) {
          showToast("请先进行聚合", "error");
          return;
        }

        var funcName = lastResult.aggFunc.toUpperCase();
        var lines = [lastResult.groupByCol + "," + funcName];

        lastResult.results.forEach(function (r) {
          var val = lastResult.aggFunc === "avg" ? r.value.toFixed(2) : r.value;
          lines.push(r.group + "," + val);
        });

        var blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "aggregated-data.csv";
        a.click();
        URL.revokeObjectURL(url);

        showToast("已下载");
      }

      function loadSample() {
        document.getElementById("csvInput").value =
          "name,category,sales\nAlice,Electronics,100\nBob,Clothing,200\nAlice,Electronics,150\nBob,Electronics,300\nCharlie,Clothing,250\nAlice,Clothing,180\nCharlie,Electronics,220\nBob,Clothing,170";
        updateColumnSelects();
        document.getElementById("groupByCol").value = "category";
        document.getElementById("valueCol").value = "sales";
        document.getElementById("aggFunc").value = "sum";
        aggregate();
      }

      function clearAll() {
        document.getElementById("csvInput").value = "";
        var groupBySelect = document.getElementById("groupByCol");
        var valueSelect = document.getElementById("valueCol");
        groupBySelect.textContent = "";
        valueSelect.textContent = "";
        var defaultOpt1 = document.createElement("option");
        defaultOpt1.value = "";
        defaultOpt1.textContent = "-- 请先输入数据 --";
        groupBySelect.appendChild(defaultOpt1);
        var defaultOpt2 = document.createElement("option");
        defaultOpt2.value = "";
        defaultOpt2.textContent = "-- 请先输入数据 --";
        valueSelect.appendChild(defaultOpt2);

        document.getElementById("aggFunc").value = "count";
        var wrapper = document.getElementById("resultWrapper");
        wrapper.textContent = "";
        var emptyDiv = document.createElement("div");
        emptyDiv.className = "empty-state";
        emptyDiv.textContent = "输入数据并配置聚合参数后点击聚合";
        wrapper.appendChild(emptyDiv);

        document.getElementById("statsBar").style.display = "none";
        lastResult = null;
        localStorage.removeItem(LS_KEY);
        showToast("已清空");
      }

      function saveToStorage() {
        var data = {
          csv: document.getElementById("csvInput").value,
          groupBy: document.getElementById("groupByCol").value,
          value: document.getElementById("valueCol").value,
          func: document.getElementById("aggFunc").value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (!saved) return;

        try {
          var data = JSON.parse(saved);
          if (data.csv) {
            document.getElementById("csvInput").value = data.csv;
            updateColumnSelects();
            if (data.groupBy) document.getElementById("groupByCol").value = data.groupBy;
            if (data.value) document.getElementById("valueCol").value = data.value;
            if (data.func) document.getElementById("aggFunc").value = data.func;
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

        document.getElementById("csvInput").addEventListener("input", function () {
          updateColumnSelects();
          saveToStorage();
        });

        document.querySelectorAll("select").forEach(function (el) {
          el.addEventListener("change", saveToStorage);
        });
      });
    
