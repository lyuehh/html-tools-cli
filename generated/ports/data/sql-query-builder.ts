// @ts-nocheck
// Generated from tools/data/sql-query-builder.html
// Source SHA-256: cfd83836bf956c20ecbc796e8414dfba1100425f5bfa385d1ac7abf11096da85
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 状态管理
      var currentOp = "select";
      var columns = [];
      var conditions = [];
      var values = [];
      var LS_KEY = "sql-query-builder-data";

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

      // 操作类型切换
      function selectOperation(op) {
        currentOp = op;
        var tabs = document.querySelectorAll(".op-tab");
        tabs.forEach(function (tab) {
          tab.classList.toggle("active", tab.getAttribute("data-op") === op);
        });

        // 控制各区块显示
        document.getElementById("distinctSection").style.display =
          op === "select" ? "block" : "none";
        document.getElementById("columnsSection").style.display =
          op === "select" || op === "insert" ? "block" : "none";
        document.getElementById("aliasGroup").style.display = op === "select" ? "block" : "none";
        document.getElementById("valuesSection").style.display =
          op === "insert" || op === "update" ? "block" : "none";
        document.getElementById("conditionsSection").style.display =
          op !== "insert" ? "block" : "none";
        document.getElementById("orderSection").style.display = op === "select" ? "block" : "none";
        document.getElementById("limitSection").style.display = op === "select" ? "block" : "none";

        generateSQL();
        saveToStorage();
      }

      // 添加列
      function addColumn() {
        var input = document.getElementById("columnInput");
        var aliasInput = document.getElementById("aliasInput");
        var col = input.value.trim();
        var aliasGroupVisible = document.getElementById("aliasGroup").style.display !== "none";
        var alias = aliasGroupVisible ? aliasInput.value.trim() : "";

        if (!col) {
          showToast("请输入列名", "error");
          return;
        }

        columns.push({ name: col, alias: alias });
        input.value = "";
        if (aliasInput) aliasInput.value = "";
        input.focus();

        renderColumns();
        generateSQL();
        saveToStorage();
      }

      // 移除列
      function removeColumn(index) {
        columns.splice(index, 1);
        renderColumns();
        generateSQL();
        saveToStorage();
      }

      // 渲染列列表
      function renderColumns() {
        var list = document.getElementById("columnList");
        list.textContent = "";

        if (columns.length === 0) {
          var empty = document.createElement("span");
          empty.className = "empty-state";
          empty.textContent = currentOp === "select" ? "留空表示 SELECT *" : "请添加列";
          list.appendChild(empty);
          return;
        }

        columns.forEach(function (col, i) {
          var chip = document.createElement("div");
          chip.className = "column-chip";

          var span = document.createElement("span");
          var displayText = typeof col === "string" ? col : col.name;
          if (col.alias && currentOp === "select") {
            displayText += " AS " + col.alias;
          }
          span.textContent = displayText;

          var remove = document.createElement("span");
          remove.className = "remove";
          remove.textContent = "×";
          remove.onclick = function () {
            removeColumn(i);
          };

          chip.appendChild(span);
          chip.appendChild(remove);
          list.appendChild(chip);
        });
      }

      // 添加WHERE条件
      function addCondition() {
        conditions.push({ column: "", operator: "=", value: "" });
        renderConditions();
        saveToStorage();
      }

      // 移除条件
      function removeCondition(index) {
        conditions.splice(index, 1);
        renderConditions();
        generateSQL();
        saveToStorage();
      }

      // 更新条件
      function updateCondition(index, field, value) {
        conditions[index][field] = value;
        // 当操作符改变时，重新渲染以更新值输入框的状态
        if (field === "operator") {
          renderConditions();
        }
        generateSQL();
        saveToStorage();
      }

      // 渲染条件列表
      function renderConditions() {
        var list = document.getElementById("conditionList");
        list.textContent = "";

        if (conditions.length === 0) {
          var empty = document.createElement("span");
          empty.className = "empty-state";
          empty.textContent = "无条件 (可选)";
          list.appendChild(empty);
          return;
        }

        conditions.forEach(function (cond, i) {
          var item = document.createElement("div");
          item.className = "condition-item";

          // 列名输入
          var colInput = document.createElement("input");
          colInput.type = "text";
          colInput.placeholder = "列名";
          colInput.value = cond.column;
          colInput.oninput = function () {
            updateCondition(i, "column", this.value);
          };

          // 操作符选择
          var opSelect = document.createElement("select");
          var operators = [
            "=",
            "!=",
            "<>",
            ">",
            "<",
            ">=",
            "<=",
            "LIKE",
            "NOT LIKE",
            "IN",
            "NOT IN",
            "BETWEEN",
            "IS NULL",
            "IS NOT NULL"
          ];
          operators.forEach(function (op) {
            var opt = document.createElement("option");
            opt.value = op;
            opt.textContent = op;
            if (op === cond.operator) opt.selected = true;
            opSelect.appendChild(opt);
          });
          opSelect.onchange = function () {
            updateCondition(i, "operator", this.value);
          };

          // 值输入
          var valInput = document.createElement("input");
          valInput.type = "text";
          if (cond.operator === "IN" || cond.operator === "NOT IN") {
            valInput.placeholder = "val1, val2, ...";
          } else if (cond.operator === "BETWEEN") {
            valInput.placeholder = "min, max";
          } else {
            valInput.placeholder = "值";
          }
          valInput.value = cond.value;
          valInput.oninput = function () {
            updateCondition(i, "value", this.value);
          };
          // IS NULL 和 IS NOT NULL 不需要值
          if (cond.operator === "IS NULL" || cond.operator === "IS NOT NULL") {
            valInput.disabled = true;
            valInput.placeholder = "N/A";
            valInput.value = "";
          }

          // 删除按钮
          var removeBtn = document.createElement("button");
          removeBtn.className = "btn btn-secondary btn-small";
          removeBtn.textContent = "×";
          removeBtn.onclick = function () {
            removeCondition(i);
          };

          item.appendChild(colInput);
          item.appendChild(opSelect);
          item.appendChild(valInput);
          item.appendChild(removeBtn);
          list.appendChild(item);
        });
      }

      // 添加字段值 (INSERT/UPDATE)
      function addValue() {
        values.push({ column: "", value: "" });
        renderValues();
        saveToStorage();
      }

      // 移除值
      function removeValue(index) {
        values.splice(index, 1);
        renderValues();
        generateSQL();
        saveToStorage();
      }

      // 更新值
      function updateValue(index, field, val) {
        values[index][field] = val;
        generateSQL();
        saveToStorage();
      }

      // 渲染值列表
      function renderValues() {
        var list = document.getElementById("valuesList");
        list.textContent = "";

        if (values.length === 0) {
          var empty = document.createElement("span");
          empty.className = "empty-state";
          empty.textContent = "请添加字段和值";
          list.appendChild(empty);
          return;
        }

        values.forEach(function (v, i) {
          var item = document.createElement("div");
          item.className = "condition-item";

          var colInput = document.createElement("input");
          colInput.type = "text";
          colInput.placeholder = "列名";
          colInput.value = v.column;
          colInput.oninput = function () {
            updateValue(i, "column", this.value);
          };

          var eqSpan = document.createElement("span");
          eqSpan.textContent = "=";
          eqSpan.style.color = "var(--color-text-muted)";
          eqSpan.style.fontFamily = "var(--font-mono)";
          eqSpan.style.fontWeight = "600";

          var valInput = document.createElement("input");
          valInput.type = "text";
          valInput.placeholder = "值";
          valInput.value = v.value;
          valInput.oninput = function () {
            updateValue(i, "value", this.value);
          };

          var removeBtn = document.createElement("button");
          removeBtn.className = "btn btn-secondary btn-small";
          removeBtn.textContent = "×";
          removeBtn.onclick = function () {
            removeValue(i);
          };

          item.appendChild(colInput);
          item.appendChild(eqSpan);
          item.appendChild(valInput);
          item.appendChild(removeBtn);
          list.appendChild(item);
        });
      }

      // 转义值
      function escapeValue(val) {
        if (val === "" || val === null || val === undefined) return "''";
        // 检查是否为数字
        var trimmed = val.toString().trim();
        if (trimmed !== "" && !isNaN(trimmed) && !isNaN(parseFloat(trimmed))) {
          return trimmed;
        }
        // 检查是否为NULL
        if (trimmed.toUpperCase() === "NULL") {
          return "NULL";
        }
        // 转义单引号
        return "'" + val.replace(/'/g, "''") + "'";
      }

      // 生成SQL
      function generateSQL() {
        var table = document.getElementById("tableName").value.trim() || "table_name";
        var sql = "";

        switch (currentOp) {
          case "select":
            var distinct = document.getElementById("distinctCheck").checked;
            var cols =
              columns.length > 0
                ? columns
                    .map(function (c) {
                      if (typeof c === "string") return c;
                      return c.alias ? c.name + " AS " + c.alias : c.name;
                    })
                    .join(", ")
                : "*";

            sql = "SELECT ";
            if (distinct) sql += "DISTINCT ";
            sql += cols + "\nFROM " + table;

            // WHERE
            if (conditions.length > 0) {
              var whereParts = conditions
                .filter(function (c) {
                  return c.column;
                })
                .map(function (c) {
                  if (c.operator === "IS NULL" || c.operator === "IS NOT NULL") {
                    return c.column + " " + c.operator;
                  }
                  if (c.operator === "IN" || c.operator === "NOT IN") {
                    var vals = c.value
                      .split(",")
                      .map(function (v) {
                        return escapeValue(v.trim());
                      })
                      .join(", ");
                    return c.column + " " + c.operator + " (" + vals + ")";
                  }
                  if (c.operator === "BETWEEN") {
                    var parts = c.value.split(",").map(function (v) {
                      return escapeValue(v.trim());
                    });
                    if (parts.length >= 2) {
                      return c.column + " BETWEEN " + parts[0] + " AND " + parts[1];
                    }
                    return (
                      c.column + " BETWEEN " + escapeValue(c.value) + " AND " + escapeValue(c.value)
                    );
                  }
                  return c.column + " " + c.operator + " " + escapeValue(c.value);
                });
              if (whereParts.length > 0) {
                sql += "\nWHERE " + whereParts.join("\n  AND ");
              }
            }

            // ORDER BY
            var orderBy = document.getElementById("orderBy").value.trim();
            var orderDir = document.getElementById("orderDir").value;
            if (orderBy) {
              sql += "\nORDER BY " + orderBy;
              if (orderDir) sql += " " + orderDir;
            }

            // LIMIT
            var limit = document.getElementById("limitVal").value.trim();
            var offset = document.getElementById("offsetVal").value.trim();
            if (limit) {
              sql += "\nLIMIT " + limit;
              if (offset && parseInt(offset) > 0) {
                sql += " OFFSET " + offset;
              }
            }
            break;

          case "insert":
            var insertCols =
              columns.length > 0
                ? columns.map(function (c) {
                    return typeof c === "string" ? c : c.name;
                  })
                : values
                    .filter(function (v) {
                      return v.column;
                    })
                    .map(function (v) {
                      return v.column;
                    });

            var insertVals = values
              .filter(function (v) {
                return v.column;
              })
              .map(function (v) {
                return escapeValue(v.value);
              });

            if (insertCols.length > 0 && insertVals.length > 0) {
              sql =
                "INSERT INTO " +
                table +
                " (" +
                insertCols.join(", ") +
                ")\nVALUES (" +
                insertVals.join(", ") +
                ")";
            } else {
              sql = "INSERT INTO " + table + " (column1, column2)\nVALUES ('value1', 'value2')";
            }
            break;

          case "update":
            var setParts = values
              .filter(function (v) {
                return v.column;
              })
              .map(function (v) {
                return v.column + " = " + escapeValue(v.value);
              });

            sql = "UPDATE " + table;
            if (setParts.length > 0) {
              sql += "\nSET " + setParts.join(",\n    ");
            } else {
              sql += "\nSET column1 = 'value1'";
            }

            // WHERE
            if (conditions.length > 0) {
              var whereParts2 = conditions
                .filter(function (c) {
                  return c.column;
                })
                .map(function (c) {
                  if (c.operator === "IS NULL" || c.operator === "IS NOT NULL") {
                    return c.column + " " + c.operator;
                  }
                  if (c.operator === "IN" || c.operator === "NOT IN") {
                    var vals = c.value
                      .split(",")
                      .map(function (v) {
                        return escapeValue(v.trim());
                      })
                      .join(", ");
                    return c.column + " " + c.operator + " (" + vals + ")";
                  }
                  return c.column + " " + c.operator + " " + escapeValue(c.value);
                });
              if (whereParts2.length > 0) {
                sql += "\nWHERE " + whereParts2.join("\n  AND ");
              }
            }
            break;

          case "delete":
            sql = "DELETE FROM " + table;

            // WHERE
            if (conditions.length > 0) {
              var whereParts3 = conditions
                .filter(function (c) {
                  return c.column;
                })
                .map(function (c) {
                  if (c.operator === "IS NULL" || c.operator === "IS NOT NULL") {
                    return c.column + " " + c.operator;
                  }
                  if (c.operator === "IN" || c.operator === "NOT IN") {
                    var vals = c.value
                      .split(",")
                      .map(function (v) {
                        return escapeValue(v.trim());
                      })
                      .join(", ");
                    return c.column + " " + c.operator + " (" + vals + ")";
                  }
                  return c.column + " " + c.operator + " " + escapeValue(c.value);
                });
              if (whereParts3.length > 0) {
                sql += "\nWHERE " + whereParts3.join("\n  AND ");
              }
            }
            break;
        }

        sql += ";";

        // 显示SQL（使用textContent避免XSS）
        document.getElementById("sqlOutput").textContent = sql;
      }

      // 复制SQL
      function copySQL() {
        var sql = document.getElementById("sqlOutput").textContent;
        navigator.clipboard
          .writeText(sql)
          .then(function () {
            showToast("已复制到剪贴板");
          })
          .catch(function () {
            showToast("复制失败", "error");
          });
      }

      // 分享查询
      function shareQuery() {
        var data = {
          op: currentOp,
          table: document.getElementById("tableName").value,
          distinct: document.getElementById("distinctCheck").checked,
          columns: columns,
          conditions: conditions,
          values: values,
          orderBy: document.getElementById("orderBy").value,
          orderDir: document.getElementById("orderDir").value,
          limit: document.getElementById("limitVal").value,
          offset: document.getElementById("offsetVal").value
        };

        var encoded = btoa(encodeURIComponent(JSON.stringify(data)));
        var url = window.location.href.split("#")[0] + "#" + encoded;

        navigator.clipboard
          .writeText(url)
          .then(function () {
            showToast("分享链接已复制");
          })
          .catch(function () {
            showToast("复制失败", "error");
          });
      }

      // 从URL加载
      function loadFromUrl() {
        var hash = window.location.hash.slice(1);
        if (!hash) return false;

        try {
          var data = JSON.parse(decodeURIComponent(atob(hash)));
          restoreState(data);
          return true;
        } catch (e) {
          return false;
        }
      }

      // 保存到localStorage
      function saveToStorage() {
        var data = {
          op: currentOp,
          table: document.getElementById("tableName").value,
          distinct: document.getElementById("distinctCheck").checked,
          columns: columns,
          conditions: conditions,
          values: values,
          orderBy: document.getElementById("orderBy").value,
          orderDir: document.getElementById("orderDir").value,
          limit: document.getElementById("limitVal").value,
          offset: document.getElementById("offsetVal").value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      // 从localStorage加载
      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (!saved) return false;

        try {
          var data = JSON.parse(saved);
          restoreState(data);
          return true;
        } catch (e) {
          return false;
        }
      }

      // 恢复状态
      function restoreState(data) {
        if (data.table) document.getElementById("tableName").value = data.table;
        if (data.distinct !== undefined)
          document.getElementById("distinctCheck").checked = data.distinct;
        if (data.columns) columns = data.columns;
        if (data.conditions) conditions = data.conditions;
        if (data.values) values = data.values;
        if (data.orderBy) document.getElementById("orderBy").value = data.orderBy;
        if (data.orderDir) document.getElementById("orderDir").value = data.orderDir;
        if (data.limit) document.getElementById("limitVal").value = data.limit;
        if (data.offset) document.getElementById("offsetVal").value = data.offset;

        renderColumns();
        renderConditions();
        renderValues();

        if (data.op) {
          selectOperation(data.op);
        } else {
          generateSQL();
        }
      }

      // 清空所有
      function clearAll() {
        columns = [];
        conditions = [];
        values = [];

        document.getElementById("tableName").value = "users";
        document.getElementById("distinctCheck").checked = false;
        document.getElementById("orderBy").value = "";
        document.getElementById("orderDir").value = "";
        document.getElementById("limitVal").value = "";
        document.getElementById("offsetVal").value = "";
        document.getElementById("columnInput").value = "";
        document.getElementById("aliasInput").value = "";

        renderColumns();
        renderConditions();
        renderValues();
        selectOperation("select");

        localStorage.removeItem(LS_KEY);
        window.location.hash = "";

        showToast("已重置");
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
        // 回车添加列
        document.getElementById("columnInput").addEventListener("keypress", function (e) {
          if (e.key === "Enter") addColumn();
        });
        document.getElementById("aliasInput").addEventListener("keypress", function (e) {
          if (e.key === "Enter") addColumn();
        });

        // 从URL加载优先
        if (!loadFromUrl()) {
          loadFromStorage();
        }

        // 初始渲染
        renderColumns();
        renderConditions();
        renderValues();
        generateSQL();
      });
    
