// @ts-nocheck
// Generated from tools/travel/travel-budget.html
// Source SHA-256: 7e130bd9c829b752830afea2b25a7dfdec5b39a473463493954f567d83df47f0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const defaultItems = [
        { icon: "✈️", name: "交通费用", amount: 2000, color: "#4d9fff" },
        { icon: "🏨", name: "住宿费用", amount: 1500, color: "#00f5d4" },
        { icon: "🍜", name: "餐饮费用", amount: 800, color: "#ff9f43" },
        { icon: "🎫", name: "景点门票", amount: 500, color: "#00d26a" },
        { icon: "🛍️", name: "购物预算", amount: 1000, color: "#ff6b6b" },
        { icon: "🚕", name: "当地交通", amount: 300, color: "#a55eea" }
      ];

      let budgetItems = [...defaultItems];
      let nextId = budgetItems.length;

      const icons = [
        "✈️",
        "🏨",
        "🍜",
        "🎫",
        "🛍️",
        "🚕",
        "🎭",
        "🎢",
        "🍺",
        "📱",
        "💊",
        "🎁",
        "📷",
        "🧳",
        "🎿",
        "⛵"
      ];

      function render() {
        const list = document.getElementById("budgetList");
        list.innerHTML = budgetItems
          .map(
            (item, index) => `
        <div class="budget-item" data-index="${index}">
          <span class="budget-icon">${item.icon}</span>
          <input type="text" class="budget-name" value="${item.name}"
            onchange="updateItem(${index}, 'name', this.value)" style="background:transparent;border:none;color:var(--color-text-primary);font-family:inherit" aria-label="文本输入框" placeholder="请输入文本输入框">
          <input type="number" class="budget-input" value="${item.amount}" min="0"
            oninput="updateItem(${index}, 'amount', parseFloat(this.value) || 0)" aria-label="数字输入框" placeholder="请输入数字输入框">
          <button class="delete-btn" onclick="removeItem(${index})" title="删除" aria-label="×">×</button>
        </div>
      `
          )
          .join("");
        calculate();
      }

      function addItem() {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const colors = ["#4d9fff", "#00f5d4", "#ff9f43", "#00d26a", "#ff6b6b", "#a55eea"];
        budgetItems.push({
          icon: randomIcon,
          name: "新费用项",
          amount: 0,
          color: colors[budgetItems.length % colors.length]
        });
        render();
      }

      function removeItem(index) {
        if (budgetItems.length <= 1) {
          alert("至少保留一项费用");
          return;
        }
        budgetItems.splice(index, 1);
        render();
      }

      function updateItem(index, field, value) {
        budgetItems[index][field] = value;
        calculate();
      }

      function calculate() {
        const days = parseInt(document.getElementById("days").value) || 1;
        const people = parseInt(document.getElementById("people").value) || 1;
        const currency = document.getElementById("currency").value;

        const total = budgetItems.reduce((sum, item) => sum + (item.amount || 0), 0);
        const perPerson = total / people;
        const perDay = total / days;
        const perPersonDay = total / people / days;

        document.getElementById("totalBudget").textContent = currency + total.toLocaleString();
        document.getElementById("perPerson").textContent = currency + perPerson.toFixed(0);
        document.getElementById("perDay").textContent = currency + perDay.toFixed(0);
        document.getElementById("perPersonDay").textContent = currency + perPersonDay.toFixed(0);

        // Render chart
        const maxAmount = Math.max(...budgetItems.map((i) => i.amount || 0));
        const chartHtml = budgetItems
          .map((item) => {
            const percent = maxAmount > 0 ? ((item.amount || 0) / maxAmount) * 100 : 0;
            const ratio = total > 0 ? (((item.amount || 0) / total) * 100).toFixed(1) : 0;
            return `
          <div class="chart-bar">
            <div class="chart-label">${item.icon} ${item.name.slice(0, 4)}</div>
            <div class="chart-track">
              <div class="chart-fill" style="width:${percent}%;background:${item.color}"></div>
            </div>
            <div class="chart-value">${ratio}%</div>
          </div>
        `;
          })
          .join("");
        document.getElementById("chartContainer").innerHTML = chartHtml;

        // Generate tips
        generateTips(total, perPersonDay, days, currency);
      }

      function generateTips(total, perPersonDay, days, currency) {
        const tips = [];

        if (perPersonDay < 200) {
          tips.push("✅ 人均日消费较低，属于经济型旅行");
        } else if (perPersonDay < 500) {
          tips.push("💡 人均日消费适中，属于舒适型旅行");
        } else if (perPersonDay < 1000) {
          tips.push("⭐ 人均日消费较高，属于品质型旅行");
        } else {
          tips.push("👑 人均日消费很高，属于奢华型旅行");
        }

        const accommodation = budgetItems.find((i) => i.name.includes("住宿"));
        const food = budgetItems.find((i) => i.name.includes("餐饮"));

        if (accommodation && food && accommodation.amount > food.amount * 3) {
          tips.push("📊 住宿占比较高，可考虑民宿或青旅节省开支");
        }

        if (days > 7) {
          tips.push("📅 长途旅行建议预留10-15%应急资金");
        }

        tips.push("💳 建议携带多种支付方式，现金+银行卡+移动支付");

        document.getElementById("tips").innerHTML = tips.join("<br>");
      }

      // Initialize
      render();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
