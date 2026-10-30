// @ts-nocheck
// Generated from tools/data/data-filter.html
// Source SHA-256: d3c34a7ed01aaaddb515ab17a623c8637b353134c15cf72117d2664675ac30d6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // State
      const state = {
        parsedData: [],
        headers: [],
        isCSV: false,
        delimiter: ",",
        hasHeader: false,
        logic: "and",
        conditions: []
      };

      const LS_KEY = "data_filter_state_v1";

      // Filter modes
      const FILTER_MODES = {
        contains: {
          label: "包含",
          fn: function (val, pat) {
            return val.includes(pat);
          }
        },
        not_contains: {
          label: "不包含",
          fn: function (val, pat) {
            return !val.includes(pat);
          }
        },
        starts_with: {
          label: "开头是",
          fn: function (val, pat) {
            return val.startsWith(pat);
          }
        },
        ends_with: {
          label: "结尾是",
          fn: function (val, pat) {
            return val.endsWith(pat);
          }
        },
        exact: {
          label: "精确匹配",
          fn: function (val, pat) {
            return val === pat;
          }
        },
        regex: {
          label: "正则表达式",
          fn: function (val, pat, flags) {
            try {
              var regex = new RegExp(pat, flags);
              return regex.test(val);
            } catch (e) {
              return false;
            }
          }
        }
      };

      // Theme toggle
      function toggleTheme() {
        var body = document.body;
        var isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      // Load theme
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      // Toast notification
      function showToast(msg, isError) {
        var toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.className = "toast" + (isError ? " error" : "");
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      // Paste from clipboard
      function pasteFromClipboard() {
        navigator.clipboard
          .readText()
          .then(function (text) {
            document.getElementById("inputData").value = text;
            parseData();
            showToast("已粘贴");
          })
          .catch(function () {
            showToast("无法访问剪贴板", true);
          });
      }

      // Detect delimiter
      function detectDelimiter(text) {
        var firstLine = text.split("\n")[0];
        var delimiters = [",", "\t", ";", "|"];
        var counts = delimiters.map(function (d) {
          var escaped = d === "|" ? "\\|" : d;
          var matches = firstLine.match(new RegExp(escaped, "g"));
          return { d: d, count: matches ? matches.length : 0 };
        });
        counts.sort(function (a, b) {
          return b.count - a.count;
        });
        return counts[0].count > 0 ? counts[0].d : null;
      }

      // Detect if first row is header
      function detectHeader(rows, delimiter) {
        if (rows.length < 2) return false;
        var firstRow = rows[0].split(delimiter);
        var secondRow = rows[1].split(delimiter);

        var firstRowNumeric = firstRow.filter(function (cell) {
          return !isNaN(parseFloat(cell));
        }).length;
        var secondRowNumeric = secondRow.filter(function (cell) {
          return !isNaN(parseFloat(cell));
        }).length;

        return firstRowNumeric < secondRowNumeric;
      }

      // Parse CSV line handling quoted fields
      function parseCSVLine(line, delimiter) {
        var result = [];
        var current = "";
        var inQuotes = false;

        for (var i = 0; i < line.length; i++) {
          var char = line[i];
          if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
              current += '"';
              i++;
            } else {
              inQuotes = !inQuotes;
            }
          } else if (char === delimiter && !inQuotes) {
            result.push(current);
            current = "";
          } else {
            current += char;
          }
        }
        result.push(current);
        return result;
      }

      // Parse data
      function parseData() {
        var input = document.getElementById("inputData").value;
        var delimiterSelect = document.getElementById("delimiter").value;
        var hasHeaderSelect = document.getElementById("hasHeader").value;

        if (!input.trim()) {
          showToast("请输入数据", true);
          return;
        }

        var lines = input.split("\n").filter(function (line) {
          return line.trim();
        });

        // Detect delimiter
        var delimiter;
        if (delimiterSelect === "auto") {
          delimiter = detectDelimiter(input);
        } else {
          delimiter = delimiterSelect;
        }

        // Check if CSV
        state.isCSV = delimiter !== null;
        state.delimiter = delimiter || ",";

        if (state.isCSV) {
          // Parse CSV
          var rows = lines.map(function (line) {
            return parseCSVLine(line, state.delimiter);
          });

          // Detect or set header
          if (hasHeaderSelect === "auto") {
            state.hasHeader = detectHeader(lines, state.delimiter);
          } else {
            state.hasHeader = hasHeaderSelect === "yes";
          }

          if (state.hasHeader && rows.length > 0) {
            state.headers = rows[0].map(function (h, i) {
              return h.trim() || "列" + (i + 1);
            });
            state.parsedData = rows.slice(1);
          } else {
            var colCount = rows[0] ? rows[0].length : 0;
            state.headers = [];
            for (var i = 0; i < colCount; i++) {
              state.headers.push("列" + (i + 1));
            }
            state.parsedData = rows;
          }

          updateModeIndicator(true);
        } else {
          // Plain text mode
          state.headers = ["内容"];
          state.parsedData = lines.map(function (line) {
            return [line];
          });
          updateModeIndicator(false);
        }

        // Update column selectors in conditions
        updateColumnSelectors();

        showToast("已解析 " + state.parsedData.length + " 行数据");
        saveToStorage();
      }

      // Update mode indicator
      function updateModeIndicator(isCSV) {
        var indicator = document.getElementById("modeIndicator");
        if (isCSV) {
          indicator.className = "mode-indicator csv-mode";
          indicator.textContent = "CSV模式 (" + state.headers.length + "列)";
        } else {
          indicator.className = "mode-indicator text-mode";
          indicator.textContent = "文本模式";
        }
      }

      // Update column selectors
      function updateColumnSelectors() {
        var selects = document.querySelectorAll(".column-select");
        selects.forEach(function (select) {
          var currentValue = select.value;
          // Clear and rebuild options
          while (select.firstChild) {
            select.removeChild(select.firstChild);
          }
          var allOption = document.createElement("option");
          allOption.value = "all";
          allOption.textContent = "所有列";
          select.appendChild(allOption);

          state.headers.forEach(function (header, i) {
            var option = document.createElement("option");
            option.value = i;
            option.textContent = header;
            select.appendChild(option);
          });
          select.value = currentValue;
        });
      }

      // Create a condition element
      function createConditionElement(conditionData) {
        var div = document.createElement("div");
        div.className = "condition-item";
        div.dataset.id = Date.now();

        // Column select
        var columnSelect = document.createElement("select");
        columnSelect.className = "column-select";
        columnSelect.title = "选择列";
        var allOption = document.createElement("option");
        allOption.value = "all";
        allOption.textContent = "所有列";
        columnSelect.appendChild(allOption);
        state.headers.forEach(function (h, i) {
          var opt = document.createElement("option");
          opt.value = i;
          opt.textContent = h;
          columnSelect.appendChild(opt);
        });

        // Mode select
        var modeSelect = document.createElement("select");
        modeSelect.className = "mode-select";
        modeSelect.title = "匹配模式";
        Object.keys(FILTER_MODES).forEach(function (key) {
          var opt = document.createElement("option");
          opt.value = key;
          opt.textContent = FILTER_MODES[key].label;
          modeSelect.appendChild(opt);
        });

        // Pattern input
        var patternInput = document.createElement("input");
        patternInput.type = "text";
        patternInput.className = "pattern-input";
        patternInput.placeholder = "匹配内容/正则表达式...";

        // Remove button
        var removeBtn = document.createElement("button");
        removeBtn.className = "remove-condition";
        removeBtn.title = "删除条件";
        removeBtn.textContent = "×";
        removeBtn.onclick = function () {
          div.remove();
          saveToStorage();
        };

        // Set values if provided
        if (conditionData) {
          columnSelect.value = conditionData.column || "all";
          modeSelect.value = conditionData.mode || "contains";
          patternInput.value = conditionData.pattern || "";
        }

        // Auto-save on change
        [columnSelect, modeSelect, patternInput].forEach(function (el) {
          el.addEventListener("change", saveToStorage);
          el.addEventListener("input", saveToStorage);
        });

        div.appendChild(columnSelect);
        div.appendChild(modeSelect);
        div.appendChild(patternInput);
        div.appendChild(removeBtn);

        return div;
      }

      // Add condition
      function addCondition(conditionData) {
        var container = document.getElementById("conditionsContainer");
        var conditionEl = createConditionElement(conditionData);
        container.appendChild(conditionEl);
        saveToStorage();
      }

      // Set logic operator
      function setLogic(logic) {
        state.logic = logic;
        var buttons = document.querySelectorAll(".logic-btn");
        buttons.forEach(function (btn) {
          if (btn.dataset.logic === logic) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });
        saveToStorage();
      }

      // Get conditions from UI
      function getConditions() {
        var conditions = [];
        var items = document.querySelectorAll(".condition-item");
        items.forEach(function (item) {
          var column = item.querySelector(".column-select").value;
          var mode = item.querySelector(".mode-select").value;
          var pattern = item.querySelector(".pattern-input").value;
          if (pattern) {
            conditions.push({ column: column, mode: mode, pattern: pattern });
          }
        });
        return conditions;
      }

      // Apply filter
      function applyFilter() {
        var conditions = getConditions();

        if (conditions.length === 0) {
          showToast("请添加至少一个筛选条件", true);
          return;
        }

        if (state.parsedData.length === 0) {
          parseData();
          if (state.parsedData.length === 0) {
            showToast("请先输入并解析数据", true);
            return;
          }
        }

        var caseSensitive = document.getElementById("caseSensitive").checked;
        var trimWhitespace = document.getElementById("trimWhitespace").checked;
        var skipEmpty = document.getElementById("skipEmpty").checked;

        var matched = [];
        var unmatched = [];

        state.parsedData.forEach(function (row) {
          // Skip empty rows if option is checked
          if (
            skipEmpty &&
            row.every(function (cell) {
              return !cell.trim();
            })
          ) {
            return;
          }

          var results = conditions.map(function (cond) {
            var filterFn = FILTER_MODES[cond.mode].fn;
            var pattern = cond.pattern;
            var flags = caseSensitive ? "" : "i";

            if (!caseSensitive && cond.mode !== "regex") {
              pattern = pattern.toLowerCase();
            }

            // Get values to check
            var valuesToCheck = [];
            if (cond.column === "all") {
              valuesToCheck = row;
            } else {
              var colIndex = parseInt(cond.column);
              valuesToCheck = [row[colIndex] || ""];
            }

            // Check if any value matches
            return valuesToCheck.some(function (val) {
              var value = val;
              if (trimWhitespace) value = value.trim();
              if (!caseSensitive && cond.mode !== "regex") value = value.toLowerCase();
              return filterFn(value, pattern, flags);
            });
          });

          // Apply logic (AND/OR)
          var isMatch;
          if (state.logic === "and") {
            isMatch = results.every(function (r) {
              return r;
            });
          } else {
            isMatch = results.some(function (r) {
              return r;
            });
          }

          if (isMatch) {
            matched.push(row);
          } else {
            unmatched.push(row);
          }
        });

        // Update statistics
        updateStats(state.parsedData.length, matched.length, unmatched.length);

        // Display results
        displayResults(matched, unmatched);

        showToast("筛选完成: " + matched.length + " 条匹配");
        saveToStorage();
      }

      // Update statistics
      function updateStats(total, matchedCount, unmatchedCount) {
        document.getElementById("statTotal").textContent = total;
        document.getElementById("statMatched").textContent = matchedCount;
        document.getElementById("statUnmatched").textContent = unmatchedCount;
        document.getElementById("statPercent").textContent =
          total > 0 ? Math.round((matchedCount / total) * 100) + "%" : "0%";
      }

      // Display results
      function displayResults(matched, unmatched) {
        var formatRow = function (row) {
          if (state.isCSV) {
            return row
              .map(function (cell) {
                if (cell.includes(state.delimiter) || cell.includes('"') || cell.includes("\n")) {
                  return '"' + cell.replace(/"/g, '""') + '"';
                }
                return cell;
              })
              .join(state.delimiter);
          }
          return row[0];
        };

        var matchedText;
        if (matched.length > 0) {
          var matchedLines = [];
          if (state.isCSV && state.hasHeader) {
            matchedLines.push(state.headers.join(state.delimiter));
          }
          matched.forEach(function (row) {
            matchedLines.push(formatRow(row));
          });
          matchedText = matchedLines.join("\n");
        } else {
          matchedText = "无匹配数据";
        }

        var unmatchedText;
        if (unmatched.length > 0) {
          var unmatchedLines = [];
          if (state.isCSV && state.hasHeader) {
            unmatchedLines.push(state.headers.join(state.delimiter));
          }
          unmatched.forEach(function (row) {
            unmatchedLines.push(formatRow(row));
          });
          unmatchedText = unmatchedLines.join("\n");
        } else {
          unmatchedText = "无不匹配数据";
        }

        document.getElementById("matchedResult").textContent = matchedText;
        document.getElementById("unmatchedResult").textContent = unmatchedText;
      }

      // Copy result
      function copyResult(type) {
        var resultEl = document.getElementById(
          type === "matched" ? "matchedResult" : "unmatchedResult"
        );
        var text = resultEl.textContent;

        if (text === "无匹配数据" || text === "无不匹配数据" || text.indexOf("将显示在这里") >= 0) {
          showToast("没有可复制的内容", true);
          return;
        }

        navigator.clipboard.writeText(text).then(function () {
          showToast("已复制到剪贴板");
        });
      }

      // Clear all
      function clearAll() {
        document.getElementById("inputData").value = "";
        var container = document.getElementById("conditionsContainer");
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        document.getElementById("matchedResult").textContent = "匹配的数据将显示在这里...";
        document.getElementById("unmatchedResult").textContent = "不匹配的数据将显示在这里...";

        state.parsedData = [];
        state.headers = [];
        state.isCSV = false;

        updateStats(0, 0, 0);
        updateModeIndicator(false);
        addCondition();

        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
        showToast("已清空");
      }

      // Save to storage
      function saveToStorage() {
        var data = {
          input: document.getElementById("inputData").value,
          delimiter: document.getElementById("delimiter").value,
          hasHeader: document.getElementById("hasHeader").value,
          logic: state.logic,
          caseSensitive: document.getElementById("caseSensitive").checked,
          trimWhitespace: document.getElementById("trimWhitespace").checked,
          skipEmpty: document.getElementById("skipEmpty").checked,
          conditions: getConditions()
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      // Load from storage
      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (!saved) return false;

        try {
          var data = JSON.parse(saved);
          document.getElementById("inputData").value = data.input || "";
          document.getElementById("delimiter").value = data.delimiter || "auto";
          document.getElementById("hasHeader").value = data.hasHeader || "auto";
          document.getElementById("caseSensitive").checked = data.caseSensitive || false;
          document.getElementById("trimWhitespace").checked =
            data.trimWhitespace !== undefined ? data.trimWhitespace : true;
          document.getElementById("skipEmpty").checked =
            data.skipEmpty !== undefined ? data.skipEmpty : true;

          if (data.logic) {
            setLogic(data.logic);
          }

          if (data.input) {
            parseData();
          }

          if (data.conditions && data.conditions.length > 0) {
            data.conditions.forEach(function (cond) {
              addCondition(cond);
            });
          } else {
            addCondition();
          }

          return true;
        } catch (e) {
          return false;
        }
      }

      // Save to URL
      function saveToUrl() {
        var data = {
          i: document.getElementById("inputData").value,
          d: document.getElementById("delimiter").value,
          h: document.getElementById("hasHeader").value,
          l: state.logic,
          cs: document.getElementById("caseSensitive").checked,
          tw: document.getElementById("trimWhitespace").checked,
          se: document.getElementById("skipEmpty").checked,
          c: getConditions()
        };

        try {
          var encoded = btoa(encodeURIComponent(JSON.stringify(data)));
          if (encoded.length < 2000) {
            history.replaceState(null, "", "#" + encoded);
            return true;
          }
        } catch (e) {
          // ignore
        }
        return false;
      }

      // Load from URL
      function loadFromUrl() {
        var hash = location.hash.slice(1);
        if (!hash) return false;

        try {
          var data = JSON.parse(decodeURIComponent(atob(hash)));
          document.getElementById("inputData").value = data.i || "";
          document.getElementById("delimiter").value = data.d || "auto";
          document.getElementById("hasHeader").value = data.h || "auto";
          document.getElementById("caseSensitive").checked = data.cs || false;
          document.getElementById("trimWhitespace").checked =
            data.tw !== undefined ? data.tw : true;
          document.getElementById("skipEmpty").checked = data.se !== undefined ? data.se : true;

          if (data.l) {
            setLogic(data.l);
          }

          if (data.i) {
            parseData();
          }

          if (data.c && data.c.length > 0) {
            data.c.forEach(function (cond) {
              addCondition(cond);
            });
          } else {
            addCondition();
          }

          return true;
        } catch (e) {
          return false;
        }
      }

      // Share state
      function shareState() {
        if (saveToUrl()) {
          navigator.clipboard
            .writeText(location.href)
            .then(function () {
              showToast("链接已复制到剪贴板");
            })
            .catch(function () {
              showToast("请手动复制地址栏链接");
            });
        } else {
          showToast("数据过大，无法生成分享链接", true);
        }
      }

      // Initialize
      (function init() {
        if (!loadFromUrl()) {
          if (!loadFromStorage()) {
            addCondition();
          }
        }

        // Auto-save on input change
        document.getElementById("inputData").addEventListener("input", saveToStorage);
        document.getElementById("delimiter").addEventListener("change", saveToStorage);
        document.getElementById("hasHeader").addEventListener("change", saveToStorage);
        document.getElementById("caseSensitive").addEventListener("change", saveToStorage);
        document.getElementById("trimWhitespace").addEventListener("change", saveToStorage);
        document.getElementById("skipEmpty").addEventListener("change", saveToStorage);

        // Keyboard shortcut
        document.addEventListener("keydown", function (e) {
          if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            applyFilter();
          }
        });
      })();
    
