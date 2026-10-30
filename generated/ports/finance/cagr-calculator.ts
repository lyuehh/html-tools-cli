// @ts-nocheck
// Generated from tools/finance/cagr-calculator.html
// Source SHA-256: d7ad141fa7f605f4b0711e5c352a089a3129376e6613d5308b4ad25a1d50a93d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var currentMode = "cagr"; // 'cagr' | 'endValue' | 'years'
      var lastResultText = "";

      function fmt(num) {
        if (Math.abs(num) >= 1e9) return (num / 1e9).toFixed(2) + "B";
        if (Math.abs(num) >= 1e6) return (num / 1e6).toFixed(2) + "M";
        if (Math.abs(num) >= 1e4) return num.toLocaleString("zh-CN", { maximumFractionDigits: 2 });
        return num.toLocaleString("zh-CN", { maximumFractionDigits: 4, minimumFractionDigits: 2 });
      }

      function fmtPct(num) {
        return (num * 100).toFixed(4) + "%";
      }

      function showStatus(msg, type) {
        var el = document.getElementById("statusEl");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function showResult() {
        document.getElementById("emptyState").style.display = "none";
        var rc = document.getElementById("resultContent");
        rc.style.display = "flex";
      }

      function hideResult() {
        document.getElementById("emptyState").style.display = "";
        document.getElementById("resultContent").style.display = "none";
      }

      function buildGrowthTable(startVal, cagr, years) {
        var tbody = document.getElementById("growthTableBody");
        tbody.innerHTML = "";
        var current = startVal;
        var maxRows = Math.min(Math.ceil(years), 50);
        for (var y = 1; y <= maxRows; y++) {
          var prev = current;
          var fraction = Math.min(1, years - (y - 1));
          var yearCagr = Math.pow(1 + cagr, fraction) - 1;
          current = prev * (1 + yearCagr);
          var tr = document.createElement("tr");
          var tdYear = document.createElement("td");
          tdYear.textContent = "第 " + y + " 年";
          var tdVal = document.createElement("td");
          tdVal.className = "accent";
          tdVal.textContent = fmt(current);
          var tdGrowth = document.createElement("td");
          tdGrowth.textContent = "+" + fmt(current - prev);
          tr.appendChild(tdYear);
          tr.appendChild(tdVal);
          tr.appendChild(tdGrowth);
          tbody.appendChild(tr);
        }
      }

      function calcCagr() {
        var sv = parseFloat(document.getElementById("startValueCagr").value);
        var ev = parseFloat(document.getElementById("endValueCagr").value);
        var yrs = parseFloat(document.getElementById("yearsCagr").value);
        if (isNaN(sv) || isNaN(ev) || isNaN(yrs)) {
          showStatus("请填写全部三个字段", "error");
          return;
        }
        if (sv <= 0) {
          showStatus("初始值必须大于 0", "error");
          return;
        }
        if (ev <= 0) {
          showStatus("终值必须大于 0", "error");
          return;
        }
        if (yrs <= 0) {
          showStatus("年数必须大于 0", "error");
          return;
        }
        var cagr = Math.pow(ev / sv, 1 / yrs) - 1;
        var totalGrowth = (ev - sv) / sv;
        var absGrowth = ev - sv;

        document.getElementById("mainResultLabel").textContent = "CAGR（复合年增长率）";
        document.getElementById("mainResultValue").textContent = (cagr * 100).toFixed(4) + "%";
        document.getElementById("mainResultSub").textContent =
          "初始值 " + fmt(sv) + " → 终值 " + fmt(ev) + "，历时 " + yrs + " 年";
        document.getElementById("totalGrowthValue").textContent = fmtPct(totalGrowth);
        document.getElementById("absGrowthLabel").textContent = "绝对增长";
        document.getElementById("absGrowthValue").textContent =
          (absGrowth >= 0 ? "+" : "") + fmt(absGrowth);
        buildGrowthTable(sv, cagr, yrs);
        document.getElementById("growthTableContainer").style.display = "";

        lastResultText =
          "CAGR: " +
          (cagr * 100).toFixed(4) +
          "%\n初始值: " +
          fmt(sv) +
          "\n终值: " +
          fmt(ev) +
          "\n年数: " +
          yrs +
          "\n总增长: " +
          fmtPct(totalGrowth) +
          "\n绝对增长: " +
          fmt(absGrowth);

        showResult();
        showStatus("计算完成", "success");
      }

      function calcEndValue() {
        var sv = parseFloat(document.getElementById("startValueEnd").value);
        var rate = parseFloat(document.getElementById("cagrRate").value);
        var yrs = parseFloat(document.getElementById("yearsEnd").value);
        if (isNaN(sv) || isNaN(rate) || isNaN(yrs)) {
          showStatus("请填写全部三个字段", "error");
          return;
        }
        if (sv <= 0) {
          showStatus("初始值必须大于 0", "error");
          return;
        }
        if (yrs <= 0) {
          showStatus("年数必须大于 0", "error");
          return;
        }
        var cagr = rate / 100;
        var ev = sv * Math.pow(1 + cagr, yrs);
        var totalGrowth = (ev - sv) / sv;
        var absGrowth = ev - sv;

        document.getElementById("mainResultLabel").textContent = "所需终值";
        document.getElementById("mainResultValue").textContent = fmt(ev);
        document.getElementById("mainResultSub").textContent =
          "以 CAGR " + rate.toFixed(4) + "% 增长 " + yrs + " 年后的期望值";
        document.getElementById("totalGrowthValue").textContent = fmtPct(totalGrowth);
        document.getElementById("absGrowthLabel").textContent = "绝对增长";
        document.getElementById("absGrowthValue").textContent =
          (absGrowth >= 0 ? "+" : "") + fmt(absGrowth);
        buildGrowthTable(sv, cagr, yrs);
        document.getElementById("growthTableContainer").style.display = "";

        lastResultText =
          "终值: " +
          fmt(ev) +
          "\nCAGR: " +
          rate.toFixed(4) +
          "%\n初始值: " +
          fmt(sv) +
          "\n年数: " +
          yrs +
          "\n总增长: " +
          fmtPct(totalGrowth);

        showResult();
        showStatus("计算完成", "success");
      }

      function calcYears() {
        var sv = parseFloat(document.getElementById("startValueYears").value);
        var ev = parseFloat(document.getElementById("endValueYears").value);
        var rate = parseFloat(document.getElementById("cagrRateYears").value);
        if (isNaN(sv) || isNaN(ev) || isNaN(rate)) {
          showStatus("请填写全部三个字段", "error");
          return;
        }
        if (sv <= 0) {
          showStatus("初始值必须大于 0", "error");
          return;
        }
        if (ev <= 0) {
          showStatus("终值必须大于 0", "error");
          return;
        }
        if (rate <= -100) {
          showStatus("CAGR 必须大于 -100%", "error");
          return;
        }
        var cagr = rate / 100;
        if (cagr === 0) {
          showStatus("CAGR 为 0% 时无意义", "error");
          return;
        }
        var ratio = ev / sv;
        if ((cagr > 0 && ratio <= 1) || (cagr < 0 && ratio >= 1)) {
          showStatus("初始值、终值与增长率方向不匹配", "error");
          return;
        }
        var yrs = Math.log(ratio) / Math.log(1 + cagr);
        if (!isFinite(yrs) || yrs <= 0) {
          showStatus("计算结果无效，请检查输入", "error");
          return;
        }
        var totalGrowth = (ev - sv) / sv;

        document.getElementById("mainResultLabel").textContent = "所需年数";
        document.getElementById("mainResultValue").textContent = yrs.toFixed(4) + " 年";
        document.getElementById("mainResultSub").textContent =
          "从 " + fmt(sv) + " 增长到 " + fmt(ev) + "，以 CAGR " + rate.toFixed(4) + "% 所需时间";
        document.getElementById("totalGrowthValue").textContent = fmtPct(totalGrowth);
        document.getElementById("absGrowthLabel").textContent = "绝对增长";
        var absGrowth = ev - sv;
        document.getElementById("absGrowthValue").textContent =
          (absGrowth >= 0 ? "+" : "") + fmt(absGrowth);
        buildGrowthTable(sv, cagr, yrs);
        document.getElementById("growthTableContainer").style.display = "";

        lastResultText =
          "所需年数: " +
          yrs.toFixed(4) +
          "\n初始值: " +
          fmt(sv) +
          "\n终值: " +
          fmt(ev) +
          "\nCAGR: " +
          rate.toFixed(4) +
          "%\n总增长: " +
          fmtPct(totalGrowth);

        showResult();
        showStatus("计算完成", "success");
      }

      function switchMode(mode) {
        currentMode = mode;
        document.getElementById("inputsCalcCagr").style.display = mode === "cagr" ? "" : "none";
        document.getElementById("inputsCalcEndValue").style.display =
          mode === "endValue" ? "" : "none";
        document.getElementById("inputsCalcYears").style.display = mode === "years" ? "" : "none";

        document.getElementById("tabCalcCagr").classList.toggle("active", mode === "cagr");
        document.getElementById("tabCalcEndValue").classList.toggle("active", mode === "endValue");
        document.getElementById("tabCalcYears").classList.toggle("active", mode === "years");

        if (mode === "cagr") {
          document.getElementById("formulaText").innerHTML =
            "CAGR = <code>(终值 / 初始值) ^ (1 / 年数) - 1</code>";
        } else if (mode === "endValue") {
          document.getElementById("formulaText").innerHTML =
            "终值 = <code>初始值 × (1 + CAGR) ^ 年数</code>";
        } else {
          document.getElementById("formulaText").innerHTML =
            "年数 = <code>ln(终值 / 初始值) / ln(1 + CAGR)</code>";
        }

        hideResult();
        showStatus("", "");
        lastResultText = "";
      }

      document.getElementById("tabCalcCagr").onclick = function () {
        switchMode("cagr");
      };
      document.getElementById("tabCalcEndValue").onclick = function () {
        switchMode("endValue");
      };
      document.getElementById("tabCalcYears").onclick = function () {
        switchMode("years");
      };

      document.getElementById("btnCalculate").onclick = function () {
        if (currentMode === "cagr") calcCagr();
        else if (currentMode === "endValue") calcEndValue();
        else calcYears();
      };

      document.getElementById("btnClear").onclick = function () {
        var inputs = document.querySelectorAll(".cagr-inputs input[type='number']");
        inputs.forEach(function (inp) {
          inp.value = "";
        });
        hideResult();
        showStatus("", "");
        lastResultText = "";
      };

      document.getElementById("btnCopy").onclick = async function () {
        if (!lastResultText) {
          showStatus("没有可复制的结果", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(lastResultText);
          showStatus("结果已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          document.getElementById("btnCalculate").click();
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
    
