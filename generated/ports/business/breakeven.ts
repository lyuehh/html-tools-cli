// @ts-nocheck
// Generated from tools/business/breakeven.html
// Source SHA-256: b94a994cfe513543b36cf018e0a43c3e3f1d101ba74a74fbaf7743222bf2faf9
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function toggleTheme() {
        var theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      }
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved) {
          document.body.setAttribute("data-theme", saved);
        } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      function formatMoney(num) {
        if (Math.abs(num) >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(0) + "元";
      }

      function calculate() {
        var fixedCost = parseFloat(document.getElementById("fixedCost").value) || 0;
        var unitPrice = parseFloat(document.getElementById("unitPrice").value) || 0;
        var variableCost = parseFloat(document.getElementById("variableCost").value) || 0;
        var targetProfit = parseFloat(document.getElementById("targetProfit").value) || 0;

        var contributionMargin = unitPrice - variableCost;
        var contributionRatio = unitPrice > 0 ? (contributionMargin / unitPrice) * 100 : 0;

        var breakevenUnits = contributionMargin > 0 ? Math.ceil(fixedCost / contributionMargin) : 0;
        var breakevenRevenue = breakevenUnits * unitPrice;
        var targetUnits =
          contributionMargin > 0 ? Math.ceil((fixedCost + targetProfit) / contributionMargin) : 0;

        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("breakevenUnits").textContent = breakevenUnits + " 件";
        document.getElementById("breakevenRevenue").textContent = formatMoney(breakevenRevenue);
        document.getElementById("contributionMargin").textContent =
          contributionMargin.toFixed(2) + "元/件";
        document.getElementById("contributionRatio").textContent =
          contributionRatio.toFixed(2) + "%";
        document.getElementById("targetUnits").textContent = targetUnits + " 件";

        // 绘制图表
        drawChart(fixedCost, unitPrice, variableCost, breakevenUnits);

        // 敏感性分析
        var scenarioBody = document.getElementById("scenarioBody");
        while (scenarioBody.firstChild) {
          scenarioBody.removeChild(scenarioBody.firstChild);
        }

        var scenarios = [0.5, 0.75, 1, 1.25, 1.5, 2];
        scenarios.forEach(function (mult) {
          var units = Math.round(breakevenUnits * mult);
          var revenue = units * unitPrice;
          var totalCost = fixedCost + units * variableCost;
          var profit = revenue - totalCost;

          var row = document.createElement("tr");

          var cell1 = document.createElement("td");
          cell1.textContent = units;

          var cell2 = document.createElement("td");
          cell2.textContent = formatMoney(revenue);

          var cell3 = document.createElement("td");
          cell3.textContent = formatMoney(totalCost);

          var cell4 = document.createElement("td");
          cell4.textContent = formatMoney(profit);
          cell4.style.color = profit >= 0 ? "var(--accent-green)" : "var(--accent-red)";

          row.appendChild(cell1);
          row.appendChild(cell2);
          row.appendChild(cell3);
          row.appendChild(cell4);
          scenarioBody.appendChild(row);
        });
      }

      function drawChart(fixedCost, unitPrice, variableCost, breakevenUnits) {
        var chart = document.getElementById("chart");
        var existingElements = chart.querySelectorAll(
          ".revenue-line, .cost-line, .breakeven-point, .loss-zone, .profit-zone"
        );
        existingElements.forEach(function (el) {
          el.remove();
        });

        var maxUnits = breakevenUnits * 2;
        var maxRevenue = maxUnits * unitPrice;
        var chartWidth = chart.offsetWidth - 20;
        var chartHeight = 180;

        // 亏损区域
        var lossZone = document.createElement("div");
        lossZone.className = "loss-zone";
        lossZone.style.left = "2px";
        lossZone.style.bottom = "2px";
        lossZone.style.width = (breakevenUnits / maxUnits) * chartWidth + "px";
        lossZone.style.height = chartHeight + "px";
        chart.appendChild(lossZone);

        // 盈利区域
        var profitZone = document.createElement("div");
        profitZone.className = "profit-zone";
        profitZone.style.left = (breakevenUnits / maxUnits) * chartWidth + 2 + "px";
        profitZone.style.bottom = "2px";
        profitZone.style.width = ((maxUnits - breakevenUnits) / maxUnits) * chartWidth + "px";
        profitZone.style.height = chartHeight + "px";
        chart.appendChild(profitZone);

        // 收入线
        var revenueAngle = (Math.atan2(chartHeight, chartWidth) * 180) / Math.PI;
        var revenueLine = document.createElement("div");
        revenueLine.className = "revenue-line";
        revenueLine.style.width =
          Math.sqrt(chartWidth * chartWidth + chartHeight * chartHeight) + "px";
        revenueLine.style.transform = "rotate(-" + revenueAngle + "deg)";
        chart.appendChild(revenueLine);

        // 成本线
        var costStartY = (fixedCost / maxRevenue) * chartHeight;
        var costEndY = ((fixedCost + maxUnits * variableCost) / maxRevenue) * chartHeight;
        var costAngle = (Math.atan2(costEndY - costStartY, chartWidth) * 180) / Math.PI;
        var costLength = Math.sqrt(
          chartWidth * chartWidth + (costEndY - costStartY) * (costEndY - costStartY)
        );
        var costLine = document.createElement("div");
        costLine.className = "cost-line";
        costLine.style.bottom = costStartY + "px";
        costLine.style.width = costLength + "px";
        costLine.style.transform = "rotate(-" + costAngle + "deg)";
        chart.appendChild(costLine);

        // 盈亏平衡点
        var bepX = (breakevenUnits / maxUnits) * chartWidth;
        var bepY = ((breakevenUnits * unitPrice) / maxRevenue) * chartHeight;
        var bepPoint = document.createElement("div");
        bepPoint.className = "breakeven-point";
        bepPoint.style.left = bepX + "px";
        bepPoint.style.bottom = bepY + "px";
        chart.appendChild(bepPoint);
      }

      calculate();
    
