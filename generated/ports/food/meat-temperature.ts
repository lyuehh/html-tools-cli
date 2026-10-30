// @ts-nocheck
// Generated from tools/food/meat-temperature.html
// Source SHA-256: fe6fee0836f83daadcb0f73ccd52cad77833267d51509de2a11f56fb058e0943
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const meats = {
        beef: {
          name: "牛肉",
          levels: [
            {
              cn: "一分熟",
              en: "Rare",
              temp: 52,
              desc: "中心冷红色，非常柔软多汁",
              color: "#dc2626"
            },
            {
              cn: "三分熟",
              en: "Medium Rare",
              temp: 57,
              desc: "中心温热红色，柔软多汁，推荐熟度",
              color: "#f97316"
            },
            {
              cn: "五分熟",
              en: "Medium",
              temp: 63,
              desc: "中心粉红色，均衡的嫩度和风味",
              color: "#eab308"
            },
            {
              cn: "七分熟",
              en: "Medium Well",
              temp: 68,
              desc: "略带粉色，较紧实",
              color: "#84cc16"
            },
            {
              cn: "全熟",
              en: "Well Done",
              temp: 74,
              desc: "完全无粉色，紧实干燥",
              color: "#6b7280"
            }
          ],
          safety: "牛排可以按个人喜好选择熟度。但绞牛肉（如汉堡）建议至少达到71°C以确保安全。"
        },
        pork: {
          name: "猪肉",
          levels: [
            {
              cn: "推荐熟度",
              en: "Medium",
              temp: 63,
              desc: "中心略带粉色，多汁嫩滑",
              color: "#f97316"
            },
            {
              cn: "传统熟度",
              en: "Well Done",
              temp: 71,
              desc: "完全无粉色，较紧实",
              color: "#84cc16"
            }
          ],
          safety:
            "现代猪肉可以安全地烹饪至63°C（略带粉色）。绞猪肉建议71°C。孕妇和免疫力低下者建议全熟。"
        },
        chicken: {
          name: "鸡肉",
          levels: [
            { cn: "安全温度", en: "Safe", temp: 74, desc: "肉汁清澈，无粉色", color: "#22c55e" },
            {
              cn: "鸡胸肉",
              en: "Breast",
              temp: 74,
              desc: "保持嫩滑的最低安全温度",
              color: "#22c55e"
            },
            {
              cn: "鸡腿/翅",
              en: "Thigh/Wing",
              temp: 82,
              desc: "胶原蛋白转化，更加美味",
              color: "#84cc16"
            }
          ],
          safety:
            "鸡肉必须完全煮熟！74°C是最低安全温度。鸡腿和鸡翅可以煮到更高温度(82°C)使其更嫩滑。"
        },
        lamb: {
          name: "羊肉",
          levels: [
            { cn: "一分熟", en: "Rare", temp: 52, desc: "中心冷红色", color: "#dc2626" },
            {
              cn: "三分熟",
              en: "Medium Rare",
              temp: 57,
              desc: "中心温热红色，推荐熟度",
              color: "#f97316"
            },
            { cn: "五分熟", en: "Medium", temp: 63, desc: "中心粉红色", color: "#eab308" },
            { cn: "全熟", en: "Well Done", temp: 74, desc: "完全无粉色", color: "#6b7280" }
          ],
          safety: "羊排和羊腿可以按喜好选择熟度。绞羊肉建议至少71°C。"
        },
        fish: {
          name: "鱼类",
          levels: [
            {
              cn: "生食级",
              en: "Sashimi",
              temp: 0,
              desc: "新鲜生食，需要冷冻处理杀虫",
              color: "#3b82f6"
            },
            {
              cn: "半生",
              en: "Rare",
              temp: 46,
              desc: "中心半透明，寿司级金枪鱼",
              color: "#06b6d4"
            },
            {
              cn: "推荐熟度",
              en: "Medium",
              temp: 52,
              desc: "中心略透明，鲜嫩多汁",
              color: "#22c55e"
            },
            {
              cn: "全熟",
              en: "Well Done",
              temp: 63,
              desc: "完全不透明，肉质分层",
              color: "#84cc16"
            }
          ],
          safety:
            "淡水鱼建议全熟(63°C)。三文鱼、金枪鱼等可以按喜好烹饪。生食需确保是寿司级别并经过冷冻处理。"
        }
      };

      let currentMeat = "beef";

      function setMeat(meat) {
        currentMeat = meat;
        document.querySelectorAll(".meat-tab").forEach(function (tab) {
          tab.classList.toggle("active", tab.dataset.meat === meat);
        });
        renderDoneness();
      }

      function renderDoneness() {
        const meat = meats[currentMeat];
        const grid = document.getElementById("donenessGrid");
        while (grid.firstChild) grid.removeChild(grid.firstChild);

        meat.levels.forEach(function (level) {
          const item = document.createElement("div");
          item.className = "doneness-item";

          const nameDiv = document.createElement("div");
          nameDiv.className = "doneness-name";
          const cnSpan = document.createElement("div");
          cnSpan.className = "cn";
          cnSpan.textContent = level.cn;
          const enSpan = document.createElement("div");
          enSpan.className = "en";
          enSpan.textContent = level.en;
          nameDiv.appendChild(cnSpan);
          nameDiv.appendChild(enSpan);

          const descDiv = document.createElement("div");
          descDiv.className = "doneness-desc";
          descDiv.textContent = level.desc;
          const colorBar = document.createElement("div");
          colorBar.className = "color-indicator";
          colorBar.style.background = level.color;
          descDiv.appendChild(colorBar);

          const tempDiv = document.createElement("div");
          tempDiv.className = "doneness-temp";
          const tempSpan = document.createElement("span");
          tempSpan.className = "temp";
          tempSpan.textContent = level.temp;
          const unitSpan = document.createElement("span");
          unitSpan.className = "unit";
          unitSpan.textContent = "°C";
          tempDiv.appendChild(tempSpan);
          tempDiv.appendChild(unitSpan);

          item.appendChild(nameDiv);
          item.appendChild(descDiv);
          item.appendChild(tempDiv);
          grid.appendChild(item);
        });

        const note = document.getElementById("safetyNote");
        while (note.firstChild) note.removeChild(note.firstChild);
        const h4 = document.createElement("h4");
        h4.textContent = "安全提示";
        const p = document.createElement("p");
        p.textContent = meat.safety;
        note.appendChild(h4);
        note.appendChild(p);
      }

      function convertTemp(from) {
        if (from === "c") {
          const c = parseFloat(document.getElementById("celsius").value) || 0;
          document.getElementById("fahrenheit").value = Math.round((c * 9) / 5 + 32);
        } else {
          const f = parseFloat(document.getElementById("fahrenheit").value) || 0;
          document.getElementById("celsius").value = Math.round(((f - 32) * 5) / 9);
        }
      }

      renderDoneness();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
