// @ts-nocheck
// Generated from tools/finance/budget-50-30-20-planner.html
// Source SHA-256: da393d2c45e81454ecf2335f7677d31020b5bdca79cb9987ead8183282b87649
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var incomeEl = document.getElementById("incomeInput");
      var ratioNeedsEl = document.getElementById("ratioNeeds");
      var ratioWantsEl = document.getElementById("ratioWants");
      var ratioSavingsEl = document.getElementById("ratioSavings");
      var ratioWarnEl = document.getElementById("ratioWarn");
      var currencySelectEl = document.getElementById("currencySelect");
      var statusEl = document.getElementById("status");

      var period = "monthly"; // 'monthly' | 'annual'

      var CURRENCY_SYMBOLS = {
        CNY: "¥",
        USD: "$",
        EUR: "€",
        GBP: "£",
        JPY: "¥",
        HKD: "HK$"
      };

      function getCurrencySymbol() {
        return CURRENCY_SYMBOLS[currencySelectEl.value] || "¥";
      }

      function fmt(num) {
        var sym = getCurrencySymbol();
        if (num >= 1e8) return sym + " " + (num / 1e8).toFixed(2) + " 亿";
        if (num >= 1e4) return sym + " " + (num / 1e4).toFixed(2) + " 万";
        return (
          sym +
          " " +
          num.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
        );
      }

      function getRatios() {
        var n = parseFloat(ratioNeedsEl.value) || 0;
        var w = parseFloat(ratioWantsEl.value) || 0;
        var s = parseFloat(ratioSavingsEl.value) || 0;
        return { n: n, w: w, s: s, total: n + w + s };
      }

      function updateDonut(needsPct, wantsPct, savingsPct) {
        var circ = 2 * Math.PI * 80; // circumference ≈ 502.65
        var gap = 4; // small gap between segments
        var needsLen = (needsPct / 100) * circ - gap;
        var wantsLen = (wantsPct / 100) * circ - gap;
        var savingsLen = (savingsPct / 100) * circ - gap;
        if (needsLen < 0) needsLen = 0;
        if (wantsLen < 0) wantsLen = 0;
        if (savingsLen < 0) savingsLen = 0;

        var needsOff = 0;
        var wantsOff = -(needsLen + gap);
        var savingsOff = -(needsLen + gap + wantsLen + gap);

        function setSegment(id, len, offset) {
          var el = document.getElementById(id);
          if (!el) return;
          el.setAttribute("stroke-dasharray", len + " " + (circ - len));
          el.setAttribute("stroke-dashoffset", offset);
        }
        setSegment("segNeeds", needsLen, needsOff);
        setSegment("segWants", wantsLen, wantsOff);
        setSegment("segSavings", savingsLen, savingsOff);
      }

      function calculate() {
        var rawIncome = parseFloat(incomeEl.value) || 0;
        var ratios = getRatios();

        var valid = Math.abs(ratios.total - 100) < 0.01;
        ratioWarnEl.classList.toggle("show", !valid && rawIncome > 0);

        var monthlyIncome = period === "monthly" ? rawIncome : rawIncome / 12;
        var annualIncome = period === "monthly" ? rawIncome * 12 : rawIncome;

        var sym = getCurrencySymbol();
        document.getElementById("currencyPrefix").textContent = sym;
        document.getElementById("donutLabel").textContent =
          period === "monthly" ? "月收入" : "年收入";
        document.getElementById("donutValue").textContent = fmt(rawIncome);

        var pNeeds = ratios.n;
        var pWants = ratios.w;
        var pSavings = ratios.s;

        var mNeeds = (monthlyIncome * pNeeds) / 100;
        var mWants = (monthlyIncome * pWants) / 100;
        var mSavings = (monthlyIncome * pSavings) / 100;
        var aNeeds = mNeeds * 12;
        var aWants = mWants * 12;
        var aSavings = mSavings * 12;

        // Cards
        document.getElementById("amtNeeds").textContent = fmt(mNeeds);
        document.getElementById("subNeeds").textContent = "年度 " + fmt(aNeeds);
        document.getElementById("badgeNeeds").textContent = pNeeds + "%";
        document.getElementById("barNeeds").style.width = pNeeds + "%";

        document.getElementById("amtWants").textContent = fmt(mWants);
        document.getElementById("subWants").textContent = "年度 " + fmt(aWants);
        document.getElementById("badgeWants").textContent = pWants + "%";
        document.getElementById("barWants").style.width = pWants + "%";

        document.getElementById("amtSavings").textContent = fmt(mSavings);
        document.getElementById("subSavings").textContent = "年度 " + fmt(aSavings);
        document.getElementById("badgeSavings").textContent = pSavings + "%";
        document.getElementById("barSavings").style.width = pSavings + "%";

        // Stats
        document.getElementById("statMonthly").textContent = fmt(monthlyIncome);
        document.getElementById("statAnnual").textContent = fmt(annualIncome);
        document.getElementById("statDaily").textContent = fmt(monthlyIncome / 30);

        // Donut
        if (valid && rawIncome > 0) {
          updateDonut(pNeeds, pWants, pSavings);
        } else {
          updateDonut(0, 0, 0);
        }

        // Status
        if (rawIncome <= 0) {
          showStatus("请输入税后收入", "");
        } else if (!valid) {
          showStatus("比例之和为 " + ratios.total + "%，请调整至 100%", "error");
        } else {
          showStatus("计算完成", "success");
        }

        saveState();
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // Period tabs
      document.getElementById("tabMonthly").addEventListener("click", function () {
        period = "monthly";
        document.getElementById("tabMonthly").classList.add("active");
        document.getElementById("tabAnnual").classList.remove("active");
        calculate();
      });
      document.getElementById("tabAnnual").addEventListener("click", function () {
        period = "annual";
        document.getElementById("tabAnnual").classList.add("active");
        document.getElementById("tabMonthly").classList.remove("active");
        calculate();
      });

      // Inputs
      incomeEl.addEventListener("input", calculate);
      ratioNeedsEl.addEventListener("input", calculate);
      ratioWantsEl.addEventListener("input", calculate);
      ratioSavingsEl.addEventListener("input", calculate);
      currencySelectEl.addEventListener("change", calculate);

      // Reset
      document.getElementById("btnReset").addEventListener("click", function () {
        incomeEl.value = "10000";
        ratioNeedsEl.value = "50";
        ratioWantsEl.value = "30";
        ratioSavingsEl.value = "20";
        period = "monthly";
        document.getElementById("tabMonthly").classList.add("active");
        document.getElementById("tabAnnual").classList.remove("active");
        currencySelectEl.value = "CNY";
        calculate();
      });

      // Copy result
      document.getElementById("btnCopy").addEventListener("click", function () {
        var income = parseFloat(incomeEl.value) || 0;
        var sym = getCurrencySymbol();
        if (!income) {
          showStatus("请先输入收入", "error");
          return;
        }
        var ratios = getRatios();
        var m = period === "monthly" ? income : income / 12;
        var text =
          "50/30/20 预算规划\n" +
          "收入（月）：" +
          sym +
          " " +
          m.toFixed(0) +
          "\n" +
          "必要支出 " +
          ratios.n +
          "%：" +
          sym +
          " " +
          ((m * ratios.n) / 100).toFixed(0) +
          "\n" +
          "想要支出 " +
          ratios.w +
          "%：" +
          sym +
          " " +
          ((m * ratios.w) / 100).toFixed(0) +
          "\n" +
          "储蓄/还债 " +
          ratios.s +
          "%：" +
          sym +
          " " +
          ((m * ratios.s) / 100).toFixed(0) +
          "\n生成于 tools.realtime-ai.chat";
        navigator.clipboard.writeText(text).then(
          function () {
            showStatus("已复制到剪贴板", "success");
          },
          function () {
            showStatus("复制失败", "error");
          }
        );
      });

      // Share
      document.getElementById("btnShare").addEventListener("click", function () {
        saveToUrl();
        navigator.clipboard.writeText(location.href).then(
          function () {
            showStatus("分享链接已复制", "success");
          },
          function () {
            showStatus("复制失败", "error");
          }
        );
      });

      // State persistence via URL hash + localStorage
      var LS_KEY = "budget_503020_v1";

      function saveToUrl() {
        var state = {
          income: incomeEl.value,
          period: period,
          currency: currencySelectEl.value,
          needs: ratioNeedsEl.value,
          wants: ratioWantsEl.value,
          savings: ratioSavingsEl.value
        };
        try {
          history.replaceState(null, "", "#" + btoa(JSON.stringify(state)));
        } catch (e) {
          // ignore
        }
      }

      function saveState() {
        saveToUrl();
        try {
          var state = {
            income: incomeEl.value,
            period: period,
            currency: currencySelectEl.value,
            needs: ratioNeedsEl.value,
            wants: ratioWantsEl.value,
            savings: ratioSavingsEl.value
          };
          localStorage.setItem(LS_KEY, JSON.stringify(state));
        } catch (e) {
          // ignore
        }
      }

      function loadState() {
        var raw = null;
        try {
          var hash = location.hash.slice(1);
          if (hash) raw = JSON.parse(atob(hash));
        } catch (e) {
          raw = null;
        }
        if (!raw) {
          try {
            var ls = localStorage.getItem(LS_KEY);
            if (ls) raw = JSON.parse(ls);
          } catch (e) {
            raw = null;
          }
        }
        if (raw) {
          if (raw.income) incomeEl.value = raw.income;
          if (raw.currency) currencySelectEl.value = raw.currency;
          if (raw.needs) ratioNeedsEl.value = raw.needs;
          if (raw.wants) ratioWantsEl.value = raw.wants;
          if (raw.savings) ratioSavingsEl.value = raw.savings;
          if (raw.period === "annual") {
            period = "annual";
            document.getElementById("tabAnnual").classList.add("active");
            document.getElementById("tabMonthly").classList.remove("active");
          }
        } else {
          incomeEl.value = "10000";
        }
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
      loadState();
      calculate();
    
