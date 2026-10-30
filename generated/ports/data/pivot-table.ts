// @ts-nocheck
// Generated from tools/data/pivot-table.html
// Source SHA-256: 39a43eee3711bf24b4ddab749aa5a9390ff479c7466dfe1a206150b89bbbb562
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 全局变量
      var LS_KEY = "pivot-table-data";
      var parsedData = [];
      var headers = [];
      var pivotResult = null;

      // 主题切换
      function toggleTheme() {
        var body = document.body;
        var isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      // 加载主题
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      // 解析CSV文本
      function parseCSVText(text) {
        var lines = text.trim().split("\n");
        if (lines.length < 2) {
          return { headers: [], data: [] };
        }

        // 检测分隔符（逗号或制表符）
        var delimiter = ",";
        if (lines[0].indexOf("\t") !== -1) {
          delimiter = "\t";
        }

        var h = lines[0].split(delimiter).map(function (s) {
          return s.trim().replace(/^["']|["']$/g, "");
        });

        var d = [];
        for (var i = 1; i < lines.length; i++) {
          var line = lines[i].trim();
          if (!line) continue;

          var values = line.split(delimiter).map(function (v) {
            return v.trim().replace(/^["']|["']$/g, "");
          });

          if (values.length === h.length) {
            var row = {};
            for (var j = 0; j < h.length; j++) {
              row[h[j]] = values[j];
            }
            d.push(row);
          }
        }
        return { headers: h, data: d };
      }

      // 从剪贴板粘贴
      function pasteFromClipboard() {
        navigator.clipboard
          .readText()
          .then(function (text) {
            if (text) {
              document.getElementById("csvInput").value = text;
              showToast("已从剪贴板粘贴");
              parseCSV();
            }
          })
          .catch(function () {
            showToast("无法读取剪贴板", "error");
          });
      }

      // 解析CSV数据
      function parseCSV() {
        var text = document.getElementById("csvInput").value;
        if (!text.trim()) {
          showToast("请输入CSV数据", "error");
          return;
        }

        var result = parseCSVText(text);
        headers = result.headers;
        parsedData = result.data;

        if (headers.length === 0) {
          showToast("无法解析CSV数据", "error");
          return;
        }

        updateSelects();
        showToast("解析成功，共 " + parsedData.length + " 行数据");
        saveToStorage();
      }

      // 更新下拉选择框
      function updateSelects() {
        var selects = ["rowField", "colField", "valueField"];
        selects.forEach(function (id) {
          var select = document.getElementById(id);
          var currentValue = select.value;
          select.textContent = "";

          var defaultOpt = document.createElement("option");
          defaultOpt.value = "";
          defaultOpt.textContent = "-- 选择 --";
          select.appendChild(defaultOpt);

          headers.forEach(function (h) {
            var opt = document.createElement("option");
            opt.value = h;
            opt.textContent = h;
            select.appendChild(opt);
          });

          // 恢复之前选择的值（如果仍然有效）
          if (currentValue && headers.indexOf(currentValue) !== -1) {
            select.value = currentValue;
          }
        });
      }

      // 生成透视表
      function generatePivot() {
        if (parsedData.length === 0) {
          showToast("请先解析CSV数据", "error");
          return;
        }

        var rowField = document.getElementById("rowField").value;
        var colField = document.getElementById("colField").value;
        var valueField = document.getElementById("valueField").value;
        var aggFunc = document.getElementById("aggFunc").value;

        if (!rowField || !colField || !valueField) {
          showToast("请选择所有字段", "error");
          return;
        }

        // 收集唯一的行值和列值
        var rowValues = [];
        var colValues = [];
        var rowSet = {};
        var colSet = {};

        parsedData.forEach(function (row) {
          var rv = row[rowField];
          var cv = row[colField];
          if (!rowSet[rv]) {
            rowSet[rv] = true;
            rowValues.push(rv);
          }
          if (!colSet[cv]) {
            colSet[cv] = true;
            colValues.push(cv);
          }
        });

        // 初始化透视数据结构
        var pivot = {};
        rowValues.forEach(function (r) {
          pivot[r] = {};
          colValues.forEach(function (c) {
            pivot[r][c] = [];
          });
        });

        // 填充数据
        parsedData.forEach(function (row) {
          var rv = row[rowField];
          var cv = row[colField];
          var val = parseFloat(row[valueField]);
          if (!isNaN(val)) {
            pivot[rv][cv].push(val);
          }
        });

        // 聚合函数
        var aggFuncs = {
          sum: function (arr) {
            return arr.reduce(function (a, b) {
              return a + b;
            }, 0);
          },
          count: function (arr) {
            return arr.length;
          },
          avg: function (arr) {
            if (arr.length === 0) return 0;
            var sum = arr.reduce(function (a, b) {
              return a + b;
            }, 0);
            return sum / arr.length;
          },
          min: function (arr) {
            if (arr.length === 0) return 0;
            return Math.min.apply(null, arr);
          },
          max: function (arr) {
            if (arr.length === 0) return 0;
            return Math.max.apply(null, arr);
          }
        };

        var agg = aggFuncs[aggFunc];

        // 计算结果
        var result = {
          rowField: rowField,
          colField: colField,
          valueField: valueField,
          aggFunc: aggFunc,
          rows: rowValues,
          cols: colValues,
          data: {},
          rowTotals: {},
          colTotals: {},
          grandTotal: 0
        };

        var grandArr = [];

        rowValues.forEach(function (r) {
          result.data[r] = {};
          var rowArr = [];

          colValues.forEach(function (c) {
            var val = agg(pivot[r][c]);
            result.data[r][c] = val;
            rowArr = rowArr.concat(pivot[r][c]);
          });

          result.rowTotals[r] = agg(rowArr);
          grandArr = grandArr.concat(rowArr);
        });

        colValues.forEach(function (c) {
          var colArr = [];
          rowValues.forEach(function (r) {
            colArr = colArr.concat(pivot[r][c]);
          });
          result.colTotals[c] = agg(colArr);
        });

        result.grandTotal = agg(grandArr);
        pivotResult = result;

        renderPivot();
        updateStats();
        showToast("透视表生成成功");
        saveToStorage();
      }

      // 渲染透视表
      function renderPivot() {
        var wrapper = document.getElementById("pivotWrapper");
        wrapper.textContent = "";

        if (!pivotResult) {
          var msg = document.createElement("div");
          msg.className = "empty-message";
          msg.textContent = "解析数据并设置字段后生成透视表";
          wrapper.appendChild(msg);
          return;
        }

        var table = document.createElement("table");
        table.className = "pivot-table";

        // 表头
        var thead = document.createElement("thead");
        var headerRow = document.createElement("tr");

        var cornerTh = document.createElement("th");
        cornerTh.className = "row-header";
        cornerTh.textContent = pivotResult.rowField + " \\ " + pivotResult.colField;
        headerRow.appendChild(cornerTh);

        pivotResult.cols.forEach(function (c) {
          var th = document.createElement("th");
          th.textContent = c;
          headerRow.appendChild(th);
        });

        var totalTh = document.createElement("th");
        totalTh.textContent = "行合计";
        headerRow.appendChild(totalTh);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 表体
        var tbody = document.createElement("tbody");

        pivotResult.rows.forEach(function (r) {
          var tr = document.createElement("tr");

          var rowTh = document.createElement("td");
          rowTh.className = "row-header";
          rowTh.textContent = r;
          tr.appendChild(rowTh);

          pivotResult.cols.forEach(function (c) {
            var td = document.createElement("td");
            td.textContent = formatNumber(pivotResult.data[r][c]);
            tr.appendChild(td);
          });

          var totalTd = document.createElement("td");
          totalTd.className = "total-cell";
          totalTd.textContent = formatNumber(pivotResult.rowTotals[r]);
          tr.appendChild(totalTd);

          tbody.appendChild(tr);
        });

        // 列合计行
        var totalRow = document.createElement("tr");

        var totalLabel = document.createElement("td");
        totalLabel.className = "row-header total-cell";
        totalLabel.textContent = "列合计";
        totalRow.appendChild(totalLabel);

        pivotResult.cols.forEach(function (c) {
          var td = document.createElement("td");
          td.className = "total-cell";
          td.textContent = formatNumber(pivotResult.colTotals[c]);
          totalRow.appendChild(td);
        });

        var grandTd = document.createElement("td");
        grandTd.className = "total-cell";
        grandTd.textContent = formatNumber(pivotResult.grandTotal);
        grandTd.style.fontWeight = "700";
        totalRow.appendChild(grandTd);

        tbody.appendChild(totalRow);
        table.appendChild(tbody);
        wrapper.appendChild(table);
      }

      // 格式化数字
      function formatNumber(num) {
        if (num === 0) return "0";
        if (Number.isInteger(num)) return num.toLocaleString();
        return num.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }

      // 更新统计信息
      function updateStats() {
        var statsRow = document.getElementById("statsRow");
        if (!pivotResult) {
          statsRow.style.display = "none";
          return;
        }

        statsRow.style.display = "flex";
        document.getElementById("statRows").textContent = pivotResult.rows.length;
        document.getElementById("statCols").textContent = pivotResult.cols.length;
        document.getElementById("statGrand").textContent = formatNumber(pivotResult.grandTotal);
      }

      // 复制为CSV格式
      function copyAsCSV() {
        if (!pivotResult) {
          showToast("无结果可复制", "error");
          return;
        }

        var lines = [];

        // 表头
        var header = [pivotResult.rowField].concat(pivotResult.cols).concat(["行合计"]);
        lines.push(header.join(","));

        // 数据行
        pivotResult.rows.forEach(function (r) {
          var row = ['"' + r + '"'];
          pivotResult.cols.forEach(function (c) {
            row.push(pivotResult.data[r][c]);
          });
          row.push(pivotResult.rowTotals[r]);
          lines.push(row.join(","));
        });

        // 合计行
        var totalRow = ["列合计"];
        pivotResult.cols.forEach(function (c) {
          totalRow.push(pivotResult.colTotals[c]);
        });
        totalRow.push(pivotResult.grandTotal);
        lines.push(totalRow.join(","));

        navigator.clipboard.writeText(lines.join("\n")).then(function () {
          showToast("CSV已复制到剪贴板");
        });
      }

      // 复制为HTML表格
      function copyAsHTML() {
        if (!pivotResult) {
          showToast("无结果可复制", "error");
          return;
        }

        var html = '<table border="1" style="border-collapse: collapse;">\n';

        // 表头
        html += "  <thead>\n    <tr>\n";
        html +=
          "      <th>" +
          escapeHtml(pivotResult.rowField + " \\ " + pivotResult.colField) +
          "</th>\n";
        pivotResult.cols.forEach(function (c) {
          html += "      <th>" + escapeHtml(c) + "</th>\n";
        });
        html += "      <th>行合计</th>\n";
        html += "    </tr>\n  </thead>\n";

        // 表体
        html += "  <tbody>\n";
        pivotResult.rows.forEach(function (r) {
          html += "    <tr>\n";
          html += "      <td>" + escapeHtml(r) + "</td>\n";
          pivotResult.cols.forEach(function (c) {
            html +=
              '      <td style="text-align: right;">' +
              formatNumber(pivotResult.data[r][c]) +
              "</td>\n";
          });
          html +=
            '      <td style="text-align: right; font-weight: bold;">' +
            formatNumber(pivotResult.rowTotals[r]) +
            "</td>\n";
          html += "    </tr>\n";
        });

        // 合计行
        html += "    <tr>\n";
        html += "      <td><strong>列合计</strong></td>\n";
        pivotResult.cols.forEach(function (c) {
          html +=
            '      <td style="text-align: right; font-weight: bold;">' +
            formatNumber(pivotResult.colTotals[c]) +
            "</td>\n";
        });
        html +=
          '      <td style="text-align: right; font-weight: bold;">' +
          formatNumber(pivotResult.grandTotal) +
          "</td>\n";
        html += "    </tr>\n";
        html += "  </tbody>\n</table>";

        navigator.clipboard.writeText(html).then(function () {
          showToast("HTML表格已复制到剪贴板");
        });
      }

      // HTML转义
      function escapeHtml(text) {
        var div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      }

      // 分享结果
      function shareResult() {
        var data = {
          csv: document.getElementById("csvInput").value,
          rowField: document.getElementById("rowField").value,
          colField: document.getElementById("colField").value,
          valueField: document.getElementById("valueField").value,
          aggFunc: document.getElementById("aggFunc").value
        };

        var encoded = btoa(encodeURIComponent(JSON.stringify(data)));
        var url = window.location.href.split("#")[0] + "#" + encoded;

        navigator.clipboard
          .writeText(url)
          .then(function () {
            showToast("分享链接已复制到剪贴板");
          })
          .catch(function () {
            showToast("复制失败，请手动复制地址栏链接", "error");
          });
      }

      // 从URL加载
      function loadFromUrl() {
        var hash = window.location.hash.slice(1);
        if (!hash) return false;

        try {
          var data = JSON.parse(decodeURIComponent(atob(hash)));

          if (data.csv) {
            document.getElementById("csvInput").value = data.csv;
            parseCSV();
          }
          if (data.rowField) document.getElementById("rowField").value = data.rowField;
          if (data.colField) document.getElementById("colField").value = data.colField;
          if (data.valueField) document.getElementById("valueField").value = data.valueField;
          if (data.aggFunc) document.getElementById("aggFunc").value = data.aggFunc;

          // 自动生成透视表
          if (data.rowField && data.colField && data.valueField) {
            setTimeout(generatePivot, 100);
          }
          return true;
        } catch (e) {
          return false;
        }
      }

      // 保存到localStorage
      function saveToStorage() {
        var data = {
          csv: document.getElementById("csvInput").value,
          rowField: document.getElementById("rowField").value,
          colField: document.getElementById("colField").value,
          valueField: document.getElementById("valueField").value,
          aggFunc: document.getElementById("aggFunc").value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      // 从localStorage加载
      function loadFromStorage() {
        // 如果有URL hash，优先使用URL
        if (window.location.hash) return;

        var saved = localStorage.getItem(LS_KEY);
        if (!saved) return;

        try {
          var data = JSON.parse(saved);

          if (data.csv) {
            document.getElementById("csvInput").value = data.csv;
            var result = parseCSVText(data.csv);
            headers = result.headers;
            parsedData = result.data;
            if (headers.length > 0) {
              updateSelects();
            }
          }
          if (data.rowField) document.getElementById("rowField").value = data.rowField;
          if (data.colField) document.getElementById("colField").value = data.colField;
          if (data.valueField) document.getElementById("valueField").value = data.valueField;
          if (data.aggFunc) document.getElementById("aggFunc").value = data.aggFunc;
        } catch (e) {
          // 忽略解析错误
        }
      }

      // 加载示例数据
      function loadSample() {
        var sampleCSV =
          "date,region,product,quantity,amount\n" +
          "2024-01,North,Apple,100,1000\n" +
          "2024-01,North,Banana,80,640\n" +
          "2024-01,South,Apple,120,1200\n" +
          "2024-01,South,Banana,90,720\n" +
          "2024-02,North,Apple,110,1100\n" +
          "2024-02,North,Banana,85,680\n" +
          "2024-02,South,Apple,130,1300\n" +
          "2024-02,South,Banana,95,760\n" +
          "2024-03,North,Apple,105,1050\n" +
          "2024-03,North,Banana,75,600\n" +
          "2024-03,South,Apple,125,1250\n" +
          "2024-03,South,Banana,88,704";

        document.getElementById("csvInput").value = sampleCSV;
        parseCSV();

        document.getElementById("rowField").value = "region";
        document.getElementById("colField").value = "product";
        document.getElementById("valueField").value = "amount";
        document.getElementById("aggFunc").value = "sum";

        generatePivot();
      }

      // 清空所有内容
      function clearAll() {
        document.getElementById("csvInput").value = "";
        document.getElementById("rowField").value = "";
        document.getElementById("colField").value = "";
        document.getElementById("valueField").value = "";
        document.getElementById("aggFunc").value = "sum";

        // 重置下拉框
        var selects = ["rowField", "colField", "valueField"];
        selects.forEach(function (id) {
          var select = document.getElementById(id);
          select.textContent = "";
          var opt = document.createElement("option");
          opt.value = "";
          opt.textContent = "-- 选择 --";
          select.appendChild(opt);
        });

        // 清空结果
        var wrapper = document.getElementById("pivotWrapper");
        wrapper.textContent = "";
        var msg = document.createElement("div");
        msg.className = "empty-message";
        msg.textContent = "解析数据并设置字段后生成透视表";
        wrapper.appendChild(msg);

        // 隐藏统计
        document.getElementById("statsRow").style.display = "none";

        // 重置变量
        parsedData = [];
        headers = [];
        pivotResult = null;

        // 清除存储
        localStorage.removeItem(LS_KEY);
        window.location.hash = "";

        showToast("已清空");
      }

      // 显示提示
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

      // 初始化
      document.addEventListener("DOMContentLoaded", function () {
        // 先尝试从URL加载
        var loadedFromUrl = loadFromUrl();

        // 如果没有从URL加载，则从localStorage加载
        if (!loadedFromUrl) {
          loadFromStorage();
        }

        // 自动保存
        document.getElementById("csvInput").addEventListener("input", saveToStorage);
        document.getElementById("rowField").addEventListener("change", saveToStorage);
        document.getElementById("colField").addEventListener("change", saveToStorage);
        document.getElementById("valueField").addEventListener("change", saveToStorage);
        document.getElementById("aggFunc").addEventListener("change", saveToStorage);
      });
    
