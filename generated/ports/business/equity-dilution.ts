// @ts-nocheck
// Generated from tools/business/equity-dilution.html
// Source SHA-256: 057a2143c2b0ee42a93d82b0ec8f3d15f1ec0d187b89d73922bba30d39fe67e9
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
        if (num >= 10000) {
          return (num / 10000).toFixed(2) + "亿";
        }
        return num.toFixed(0) + "万";
      }

      function createPieChart(container, data) {
        var total = data.reduce(function (sum, d) {
          return sum + d.value;
        }, 0);
        var cumulativePercent = 0;
        var gradients = [];

        data.forEach(function (d) {
          var percent = (d.value / total) * 100;
          var startPercent = cumulativePercent;
          cumulativePercent += percent;
          gradients.push(d.color + " " + startPercent + "% " + cumulativePercent + "%");
        });

        container.style.background = "conic-gradient(" + gradients.join(", ") + ")";
      }

      function calculate() {
        var preValuation = parseFloat(document.getElementById("preValuation").value) || 0;
        var founderShares = parseFloat(document.getElementById("founderShares").value) || 0;
        var otherShares = parseFloat(document.getElementById("otherShares").value) || 0;
        var optionPool = parseFloat(document.getElementById("optionPool").value) || 0;
        var investmentAmount = parseFloat(document.getElementById("investmentAmount").value) || 0;
        var newOptionPool = parseFloat(document.getElementById("newOptionPool").value) || 0;

        var postValuation = preValuation + investmentAmount;
        var investorSharesPct = (investmentAmount / postValuation) * 100;

        // 计算融资后各方持股（考虑新期权池从现有股东稀释）
        var dilutionFactor = (100 - investorSharesPct - newOptionPool) / 100;
        var founderAfter = founderShares * dilutionFactor;
        var otherAfter = otherShares * dilutionFactor;
        var optionAfter = optionPool * dilutionFactor + newOptionPool;

        var dilutionRate = ((founderShares - founderAfter) / founderShares) * 100;
        var founderValueBefore = (preValuation * founderShares) / 100;
        var founderValueAfter = (postValuation * founderAfter) / 100;
        var valueChange = founderValueAfter - founderValueBefore;

        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("preVal").textContent = formatMoney(preValuation);
        document.getElementById("investment").textContent = formatMoney(investmentAmount);
        document.getElementById("postVal").textContent = formatMoney(postValuation);
        document.getElementById("investorShares").textContent = investorSharesPct.toFixed(2) + "%";

        document.getElementById("founderBefore").textContent = founderShares.toFixed(2) + "%";
        document.getElementById("founderAfter").textContent = founderAfter.toFixed(2) + "%";
        document.getElementById("dilutionRate").textContent = dilutionRate.toFixed(2) + "%";

        var valueChangeEl = document.getElementById("valueChange");
        valueChangeEl.textContent = (valueChange >= 0 ? "+" : "") + formatMoney(valueChange);
        valueChangeEl.className = "result-value " + (valueChange >= 0 ? "green" : "red");

        // 饼图
        var beforeData = [
          { name: "创始人", value: founderShares, color: "#6366f1" },
          { name: "其他股东", value: otherShares, color: "#8b5cf6" },
          { name: "期权池", value: optionPool, color: "#10b981" }
        ];

        var afterData = [
          { name: "创始人", value: founderAfter, color: "#6366f1" },
          { name: "其他股东", value: otherAfter, color: "#8b5cf6" },
          { name: "期权池", value: optionAfter, color: "#10b981" },
          { name: "投资人", value: investorSharesPct, color: "#f59e0b" }
        ];

        createPieChart(document.getElementById("pieBefore"), beforeData);
        createPieChart(document.getElementById("pieAfter"), afterData);

        // 图例
        var legend = document.getElementById("legend");
        while (legend.firstChild) {
          legend.removeChild(legend.firstChild);
        }
        afterData.forEach(function (d) {
          var item = document.createElement("div");
          item.className = "legend-item";
          var color = document.createElement("div");
          color.className = "legend-color";
          color.style.background = d.color;
          var text = document.createElement("span");
          text.textContent = d.name;
          item.appendChild(color);
          item.appendChild(text);
          legend.appendChild(item);
        });

        // 详细表格
        var detailTable = document.getElementById("detailTable");
        while (detailTable.firstChild) {
          detailTable.removeChild(detailTable.firstChild);
        }

        var tableData = [
          { name: "创始人", before: founderShares, after: founderAfter },
          { name: "其他股东", before: otherShares, after: otherAfter },
          { name: "期权池", before: optionPool, after: optionAfter },
          { name: "投资人", before: 0, after: investorSharesPct }
        ];

        tableData.forEach(function (row) {
          var div = document.createElement("div");
          div.style.cssText =
            "display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border-subtle);";

          var nameSpan = document.createElement("span");
          nameSpan.textContent = row.name;

          var valueSpan = document.createElement("span");
          valueSpan.textContent = row.before.toFixed(2) + "% → " + row.after.toFixed(2) + "%";
          valueSpan.style.color = "var(--accent-cyan)";

          div.appendChild(nameSpan);
          div.appendChild(valueSpan);
          detailTable.appendChild(div);
        });
      }

      calculate();
    
