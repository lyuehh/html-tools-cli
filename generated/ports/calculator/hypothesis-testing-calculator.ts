// @ts-nocheck
// Generated from tools/calculator/hypothesis-testing-calculator.html
// Source SHA-256: 75fc23d7b6eba2d676e93292292718b2ed11162be57be05a1b6866769e8bef66
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ─── DOM refs ────────────────────────────────────────────────────────────
      var statusEl = document.getElementById("status");
      var alphaEl = document.getElementById("alphaSelect");
      var tailEl = document.getElementById("tailSelect");
      var tailOptionEl = document.getElementById("tailOption");
      var lastResult = "";
      var currentTab = "one";

      // ─── Tab switching ────────────────────────────────────────────────────────
      function switchTab(tab) {
        currentTab = tab;
        document.getElementById("panelOneSample").style.display = tab === "one" ? "grid" : "none";
        document.getElementById("panelTwoSample").style.display = tab === "two" ? "grid" : "none";
        document.getElementById("panelChiSquare").style.display = tab === "chi" ? "grid" : "none";

        document.getElementById("btnOneSample").className =
          "btn" + (tab === "one" ? " btn-primary" : "");
        document.getElementById("btnTwoSample").className =
          "btn" + (tab === "two" ? " btn-primary" : "");
        document.getElementById("btnChiSquare").className =
          "btn" + (tab === "chi" ? " btn-primary" : "");

        tailOptionEl.style.display = tab === "chi" ? "none" : "flex";
        clearStatus();
      }

      document.getElementById("btnOneSample").onclick = function () {
        switchTab("one");
      };
      document.getElementById("btnTwoSample").onclick = function () {
        switchTab("two");
      };
      document.getElementById("btnChiSquare").onclick = function () {
        switchTab("chi");
      };

      // ─── Utilities ────────────────────────────────────────────────────────────
      function parseNumbers(str) {
        var parts = str
          .replace(/[\n\r\t,;]+/g, " ")
          .trim()
          .split(/\s+/);
        var nums = [];
        for (var i = 0; i < parts.length; i++) {
          if (parts[i] === "") continue;
          var n = parseFloat(parts[i]);
          if (isNaN(n)) return null;
          nums.push(n);
        }
        return nums.length ? nums : null;
      }

      function arrMean(arr) {
        return (
          arr.reduce(function (a, b) {
            return a + b;
          }, 0) / arr.length
        );
      }

      function arrVariance(arr, ddof) {
        var m = arrMean(arr);
        var s = arr.reduce(function (acc, x) {
          return acc + (x - m) * (x - m);
        }, 0);
        return s / (arr.length - ddof);
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function clearStatus() {
        statusEl.textContent = "";
        statusEl.className = "status";
      }

      function fmt(n, d) {
        if (d === undefined) d = 4;
        return Number(n).toFixed(d);
      }

      // ─── Lanczos lgamma ──────────────────────────────────────────────────────
      function lgamma(x) {
        var g = 7;
        var c = [
          0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
          -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6,
          1.5056327351493116e-7
        ];
        if (x < 0.5) {
          return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
        }
        x -= 1;
        var ag = c[0];
        for (var i = 1; i < g + 2; i++) ag += c[i] / (x + i);
        var t = x + g + 0.5;
        return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(ag);
      }

      // ─── Regularized incomplete beta (for t-distribution CDF) ─────────────────
      function betacf(a, b, x) {
        var MAXIT = 200;
        var EPS = 3e-7;
        var FPMIN = 1e-30;
        var qab = a + b;
        var qap = a + 1;
        var qam = a - 1;
        var c = 1;
        var d = 1 - (qab * x) / qap;
        if (Math.abs(d) < FPMIN) d = FPMIN;
        d = 1 / d;
        var h = d;
        for (var m = 1; m <= MAXIT; m++) {
          var m2 = 2 * m;
          var aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
          d = 1 + aa * d;
          if (Math.abs(d) < FPMIN) d = FPMIN;
          c = 1 + aa / c;
          if (Math.abs(c) < FPMIN) c = FPMIN;
          d = 1 / d;
          h *= d * c;
          aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
          d = 1 + aa * d;
          if (Math.abs(d) < FPMIN) d = FPMIN;
          c = 1 + aa / c;
          if (Math.abs(c) < FPMIN) c = FPMIN;
          d = 1 / d;
          var del = d * c;
          h *= del;
          if (Math.abs(del - 1) < EPS) break;
        }
        return h;
      }

      function betai(a, b, x) {
        if (x < 0 || x > 1) return 0;
        if (x === 0) return 0;
        if (x === 1) return 1;
        var lbeta = lgamma(a + b) - lgamma(a) - lgamma(b);
        var bt = Math.exp(lbeta + a * Math.log(x) + b * Math.log(1 - x));
        if (x < (a + 1) / (a + b + 2)) {
          return (bt * betacf(a, b, x)) / a;
        }
        return 1 - (bt * betacf(b, a, 1 - x)) / b;
      }

      // Two-tailed p-value for t distribution
      function tPValue(tStat, df) {
        var x = df / (df + tStat * tStat);
        return betai(df / 2, 0.5, x);
      }

      // ─── Regularized incomplete gamma (for chi-square CDF) ────────────────────
      function gamser(a, x) {
        var ITMAX = 200;
        var EPS = 3e-7;
        var ap = a;
        var sum = 1 / a;
        var del = sum;
        for (var n = 1; n <= ITMAX; n++) {
          ap += 1;
          del *= x / ap;
          sum += del;
          if (Math.abs(del) < Math.abs(sum) * EPS) break;
        }
        return sum * Math.exp(-x + a * Math.log(x) - lgamma(a));
      }

      function gammcf(a, x) {
        var ITMAX = 200;
        var EPS = 3e-7;
        var FPMIN = 1e-30;
        var b = x + 1 - a;
        var c = 1 / FPMIN;
        var d = 1 / b;
        var h = d;
        for (var i = 1; i <= ITMAX; i++) {
          var an = -i * (i - a);
          b += 2;
          d = an * d + b;
          if (Math.abs(d) < FPMIN) d = FPMIN;
          c = b + an / c;
          if (Math.abs(c) < FPMIN) c = FPMIN;
          d = 1 / d;
          var del = d * c;
          h *= del;
          if (Math.abs(del - 1) < EPS) break;
        }
        return Math.exp(-x + a * Math.log(x) - lgamma(a)) * h;
      }

      function gammainc(a, x) {
        if (x < 0) return 0;
        if (x === 0) return 0;
        if (x < a + 1) return gamser(a, x);
        return 1 - gammcf(a, x);
      }

      function chiPValue(chiSq, df) {
        return 1 - gammainc(df / 2, chiSq / 2);
      }

      // ─── Render helpers ───────────────────────────────────────────────────────
      function renderResultItems(items) {
        var grid = document.createElement("div");
        grid.className = "result-grid";
        items.forEach(function (item) {
          var el = document.createElement("div");
          el.className = "result-item";
          var lbl = document.createElement("div");
          lbl.className = "result-item-label";
          lbl.textContent = item.label;
          var val = document.createElement("div");
          val.className = "result-item-value" + (item.cls ? " " + item.cls : "");
          val.textContent = item.value;
          el.appendChild(lbl);
          el.appendChild(val);
          grid.appendChild(el);
        });
        return grid;
      }

      function renderConclusion(reject, alpha, tail, testType) {
        var box = document.createElement("div");
        box.className = "conclusion-box " + (reject ? "reject" : "no-reject");
        var title = document.createElement("div");
        title.className = "conclusion-title";
        title.textContent = reject ? "拒绝 H₀（显著）" : "未能拒绝 H₀（不显著）";
        var body = document.createElement("div");
        if (testType === "chi") {
          body.textContent = reject
            ? "在 α=" + alpha + " 显著性水平下，观测频数与期望频数存在显著差异，拒绝零假设。"
            : "在 α=" + alpha + " 显著性水平下，观测频数与期望频数无显著差异，未能拒绝零假设。";
        } else {
          var tailDesc =
            tail === "two" ? "双侧检验" : tail === "left" ? "左侧单尾检验" : "右侧单尾检验";
          body.textContent = reject
            ? "在 α=" + alpha + "（" + tailDesc + "）显著性水平下，差异显著，拒绝零假设 H₀。"
            : "在 α=" + alpha + "（" + tailDesc + "）显著性水平下，差异不显著，未能拒绝零假设 H₀。";
        }
        box.appendChild(title);
        box.appendChild(body);
        return box;
      }

      function renderSteps(steps) {
        var box = document.createElement("div");
        box.className = "steps-box";
        var title = document.createElement("div");
        title.className = "steps-title";
        title.textContent = "计算步骤";
        box.appendChild(title);
        var ul = document.createElement("ul");
        ul.className = "steps-list";
        steps.forEach(function (s) {
          var li = document.createElement("li");
          li.textContent = s;
          ul.appendChild(li);
        });
        box.appendChild(ul);
        return box;
      }

      // ─── One-sample t-test ────────────────────────────────────────────────────
      function calcOneSample() {
        var raw = document.getElementById("oneSampleData").value;
        var mu0str = document.getElementById("oneMu").value;
        var data = parseNumbers(raw);
        if (!data || data.length < 2) {
          showStatus("请输入至少 2 个有效数值", "error");
          return;
        }
        var mu0 = parseFloat(mu0str);
        if (isNaN(mu0)) {
          showStatus("请输入假设总体均値 μ₀", "error");
          return;
        }
        var n = data.length;
        var xbar = arrMean(data);
        var s = Math.sqrt(arrVariance(data, 1));
        var se = s / Math.sqrt(n);
        var t = (xbar - mu0) / se;
        var df = n - 1;
        var alpha = parseFloat(alphaEl.value);
        var tail = tailEl.value;
        var pTwo = tPValue(Math.abs(t), df);
        var pVal, reject;
        if (tail === "two") {
          pVal = pTwo;
          reject = pVal < alpha;
        } else if (tail === "right") {
          pVal = t >= 0 ? pTwo / 2 : 1 - pTwo / 2;
          reject = pVal < alpha;
        } else {
          pVal = t <= 0 ? pTwo / 2 : 1 - pTwo / 2;
          reject = pVal < alpha;
        }

        var resultEl = document.getElementById("resultOne");
        resultEl.innerHTML = "";

        var items = [
          { label: "样本量 n", value: n },
          { label: "样本均値 x̄", value: fmt(xbar) },
          { label: "样本标准差 s", value: fmt(s) },
          { label: "标准误差 SE", value: fmt(se) },
          { label: "t 统计量", value: fmt(t) },
          { label: "自由度 df", value: df },
          {
            label: "p 値（" + (tail === "two" ? "双侧" : "单侧") + "）",
            value: pVal < 0.0001 ? pVal.toExponential(4) : fmt(pVal),
            cls: reject ? "highlight-red" : "highlight-green"
          },
          { label: "α 水平", value: alpha }
        ];
        resultEl.appendChild(renderResultItems(items));

        var h1op = tail === "two" ? "≠" : tail === "right" ? ">" : "<";
        var steps = [
          "H₀: μ = " + mu0 + "，H₁: μ " + h1op + " " + mu0,
          "计算样本均値 x̄ = " + fmt(xbar),
          "计算样本标准差 s = " + fmt(s),
          "SE = s / √n = " + fmt(s) + " / √" + n + " = " + fmt(se),
          "t = (x̄ - μ₀) / SE = (" + fmt(xbar) + " - " + mu0 + ") / " + fmt(se) + " = " + fmt(t),
          "df = n - 1 = " + df,
          "p 値 = " + (pVal < 0.0001 ? pVal.toExponential(4) : fmt(pVal)),
          "结论：p " + (reject ? "< " : "≥ ") + alpha + "，" + (reject ? "拒绝 H₀" : "未能拒绝 H₀")
        ];
        resultEl.appendChild(renderConclusion(reject, alpha, tail, "t"));
        resultEl.appendChild(renderSteps(steps));

        showStatus("计算完成", "success");
        lastResult =
          "单样本 t 检验结果\n样本量 n: " +
          n +
          "\n样本均値: " +
          fmt(xbar) +
          "\nt 统计量: " +
          fmt(t) +
          "\ndf: " +
          df +
          "\np 値: " +
          fmt(pVal) +
          "\n" +
          (reject ? "结论：拒绝 H₀（α=" + alpha + "）" : "结论：未能拒绝 H₀（α=" + alpha + "）");
      }

      // ─── Two-sample t-test ────────────────────────────────────────────────────
      function calcTwoSample() {
        var raw1 = document.getElementById("twoSampleData1").value;
        var raw2 = document.getElementById("twoSampleData2").value;
        var data1 = parseNumbers(raw1);
        var data2 = parseNumbers(raw2);
        if (!data1 || data1.length < 2) {
          showStatus("请输入样本 1 的至少 2 个有效数值", "error");
          return;
        }
        if (!data2 || data2.length < 2) {
          showStatus("请输入样本 2 的至少 2 个有效数值", "error");
          return;
        }
        var n1 = data1.length;
        var n2 = data2.length;
        var xbar1 = arrMean(data1);
        var xbar2 = arrMean(data2);
        var s1sq = arrVariance(data1, 1);
        var s2sq = arrVariance(data2, 1);
        var s1 = Math.sqrt(s1sq);
        var s2 = Math.sqrt(s2sq);
        var alpha = parseFloat(alphaEl.value);
        var tail = tailEl.value;
        var equalVar = document.getElementById("equalVariance").checked;
        var t, df, se, methodName;

        if (equalVar) {
          var sp2 = ((n1 - 1) * s1sq + (n2 - 1) * s2sq) / (n1 + n2 - 2);
          var sp = Math.sqrt(sp2);
          se = sp * Math.sqrt(1 / n1 + 1 / n2);
          t = (xbar1 - xbar2) / se;
          df = n1 + n2 - 2;
          methodName = "合并方差 t 检验（等方差）";
        } else {
          se = Math.sqrt(s1sq / n1 + s2sq / n2);
          t = (xbar1 - xbar2) / se;
          var num = Math.pow(s1sq / n1 + s2sq / n2, 2);
          var den = Math.pow(s1sq / n1, 2) / (n1 - 1) + Math.pow(s2sq / n2, 2) / (n2 - 1);
          df = Math.floor(num / den);
          methodName = "Welch t 检验（不等方差）";
        }

        var pTwo = tPValue(Math.abs(t), df);
        var pVal, reject;
        if (tail === "two") {
          pVal = pTwo;
          reject = pVal < alpha;
        } else if (tail === "right") {
          pVal = t >= 0 ? pTwo / 2 : 1 - pTwo / 2;
          reject = pVal < alpha;
        } else {
          pVal = t <= 0 ? pTwo / 2 : 1 - pTwo / 2;
          reject = pVal < alpha;
        }

        var resultEl = document.getElementById("resultTwo");
        resultEl.innerHTML = "";

        var items = [
          { label: "样本 1 均値 x̄₁", value: fmt(xbar1) },
          { label: "样本 2 均値 x̄₂", value: fmt(xbar2) },
          { label: "均値差 x̄₁ - x̄₂", value: fmt(xbar1 - xbar2) },
          { label: "样本 1 标准差 s₁", value: fmt(s1) },
          { label: "样本 2 标准差 s₂", value: fmt(s2) },
          { label: "标准误差 SE", value: fmt(se) },
          { label: "t 统计量", value: fmt(t) },
          { label: "自由度 df", value: df },
          {
            label: "p 値（" + (tail === "two" ? "双侧" : "单侧") + "）",
            value: pVal < 0.0001 ? pVal.toExponential(4) : fmt(pVal),
            cls: reject ? "highlight-red" : "highlight-green"
          },
          { label: "检验方法", value: methodName }
        ];
        resultEl.appendChild(renderResultItems(items));

        var h1desc = tail === "two" ? "μ₁ ≠ μ₂" : tail === "right" ? "μ₁ > μ₂" : "μ₁ < μ₂";
        var steps = [
          "H₀: μ₁ = μ₂，H₁: " + h1desc,
          "样本 1 均値 x̄₁ = " + fmt(xbar1) + "，n₁ = " + n1,
          "样本 2 均値 x̄₂ = " + fmt(xbar2) + "，n₂ = " + n2,
          "SE = " + fmt(se),
          "t = (x̄₁ - x̄₂) / SE = " + fmt(t),
          "df = " + df + "（" + methodName + "）",
          "p 値 = " + (pVal < 0.0001 ? pVal.toExponential(4) : fmt(pVal)),
          "结论：p " + (reject ? "< " : "≥ ") + alpha + "，" + (reject ? "拒绝 H₀" : "未能拒绝 H₀")
        ];
        resultEl.appendChild(renderConclusion(reject, alpha, tail, "t"));
        resultEl.appendChild(renderSteps(steps));

        showStatus("计算完成", "success");
        lastResult =
          "双样本 t 检验结果\n均値差: " +
          fmt(xbar1 - xbar2) +
          "\nt 统计量: " +
          fmt(t) +
          "\ndf: " +
          df +
          "\np 値: " +
          fmt(pVal) +
          "\n" +
          (reject ? "结论：拒绝 H₀（α=" + alpha + "）" : "结论：未能拒绝 H₀（α=" + alpha + "）");
      }

      // ─── Chi-square goodness-of-fit ───────────────────────────────────────────
      function calcChiSquare() {
        var rawO = document.getElementById("chiObserved").value;
        var rawE = document.getElementById("chiExpected").value;
        var observed = parseNumbers(rawO);
        if (!observed || observed.length < 2) {
          showStatus("请输入至少 2 个观测频数", "error");
          return;
        }
        for (var i = 0; i < observed.length; i++) {
          if (observed[i] < 0) {
            showStatus("观测频数不能为负数", "error");
            return;
          }
        }
        var k = observed.length;
        var N = observed.reduce(function (a, b) {
          return a + b;
        }, 0);
        var expected;
        if (rawE.trim() === "") {
          var eUniform = N / k;
          expected = observed.map(function () {
            return eUniform;
          });
        } else {
          expected = parseNumbers(rawE);
          if (!expected) {
            showStatus("期望频数格式有误，请检查输入", "error");
            return;
          }
          if (expected.length !== k) {
            showStatus(
              "期望频数个数（" + expected.length + "）与观测频数个数（" + k + "）不一致",
              "error"
            );
            return;
          }
          for (var j = 0; j < expected.length; j++) {
            if (expected[j] <= 0) {
              showStatus("期望频数必须大于 0", "error");
              return;
            }
          }
        }

        var chiSq = 0;
        for (var m = 0; m < k; m++) {
          chiSq += Math.pow(observed[m] - expected[m], 2) / expected[m];
        }
        var df = k - 1;
        var alpha = parseFloat(alphaEl.value);
        var pVal = chiPValue(chiSq, df);
        var reject = pVal < alpha;

        var resultEl = document.getElementById("resultChi");
        resultEl.innerHTML = "";

        var items = [
          { label: "类别数 k", value: k },
          { label: "总观测数 N", value: N },
          { label: "自由度 df", value: df },
          { label: "χ² 统计量", value: fmt(chiSq) },
          {
            label: "p 値",
            value: pVal < 0.0001 ? pVal.toExponential(4) : fmt(pVal),
            cls: reject ? "highlight-red" : "highlight-green"
          },
          { label: "α 水平", value: alpha }
        ];
        resultEl.appendChild(renderResultItems(items));
        resultEl.appendChild(renderConclusion(reject, alpha, "chi", "chi"));

        var tableWrapper = document.createElement("div");
        tableWrapper.className = "chi-table-wrapper";
        var tbl = document.createElement("table");
        tbl.className = "chi-table";
        var thead = document.createElement("thead");
        var hrow = document.createElement("tr");
        ["类别", "观测 O", "期望 E", "(O-E)²/E"].forEach(function (h) {
          var th = document.createElement("th");
          th.textContent = h;
          hrow.appendChild(th);
        });
        thead.appendChild(hrow);
        tbl.appendChild(thead);
        var tbody = document.createElement("tbody");
        for (var r = 0; r < k; r++) {
          var row = document.createElement("tr");
          var contrib = Math.pow(observed[r] - expected[r], 2) / expected[r];
          [r + 1, observed[r], fmt(expected[r], 2), fmt(contrib)].forEach(function (v, ci) {
            var td = document.createElement("td");
            td.textContent = v;
            if (ci === 2) td.className = "expected";
            row.appendChild(td);
          });
          tbody.appendChild(row);
        }
        tbl.appendChild(tbody);
        tableWrapper.appendChild(tbl);
        resultEl.appendChild(tableWrapper);

        var steps = [
          "H₀: 数据符合期望分布，H₁: 数据不符合期望分布",
          "总观测数 N = " + N + "，类别数 k = " + k,
          "χ² = Σ (O - E)² / E = " + fmt(chiSq),
          "df = k - 1 = " + df,
          "p 値 = " + (pVal < 0.0001 ? pVal.toExponential(4) : fmt(pVal)),
          "结论：p " + (reject ? "< " : "≥ ") + alpha + "，" + (reject ? "拒绝 H₀" : "未能拒绝 H₀")
        ];
        resultEl.appendChild(renderSteps(steps));

        showStatus("计算完成", "success");
        lastResult =
          "卡方检验结果\nχ² 统计量: " +
          fmt(chiSq) +
          "\ndf: " +
          df +
          "\np 値: " +
          fmt(pVal) +
          "\n" +
          (reject ? "结论：拒绝 H₀（α=" + alpha + "）" : "结论：未能拒绝 H₀（α=" + alpha + "）");
      }

      // ─── Buttons ──────────────────────────────────────────────────────────────
      document.getElementById("btnCalcOne").onclick = calcOneSample;
      document.getElementById("btnCalcTwo").onclick = calcTwoSample;
      document.getElementById("btnCalcChi").onclick = calcChiSquare;

      document.getElementById("btnReset").onclick = function () {
        document.getElementById("oneSampleData").value = "";
        document.getElementById("oneMu").value = "";
        document.getElementById("twoSampleData1").value = "";
        document.getElementById("twoSampleData2").value = "";
        document.getElementById("chiObserved").value = "";
        document.getElementById("chiExpected").value = "";
        document.getElementById("resultOne").innerHTML =
          '<div class="result-empty">输入数据后点击「计算」</div>';
        document.getElementById("resultTwo").innerHTML =
          '<div class="result-empty">输入数据后点击「计算」</div>';
        document.getElementById("resultChi").innerHTML =
          '<div class="result-empty">输入数据后点击「计算」</div>';
        lastResult = "";
        clearStatus();
      };

      document.getElementById("btnCopyResult").onclick = async function () {
        if (!lastResult) {
          showStatus("暂无结果可复制", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(lastResult);
          showStatus("已复制结果", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          if (currentTab === "one") calcOneSample();
          else if (currentTab === "two") calcTwoSample();
          else calcChiSquare();
        }
      });

      // ─── Theme (preserve exactly) ────────────────────────────────────────────
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
    
