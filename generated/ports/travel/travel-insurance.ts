// @ts-nocheck
// Generated from tools/travel/travel-insurance.html
// Source SHA-256: 55f843ecffbd51cfac570063c07bc9d1cfa039754549f576a8337c471026eb8d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const insuranceItems = [
        {
          id: "medical",
          name: "医疗费用",
          desc: "覆盖旅途中的突发疾病和意外伤害医疗费用",
          importance: "essential",
          baseAmount: 100000,
          multiplier: { domestic: 0.5, asia: 1, europe: 1.5, america: 2, adventure: 2 }
        },
        {
          id: "emergency",
          name: "紧急医疗运送",
          desc: "包括紧急转运、医疗遣返和遗体运送费用",
          importance: "essential",
          baseAmount: 200000,
          multiplier: { domestic: 0.3, asia: 1, europe: 1.5, america: 2, adventure: 2.5 }
        },
        {
          id: "trip_cancel",
          name: "行程取消",
          desc: "因不可预见的原因取消行程时的损失赔偿",
          importance: "recommended",
          baseAmount: 0,
          useTripCost: true,
          multiplier: { domestic: 1, asia: 1, europe: 1, america: 1, adventure: 1 }
        },
        {
          id: "trip_interrupt",
          name: "行程中断",
          desc: "行程中因意外需要中断旅行的额外费用",
          importance: "recommended",
          baseAmount: 0,
          useTripCost: true,
          costMultiplier: 1.5,
          multiplier: { domestic: 1, asia: 1, europe: 1, america: 1, adventure: 1 }
        },
        {
          id: "baggage_loss",
          name: "行李丢失/延误",
          desc: "托运行李丢失或延误的赔偿",
          importance: "recommended",
          baseAmount: 5000,
          multiplier: { domestic: 0.5, asia: 1, europe: 1.2, america: 1.5, adventure: 1 }
        },
        {
          id: "flight_delay",
          name: "航班延误",
          desc: "航班延误超过一定时间的补偿",
          importance: "optional",
          baseAmount: 2000,
          multiplier: { domestic: 0.5, asia: 1, europe: 1, america: 1.2, adventure: 1 }
        },
        {
          id: "personal_liability",
          name: "个人责任",
          desc: "在旅途中意外造成他人人身伤害或财产损失的赔偿",
          importance: "recommended",
          baseAmount: 100000,
          multiplier: { domestic: 0.5, asia: 1, europe: 1.5, america: 2, adventure: 1.5 }
        },
        {
          id: "accident",
          name: "意外身故/伤残",
          desc: "因意外导致的身故或伤残赔偿",
          importance: "essential",
          baseAmount: 500000,
          multiplier: { domestic: 0.5, asia: 1, europe: 1, america: 1, adventure: 1.5 }
        },
        {
          id: "dental",
          name: "紧急牙科治疗",
          desc: "旅途中突发牙科急症的治疗费用",
          importance: "optional",
          baseAmount: 5000,
          multiplier: { domestic: 0.5, asia: 1, europe: 1.2, america: 1.5, adventure: 1 }
        },
        {
          id: "document_loss",
          name: "证件遗失",
          desc: "护照、签证等证件丢失的补办费用和相关损失",
          importance: "optional",
          baseAmount: 3000,
          multiplier: { domestic: 0.2, asia: 1, europe: 1, america: 1, adventure: 1 }
        },
        {
          id: "rental_car",
          name: "租车保险补充",
          desc: "租车时的额外保险保障，包括车辆损坏和盗窃",
          importance: "optional",
          baseAmount: 50000,
          multiplier: { domestic: 0.5, asia: 1, europe: 1.2, america: 1.5, adventure: 1 }
        },
        {
          id: "sports",
          name: "高风险运动",
          desc: "滑雪、潜水、攀岩等高风险运动的专项保障",
          importance: "optional",
          baseAmount: 100000,
          multiplier: { domestic: 0.5, asia: 1, europe: 1.2, america: 1.2, adventure: 2 }
        }
      ];

      const importanceLabels = {
        essential: "必备",
        recommended: "推荐",
        optional: "可选"
      };

      function renderChecklist() {
        const container = document.getElementById("checklist");
        const destination = document.getElementById("destination").value;
        const tripCost = parseFloat(document.getElementById("tripCost").value) || 0;

        container.textContent = "";

        insuranceItems.forEach((item) => {
          let amount = item.baseAmount * (item.multiplier[destination] || 1);
          if (item.useTripCost) {
            amount = tripCost * (item.costMultiplier || 1);
          }

          const label = document.createElement("label");
          label.className = "checklist-item";
          label.id = "item-" + item.id;

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = "check-" + item.id;
          checkbox.onchange = updateSummary;

          const info = document.createElement("div");
          info.className = "checklist-info";

          const title = document.createElement("div");
          title.className = "checklist-title";
          title.textContent = item.name;

          const badge = document.createElement("span");
          badge.className = "importance-badge importance-" + item.importance;
          badge.textContent = importanceLabels[item.importance];
          title.appendChild(badge);

          const desc = document.createElement("div");
          desc.className = "checklist-desc";
          desc.textContent = item.desc;

          const amountDiv = document.createElement("div");
          amountDiv.className = "checklist-amount";
          amountDiv.textContent = "建议保额: ¥" + formatNumber(amount);

          info.appendChild(title);
          info.appendChild(desc);
          info.appendChild(amountDiv);

          label.appendChild(checkbox);
          label.appendChild(info);
          container.appendChild(label);
        });

        updateSummary();
      }

      function calculate() {
        renderChecklist();
        saveState();
      }

      function updateSummary() {
        const destination = document.getElementById("destination").value;
        const tripCost = parseFloat(document.getElementById("tripCost").value) || 0;
        const duration = parseInt(document.getElementById("duration").value) || 7;
        const travelers = parseInt(document.getElementById("travelers").value) || 1;

        let totalCoverage = 0;
        let checkedCount = 0;

        insuranceItems.forEach((item) => {
          const checkbox = document.getElementById("check-" + item.id);
          const container = document.getElementById("item-" + item.id);

          if (checkbox && checkbox.checked) {
            checkedCount++;
            container.classList.add("checked");

            let amount = item.baseAmount * (item.multiplier[destination] || 1);
            if (item.useTripCost) {
              amount = tripCost * (item.costMultiplier || 1);
            }
            totalCoverage += amount;
          } else if (container) {
            container.classList.remove("checked");
          }
        });

        document.getElementById("totalCoverage").textContent = "¥" + formatNumber(totalCoverage);
        document.getElementById("checkedCount").textContent =
          checkedCount + "/" + insuranceItems.length;

        const basePremiumRate =
          {
            domestic: 0.001,
            asia: 0.002,
            europe: 0.003,
            america: 0.004,
            adventure: 0.005
          }[destination] || 0.002;

        const estimatedPremium = Math.round(
          totalCoverage * basePremiumRate * (duration / 7) * travelers
        );
        document.getElementById("estimatedPremium").textContent =
          "¥" + formatNumber(estimatedPremium);

        saveState();
      }

      function checkAll() {
        insuranceItems.forEach((item) => {
          const checkbox = document.getElementById("check-" + item.id);
          if (checkbox) checkbox.checked = true;
        });
        updateSummary();
        showToast("已全选", "success");
      }

      function checkEssential() {
        insuranceItems.forEach((item) => {
          const checkbox = document.getElementById("check-" + item.id);
          if (checkbox) {
            checkbox.checked = item.importance === "essential";
          }
        });
        updateSummary();
        showToast("已选择必备项目", "success");
      }

      function clearAllChecks() {
        insuranceItems.forEach((item) => {
          const checkbox = document.getElementById("check-" + item.id);
          if (checkbox) checkbox.checked = false;
        });
        updateSummary();
        showToast("已清除", "success");
      }

      async function copyChecklist() {
        const destination = document.getElementById("destination").value;
        const tripCost = document.getElementById("tripCost").value;
        const duration = document.getElementById("duration").value;

        const destNames = {
          domestic: "国内",
          asia: "亚洲",
          europe: "欧洲/澳洲",
          america: "美洲",
          adventure: "探险/极限运动"
        };

        let text = "旅行保险清单\n";
        text += "================\n";
        text += "行程天数: " + duration + " 天\n";
        text += "行程费用: ¥" + formatNumber(tripCost) + "\n";
        text += "目的地: " + destNames[destination] + "\n\n";

        text += "已选保险项目:\n";
        text += "----------------\n";

        insuranceItems.forEach((item) => {
          const checkbox = document.getElementById("check-" + item.id);
          if (checkbox && checkbox.checked) {
            let amount = item.baseAmount * (item.multiplier[destination] || 1);
            if (item.useTripCost) {
              amount = parseFloat(tripCost) * (item.costMultiplier || 1);
            }
            text += "✓ " + item.name + " - 建议保额: ¥" + formatNumber(amount) + "\n";
            text += "  " + item.desc + "\n\n";
          }
        });

        text += "\n建议总保额: " + document.getElementById("totalCoverage").textContent;
        text += "\n预估保费: " + document.getElementById("estimatedPremium").textContent;

        try {
          await navigator.clipboard.writeText(text);
          showToast("已复制到剪贴板", "success");
        } catch (e) {
          showToast("复制失败");
        }
      }

      function formatNumber(num) {
        return Math.round(num).toLocaleString("zh-CN");
      }

      function saveState() {
        const state = {
          duration: document.getElementById("duration").value,
          tripCost: document.getElementById("tripCost").value,
          destination: document.getElementById("destination").value,
          travelers: document.getElementById("travelers").value,
          checked: insuranceItems
            .filter((item) => {
              const checkbox = document.getElementById("check-" + item.id);
              return checkbox && checkbox.checked;
            })
            .map((item) => item.id)
        };
        localStorage.setItem("travel-insurance-state", JSON.stringify(state));
      }

      function loadState() {
        const saved = localStorage.getItem("travel-insurance-state");
        if (saved) {
          try {
            const state = JSON.parse(saved);
            document.getElementById("duration").value = state.duration || 7;
            document.getElementById("tripCost").value = state.tripCost || 10000;
            document.getElementById("destination").value = state.destination || "domestic";
            document.getElementById("travelers").value = state.travelers || 1;

            renderChecklist();

            if (state.checked) {
              state.checked.forEach((id) => {
                const checkbox = document.getElementById("check-" + id);
                if (checkbox) checkbox.checked = true;
              });
              updateSummary();
            }
          } catch (e) {
            renderChecklist();
          }
        } else {
          renderChecklist();
        }
      }

      function showToast(message, type) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.className = "toast show " + (type || "");
        setTimeout(function () {
          toast.className = "toast";
        }, 2000);
      }

      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }

      initTheme();
      loadState();
    
