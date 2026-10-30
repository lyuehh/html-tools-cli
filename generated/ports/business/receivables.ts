// @ts-nocheck
// Generated from tools/business/receivables.html
// Source SHA-256: 893dccf9b7810144da745c9c6376df5d174c79333430814a90e24b770423f6d3
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
        return num.toFixed(2) + "万";
      }

      function calculate() {
        var ages = [
          {
            label: "1年以内",
            amount: parseFloat(document.getElementById("age1").value) || 0,
            rate: parseFloat(document.getElementById("rate1").value) / 100,
            color: "#10b981",
            midAge: 0.5
          },
          {
            label: "1-2年",
            amount: parseFloat(document.getElementById("age2").value) || 0,
            rate: parseFloat(document.getElementById("rate2").value) / 100,
            color: "#22c55e",
            midAge: 1.5
          },
          {
            label: "2-3年",
            amount: parseFloat(document.getElementById("age3").value) || 0,
            rate: parseFloat(document.getElementById("rate3").value) / 100,
            color: "#f59e0b",
            midAge: 2.5
          },
          {
            label: "3-4年",
            amount: parseFloat(document.getElementById("age4").value) || 0,
            rate: parseFloat(document.getElementById("rate4").value) / 100,
            color: "#f97316",
            midAge: 3.5
          },
          {
            label: "4-5年",
            amount: parseFloat(document.getElementById("age5").value) || 0,
            rate: parseFloat(document.getElementById("rate5").value) / 100,
            color: "#ef4444",
            midAge: 4.5
          },
          {
            label: "5年以上",
            amount: parseFloat(document.getElementById("age6").value) || 0,
            rate: parseFloat(document.getElementById("rate6").value) / 100,
            color: "#dc2626",
            midAge: 6
          }
        ];

        var totalReceivables = ages.reduce(function (sum, a) {
          return sum + a.amount;
        }, 0);
        var badDebtProvision = ages.reduce(function (sum, a) {
          return sum + a.amount * a.rate;
        }, 0);
        var badDebtRate = totalReceivables > 0 ? (badDebtProvision / totalReceivables) * 100 : 0;
        var avgAge =
          totalReceivables > 0
            ? ages.reduce(function (sum, a) {
                return sum + a.amount * a.midAge;
              }, 0) / totalReceivables
            : 0;

        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("totalReceivables").textContent = formatMoney(totalReceivables);
        document.getElementById("badDebtProvision").textContent = formatMoney(badDebtProvision);

        var badDebtRateEl = document.getElementById("badDebtRate");
        badDebtRateEl.textContent = badDebtRate.toFixed(2) + "%";
        badDebtRateEl.style.color =
          badDebtRate > 20
            ? "var(--accent-red)"
            : badDebtRate > 10
              ? "var(--orange)"
              : "var(--accent-green)";

        document.getElementById("avgAge").textContent = avgAge.toFixed(1) + "年";

        // 账龄条
        var agingBar = document.getElementById("agingBar");
        while (agingBar.firstChild) {
          agingBar.removeChild(agingBar.firstChild);
        }

        ages.forEach(function (age) {
          if (age.amount > 0) {
            var segment = document.createElement("div");
            segment.className = "aging-segment";
            segment.style.width = (age.amount / totalReceivables) * 100 + "%";
            segment.style.background = age.color;
            agingBar.appendChild(segment);
          }
        });

        // 图例
        var agingLegend = document.getElementById("agingLegend");
        while (agingLegend.firstChild) {
          agingLegend.removeChild(agingLegend.firstChild);
        }

        ages.forEach(function (age) {
          if (age.amount > 0) {
            var item = document.createElement("div");
            item.className = "legend-item";
            var color = document.createElement("div");
            color.className = "legend-color";
            color.style.background = age.color;
            var text = document.createElement("span");
            text.textContent =
              age.label + " " + ((age.amount / totalReceivables) * 100).toFixed(1) + "%";
            item.appendChild(color);
            item.appendChild(text);
            agingLegend.appendChild(item);
          }
        });

        // 风险评估
        var riskIndicator = document.getElementById("riskIndicator");
        var riskIcon = document.getElementById("riskIcon");
        var riskText = document.getElementById("riskText");

        var overYearRatio =
          (ages.slice(1).reduce(function (sum, a) {
            return sum + a.amount;
          }, 0) /
            totalReceivables) *
          100;

        if (badDebtRate > 20 || overYearRatio > 40) {
          riskIndicator.className = "risk-indicator risk-high";
          riskIcon.textContent = "⚠️";
          riskText.textContent = "高风险：账龄结构不健康，建议加强催收";
        } else if (badDebtRate > 10 || overYearRatio > 25) {
          riskIndicator.className = "risk-indicator risk-medium";
          riskIcon.textContent = "⚡";
          riskText.textContent = "中等风险：部分账款账龄较长，需关注";
        } else {
          riskIndicator.className = "risk-indicator risk-low";
          riskIcon.textContent = "✅";
          riskText.textContent = "低风险：账龄结构健康，回款情况良好";
        }
      }

      calculate();
    
