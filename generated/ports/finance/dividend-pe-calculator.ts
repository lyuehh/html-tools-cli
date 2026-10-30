// @ts-nocheck
// Generated from tools/finance/dividend-pe-calculator.html
// Source SHA-256: e2da9b9d5f77a7858de71af354bf56c801e0cea4972dbaa29d2260736f733ffa
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var stockPriceEl = document.getElementById("stockPrice");
      var epsEl = document.getElementById("eps");
      var dpsEl = document.getElementById("dps");
      var bookValueEl = document.getElementById("bookValue");
      var revenueEl = document.getElementById("revenue");
      var sharesEl = document.getElementById("shares");
      var statusEl = document.getElementById("status");
      var interpretBox = document.getElementById("interpretBox");
      var interpretList = document.getElementById("interpretList");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function fmtNum(n, decimals) {
        if (decimals === undefined) decimals = 2;
        return n.toFixed(decimals);
      }

      function setBadge(el, text, cls) {
        el.textContent = text;
        el.className = "result-card-badge " + cls;
        el.style.display = "";
      }

      function hideBadge(el) {
        el.style.display = "none";
      }

      function setResult(id, value, isNA) {
        var el = document.getElementById(id);
        if (isNA) {
          el.textContent = "—";
          el.className = "result-card-value na";
        } else {
          el.textContent = value;
          el.className = "result-card-value";
        }
      }

      function addInterpret(text) {
        var li = document.createElement("li");
        li.textContent = text;
        interpretList.appendChild(li);
      }

      function calculate() {
        var price = parseFloat(stockPriceEl.value);
        var eps = parseFloat(epsEl.value);
        var dps = parseFloat(dpsEl.value);
        var bv = parseFloat(bookValueEl.value);
        var rev = parseFloat(revenueEl.value);
        var shares = parseFloat(sharesEl.value);

        if (isNaN(price) || price <= 0) {
          showStatus("请输入有效的股价（大于 0）", "error");
          return;
        }

        interpretList.innerHTML = "";
        var hasAny = false;

        // 市盈率 P/E
        if (!isNaN(eps) && eps !== 0) {
          var pe = price / eps;
          if (eps < 0) {
            setResult("peValue", "负值", false);
            setBadge(document.getElementById("peBadge"), "亏损", "badge-danger");
            addInterpret("公司每股收益为负，市盈率无实际意义，公司当前处于亏损状态。");
          } else if (pe < 10) {
            setResult("peValue", fmtNum(pe) + "×", false);
            setBadge(document.getElementById("peBadge"), "偏低", "badge-good");
            addInterpret(
              "P/E = " +
                fmtNum(pe) +
                "×，低于 10×，股价相对盈利可能被低估，但也需关注行业周期性和未来成长性。"
            );
          } else if (pe <= 25) {
            setResult("peValue", fmtNum(pe) + "×", false);
            setBadge(document.getElementById("peBadge"), "合理", "badge-good");
            addInterpret("P/E = " + fmtNum(pe) + "×，处于 10–25× 合理区间，估值适中。");
          } else if (pe <= 40) {
            setResult("peValue", fmtNum(pe) + "×", false);
            setBadge(document.getElementById("peBadge"), "偏高", "badge-warn");
            addInterpret(
              "P/E = " + fmtNum(pe) + "×，高于 25×，市场给予较高增长预期，需验证成长逻辑。"
            );
          } else {
            setResult("peValue", fmtNum(pe) + "×", false);
            setBadge(document.getElementById("peBadge"), "极高", "badge-danger");
            addInterpret(
              "P/E = " + fmtNum(pe) + "×，超过 40×，估值偏高，需要强劲的未来增长来支撑。"
            );
          }
          hasAny = true;
        } else {
          setResult("peValue", "—", true);
          hideBadge(document.getElementById("peBadge"));
        }

        // 股息率
        if (!isNaN(dps) && dps >= 0) {
          var dy = (dps / price) * 100;
          setResult("dyValue", fmtNum(dy) + "%", false);
          if (dps === 0) {
            setBadge(document.getElementById("dyBadge"), "不分红", "badge-neutral");
            addInterpret("公司不派发股息，适合偏好资本增值的投资者。");
          } else if (dy < 1) {
            setBadge(document.getElementById("dyBadge"), "极低", "badge-warn");
            addInterpret("股息率 " + fmtNum(dy) + "%，低于 1%，收息回报甚微。");
          } else if (dy <= 5) {
            setBadge(document.getElementById("dyBadge"), "正常", "badge-good");
            addInterpret("股息率 " + fmtNum(dy) + "%，处于 1–5% 的正常范围，收息吸引力适中。");
          } else if (dy <= 8) {
            setBadge(document.getElementById("dyBadge"), "较高", "badge-good");
            addInterpret(
              "股息率 " + fmtNum(dy) + "%，高于 5%，股息回报丰厚，但需确认股息可持续性。"
            );
          } else {
            setBadge(document.getElementById("dyBadge"), "异常高", "badge-danger");
            addInterpret(
              "股息率 " + fmtNum(dy) + "%，超过 8%，需核查股息是否可持续，有可能源于股价大幅下跌。"
            );
          }
          hasAny = true;
        } else {
          setResult("dyValue", "—", true);
          hideBadge(document.getElementById("dyBadge"));
        }

        // 股息支付率
        if (!isNaN(dps) && !isNaN(eps) && eps > 0) {
          var payout = (dps / eps) * 100;
          setResult("payoutValue", fmtNum(payout) + "%", false);
          if (payout < 20) {
            setBadge(document.getElementById("payoutBadge"), "低", "badge-neutral");
            addInterpret(
              "股息支付率 " + fmtNum(payout) + "%，公司保留大部分利润用于再投资，成长型风格。"
            );
          } else if (payout <= 60) {
            setBadge(document.getElementById("payoutBadge"), "合理", "badge-good");
            addInterpret(
              "股息支付率 " + fmtNum(payout) + "%，在 20–60% 的可持续区间，兼顾分红与再投资。"
            );
          } else if (payout <= 80) {
            setBadge(document.getElementById("payoutBadge"), "偏高", "badge-warn");
            addInterpret(
              "股息支付率 " + fmtNum(payout) + "%，较高，若未来盈利下降，股息可能面临削减风险。"
            );
          } else {
            setBadge(document.getElementById("payoutBadge"), "不可持续", "badge-danger");
            addInterpret(
              "股息支付率 " +
                fmtNum(payout) +
                "%，超过 80%，股息支付可持续性存疑，需关注后续现金流。"
            );
          }
          hasAny = true;
        } else {
          setResult("payoutValue", "—", true);
          hideBadge(document.getElementById("payoutBadge"));
        }

        // 市净率 P/B
        if (!isNaN(bv) && bv > 0) {
          var pb = price / bv;
          setResult("pbValue", fmtNum(pb) + "×", false);
          if (pb < 1) {
            setBadge(document.getElementById("pbBadge"), "破净", "badge-good");
            addInterpret(
              "P/B = " +
                fmtNum(pb) +
                "×，股价低于净资产，属于破净股，可能存在低估机会（需结合行业）。"
            );
          } else if (pb <= 3) {
            setBadge(document.getElementById("pbBadge"), "合理", "badge-good");
            addInterpret("P/B = " + fmtNum(pb) + "×，处于合理区间。");
          } else if (pb <= 5) {
            setBadge(document.getElementById("pbBadge"), "偏高", "badge-warn");
            addInterpret("P/B = " + fmtNum(pb) + "×，市净率偏高，对净资产溢价明显。");
          } else {
            setBadge(document.getElementById("pbBadge"), "极高", "badge-danger");
            addInterpret("P/B = " + fmtNum(pb) + "×，市净率极高，通常出现在高 ROE 或强品牌企业。");
          }
          hasAny = true;
        } else {
          setResult("pbValue", "—", true);
          hideBadge(document.getElementById("pbBadge"));
        }

        // 市销率 P/S
        if (!isNaN(rev) && rev > 0) {
          var ps = price / rev;
          setResult("psValue", fmtNum(ps) + "×", false);
          hasAny = true;
        } else {
          setResult("psValue", "—", true);
        }

        // 市值
        if (!isNaN(shares) && shares > 0) {
          var mcap = price * shares;
          var mcapStr;
          if (mcap >= 10000) {
            mcapStr = fmtNum(mcap / 10000, 2) + " 万亿元";
          } else if (mcap >= 1) {
            mcapStr = fmtNum(mcap, 2) + " 亿元";
          } else {
            mcapStr = fmtNum(mcap * 100, 2) + " 百万元";
          }
          setResult("mcapValue", mcapStr, false);
          hasAny = true;
        } else {
          setResult("mcapValue", "—", true);
        }

        if (hasAny) {
          interpretBox.style.display = interpretList.children.length > 0 ? "" : "none";
          showStatus("计算完成", "success");
        } else {
          showStatus("请至少输入股价和一项财务数据", "error");
        }
      }

      function resetAll() {
        stockPriceEl.value = "";
        epsEl.value = "";
        dpsEl.value = "";
        bookValueEl.value = "";
        revenueEl.value = "";
        sharesEl.value = "";
        ["peValue", "dyValue", "payoutValue", "pbValue", "psValue", "mcapValue"].forEach(
          function (id) {
            setResult(id, "—", true);
          }
        );
        ["peBadge", "dyBadge", "payoutBadge", "pbBadge"].forEach(function (id) {
          hideBadge(document.getElementById(id));
        });
        interpretBox.style.display = "none";
        interpretList.innerHTML = "";
        showStatus("", "");
      }

      function loadExample() {
        stockPriceEl.value = "50.00";
        epsEl.value = "3.20";
        dpsEl.value = "1.60";
        bookValueEl.value = "22.50";
        revenueEl.value = "18.00";
        sharesEl.value = "8.50";
        calculate();
      }

      function buildResultText() {
        var lines = ["股息率 / 市盈率计算结果", "========================"];
        var price = parseFloat(stockPriceEl.value);
        if (!isNaN(price)) lines.push("股价：" + price + " 元/股");

        var peEl = document.getElementById("peValue");
        if (!peEl.classList.contains("na")) lines.push("市盈率 P/E：" + peEl.textContent);

        var dyEl = document.getElementById("dyValue");
        if (!dyEl.classList.contains("na")) lines.push("股息率：" + dyEl.textContent);

        var payEl = document.getElementById("payoutValue");
        if (!payEl.classList.contains("na")) lines.push("股息支付率：" + payEl.textContent);

        var pbEl = document.getElementById("pbValue");
        if (!pbEl.classList.contains("na")) lines.push("市净率 P/B：" + pbEl.textContent);

        var psEl = document.getElementById("psValue");
        if (!psEl.classList.contains("na")) lines.push("市销率 P/S：" + psEl.textContent);

        var mcEl = document.getElementById("mcapValue");
        if (!mcEl.classList.contains("na")) lines.push("市值：" + mcEl.textContent);

        var items = interpretList.querySelectorAll("li");
        if (items.length > 0) {
          lines.push("", "综合解读：");
          items.forEach(function (li) {
            lines.push("• " + li.textContent);
          });
        }
        return lines.join("\n");
      }

      document.getElementById("btnCalc").onclick = calculate;
      document.getElementById("btnReset").onclick = resetAll;
      document.getElementById("btnExample").onclick = loadExample;
      document.getElementById("btnCopyResult").onclick = async function () {
        var text = buildResultText();
        if (text.trim() === "") {
          showStatus("暂无结果可复制", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(text);
          showStatus("结果已复制", "success");
        } catch (e) {
          showStatus("复制失败，请手动选取", "error");
        }
      };

      // 输入时实时计算
      [stockPriceEl, epsEl, dpsEl, bookValueEl, revenueEl, sharesEl].forEach(function (el) {
        el.addEventListener("input", function () {
          var price = parseFloat(stockPriceEl.value);
          if (!isNaN(price) && price > 0) calculate();
        });
      });

      // 回车触发计算
      document.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          calculate();
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
    
