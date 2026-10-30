// @ts-nocheck
// Generated from tools/realestate/rental-cost.html
// Source SHA-256: d732fc4b1e95b387567d1112c9c251204343f3ec657ecffa734453262e119ab6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const optionalHeader = document.getElementById("optionalHeader");
      const optionalContent = document.getElementById("optionalContent");
      const optionalToggle = document.getElementById("optionalToggle");
      const btnCalculate = document.getElementById("btnCalculate");
      const resultSection = document.getElementById("resultSection");

      optionalHeader.addEventListener("click", function () {
        const isShow = optionalContent.classList.toggle("show");
        optionalToggle.textContent = isShow ? "收起" : "展开";
      });

      function formatMoney(num) {
        return num.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      }

      function calculate() {
        const monthlyRent = parseFloat(document.getElementById("monthlyRent").value) || 0;
        const leaseTerm = parseInt(document.getElementById("leaseTerm").value, 10) || 12;
        const deposit = parseFloat(document.getElementById("deposit").value) || 0;
        const agencyFee = parseFloat(document.getElementById("agencyFee").value) || 0;
        const propertyFee = parseFloat(document.getElementById("propertyFee").value) || 0;
        const utilities = parseFloat(document.getElementById("utilities").value) || 0;
        const internet = parseFloat(document.getElementById("internet").value) || 0;
        const parking = parseFloat(document.getElementById("parking").value) || 0;
        const other = parseFloat(document.getElementById("other").value) || 0;

        if (monthlyRent <= 0) {
          alert("请输入有效的月租金");
          return;
        }

        const totalRent = monthlyRent * leaseTerm;
        const totalProperty = propertyFee * leaseTerm;
        const totalUtilities = utilities * leaseTerm;
        const totalInternet = internet * leaseTerm;
        const totalParking = parking * leaseTerm;
        const totalOther = other * leaseTerm;

        const totalCost =
          totalRent +
          deposit +
          agencyFee +
          totalProperty +
          totalUtilities +
          totalInternet +
          totalParking +
          totalOther;
        const effectiveTotal =
          totalRent +
          agencyFee +
          totalProperty +
          totalUtilities +
          totalInternet +
          totalParking +
          totalOther;
        const monthlyCost = effectiveTotal / leaseTerm;
        const firstMonth =
          monthlyRent + deposit + agencyFee + propertyFee + utilities + internet + parking + other;

        document.getElementById("totalCost").textContent = "¥" + formatMoney(totalCost);
        document.getElementById("monthlyCost").textContent = "¥" + formatMoney(monthlyCost);
        document.getElementById("firstMonth").textContent = "¥" + formatMoney(firstMonth);

        const breakdownList = document.getElementById("breakdownList");
        breakdownList.textContent = "";

        const items = [
          { label: "租金 (" + leaseTerm + "个月)", value: totalRent, show: true },
          { label: "押金（可退还）", value: deposit, show: deposit > 0 },
          { label: "中介费", value: agencyFee, show: agencyFee > 0 },
          { label: "物业费 (" + leaseTerm + "个月)", value: totalProperty, show: propertyFee > 0 },
          { label: "水电费 (" + leaseTerm + "个月)", value: totalUtilities, show: utilities > 0 },
          { label: "网络费 (" + leaseTerm + "个月)", value: totalInternet, show: internet > 0 },
          { label: "停车费 (" + leaseTerm + "个月)", value: totalParking, show: parking > 0 },
          { label: "其他费用 (" + leaseTerm + "个月)", value: totalOther, show: other > 0 }
        ];

        items.forEach(function (item) {
          if (item.show) {
            const div = document.createElement("div");
            div.className = "breakdown-item";

            const labelSpan = document.createElement("span");
            labelSpan.className = "breakdown-label";
            labelSpan.textContent = item.label;

            const valueSpan = document.createElement("span");
            valueSpan.className = "breakdown-value";
            valueSpan.textContent = "¥" + formatMoney(item.value);

            div.appendChild(labelSpan);
            div.appendChild(valueSpan);
            breakdownList.appendChild(div);
          }
        });

        const totalDiv = document.createElement("div");
        totalDiv.className = "breakdown-item total";
        const totalLabel = document.createElement("span");
        totalLabel.className = "breakdown-label";
        totalLabel.textContent = "总计";
        const totalValue = document.createElement("span");
        totalValue.className = "breakdown-value";
        totalValue.textContent = "¥" + formatMoney(totalCost);
        totalDiv.appendChild(totalLabel);
        totalDiv.appendChild(totalValue);
        breakdownList.appendChild(totalDiv);

        const chartData = [
          { label: "租金", value: totalRent, color: "#00f5d4" },
          { label: "押金", value: deposit, color: "#fbbf24" },
          { label: "中介费", value: agencyFee, color: "#f97316" },
          { label: "物业费", value: totalProperty, color: "#a855f7" },
          { label: "水电", value: totalUtilities, color: "#3b82f6" },
          { label: "其他", value: totalInternet + totalParking + totalOther, color: "#6b7280" }
        ].filter(function (d) {
          return d.value > 0;
        });

        const chartBar = document.getElementById("chartBar");
        chartBar.textContent = "";
        chartData.forEach(function (d) {
          const segment = document.createElement("div");
          segment.className = "chart-segment";
          segment.style.width = (d.value / totalCost) * 100 + "%";
          segment.style.backgroundColor = d.color;
          chartBar.appendChild(segment);
        });

        const chartLegend = document.getElementById("chartLegend");
        chartLegend.textContent = "";
        chartData.forEach(function (d) {
          const item = document.createElement("div");
          item.className = "legend-item";

          const color = document.createElement("div");
          color.className = "legend-color";
          color.style.backgroundColor = d.color;

          const label = document.createElement("span");
          label.textContent = d.label + " " + ((d.value / totalCost) * 100).toFixed(1) + "%";

          item.appendChild(color);
          item.appendChild(label);
          chartLegend.appendChild(item);
        });

        resultSection.classList.add("show");
      }

      btnCalculate.addEventListener("click", calculate);

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
