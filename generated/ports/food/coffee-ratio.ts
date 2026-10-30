// @ts-nocheck
// Generated from tools/food/coffee-ratio.html
// Source SHA-256: 8dd538ff5927903a403c415514f2dc4be7833e8266613035ef04d804704a270e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const methods = {
        pourover: {
          name: "手冲",
          defaultRatio: 15,
          grind: "中细",
          temp: "92-96°C",
          time: "2:30-3:00",
          ratioRange: "1:15-1:17",
          tips: [
            "1. 先用热水预热滤杯和分享壶",
            "2. 闷蒸: 用2倍粉重的水闷蒸30秒",
            "3. 绕圈注水，保持水流稳定",
            "4. 总萃取时间控制在2-3分钟"
          ]
        },
        espresso: {
          name: "意式浓缩",
          defaultRatio: 2,
          grind: "极细",
          temp: "90-94°C",
          time: "25-30秒",
          ratioRange: "1:1.5-1:2.5",
          tips: [
            "1. 粉量通常18-20g (双份)",
            "2. 萃取压力9bar",
            "3. 注意油脂颜色和流速",
            "4. 萃取液应呈蜂蜜状流下"
          ]
        },
        french: {
          name: "法压壶",
          defaultRatio: 15,
          grind: "粗",
          temp: "93-96°C",
          time: "4:00",
          ratioRange: "1:12-1:15",
          tips: [
            "1. 使用粗研磨，避免细粉过多",
            "2. 加水后搅拌一下",
            "3. 浸泡4分钟后缓慢下压",
            "4. 立即倒出，避免过度萃取"
          ]
        },
        aeropress: {
          name: "爱乐压",
          defaultRatio: 12,
          grind: "中细",
          temp: "80-85°C",
          time: "1:30-2:00",
          ratioRange: "1:10-1:15",
          tips: [
            "1. 可正压或倒置冲泡",
            "2. 水温可比手冲略低",
            "3. 轻柔按压，约30秒完成",
            "4. 适合实验不同配方"
          ]
        },
        cold: {
          name: "冷萃",
          defaultRatio: 8,
          grind: "粗",
          temp: "室温/冷藏",
          time: "12-24小时",
          ratioRange: "1:6-1:10",
          tips: [
            "1. 使用粗研磨咖啡粉",
            "2. 常温浸泡12小时或冷藏24小时",
            "3. 过滤后冷藏保存",
            "4. 饮用时可加水或牛奶稀释"
          ]
        },
        moka: {
          name: "摩卡壶",
          defaultRatio: 10,
          grind: "细",
          temp: "中小火",
          time: "4-5分钟",
          ratioRange: "1:8-1:12",
          tips: ["1. 水位不超过泄压阀", "2. 粉不要压实", "3. 中小火加热", "4. 听到咕噜声后移开火源"]
        }
      };

      let currentMethod = "pourover";
      let currentRatio = 15;

      function setMethod(method) {
        currentMethod = method;
        const config = methods[method];
        currentRatio = config.defaultRatio;

        document.querySelectorAll(".method-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.method === method);
        });

        document.getElementById("ratioSlider").value = currentRatio;
        document.getElementById("grindSize").textContent = config.grind;
        document.getElementById("waterTemp").textContent = config.temp;
        document.getElementById("brewTime").textContent = config.time;
        document.getElementById("recommendRatio").textContent = config.ratioRange;

        const tipsEl = document.getElementById("tips");
        while (tipsEl.firstChild) tipsEl.removeChild(tipsEl.firstChild);
        config.tips.forEach(function (tip) {
          const div = document.createElement("div");
          div.textContent = tip;
          tipsEl.appendChild(div);
        });

        calculate();
      }

      function updateRatio() {
        currentRatio = parseFloat(document.getElementById("ratioSlider").value);
        document.getElementById("ratioDisplay").textContent = "1:" + currentRatio;
        calculate();
      }

      function calculate() {
        const coffeeAmount = parseFloat(document.getElementById("coffeeAmount").value) || 0;
        const coffeeGrams = coffeeAmount / currentRatio;

        document.getElementById("coffeeGrams").textContent = coffeeGrams.toFixed(1);
        document.getElementById("waterMl").textContent = coffeeAmount;
        document.getElementById("ratioDisplay").textContent = "1:" + currentRatio;
      }

      setMethod("pourover");

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
    
