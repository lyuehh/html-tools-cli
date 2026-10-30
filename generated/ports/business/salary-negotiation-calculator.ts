// @ts-nocheck
// Generated from tools/business/salary-negotiation-calculator.html
// Source SHA-256: df37157450efbf6b993f4725e44636b7d53d4df595bc974c667fe5d6def3267d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 城市社保基数上下限（元/月）2023年参考值
      var CITY_SS = {
        beijing: { min: 6821, max: 34188 },
        shanghai: { min: 7310, max: 36549 },
        guangzhou: { min: 2100, max: 31884 },
        shenzhen: { min: 2360, max: 31884 },
        hangzhou: { min: 4837, max: 30250 },
        chengdu: { min: 2259, max: 20335 },
        other: { min: 3000, max: 25000 }
      };

      // 个税计算（综合所得年度）
      // 费用扣除：6万/年起征点 + 专项扣除（五险一金个人缴纳）
      // 税率表（年应纳税所得额）
      var TAX_BRACKETS = [
        { limit: 36000, rate: 0.03, quick: 0 },
        { limit: 144000, rate: 0.1, quick: 2520 },
        { limit: 300000, rate: 0.2, quick: 16920 },
        { limit: 420000, rate: 0.25, quick: 31920 },
        { limit: 660000, rate: 0.3, quick: 52920 },
        { limit: 960000, rate: 0.35, quick: 85920 },
        { limit: Infinity, rate: 0.45, quick: 181920 }
      ];

      function calcTax(annualTaxableIncome) {
        if (annualTaxableIncome <= 0) return 0;
        for (var i = 0; i < TAX_BRACKETS.length; i++) {
          if (annualTaxableIncome <= TAX_BRACKETS[i].limit) {
            return annualTaxableIncome * TAX_BRACKETS[i].rate - TAX_BRACKETS[i].quick;
          }
        }
        return annualTaxableIncome * 0.45 - 181920;
      }

      function getCity() {
        return document.getElementById("citySelect").value;
      }

      function clampSsBase(base, city) {
        var cfg = CITY_SS[city] || CITY_SS.other;
        return Math.min(Math.max(base, cfg.min), cfg.max);
      }

      function parseOffer(block) {
        var monthly = parseFloat(block.querySelector(".offer-monthly").value) || 0;
        var monthsSel = block.querySelector(".offer-months");
        var months;
        if (monthsSel.value === "custom") {
          months = parseFloat(block.querySelector(".offer-months-val").value) || 12;
        } else {
          months = parseFloat(monthsSel.value);
        }
        var bonus = parseFloat(block.querySelector(".offer-bonus").value) || 0;
        var bonusRate = parseFloat(block.querySelector(".offer-bonus-rate").value) / 100;
        var equity = parseFloat(block.querySelector(".offer-equity").value) || 0;
        var vestYears = parseFloat(block.querySelector(".offer-vest-years").value);
        var hpfRate = parseFloat(block.querySelector(".offer-hpf").value) / 100;
        var ssBaseInput = parseFloat(block.querySelector(".offer-ss-base").value) || 0;
        var company = block.querySelector(".offer-company").value.trim();
        return {
          monthly,
          months,
          bonus,
          bonusRate,
          equity,
          vestYears,
          hpfRate,
          ssBaseInput,
          company
        };
      }

      function calcOfferResult(offer, city) {
        if (!offer.monthly) return null;
        // 社保缴费基数
        var ssBase = offer.ssBaseInput > 0 ? offer.ssBaseInput : offer.monthly;
        ssBase = clampSsBase(ssBase, city);

        // 个人缴纳五险一金（月）
        var pensionPersonal = ssBase * 0.08;
        var medicalPersonal = ssBase * 0.02 + 3;
        var unemployPersonal = ssBase * 0.005;
        var hpfPersonal = ssBase * offer.hpfRate;
        var totalSocialSecurity =
          pensionPersonal + medicalPersonal + unemployPersonal + hpfPersonal;

        // 年度税前总收入（不含股票）
        var grossAnnualBase = offer.monthly * offer.months;
        var effectiveBonus = offer.bonus * offer.bonusRate;
        var grossAnnual = grossAnnualBase + effectiveBonus;

        // 个税计算（基本工资部分）
        // 年度综合所得 = 年度工资 - 60000基本减除 - 年度五险一金个人部分
        var annualSS = totalSocialSecurity * 12;
        // 年终奖单独计税（适用全年一次性奖金政策，不并入综合所得）
        // 月收入综合所得税
        var monthlySalaryGross = offer.monthly;
        var annualSalaryOnly = monthlySalaryGross * 12;
        var taxableIncomeSalary = Math.max(0, annualSalaryOnly - 60000 - annualSS);
        var taxOnSalary = calcTax(taxableIncomeSalary);

        // 年终奖单独计税（全年一次性奖金，按月平均法：奖金/12找税率）
        var bonusTaxable = effectiveBonus;
        var bonusMonthly = bonusTaxable / 12;
        var bonusTaxRate = 0.03;
        var bonusQuick = 0;
        if (bonusMonthly > 3000) {
          bonusTaxRate = 0.1;
          bonusQuick = 210;
        }
        if (bonusMonthly > 12000) {
          bonusTaxRate = 0.2;
          bonusQuick = 1410;
        }
        if (bonusMonthly > 25000) {
          bonusTaxRate = 0.25;
          bonusQuick = 2660;
        }
        if (bonusMonthly > 35000) {
          bonusTaxRate = 0.3;
          bonusQuick = 4410;
        }
        if (bonusMonthly > 55000) {
          bonusTaxRate = 0.35;
          bonusQuick = 7160;
        }
        if (bonusMonthly > 80000) {
          bonusTaxRate = 0.45;
          bonusQuick = 15160;
        }
        var taxOnBonus = bonusTaxable > 0 ? bonusTaxable * bonusTaxRate - bonusQuick * 12 : 0;
        taxOnBonus = Math.max(0, taxOnBonus);

        var totalTax = taxOnSalary + taxOnBonus;

        // 税后年收入（不含股票）
        var netAnnual = grossAnnual - totalTax - annualSS;

        // 股票年均归属价值（税前，上市公司股票实际兑现还需缴税，此处简化不再扣税）
        var equityAnnual = offer.vestYears > 0 ? offer.equity / offer.vestYears : 0;

        // 总年化（税后薪资 + 股票归属年均值）
        var totalAnnual = netAnnual + equityAnnual;

        return {
          company: offer.company,
          grossAnnual: grossAnnual,
          annualSS: annualSS,
          totalTax: totalTax,
          netAnnual: netAnnual,
          equityAnnual: equityAnnual,
          totalAnnual: totalAnnual,
          netMonthly: netAnnual / 12
        };
      }

      function fmt(num) {
        return Math.round(num).toLocaleString("zh-CN");
      }

      function calcAndRender() {
        var city = getCity();
        var blocks = document.querySelectorAll(".offer-block");
        var results = [];
        var labels = ["A", "B", "C"];
        blocks.forEach(function (block, idx) {
          var offer = parseOffer(block);
          if (!offer.monthly) return;
          var result = calcOfferResult(offer, city);
          if (result) {
            result.label = labels[idx];
            result.idx = idx;
            results.push(result);
          }
        });

        if (results.length === 0) {
          document.getElementById("statusMsg").textContent = "请至少填写一个 Offer 的月薪";
          document.getElementById("statusMsg").className = "status error";
          document.getElementById("resultSummary").style.display = "none";
          return;
        }

        // 找最优
        var bestIdx = 0;
        for (var i = 1; i < results.length; i++) {
          if (results[i].totalAnnual > results[bestIdx].totalAnnual) bestIdx = i;
        }
        var maxTotal = results[bestIdx].totalAnnual;

        // 清除旧 best 状态
        document.querySelectorAll(".offer-block").forEach(function (b) {
          b.classList.remove("best-offer");
        });
        if (results.length > 0) {
          document.getElementById("offerBlock" + results[bestIdx].idx).classList.add("best-offer");
        }

        // 渲染结果
        var container = document.getElementById("resultOffers");
        container.innerHTML = "";
        results.forEach(function (r, ri) {
          var div = document.createElement("div");
          div.className = "result-offer" + (ri === bestIdx ? " best" : "");
          var name = r.company || "Offer " + r.label;
          div.innerHTML =
            '<div class="result-offer-name">' +
            name +
            (ri === bestIdx
              ? ' <span style="font-size:0.7rem;background:var(--color-accent-primary);color:var(--color-bg-deep);padding:1px 6px;border-radius:9999px">最优</span>'
              : "") +
            "</div>" +
            '<div class="result-row"><span class="result-row-label">税前年薪（含年终）</span><span class="result-row-value">¥' +
            fmt(r.grossAnnual) +
            "</span></div>" +
            '<div class="result-row"><span class="result-row-label">五险一金（个人）</span><span class="result-row-value deduct">-¥' +
            fmt(r.annualSS) +
            "</span></div>" +
            '<div class="result-row"><span class="result-row-label">个人所得税</span><span class="result-row-value deduct">-¥' +
            fmt(r.totalTax) +
            "</span></div>" +
            '<hr class="result-divider">' +
            '<div class="result-row"><span class="result-row-label">税后年薪</span><span class="result-row-value">¥' +
            fmt(r.netAnnual) +
            "</span></div>" +
            '<div class="result-row"><span class="result-row-label">税后月均</span><span class="result-row-value">¥' +
            fmt(r.netMonthly) +
            "</span></div>" +
            (r.equityAnnual > 0
              ? '<div class="result-row"><span class="result-row-label">股票年均归属</span><span class="result-row-value">+¥' +
                fmt(r.equityAnnual) +
                "</span></div>"
              : "") +
            '<hr class="result-divider">' +
            '<div class="result-row"><span class="result-row-label">年化总薪酬</span><span class="result-row-value highlight">¥' +
            fmt(r.totalAnnual) +
            "</span></div>";
          container.appendChild(div);
        });

        // 横向对比条
        var barsEl = document.getElementById("comparisonBars");
        barsEl.innerHTML =
          '<div class="field-section-title" style="margin-bottom:var(--space-3)">年化总薪酬对比</div>';
        results.forEach(function (r) {
          var pct = maxTotal > 0 ? (r.totalAnnual / maxTotal) * 100 : 0;
          var name = r.company || "Offer " + r.label;
          var barDiv = document.createElement("div");
          barDiv.style.marginBottom = "var(--space-3)";
          barDiv.innerHTML =
            '<div class="bar-label"><span>' +
            name +
            "</span><span>¥" +
            fmt(r.totalAnnual) +
            " / 年</span></div>" +
            '<div class="bar-track"><div class="bar-fill" style="width:' +
            pct.toFixed(1) +
            '%"></div></div>';
          barsEl.appendChild(barDiv);
        });

        document.getElementById("resultSummary").style.display = "block";
        document.getElementById("statusMsg").textContent =
          "计算完成，共对比 " + results.length + " 个 Offer";
        document.getElementById("statusMsg").className = "status success";
      }

      function resetAll() {
        document.querySelectorAll(".offer-block").forEach(function (block) {
          block.querySelectorAll("input[type='number']").forEach(function (inp) {
            inp.value = "";
          });
          block.querySelectorAll("input[type='text']").forEach(function (inp) {
            inp.value = "";
          });
          block.querySelectorAll("select").forEach(function (sel) {
            sel.selectedIndex = 0;
          });
          block.querySelectorAll(".offer-hpf").forEach(function (inp) {
            inp.value = "12";
          });
          block.querySelectorAll(".offer-bonus-rate").forEach(function (inp) {
            inp.value = "100";
          });
          block.querySelectorAll(".offer-months-custom").forEach(function (div) {
            div.style.display = "none";
          });
          block.classList.remove("best-offer");
        });
        document.getElementById("resultSummary").style.display = "none";
        document.getElementById("statusMsg").textContent = "";
        document.getElementById("statusMsg").className = "status";
      }

      // 绑定事件
      document.getElementById("btnCalc").onclick = calcAndRender;
      document.getElementById("btnReset").onclick = resetAll;

      // 自定义月数切换
      document.querySelectorAll(".offer-months").forEach(function (sel) {
        sel.addEventListener("change", function () {
          var customDiv = sel.closest(".offer-block").querySelector(".offer-months-custom");
          customDiv.style.display = sel.value === "custom" ? "block" : "none";
        });
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
    
