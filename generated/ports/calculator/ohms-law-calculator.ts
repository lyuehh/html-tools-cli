// @ts-nocheck
// Generated from tools/calculator/ohms-law-calculator.html
// Source SHA-256: 731912d5fb3537ff36923706146ca7de4a7deb419d3245dcb3cb8ba8c7c444fa
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ---- 工具逻辑 ----

      // 数字格式化：避免过长小数
      function fmt(n) {
        if (!isFinite(n)) return "∞";
        var abs = Math.abs(n);
        if (abs === 0) return "0";
        if (abs >= 1000000) return (n / 1000000).toPrecision(4) + "M";
        if (abs >= 1000) return (n / 1000).toPrecision(4) + "k";
        if (abs >= 1) return parseFloat(n.toPrecision(5)).toString();
        return parseFloat(n.toPrecision(4)).toString();
      }

      function setStatus(id, msg, type) {
        var el = document.getElementById(id);
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      // ---- 模式切换 ----
      var MODES = ["ohm", "series", "parallel", "divider", "led"];
      MODES.forEach(function (mode) {
        document.getElementById("tab-" + mode).addEventListener("click", function () {
          MODES.forEach(function (m) {
            document.getElementById("tab-" + m).classList.toggle("active", m === mode);
            document
              .getElementById("tab-" + m)
              .setAttribute("aria-selected", m === mode ? "true" : "false");
            document.getElementById("panel-" + m).classList.toggle("active", m === mode);
          });
        });
      });

      // ============================================================
      // 欧姆定律
      // ============================================================
      var ohmInputs = {
        v: document.getElementById("ohm-v"),
        i: document.getElementById("ohm-i"),
        r: document.getElementById("ohm-r"),
        p: document.getElementById("ohm-p")
      };

      document.getElementById("btn-ohm-calc").addEventListener("click", calcOhm);
      document.getElementById("btn-ohm-clear").addEventListener("click", function () {
        Object.values(ohmInputs).forEach(function (el) {
          el.value = "";
          el.classList.remove("computed");
        });
        document.getElementById("ohm-result-grid").style.display = "none";
        setStatus("ohm-status", "");
      });

      function getOhmVal(key) {
        var v = parseFloat(ohmInputs[key].value);
        return isNaN(v) || v < 0 ? null : v;
      }

      function calcOhm() {
        var v = getOhmVal("v");
        var i = getOhmVal("i");
        var r = getOhmVal("r");
        var p = getOhmVal("p");
        var known = [v, i, r, p].filter(function (x) {
          return x !== null;
        }).length;

        if (known < 2) {
          setStatus("ohm-status", "请至少输入两个已知量", "error");
          return;
        }

        // 从两个已知量求解
        if (v !== null && i !== null) {
          if (r === null) {
            r = v / i;
          }
          if (p === null) {
            p = v * i;
          }
        } else if (v !== null && r !== null) {
          if (i === null) {
            i = v / r;
          }
          if (p === null) {
            p = (v * v) / r;
          }
        } else if (v !== null && p !== null) {
          if (i === null) {
            i = p / v;
          }
          if (r === null) {
            r = (v * v) / p;
          }
        } else if (i !== null && r !== null) {
          if (v === null) {
            v = i * r;
          }
          if (p === null) {
            p = i * i * r;
          }
        } else if (i !== null && p !== null) {
          if (v === null) {
            v = p / i;
          }
          if (r === null) {
            r = p / (i * i);
          }
        } else if (r !== null && p !== null) {
          if (v === null) {
            v = Math.sqrt(p * r);
          }
          if (i === null) {
            i = Math.sqrt(p / r);
          }
        }

        if (!isFinite(v) || !isFinite(i) || !isFinite(r) || !isFinite(p)) {
          setStatus("ohm-status", "计算结果无效，请检查输入值", "error");
          return;
        }

        document.getElementById("rc-v-val").textContent = fmt(v) + " V";
        document.getElementById("rc-i-val").textContent = fmt(i) + " A (" + fmt(i * 1000) + " mA)";
        document.getElementById("rc-r-val").textContent = fmt(r) + " Ω";
        document.getElementById("rc-p-val").textContent = fmt(p) + " W (" + fmt(p * 1000) + " mW)";

        var resultGrid = document.getElementById("ohm-result-grid");
        resultGrid.style.display = "grid";
        setStatus("ohm-status", "计算完成", "success");
      }

      // ============================================================
      // 串并联公共逻辑
      // ============================================================
      function makeResistorList(listId, prefix) {
        var list = document.getElementById(listId);
        list.innerHTML = "";
        addResistorRow(listId, prefix);
        addResistorRow(listId, prefix);
      }

      function addResistorRow(listId, prefix) {
        var list = document.getElementById(listId);
        var idx = list.children.length + 1;
        var row = document.createElement("div");
        row.className = "resistor-row";

        var label = document.createElement("span");
        label.className = "resistor-label";
        label.textContent = "R" + idx;

        var input = document.createElement("input");
        input.type = "number";
        input.step = "any";
        input.min = "0";
        input.className = "ohm-input";
        input.placeholder = "Ω";
        input.setAttribute("data-prefix", prefix);

        var unit = document.createElement("span");
        unit.className = "ohm-unit";
        unit.textContent = "Ω";

        var del = document.createElement("button");
        del.className = "resistor-del";
        del.textContent = "×";
        del.setAttribute("aria-label", "删除");
        del.addEventListener("click", function () {
          if (list.children.length > 1) {
            row.remove();
            // 重新编号
            var rows = list.querySelectorAll(".resistor-row");
            rows.forEach(function (r, i) {
              r.querySelector(".resistor-label").textContent = "R" + (i + 1);
            });
          }
        });

        row.appendChild(label);
        row.appendChild(input);
        row.appendChild(unit);
        row.appendChild(del);
        list.appendChild(row);
        input.focus();
      }

      function getResistorValues(listId) {
        var inputs = document.querySelectorAll("#" + listId + " input");
        var vals = [];
        var ok = true;
        inputs.forEach(function (el) {
          var v = parseFloat(el.value);
          if (isNaN(v) || v <= 0) {
            ok = false;
          } else vals.push(v);
        });
        return ok ? vals : null;
      }

      // ---- 串联 ----
      makeResistorList("series-list", "series");

      document.getElementById("btn-series-add").addEventListener("click", function () {
        addResistorRow("series-list", "series");
      });

      document.getElementById("btn-series-calc").addEventListener("click", function () {
        var vals = getResistorValues("series-list");
        if (!vals) {
          setStatus("series-status", "请确保所有电阻值均为正数", "error");
          return;
        }
        var total = vals.reduce(function (a, b) {
          return a + b;
        }, 0);
        var res = document.getElementById("series-result");
        document.getElementById("series-result-val").textContent = fmt(total) + " Ω";
        res.style.display = "block";
        setStatus(
          "series-status",
          "串联总阻 = " + vals.map(fmt).join(" + ") + " = " + fmt(total) + " Ω",
          "success"
        );
      });

      document.getElementById("btn-series-clear").addEventListener("click", function () {
        makeResistorList("series-list", "series");
        document.getElementById("series-result").style.display = "none";
        setStatus("series-status", "");
      });

      // ---- 并联 ----
      makeResistorList("parallel-list", "parallel");

      document.getElementById("btn-parallel-add").addEventListener("click", function () {
        addResistorRow("parallel-list", "parallel");
      });

      document.getElementById("btn-parallel-calc").addEventListener("click", function () {
        var vals = getResistorValues("parallel-list");
        if (!vals) {
          setStatus("parallel-status", "请确保所有电阻值均为正数", "error");
          return;
        }
        var invSum = vals.reduce(function (a, b) {
          return a + 1 / b;
        }, 0);
        var total = 1 / invSum;
        var res = document.getElementById("parallel-result");
        document.getElementById("parallel-result-val").textContent = fmt(total) + " Ω";
        res.style.display = "block";
        setStatus("parallel-status", "并联等效电阻 = " + fmt(total) + " Ω", "success");
      });

      document.getElementById("btn-parallel-clear").addEventListener("click", function () {
        makeResistorList("parallel-list", "parallel");
        document.getElementById("parallel-result").style.display = "none";
        setStatus("parallel-status", "");
      });

      // ============================================================
      // 分压器
      // ============================================================
      document.getElementById("btn-div-calc").addEventListener("click", function () {
        var vin = parseFloat(document.getElementById("div-vin").value);
        var r1 = parseFloat(document.getElementById("div-r1").value);
        var r2 = parseFloat(document.getElementById("div-r2").value);

        if (isNaN(vin) || isNaN(r1) || isNaN(r2) || vin <= 0 || r1 <= 0 || r2 <= 0) {
          setStatus("div-status", "请输入有效的正数", "error");
          return;
        }

        var vout = (vin * r2) / (r1 + r2);
        var ratio = vout / vin;
        var current = vin / (r1 + r2); // A
        var power = vin * current; // W

        document.getElementById("div-vout").textContent = fmt(vout) + " V";
        document.getElementById("div-ratio").textContent = ratio.toFixed(4);
        document.getElementById("div-current").textContent = fmt(current * 1000) + " mA";
        document.getElementById("div-power").textContent = fmt(power * 1000) + " mW";

        var grid = document.getElementById("div-result-grid");
        grid.style.display = "grid";
        setStatus("div-status", "Vout = " + fmt(vout) + " V", "success");
      });

      document.getElementById("btn-div-clear").addEventListener("click", function () {
        ["div-vin", "div-r1", "div-r2"].forEach(function (id) {
          document.getElementById(id).value = "";
        });
        document.getElementById("div-result-grid").style.display = "none";
        setStatus("div-status", "");
      });

      // ============================================================
      // LED 限流电阻
      // ============================================================

      // E24 标准阻值
      var E24 = [
        1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1,
        5.6, 6.2, 6.8, 7.5, 8.2, 9.1
      ];

      function nearestE24(val) {
        // 找到最接近的 E24 标准阻值（考虑 10 的幂次）
        if (val <= 0) return 0;
        var mag = Math.pow(10, Math.floor(Math.log10(val)));
        var norm = val / mag;
        var best = E24[0];
        var bestDiff = Math.abs(norm - E24[0]);
        E24.forEach(function (e) {
          var diff = Math.abs(norm - e);
          if (diff < bestDiff) {
            bestDiff = diff;
            best = e;
          }
        });
        return parseFloat((best * mag).toPrecision(3));
      }

      // LED 预设
      document.querySelectorAll(".led-preset").forEach(function (btn) {
        btn.addEventListener("click", function () {
          document.getElementById("led-vf").value = btn.getAttribute("data-vf");
          document.getElementById("led-if").value = btn.getAttribute("data-if");
        });
      });

      document.getElementById("btn-led-calc").addEventListener("click", function () {
        var vs = parseFloat(document.getElementById("led-vs").value);
        var vf = parseFloat(document.getElementById("led-vf").value);
        var ifMa = parseFloat(document.getElementById("led-if").value);
        var n = parseInt(document.getElementById("led-n").value, 10) || 1;

        if (isNaN(vs) || isNaN(vf) || isNaN(ifMa) || vs <= 0 || vf <= 0 || ifMa <= 0) {
          setStatus("led-status", "请输入有效的正数", "error");
          return;
        }
        if (vs <= vf) {
          setStatus("led-status", "电源电压须大于 LED 正向电压 Vf", "error");
          return;
        }

        var totalIf = (ifMa * n) / 1000; // 总电流 A（并联 n 个，每个 ifMa）
        var rExact = (vs - vf) / totalIf;
        var rStd = nearestE24(rExact);

        // 使用标准阻值的实际电流
        var iReal = (vs - vf) / rStd; // A 总
        var iEach = (iReal / n) * 1000; // mA 每个 LED

        var vR = vs - vf; // 电阻上的电压降
        var pR = vR * iReal * 1000; // mW

        document.getElementById("led-r-exact").textContent = fmt(rExact) + " Ω";
        document.getElementById("led-r-std").textContent = fmt(rStd) + " Ω";
        document.getElementById("led-i-real").textContent = fmt(iEach) + " mA/LED";
        document.getElementById("led-p-r").textContent = fmt(pR) + " mW";

        document.getElementById("led-result-grid").style.display = "grid";
        setStatus(
          "led-status",
          "限流电阻 ≈ " + fmt(rExact) + " Ω，推荐 E24 标准值 " + fmt(rStd) + " Ω",
          "success"
        );
      });

      document.getElementById("btn-led-clear").addEventListener("click", function () {
        ["led-vs", "led-vf", "led-if"].forEach(function (id) {
          document.getElementById(id).value = "";
        });
        document.getElementById("led-n").value = "1";
        document.getElementById("led-result-grid").style.display = "none";
        setStatus("led-status", "");
      });

      // ---- 主题切换（保留原版三段代码） ----
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
    
